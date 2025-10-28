from crewai import Task, Crew
from ..agents.wikipedia import wiki_agent
from ..agents.writer import writer_agent
from ..agents.quiz import quiz_agent
from ..agents.sentiment import sentiment_agent
from ..agents.translator import translator_agent
from ..agents.fact import fact_checker_agent
from ..agents.reviewer import reviewer_agent
from ..agents.category import category_agent
from ..schemas import ArticleOutput, QuizQuestion
import json

def get_task_raw(tasks_output, task_description):
    """
    Retorna a saída da task do CrewAI
    :param tasks_output: Outputs da task
    :param task_description: Descrição da task
    :return: str: Conteúdo bruto
    """
    for t in tasks_output:
        if t.description == task_description:
            return t.raw
    return ""

def generate_article_pipeline(title: str, target_language: str = "English"):
    """
    Gera o artigo utilizando o pipeline da wikipedia
    :param title: Título do Artigo
    :param target_language: Linguagem para tradução
    :return: Pydantic formatado com a saída para a criação do objeto django 
    """
    fetch_task = Task(
        description=(
            f"Pesquise informações sobre o tópico '{title}' na Wikipedia em português. "
            "Forneça um resumo factual, conciso e fiel ao conteúdo encontrado. "
            "Evite opiniões, análises pessoais ou informações externas à Wikipedia. "
            f"Caso não haja resultados relevantes, retorne exatamente: "
            f"\"Nenhum resumo disponível para '{title}'.\""
        ),
        expected_output="Resumo factual e conciso baseado exclusivamente na Wikipedia.",
        agent=wiki_agent,
    )

    write_task = Task(
        description=(
            "Com base apenas no resumo fornecido da Wikipedia, escreva um artigo completo, "
            "claro e bem estruturado. O texto deve ser informativo e coeso, "
            "mantendo fidelidade total aos fatos apresentados. "
            "Não invente informações novas ou especulativas. "
            "Evite repetir o resumo literalmente — reformule e amplie com clareza, "
            "mantendo um tom enciclopédico e didático."
        ),
        expected_output="Artigo informativo e fiel aos fatos do resumo da Wikipedia.",
        agent=writer_agent,
    )

    sentiment_task = Task(
        description=(
            "Analise o sentimento predominante no artigo fornecido. "
            "Classifique como Positivo, Negativo ou Neutro e explique brevemente o motivo. "
            "A análise deve considerar o tom e a linguagem, não o conteúdo factual."
        ),
        expected_output="Classificação de sentimento (Positivo, Negativo ou Neutro) e explicação curta.",
        agent=sentiment_agent,
    )

    translator_task = Task(
        description=(
            f"Traduza o artigo fielmente para o idioma '{target_language}'. "
            "Mantenha o tom informativo e a clareza do texto original, "
            "sem adicionar ou remover informações. "
            "Preserve nomes próprios e termos técnicos conforme o contexto."
        ),
        expected_output=f"Tradução precisa e natural do artigo em {target_language}.",
        agent=translator_agent,
    )

    quiz_task = Task(
        description=(
            "Com base no artigo fornecido, crie 5 perguntas de múltipla escolha. "
            "Cada pergunta deve ter exatamente 4 opções e apenas uma correta. "
            "Retorne o resultado em formato JSON válido, com a seguinte estrutura:\n"
            "[\n"
            "  {\n"
            "    'question': 'Texto da pergunta',\n"
            "    'options': ['A', 'B', 'C', 'D'],\n"
            "    'answer': 'Texto da resposta correta'\n"
            "  }\n"
            "]\n"
            "As perguntas devem ser objetivas, baseadas em fatos do artigo, "
            "e adequadas para leitores gerais."
        ),
        expected_output="Lista JSON com 5 perguntas, 4 opções e uma resposta correta cada.",
        agent=quiz_agent,
    )

    fact_check_task = Task(
        description=(
            "Compare o resumo da Wikipedia com o artigo final. "
            "Identifique quaisquer afirmações no artigo que não estejam no resumo. "
            "Se tudo estiver correto, retorne: "
            "'O artigo está consistente com os fatos do resumo da Wikipedia.'"
        ),
        expected_output="Relatório conciso sobre a fidelidade factual do artigo.",
        agent=fact_checker_agent,
    )

    review_task = Task(
        description=(
            "Leia o artigo completo e forneça uma revisão editorial curta. "
            "Comente sobre estrutura, clareza, tom e coerência. "
            "Sugira até 3 melhorias para deixar o texto mais legível e interessante."
        ),
        expected_output="Feedback editorial com 2–3 sugestões de melhoria.",
        agent=reviewer_agent,
    )

    category_task = Task(
        description=(
            "Leia o artigo final e determine a categoria mais apropriada. "
            "As opções são: Ciência, História, Tecnologia, Esportes, Cultura, Política, Geografia, Economia ou Outro. "
            "Retorne apenas o nome da categoria."
        ),
        expected_output="Nome da categoria (string).",
        agent=category_agent,
    )

    crew = Crew(
        agents=[
            wiki_agent, writer_agent, sentiment_agent, translator_agent, quiz_agent,
            fact_checker_agent, reviewer_agent, category_agent
        ],
        tasks=[
            fetch_task, write_task, sentiment_task, translator_task, quiz_task,
            fact_check_task, review_task, category_task
        ],
        verbose=True,
    )

    result = crew.kickoff(inputs={"topic": title, "target_language": target_language})
    summary = get_task_raw(result.tasks_output, fetch_task.description)

    if "Nenhum resumo disponível" in summary or "Nenhum resultado encontrado" in summary:
        return ArticleOutput(
            summary=summary,
            article="Não foi possível gerar o artigo, pois a Wikipedia não contém informações sobre esse tema.",
            sentiment="Indisponível",
            translation="",
            quiz=[],
            token_usage={},
        )

    article = get_task_raw(result.tasks_output, write_task.description)
    sentiment = get_task_raw(result.tasks_output, sentiment_task.description)
    translation = get_task_raw(result.tasks_output, translator_task.description)
    quiz_raw = get_task_raw(result.tasks_output, quiz_task.description)
    fact_report = get_task_raw(result.tasks_output, fact_check_task.description)
    review_feedback = get_task_raw(result.tasks_output, review_task.description)
    category = get_task_raw(result.tasks_output, category_task.description)

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
        fact_check=fact_report,
        review=review_feedback,
        category=category,
        token_usage=vars(result.token_usage),
    )
