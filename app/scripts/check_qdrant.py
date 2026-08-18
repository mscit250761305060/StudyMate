from app.core.vector_db import (
    client,
    COLLECTION_NAME,
)


info = client.get_collection(
    COLLECTION_NAME
)

print("Collection:", COLLECTION_NAME)
print("Points:", info.points_count)
print("Vectors are stored for each point.")