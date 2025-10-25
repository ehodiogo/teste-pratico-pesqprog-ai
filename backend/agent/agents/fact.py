from crewai import Agent
from ..tools.llm import llm

fact_checker_agent = Agent(
    role="Verificador de Fatos",
    goal=(
        "Comparar o artigo gerado com o resumo da Wikipedia para garantir "
        "que todas as informações são precisas e consistentes."
    ),
    backstory=(
        "Você é um verificador de fatos detalhista, responsável por validar se "
        "o conteúdo do artigo é verdadeiro e condiz com o resumo fornecido da Wikipedia. "
        "Se houver informações no artigo que não constam no resumo, destaque-as."
    ),
    llm=llm,
    verbose=True,
)
