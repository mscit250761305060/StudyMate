function QuestionPapers() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Question Papers</h2>
        <p>Practice with previous college and university examinations.</p>
      </div>

      <div className="two-column-grid">
        <div className="content-card">
          <h3>🏫 College Exams</h3>
          <div className="empty-state">No college question papers uploaded yet.</div>
        </div>

        <div className="content-card">
          <h3>🎓 University Exams</h3>
          <div className="empty-state">No university question papers uploaded yet.</div>
        </div>
      </div>
    </div>
  );
}

export default QuestionPapers;
