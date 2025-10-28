# Sistema Multiagente para Geração de Artigos Utilizando CrewAI

Um sistema **multiagente inteligente** desenvolvido com **CrewAI** que automatiza a criação de artigos informativos baseados em conteúdos da **Wikipedia**, aplicando técnicas de **engenharia de prompts**, **análise de sentimento**, **tradução automática** e **validação factual**.

---

## Visão Geral

O projeto implementa uma pipeline de agentes autônomos que trabalham de forma colaborativa para gerar artigos completos sobre qualquer tema fornecido. O fluxo inicia com a consulta à API da Wikipedia e passa por múltiplas etapas: escrita, tradução, revisão, categorização, análise de sentimento e geração de quiz.

A interface web exibe o sistema de forma visual e amigável, integrando um backend **Django REST API** e um frontend em **React + Bootstrap**.

---

## Funcionalidades Principais

- ✅ **Geração automática de artigos** com no mínimo **300 palavras**
- ✅ **Sumarização** do conteúdo em **português (PT-BR)**
- ✅ **Tradução automática** para **inglês (EN-US)**
- ✅ **Análise de sentimento** (Positivo / Negativo / Neutro)
- ✅ **Categorização automática** (Ciência, História, Tecnologia, etc.)
- ✅ **Verificação factual** com base na Wikipedia
- ✅ **Revisor editorial** para sugestões de melhoria
- ✅ **Geração de quiz** com 5 perguntas de múltipla escolha
- ✅ **Validação do output via Pydantic**
- ✅ **Integração REST API** com frontend React
- ✅ **Engenharia de prompts aplicada** em todas as TAREFAS

---

## 🧩 Arquitetura Multiagente

O sistema utiliza o framework **CrewAI** para coordenar os agentes, cada um responsável por uma tarefa específica:

| Agente | Função |
|--------|--------|
| 🧭 `wiki_agent` | Consulta a API da Wikipedia e retorna um resumo factual |
| ✍️ `writer_agent` | Escreve o artigo completo com base no resumo |
| 😀 `sentiment_agent` | Analisa o sentimento predominante do texto |
| 🌐 `translator_agent` | Traduz o artigo para o idioma desejado |
| 🧠 `quiz_agent` | Gera perguntas de múltipla escolha sobre o conteúdo |
| 🔍 `fact_checker_agent` | Verifica consistência factual com a Wikipedia |
| 📝 `reviewer_agent` | Oferece feedback editorial e sugestões |
| 🗂️ `category_agent` | Classifica o artigo por categoria temática |

---

## Tecnologias Utilizadas

### 🖥️ Backend
- **Python 3.11+**
- **Django + Django REST Framework**
- **CrewAI** — Gerenciamento e orquestração de agentes
- **CrewAI Tools** — Ferramentas personalizadas para integração com APIs
- **Pydantic** — Validação e estruturação do output
- **Requests / HTTPX** — Comunicação com a API da Wikipedia

### 💡 LLMs
- **GPT 4-o-mini** (OpenAI)
- Foi utilizado uma **temperaturate=0.3** para evitar alucinações

### 🎨 Frontend
- **React + Vite**
- **Bootstrap 5** (UI responsiva)
- **Axios** (consumo da API)
- **React Router** (navegação SPA)

### 📚 Fonte de Dados
- **API da Wikipedia**  
  Exemplo de endpoint:  
  ```
  https://pt.wikipedia.org/w/api.php?action=query&prop=extracts&exlimit=1&explaintext=1&titles=Futebol&format=json&utf8=1&redirects=1
  ```

---

## 🧠 Engenharia de Prompts

Foram aplicadas técnicas de *prompt engineering* para guiar o comportamento dos agentes:
- Instruções específicas e contextuais para cada tarefa (`Task`).
- Definição clara de `expected_output` para controle de qualidade.
- Uso de linguagem neutra e direta para minimizar *alucinações*.
- Encadeamento lógico das respostas entre os agentes.
---

## 🧪 Estrutura do Projeto

```
📂 project_root/
├── 📁 backend/
│   ├── 📁 agents/                  # Definição de cada agente CrewAI
│           ├── 📁 pipelines/               # Pipeline de tarefas (generate_article_pipeline)
│           ├── 📁 tools/                   # CrewAI Tool personalizada (Wikipedia API)
│           ├── 📁 schemas/                 # Modelos Pydantic para output
├── 📁 article/                     # Onde existe o objeto do django e seu serializer         
│   ├── manage.py
│   └── requirements.txt
│
├── 📁 frontend/
│   ├── 📁 src/
│   │   ├── 📁 pages/
│   │   │   └── Home.tsx            # Tela principal
│   │   │   └── ArticleCreate.tsx            # Tela de criação do Artigo
│   │   │   └── ArticleDetail.tsx            # Tela de detalhe do Artigo
│   │   │   └── ArticleList.tsx              # Tela de listagem dos Artigos
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── config/
│   └── package.json
│
└── README.md # O README principal do projeto 
```

---

## 🧰 Instalação e Execução

### 🔹 1. Clonar o repositório
```bash
git clone https://github.com/ehodiogo/teste-pratico-pesqprog-ai
cd teste-pratico-pesqprog-ai
```

### 🔹 2. Instalar dependências do backend
```bash
python -m venv venv
./venv/scripts/activate
pip install -r requirements.txt
```

### 🔹 3. Executar o servidor Django
```bash
cd backend/
python manage.py runserver
```

### 🔹 4. Iniciar o frontend React
```bash
cd ../frontend
npm install
npm run dev
```

Acesse o sistema em: [http://localhost:5173](http://localhost:5173)
Acesse o backend em: [http://localhost:8000](http://localhost:8000)

---

## 🔐 API Endpoints (Exemplo)

| Método | Endpoint              | Descrição                          |
|--------|-----------------------|------------------------------------|
| `POST` | `/api/articles/list/` | Listar todos os artigos do sistema |
| `GET` | `/api/articles/`      | Criar um artigo                    |
| `GET` | `/api/articles/:id/`  | Ver os detalhes do artigo          |

## ✨ Créditos

Desenvolvido por **[Diogo Antonio Bohrer Pereira]** [Site Pessoal](https://diogoantonio.dev)

---