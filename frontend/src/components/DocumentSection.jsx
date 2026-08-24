import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDocumentsBySubject, getDocumentUrl, getSubjects, deleteDocument } from "../services/api";
import Breadcrumb from "./Breadcrumb";
import { useAuth } from "../context/AuthContext";

function DocumentSection({ title, description, documentType, semesters, basePath }) {
  const navigate = useNavigate();
  const { semesterId, subjectId } = useParams();
  const { isAdmin } = useAuth();

  const selectedSemester = semesters?.find(s => s.id.toString() === semesterId) || null;

  const [subjects, setSubjects] = useState([]);
  
  const selectedSubject = subjects?.find(s => s.id.toString() === subjectId) || null;
  
  const [documents, setDocuments] = useState([]);
  const [loadingDocuments, setLoadingDocuments] = useState(false);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!selectedSemester) {
      setSubjects([]);
      return;
    }

    const loadSubjects = async () => {
      try {
        setLoadingSubjects(true);
        const data = await getSubjects(selectedSemester.id);
        setSubjects(data);
      } catch (err) {
        console.error(err);
        setSubjects([]);
      } finally {
        setLoadingSubjects(false);
      }
    };

    loadSubjects();
  }, [selectedSemester]);

  useEffect(() => {
    if (!selectedSubject) {
      setDocuments([]);
      return;
    }

    const loadDocuments = async () => {
      try {
        setLoadingDocuments(true);
        setError("");
        const data = await getDocumentsBySubject(selectedSubject.id, documentType);
        setDocuments(data);
      } catch (err) {
        console.error(err);
        setError(`Failed to load ${title.toLowerCase()}.`);
      } finally {
        setLoadingDocuments(false);
      }
    };

    loadDocuments();
  }, [selectedSubject, documentType, title]);

  const handleDeleteDocument = async (e, documentId) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this document? This action cannot be undone and will remove it from the database and search index.")) {
      return;
    }
    
    try {
      await deleteDocument(documentId);
      setDocuments(documents.filter(d => d.id !== documentId));
    } catch (err) {
      console.error("Delete failed:", err);
      alert(err?.response?.data?.detail || "Failed to delete document.");
    }
  };

  const breadcrumbItems = [
    { 
      label: title, 
      link: basePath 
    }
  ];

  if (selectedSemester) {
    breadcrumbItems.push({
      label: `Semester ${selectedSemester.number}`,
      link: `${basePath}/semester/${selectedSemester.id}`
    });
  }

  if (selectedSubject) {
    breadcrumbItems.push({ label: selectedSubject.name });
  }

  let content = null;

  if (!selectedSemester) {
    // State 1: Show Semesters
    content = (
      <>
        <div className="page-header" style={{ marginBottom: '30px' }}>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="dashboard-grid">
           {semesters && semesters.map(sem => (
             <div 
               key={sem.id} 
               className="dashboard-card" 
               onClick={() => navigate(`${basePath}/semester/${sem.id}`)}
               style={{ cursor: 'pointer' }}
             >
               <div className="dashboard-card-icon">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
               </div>
               <h3>Semester {sem.number}</h3>
               <p>View {title.toLowerCase()} for Semester {sem.number}</p>
             </div>
           ))}
        </div>
      </>
    );
  } else if (!selectedSubject) {
    // State 2: Show Subjects
    content = (
      <>
        <div className="page-header" style={{ marginBottom: '30px' }}>
          <h2>Semester {selectedSemester.number} Subjects</h2>
          <p>Select a subject to view its {title.toLowerCase()}</p>
        </div>
        
        {loadingSubjects ? (
          <p className="loading-text">Loading subjects...</p>
        ) : subjects.length === 0 ? (
          <div className="empty-state" style={{ padding: '40px', textAlign: 'center', background: '#f9fafb', borderRadius: '8px', border: '1px dashed #ccc' }}>
            <p>No subjects available for this semester.</p>
          </div>
        ) : (
          <div className="dashboard-grid">
            {subjects.map((subject) => (
              <div
                key={subject.id}
                className="dashboard-card"
                onClick={() => navigate(`${basePath}/semester/${selectedSemester.id}/subject/${subject.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="dashboard-card-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>
                </div>
                <h3>{subject.name}</h3>
                <p>View {title.toLowerCase()} for {subject.name}</p>
              </div>
            ))}
          </div>
        )}
      </>
    );
  } else {
    // State 3: Show Documents
    content = (
      <div className="documents-main">
        <div className="page-header" style={{ marginBottom: '30px' }}>
          <h2>{title} for {selectedSubject.name}</h2>
          <p style={{ color: '#6b7280' }}>Semester {selectedSemester.number} • {selectedSubject.name}</p>
        </div>

        {error && <div className="error-message">{error}</div>}
        
        {loadingDocuments && <p className="loading-text">Loading...</p>}

        {!loadingDocuments && documents.length === 0 && (
          <div className="empty-state" style={{ padding: '40px', textAlign: 'center', background: '#f9fafb', borderRadius: '8px', border: '1px dashed #ccc' }}>
            <p>No {title.toLowerCase()} uploaded yet.</p>
          </div>
        )}

        {!loadingDocuments && documents.length > 0 && (
          <div className="document-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="document-card"
                onClick={() => navigate("/viewer", { state: { fileUrl: getDocumentUrl(doc.file_path), title: doc.title } })}
                style={{ cursor: 'pointer', padding: '20px', border: '1px solid #e5e7eb', borderRadius: '8px', background: '#fff', transition: 'box-shadow 0.2s', display: 'flex', alignItems: 'center', gap: '15px' }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
              >
                <div className="document-icon" style={{ background: '#fee2e2', color: '#ef4444', padding: '10px', borderRadius: '4px', fontWeight: 'bold' }}>PDF</div>
                <div className="document-info" style={{ flexGrow: 1 }}>
                  <h4 style={{ margin: '0 0 5px 0', fontSize: '1rem', color: '#1f2937' }}>{doc.title}</h4>
                  {doc.academic_year && <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Year: {doc.academic_year}</span>}
                </div>
                {isAdmin && (
                  <button 
                    onClick={(e) => handleDeleteDocument(e, doc.id)}
                    style={{ 
                      background: "#ef4444", 
                      color: "white", 
                      border: "none", 
                      padding: "6px 12px", 
                      borderRadius: "6px", 
                      cursor: "pointer", 
                      fontSize: "12px",
                      marginLeft: "auto"
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="page-container">
      <Breadcrumb items={breadcrumbItems} />
      {content}
    </div>
  );
}

export default DocumentSection;
