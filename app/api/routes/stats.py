from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.database_models import Semester, Subject, Document

router = APIRouter(
    prefix="/api/stats",
    tags=["Statistics"],
)

@router.get("")
def get_dashboard_stats(db: Session = Depends(get_db)):
    semesters_count = db.query(Semester).count()
    subjects_count = db.query(Subject).count()
    study_materials_count = db.query(Document).filter(Document.document_type == "STUDY_MATERIAL").count()
    assignments_count = db.query(Document).filter(Document.document_type == "ASSIGNMENT").count()

    return {
        "semesters": semesters_count,
        "subjects": subjects_count,
        "study_materials": study_materials_count,
        "assignments": assignments_count
    }
