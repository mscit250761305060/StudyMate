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
You are an AI Study Assistant for the
BSc IT course at SSASIT.

Answer the student's question using ONLY
the study material provided below.

{history_str}Student Question:
{question}

Study Material:
{context}

Instructions:

1. Give a clear and easy-to-understand answer.
2. Keep the answer relevant to the student's question.
3. Prefer the terminology used in the provided study material.
4. Do not invent syllabus content.
5. If the provided material does not contain
   enough information to answer the question,
   clearly say that the available study material
   does not contain enough information.
6. Do not pretend that information is present
   when it is not.
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
                "status_code",
                None
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