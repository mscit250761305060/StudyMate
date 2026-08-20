from pathlib import Path

from pypdf import PdfReader


def extract_text_from_pdf(file_input) -> str:
    """
    Extract text from a PDF file.

    Returns:
        Extracted text as a single string.
    """
    import io
    if isinstance(file_input, str):
        path = Path(file_input)
        if not path.exists():
            raise FileNotFoundError(f"PDF file not found: {file_input}")
        reader = PdfReader(str(path))
    else:
        reader = PdfReader(file_input)

    pages_text = []

    for page_number, page in enumerate(reader.pages, start=1):
        text = page.extract_text()

        if text:
            pages_text.append(
                f"\n--- Page {page_number} ---\n{text}"
            )

    return "\n".join(pages_text).strip()