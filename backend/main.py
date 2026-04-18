from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from scraper import run_scraper
from database import db
from models import ScrapeResponse

app = FastAPI(title="Aegis-HUD Backend", description="Cybersecurity Intelligence Hub")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/news")
def get_news():
    return db.get_articles()

@app.get("/api/cves")
def get_cves():
    return db.get_cves()

@app.post("/api/scrape", response_model=ScrapeResponse)
def trigger_scrape():
    arts_added, cves_added = run_scraper()
    return {"status": "success", "new_articles": arts_added, "new_cves": cves_added}

@app.get("/")
def health_check():
    return {"status": "ok", "service": "Aegis-HUD API"}
