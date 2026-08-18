from fastapi import APIRouter
from pydantic import BaseModel

from app.services.rag import generate_rag_answer


router = APIRouter(
    prefix="/api",
    tags=["AI Assistant"],
)


class AskRequest(BaseModel):
    question: str
    limit: int = 3

    semester_id: int | None = None
    subject_id: int | None = None
    chapter_id: int | None = None
    document_type: str | None = None


class AskResponse(BaseModel):
    question: str
    answer: str


@router.post("/ask", response_model=AskResponse)
def ask_question(request: AskRequest):

    answer = generate_rag_answer(
        question=request.question,
        limit=request.limit,
        semester_id=request.semester_id,
        subject_id=request.subject_id,
        chapter_id=request.chapter_id,
        document_type=request.document_type,
    )

    return AskResponse(
        question=request.question,
        answer=answer,
    )