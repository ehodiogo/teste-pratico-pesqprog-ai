import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
const Home = lazy(() => import("./pages/Home"));
const Articles = lazy(() => import("./pages/ArticleList"));
const Generate = lazy(() => import("./pages/ArticleCreate"));
const ArticleDetail = lazy(() => import("./pages/ArticleDetail"));

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3">
        <div className="container">
          <NavLink to="/" className="navbar-brand fw-bold fs-4 d-flex align-items-center">
            ArtigoFURGPT
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav align-items-lg-center">
              <li className="nav-item me-lg-2">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `nav-link px-3 ${isActive ? "active-link" : "text-light"}`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item me-lg-2">
                <NavLink
                  to="/articles"
                  className={({ isActive }) =>
                    `nav-link px-3 ${isActive ? "active-link" : "text-light"}`
                  }
                >
                  Artigos
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/generate"
                  className={({ isActive }) =>
                    `btn ${isActive ? "btn-primary" : "btn-outline-light"} px-3`
                  }
                >
                  Gerar Artigo
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Suspense
        fallback={
          <div className="text-center mt-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-3 text-muted">Carregando...</p>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/generate" element={<Generate />} />
          <Route path="/articles/:id" element={<ArticleDetail />} />
        </Routes>
      </Suspense>

      <style>{`
        .nav-link {
          font-weight: 500;
          transition: color 0.2s ease-in-out, transform 0.2s;
        }
        .nav-link:hover {
          color: #0d6efd !important;
          transform: translateY(-1px);
        }
        .active-link {
          color: #0d6efd !important;
          font-weight: 600;
          border-bottom: 2px solid #0d6efd;
        }
        .btn-outline-light:hover {
          background-color: #0d6efd;
          border-color: #0d6efd;
          color: #fff !important;
        }
      `}</style>
    </Router>
  );
}

export default App;
