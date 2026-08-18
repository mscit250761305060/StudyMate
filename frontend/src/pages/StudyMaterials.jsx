function StudyMaterials() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Study Materials</h2>
        <p>Access academic documents uploaded by the administrator.</p>
      </div>

      <div className="content-card">
        <h3>Available Materials</h3>

        <div className="material-placeholder">
          <div className="material-icon">📚</div>
          <h4>No study materials uploaded yet</h4>
          <p>
            Study materials will appear here after the administrator uploads the
            required documents.
          </p>
        </div>
      </div>
    </div>
  );
}

export default StudyMaterials;
