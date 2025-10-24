import requests
from typing import Optional, Dict

class WikipediaTool:

    API_URL = 'https://pt.wikipedia.org/w/api.php'

    def get_summary_from_wp(self, title: str) -> Dict[str, Optional[str]]:
        params = {
            'action': 'query',
            'prop': 'extracts',
            'exlimit': 1,
            'explaintext': 1,
            'titles': title,
            'format': 'json',
            'utf8': 1,
            'redirects': 1,
        }

        headers = {
            'User-Agent': 'pesqprogai(dabpereiradev@gmail.com)'
        }


        response = requests.get(self.API_URL, params=params, headers=headers)
        response.raise_for_status()

        data = response.json()

        page = next(iter(data['query']['pages'].values()))
        if not page:
            return {"title": title, "found": False, "extract": "", "page_url": None}

        if page.get("missing") is not None:
            return {"title": title, "found": False, "extract": "", "page_url": None}
        page_id = page.get("pageid")

        page_url = f"https://pt.wikipedia.org/?curid={page_id}" if page_id else None
        return {"title": page.get("title", title), "found": True, "extract": page.get("extract", ""),
                "page_url": page_url}

# wp = WikipediaTool()
# print(wp.get_summary_from_wp("Futebol"))