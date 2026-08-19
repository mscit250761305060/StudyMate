import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getColleges, getCourses, getSemesters } from '../services/api';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [courses, setCourses] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');

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
          const courseList = await getCourses(colleges[0].id);
          setCourses(courseList);
        }
      } catch (err) {
        console.error("Failed to load courses:", err);
      }
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      getSemesters(selectedCourse)
        .then(setSemesters)
        .catch(err => console.error("Failed to load semesters:", err));
    } else {
      setSemesters([]);
      setSelectedSemester('');
    }
  }, [selectedCourse]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    if (!selectedCourse || !selectedSemester) {
      setError('Please select a stream/course and semester');
      return;
    }

    setLoading(true);
    setError('');

    const result = await register(name, email, password, parseInt(selectedCourse), parseInt(selectedSemester));
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Join StudyMate to access your course materials</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="course">Stream / Course</label>
            <select
              id="course"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              required
            >
              <option value="">Select your course</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>{course.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="semester">Semester</label>
            <select
              id="semester"
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              required
              disabled={!selectedCourse}
            >
              <option value="">Select your semester</option>
              {semesters.map(sem => (
                <option key={sem.id} value={sem.id}>Semester {sem.number}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;
