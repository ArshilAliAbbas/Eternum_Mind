from fastapi import FastAPI
from transformers import pipeline
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
import os

app = FastAPI()

summarizer = pipeline("summarization", model="sshleifer/distilbart-cnn-12-6")
embedder = SentenceTransformer('all-MiniLM-L6-v2')
USER_ID = os.getenv("USER_ID", "default")

dimension = 384
index = faiss.IndexFlatL2(dimension)
entries = []

@app.post("/summarize")
async def summarize_entry(data: dict):
    text = data.get("text", "")
    past_entries = data.get("past_entries", [])
    if not text:
        return {"error": "No text provided"}
    context = " ".join(past_entries + [text])
    summary = summarizer(context, max_length=100, min_length=30, do_sample=False)[0]["summary_text"]
    embedding = embedder.encode(text)
    index.add(np.array([embedding]))
    entries.append(text)
    return {"user_id": USER_ID, "summary": summary, "original": text}

@app.post("/search")
async def search_entries(data: dict):
    query = data.get("query", "")
    if not query:
        return {"error": "No query provided"}
    query_embedding = embedder.encode(query)
    distances, indices = index.search(np.array([query_embedding]), k=3)
    results = [entries[i] for i in indices[0] if i < len(entries)]
    return {"user_id": USER_ID, "results": results}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

                

