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
)

from app.api.routes.academic import router as academic_router
from app.api.routes.documents import router as documents_router
from app.api.routes.ask import router as ask_router

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
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(academic_router)
app.include_router(documents_router)
app.include_router(ask_router)


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