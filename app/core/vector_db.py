import atexit

from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams


QDRANT_PATH = "qdrant_storage"
COLLECTION_NAME = "bsc_it_documents"


client = QdrantClient(
    path=QDRANT_PATH
)

atexit.register(client.close)


def create_collection():
    collections = client.get_collections()

    existing_names = [
        collection.name
        for collection in collections.collections
    ]

    if COLLECTION_NAME not in existing_names:
        client.create_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=VectorParams(
                size=384,
                distance=Distance.COSINE,
            ),
        )

        print(
            f"Collection '{COLLECTION_NAME}' created successfully!"
        )

    else:
        print(
            f"Collection '{COLLECTION_NAME}' already exists."
        )