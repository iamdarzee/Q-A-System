import os
import httpx
from dotenv import load_dotenv

load_dotenv()

DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY")  # Use DeepSeek API key

async def get_llm_response(question: str) -> str:
    headers = {
        "Authorization": f"Bearer {DEEPSEEK_API_KEY}",
        "Content-Type": "application/json",
    }
    payload = {
        "query": question,  # Adjust payload structure for DeepSeek
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://api.deepseek.com/v1/query",  # DeepSeek API endpoint
            headers=headers,
            json=payload,
        )
        response.raise_for_status()
        data = response.json()
        return data["response"]  # Adjust based on DeepSeek's response structure




