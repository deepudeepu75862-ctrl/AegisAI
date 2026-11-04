from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.datasets import router as datasets_router

app = FastAPI(
    title="AegisAI",
    description="Intelligent Predictive Analytics & Risk Intelligence Platform",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "project": "AegisAI",
        "status": "running",
        "message": "Welcome to AegisAI",
    }

@app.get("/health")
def health():
    return {"status": "healthy"}

app.include_router(datasets_router, prefix="/api/datasets", tags=["datasets"])
