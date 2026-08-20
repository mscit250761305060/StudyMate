import os
import sys

# Add root directory to python path to import app modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

from sqlalchemy.orm import Session
from app.database.connection import SessionLocal, engine, Base
from app.models.database_models import College, Course, Semester, Subject

# This is sample data. You can modify this dictionary to match your exact college curriculum!
ACADEMIC_DATA = {
    "college_name": "StudySphere Institute of Technology",
    "courses": [
        {
            "name": "BSc IT",
            "semesters": [
                {
                    "number": 1,
                    "subjects": ["Programming Principles", "Digital Electronics", "Business Communication", "Mathematics I"]
                },
                {
                    "number": 2,
                    "subjects": ["Object Oriented Programming", "Database Management", "Web Technologies", "Mathematics II"]
                },
                {
                    "number": 3,
                    "subjects": ["Data Structures", "Computer Networks", "Operating Systems", "Python Programming"]
                }
            ]
        },
        {
            "name": "BBA",
            "semesters": [
                {
                    "number": 1,
                    "subjects": ["Principles of Management", "Business Economics", "Financial Accounting"]
                }
            ]
        }
    ]
}

def seed_academic_data():
    db: Session = SessionLocal()
    try:
        # 1. Create or get College
        college = db.query(College).filter(College.name == ACADEMIC_DATA["college_name"]).first()
        if not college:
            print(f"Creating College: {ACADEMIC_DATA['college_name']}")
            college = College(name=ACADEMIC_DATA["college_name"])
            db.add(college)
            db.commit()
            db.refresh(college)

        # 2. Iterate through courses
        for course_data in ACADEMIC_DATA["courses"]:
            course = db.query(Course).filter(
                Course.name == course_data["name"], 
                Course.college_id == college.id
            ).first()
            
            if not course:
                print(f"  Creating Course: {course_data['name']}")
                course = Course(name=course_data["name"], college_id=college.id)
                db.add(course)
                db.commit()
                db.refresh(course)

            # 3. Iterate through semesters
            for sem_data in course_data["semesters"]:
                semester = db.query(Semester).filter(
                    Semester.number == sem_data["number"],
                    Semester.course_id == course.id
                ).first()

                if not semester:
                    print(f"    Creating Semester: {sem_data['number']}")
                    semester = Semester(number=sem_data["number"], course_id=course.id)
                    db.add(semester)
                    db.commit()
                    db.refresh(semester)

                # 4. Iterate through subjects
                for subject_name in sem_data["subjects"]:
                    subject = db.query(Subject).filter(
                        Subject.name == subject_name,
                        Subject.semester_id == semester.id
                    ).first()

                    if not subject:
                        print(f"      Creating Subject: {subject_name}")
                        subject = Subject(name=subject_name, semester_id=semester.id)
                        db.add(subject)
                        
        db.commit()
        print("\nAll academic data successfully saved to PostgreSQL!")

    except Exception as e:
        print(f"Error seeding academic data: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    Base.metadata.create_all(bind=engine)
    seed_academic_data()