from app.models.academic import (
    College,
    Course,
    Semester,
    Subject,
    Chapter,
    Document,
)


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