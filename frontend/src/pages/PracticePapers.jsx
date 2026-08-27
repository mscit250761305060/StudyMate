import { useState } from "react";
import CustomSelect from "../components/CustomSelect";

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
        <CustomSelect
          id="examType"
          value={examType}
          onChange={(event) => setExamType(event.target.value)}
          options={[
            { value: "university", label: "University Exam", icon: "🎓" },
            { value: "college", label: "College Exam", icon: "🏛️" },
          ]}
          placeholder="Select Examination Type"
        />

        <label className="field-label">Number of Papers</label>
        <CustomSelect
          id="numberOfPapers"
          value={numberOfPapers}
          onChange={(event) => setNumberOfPapers(event.target.value)}
          options={[
            { value: "1", label: "1 Paper" },
            { value: "2", label: "2 Papers" },
          ]}
          placeholder="Select Number of Papers"
        />

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
