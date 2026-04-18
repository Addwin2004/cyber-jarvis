import requests
import feedparser
import datetime
import re
from database import db

RSS_FEEDS = {
    "The Hacker News": ("https://feeds.feedburner.com/TheHackersNews", "THREAT"),
    "BleepingComputer": ("https://www.bleepingcomputer.com/feed/", "THREAT"),
    "TechCrunch": ("https://techcrunch.com/feed/", "TECH"),
    "AI News": ("https://www.artificialintelligence-news.com/feed/", "AI"),
}

def clean_html(raw_html):
    cleanr = re.compile('<.*?>')
    cleantext = re.sub(cleanr, '', raw_html)
    return cleantext[:400] + "..." if len(cleantext) > 400 else cleantext

def analyze_article(title: str, summary: str, default_category: str):
    text = (title + " " + summary).lower()
    
    # Categorize
    category = default_category
    if "ai " in text or "artificial intelligence" in text or "machine learning" in text:
        category = "AI"
    elif "vulnerability" in text or "hack" in text or "breach" in text or "ransomware" in text or "cve" in text:
         category = "THREAT"
    
    # Threat level
    critical_keywords = ["zero-day", "0-day", "critical", "breach", "ransomware", "exploit", "cve", "vulnerability"]
    high_keywords = ["malware", "botnet", "phishing", "leak", "hacked"]
    
    threat = "ELEVATED"
    if any(k in text for k in critical_keywords):
        threat = "CRITICAL"
    elif any(k in text for k in high_keywords):
        threat = "HIGH"
        
    return threat, category

def scrape_rss():
    articles = []
    for source, (url, default_cat) in RSS_FEEDS.items():
        try:
            feed = feedparser.parse(url)
            for entry in feed.entries[:15]:
                title = entry.title
                link = entry.link
                raw_summary = getattr(entry, "summary", getattr(entry, "description", ""))
                summary = clean_html(raw_summary)
                published = getattr(entry, "published", datetime.datetime.now().isoformat())
                
                try:
                    timestamp = published
                except:
                    timestamp = datetime.datetime.now().isoformat()
                    
                threat, category = analyze_article(title, summary, default_cat)
                
                articles.append({
                    "title": title,
                    "url": link,
                    "source": source,
                    "timestamp": timestamp,
                    "threat_level": threat,
                    "category": category,
                    "summary": summary,
                    "image": None
                })
        except Exception as e:
            print(f"Error scraping {source}: {e}")
    return articles

def scrape_cves():
    cves = []
    try:
        res = requests.get("https://cve.circl.lu/api/last", timeout=10)
        if res.status_code == 200:
            data = res.json()
            for item in data[:20]:
                cve_id = item.get("id")
                desc = item.get("summary", "")
                score = item.get("cvss", 0.0) or 0.0
                time = item.get("Modified", item.get("Published", datetime.datetime.now().isoformat()))
                
                if float(score) >= 7.0:
                    cves.append({
                        "cve_id": cve_id,
                        "description": desc,
                        "base_score": float(score),
                        "timestamp": time
                    })
    except Exception as e:
        print(f"Error scraping CVEs: {e}")
    return cves

def run_scraper():
    arts = scrape_rss()
    arts_added = db.add_articles(arts)
    
    c = scrape_cves()
    cves_added = db.add_cves(c)
    return arts_added, cves_added
