import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

class InMemoryDB:
    def __init__(self):
        self.articles = []
        self.cves = []
        
    def add_articles(self, items):
        existing_urls = {a.get('url') for a in self.articles}
        new_items = [item for item in items if item.get('url') not in existing_urls]
        self.articles.extend(new_items)
        return len(new_items)

    def add_cves(self, items):
        existing_ids = {c.get('cve_id') for c in self.cves}
        new_items = [item for item in items if item.get('cve_id') not in existing_ids]
        self.cves.extend(new_items)
        return len(new_items)
        
    def get_articles(self):
        return sorted(self.articles, key=lambda x: x.get('timestamp', ''), reverse=True)
        
    def get_cves(self):
        return sorted(self.cves, key=lambda x: x.get('timestamp', ''), reverse=True)

    def cleanup_old_data(self, days=7):
        import datetime
        cutoff = (datetime.datetime.now() - datetime.timedelta(days=days)).isoformat()
        self.articles = [a for a in self.articles if a.get('timestamp', '') >= cutoff]
        self.cves = [c for c in self.cves if c.get('timestamp', '') >= cutoff]
        print(f"InMemoryDB Cleanup: Deleted records older than {days} days.")

class SupabaseDB:
    def __init__(self, url, key):
        self.supabase: Client = create_client(url, key)
        
    def add_articles(self, items):
        if not items: return 0
        try:
            res = self.supabase.table('articles').upsert(items, on_conflict='url').execute()
            return len(res.data)
        except Exception as e:
            print(f"Supabase Error (Articles): {e}")
            return 0
            
    def add_cves(self, items):
        if not items: return 0
        try:
            res = self.supabase.table('cves').upsert(items, on_conflict='cve_id').execute()
            return len(res.data)
        except Exception as e:
            print(f"Supabase Error (CVEs): {e}")
            return 0
            
    def get_articles(self):
        res = self.supabase.table('articles').select('*').order('timestamp', desc=True).limit(50).execute()
        return res.data
        
    def get_cves(self):
        res = self.supabase.table('cves').select('*').order('timestamp', desc=True).limit(50).execute()
        return res.data

    def cleanup_old_data(self, days=7):
        import datetime
        cutoff = (datetime.datetime.now() - datetime.timedelta(days=days)).isoformat()
        try:
            self.supabase.table('articles').delete().lt('timestamp', cutoff).execute()
            self.supabase.table('cves').delete().lt('timestamp', cutoff).execute()
            print(f"Supabase Cleanup: Deleted records older than {cutoff}.")
        except Exception as e:
            print(f"Supabase Cleanup Error: {e}")

# Initialize DB depending on env
if SUPABASE_URL and SUPABASE_KEY and SUPABASE_URL != "your-supabase-url":
    db = SupabaseDB(SUPABASE_URL, SUPABASE_KEY)
else:
    print("Warning: Missing or invalid Supabase credentials. Falling back to InMemoryDB.")
    db = InMemoryDB()
