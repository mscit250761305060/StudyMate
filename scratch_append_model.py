
class DocumentFile(Base):
    __tablename__ = "document_files"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    document_id: Mapped[int] = mapped_column(
        ForeignKey("documents.id"),
        nullable=False,
        unique=True
    )

    file_data: Mapped[bytes] = mapped_column(
        LargeBinary,
        nullable=False
    )
