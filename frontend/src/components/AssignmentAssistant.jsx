import { useState } from "react";

function AssignmentAssistant() {
  const [file, setFile] = useState(null);

  return (
    <section className="assignment-assistant">
      <h2>Assignment Assistant</h2>
      <p>
        Upload an assignment PDF to get material-based assistance.
      </p>

      <input
        type="file"
        accept=".pdf"
        onChange={(event) => setFile(event.target.files?.[0] || null)}
        className="assignment-file-input"
      />

      {file && <div className="selected-file">Selected file: {file.name}</div>}

      <button type="button" className="assignment-button" disabled={!file}>
        Analyze Assignment
      </button>
    </section>
  );
}

export default AssignmentAssistant;
