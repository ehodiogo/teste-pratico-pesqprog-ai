from ..tools.llm import llm
from crewai import Agent

translator_agent = Agent(
    role="Professional Translator",
    goal="Traduzir o texto mantendo o significado e estilo original.",
    backstory="Você é um tradutor profissional que traduz textos com naturalidade.",
    llm=llm,
    verbose=True,
)