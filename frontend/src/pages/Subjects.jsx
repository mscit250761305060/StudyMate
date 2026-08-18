function Subjects() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Subjects</h2>
        <p>Select a semester and explore your BSc IT subjects.</p>
      </div>

      <div className="content-card">
        <h3>BSc IT — Semester 3</h3>

        <div className="subject-card">
          <h4>Object Oriented Programming with JAVA</h4>
          <p>Subject Code: 1330505</p>
          <button type="button">View Chapters</button>
        </div>

        <div className="empty-state">
          More subjects will appear here when they are added by the administrator.
        </div>
      </div>
    </div>
  );
}

export default Subjects;
