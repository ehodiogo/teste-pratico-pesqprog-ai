import { useState } from "react";
import type { Article } from "../interfaces/Article.ts";
import { Link } from "react-router-dom";

function Generate() {
  const [title, setTitle] = useState("");
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setArticle(null);
    setError("");
    setAnswers({});

    try {
      const res = await fetch("http://localhost:8000/api/articles/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

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

  const handleAnswer = (questionIdx: number, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionIdx]: option }));
  };

  const countWords = (text?: string) => (text ? text.trim().split(/\s+/).length : 0);

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
      <h1 className="text-center mb-4 fw-bold text-primary">Gerar Artigo</h1>

      <form
        onSubmit={handleGenerate}
        className="p-4 bg-light rounded-4 shadow-sm mb-5"
      >
        <div className="mb-3">
          <label className="form-label fw-semibold">
            Título do Artigo
          </label>
          <input
            type="text"
            className="form-control form-control-lg rounded-3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite o título do artigo..."
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-lg rounded-pill"
          disabled={loading}
        >
          {loading ? "Gerando..." : "Gerar Artigo"}
        </button>
      </form>

      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-3 text-muted">
            O artigo está sendo gerado, aguarde...
          </p>
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      {article && (
        <div className="card shadow-sm border-0 rounded-4 p-4">
          <div className="card-body">
            <h2 className="fw-bold mb-4 text-primary">{article.title}</h2>

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
                  {article.quiz.map((q, i) => {
                    const userAnswer = answers[i];
                    const isCorrect = userAnswer === q.correct_answer;

                    return (
                      <div key={i} className="mb-4">
                        <p className="fw-semibold">
                          Pergunta {i + 1}: {q.question}
                        </p>
                        <div className="d-flex flex-column gap-2">
                          {q.options.map((opt, j) => (
                            <button
                              key={j}
                              className={`btn text-start ${
                                userAnswer
                                  ? opt === q.correct_answer
                                    ? "btn-success"
                                    : opt === userAnswer
                                    ? "btn-danger"
                                    : "btn-outline-secondary"
                                  : "btn-outline-primary"
                              }`}
                              onClick={() =>
                                !userAnswer && handleAnswer(i, opt)
                              }
                              disabled={!!userAnswer}
                            >
                              {opt}
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

                  {Object.keys(answers).length > 0 && (
                    <div className="alert alert-info">
                      Você acertou{" "}
                      {
                        Object.entries(answers).filter(
                          ([idx, ans]) =>
                            ans ===
                            article.quiz![Number(idx)].correct_answer
                        ).length
                      }{" "}
                      de {article.quiz.length} perguntas!
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="mt-4 text-end">
              <Link
                to="/articles"
                className="btn btn-outline-secondary rounded-pill"
              >
                Ver todos os artigos →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Generate;
