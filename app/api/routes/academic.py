from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import SessionLocal
from app.models.database_models import (
    College,
    Course,
    Semester,
    Subject,
    Chapter,
)


router = APIRouter(
    prefix="/academic",
    tags=["Academic Structure"],
)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


# --------------------------------------------------
# GET ALL COLLEGES
# --------------------------------------------------

@router.get("/colleges")
def get_colleges(
    db: Session = Depends(get_db),
):
    colleges = (
        db.query(College)
        .order_by(College.name)
        .all()
    )

    return [
        {
            "id": college.id,
            "name": college.name,
        }
        for college in colleges
    ]


# --------------------------------------------------
# GET COURSES FOR A COLLEGE
# --------------------------------------------------

@router.get("/colleges/{college_id}/courses")
def get_courses(
    college_id: int,
    db: Session = Depends(get_db),
):
    college = (
        db.query(College)
        .filter(College.id == college_id)
        .first()
    )

    if not college:
        raise HTTPException(
            status_code=404,
            detail="College not found",
        )

    courses = (
        db.query(Course)
        .filter(
            Course.college_id == college_id
        )
        .order_by(Course.name)
        .all()
    )

    return [
        {
            "id": course.id,
            "name": course.name,
            "college_id": course.college_id,
        }
        for course in courses
    ]


# --------------------------------------------------
# GET SEMESTERS FOR A COURSE
# --------------------------------------------------

@router.get("/courses/{course_id}/semesters")
def get_semesters(
    course_id: int,
    db: Session = Depends(get_db),
):
    course = (
        db.query(Course)
        .filter(Course.id == course_id)
        .first()
    )

    if not course:
        raise HTTPException(
            status_code=404,
            detail="Course not found",
        )

    semesters = (
        db.query(Semester)
        .filter(
            Semester.course_id == course_id
        )
        .order_by(Semester.number)
        .all()
    )

    return [
        {
            "id": semester.id,
            "number": semester.number,
            "course_id": semester.course_id,
        }
        for semester in semesters
    ]


# --------------------------------------------------
# GET SUBJECTS FOR A SEMESTER
# --------------------------------------------------

@router.get("/semesters/{semester_id}/subjects")
def get_subjects(
    semester_id: int,
    db: Session = Depends(get_db),
):
    semester = (
        db.query(Semester)
        .filter(Semester.id == semester_id)
        .first()
    )

    if not semester:
        raise HTTPException(
            status_code=404,
            detail="Semester not found",
        )

    subjects = (
        db.query(Subject)
        .filter(
            Subject.semester_id == semester_id
        )
        .order_by(Subject.name)
        .all()
    )

    return [
        {
            "id": subject.id,
            "name": subject.name,
            "code": subject.code,
            "semester_id": subject.semester_id,
        }
        for subject in subjects
    ]


# --------------------------------------------------
# GET CHAPTERS FOR A SUBJECT
# --------------------------------------------------

@router.get("/subjects/{subject_id}/chapters")
def get_chapters(
    subject_id: int,
    db: Session = Depends(get_db),
):
    subject = (
        db.query(Subject)
        .filter(Subject.id == subject_id)
        .first()
    )

    if not subject:
        raise HTTPException(
            status_code=404,
            detail="Subject not found",
        )

    chapters = (
        db.query(Chapter)
        .filter(
            Chapter.subject_id == subject_id
        )
        .order_by(
            Chapter.unit_number,
            Chapter.id,
        )
        .all()
    )

    return [
        {
            "id": chapter.id,
            "name": chapter.name,
            "unit_number": chapter.unit_number,
            "subject_id": chapter.subject_id,
        }
        for chapter in chapters
    ]

# --------------------------------------------------
# GET COMPLETE ACADEMIC STRUCTURE
# --------------------------------------------------

@router.get("/structure")
def get_academic_structure(
    db: Session = Depends(get_db),
):
    colleges = (
        db.query(College)
        .order_by(College.name)
        .all()
    )

    result = []

    for college in colleges:

        college_data = {
            "id": college.id,
            "name": college.name,
            "courses": [],
        }

        courses = (
            db.query(Course)
            .filter(
                Course.college_id == college.id
            )
            .order_by(Course.name)
            .all()
        )

        for course in courses:

            course_data = {
                "id": course.id,
                "name": course.name,
                "semesters": [],
            }

            semesters = (
                db.query(Semester)
                .filter(
                    Semester.course_id == course.id
                )
                .order_by(Semester.number)
                .all()
            )

            for semester in semesters:

                semester_data = {
                    "id": semester.id,
                    "number": semester.number,
                    "subjects": [],
                }

                subjects = (
                    db.query(Subject)
                    .filter(
                        Subject.semester_id
                        == semester.id
                    )
                    .order_by(Subject.name)
                    .all()
                )

                for subject in subjects:

                    subject_data = {
                        "id": subject.id,
                        "name": subject.name,
                        "code": subject.code,
                        "chapters": [],
                    }

                    chapters = (
                        db.query(Chapter)
                        .filter(
                            Chapter.subject_id
                            == subject.id
                        )
                        .order_by(
                            Chapter.unit_number,
                            Chapter.id,
                        )
                        .all()
                    )

                    for chapter in chapters:

                        subject_data[
                            "chapters"
                        ].append(
                            {
                                "id": chapter.id,
                                "name": chapter.name,
                                "unit_number": (
                                    chapter.unit_number
                                ),
                            }
                        )

                    semester_data[
                        "subjects"
                    ].append(subject_data)

                course_data[
                    "semesters"
                ].append(semester_data)

            college_data[
                "courses"
            ].append(course_data)

        result.append(college_data)

    return {
        "colleges": result
    }