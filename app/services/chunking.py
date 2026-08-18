def create_chunks(
    text: str,
    chunk_size: int = 1200,
    chunk_overlap: int = 200,
) -> list[str]:
    """
    Split extracted document text into overlapping chunks.

    The function tries to split at paragraph boundaries
    instead of cutting text randomly.
    """

    if not text or not text.strip():
        return []

    text = text.strip()

    paragraphs = [
        paragraph.strip()
        for paragraph in text.split("\n")
        if paragraph.strip()
    ]

    chunks = []
    current_chunk = ""

    for paragraph in paragraphs:

        # If adding this paragraph stays within the limit
        if len(current_chunk) + len(paragraph) + 1 <= chunk_size:
            if current_chunk:
                current_chunk += "\n\n"

            current_chunk += paragraph

        else:
            # Save current chunk
            if current_chunk:
                chunks.append(current_chunk.strip())

            # Create overlap from previous chunk
            overlap_text = current_chunk[-chunk_overlap:]

            current_chunk = (
                overlap_text + "\n\n" + paragraph
            ).strip()

            # If a single paragraph is very large,
            # split it further.
            if len(current_chunk) > chunk_size * 2:
                while len(current_chunk) > chunk_size:
                    chunks.append(
                        current_chunk[:chunk_size].strip()
                    )

                    current_chunk = current_chunk[
                        chunk_size - chunk_overlap:
                    ].strip()

    # Save final chunk
    if current_chunk:
        chunks.append(current_chunk.strip())

    return chunks