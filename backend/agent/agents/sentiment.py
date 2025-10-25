from ..tools.llm import llm
from crewai import Agent

sentiment_agent = Agent(
    role="Sentiment Analysis Expert",
    goal="Analisar o sentimento de um texto.",
    backstory="Você é especialista em detectar o tom emocional de textos.",
    llm=llm,
    verbose=True,
)