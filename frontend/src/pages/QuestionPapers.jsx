import { useState } from "react";
import DocumentSection from "../components/DocumentSection";
import Breadcrumb from "../components/Breadcrumb";

function PreviousPapers({ semesters }) {
  const [paperType, setPaperType] = useState(null);

  if (!paperType) {
    return (
      <div className="page-container">
        <Breadcrumb items={[{ label: "Practice Papers" }]} />
        <div className="page-header" style={{ marginBottom: '30px' }}>
          <h2>Practice Papers</h2>
          <p>Select the type of previous year papers you want to view.</p>
        </div>
        <div className="dashboard-grid">
          <div className="dashboard-card" onClick={() => setPaperType("COLLEGE_PAPER")} style={{ cursor: "pointer" }}>
            <div className="dashboard-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>
            </div>
            <h3>College Exams</h3>
            <p>View previous question papers conducted by the college.</p>
          </div>
          <div className="dashboard-card" onClick={() => setPaperType("UNIVERSITY_PAPER")} style={{ cursor: "pointer" }}>
            <div className="dashboard-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
            </div>
            <h3>University Exams</h3>
            <p>View previous question papers conducted by the university.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <DocumentSection
        title={paperType === "COLLEGE_PAPER" ? "College Papers" : "University Papers"}
        description={`View ${paperType === "COLLEGE_PAPER" ? "college" : "university"} papers for your subjects.`}
        documentType={paperType}
        semesters={semesters}
        basePath="/previous-papers"
      />
    </div>
  );
}

export default PreviousPapers;
