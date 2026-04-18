from pydantic import BaseModel
from typing import Optional

class Article(BaseModel):
    title: str
    url: str
    source: str
    timestamp: str
    threat_level: str
    category: str
    summary: str
    image: Optional[str] = None

class CVE(BaseModel):
    cve_id: str
    description: str
    base_score: float
    timestamp: str

class ScrapeResponse(BaseModel):
    status: str
    new_articles: int
    new_cves: int
