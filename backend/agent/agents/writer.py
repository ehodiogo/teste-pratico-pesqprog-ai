from ..tools.llm import llm
from crewai import Agent

writer_agent = Agent(
    role="Article Writer",
    goal="Transformar as informações coletadas em um artigo coeso, detalhado e bem estruturado.",
    backstory="Você é um escritor especializado em criar artigos informativos e envolventes.",
    llm=llm,
    verbose=True,
)