from google import genai

from app.core.config import settings


MODEL_NAME = "gemini-embedding-001"

client = genai.Client(
    api_key=settings.GEMINI_API_KEY
)


def generate_embedding(text: str) -> list[float]:
    """
    Generate a 768-dimensional embedding
    using Gemini Embedding API.
    """

    if not text or not text.strip():
        raise ValueError("Text cannot be empty")

    response = client.models.embed_content(
        model=MODEL_NAME,
        contents=text,
        config={
            "output_dimensionality": 768,
        },
    )

    if not response.embeddings:
        raise RuntimeError(
            "Gemini returned an empty embedding."
        )

    return response.embeddings[0].values
