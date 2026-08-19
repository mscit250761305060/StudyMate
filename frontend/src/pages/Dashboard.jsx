import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function Dashboard() {
  return (
    <div className="student-dashboard">
      <div className="dashboard-header" style={{ textAlign: "center", marginBottom: "30px" }}>
        <h2>Student Dashboard</h2>
        <p>Your BSc IT academic study workspace</p>
      </div>

      <div className="dashboard-grid">
        <Link to="/syllabus" className="dashboard-card">
          <div className="dashboard-card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>
          </div>
          <h3>Syllabus</h3>
          <p>Explore your semester syllabus and subjects.</p>
        </Link>

        <Link to="/study-materials" className="dashboard-card">
          <div className="dashboard-card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
          </div>
          <h3>Study Materials</h3>
          <p>Access notes, course content, and study documents.</p>
        </Link>

        <Link to="/assignments" className="dashboard-card">
          <div className="dashboard-card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          </div>
          <h3>Assignments</h3>
          <p>View assignments organized by subject.</p>
        </Link>

        <Link to="/lab-plan" className="dashboard-card">
          <div className="dashboard-card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 2v2"></path><path d="M15 2v2"></path><path d="M12 2v13"></path><path d="M12 15a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path></svg>
          </div>
          <h3>Lab Plan</h3>
          <p>View practicals and laboratory plans.</p>
        </Link>

        <Link to="/previous-papers" className="dashboard-card">
          <div className="dashboard-card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="9" y1="15" x2="15" y2="15"></line></svg>
          </div>
          <h3>Previous Papers</h3>
          <p>Practice with college and university question papers.</p>
        </Link>

        <Link to="/ai-assistant" className="dashboard-card ai-card">
          <div className="dashboard-card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"></path><rect x="4" y="8" width="16" height="12" rx="2"></rect><path d="M2 14h2"></path><path d="M20 14h2"></path><path d="M15 13v2"></path><path d="M9 13v2"></path></svg>
          </div>
          <h3>Ask AI</h3>
          <p>Get syllabus-based answers from your BSc IT study materials.</p>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
