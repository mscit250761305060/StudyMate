from qdrant_client.models import PointStruct

from app.core.vector_db import (
    client,
    COLLECTION_NAME,
)
from app.services.embedding import generate_embedding


def store_chunks_in_qdrant(chunks):
    """
    Generate embeddings for document chunks
    and store them in Qdrant.
    """

    points = []

    for chunk in chunks:

        embedding = generate_embedding(
            chunk["content"]
        )

        point = PointStruct(
            id=chunk["id"],
            vector=embedding,
            payload={
                "document_id": chunk["document_id"],
                "college_id": chunk.get("college_id"),
                "course_id": chunk.get("course_id"),
                "semester_id": chunk.get("semester_id"),
                "subject_id": chunk.get("subject_id"),
                "chapter_id": chunk.get("chapter_id"),
                "document_type": chunk.get("document_type"),
                "academic_year": chunk.get("academic_year"),
                "exam_year": chunk.get("exam_year"),
                "exam_type": chunk.get("exam_type"),
                "chunk_index": chunk["chunk_index"],
                "content": chunk["content"],
                "character_count": chunk["character_count"],
            },
        )

        points.append(point)

    if points:
        client.upsert(
            collection_name=COLLECTION_NAME,
            points=points,
        )

    return len(points)

def delete_document_from_qdrant(document_id: int):
    """
    Delete all chunks associated with a specific document_id from Qdrant.
    """
    from qdrant_client.models import Filter, FieldCondition, MatchValue
    
    client.delete(
        collection_name=COLLECTION_NAME,
        points_selector=Filter(
            must=[
                FieldCondition(
                    key="document_id",
                    match=MatchValue(value=document_id)
                )
            ]
        )
    )