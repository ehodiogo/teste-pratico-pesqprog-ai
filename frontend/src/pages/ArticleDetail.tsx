import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Article, QuizQuestion } from "../interfaces/Article.ts";

function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/articles/${id}`);
        const data = await res.json();
        if (res.ok) setArticle(data);
        else setError(JSON.stringify(data));
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Erro encontrado");
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  const handleAnswer = (questionIdx: number, option: string) => {
    setAnswers(prev => ({ ...prev, [questionIdx]: option }));
  };

  const countWords = (text?: string) => text ? text.trim().split(/\s+/).length : 0;

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!article) return <div className="alert alert-warning">Artigo não encontrado</div>;

  const sectionStyle = "card mb-4 shadow-sm";
  const textBoxStyle = "p-3 bg-light rounded border overflow-auto";

  return (
    <div className="container mt-5">
      <Link to="/articles" className="btn btn-secondary mb-4">
        ← Voltar para a lista
      </Link>

      <h2 className="mb-4">{article.title}</h2>

      {article.summary && (
        <div className={sectionStyle}>
          <div className="card-body">
            <h5 className="card-title">
              Resumo <small className="text-muted">({countWords(article.summary)} palavras)</small>
            </h5>
            <pre className={textBoxStyle} style={{ maxHeight: "200px" }}>{article.summary}</pre>
          </div>
        </div>
      )}

      {article.article && (
        <div className={sectionStyle}>
          <div className="card-body">
            <h5 className="card-title">
              Artigo <small className="text-muted">({countWords(article.article)} palavras)</small>
            </h5>
            <pre className={textBoxStyle} style={{ maxHeight: "400px" }}>{article.article}</pre>
          </div>
        </div>
      )}

      {article.translation && (
        <div className={sectionStyle}>
          <div className="card-body">
            <h5 className="card-title">
              Tradução <small className="text-muted">({countWords(article.translation)} palavras)</small>
            </h5>
            <pre className={textBoxStyle} style={{ maxHeight: "400px" }}>{article.translation}</pre>
          </div>
        </div>
      )}

      {article.sentiment && (
        <div className={sectionStyle}>
          <div className="card-body">
            <h5 className="card-title">Sentimento</h5>
            <pre className={textBoxStyle}>{article.sentiment}</pre>
          </div>
        </div>
      )}

      {article.fact_check && (
        <div className={sectionStyle}>
          <div className="card-body">
            <h5 className="card-title">Verificação de Fatos</h5>
            <pre className={textBoxStyle} style={{ maxHeight: "200px" }}>{article.fact_check}</pre>
          </div>
        </div>
      )}

      {article.review && (
        <div className={sectionStyle}>
          <div className="card-body">
            <h5 className="card-title">Feedback do Revisor</h5>
            <pre className={textBoxStyle} style={{ maxHeight: "200px" }}>{article.review}</pre>
          </div>
        </div>
      )}

      {article.category && (
        <div className={sectionStyle}>
          <div className="card-body">
            <h5 className="card-title">Categoria do Artigo</h5>
            <pre className={textBoxStyle}>{article.category}</pre>
          </div>
        </div>
      )}

      {article.quiz && article.quiz.length > 0 && (
        <div className={sectionStyle}>
          <div className="card-body">
            <h5 className="card-title">Quiz Interativo</h5>
            {article.quiz.map((q: QuizQuestion, idx: number) => {
              const userAnswer = answers[idx];
              const isCorrect = userAnswer === q.correct_answer;

              return (
                <div key={idx} className="mb-4">
                  <p><b>Pergunta {idx + 1}:</b> {q.question}</p>
                  <div className="d-flex flex-column gap-2">
                    {q.options.map((option, i) => (
                      <button
                        key={i}
                        className={`btn text-start ${
                          userAnswer
                            ? option === q.correct_answer
                              ? "btn-success"
                              : option === userAnswer
                              ? "btn-danger"
                              : "btn-outline-secondary"
                            : "btn-outline-primary"
                        }`}
                        onClick={() => !userAnswer && handleAnswer(idx, option)}
                        disabled={!!userAnswer}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  {userAnswer && (
                    <p className="mt-2">
                      {isCorrect ? "✔️ Resposta correta!" : `❌ Resposta errada. Correta: ${q.correct_answer}`}
                    </p>
                  )}
                </div>
              );
            })}
            {Object.keys(answers).length === article.quiz.length && (
              <div className="alert alert-info">
                Você acertou {Object.entries(answers).filter(([idx, ans]) => ans === article.quiz![Number(idx)].correct_answer).length} de {article.quiz.length} perguntas!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ArticleDetail;
