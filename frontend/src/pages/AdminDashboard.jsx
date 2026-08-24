import { useEffect, useMemo, useState } from "react";
import {
  getChaptersBySubject,
  getColleges,
  getCoursesByCollege,
  getDocumentUrl,
  getDocumentsBySubject,
  getSemestersByCourse,
  getSubjectsBySemester,
  uploadDocument,
  deleteDocument,
} from "../services/api";

function AdminDashboard() {
  const [colleges, setColleges] = useState([]);
  const [courses, setCourses] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [documents, setDocuments] = useState([]);

  const [collegeId, setCollegeId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [semesterId, setSemesterId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [chapterId, setChapterId] = useState("");

  const [title, setTitle] = useState("");
  const [documentType, setDocumentType] = useState("SYLLABUS");
  const [academicYear, setAcademicYear] = useState("");
  const [examYear, setExamYear] = useState("");
  const [examType, setExamType] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [loadingColleges, setLoadingColleges] = useState(false);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [loadingSemesters, setLoadingSemesters] = useState(false);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [loadingChapters, setLoadingChapters] = useState(false);
  const [loadingDocuments, setLoadingDocuments] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleCollegeChange(value) {
    setCollegeId(value);
    setCourseId("");
    setSemesterId("");
    setSubjectId("");
    setChapterId("");
    setCourses([]);
    setSemesters([]);
    setSubjects([]);
    setChapters([]);
    setDocuments([]);

    if (!value) {
      return;
    }

    try {
      setLoadingCourses(true);
      setError("");
      const data = await getCoursesByCollege(value);
      setCourses(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load courses.");
    } finally {
      setLoadingCourses(false);
    }
  }

  async function loadColleges() {
    try {
      setLoadingColleges(true);
      setError("");
      const data = await getColleges();
      setColleges(data);
      
      // Auto-select the first college since this website is for one specific college
      if (data && data.length > 0) {
        handleCollegeChange(String(data[0].id));
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load colleges.");
    } finally {
      setLoadingColleges(false);
    }
  }

  useEffect(() => {
    loadColleges();
  }, []);

  const loadDocuments = async (selectedSubjectId) => {
    if (!selectedSubjectId) {
      setDocuments([]);
      return;
    }

    try {
      setLoadingDocuments(true);
      setError("");
      const data = await getDocumentsBySubject(selectedSubjectId);
      setDocuments(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load uploaded documents.");
      setDocuments([]);
    } finally {
      setLoadingDocuments(false);
    }
  };

  const handleCourseChange = async (value) => {
    setCourseId(value);
    setSemesterId("");
    setSubjectId("");
    setChapterId("");
    setSemesters([]);
    setSubjects([]);
    setChapters([]);
    setDocuments([]);

    if (!value) {
      return;
    }

    try {
      setLoadingSemesters(true);
      setError("");
      const data = await getSemestersByCourse(value);
      setSemesters(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load semesters.");
    } finally {
      setLoadingSemesters(false);
    }
  };

  const handleSemesterChange = async (value) => {
    setSemesterId(value);
    setSubjectId("");
    setChapterId("");
    setSubjects([]);
    setChapters([]);
    setDocuments([]);

    if (!value) {
      return;
    }

    try {
      setLoadingSubjects(true);
      setError("");
      const data = await getSubjectsBySemester(value);
      setSubjects(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load subjects.");
    } finally {
      setLoadingSubjects(false);
    }
  };

  const handleSubjectChange = async (value) => {
    setSubjectId(value);
    setChapterId("");
    setChapters([]);
    setDocuments([]);

    if (!value) {
      return;
    }

    try {
      setLoadingChapters(true);
      setError("");
      
      // Load documents for this subject
      await loadDocuments(value);
      
      const chapterData = await getChaptersBySubject(value);
      setChapters(chapterData);
    } catch (err) {
      console.error(err);
      setError("Failed to load chapters.");
    } finally {
      setLoadingChapters(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] || null;
    setMessage("");

    if (!file) {
      setSelectedFile(null);
      return;
    }

    const isPdfType = file.type === "application/pdf";
    const isPdfName = file.name.toLowerCase().endsWith(".pdf");

    if (!isPdfType && !isPdfName) {
      setSelectedFile(null);
      setError("Only PDF files are allowed.");
      event.target.value = "";
      return;
    }

    setError("");
    setSelectedFile(file);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    if (!collegeId || !courseId || !semesterId || !subjectId) {
      setError("Please complete college, course, semester, and subject selection.");
      return;
    }

    if (!title.trim()) {
      setError("Please enter a document title.");
      return;
    }

    if (!selectedFile) {
      setError("Please select a PDF file.");
      return;
    }

    const isPdfType = selectedFile.type === "application/pdf";
    const isPdfName = selectedFile.name.toLowerCase().endsWith(".pdf");
    if (!isPdfType && !isPdfName) {
      setError("Only PDF files are allowed.");
      return;
    }

    try {
      setUploading(true);

      await uploadDocument({
        file: selectedFile,
        title: title.trim(),
        documentType,
        academicYear,
        examYear,
        examType,
        collegeId,
        courseId,
        semesterId,
        subjectId,
        chapterId: chapterId || null,
      });

      setMessage("Document uploaded successfully!");
      setSelectedFile(null);
      event.target.reset();
    } catch (error) {
      console.error("Upload failed:", error);
      const errorMessage =
        error?.response?.data?.detail || "Document upload failed.";
      setError(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteDocument = async (documentId) => {
    if (!window.confirm("Are you sure you want to delete this document? This action cannot be undone and will remove it from the database and search index.")) {
      return;
    }

    try {
      setError("");
      await deleteDocument(documentId);
      setMessage("Document deleted successfully.");
      // Refresh the documents list
      if (subjectId) {
        await loadDocuments(subjectId);
      }
    } catch (err) {
      console.error("Delete failed:", err);
      setError(err?.response?.data?.detail || "Failed to delete document.");
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Upload, classify, and review academic PDFs by subject and chapter.</p>
      </div>

      <section className="admin-card card">
        <h2>Upload Document</h2>

        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleUpload} className="admin-upload-form">
          <div className="form-group">
            <label htmlFor="documentType">Document Type</label>
            <select
              id="documentType"
              value={documentType}
              onChange={(event) => setDocumentType(event.target.value)}
              required
            >
              <option value="SYLLABUS">Syllabus</option>
              <option value="STUDY_MATERIAL">Study Material</option>
              <option value="ASSIGNMENT">Assignment</option>
              <option value="LAB_PLAN">Lab Plan</option>
              <option value="COLLEGE_PAPER">College Paper</option>
              <option value="UNIVERSITY_PAPER">University Paper</option>
            </select>
          </div>



          <div className="form-group">
            <label htmlFor="courseSelect">Course</label>
            <select
              id="courseSelect"
              value={courseId}
              onChange={(event) => handleCourseChange(event.target.value)}
              disabled={!collegeId || loadingCourses}
              required
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course.id} value={String(course.id)}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="semesterSelect">Semester</label>
            <select
              id="semesterSelect"
              value={semesterId}
              onChange={(event) => handleSemesterChange(event.target.value)}
              disabled={!courseId || loadingSemesters}
              required
            >
              <option value="">Select Semester</option>
              {semesters.map((semester) => (
                <option key={semester.id} value={String(semester.id)}>
                  Semester {semester.number}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="subjectSelect">Subject</label>
            <select
              id="subjectSelect"
              value={subjectId}
              onChange={(event) => handleSubjectChange(event.target.value)}
              disabled={!semesterId || loadingSubjects}
              required
            >
              <option value="">Select Subject</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={String(subject.id)}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>


          <div className="form-group">
            <label htmlFor="documentTitle">Document Title</label>
            <input
              id="documentTitle"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Enter document title"
              required
            />
          </div>



          <div className="form-group">
            <label htmlFor="pdfFileInput">PDF File</label>
            <input
              id="pdfFileInput"
              type="file"
              accept="application/pdf,.pdf"
              onChange={handleFileChange}
              required
            />
            {selectedFile && (
              <p className="file-info">Selected: {selectedFile.name}</p>
            )}
          </div>

          <button type="submit" disabled={uploading || !subjectId}>
            {uploading ? "Uploading..." : "Upload Document"}
          </button>
        </form>
      </section>


    </div>
  );
}

export default AdminDashboard;
