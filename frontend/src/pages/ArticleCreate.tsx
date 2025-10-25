import { useState } from 'react';
import type { Article } from "../interfaces/Article.ts";
import { Link } from "react-router-dom";

function Generate() {
  const [title, setTitle] = useState('');
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  const handleGenerate = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    setArticle(null);
    setError('');
    setAnswers({});

    try {
      const res = await fetch('http://localhost:8000/api/articles/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
    setAnswers(prev => ({ ...prev, [questionIdx]: option }));
  };

  const codeBlockStyle = "p-3 bg-light rounded border overflow-auto";

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Gerar Artigo</h2>

      <form onSubmit={handleGenerate} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Título do Artigo</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite o título aqui..."
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Gerando...' : 'Gerar Artigo'}
        </button>
      </form>

      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
          <p className="mt-3">O artigo está sendo gerado, aguarde...</p>
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      {article && (
        <div className="card shadow-sm mt-4">
          <div className="card-body">
            <h4 className="card-title">{article.title}</h4>

            {article.summary && (
              <div className="mb-3">
                <h5>Resumo:</h5>
                <pre className={codeBlockStyle} style={{ maxHeight: "200px" }}>
                  {article.summary}
                </pre>
              </div>
            )}

            {article.article && (
              <div className="mb-3">
                <h5>Artigo:</h5>
                <pre className={codeBlockStyle} style={{ maxHeight: "400px" }}>
                  {article.article}
                </pre>
                <p className="text-end text-muted mt-1">
                  Palavras: {article.article.split(/\s+/).filter(Boolean).length}
                </p>
              </div>
            )}

            {article.translation && (
              <div className="mb-3">
                <h5>Tradução:</h5>
                <pre className={codeBlockStyle} style={{ maxHeight: "400px" }}>
                  {article.translation}
                </pre>
              </div>
            )}

            {article.sentiment && (
              <div className="mb-3">
                <h5>Sentimento:</h5>
                <pre className={codeBlockStyle}>{article.sentiment}</pre>
              </div>
            )}

            {article.fact_check && (
              <div className="mb-3">
                <h5>Verificação de Fatos:</h5>
                <pre className={codeBlockStyle} style={{ maxHeight: "200px" }}>
                  {article.fact_check}
                </pre>
              </div>
            )}

            {article.review && (
              <div className="mb-3">
                <h5>Feedback do Revisor:</h5>
                <pre className={codeBlockStyle} style={{ maxHeight: "200px" }}>
                  {article.review}
                </pre>
              </div>
            )}

            {article.category && (
              <div className="mb-3">
                <h5>Categoria do Artigo:</h5>
                <pre className={codeBlockStyle}>{article.category}</pre>
              </div>
            )}

            {article.quiz && article.quiz.length > 0 && (
              <div className="mt-4">
                <h5>Quiz Interativo</h5>
                {article.quiz.map((q, i) => {
                  const userAnswer = answers[i];
                  const isCorrect = userAnswer === q.correct_answer;

                  return (
                    <div key={i} className="mb-4">
                      <p><b>Pergunta {i + 1}:</b> {q.question}</p>
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
                            onClick={() => !userAnswer && handleAnswer(i, opt)}
                            disabled={!!userAnswer}
                          >
                            {opt}
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

                {Object.keys(answers).length > 0 && (
                  <div className="alert alert-info">
                    Você acertou {Object.entries(answers).filter(([idx, ans]) => ans === article.quiz![Number(idx)].correct_answer).length} de {article.quiz.length} perguntas!
                  </div>
                )}
              </div>
            )}

            <div className="mt-4 text-end">
              <Link to="/articles" className="btn btn-outline-secondary">
                Ver todos os artigos
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Generate;
