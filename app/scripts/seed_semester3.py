from sqlalchemy.orm import Session

from app.database.connection import SessionLocal
from app.models.database_models import (
    College,
    Course,
    Semester,
    Subject,
    Chapter,
)


def seed_semester_3():
    db: Session = SessionLocal()

    try:
        # --------------------------------------------------
        # FIND EXISTING COLLEGE
        # --------------------------------------------------

        college = (
            db.query(College)
            .filter(College.name == "SSASIT")
            .first()
        )

        if not college:
            print("❌ SSASIT college not found.")
            print("Create the college first using the Academic API.")
            return

        # --------------------------------------------------
        # FIND EXISTING COURSE
        # --------------------------------------------------

        course = (
            db.query(Course)
            .filter(
                Course.name == "Integrated MSc IT",
                Course.college_id == college.id,
            )
            .first()
        )

        if not course:
            print("❌ Integrated MSc IT course not found.")
            print("Create the course first using the Academic API.")
            return

        # --------------------------------------------------
        # FIND EXISTING SEMESTER 3
        # --------------------------------------------------

        semester = (
            db.query(Semester)
            .filter(
                Semester.number == 3,
                Semester.course_id == course.id,
            )
            .first()
        )

        if not semester:
            print("❌ Semester 3 not found.")
            print("Create Semester 3 first using the Academic API.")
            return

        # --------------------------------------------------
        # SEMESTER 3 SUBJECTS + MODULES
        # --------------------------------------------------

        subjects_data = [
            {
                "name": "Computer Oriented Numerical Methods",
                "code": "1330502",
                "modules": [
                    (
                        1,
                        "Approximations and Errors; Roots of Equations",
                    ),
                    (
                        2,
                        "Interpolation",
                    ),
                    (
                        3,
                        "Numerical Integration; Numerical Differentiation",
                    ),
                    (
                        4,
                        "Ordinary Differential Equations",
                    ),
                    (
                        5,
                        "Curve Fitting",
                    ),
                    (
                        6,
                        "Systems of Linear Equations",
                    ),
                ],
            },
            {
                "name": "Object Oriented Programming with JAVA",
                "code": "1330505",
                "modules": [
                    (
                        1,
                        "Introduction to Java and Elementary Programming",
                    ),
                    (
                        2,
                        "Selections, Mathematical Functions and Loops",
                    ),
                    (
                        3,
                        "Methods and Arrays",
                    ),
                    (
                        4,
                        "Objects and Classes",
                    ),
                    (
                        5,
                        "Object Oriented Programing",
                    ),
                    (
                        6,
                        "Exception Handling, I/O, abstract classes and interfaces",
                    ),
                ],
            },
            {
                "name": "Operating System",
                "code": "1330503",
                "modules": [
                    (
                        1,
                        "Operating System Concepts",
                    ),
                    (
                        2,
                        "Process Management",
                    ),
                    (
                        3,
                        "Memory Management",
                    ),
                    (
                        4,
                        "File and Device Management",
                    ),
                    (
                        5,
                        "Unix/Linux Operating System",
                    ),
                ],
            },
        ]

        # --------------------------------------------------
        # INSERT SUBJECTS + MODULES
        # --------------------------------------------------

        for subject_data in subjects_data:

            subject = (
                db.query(Subject)
                .filter(
                    Subject.name == subject_data["name"],
                    Subject.semester_id == semester.id,
                )
                .first()
            )

            if not subject:
                subject = Subject(
                    name=subject_data["name"],
                    code=subject_data["code"],
                    semester_id=semester.id,
                )

                db.add(subject)
                db.flush()

                print(
                    f"✅ Created subject: {subject.name}"
                )

            else:
                print(
                    f"ℹ️ Subject already exists: {subject.name}"
                )

            # ----------------------------------------------
            # INSERT MODULES
            # ----------------------------------------------

            for unit_number, module_name in subject_data["modules"]:

                existing_chapter = (
                    db.query(Chapter)
                    .filter(
                        Chapter.subject_id == subject.id,
                        Chapter.unit_number == unit_number,
                    )
                    .first()
                )

                if existing_chapter:
                    print(
                        f"   ℹ️ Unit {unit_number} already exists"
                    )
                    continue

                chapter = Chapter(
                    name=module_name,
                    unit_number=unit_number,
                    subject_id=subject.id,
                )

                db.add(chapter)

                print(
                    f"   ✅ Created Unit {unit_number}: "
                    f"{module_name}"
                )

        db.commit()

        print()
        print("🎉 Semester 3 seed completed successfully!")

    except Exception as e:
        db.rollback()

        print()
        print("❌ Error while seeding Semester 3:")
        print(e)

    finally:
        db.close()


if __name__ == "__main__":
    seed_semester_3()