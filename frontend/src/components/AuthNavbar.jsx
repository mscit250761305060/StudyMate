import { Link } from 'react-router-dom';

function AuthNavbar() {
  return (
    <nav className="auth-navbar">
      <div className="auth-navbar-brand">
        <Link to="/login" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
          </svg>
          <span style={{ fontWeight: 'bold', fontSize: '20px', color: '#172033' }}>StudySphere</span>
        </Link>
      </div>
      
      {/* Links removed as per request */}
    </nav>
  );
}

export default AuthNavbar;
