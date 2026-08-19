import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

from app.database.connection import SessionLocal
from app.models.database_models import College, Course, Semester, Subject, Chapter, Document, DocumentContent, DocumentChunk

def clear_data():
    db = SessionLocal()
    try:
        print("Deleting document contents and chunks...")
        db.query(DocumentContent).delete()
        db.query(DocumentChunk).delete()
        print("Deleting documents...")
        db.query(Document).delete()
        print("Deleting chapters...")
        db.query(Chapter).delete()
        print("Deleting subjects...")
        db.query(Subject).delete()
        print("Deleting semesters...")
        db.query(Semester).delete()
        print("Deleting courses...")
        db.query(Course).delete()
        print("Deleting colleges...")
        db.query(College).delete()
        
        db.commit()
        print("All academic data has been successfully removed!")
    except Exception as e:
        print(f"Error clearing data: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    clear_data()
