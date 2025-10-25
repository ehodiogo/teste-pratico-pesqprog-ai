from crewai import Agent
from ..tools.wikipedia import wikipedia_fetcher
from ..tools.llm import llm

wiki_agent = Agent(
    role="Wikipedia Article Writer",
    goal="Gerar um artigo estruturado sobre o tópico fornecido usando dados da Wikipedia.",
    backstory="Você é um escritor experiente que transforma resumos em artigos coerentes.",
    llm=llm,
    verbose=True,
    tools=[wikipedia_fetcher],
)

