from qdrant_client.models import Filter, FieldCondition, MatchValue

from app.core.vector_db import (
    client,
    COLLECTION_NAME,
)
from app.services.embedding import generate_embedding


def search_similar_chunks(
    query: str,
    limit: int = 3,
    semester_id: int | None = None,
    subject_id: int | None = None,
    chapter_id: int | None = None,
    document_type: str | None = None,
):

    if not query or not query.strip():
        raise ValueError(
            "Query cannot be empty"
        )

    query_embedding = generate_embedding(
        query
    )

    conditions = []

    if semester_id is not None:
        conditions.append(
            FieldCondition(
                key="semester_id",
                match=MatchValue(
                    value=semester_id
                ),
            )
        )

    if subject_id is not None:
        conditions.append(
            FieldCondition(
                key="subject_id",
                match=MatchValue(
                    value=subject_id
                ),
            )
        )

    if chapter_id is not None:
        conditions.append(
            FieldCondition(
                key="chapter_id",
                match=MatchValue(
                    value=chapter_id
                ),
            )
        )

    if document_type is not None:
        conditions.append(
            FieldCondition(
                key="document_type",
                match=MatchValue(
                    value=document_type
                ),
            )
        )

    search_filter = None

    if conditions:
        search_filter = Filter(
            must=conditions
        )

    results = client.query_points(
        collection_name=COLLECTION_NAME,
        query=query_embedding,
        query_filter=search_filter,
        limit=limit,
        with_payload=True,
    )

    return results.points