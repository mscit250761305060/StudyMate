import re

from langchain_text_splitters import RecursiveCharacterTextSplitter


def clean_text(text: str) -> str:
    """
    Clean extracted PDF text.
    """

    # Replace multiple spaces with one space
    text = re.sub(r"[ \t]+", " ", text)

    # Replace multiple newlines with one newline
    text = re.sub(r"\n+", "\n", text)

    # Remove leading/trailing whitespace
    text = text.strip()

    return text


def split_text_into_chunks(
    text: str,
    chunk_size: int = 1000,
    chunk_overlap: int = 200,
) -> list[str]:
    """
    Split text into overlapping chunks.
    """

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
        separators=[
            "\n\n",
            "\n",
            ". ",
            " ",
            ""
        ],
    )

    chunks = splitter.split_text(text)

    return chunks