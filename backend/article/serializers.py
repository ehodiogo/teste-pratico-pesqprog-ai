from rest_framework import serializers
from .models import Article
from agent.schemas import ArticleOutput
from agent.agents import ResearchAgent, WriterAgent
from crewai_tools.wikipedia import WikipediaTool
from agent.provider import LLMProvider

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ["id", "title", "content", "source"]
        read_only_fields = ["content", "source"]

    def create(self, validated_data):
        title = validated_data.get("title")
        related = self.context.get("related", [])
        wiki_tool = WikipediaTool()
        research = ResearchAgent(wiki_tool=wiki_tool)
        contexts = research.run(title, related)
        writer = WriterAgent(llm=LLMProvider())
        article_output = writer.run(title, contexts)
        validated_data["content"] = article_output.content
        validated_data["source"] = article_output.source
        return super().create(validated_data)
