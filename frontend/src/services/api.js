import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
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

export const getSemesters = async (courseId) => {
  const response = await api.get(
    `/academic/courses/${courseId}/semesters`
  );

  return response.data;
};

export const getSubjects = async (semesterId) => {
  const response = await api.get(
    `/academic/semesters/${semesterId}/subjects`
  );

  return response.data;
};

export const getChapters = async (subjectId) => {
  const response = await api.get(
    `/academic/subjects/${subjectId}/chapters`
  );

  return response.data;
};

export const getDocumentsBySubject = async (subjectId) => {
  const response = await api.get(
    `/documents/subject/${subjectId}`
  );

  return response.data;
};

export const getDocumentUrl = (filePath) => {
  const baseUrl = "http://127.0.0.1:8000";

  const normalizedPath = filePath
    .replaceAll("\\", "/")
    .replace(/^data\//, "");

  return `${baseUrl}/documents/file/${normalizedPath}`;
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

export default api;