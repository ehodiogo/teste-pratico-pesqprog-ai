from pydantic import BaseModel, HttpUrl
from typing import Optional, List
from datetime import datetime

class WikiContext(BaseModel):
    title: str
    found: bool
    extract: str
    page_url: Optional[HttpUrl]

class ArticleOutput(BaseModel):
    title: str
    content: str
    word_count: int
    source: str = "Wikipedia + LLM"
    wiki_context: List[WikiContext]
    created_at: datetime
