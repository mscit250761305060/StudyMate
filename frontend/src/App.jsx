import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";

import Dashboard from "./pages/Dashboard";
import Subjects from "./pages/Subjects";
import Syllabus from "./pages/Syllabus";
import LabPlan from "./pages/LabPlan";
import PreviousPapers from "./pages/QuestionPapers"; // the file is still named QuestionPapers.jsx but exports PreviousPapers
import StudyMaterials from "./pages/StudyMaterials";
import AIAssistant from "./pages/AIAssistant";
import Assignments from "./pages/Assignments";
import PracticePapers from "./pages/PracticePapers";
import NotFound from "./pages/NotFound";
import PdfViewer from "./pages/PdfViewer";

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
              <h1>StudyMate</h1>
              <p>Your BSc IT Academic Assistant</p>
            </div>
            
            <div className="header-actions">
              <button
                type="button"
                className="admin-toggle-button"
                onClick={() => setShowAdmin(!showAdmin)}
              >
                {showAdmin ? "Back to Dashboard" : "Admin Panel"}
              </button>
              <div className="user-profile-circle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
            </div>
          </div>
        </header>

        <main className="container">
          {showAdmin ? (
            <AdminDashboard />
          ) : (
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/syllabus" element={<Syllabus subjects={subjects} />} />
              <Route path="/study-materials" element={<StudyMaterials subjects={subjects} />} />
              <Route path="/assignments" element={<Assignments subjects={subjects} />} />
              <Route path="/lab-plan" element={<LabPlan subjects={subjects} />} />
              <Route path="/previous-papers" element={<PreviousPapers subjects={subjects} />} />
              <Route path="/ai-assistant" element={<AIAssistant />} />
              <Route path="/viewer" element={<PdfViewer />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;