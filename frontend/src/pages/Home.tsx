
function Home() {
  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">

        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold" style={{ color: '#1a1a1a' }}>Sistema de Geração de Artigos</h1>
          <p className="lead text-secondary">
            Um sistema multiagente que automatiza a criação de artigos utilizando <b>CrewAI</b> e <b>LLMs</b>,
            consultando a Wikipedia para obter contexto relevante.
          </p>
        </div>

        <div className="row g-4">
          <div className="col-md-6">
            <div className="card shadow-sm rounded-4 h-100 border-0">
              <div className="card-body">
                <h5 className="card-title fw-bold mb-3">Funcionalidades</h5>
                <ul className="list-unstyled mb-0">
                  <li className="mb-2">✅ Geração automática de artigos com mínimo de 300 palavras</li>
                  <li className="mb-2">✅ Utiliza agentes CrewAI para pesquisa e escrita</li>
                  <li className="mb-2">✅ Consulta a Wikipedia para informações confiáveis</li>
                  <li className="mb-2">✅ Saída formatada usando Pydantic</li>
                  <li className="mb-2">✅ API REST para integração com frontend</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow-sm rounded-4 h-100 border-0">
              <div className="card-body">
                <h5 className="card-title fw-bold mb-3">Tecnologias Utilizadas</h5>
                <ul className="list-unstyled mb-0">
                  <li className="mb-2">💻 <b>Backend:</b> Django + DRF</li>
                  <li className="mb-2">🤖 <b>Multiagentes:</b> CrewAI + Crewai-tools</li>
                  <li className="mb-2">🧠 <b>LLMs:</b> GPT 4-o</li>
                  <li className="mb-2">📚 <b>Dados:</b> API da Wikipedia</li>
                  <li className="mb-2">⚛️ <b>Frontend:</b> React + Vite + Bootstrap</li>
                  <li className="mb-2">🎨 <b>Estilização:</b> Bootstrap 5</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="card shadow-sm rounded-4 mt-5 border-0">
          <div className="card-body">
            <h5 className="card-title fw-bold mb-3">Links Úteis</h5>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">🔗 <a href="https://docs.crewai.com/introduction" target="_blank" rel="noreferrer">Documentação CrewAI</a></li>
              <li className="mb-2">🔗 <a href="https://docs.crewai.com/concepts/tools" target="_blank" rel="noreferrer">CrewAI Tools</a></li>
              <li className="mb-2">🔗 <a href="https://www.promptingguide.ai/pt/techniques" target="_blank" rel="noreferrer">Engenharia de Prompts</a></li>
              <li className="mb-2">🔗 <a href="https://www.deeplearning.ai/short-courses/multi-ai-agent-systems-with-crewai/" target="_blank" rel="noreferrer">Curso Multi-Agentes</a></li>
            </ul>
          </div>
        </div>

        <footer className="text-center mt-5 mb-3 text-muted">
          &copy; 2025 - Projeto de Demonstração
        </footer>

      </div>
    </div>
  );
}

export default Home;
