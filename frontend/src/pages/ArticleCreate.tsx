import { useState } from 'react';
import type {Article} from "../interfaces/Article.ts";

function Generate() {
  const [title, setTitle] = useState('');
  const [article, setArticle] = useState<Article | null>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    setArticle(null);
    setError('');

    try {
      const res = await fetch('http://localhost:8000/api/articles/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
        }),
      });

      const data = await res.json();
      if (res.ok) setArticle(data);
      else setError(JSON.stringify(data));
    } catch (err: unknown) {

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro encontrado");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Gerar Artigo</h2>
      <form onSubmit={handleGenerate} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            <p className="card-text" style={{ whiteSpace: 'pre-line' }}>{article.content}</p>
            <p className="text-muted"><b>Fonte:</b> {article.source}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Generate;
