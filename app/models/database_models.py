from typing import Optional

from sqlalchemy import ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.connection import Base


class College(Base):
    __tablename__ = "colleges"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    name: Mapped[str] = mapped_column(
        String(200),
        unique=True,
        nullable=False
    )

    courses: Mapped[list["Course"]] = relationship(
        back_populates="college"
    )


class Course(Base):
    __tablename__ = "courses"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    name: Mapped[str] = mapped_column(
        String(200),
        nullable=False
    )

    college_id: Mapped[int] = mapped_column(
        ForeignKey("colleges.id"),
        nullable=False
    )

    college: Mapped["College"] = relationship(
        back_populates="courses"
    )

    semesters: Mapped[list["Semester"]] = relationship(
        back_populates="course"
    )


class Semester(Base):
    __tablename__ = "semesters"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    number: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    course_id: Mapped[int] = mapped_column(
        ForeignKey("courses.id"),
        nullable=False
    )

    course: Mapped["Course"] = relationship(
        back_populates="semesters"
    )

    subjects: Mapped[list["Subject"]] = relationship(
        back_populates="semester"
    )


class Subject(Base):
    __tablename__ = "subjects"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    name: Mapped[str] = mapped_column(
        String(200),
        nullable=False
    )

    code: Mapped[Optional[str]] = mapped_column(
        String(50),
        nullable=True
    )

    semester_id: Mapped[int] = mapped_column(
        ForeignKey("semesters.id"),
        nullable=False
    )

    semester: Mapped["Semester"] = relationship(
        back_populates="subjects"
    )

    chapters: Mapped[list["Chapter"]] = relationship(
        back_populates="subject"
    )


class Chapter(Base):
    __tablename__ = "chapters"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    name: Mapped[str] = mapped_column(
        String(200),
        nullable=False
    )

    unit_number: Mapped[Optional[int]] = mapped_column(
        Integer,
        nullable=True
    )

    subject_id: Mapped[int] = mapped_column(
        ForeignKey("subjects.id"),
        nullable=False
    )

    subject: Mapped["Subject"] = relationship(
        back_populates="chapters"
    )


class Document(Base):
    __tablename__ = "documents"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    title: Mapped[str] = mapped_column(
        String(300),
        nullable=False
    )

    file_path: Mapped[str] = mapped_column(
        String(500),
        nullable=False
    )

    document_type: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    academic_year: Mapped[Optional[str]] = mapped_column(
        String(20),
        nullable=True
    )

    exam_year: Mapped[Optional[int]] = mapped_column(
        Integer,
        nullable=True
    )

    exam_type: Mapped[Optional[str]] = mapped_column(
        String(50),
        nullable=True
    )

    college_id: Mapped[int] = mapped_column(
        ForeignKey("colleges.id"),
        nullable=False
    )

    course_id: Mapped[int] = mapped_column(
        ForeignKey("courses.id"),
        nullable=False
    )

    semester_id: Mapped[int] = mapped_column(
        ForeignKey("semesters.id"),
        nullable=False
    )

    subject_id: Mapped[int] = mapped_column(
        ForeignKey("subjects.id"),
        nullable=False
    )

    chapter_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("chapters.id"),
        nullable=True
    )


class DocumentContent(Base):
    __tablename__ = "document_contents"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    document_id: Mapped[int] = mapped_column(
        ForeignKey("documents.id"),
        nullable=False,
        unique=True
    )

    extracted_text: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

class DocumentChunk(Base):
    __tablename__ = "document_chunks"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    document_id: Mapped[int] = mapped_column(
        ForeignKey("documents.id"),
        nullable=False
    )

    chunk_index: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    content: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    character_count: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )