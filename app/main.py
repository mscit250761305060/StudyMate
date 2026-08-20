from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.database.connection import Base, engine

from app.models.database_models import (
    College,
    Course,
    Semester,
    Subject,
    Chapter,
    Document,
    DocumentContent,
    DocumentChunk,
    ChatSession,
    ChatMessage,
)
from app.models.user import User

from app.api.routes.academic import router as academic_router
from app.api.routes.documents import router as documents_router
from app.api.routes.ask import router as ask_router
from app.api.routes.chat import router as chat_router
from app.api.auth import router as auth_router

# Create database tables
Base.metadata.create_all(bind=engine)


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5175",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5175",

        "https://studymate-frontend-jyb4.onrender.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(academic_router)
app.include_router(documents_router)
app.include_router(ask_router)
app.include_router(chat_router)
app.include_router(auth_router, prefix="/api/v1")


@app.get("/")
def root():
    return {
        "message": f"{settings.APP_NAME} is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }