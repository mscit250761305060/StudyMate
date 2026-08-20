import { Link } from 'react-router-dom';
import logoImage from '../assets/logo.png';

function AuthNavbar() {
  return (
    <nav className="auth-navbar">
      <div className="auth-navbar-brand">
        <Link to="/login" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src={logoImage} alt="StudySphere Logo" style={{ height: '40px', objectFit: 'contain' }} />
          <span style={{ fontWeight: 'bold', fontSize: '22px', color: '#172033' }}>StudySphere</span>
        </Link>
      </div>
      
      {/* Links removed as per request */}
    </nav>
  );
}

export default AuthNavbar;
