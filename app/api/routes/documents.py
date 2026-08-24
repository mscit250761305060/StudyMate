from pathlib import Path
from typing import Optional

from fastapi import (
    APIRouter,
    Depends,
    File,
    Form,
    HTTPException,
    UploadFile,
)
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.database_models import (
    Document,
    DocumentContent,
    DocumentChunk,
    Semester,
    Subject,
    Chapter,
)

from app.services.chunking import create_chunks

from app.services.pdf_extractor import extract_text_from_pdf

from pathlib import Path

from fastapi.responses import FileResponse


router = APIRouter(
    prefix="/documents",
    tags=["Documents"]
)


UPLOAD_DIR = Path("data/documents")
UPLOAD_DIR.mkdir(
    parents=True,
    exist_ok=True
)


ALLOWED_DOCUMENT_TYPES = {
    "SYLLABUS",
    "STUDY_MATERIAL",
    "ASSIGNMENT",
    "LAB_PLAN",
    "COLLEGE_PAPER",
    "UNIVERSITY_PAPER",
}


@router.post("/upload")
async def upload_document(
    title: str = Form(...),
    document_type: str = Form(...),
    college_id: int = Form(...),
    course_id: int = Form(...),
    semester_id: int = Form(...),
    subject_id: int = Form(...),
    chapter_id: Optional[int] = Form(None),
    academic_year: Optional[str] = Form(None),
    exam_year: Optional[int] = Form(None),
    exam_type: Optional[str] = Form(None),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    # --------------------------------------------------
    # Validate document type
    # --------------------------------------------------

    if document_type not in ALLOWED_DOCUMENT_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Invalid document type"
        )

    # --------------------------------------------------
    # Validate file type
    # --------------------------------------------------

    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed"
        )

    # --------------------------------------------------
    # Validate academic hierarchy
    # --------------------------------------------------

    from app.models.database_models import College, Course

    college = db.query(College).filter(College.id == college_id).first()
    if not college:
        raise HTTPException(
            status_code=404,
            detail="College not found",
        )

    course = (
        db.query(Course)
        .filter(
            Course.id == course_id,
            Course.college_id == college_id,
        )
        .first()
    )
    if not course:
        raise HTTPException(
            status_code=404,
            detail="Course not found for this college",
        )

    semester = (
        db.query(Semester)
        .filter(
            Semester.id == semester_id,
            Semester.course_id == course_id,
        )
        .first()
    )
    if not semester:
        raise HTTPException(
            status_code=404,
            detail="Semester not found for this course",
        )

    subject = (
        db.query(Subject)
        .filter(
            Subject.id == subject_id,
            Subject.semester_id == semester_id,
        )
        .first()
    )
    if not subject:
        raise HTTPException(
            status_code=404,
            detail="Subject not found for this semester",
        )

    if chapter_id is not None:
        chapter = (
            db.query(Chapter)
            .filter(
                Chapter.id == chapter_id,
                Chapter.subject_id == subject_id,
            )
            .first()
        )

        if not chapter:
            raise HTTPException(
                status_code=404,
                detail="Chapter not found for this subject",
            )

    # --------------------------------------------------
    # Create safe filename
    # --------------------------------------------------

    original_name = Path(
        file.filename or "document.pdf"
    ).name

    filename = (
        f"{subject_id}_"
        f"{document_type}_"
        f"{original_name}"
    )

    file_path = UPLOAD_DIR / filename

    # --------------------------------------------------
    # Save PDF
    # --------------------------------------------------

    content = await file.read()

    file_path.write_bytes(content)

    # --------------------------------------------------
    # Save database record
    # --------------------------------------------------

    document = Document(
        title=title,
        file_path=str(file_path),
        document_type=document_type,
        academic_year=academic_year,
        exam_year=exam_year,
        exam_type=exam_type,
        college_id=college_id,
        course_id=course_id,
        semester_id=semester_id,
        subject_id=subject_id,
        chapter_id=chapter_id,
    )

    db.add(document)
    db.commit()
    db.refresh(document)

    from app.models.database_models import DocumentFile
    document_file = DocumentFile(
        document_id=document.id,
        file_data=content
    )
    db.add(document_file)
    db.commit()

    # --------------------------------------------------
    # Extract Text, Chunk, and Embed
    # --------------------------------------------------
    try:
        extracted_text = extract_text_from_pdf(document.file_path)
        if extracted_text:
            document_content = DocumentContent(
                document_id=document.id,
                extracted_text=extracted_text,
            )
            db.add(document_content)
            db.commit()
            
            chunks_text = create_chunks(extracted_text)
            if chunks_text:
                db_chunks = []
                for index, chunk_text in enumerate(chunks_text):
                    chunk = DocumentChunk(
                        document_id=document.id,
                        chunk_index=index,
                        content=chunk_text,
                        character_count=len(chunk_text),
                    )
                    db.add(chunk)
                    db_chunks.append(chunk)
                db.commit()
                for c in db_chunks:
                    db.refresh(c)
                
                from app.services.vector_store import store_chunks_in_qdrant
                qdrant_chunks = []
                for c in db_chunks:
                    qdrant_chunks.append({
                        "id": c.id,
                        "document_id": document.id,
                        "college_id": document.college_id,
                        "course_id": document.course_id,
                        "semester_id": document.semester_id,
                        "subject_id": document.subject_id,
                        "chapter_id": document.chapter_id,
                        "document_type": document.document_type,
                        "academic_year": document.academic_year,
                        "exam_year": document.exam_year,
                        "exam_type": document.exam_type,
                        "chunk_index": c.chunk_index,
                        "content": c.content,
                        "character_count": c.character_count,
                    })
                store_chunks_in_qdrant(qdrant_chunks)
    except Exception as e:
        print(f"Extraction/Embedding failed: {e}")

    return {
        "message": "Document uploaded successfully",
        "document_id": document.id,
        "title": document.title,
        "document_type": document.document_type,
        "file_path": document.file_path,
        "college_id": document.college_id,
        "course_id": document.course_id,
        "semester_id": document.semester_id,
        "subject_id": document.subject_id,
        "chapter_id": document.chapter_id,
    }

@router.post("/{document_id}/extract-text")
def extract_document_text(
    document_id: int,
    db: Session = Depends(get_db),
):
    # --------------------------------------------------
    # Find document
    # --------------------------------------------------

    document = (
        db.query(Document)
        .filter(Document.id == document_id)
        .first()
    )

    if not document:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )

    # --------------------------------------------------
    # Check if text already exists
    # --------------------------------------------------

    existing_content = (
        db.query(DocumentContent)
        .filter(
            DocumentContent.document_id == document_id
        )
        .first()
    )

    if existing_content:
        return {
            "message": "Text already extracted",
            "document_id": document_id,
            "content_id": existing_content.id,
            "characters": len(
                existing_content.extracted_text
            ),
        }

    # --------------------------------------------------
    # Extract PDF text
    # --------------------------------------------------

    try:
        from app.models.database_models import DocumentFile
        import io
        doc_file = db.query(DocumentFile).filter(DocumentFile.document_id == document.id).first()
        if doc_file:
            extracted_text = extract_text_from_pdf(io.BytesIO(doc_file.file_data))
        else:
            extracted_text = extract_text_from_pdf(
                document.file_path
            )

    except FileNotFoundError:
        raise HTTPException(
            status_code=404,
            detail="PDF file not found on server"
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"PDF extraction failed: {str(e)}"
        )

    # --------------------------------------------------
    # Check extracted text
    # --------------------------------------------------

    if not extracted_text:
        raise HTTPException(
            status_code=400,
            detail=(
                "No text could be extracted from this PDF. "
                "The PDF may be scanned/image-based."
            )
        )

    # --------------------------------------------------
    # Save extracted text
    # --------------------------------------------------

    document_content = DocumentContent(
        document_id=document_id,
        extracted_text=extracted_text,
    )

    db.add(document_content)
    db.commit()
    db.refresh(document_content)

    return {
        "message": "PDF text extracted successfully",
        "document_id": document_id,
        "content_id": document_content.id,
        "characters": len(extracted_text),
    }

@router.post("/{document_id}/create-chunks")
def create_document_chunks(
    document_id: int,
    db: Session = Depends(get_db),
):
    # --------------------------------------------------
    # Find document
    # --------------------------------------------------

    document = (
        db.query(Document)
        .filter(Document.id == document_id)
        .first()
    )

    if not document:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )

    # --------------------------------------------------
    # Find extracted text
    # --------------------------------------------------

    document_content = (
        db.query(DocumentContent)
        .filter(
            DocumentContent.document_id == document_id
        )
        .first()
    )

    if not document_content:
        raise HTTPException(
            status_code=400,
            detail=(
                "Text has not been extracted yet. "
                "Run the extract-text endpoint first."
            )
        )

    # --------------------------------------------------
    # Check existing chunks
    # --------------------------------------------------

    existing_chunks = (
        db.query(DocumentChunk)
        .filter(
            DocumentChunk.document_id == document_id
        )
        .count()
    )

    if existing_chunks > 0:
        return {
            "message": "Chunks already exist",
            "document_id": document_id,
            "chunk_count": existing_chunks,
        }

    # --------------------------------------------------
    # Create chunks
    # --------------------------------------------------

    chunks = create_chunks(
        document_content.extracted_text
    )

    if not chunks:
        raise HTTPException(
            status_code=400,
            detail="No chunks could be created from the document."
        )

    # --------------------------------------------------
    # Save chunks
    # --------------------------------------------------

    for index, chunk_text in enumerate(chunks):

        chunk = DocumentChunk(
            document_id=document_id,
            chunk_index=index,
            content=chunk_text,
            character_count=len(chunk_text),
        )

        db.add(chunk)

    db.commit()

    return {
        "message": "Document chunks created successfully",
        "document_id": document_id,
        "chunk_count": len(chunks),
    }


@router.get("/subject/{subject_id}")
def get_documents_by_subject(subject_id: int, document_type: Optional[str] = None):
    from app.database.connection import SessionLocal
    from app.models.database_models import Document

    db = SessionLocal()

    try:
        query = db.query(Document).filter(Document.subject_id == subject_id)
        if document_type:
            query = query.filter(Document.document_type == document_type)
            
        documents = query.order_by(Document.id).all()

        return [
            {
                "id": document.id,
                "title": document.title,
                "file_path": document.file_path,
                "document_type": document.document_type,
                "academic_year": document.academic_year,
                "exam_year": document.exam_year,
                "exam_type": document.exam_type,
                "college_id": document.college_id,
                "course_id": document.course_id,
                "semester_id": document.semester_id,
                "subject_id": document.subject_id,
                "chapter_id": document.chapter_id,
            }
            for document in documents
        ]

    finally:
        db.close()

@router.get("/file/{file_path:path}")
def open_document(file_path: str, db: Session = Depends(get_db)):
    from app.models.database_models import Document, DocumentFile
    import io
    from fastapi.responses import StreamingResponse

    win_file_path = file_path.replace("/", "\\")
    possible_paths = [
        file_path,
        win_file_path,
        f"data/documents/{file_path}",
        f"data\\documents\\{win_file_path}"
    ]
    
    document = db.query(Document).filter(
        Document.file_path.in_(possible_paths)
    ).first()

    if not document:
        raise HTTPException(
            status_code=404,
            detail="Document record not found"
        )

    doc_file = db.query(DocumentFile).filter(DocumentFile.document_id == document.id).first()
    
    if not doc_file:
        # Fallback to local disk if not in DB
        base_dir = Path("data/documents").resolve()
        requested_file = (base_dir / file_path).resolve()
        
        if not requested_file.is_file():
            raise HTTPException(
                status_code=404,
                detail="Document file not found in DB or on disk"
            )
            
        return FileResponse(
            path=requested_file,
            media_type="application/pdf",
            filename=requested_file.name,
            content_disposition_type="inline"
        )

    return StreamingResponse(
        io.BytesIO(doc_file.file_data),
        media_type="application/pdf",
        headers={
            "Content-Disposition": f'inline; filename="{Path(file_path).name}"'
        }
    )

@router.delete("/{document_id}")
def delete_document(document_id: int, db: Session = Depends(get_db)):
    from app.models.database_models import Document, DocumentFile, DocumentContent, DocumentChunk
    
    document = db.query(Document).filter(Document.id == document_id).first()
    
    if not document:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )
        
    try:
        # 1. Delete from Qdrant vector store
        from app.services.vector_store import delete_document_from_qdrant
        try:
            delete_document_from_qdrant(document_id)
        except Exception as e:
            print(f"Warning: Failed to delete from Qdrant: {e}")
            
        # 2. Delete database records in correct order (child to parent)
        db.query(DocumentChunk).filter(DocumentChunk.document_id == document_id).delete()
        db.query(DocumentContent).filter(DocumentContent.document_id == document_id).delete()
        db.query(DocumentFile).filter(DocumentFile.document_id == document_id).delete()
        
        # 3. Delete physical file if exists
        try:
            file_path = Path(document.file_path)
            if file_path.exists():
                file_path.unlink()
        except Exception as e:
            print(f"Warning: Failed to delete physical file: {e}")
            
        # 4. Finally delete the Document record
        db.delete(document)
        db.commit()
        
        return {"message": "Document and all associated data deleted successfully"}
        
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Failed to delete document: {str(e)}"
        )