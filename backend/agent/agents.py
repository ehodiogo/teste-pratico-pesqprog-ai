from datetime import datetime
from typing import List
from crewai_tools.wikipedia import WikipediaTool
from .provider import LLMProvider
from .prompts import TEMPLATE_ARTIGO, TEMPLATE_ESCRITOR
from .schemas import ArticleOutput, WikiContext

class ResearchAgent:
    def __init__(self, wiki_tool: WikipediaTool = None):
        self.wiki = wiki_tool or WikipediaTool()

    def run(self, topic: str, related: List[str] = None) -> List[dict]:
        queries = [topic] + (related or [])
        contexts = []
        for q in queries:
            ctx = self.wiki.get_summary_from_wp(q)
            contexts.append(ctx)
        return contexts

class WriterAgent:
    def __init__(self, llm: LLMProvider = None):
        self.llm = llm or LLMProvider()

    def run(self, topic: str, contexts: List[dict]) -> ArticleOutput:
        ctx_texts = []
        urls = []
        for c in contexts:
            if c.get("found"):
                ctx_texts.append(f"---\nTítulo: {c['title']}\nTexto: {c['extract']}\n")
                if c.get("page_url"):
                    urls.append(c["page_url"])
        ctx_joined = "\n\n".join(ctx_texts) if ctx_texts else ""

        user_prompt = TEMPLATE_ARTIGO.format(topic=topic, contexts=ctx_joined)
        system_prompt = TEMPLATE_ESCRITOR

        raw = self.llm.generate(system_prompt, user_prompt, max_tokens=1200)
        content = raw.strip()
        wc = len(content.split())

        wiki_contexts = []
        for c in contexts:
            wiki_contexts.append({
                "title": c.get("title"),
                "found": c.get("found", False),
                "extract": c.get("extract", ""),
                "page_url": c.get("page_url"),
            })

        output = ArticleOutput(
            title=topic,
            content=content,
            word_count=wc,
            wiki_context=[WikiContext(**wcxt) for wcxt in wiki_contexts],
            created_at=datetime.utcnow()
        )
        return output
