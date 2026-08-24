import { BrowserRouter, Routes, Route, NavLink, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";

import Dashboard from "./pages/Dashboard";
import Subjects from "./pages/Subjects";
import Syllabus from "./pages/Syllabus";
import LabPlan from "./pages/LabPlan";
import PreviousPapers from "./pages/QuestionPapers"; // the file is still named QuestionPapers.jsx but exports PreviousPapers
import StudyMaterials from "./pages/StudyMaterials";
import AIAssistantChat from "./pages/AIAssistantChat";
import Assignments from "./pages/Assignments";
import PracticePapers from "./pages/PracticePapers";
import NotFound from "./pages/NotFound";
import PdfViewer from "./pages/PdfViewer";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Blog from "./pages/Blog";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import FAQ from "./pages/FAQ";
import LegalPage from "./pages/LegalPage";
import Footer from "./components/Footer";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import AuthNavbar from "./components/AuthNavbar";
import { AuthProvider, useAuth } from "./context/AuthContext";
import logoImage from "./assets/logo.png";
import {
  getColleges,
  getCourses,
  getSemesters,
  getSubjects,
  getChapters,
  getDocumentsBySubject,
  getDocumentUrl,
  askQuestion,
} from "./services/api";

const PRIVACY_POLICY = [
  "At StudySphere, we are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information.",
  "Information Collection: We collect standard information such as your name, email, college, and course details during registration to provide you with tailored study materials.",
  "Data Usage: Your data is exclusively used to enhance your educational experience, manage your account securely, and provide context to our AI assistant.",
  "Data Security: We implement industry-standard security measures to protect your data. We never sell your personal information to third parties."
];

const TERMS_OF_SERVICE = [
  "Welcome to StudySphere. By accessing or using our platform, you agree to comply with and be bound by these terms.",
  "User Conduct: You agree to use the platform for academic purposes only. Any abuse, misuse, or attempt to bypass security measures may result in immediate account termination.",
  "Intellectual Property: All study materials and syllabi provided remain the intellectual property of their respective creators or institutions.",
  "Disclaimer: The AI Assistant is provided as a study aid. While we strive for high accuracy, users should independently verify critical information before exams."
];

function InnerApp() {
  const { user, isAdmin, logout } = useAuth();
  const location = useLocation();

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const [colleges, setColleges] = useState([]);
  const [courses, setCourses] = useState([]);
  const [semesters, setSemesters] = useState([]);

  const [selectedCollege, setSelectedCollege] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [showAdmin, setShowAdmin] = useState(false);
  const [collegeError, setCollegeError] = useState("");
  const [courseError, setCourseError] = useState("");
  const [semesterError, setSemesterError] = useState("");

  const [loadingCourses, setLoadingCourses] = useState(false);
  const [loadingSemesters, setLoadingSemesters] = useState(false);

  useEffect(() => {
    const loadColleges = async () => {
      try {
        setCollegeError("");
        const data = await getColleges();
        setColleges(data);

        if (data.length > 0) {
          setSelectedCollege(data[0]);
        }
      } catch (error) {
        console.error("Failed to load colleges:", error);
        setCollegeError(
          "Unable to load colleges. Please check your connection and try again."
        );
      }
    };

    loadColleges();
  }, []);

  useEffect(() => {
    if (!selectedCollege) {
      return;
    }

    const loadCourses = async () => {
      try {
        setLoadingCourses(true);
        setCourseError("");
        const data = await getCourses(selectedCollege.id);
        setCourses(data);

        if (data.length > 0) {
          setSelectedCourse(data[0]);
        }
      } catch (error) {
        console.error("Failed to load courses:", error);
        setCourses([]);
        setCourseError(
          "Unable to load courses. Please check your connection and try again."
        );
      } finally {
        setLoadingCourses(false);
      }
    };

    loadCourses();
  }, [selectedCollege]);

  useEffect(() => {
    const courseIdToUse = user?.course_id || selectedCourse?.id;
    if (!courseIdToUse) {
      return;
    }

    const loadSemesters = async () => {
      try {
        setLoadingSemesters(true);
        setSemesterError("");
        const data = await getSemesters(courseIdToUse);
        setSemesters(data);
      } catch (error) {
        console.error("Failed to load semesters:", error);
        setSemesters([]);
        setSemesterError(
          "Unable to load semesters. Please check your connection and try again."
        );
      } finally {
        setLoadingSemesters(false);
      }
    };

    loadSemesters();
  }, [selectedCourse, user?.course_id]);

  const navLinkClass = ({ isActive }) =>
    isActive ? "main-nav-link active" : "main-nav-link";

  return (
    <div className="app">
      {user ? (
        <>
          <header className="app-header">
            <div className="header-content">
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => setShowAdmin(false)}>
                <div className="brand-block" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <img src={logoImage} alt="StudySphere Logo" className="header-logo" />
                  <div>
                    <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: 'var(--text-primary)' }}>StudySphere</h1>
                    <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '500' }}>Your Learning Companion</p>
                  </div>
                </div>
              </Link>

              <div className="header-actions">
                {isAdmin && (
                  <button
                    type="button"
                    className="admin-toggle-button"
                    onClick={() => setShowAdmin(!showAdmin)}
                  >
                    {showAdmin ? "Back to Dashboard" : "Admin Panel"}
                  </button>
                )}
                <button
                  type="button"
                  className="logout-button"
                  onClick={logout}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                  Logout
                </button>
                <Link 
                  to="/profile" 
                  style={{ textDecoration: 'none', color: 'inherit' }} 
                  onClick={() => setShowAdmin(false)}
                >
                  <div className="user-profile-circle" title={user.name}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
          </header>

          <main className="container">
            {isAdmin && showAdmin ? (
              <AdminDashboard />
            ) : (
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/syllabus" element={<Syllabus semesters={semesters} />} />
                <Route path="/syllabus/semester/:semesterId" element={<Syllabus semesters={semesters} />} />
                <Route path="/syllabus/semester/:semesterId/subject/:subjectId" element={<Syllabus semesters={semesters} />} />

                <Route path="/study-materials" element={<StudyMaterials semesters={semesters} />} />
                <Route path="/study-materials/semester/:semesterId" element={<StudyMaterials semesters={semesters} />} />
                <Route path="/study-materials/semester/:semesterId/subject/:subjectId" element={<StudyMaterials semesters={semesters} />} />

                <Route path="/assignments" element={<Assignments semesters={semesters} />} />
                <Route path="/assignments/semester/:semesterId" element={<Assignments semesters={semesters} />} />
                <Route path="/assignments/semester/:semesterId/subject/:subjectId" element={<Assignments semesters={semesters} />} />

                <Route path="/lab-plan" element={<LabPlan semesters={semesters} />} />
                <Route path="/lab-plan/semester/:semesterId" element={<LabPlan semesters={semesters} />} />
                <Route path="/lab-plan/semester/:semesterId/subject/:subjectId" element={<LabPlan semesters={semesters} />} />

                <Route path="/previous-papers" element={<PreviousPapers semesters={semesters} />} />
                <Route path="/previous-papers/semester/:semesterId" element={<PreviousPapers semesters={semesters} />} />
                <Route path="/previous-papers/semester/:semesterId/subject/:subjectId" element={<PreviousPapers semesters={semesters} />} />

                <Route path="/ai-assistant" element={<AIAssistantChat />} />
                <Route path="/ai-assistant/chat/:sessionId" element={<AIAssistantChat />} />

                <Route path="/blog" element={<Blog />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/privacy" element={<LegalPage title="Privacy Policy" lastUpdated="August 10, 2026" content={PRIVACY_POLICY} />} />
                <Route path="/terms" element={<LegalPage title="Terms of Service" lastUpdated="August 10, 2026" content={TERMS_OF_SERVICE} />} />

                <Route path="/viewer" element={<PdfViewer />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            )}
          </main>
          {user && (!isAdmin || !showAdmin) && location.pathname === "/" && <Footer />}
        </>
      ) : (
        <div className="unauth-layout">
          <AuthNavbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <InnerApp />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;