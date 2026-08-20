import atexit
import os

from dotenv import load_dotenv
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams


load_dotenv()


QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")

COLLECTION_NAME = "bsc_it_documents_v2"


if not QDRANT_URL:
    raise RuntimeError("QDRANT_URL is not configured in .env")

if not QDRANT_API_KEY:
    raise RuntimeError("QDRANT_API_KEY is not configured in .env")


client = QdrantClient(
    url=QDRANT_URL,
    api_key=QDRANT_API_KEY,
    check_compatibility=False,
)


atexit.register(client.close)


def create_collection():

    collections = client.get_collections()

    existing_names = [
        collection.name
        for collection in collections.collections
    ]

    if not client.collection_exists(collection_name=COLLECTION_NAME):
        client.create_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=VectorParams(
                size=768,
                distance=Distance.COSINE,
            ),
        )
        
        # Create indices for fields used in filtering to comply with Qdrant strict mode
        for field in ["semester_id", "subject_id", "chapter_id", "document_type"]:
            client.create_payload_index(
                collection_name=COLLECTION_NAME,
                field_name=field,
                field_schema="integer" if "id" in field else "keyword"
            )

        print(
            f"Collection '{COLLECTION_NAME}' created successfully!"
        )

    else:

        print(
            f"Collection '{COLLECTION_NAME}' already exists."
        )