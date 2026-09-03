from app.database.connection import SessionLocal
from app.models.database_models import Document, DocumentChunk

from app.core.vector_db import create_collection
from app.services.vector_store import store_chunks_in_qdrant


DOCUMENT_ID = 2


def main():

    create_collection()

    db = SessionLocal()

    try:

        documents = db.query(Document).all()

        if not documents:
            print("No documents found in the database.")
            return

        total_indexed = 0

        for document in documents:
            chunks = (
                db.query(DocumentChunk)
                .filter(
                    DocumentChunk.document_id == document.id
                )
                .order_by(
                    DocumentChunk.chunk_index
                )
                .all()
            )

            if not chunks:
                print(f"No chunks found for document {document.id}")
                continue

            chunk_data = [
                {
                    "id": chunk.id,
                    "document_id": chunk.document_id,
                    "college_id": getattr(document, "college_id", None),
                    "course_id": getattr(document, "course_id", None),
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

            count = store_chunks_in_qdrant(chunk_data)
            total_indexed += count
            print(f"Successfully indexed {count} chunks for document {document.id}.")

        print(f"\nFinished! Total chunks indexed across all documents: {total_indexed}")

    finally:
        db.close()


if __name__ == "__main__":
    main()