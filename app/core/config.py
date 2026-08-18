import os
from dotenv import load_dotenv

load_dotenv()


from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):

    APP_NAME: str = "AI Study & Research Agent"
    APP_VERSION: str = "1.0.0"

    ENVIRONMENT: str = "development"

    DATABASE_URL: str

    GEMINI_API_KEY: str

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
    )


settings = Settings()