import os
import sys

# Add root directory to python path to import app modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

from sqlalchemy.orm import Session
from app.database.connection import SessionLocal, engine, Base
from app.models.user import User
from app.core.security import get_password_hash

def seed_admin():
    db: Session = SessionLocal()
    try:
        email = "admin@studysphere.com"
        admin = db.query(User).filter(User.email == email).first()
        if not admin:
            print(f"Creating admin user {email}...")
            admin = User(
                email=email,
                name="System Administrator",
                hashed_password=get_password_hash("admin123"),
                role="admin"
            )
            db.add(admin)
            db.commit()
            print("Admin user created successfully!")
        else:
            print(f"Admin user {email} already exists.")
    except Exception as e:
        print(f"Error seeding admin: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    # Ensure tables exist
    Base.metadata.create_all(bind=engine)
    seed_admin()
