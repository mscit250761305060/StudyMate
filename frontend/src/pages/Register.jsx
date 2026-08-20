import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getColleges, getCourses, getSemesters } from '../services/api';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // We assume there's one college or we fetch the first one for context
    const loadInitialData = async () => {
      try {
        const colleges = await getColleges();
        if (colleges.length > 0) {
          let allCourses = [];
          for (const college of colleges) {
            const courseList = await getCourses(college.id);
            allCourses = [...allCourses, ...courseList];
          }
          setCourses(allCourses);
        }
      } catch (err) {
        console.error("Failed to load courses:", err);
      }
    };
    loadInitialData();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    if (!selectedCourse) {
      setError('Please select a stream/course');
      return;
    }

    setLoading(true);
    setError('');

    const result = await register(name, email, password, parseInt(selectedCourse));
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="landing-hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="auth-card" style={{ maxWidth: '450px', background: 'white', color: '#172033', boxShadow: '0 10px 25px rgba(30, 50, 80, 0.08)', border: '1px solid #dfe5ef' }}>
        <div className="auth-header">
          <h2 style={{ color: '#172033' }}>Create an Account</h2>
          <p style={{ color: '#64748b' }}>Join StudySphere and boost your learning</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name" style={{ color: '#475569' }}>Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ background: 'white', color: '#172033', border: '1px solid #cbd5e1' }}
            />
          </div>

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
          
          <div className="form-group">
            <label htmlFor="course" style={{ color: '#475569' }}>Stream / Course</label>
            <select
              id="course"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              required
              style={{ background: 'white', color: '#172033', border: '1px solid #cbd5e1' }}
            >
              <option value="">Select your course</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>{course.name}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="auth-button" disabled={loading} style={{ background: '#2563eb', color: 'white' }}>
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <div className="auth-footer">
          <p style={{ color: '#64748b' }}>Already have an account? <Link to="/login" style={{ color: '#2563eb' }}>Login here</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;
