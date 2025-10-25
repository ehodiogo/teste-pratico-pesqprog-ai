import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Article } from "../interfaces/Article.ts";

function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/articles/list');
        const data = await res.json();
        if (res.ok) setArticles(data);
        else setError(JSON.stringify(data));
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Erro encontrado");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleViewArticle = (id: number) => {
    navigate(`/articles/${id}`);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Lista de Artigos</h2>

      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row g-4">
        {articles.map((a: Article) => (
          <div key={a.id} className="col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">{a.title}</h5>
                <p className="card-text" style={{ whiteSpace: 'pre-line' }}>{a.summary}</p>
                <p className="text-muted"><b>Fonte:</b> {a.source}</p>
                <button
                  className="btn btn-primary mt-2"
                  onClick={() => handleViewArticle(a.id)}
                >
                  Ver Artigo Completo
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Articles;
