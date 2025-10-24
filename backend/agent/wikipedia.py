import requests

class WikipediaTool:

    API_URL = 'https://pt.wikipedia.org/w/api.php'

    def get_summary_from_wp(self, title: str) -> str:
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
        return page.get('extract', '')