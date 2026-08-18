from dataclasses import dataclass
from typing import Optional


@dataclass
class College:
    name: str


@dataclass
class Course:
    name: str
    college: College


@dataclass
class Semester:
    number: int
    course: Course


@dataclass
class Subject:
    name: str
    code: Optional[str]
    semester: Semester


@dataclass
class Chapter:
    name: str
    subject: Subject
    unit_number: Optional[int]


@dataclass
class Document:
    title: str
    document_type: str
    semester_number: int
    subject_name: str
    chapter_name: Optional[str] = None
    academic_year: Optional[str] = None
    exam_year: Optional[int] = None
    exam_type: Optional[str] = None
    college_id: Optional[int] = None
    course_id: Optional[int] = None
    semester_id: Optional[int] = None
    subject_id: Optional[int] = None
    chapter_id: Optional[int] = None