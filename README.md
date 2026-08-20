# StudySphere 🎓

> **Your All-in-One BSc IT Academic Assistant**

StudySphere is a comprehensive web portal designed specifically for BSc IT students to streamline their academic journey. From accessing interactive syllabi to chatting with an AI assistant for study help, StudySphere acts as a centralized hub for all your educational needs.

## ✨ Features

- **Dashboard**: A personalized overview of your academic progress and quick access to essential tools.
- **Interactive Syllabus**: Easily navigate through semester-wise subjects and their detailed modules.
- **Study Materials**: Access and download curated notes, lecture slides, and reference materials.
- **Practice Papers**: Browse and download previous year university and college examination papers.
- **AI Assistant**: A built-in AI chatbot capable of answering academic queries, explaining complex topics, and providing study support based on your syllabus.
- **Assignments**: Keep track of upcoming assignments and lab plans.
- **Admin Panel**: A secure backend interface for administrators to upload documents, manage subjects, and update the syllabus content dynamically.

## 🚀 Tech Stack

- **Frontend**: React (built with Vite), CSS3 for a sleek custom UI design.
- **Backend**: FastAPI (Python) for ultra-fast, robust API endpoints.
- **Database**: SQLite (Development) / PostgreSQL (Production) with SQLAlchemy ORM.
- **AI Integration**: Custom Retrieval-Augmented Generation (RAG) system utilizing LLMs for the study assistant.

## 🛠️ Getting Started

Follow these steps to run StudySphere locally on your machine.

### Prerequisites

- Node.js (v18 or higher)
- Python (v3.10 or higher)
- Git

### 1. Clone the repository

```bash
git clone https://github.com/mscit250761305060/StudySphere.git
cd StudySphere
```

### 2. Backend Setup

Open a terminal in the root directory and set up the Python environment:

```bash
# Create and activate a virtual environment
python -m venv venv
venv\Scripts\activate  # On Windows
# source venv/bin/activate  # On Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Run the FastAPI server
uvicorn app.main:app --reload
```
The backend API will be available at `http://localhost:8000`.

### 3. Frontend Setup

Open a **new** terminal in the root directory and navigate to the frontend folder:

```bash
cd frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```
The frontend application will be available at `http://localhost:5173` (or the port specified by Vite).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page to see how you can help.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---
*Designed with ❤️ for BSc IT Students*
