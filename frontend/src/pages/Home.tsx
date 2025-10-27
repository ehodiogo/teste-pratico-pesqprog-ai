function Home() {
  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">

        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold text-dark mb-3">
            Sistema de Geração de Artigos
          </h1>
          <p className="lead text-secondary mx-auto" style={{ maxWidth: "800px" }}>
            Um sistema <b>multiagente</b> que automatiza a criação de artigos utilizando <b>CrewAI</b> e <b>LLMs</b>,
            consultando a <b>Wikipedia</b> para obter contexto relevante e gerar conteúdo de alta qualidade.
          </p>
        </div>

        <div className="row g-4">
          <div className="col-md-6">
            <div className="card shadow-sm rounded-4 h-100 border-0 hover-card">
              <div className="card-body">
                <h5 className="card-title fw-bold mb-3 text-primary">
                  ⚙️ Funcionalidades
                </h5>
                <ul className="list-unstyled mb-0 text-secondary">
                  <li className="mb-2">✅ Geração automática de artigos com no mínimo 300 palavras</li>
                  <li className="mb-2">✅ Tradução automática para inglês (EN-US)</li>
                  <li className="mb-2">✅ Avaliação automática de sentimento</li>
                  <li className="mb-2">✅ Categorização automática do artigo</li>
                  <li className="mb-2">✅ Avaliador para melhorias do artigo</li>
                  <li className="mb-2">✅ Verificador de fatos (avalia se os dados são concisos com a Wikipedia)</li>
                  <li className="mb-2">✅ Sumarização do artigo em português (PT-BR)</li>
                  <li className="mb-2">✅ Geração de quiz com 5 perguntas sobre o artigo</li>
                  <li className="mb-2">✅ Utilização de agentes CrewAI para pesquisa e escrita</li>
                  <li className="mb-2">✅ Consulta à Wikipedia para dados confiáveis</li>
                  <li className="mb-2">✅ Saída validada via Pydantic</li>
                  <li className="mb-2">✅ API REST integrada ao frontend</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow-sm rounded-4 h-100 border-0 hover-card">
              <div className="card-body">
                <h5 className="card-title fw-bold mb-3 text-primary">
                  🧩 Tecnologias Utilizadas
                </h5>
                <ul className="list-unstyled mb-0 text-secondary">
                  <li className="mb-2">💻 <b>Backend:</b> Django + Django REST Framework</li>
                  <li className="mb-2">🤖 <b>Multiagentes:</b> CrewAI + CrewAI Tools + LangChain</li>
                  <li className="mb-2">🧠 <b>LLMs:</b> GPT 4-o-mini</li>
                  <li className="mb-2">📚 <b>Fonte de dados:</b> API da Wikipedia</li>
                  <li className="mb-2">⚛️ <b>Frontend:</b> React + Vite + Bootstrap</li>
                  <li className="mb-2">🎨 <b>Estilização:</b> Bootstrap 5 + customização visual</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="card shadow-sm rounded-4 mt-5 border-0 hover-card">
          <div className="card-body">
            <h5 className="card-title fw-bold mb-3 text-primary">🔗 Links Úteis</h5>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                📘 <a href="https://docs.crewai.com/introduction" target="_blank" rel="noreferrer">
                  Documentação CrewAI
                </a>
              </li>
              <li className="mb-2">
                🧩 <a href="https://docs.crewai.com/concepts/tools" target="_blank" rel="noreferrer">
                  CrewAI Tools
                </a>
              </li>
              <li className="mb-2">
                💡 <a href="https://www.promptingguide.ai/pt/techniques" target="_blank" rel="noreferrer">
                  Engenharia de Prompts
                </a>
              </li>
              <li className="mb-2">
                🎓 <a href="https://www.deeplearning.ai/short-courses/multi-ai-agent-systems-with-crewai/" target="_blank" rel="noreferrer">
                  Curso Multi-Agentes (DeepLearning.AI)
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        .hover-card {
          transition: all 0.25s ease-in-out;
        }
        .hover-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.1) !important;
        }
        a {
          color: #0d6efd;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}

export default Home;
