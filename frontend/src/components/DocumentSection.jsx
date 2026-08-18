import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDocumentsBySubject, getDocumentUrl } from "../services/api";
import Breadcrumb from "./Breadcrumb";

function DocumentSection({ title, description, documentType, subjects }) {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!selectedSubject) {
      setDocuments([]);
      return;
    }

    const loadDocuments = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getDocumentsBySubject(selectedSubject.id, documentType);
        setDocuments(data);
      } catch (err) {
        console.error(err);
        setError(`Failed to load ${title.toLowerCase()}.`);
      } finally {
        setLoading(false);
      }
    };

    loadDocuments();
  }, [selectedSubject, documentType, title]);

  return (
    <div className="page-container">
      <Breadcrumb items={[{ label: title }]} />
      <div className="page-header">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <div className="two-column-layout">
        <div className="subjects-sidebar">
          <h3>Subjects</h3>
          {subjects.length === 0 ? (
            <p className="empty-text">No subjects available.</p>
          ) : (
            <ul className="subject-list">
              {subjects.map((subject) => (
                <li
                  key={subject.id}
                  className={`subject-item ${selectedSubject?.id === subject.id ? "active" : ""}`}
                  onClick={() => setSelectedSubject(subject)}
                >
                  {subject.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="documents-main">
          <h3>
            {selectedSubject 
              ? `${title} for ${selectedSubject.name}` 
              : `Select a subject to view ${title.toLowerCase()}`}
          </h3>

          {error && <div className="error-message">{error}</div>}
          
          {loading && <p className="loading-text">Loading...</p>}

          {!loading && selectedSubject && documents.length === 0 && (
            <div className="empty-state">
              <p>No {title.toLowerCase()} uploaded yet.</p>
            </div>
          )}

          {!loading && documents.length > 0 && (
            <div className="document-grid">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="document-card"
                  onClick={() => navigate("/viewer", { state: { fileUrl: getDocumentUrl(doc.file_path), title: doc.title } })}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="document-icon">PDF</div>
                  <div className="document-info">
                    <h4>{doc.title}</h4>
                    {doc.academic_year && <span>Year: {doc.academic_year}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DocumentSection;
