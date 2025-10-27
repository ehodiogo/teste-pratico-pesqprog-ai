from crewai import Agent
from ..tools.llm import llm

category_agent = Agent(
    role="Classificador de Categoria de Artigos",
    goal=(
        "Analise o conteúdo do artigo e retorne **apenas o nome da categoria** mais apropriada com base no tema principal. "
        "As categorias disponíveis são: Ciência, História, Tecnologia, Esportes, Cultura, Política, Geografia, Economia ou Outro.\n\n"
        "### Diretrizes:\n"
        "- Leia todo o artigo e identifique o tema central.\n"
        "- Escolha **apenas uma** categoria que represente o conteúdo.\n"
        "- Se o artigo for multidisciplinar, escolha a categoria mais diretamente abordada.\n"
        "- Se não houver correspondência clara, use 'Outro'.\n\n"
        "### Saída esperada:\n"
        "Um único valor: o nome da categoria (ex.: 'Tecnologia', 'História')."
    ),
    backstory=(
        "Você é um analista editorial experiente em organizar artigos em categorias, garantindo precisão e consistência nas classificações."
    ),
    llm=llm,
    verbose=True,
)
