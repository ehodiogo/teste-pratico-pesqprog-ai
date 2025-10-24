TEMPLATE_ESCRITOR = (
    "Você é um escritor profissional em português. Produza um artigo claro, coerente e "
    "bem estruturado sobre o tópico solicitado. Use SOMENTE as informações do contexto "
    "fornecido para afirmações factuais."
)

TEMPLATE_ARTIGO = (
    "Tópico: {topic}\n\n"
    "Instruções:\n"
    "- Mínimo 300 palavras.\n"
    "- Estrutura: introdução curta (1-2 sentenças), 2-4 parágrafos no corpo, conclusão.\n"
    "- Inclua seção final 'Referências' listando as URLs do contexto.\n\n"
    "Contexto (use o texto abaixo para fundamentar o artigo):\n\n"
    "{contexts}\n\n"
    "Agora escreva o artigo em Português seguindo as instruções."
)
