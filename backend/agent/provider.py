from decouple import config
from openai import OpenAI
from typing import Optional

class LLMProvider:
    def __init__(self, provider: Optional[str] = None, api_key: Optional[str] = None):
        self.provider = provider or config("LLM_PROVIDER", "openai")
        self.api_key = api_key or config("OPENAI_API_KEY")
        if self.provider == "openai":
            self.client = OpenAI(api_key=self.api_key)

    def generate(self, system_prompt: str, user_prompt: str, max_tokens: int = 800) -> str:
        if self.provider == "openai":
            return self._openai(system_prompt, user_prompt, max_tokens)
        if self.provider == "mock":
            return f"{system_prompt}\n\n{user_prompt}\n\n(Resposta simulada)"
        raise ValueError(f"Provider {self.provider} não suportado no adaptador atual")

    def _openai(self, system_prompt: str, user_prompt: str, max_tokens: int):
        response = self.client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            max_tokens=max_tokens,
            temperature=0.7
        )
        return response.choices[0].message.content
