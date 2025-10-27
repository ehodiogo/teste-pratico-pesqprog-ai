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

  const countWords = (text?: string) => (text ? text.trim().split(/\s+/).length : 0);

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

  const sectionStyle = "card mb-4 border-0 shadow-sm rounded-4";
  const textBoxStyle =
    "p-4 bg-white rounded-4 border lh-lg fs-6 text-secondary";

  const renderFormattedSection = (
    title: string,
    content?: string,
    maxHeight?: string
  ) =>
    content && (
      <div className={sectionStyle}>
        <div className="card-body">
          <h4 className="fw-bold mb-3">
            {title}{" "}
            <small className="text-muted fs-6">
              ({countWords(content)} palavras)
            </small>
          </h4>
          <div
            className={textBoxStyle}
            style={{
              maxHeight,
              overflowY: maxHeight ? "auto" : "visible",
              lineHeight: "1.8",
              textAlign: "justify",
            }}
            dangerouslySetInnerHTML={{
              __html: content
                .replace(/\n{2,}/g, "</p><p>")
                .replace(/\n/g, "<br/>")
                .replace(/^/, "<p>")
                .concat("</p>"),
            }}
          />
        </div>
      </div>
    );

  return (
    <div className="container mt-5 mb-5" style={{ maxWidth: "850px" }}>
      <Link to="/articles" className="btn btn-outline-secondary mb-4 rounded-pill">
        ← Voltar para a lista
      </Link>

      <h1 className="fw-bold mb-4 text-primary">{article.title}</h1>

      {renderFormattedSection("Resumo", article.summary, "250px")}
      {renderFormattedSection("Artigo", article.article)}
      {renderFormattedSection("Tradução", article.translation)}
      {renderFormattedSection("Sentimento", article.sentiment)}
      {renderFormattedSection("Verificação de Fatos", article.fact_check)}
      {renderFormattedSection("Feedback do Revisor", article.review)}
      {renderFormattedSection("Categoria do Artigo", article.category)}

      {article.quiz && article.quiz.length > 0 && (
        <div className={sectionStyle}>
          <div className="card-body">
            <h4 className="fw-bold mb-3">Quiz Interativo</h4>
            {article.quiz.map((q: QuizQuestion, idx: number) => {
              const userAnswer = answers[idx];
              const isCorrect = userAnswer === q.correct_answer;

              return (
                <div key={idx} className="mb-4">
                  <p className="fw-semibold">
                    Pergunta {idx + 1}: {q.question}
                  </p>
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
                      {isCorrect
                        ? "✔️ Resposta correta!"
                        : `❌ Resposta errada. Correta: ${q.correct_answer}`}
                    </p>
                  )}
                </div>
              );
            })}
            {Object.keys(answers).length === article.quiz.length && (
              <div className="alert alert-info">
                Você acertou{" "}
                {
                  Object.entries(answers).filter(
                    ([idx, ans]) =>
                      ans === article.quiz![Number(idx)].correct_answer
                  ).length
                }{" "}
                de {article.quiz.length} perguntas!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ArticleDetail;
