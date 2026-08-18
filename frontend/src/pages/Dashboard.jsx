import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Student Dashboard</h2>
        <p>Welcome to your BSc IT academic study dashboard.</p>
      </div>

      <div className="dashboard-grid">
        <Link to="/subjects" className="dashboard-card">
          <h3>📚 Subjects</h3>
          <p>View your semester subjects and chapters.</p>
        </Link>

        <Link to="/study-materials" className="dashboard-card">
          <h3>📖 Study Materials</h3>
          <p>Access syllabus, notes and study documents.</p>
        </Link>

        <Link to="/ai-assistant" className="dashboard-card">
          <h3>🤖 AI Study Assistant</h3>
          <p>Ask questions based on your BSc IT study material.</p>
        </Link>

        <Link to="/question-papers" className="dashboard-card">
          <h3>📝 Question Papers</h3>
          <p>View college and university question papers.</p>
        </Link>

        <Link to="/assignments" className="dashboard-card">
          <h3>📄 Assignments</h3>
          <p>Upload assignments and get syllabus-based answers.</p>
        </Link>

        <Link to="/practice-papers" className="dashboard-card">
          <h3>🎯 Practice Papers</h3>
          <p>Generate practice question papers.</p>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
