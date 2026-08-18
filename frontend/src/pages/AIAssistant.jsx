import { useState } from "react";
import { askQuestion } from "../services/api";

function AIAssistant() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAsk = async () => {
    if (!question.trim()) {
      setError("Please enter a question.");
      return;
    }

    setLoading(true);
    setError("");
    setAnswer("");

    try {
      const response = await askQuestion({
        question: question.trim(),
        limit: 3,
        semester_id: 1,
        subject_id: 2,
        chapter_id: null,
        document_type: "SYLLABUS",
      });

      setAnswer(response.answer);
    } catch (err) {
      console.error("AI question failed:", err);
      setError("Unable to get an answer right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>AI Study Assistant</h2>
        <p>Ask questions about your BSc IT study material.</p>
      </div>

      <div className="content-card">
        <label className="field-label">Your Question</label>

        <textarea
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Example: What is inheritance in Java?"
          rows={6}
        />

        <button type="button" onClick={handleAsk} disabled={loading}>
          {loading ? "Thinking..." : "Ask AI"}
        </button>

        {error && <div className="error-box">{error}</div>}

        {answer && (
          <div className="answer-box">
            <h3>AI Answer</h3>
            <div className="answer-content">{answer}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AIAssistant;
