from app.core.vector_db import (
    client,
    COLLECTION_NAME,
    create_collection,
)


create_collection()


collections = client.get_collections()

print(
    "Available collections:",
    collections
)

collection_info = client.get_collection(
    COLLECTION_NAME
)

print(
    "Collection information:",
    collection_info
)