from app.database.connection import SessionLocal
from app.models.database_models import (
    Course,
    Semester,
    Subject,
    Chapter,
)


def main():
    db = SessionLocal()

    try:
        # -----------------------------------------
        # Find BSc IT course
        # -----------------------------------------

        course = (
            db.query(Course)
            .filter(
                Course.name == "BSc IT"
            )
            .first()
        )

        if not course:
            print("BSc IT course not found.")
            return

        # -----------------------------------------
        # Find Semester 3
        # -----------------------------------------

        semester = (
            db.query(Semester)
            .filter(
                Semester.course_id == course.id,
                Semester.number == 3,
            )
            .first()
        )

        if not semester:
            print("Semester 3 not found.")
            return

        # -----------------------------------------
        # Subject
        # -----------------------------------------

        subject = (
            db.query(Subject)
            .filter(
                Subject.semester_id == semester.id,
                Subject.code == "1330505",
            )
            .first()
        )

        if not subject:
            subject = Subject(
                name="Object Oriented Programming with JAVA",
                code="1330505",
                semester_id=semester.id,
            )

            db.add(subject)
            db.flush()

            print(
                "Subject created: "
                "Object Oriented Programming with JAVA"
            )

        else:
            print(
                f"Subject already exists: "
                f"{subject.name} "
                f"(ID: {subject.id})"
            )

        # -----------------------------------------
        # Modules / Chapters
        # -----------------------------------------

        chapters = [
            {
                "unit_number": 1,
                "name": "Introduction to Java and Elementary Programming",
            },
            {
                "unit_number": 2,
                "name": "Selections, Mathematical Functions and Loops",
            },
            {
                "unit_number": 3,
                "name": "Methods and Arrays",
            },
            {
                "unit_number": 4,
                "name": "Objects and Classes",
            },
            {
                "unit_number": 5,
                "name": "Object Oriented Programming",
            },
            {
                "unit_number": 6,
                "name": "Exception Handling, I/O, Abstract Classes and Interfaces",
            },
        ]

        for chapter_data in chapters:

            existing_chapter = (
                db.query(Chapter)
                .filter(
                    Chapter.subject_id == subject.id,
                    Chapter.unit_number
                    == chapter_data["unit_number"],
                )
                .first()
            )

            if existing_chapter:
                print(
                    f"Chapter {chapter_data['unit_number']} "
                    f"already exists."
                )
                continue

            chapter = Chapter(
                name=chapter_data["name"],
                unit_number=chapter_data["unit_number"],
                subject_id=subject.id,
            )

            db.add(chapter)

            print(
                f"Chapter {chapter_data['unit_number']} "
                f"created: {chapter_data['name']}"
            )

        db.commit()

        print()
        print("========================================")
        print("Subject and chapters created successfully")
        print("========================================")
        print(f"Subject ID: {subject.id}")
        print(f"Semester ID: {semester.id}")

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


if __name__ == "__main__":
    main()  