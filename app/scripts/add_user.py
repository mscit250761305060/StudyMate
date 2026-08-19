import os
import sys

# Add root directory to python path to import app modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

from sqlalchemy.orm import Session
from app.database.connection import SessionLocal, engine, Base
from app.models.user import User
from app.core.security import get_password_hash

def add_user():
    db: Session = SessionLocal()
    try:
        email = "jeelkhokhaneshiya@gmail.com"
        user = db.query(User).filter(User.email == email).first()
        if not user:
            print(f"Creating user {email}...")
            user = User(
                email=email,
                name="Jeel Khokhaneshiya",
                hashed_password=get_password_hash("password123"),
                role="student"
            )
            db.add(user)
            db.commit()
            print("User created successfully with password: password123")
        else:
            print(f"User {email} already exists.")
    except Exception as e:
        print(f"Error creating user: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    # Ensure tables exist
    Base.metadata.create_all(bind=engine)
    add_user()
