import { useState } from "react";

function Assignments() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please select an assignment PDF.");
      return;
    }

    alert("Assignment upload UI is ready. Backend connection will be added later.");
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Assignment Assistant</h2>
        <p>Upload your assignment PDF and get syllabus-based assistance.</p>
      </div>

      <div className="content-card">
        <label className="field-label">Assignment PDF</label>
        <input type="file" accept=".pdf" onChange={handleFileChange} />

        {file && <p className="selected-file">Selected: {file.name}</p>}

        <button type="button" onClick={handleUpload}>
          Analyze Assignment
        </button>

        <div className="empty-state">
          <h4>Assignment answers will appear here</h4>
          <p>
            The RAG-based assignment processing pipeline will be connected in a
            later step.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Assignments;
