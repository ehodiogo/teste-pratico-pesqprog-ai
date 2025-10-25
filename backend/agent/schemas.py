from pydantic import BaseModel, Field
from typing import List, Dict, Optional

class QuizQuestion(BaseModel):
    question: str = Field(..., description="Texto da pergunta.")
    options: List[str] = Field(..., description="Lista de quatro opções.")
    correct_answer: str = Field(..., description="Resposta correta.")

class ArticleOutput(BaseModel):
    summary: str = Field(..., description="Resumo factual obtido da Wikipedia.")
    article: str = Field(..., description="Artigo completo e estruturado.")
    sentiment: str = Field(..., description="Análise de sentimento do artigo.")
    translation: str = Field(..., description="Artigo traduzido para o idioma alvo.")
    quiz: List[QuizQuestion] = Field(..., description="Lista de perguntas de múltipla escolha.")
    fact_check: Optional[str] = Field(None, description="Relatório de verificação factual do artigo.")
    review: Optional[str] = Field(None, description="Feedback editorial e sugestões de melhoria.")
    category: Optional[str] = Field(None, description="Categoria do artigo.")
    token_usage: Optional[Dict[str, int]] = Field(None, description="Uso de tokens durante o processo.")
