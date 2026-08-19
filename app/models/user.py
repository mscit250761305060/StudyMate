from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.database.connection import Base

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    email: Mapped[str] = mapped_column(String(200), unique=True, index=True, nullable=False)
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(300), nullable=False)
    role: Mapped[str] = mapped_column(String(50), default="student", nullable=False)
    course_id: Mapped[int | None] = mapped_column(Integer, nullable=True)
    semester_id: Mapped[int | None] = mapped_column(Integer, nullable=True)
