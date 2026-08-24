from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.database_models import ChatSession, ChatMessage
from app.models.user import User
from app.api.auth import get_current_user
from app.services.rag import generate_rag_answer

router = APIRouter(
    prefix="/api/chats",
    tags=["Chat"],
)

class ChatSessionCreate(BaseModel):
    semester_id: Optional[int] = None
    subject_id: Optional[int] = None
    title: str

class ChatSessionResponse(BaseModel):
    id: int
    semester_id: Optional[int] = None
    subject_id: Optional[int] = None
    title: str

    class Config:
        from_attributes = True

class ChatMessageCreate(BaseModel):
    content: str

class ChatMessageResponse(BaseModel):
    id: int
    role: str
    content: str

    class Config:
        from_attributes = True

@router.get("", response_model=List[ChatSessionResponse])
def get_chat_sessions(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    sessions = db.query(ChatSession).filter(ChatSession.user_id == current_user.id).order_by(ChatSession.created_at.desc()).all()
    return sessions

@router.post("", response_model=ChatSessionResponse)
def create_chat_session(request: ChatSessionCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    session = ChatSession(
        user_id=current_user.id,
        semester_id=request.semester_id,
        subject_id=request.subject_id,
        title=request.title
    )
    db.add(session)
    db.commit()
    db.refresh(session)
    return session

@router.get("/{session_id}/messages", response_model=List[ChatMessageResponse])
def get_chat_messages(session_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    session = db.query(ChatSession).filter(ChatSession.id == session_id, ChatSession.user_id == current_user.id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Chat session not found")
    
    messages = db.query(ChatMessage).filter(ChatMessage.session_id == session_id).order_by(ChatMessage.created_at.asc()).all()
    return messages

@router.post("/{session_id}/messages", response_model=ChatMessageResponse)
def send_chat_message(session_id: int, request: ChatMessageCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    session = db.query(ChatSession).filter(ChatSession.id == session_id, ChatSession.user_id == current_user.id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Chat session not found")

    # Add user message
    user_msg = ChatMessage(session_id=session.id, role="user", content=request.content)
    db.add(user_msg)
    db.commit()

    # Get history for context
    history = db.query(ChatMessage).filter(ChatMessage.session_id == session_id).order_by(ChatMessage.created_at.asc()).all()
    
    # Generate RAG answer
    answer_text = generate_rag_answer(
        question=request.content,
        limit=5,
        semester_id=session.semester_id,
        subject_id=session.subject_id,
        chat_history=history
    )

    # Add AI message
    ai_msg = ChatMessage(session_id=session.id, role="assistant", content=answer_text)
    db.add(ai_msg)
    db.commit()
    db.refresh(ai_msg)

    return ai_msg

@router.delete("/{session_id}")
def delete_chat_session(session_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    session = db.query(ChatSession).filter(ChatSession.id == session_id, ChatSession.user_id == current_user.id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Chat session not found")

    # Due to cascade delete settings in SQLAlchemy, this might also delete messages automatically.
    # But explicitly deleting messages is safe if cascade isn't set up.
    db.query(ChatMessage).filter(ChatMessage.session_id == session_id).delete()
    db.delete(session)
    db.commit()
    return {"message": "Chat session deleted successfully"}
