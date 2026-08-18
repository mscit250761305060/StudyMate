import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";

function PdfViewer() {
  const location = useLocation();
  const navigate = useNavigate();

  const { fileUrl, title } = location.state || {};

  if (!fileUrl) {
    return (
      <div className="page-container">
        <Breadcrumb items={[{ label: "Document Viewer" }]} />
        <div className="error-message">
          <p>No document provided.</p>
          <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', height: '85vh' }}>
      <Breadcrumb items={[{ label: title || "Document Viewer" }]} />
      <div className="pdf-viewer-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <button className="back-button" onClick={() => navigate(-1)} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
          ← Back
        </button>
        <h2 style={{ margin: 0, fontSize: '1.2rem' }}>{title || "Document Viewer"}</h2>
        <a 
          href={fileUrl} 
          download 
          target="_blank" 
          rel="noreferrer"
          style={{ padding: '0.5rem 1rem', backgroundColor: '#007bff', color: '#fff', textDecoration: 'none', borderRadius: '4px' }}
        >
          Download PDF
        </a>
      </div>
      
      <div className="pdf-viewer-content" style={{ flexGrow: 1, border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden' }}>
        <iframe 
          src={fileUrl} 
          title={title || "PDF Document"}
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      </div>
    </div>
  );
}

export default PdfViewer;
