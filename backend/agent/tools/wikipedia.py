from crewai.tools import tool
import requests

@tool("Wikipedia Fetcher")
def wikipedia_fetcher(topic: str) -> str:
    """
    Busca um resumo de um tópico na Wikipedia em português.
    """
    url = "https://pt.wikipedia.org/w/api.php"
    params = {
        "action": "query",
        "prop": "extracts",
        "explaintext": True,
        "exintro": True,
        "titles": topic,
        "format": "json",
        "utf8": 1,
        "redirects": 1,
    }
    headers = {"User-Agent": "CrewAI Wikipedia Fetcher/1.0 (dabpereiradev@gmail.com)"}
    response = requests.get(url, params=params, headers=headers)
    data = response.json()
    pages = data.get("query", {}).get("pages", {})
    if not pages:
        return f"Nenhum resultado encontrado para '{topic}'."
    page_content = next(iter(pages.values())).get("extract", "")
    if not page_content:
        return f"Nenhum resumo disponível para '{topic}'."
    return page_content
