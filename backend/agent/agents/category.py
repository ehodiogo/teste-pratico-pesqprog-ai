from crewai import Agent
from ..tools.llm import llm

category_agent = Agent(
    role="Classificador de Categoria",
    goal=(
        "Classificar o artigo em uma categoria apropriada baseada no conteúdo."
    ),
    backstory=(
        "Você é um analista de conteúdo que organiza artigos em categorias. "
        "As opções de categorias são: Ciência, História, Tecnologia, Esportes, Cultura, Política, Geografia, Economia ou Outro."
    ),
    llm=llm,
    verbose=True,
)
