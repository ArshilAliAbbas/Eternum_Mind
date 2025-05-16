import logging
logging.basicConfig(level=logging.DEBUG)
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from langchain import HuggingFacePipeline
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, pipeline
import os

app = FastAPI()

model_name = "google/flan-t5-base"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
pipe = pipeline(
    "text2text-generation",
    model=model,
    tokenizer=tokenizer,
    max_length=512,
    device=-1
)

llm = HuggingFacePipeline(pipeline=pipe)
memory = ConversationBufferMemory()
conversation = ConversationChain(
    llm=llm,
    memory=memory,
    verbose=True
)

USER_ID = os.getenv("USER_ID", "default")

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    user_id: str
    response: str

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        response = conversation.predict(input=request.message)
        memory.save_context({"input": request.message}, {"output": response})
        return {"user_id": USER_ID, "response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating response: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)