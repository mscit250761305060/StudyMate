from app.models.academic import (
    College,
    Course,
    Semester,
    Subject,
    Chapter,
    Document,
)


def test_document_model_accepts_academic_metadata():
    document = Document(
        title="Example PDF",
        document_type="CHAPTER_MATERIAL",
        semester_number=3,
        subject_name="Example Subject",
        chapter_name="Unit 1",
        academic_year="2026-27",
        exam_year=2025,
        exam_type="University",
        college_id=1,
        course_id=2,
        semester_id=3,
        subject_id=4,
        chapter_id=5,
    )

    assert document.college_id == 1
    assert document.course_id == 2
    assert document.semester_id == 3
    assert document.subject_id == 4
    assert document.chapter_id == 5


college = College(
    name="SSASIT"
)

course = Course(
    name="BSc IT",
    college=college
)

semester = Semester(
    number=3,
    course=course
)

subject = Subject(
    name="Example Subject",
    code=None,
    semester=semester
)

chapter = Chapter(
    name="Unit 1",
    subject=subject,
    unit_number=1
)

document = Document(
    title="Example PDF",
    document_type="CHAPTER_MATERIAL",
    semester_number=3,
    subject_name="Example Subject",
    chapter_name="Unit 1"
)


print(college)
print(course)
print(semester)
print(subject)
print(chapter)
print(document)