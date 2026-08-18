import { useEffect, useState } from "react";
import "./App.css";

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

  const [selectedCollege, setSelectedCollege] =
    useState(null);

  const [selectedCourse, setSelectedCourse] =
    useState(null);

  const [selectedSemester, setSelectedSemester] =
    useState(null);

  const [selectedSubject, setSelectedSubject] =
    useState(null);

  const [loadingCourses, setLoadingCourses] =
    useState(false);

  const [loadingSemesters, setLoadingSemesters] =
    useState(false);

  const [loadingSubjects, setLoadingSubjects] =
    useState(false);
  
  const [loadingChapters, setLoadingChapters] =
    useState(false);

  const [loadingDocuments, setLoadingDocuments] =
    useState(false);

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
      chapter_id: null,
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

  // -----------------------------------------
  // LOAD COLLEGES
  // -----------------------------------------

  useEffect(() => {
    const loadColleges = async () => {
      try {
        const data = await getColleges();

        setColleges(data);

        if (data.length > 0) {
          setSelectedCollege(data[0]);
        }
      } catch (error) {
        console.error(
          "Failed to load colleges:",
          error
        );
      }
    };

    loadColleges();
  }, []);


  // -----------------------------------------
  // LOAD COURSES
  // -----------------------------------------

  useEffect(() => {
    if (!selectedCollege) {
      return;
    }

    const loadCourses = async () => {
      try {
        setLoadingCourses(true);

        const data = await getCourses(
          selectedCollege.id
        );

        setCourses(data);

        if (data.length > 0) {
          setSelectedCourse(data[0]);
        }
      } catch (error) {
        console.error(
          "Failed to load courses:",
          error
        );

        setCourses([]);
      } finally {
        setLoadingCourses(false);
      }
    };

    loadCourses();
  }, [selectedCollege]);


  // -----------------------------------------
  // LOAD SEMESTERS
  // -----------------------------------------

  useEffect(() => {
    if (!selectedCourse) {
      return;
    }

    const loadSemesters = async () => {
      try {
        setLoadingSemesters(true);

        const data = await getSemesters(
          selectedCourse.id
        );

        setSemesters(data);
      } catch (error) {
        console.error(
          "Failed to load semesters:",
          error
        );

        setSemesters([]);
      } finally {
        setLoadingSemesters(false);
      }
    };

    loadSemesters();
  }, [selectedCourse]);

  // -----------------------------------------
// LOAD SUBJECTS
// -----------------------------------------

useEffect(() => {
  if (!selectedSemester) {
    return;
  }

  const loadSubjects = async () => {
    try {
      setLoadingSubjects(true);

      const data = await getSubjects(
        selectedSemester.id
      );

      setSubjects(data);
    } catch (error) {
      console.error(
        "Failed to load subjects:",
        error
      );

      setSubjects([]);
    } finally {
      setLoadingSubjects(false);
    }
  };

  loadSubjects();
}, [selectedSemester]);

// -----------------------------------------
// LOAD CHAPTERS
// -----------------------------------------

useEffect(() => {
  if (!selectedSubject) {
    return;
  }

  const loadChapters = async () => {
    try {
      setLoadingChapters(true);

      const data = await getChapters(
        selectedSubject.id
      );

      setChapters(data);
    } catch (error) {
      console.error(
        "Failed to load chapters:",
        error
      );

      setChapters([]);
    } finally {
      setLoadingChapters(false);
    }
  };

  loadChapters();
}, [selectedSubject]);

// -----------------------------------------
// LOAD DOCUMENTS
// -----------------------------------------

useEffect(() => {
  if (!selectedSubject) {
    return;
  }

  const loadDocuments = async () => {
    try {
      setLoadingDocuments(true);

      const data = await getDocumentsBySubject(
        selectedSubject.id
      );

      setDocuments(data);
    } catch (error) {
      console.error(
        "Failed to load documents:",
        error
      );

      setDocuments([]);
    } finally {
      setLoadingDocuments(false);
    }
  };

  loadDocuments();
}, [selectedSubject]);


  // -----------------------------------------
  // UI
  // -----------------------------------------

  return (
    <div className="app">

      <header className="header">
        <h1>AI Study & Research Agent</h1>

        <p>
          Your BSc IT academic assistant
        </p>
      </header>


      <main className="container">

        {/* COLLEGE */}

        <section className="academic-section">

          <h2>College</h2>

          <div className="button-grid">

            {colleges.map((college) => (
              <button
                key={college.id}
                className={
                  selectedCollege?.id === college.id
                    ? "academic-button active"
                    : "academic-button"
                }
                onClick={() => {
                  setSelectedCollege(college);
                  setSelectedCourse(null);
                  setSemesters([]);
                }}
              >
                {college.name}
              </button>
            ))}

          </div>

        </section>


        {/* COURSE */}

        {selectedCollege && (
          <section className="academic-section">

            <h2>
              Courses at {selectedCollege.name}
            </h2>

            {loadingCourses ? (
              <p>Loading courses...</p>
            ) : courses.length === 0 ? (
              <p>
                No courses found for this college.
              </p>
            ) : (

              <div className="button-grid">

                {courses.map((course) => (
                  <button
                    key={course.id}
                    className={
                      selectedCourse?.id === course.id
                        ? "academic-button active"
                        : "academic-button"
                    }
                    onClick={() => {
                      setSelectedCourse(course);
                      setSemesters([]);
                    }}
                  >
                    {course.name}
                  </button>
                ))}

              </div>

            )}

          </section>
        )}


        {/* SEMESTERS */}

        {selectedCourse && (
          <section className="academic-section">

            <h2>
              {selectedCourse.name} — Semesters
            </h2>

            {loadingSemesters ? (
              <p>Loading semesters...</p>
            ) : semesters.length === 0 ? (
              <p>
                No semesters found for this course.
              </p>
            ) : (

              <div className="semester-grid">

                {semesters.map((semester) => (
                  <button
                    key={semester.id}
                    className={
                      selectedSemester?.id === semester.id
                        ? "semester-card active"
                        : "semester-card"
                    }
                    onClick={() => {
                      setSelectedSemester(semester);
                      setSubjects([]);
                    }}
                  >
                    <span className="semester-number">
                      {semester.number}
                    </span>

                    <span>
                      Semester {semester.number}
                    </span>
                  </button>
                ))}

              </div>

            )}

          </section>
        )}

        {/* SUBJECTS */}

        {selectedSemester && (
          <section className="academic-section">

            <h2>
              Semester {selectedSemester.number} — Subjects
            </h2>

            {loadingSubjects ? (
              <p>Loading subjects...</p>
            ) : subjects.length === 0 ? (
              <p>
                No subjects found for this semester.
              </p>
            ) : (

              <div className="subject-grid">

                {subjects.map((subject) => (
                  <button
                    key={subject.id}
                    className={
                      selectedSubject?.id === subject.id
                        ? "subject-card active"
                        : "subject-card"
                    }
                    onClick={() => {
                      setSelectedSubject(subject);
                      setChapters([]);
                    }}
                  >
                    <span className="subject-name">
                      {subject.name}
                    </span>

                    {subject.code && (
                      <span className="subject-code">
                        {subject.code}
                      </span>
                    )}
                  </button>
                ))}

              </div>

            )}

          </section>
        )}

        {/* CHAPTERS */}

        {selectedSubject && (
          <section className="academic-section">

            <h2>
              {selectedSubject.name} — Chapters
            </h2>

            {loadingChapters ? (
              <p>Loading chapters...</p>
            ) : chapters.length === 0 ? (
              <p>
                No chapters found for this subject.
              </p>
            ) : (

              <div className="chapter-grid">

                {chapters.map((chapter) => (
                  <button
                    key={chapter.id}
                    className="chapter-card"
                  >
                    <div className="chapter-number">
                      {chapter.unit_number
                        ? `Unit ${chapter.unit_number}`
                        : "Chapter"}
                    </div>

                    <div className="chapter-name">
                      {chapter.name}
                    </div>
                  </button>
                ))}

              </div>

            )}

          </section>
        )}

        {/* STUDY MATERIALS */}

        {selectedSubject && (
          <section className="academic-section">

            <h2>
              {selectedSubject.name} — Study Materials
            </h2>

            {loadingDocuments ? (
              <p>Loading study materials...</p>
            ) : documents.length === 0 ? (
              <div className="empty-state">
                <p>
                  No study materials have been uploaded yet.
                </p>

                <span>
                  Study materials will appear here when
                  they are added by the administrator.
                </span>
              </div>
            ) : (

              <div className="document-grid">

                {documents.map((document) => (
                  <a
                    key={document.id}
                    href={getDocumentUrl(document.file_path)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="document-card"
                  >
                    <div className="document-icon">
                      PDF
                    </div>

                    <div className="document-info">

                      <h3>
                        {document.title}
                      </h3>

                      <span className="document-type">
                        {document.document_type}
                      </span>

                      {document.academic_year && (
                        <span>
                          Academic Year:{" "}
                          {document.academic_year}
                        </span>
                      )}

                      {document.exam_year && (
                        <span>
                          Exam Year:{" "}
                          {document.exam_year}
                        </span>
                      )}

                      <span className="document-open">
                        Open PDF →
                      </span>

                    </div>
                  </a>
                ))}

              </div>

            )}

          </section>
        )}

        <section className="ai-assistant-section">

        <div className="section-header">
          <h2>AI Study Assistant</h2>

          <p>
            Ask questions about your BSc IT study material.
          </p>
        </div>

        <div className="question-box">

          <textarea
            value={question}
            onChange={(event) => {
              setQuestion(event.target.value);
              setAskError("");
            }}
            placeholder="Ask a question about this subject..."
            rows={5}
            disabled={isAsking}
          />

          <button
            type="button"
            onClick={handleAskQuestion}
            disabled={isAsking || !question.trim()}
            className="ask-button"
          >
            {isAsking ? "Thinking..." : "Ask AI"}
          </button>

        </div>

        {askError && (
          <div className="ai-error">
            {askError}
          </div>
        )}

        {answer && (
          <div className="ai-answer">

            <div className="ai-answer-header">
              <span>AI Answer</span>
            </div>

            <div className="ai-answer-content">
              {answer}
            </div>

          </div>
        )}

      </section>

      </main>

    </div>
  );
}

export default App;