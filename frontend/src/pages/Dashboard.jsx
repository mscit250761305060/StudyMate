import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import bannerImg from "../assets/study_banner_img.jpg";
import "../Dashboard.css";

function Dashboard() {
  const { user } = useAuth();
  
  return (
    <div className="dashboard-page">
      <div className="welcome-banner">
        <div className="banner-content">
          <div className="banner-greeting">
            <span className="wave-emoji">👋</span> Welcome back,
          </div>
          <h2>{user?.name || "Student"}!</h2>
          <p>What would you like to learn today?</p>
        </div>
        <div className="banner-illustration">
          <img src={bannerImg} alt="Study Books" />
        </div>
      </div>

      <div className="main-dashboard-grid">
        <Link to="/syllabus" className="dash-card">
          <div className="card-icon-wrapper purple-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
            </svg>
          </div>
          <div className="card-text">
            <h3>Syllabus</h3>
            <p>Explore your semester syllabus and subject details.</p>
          </div>
          <div className="card-arrow purple-arrow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </div>
        </Link>

        <Link to="/study-materials" className="dash-card">
          <div className="card-icon-wrapper blue-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
          </div>
          <div className="card-text">
            <h3>Study Materials</h3>
            <p>Access notes, PDFs, and study materials for all subjects.</p>
          </div>
          <div className="card-arrow blue-arrow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </div>
        </Link>

        <Link to="/assignments" className="dash-card">
          <div className="card-icon-wrapper green-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <div className="card-text">
            <h3>Assignments</h3>
            <p>View and download subject-wise assignments.</p>
          </div>
          <div className="card-arrow green-arrow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </div>
        </Link>

        <Link to="/lab-plan" className="dash-card">
          <div className="card-icon-wrapper orange-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 2v2"></path>
              <path d="M15 2v2"></path>
              <path d="M12 2v13"></path>
              <path d="M12 15a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
            </svg>
          </div>
          <div className="card-text">
            <h3>Lab Plans</h3>
            <p>View practicals and laboratory plans.</p>
          </div>
          <div className="card-arrow orange-arrow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </div>
        </Link>

        <Link to="/previous-papers" className="dash-card">
          <div className="card-icon-wrapper pink-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="9" y1="15" x2="15" y2="15"></line>
            </svg>
          </div>
          <div className="card-text">
            <h3>Previous Papers</h3>
            <p>Practice with college and university previous papers.</p>
          </div>
          <div className="card-arrow pink-arrow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </div>
        </Link>

        <Link to="/ai-assistant" className="dash-card ai-card">
          <div className="card-badge">✨ Popular</div>
          <div className="card-icon-wrapper ai-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 8V4H8"></path>
              <rect x="4" y="8" width="16" height="12" rx="2"></rect>
              <path d="M2 14h2"></path>
              <path d="M20 14h2"></path>
              <path d="M15 13v2"></path>
              <path d="M9 13v2"></path>
            </svg>
          </div>
          <div className="card-text">
            <h3>Ask AI</h3>
            <p>Ask questions and get answers from your study materials.</p>
          </div>
          <div className="card-arrow ai-arrow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </div>
        </Link>
      </div>

      <div className="stats-row">
        <div className="stat-item">
          <div className="stat-icon purple-light"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg></div>
          <div className="stat-info">
            <h4>6</h4>
            <span>Total Semesters</span>
          </div>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <div className="stat-icon blue-light"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg></div>
          <div className="stat-info">
            <h4>32+</h4>
            <span>Subjects</span>
          </div>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <div className="stat-icon green-light"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg></div>
          <div className="stat-info">
            <h4>250+</h4>
            <span>Study Materials</span>
          </div>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <div className="stat-icon orange-light"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg></div>
          <div className="stat-info">
            <h4>120+</h4>
            <span>Assignments</span>
          </div>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <div className="stat-icon purple-light"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 8V4H8"></path><rect x="4" y="8" width="16" height="12" rx="2"></rect><path d="M2 14h2"></path><path d="M20 14h2"></path><path d="M15 13v2"></path><path d="M9 13v2"></path></svg></div>
          <div className="stat-info">
            <h4>AI Powered</h4>
            <span>Smart Assistant</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
