import os
import sys
import csv
import io

# Add root directory to python path to import app modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

from sqlalchemy.orm import Session
from app.database.connection import SessionLocal, engine, Base
from app.models.database_models import College, Course, Semester, Subject

CSV_DATA = """Stream,Semester No,Subject,,,,,
BSc IT,1,Communication Skills,,,,,
BSc IT,1,Fundamentals of Computer and Basics of Programming,,,,,
BSc IT,1,Internet and Web Technology,,,,,
BSc IT,1,Introduction to PC Package And Operating System,,,,,
BSc IT,1,Mathematics-I,,,,,
BSc IT,2,Data Structure,,,,,
BSc IT,2,Database Management System,,,,,
BSc IT,2,Introduction of Computer Hardware And Peripherals Papers,,,,,
BSc IT,2,Mathematics-II,,,,,
BSc IT,2,Object Oriented Programming in C++,,,,,
BSc IT,3,Computer Oriented Numerical Methods,,,,,
BSc IT,3,Digital Electronics,,,,,
BSc IT,3,Object Oriented Programming with JAVA,,,,,
BSc IT,3,Operating System,,,,,
BSc IT,3,Soft Skills and Professional Communication,,,,,
BSc IT,4,Computer Network,,,,,
BSc IT,4,Dot Net Technology,,,,,
BSc IT,4,Information Security,,,,,
BSc IT,4,Statistical Methods and Probabilities,,,,,
BSc IT,4,System Analysis and Design,,,,,
BSc IT,5,Data Warehouse and Mining,,,,,
BSc IT,5,Mobile Application Development,,,,,
BSc IT,5,Python Programming-1,,,,,
BSc IT,5,Software Engineering,,,,,
BSc IT,5,Web Development with PHP,,,,,
BSc IT,6,Compiler Design,,,,,
BSc IT,6,Computer Graphics,,,,,
BSc IT,6,Design and Analysis of Algorithm,,,,,
BSc IT,6,E-Business and Cyber Law,,,,,"""

def seed_academic_data_from_csv():
    db: Session = SessionLocal()
    try:
        # 1. Create or get College
        college_name = "StudyMate Institute of Technology"
        college = db.query(College).filter(College.name == college_name).first()
        if not college:
            print(f"Creating College: {college_name}")
            college = College(name=college_name)
            db.add(college)
            db.commit()
            db.refresh(college)

        reader = csv.DictReader(io.StringIO(CSV_DATA))
        for row in reader:
            course_name = row['Stream']
            semester_number = int(row['Semester No'])
            subject_name = row['Subject']

            # 2. Get or Create Course
            course = db.query(Course).filter(
                Course.name == course_name, 
                Course.college_id == college.id
            ).first()
            
            if not course:
                print(f"  Creating Course: {course_name}")
                course = Course(name=course_name, college_id=college.id)
                db.add(course)
                db.commit()
                db.refresh(course)

            # 3. Get or Create Semester
            semester = db.query(Semester).filter(
                Semester.number == semester_number,
                Semester.course_id == course.id
            ).first()

            if not semester:
                print(f"    Creating Semester: {semester_number}")
                semester = Semester(number=semester_number, course_id=course.id)
                db.add(semester)
                db.commit()
                db.refresh(semester)

            # 4. Get or Create Subject
            subject = db.query(Subject).filter(
                Subject.name == subject_name,
                Subject.semester_id == semester.id
            ).first()

            if not subject:
                print(f"      Creating Subject: {subject_name}")
                subject = Subject(name=subject_name, semester_id=semester.id)
                db.add(subject)
                db.commit()
                        
        print("\nAll CSV academic data successfully saved to PostgreSQL!")

    except Exception as e:
        print(f"Error seeding academic data: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    Base.metadata.create_all(bind=engine)
    seed_academic_data_from_csv()
