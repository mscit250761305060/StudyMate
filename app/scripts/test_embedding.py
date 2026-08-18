from app.services.embedding import generate_embedding


text = """
Inheritance in Java allows one class to acquire
the properties and methods of another class.
"""


embedding = generate_embedding(text)


print("Embedding generated successfully!")
print("Vector dimensions:", len(embedding))
print("First 5 values:", embedding[:5])