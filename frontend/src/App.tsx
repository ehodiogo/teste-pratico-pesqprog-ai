import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Lazy load das páginas
const Home = lazy(() => import('./pages/Home'));
const Articles = lazy(() => import('./pages/ArticleList'));
const Generate = lazy(() => import('./pages/ArticleCreate'));

function App() {
  return (
    <Router>
      <div className="bg-dark text-light py-3 mb-4">
        <div className="container d-flex justify-content-between align-items-center">
          <h2 className="mb-0">📝 ArtigoGPT</h2>
          <div>
            <Link to="/" className="btn btn-outline-light me-2">Home</Link>
            <Link to="/articles" className="btn btn-outline-light me-2">Artigos</Link>
            <Link to="/generate" className="btn btn-outline-light">Gerar Artigo</Link>
          </div>
        </div>
      </div>

      <Suspense fallback={<div className="text-center mt-5">Carregando...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/generate" element={<Generate />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
