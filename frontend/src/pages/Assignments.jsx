import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDocumentsBySubject, getDocumentUrl } from "../services/api";

import Breadcrumb from "../components/Breadcrumb";

function Assignments({ subjects }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (subjects && subjects.length > 0 && !activeTab) {
      setActiveTab(subjects[0].id);
    }
  }, [subjects, activeTab]);

  useEffect(() => {
    if (!activeTab) {
      setDocuments([]);
      return;
    }

    const loadDocuments = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getDocumentsBySubject(activeTab, "ASSIGNMENT");
        setDocuments(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load assignments.");
      } finally {
        setLoading(false);
      }
    };

    loadDocuments();
  }, [activeTab]);

  return (
    <div className="page-container">
      <Breadcrumb items={[{ label: "Assignments" }]} />
      <div className="page-header">
        <h2>Assignments</h2>
        <p>View and download assignments for your subjects.</p>
      </div>

      {!subjects || subjects.length === 0 ? (
        <div className="empty-state">No subjects available.</div>
      ) : (
        <div className="assignments-container">
          <div 
            className="tabs-header" 
            style={{ 
              display: 'flex', 
              gap: '10px', 
              borderBottom: '1px solid #ccc', 
              marginBottom: '20px', 
              overflowX: 'auto',
              whiteSpace: 'nowrap'
            }}
          >
            {subjects.map(subject => (
              <button
                key={subject.id}
                onClick={() => setActiveTab(subject.id)}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  background: 'none',
                  borderBottom: activeTab === subject.id ? '2px solid #007bff' : 'none',
                  fontWeight: activeTab === subject.id ? 'bold' : 'normal',
                  color: activeTab === subject.id ? '#007bff' : '#555',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                {subject.name}
              </button>
            ))}
          </div>

          <div className="tab-content">
            {error && <div className="error-message">{error}</div>}
            {loading && <p className="loading-text">Loading assignments...</p>}

            {!loading && documents.length === 0 && (
              <div className="empty-state">
                <p>No assignments uploaded yet for this subject.</p>
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
      )}
    </div>
  );
}

export default Assignments;
