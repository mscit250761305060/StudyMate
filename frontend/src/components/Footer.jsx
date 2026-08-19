import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        {/* Brand Column */}
        <div className="footer-brand-col">
          <div className="footer-brand-logo">
            <div className="footer-logo-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>
            </div>
            <h2>StudyMate</h2>
          </div>
          <p className="footer-description">
            StudyMate is the ultimate academic companion for BSc IT students. Access interactive syllabi, comprehensive study materials, and AI-powered learning support designed to help you excel.
          </p>
        </div>
        
        {/* Quick Links Column */}
        <div className="footer-links-col">
          <h3>Quick Links</h3>
          <ul className="footer-link-list">
            <li><Link to="/"><span>&gt;</span> Dashboard</Link></li>
            <li><Link to="/syllabus"><span>&gt;</span> Syllabus</Link></li>
            <li><Link to="/study-materials"><span>&gt;</span> Study Materials</Link></li>
            <li><Link to="/previous-papers"><span>&gt;</span> Practice Papers</Link></li>
            <li><Link to="/ai-assistant"><span>&gt;</span> AI Assistant</Link></li>
          </ul>
        </div>
        
        {/* Contact & Support Column */}
        <div className="footer-contact-col">
          <h3>Contact & Support</h3>
          <ul className="footer-contact-list">
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <span>Ahmedabad / Gandhinagar, Gujarat</span>
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              <span>support@studymate.org</span>
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              <span>+91 (079) 23267500</span>
            </li>
          </ul>
        </div>

      </div>
      
      <div className="footer-bottom-bar">
        <div className="footer-bottom-content">
          <p>&copy; {new Date().getFullYear()} StudyMate Portal. All rights reserved.</p>
          <p className="footer-made-with">
            Designed with <span style={{ color: '#ef4444' }}>❤️</span> for BSc IT Students
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
