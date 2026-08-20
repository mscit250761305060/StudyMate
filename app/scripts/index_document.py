from app.database.connection import SessionLocal
from app.models.database_models import Document, DocumentChunk

from app.core.vector_db import create_collection
from app.services.vector_store import store_chunks_in_qdrant


DOCUMENT_ID = 2


def main():

    create_collection()

    db = SessionLocal()

    try:

        document = (
            db.query(Document)
            .filter(
                Document.id == DOCUMENT_ID
            )
            .first()
        )

        if not document:
            print(
                f"Document {DOCUMENT_ID} not found."
            )
            return

        chunks = (
            db.query(DocumentChunk)
            .filter(
                DocumentChunk.document_id == DOCUMENT_ID
            )
            .order_by(
                DocumentChunk.chunk_index
            )
            .all()
        )

        if not chunks:
            print(
                f"No chunks found for document {DOCUMENT_ID}"
            )
            return

        chunk_data = [
            {
                "id": chunk.id,
                "document_id": chunk.document_id,
                "college_id": getattr(
                    document,
                    "college_id",
                    None
                ),
                "course_id": getattr(
                    document,
                    "course_id",
                    None
                ),
                "semester_id": document.semester_id,
                "subject_id": document.subject_id,
                "chapter_id": document.chapter_id,
                "document_type": document.document_type,
                "academic_year": document.academic_year,
                "exam_year": document.exam_year,
                "exam_type": document.exam_type,
                "chunk_index": chunk.chunk_index,
                "content": chunk.content,
                "character_count": chunk.character_count,
            }
            for chunk in chunks
        ]

        count = store_chunks_in_qdrant(
            chunk_data
        )

        print(
            f"Successfully indexed {count} chunks."
        )

    finally:
        db.close()


if __name__ == "__main__":
    main()