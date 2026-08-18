import { useState } from "react";
import DocumentSection from "../components/DocumentSection";

function PreviousPapers({ subjects }) {
  const [paperType, setPaperType] = useState(null);

  if (!paperType) {
    return (
      <div className="page-container">
        <div className="page-header">
          <h2>Previous Year Papers</h2>
          <p>Select the type of previous year papers you want to view.</p>
        </div>
        <div className="two-column-grid">
          <div className="content-card" onClick={() => setPaperType("COLLEGE_PAPER")} style={{ cursor: "pointer" }}>
            <h3>🏫 College Exams</h3>
            <p>View previous question papers conducted by the college.</p>
          </div>
          <div className="content-card" onClick={() => setPaperType("UNIVERSITY_PAPER")} style={{ cursor: "pointer" }}>
            <h3>🎓 University Exams</h3>
            <p>View previous question papers conducted by the university.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button 
        onClick={() => setPaperType(null)} 
        style={{ margin: "1rem", padding: "0.5rem 1rem" }}
      >
        ← Back to Paper Types
      </button>
      <DocumentSection
        title={paperType === "COLLEGE_PAPER" ? "College Papers" : "University Papers"}
        description={`View ${paperType === "COLLEGE_PAPER" ? "college" : "university"} papers for your subjects.`}
        documentType={paperType}
        subjects={subjects}
      />
    </div>
  );
}

export default PreviousPapers;
