import { useState } from "react";

function PracticePapers() {
  const [examType, setExamType] = useState("university");
  const [numberOfPapers, setNumberOfPapers] = useState("1");
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("Practice paper generation UI is ready. The AI generation backend will be connected later.");
    }, 500);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Practice Question Paper Generator</h2>
        <p>Generate practice papers using previous examination patterns.</p>
      </div>

      <div className="content-card">
        <label className="field-label">Examination Type</label>
        <select value={examType} onChange={(event) => setExamType(event.target.value)}>
          <option value="university">University Exam</option>
          <option value="college">College Exam</option>
        </select>

        <label className="field-label">Number of Papers</label>
        <select
          value={numberOfPapers}
          onChange={(event) => setNumberOfPapers(event.target.value)}
        >
          <option value="1">1 Paper</option>
          <option value="2">2 Papers</option>
        </select>

        <button type="button" onClick={handleGenerate} disabled={loading}>
          {loading ? "Generating..." : "Generate Practice Paper"}
        </button>

        <div className="empty-state">
          <h4>Generated papers will appear here</h4>
          <p>
            The question-paper generation engine will be connected after the
            website structure is completed.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PracticePapers;
