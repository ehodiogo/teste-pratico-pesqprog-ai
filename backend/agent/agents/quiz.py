from ..tools.llm import llm
from crewai import Agent

quiz_agent = Agent(
    role="Quiz Generator",
    goal=(
        "Gerar 5 perguntas de múltipla escolha baseadas no texto fornecido. "
        "Cada pergunta deve ter 4 opções e indicar a opção correta. "
        "Retorne estritamente em formato JSON como lista de objetos:"
        "[{'question': 'Texto da pergunta', 'options': ['a','b','c','d'], 'correct_answer': 'opção correta'}]"
    ),
    backstory="Você é um professor que transforma conteúdos em quizzes educativos.",
    llm=llm,
    verbose=True,
)