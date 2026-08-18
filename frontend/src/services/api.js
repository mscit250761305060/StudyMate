import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getColleges = async () => {
  const response = await api.get("/academic/colleges");
  return response.data;
};

export const getCourses = async (collegeId) => {
  const response = await api.get(
    `/academic/colleges/${collegeId}/courses`
  );
  return response.data;
};

export const getCoursesByCollege = getCourses;

export const getSemesters = async (courseId) => {
  const response = await api.get(
    `/academic/courses/${courseId}/semesters`
  );
  return response.data;
};

export const getSemestersByCourse = getSemesters;

export const getSubjects = async (semesterId) => {
  const response = await api.get(
    `/academic/semesters/${semesterId}/subjects`
  );
  return response.data;
};

export const getSubjectsBySemester = getSubjects;

export const getChapters = async (subjectId) => {
  const response = await api.get(
    `/academic/subjects/${subjectId}/chapters`
  );
  return response.data;
};

export const getChaptersBySubject = getChapters;

export const getDocumentsBySubject = async (subjectId) => {
  const response = await api.get(
    `/documents/subject/${subjectId}`
  );
  return response.data;
};

export const getDocumentUrl = (documentIdOrPath) => {
  if (typeof documentIdOrPath === "number") {
    return `${API_BASE_URL}/documents/${documentIdOrPath}/file`;
  }

  const normalizedPath = String(documentIdOrPath)
    .replaceAll("\\", "/")
    .replace(/^data\//, "");

  return `${API_BASE_URL}/documents/file/${normalizedPath}`;
};

export const askQuestion = async ({
  question,
  limit = 3,
  semester_id = null,
  subject_id = null,
  chapter_id = null,
  document_type = null,
}) => {
  const response = await api.post("/api/ask", {
    question,
    limit,
    semester_id,
    subject_id,
    chapter_id,
    document_type,
  });

  return response.data;
};

export const uploadDocument = async ({
  file,
  title,
  documentType,
  academicYear,
  examYear,
  examType,
  collegeId,
  courseId,
  semesterId,
  subjectId,
  chapterId,
}) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("title", title);
  formData.append("document_type", documentType);
  if (academicYear) {
    formData.append("academic_year", academicYear);
  }
  if (examYear) {
    formData.append("exam_year", examYear);
  }
  if (examType) {
    formData.append("exam_type", examType);
  }
  if (collegeId) {
    formData.append("college_id", collegeId);
  }
  if (courseId) {
    formData.append("course_id", courseId);
  }
  if (semesterId) {
    formData.append("semester_id", semesterId);
  }
  if (subjectId) {
    formData.append("subject_id", subjectId);
  }
  if (chapterId) {
    formData.append("chapter_id", chapterId);
  }

  const response = await api.post("/documents/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export default api;