from pathlib import Path

from pypdf import PdfReader


def extract_text_from_pdf(file_path: str) -> str:
    """
    Extract text from a PDF file.

    Returns:
        Extracted text as a single string.
    """

    path = Path(file_path)

    if not path.exists():
        raise FileNotFoundError(
            f"PDF file not found: {file_path}"
        )

    reader = PdfReader(str(path))

    pages_text = []

    for page_number, page in enumerate(reader.pages, start=1):
        text = page.extract_text()

        if text:
            pages_text.append(
                f"\n--- Page {page_number} ---\n{text}"
            )

    return "\n".join(pages_text).strip()