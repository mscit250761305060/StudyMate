import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, text

def migrate():
    load_dotenv()
    DATABASE_URL = os.getenv("DATABASE_URL")
    if not DATABASE_URL:
        print("DATABASE_URL not found.")
        return

    print("Connecting to database...")
    engine = create_engine(DATABASE_URL)
    
    with engine.connect() as connection:
        try:
            print("Altering chat_sessions table to make semester_id and subject_id nullable...")
            connection.execute(text("ALTER TABLE chat_sessions ALTER COLUMN semester_id DROP NOT NULL;"))
            connection.execute(text("ALTER TABLE chat_sessions ALTER COLUMN subject_id DROP NOT NULL;"))
            connection.commit()
            print("Migration successful!")
        except Exception as e:
            print(f"Migration failed: {e}")

if __name__ == "__main__":
    migrate()
