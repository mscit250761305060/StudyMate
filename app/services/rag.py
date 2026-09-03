import time

from google import genai

from app.core.config import settings
from app.services.search import search_similar_chunks


client = genai.Client(
    api_key=settings.GEMINI_API_KEY
)


MODEL_NAME = "gemini-3.1-flash-lite"


def build_rag_prompt(
    question: str,
    retrieved_chunks: list,
    chat_history: list = None,
) -> str:

    context_parts = []

    for index, result in enumerate(
        retrieved_chunks,
        start=1
    ):

        content = result.payload.get(
            "content",
            ""
        )

        context_parts.append(
            f"""
--- SOURCE {index} ---
{content}
"""
        )

    context = "\n".join(context_parts)

    history_str = ""
    if chat_history and len(chat_history) > 0:
        history_str = "Conversation History:\n"
        for msg in chat_history:
            history_str += f"{msg.role.capitalize()}: {msg.content}\n"
        history_str += "\n"

    prompt = f"""
You are an AI Study Assistant for the BSc IT course at SSASIT.

Your main goal is to answer the student's question using the provided Study Material below.
If the student asks a question about a particular subject or assignment, you MUST prioritize finding the exact answer from the uploaded Study Material first.

If the student requests a long, detailed, or comprehensive answer (e.g., a 2-3 page answer), extract as much relevant information as possible from the study material.
If and ONLY if the provided material does not contain enough information to make the answer complete or detailed enough, you are permitted and encouraged to supplement the answer using your own general knowledge (as if searching the web) to fill in the missing details and complete the answer perfectly.

{history_str}Student Question:
{question}

Study Material:
{context}

Instructions:
1. Give a clear, complete, and easy-to-understand answer.
2. Priority #1 is ALWAYS the provided study material. Base your answer heavily on it and use its terminology.
3. If the provided material is incomplete or lacks the necessary detail for the student's request, supplement the answer using your broad external knowledge to provide a comprehensive and detailed response.
4. Do not invent syllabus content or make up fake facts.
5. Make the transition seamless; do not explicitly state "according to the study material" or "according to external knowledge", just provide the best possible comprehensive answer.
"""

    return prompt


def _generate_with_retries(
    prompt: str,
    max_retries: int = 3,
) -> str:

    last_error = None

    for attempt in range(1, max_retries + 1):

        try:

            response = client.models.generate_content(
                model=MODEL_NAME,
                contents=prompt,
            )

            if response.text:
                return response.text

            raise ValueError(
                "Gemini returned an empty response."
            )

        except Exception as exc:

            last_error = exc

            status_code = getattr(
                exc,
                "code",
                getattr(
                    exc,
                    "status_code",
                    None
                )
            )

            if status_code in {
                408,
                429,
                500,
                503,
            } and attempt < max_retries:

                time.sleep(
                    2 ** (attempt - 1)
                )

                continue

            break

    raise RuntimeError(
        f"Gemini API failed: {last_error}"
    ) from last_error


def generate_rag_answer(
    question: str,
    limit: int = 3,
    semester_id: int | None = None,
    subject_id: int | None = None,
    chapter_id: int | None = None,
    document_type: str | None = None,
    chat_history: list = None,
):

    retrieved_chunks = search_similar_chunks(
        query=question,
        limit=limit,
        semester_id=semester_id,
        subject_id=subject_id,
        chapter_id=chapter_id,
        document_type=document_type,
    )

    if not retrieved_chunks:

        return (
            "I could not find relevant information "
            "in the available study material."
        )

    prompt = build_rag_prompt(
        question=question,
        retrieved_chunks=retrieved_chunks,
        chat_history=chat_history,
    )

    return _generate_with_retries(
        prompt
    )