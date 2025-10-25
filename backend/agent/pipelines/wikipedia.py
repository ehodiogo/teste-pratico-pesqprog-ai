from crewai import Task, Crew
from ..agents.wikipedia import wiki_agent
from ..agents.writer import writer_agent
from ..agents.quiz import quiz_agent
from ..agents.sentiment import sentiment_agent
from ..agents.translator import translator_agent
from ..schemas import ArticleOutput, QuizQuestion
import json

def get_task_raw(tasks_output, task_description):
    for t in tasks_output:
        if t.description == task_description:
            return t.raw
    return ""

def generate_article_pipeline(title: str, target_language: str = "English"):
    fetch_task = Task(
        description=f"Pesquisar e resumir informações sobre '{title}' na Wikipedia.",
        expected_output="Resumo factual e conciso.",
        agent=wiki_agent,
    )

    write_task = Task(
        description="Com base no resumo, escreva um artigo completo, claro e bem estruturado.",
        expected_output="Texto do artigo.",
        agent=writer_agent,
    )

    sentiment_task = Task(
        description="Analise o sentimento do artigo escrito.",
        expected_output="Positivo, Negativo ou Neutro com explicação.",
        agent=sentiment_agent,
    )

    translator_task = Task(
        description=f"Traduza o artigo para o idioma '{target_language}'.",
        expected_output="Texto traduzido.",
        agent=translator_agent,
    )

    quiz_task = Task(
        description="Crie 5 perguntas de múltipla escolha com 4 opções cada baseadas no artigo.",
        expected_output="Perguntas e respostas.",
        agent=quiz_agent,
    )

    crew = Crew(
        agents=[wiki_agent, writer_agent, sentiment_agent, translator_agent, quiz_agent],
        tasks=[fetch_task, write_task, sentiment_task, translator_task, quiz_task],
        verbose=True,
    )

    result = crew.kickoff(inputs={"topic": title, "target_language": target_language})
    print(result.tasks_output)

    summary = get_task_raw(result.tasks_output, fetch_task.description)
    article = get_task_raw(result.tasks_output, write_task.description)
    sentiment = get_task_raw(result.tasks_output, sentiment_task.description)
    translation = get_task_raw(result.tasks_output, translator_task.description)
    quiz_raw = get_task_raw(result.tasks_output, quiz_task.description)
    print("QUIZ RAAAAAAAAAAAAAAAAAW", quiz_raw)
    quiz_data = []
    if isinstance(quiz_raw, str):
        try:
            quiz_data = json.loads(quiz_raw)
        except Exception:
            quiz_data = []
    elif isinstance(quiz_raw, list):
        quiz_data = quiz_raw

    return ArticleOutput(
        summary=summary,
        article=article,
        sentiment=sentiment,
        translation=translation,
        quiz=[QuizQuestion(**q) for q in quiz_data if isinstance(q, dict)],
        token_usage=vars(result.token_usage),
    )