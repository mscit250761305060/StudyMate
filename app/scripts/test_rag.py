from app.services.rag import generate_rag_answer


question = "What is inheritance in Java?"


answer = generate_rag_answer(
    question=question,
    limit=3,
)


print("\nQuestion:")
print(question)

print("\nAI Answer:")
print("=" * 70)

print(answer)