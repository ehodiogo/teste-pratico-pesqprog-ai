import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Article } from "../interfaces/Article.ts";

function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/articles/list");
        const data = await res.json();
        if (res.ok) setArticles(data);
        else setError(JSON.stringify(data));
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Erro encontrado");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleViewArticle = (id: number) => {
    navigate(`/articles/${id}`);
  };

  const countWords = (text?: string) =>
    text ? text.trim().split(/\s+/).length : 0;

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center fw-bold">📚 Lista de Artigos</h2>

      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
          <p className="mt-3 text-muted">Buscando artigos disponíveis...</p>
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && articles.length === 0 && (
        <div className="alert alert-info text-center">
          Nenhum artigo encontrado. Que tal <b>gerar um novo?</b> 😊
        </div>
      )}

      <div className="row g-4">
        {articles.map((a: Article) => (
          <div key={a.id} className="col-md-6 col-lg-4">
            <div className="card shadow-sm border-0 h-100 hover-shadow">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title mb-2 text-primary fw-semibold">
                  {a.title}
                </h5>

                {a.category && (
                  <p className="text-muted small mb-1">
                    <i className="bi bi-tag"></i> {a.category}
                  </p>
                )}

                {a.summary && (
                  <p
                    className="card-text mb-2 text-secondary"
                    style={{
                      whiteSpace: "pre-line",
                      maxHeight: "90px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {a.summary}
                  </p>
                )}

                <p className="text-muted small mb-2">
                  <i className="bi bi-journal-text me-1"></i>
                  <b>Palavras:</b> {countWords(a.article)}
                </p>

                {a.source && (
                  <p className="text-muted small mb-3">
                    <i className="bi bi-globe me-1"></i>
                    <b>Fonte:</b> {a.source}
                  </p>
                )}

                <button
                  className="btn btn-outline-primary mt-auto"
                  onClick={() => handleViewArticle(a.id)}
                >
                  Ler Artigo Completo →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .hover-shadow:hover {
          transform: translateY(-3px);
          transition: all 0.2s ease-in-out;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12) !important;
        }
      `}</style>
    </div>
  );
}

export default Articles;
