from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from unittest.mock import patch
from article.models import Article

class ArticleCreationTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('agent:article-list')

    @patch('agent.agents.ResearchAgent.run')
    @patch('agent.agents.WriterAgent.run')
    def test_create_article_success(self, mock_writer_run, mock_research_run):
        mock_research_run.return_value = [
            {
                "title": "Futebol",
                "found": True,
                "extract": "Resumo sobre futebol...",
                "page_url": "https://pt.wikipedia.org/?curid=12345"
            }
        ]

        from agent.schemas import ArticleOutput, WikiContext
        mock_writer_run.return_value = ArticleOutput(
            title="Futebol",
            content="Este é um artigo de teste com mais de 300 palavras..." * 5,
            word_count=50,
            source="Wikipedia + LLM",
            wiki_context=[WikiContext(
                title="Futebol",
                found=True,
                extract="Resumo sobre futebol...",
                page_url="https://pt.wikipedia.org/?curid=12345"
            )],
            created_at=None
        )

        payload = {
            "title": "Futebol",
            "related": ["Futebol no Brasil"]
        }

        response = self.client.post(self.url, payload, format='json')

        self.assertEqual(response.status_code, 201)
        self.assertEqual(Article.objects.count(), 1)
        article = Article.objects.first()
        self.assertEqual(article.title, "Futebol")
        self.assertTrue(article.content.startswith("Este é um artigo de teste"))
        self.assertEqual(article.source, "Wikipedia + LLM")

        mock_research_run.assert_called_once_with("Futebol", ["Futebol no Brasil"])
        mock_writer_run.assert_called_once()
