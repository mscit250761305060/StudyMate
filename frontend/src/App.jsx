import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";

import Dashboard from "./pages/Dashboard";
import Subjects from "./pages/Subjects";
import StudyMaterials from "./pages/StudyMaterials";
import AIAssistant from "./pages/AIAssistant";
import QuestionPapers from "./pages/QuestionPapers";
import Assignments from "./pages/Assignments";
import PracticePapers from "./pages/PracticePapers";
import NotFound from "./pages/NotFound";

import AdminDashboard from "./pages/AdminDashboard";
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

function App() {
  const [colleges, setColleges] = useState([]);
  const [courses, setCourses] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isAsking, setIsAsking] = useState(false);
  const [askError, setAskError] = useState("");

  const [selectedCollege, setSelectedCollege] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);

  const [showAdmin, setShowAdmin] = useState(false);
  const [collegeError, setCollegeError] = useState("");
  const [courseError, setCourseError] = useState("");
  const [semesterError, setSemesterError] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [chapterError, setChapterError] = useState("");
  const [documentError, setDocumentError] = useState("");

  const [loadingCourses, setLoadingCourses] = useState(false);
  const [loadingSemesters, setLoadingSemesters] = useState(false);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [loadingChapters, setLoadingChapters] = useState(false);
  const [loadingDocuments, setLoadingDocuments] = useState(false);

  const handleAskQuestion = async () => {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) {
      setAskError("Please enter a question.");
      return;
    }

    setIsAsking(true);
    setAskError("");
    setAnswer("");

    try {
      const data = await askQuestion({
        question: trimmedQuestion,
        limit: 3,
        semester_id: selectedSemester?.id ?? null,
        subject_id: selectedSubject?.id ?? null,
        chapter_id: selectedChapter?.id ?? null,
        document_type: null,
      });

      setAnswer(data.answer || "No answer was returned.");
    } catch (error) {
      console.error("AI question failed:", error);
      setAskError(
        error.response?.data?.detail ||
          "Unable to get an answer right now. Please try again."
      );
    } finally {
      setIsAsking(false);
    }
  };

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
    if (!selectedCourse) {
      return;
    }

    const loadSemesters = async () => {
      try {
        setLoadingSemesters(true);
        setSemesterError("");
        const data = await getSemesters(selectedCourse.id);
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
  }, [selectedCourse]);

  useEffect(() => {
    if (!selectedSemester) {
      return;
    }

    const loadSubjects = async () => {
      try {
        setLoadingSubjects(true);
        setSubjectError("");
        const data = await getSubjects(selectedSemester.id);
        setSubjects(data);
      } catch (error) {
        console.error("Failed to load subjects:", error);
        setSubjects([]);
        setSubjectError(
          "Unable to load subjects. Please check your connection and try again."
        );
      } finally {
        setLoadingSubjects(false);
      }
    };

    loadSubjects();
  }, [selectedSemester]);

  useEffect(() => {
    if (!selectedSubject) {
      return;
    }

    const loadChapters = async () => {
      try {
        setLoadingChapters(true);
        setChapterError("");
        const data = await getChapters(selectedSubject.id);
        setChapters(data);
      } catch (error) {
        console.error("Failed to load chapters:", error);
        setChapters([]);
        setChapterError(
          "Unable to load chapters. Please check your connection and try again."
        );
      } finally {
        setLoadingChapters(false);
      }
    };

    loadChapters();
  }, [selectedSubject]);

  useEffect(() => {
    if (!selectedSubject) {
      return;
    }

    const loadDocuments = async () => {
      try {
        setLoadingDocuments(true);
        setDocumentError("");
        const data = await getDocumentsBySubject(selectedSubject.id);
        setDocuments(data);
      } catch (error) {
        console.error("Failed to load documents:", error);
        setDocuments([]);
        setDocumentError(
          "Unable to load study materials. Please check your connection and try again."
        );
      } finally {
        setLoadingDocuments(false);
      }
    };

    loadDocuments();
  }, [selectedSubject]);

  const navLinkClass = ({ isActive }) =>
    isActive ? "main-nav-link active" : "main-nav-link";

  return (
    <BrowserRouter>
      <div className="app">
        <header className="app-header">
          <div className="header-content">
            <div className="brand-block">
              <h1>AI Study & Research Agent</h1>
              <p>Your BSc IT academic assistant</p>
            </div>

            <nav className="main-nav" aria-label="Main navigation">
              <NavLink to="/" className={navLinkClass}>Dashboard</NavLink>
              <NavLink to="/subjects" className={navLinkClass}>Subjects</NavLink>
              <NavLink to="/study-materials" className={navLinkClass}>Materials</NavLink>
              <NavLink to="/ai-assistant" className={navLinkClass}>AI Assistant</NavLink>
              <NavLink to="/question-papers" className={navLinkClass}>Papers</NavLink>
              <NavLink to="/assignments" className={navLinkClass}>Assignments</NavLink>
              <NavLink to="/practice-papers" className={navLinkClass}>Practice</NavLink>
              <button
                type="button"
                className="admin-toggle-button"
                onClick={() => setShowAdmin((prev) => !prev)}
              >
                {showAdmin ? "Back to App" : "Admin"}
              </button>
            </nav>
          </div>
        </header>

        <main className="container">
          {showAdmin ? (
            <AdminDashboard />
          ) : (
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/subjects" element={<Subjects />} />
              <Route path="/study-materials" element={<StudyMaterials />} />
              <Route path="/ai-assistant" element={<AIAssistant />} />
              <Route path="/question-papers" element={<QuestionPapers />} />
              <Route path="/assignments" element={<Assignments />} />
              <Route path="/practice-papers" element={<PracticePapers />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;