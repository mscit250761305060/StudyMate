import os
import sys

# Add root directory to python path to import app modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

from app.database.connection import engine, Base
from app.models.user import User

if __name__ == "__main__":
    print("Dropping users table...")
    User.__table__.drop(engine, checkfirst=True)
    print("Recreating users table...")
    User.__table__.create(engine)
    print("Done!")
