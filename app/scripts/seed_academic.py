from app.database.connection import SessionLocal
from app.models.database_models import (
    College,
    Course,
    Semester,
)


def main():
    db = SessionLocal()

    try:
        # -----------------------------------------
        # 1. College
        # -----------------------------------------

        college = (
            db.query(College)
            .filter(
                College.name == "SSASIT"
            )
            .first()
        )

        if not college:
            college = College(
                name="SSASIT"
            )

            db.add(college)
            db.flush()

            print("College created: SSASIT")

        else:
            print(
                f"College already exists: "
                f"{college.name} "
                f"(ID: {college.id})"
            )

        # -----------------------------------------
        # 2. BSc IT Course
        # -----------------------------------------

        course = (
            db.query(Course)
            .filter(
                Course.name == "BSc IT",
                Course.college_id == college.id,
            )
            .first()
        )

        if not course:
            course = Course(
                name="BSc IT",
                college_id=college.id,
            )

            db.add(course)
            db.flush()

            print("Course created: BSc IT")

        else:
            print(
                f"Course already exists: "
                f"{course.name} "
                f"(ID: {course.id})"
            )

        # -----------------------------------------
        # 3. Semester 3
        # -----------------------------------------

        semester = (
            db.query(Semester)
            .filter(
                Semester.number == 3,
                Semester.course_id == course.id,
            )
            .first()
        )

        if not semester:
            semester = Semester(
                number=3,
                course_id=course.id,
            )

            db.add(semester)
            db.flush()

            print("Semester created: Semester 3")

        else:
            print(
                f"Semester already exists: "
                f"Semester {semester.number} "
                f"(ID: {semester.id})"
            )

        db.commit()

        print()
        print("Academic structure created successfully!")
        print()
        print(
            f"College ID: {college.id}"
        )
        print(
            f"Course ID: {course.id}"
        )
        print(
            f"Semester ID: {semester.id}"
        )

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


if __name__ == "__main__":
    main()