import os
import sys

# Add root directory to python path to import app modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

from sqlalchemy import text
from app.database.connection import SessionLocal

def update_user():
    db = SessionLocal()
    try:
        # Alter table to drop not null constraint
        db.execute(text("ALTER TABLE users ALTER COLUMN name DROP NOT NULL;"))
        db.execute(text("ALTER TABLE users ALTER COLUMN hashed_password DROP NOT NULL;"))
        
        # Update user
        db.execute(
            text("UPDATE users SET role='admin', name=NULL, hashed_password=NULL WHERE email='jeelkhokhaneshiya@gmail.com';")
        )
        db.commit()
        print("Successfully updated the user schema and updated jeelkhokhaneshiya@gmail.com to admin with no name and password.")
    except Exception as e:
        print(f"Error updating user: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    update_user()
