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
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 110px)', paddingBottom: 0, marginTop: '-15px', marginBottom: '-40px', overflow: 'hidden' }}>
      <div style={{ marginBottom: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Breadcrumb items={[{ label: title || "Document Viewer" }]} />
        <button 
          onClick={() => navigate(-1)}
          style={{
            background: 'transparent',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '4px 8px',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            transition: 'background 0.2s',
          }}
          title="Close Document"
          onMouseEnter={(e) => e.target.style.background = 'var(--border-color)'}
          onMouseLeave={(e) => e.target.style.background = 'transparent'}
        >
          &times;
        </button>
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
