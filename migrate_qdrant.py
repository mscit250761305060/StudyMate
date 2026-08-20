import os
from dotenv import load_dotenv
from qdrant_client import QdrantClient
from qdrant_client.models import PointStruct

load_dotenv()

COLLECTION_NAME = "bsc_it_documents"

# Local Qdrant — READ ONLY for migration
local_client = QdrantClient(
    path="qdrant_storage"
)

# Qdrant Cloud
cloud_client = QdrantClient(
    url=os.getenv("QDRANT_URL"),
    api_key=os.getenv("QDRANT_API_KEY"),
    check_compatibility=False,
)

# Read all local points
points, _ = local_client.scroll(
    collection_name=COLLECTION_NAME,
    limit=100,
    with_vectors=True,
    with_payload=True,
)

print(f"Local points found: {len(points)}")

# Prepare points for Cloud
cloud_points = []

for point in points:
    cloud_points.append(
        PointStruct(
            id=point.id,
            vector=point.vector,
            payload=point.payload,
        )
    )

# Upload to Cloud
if cloud_points:
    cloud_client.upsert(
        collection_name=COLLECTION_NAME,
        points=cloud_points,
    )

    print(f"Uploaded {len(cloud_points)} points to Qdrant Cloud.")
else:
    print("No points found. Nothing uploaded.")

# Verify Cloud
info = cloud_client.get_collection(COLLECTION_NAME)

print(f"Cloud points count: {info.points_count}")

local_client.close()
cloud_client.close()
