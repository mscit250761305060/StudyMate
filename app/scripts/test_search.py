from app.services.search import search_similar_chunks


query = "What is inheritance in Java?"


results = search_similar_chunks(
    query=query,
    limit=3,
)


print("\nSearch Query:")
print(query)

print("\nResults:\n")

for result in results:

    print("=" * 70)

    print("Score:", result.score)

    print("Document ID:", result.payload.get("document_id"))

    print("Chunk Index:", result.payload.get("chunk_index"))

    print("\nContent:")

    print(
        result.payload.get("content")
    )