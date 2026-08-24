import { Link } from "react-router-dom";
import logoImage from "../assets/logo.png";

function Footer() {
  return (
    <footer className="dashboard-footer">
      <div className="footer-content-wrapper">
        <div className="footer-brand">
          <div className="footer-logo-wrap">
            <img src={logoImage} alt="StudySphere Logo" className="footer-logo" />
            <div>
              <h3>StudySphere</h3>
              <p>Learn. Explore. Succeed.</p>
            </div>
          </div>
        </div>

        <div className="footer-links-section">
          <div className="footer-col">
            <h4>Quick Links</h4>
            <Link to="/syllabus">Syllabus</Link>
            <Link to="/study-materials">Materials</Link>
            <Link to="/assignments">Assignments</Link>
            <Link to="/lab-plan">Lab Plans</Link>
            <Link to="/ai-assistant">Ask AI</Link>
          </div>
          
          <div className="footer-col">
            <h4>Resources</h4>
            <Link to="/previous-papers">Previous Papers</Link>
            <Link to="#">Study Tips</Link>
            <Link to="#">Exam Preparation</Link>
            <Link to="#">Guides</Link>
          </div>

          <div className="footer-col">
            <h4>Connect</h4>
            <Link to="#">Discord Community</Link>
            <Link to="#">Feedback</Link>
            <Link to="#">Support</Link>
          </div>
        </div>

        <div className="footer-quote">
          <div className="quote-icon">“</div>
          <p>Education is the key to unlock the golden door of freedom.</p>
          <span>– George Washington Carver</span>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} StudySphere. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
