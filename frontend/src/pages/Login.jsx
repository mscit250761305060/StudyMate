import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(email, password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="landing-hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="auth-card" style={{ background: 'white', color: '#172033', boxShadow: '0 10px 25px rgba(30, 50, 80, 0.08)', border: '1px solid #dfe5ef' }}>
        <div className="auth-header">
          <h2 style={{ color: '#172033' }}>Welcome Back</h2>
          <p style={{ color: '#64748b' }}>Login to your StudyMate account</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email" style={{ color: '#475569' }}>Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ background: 'white', color: '#172033', border: '1px solid #cbd5e1' }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" style={{ color: '#475569' }}>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ background: 'white', color: '#172033', border: '1px solid #cbd5e1' }}
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading} style={{ background: '#2563eb', color: 'white' }}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="auth-footer">
          <p style={{ color: '#64748b' }}>Don't have an account? <Link to="/register" style={{ color: '#2563eb' }}>Register here</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
