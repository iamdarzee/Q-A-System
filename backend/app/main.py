from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import httpx

# Load environment variables
load_dotenv(dotenv_path="app/.env")

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Set your frontend origin in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"

@app.post("/ask")
async def ask_question(request: Request):
    body = await request.json()
    question = body.get("question")

    if not question:
        return {"error": "No question provided"}

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",  # Replace with your domain if needed
        "X-Title": "My FastAPI Client"
    }

    payload = {
        "model": "mistralai/mistral-7b-instruct",
        "messages": [
            {"role": "user", "content": question}
        ]
    }

    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(OPENROUTER_API_URL, json=payload, headers=headers)
            response.raise_for_status()
            answer = response.json()["choices"][0]["message"]["content"]
            return {"answer": answer}
        except Exception as e:
            return {"error": str(e)}
