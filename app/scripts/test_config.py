from app.core.config import settings


if settings.GEMINI_API_KEY:
    print("GEMINI_API_KEY loaded successfully!")
else:
    print("GEMINI_API_KEY is empty!")