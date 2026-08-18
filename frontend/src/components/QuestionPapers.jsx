function QuestionPapers() {
  return (
    <section className="question-papers">
      <div className="section-header">
        <h2>Question Papers</h2>
        <p>Previous examination papers for practice.</p>
      </div>

      <div className="question-paper-category">
        <h3>College Exams</h3>
        <div className="question-paper-empty">
          No college question papers uploaded yet.
        </div>
      </div>

      <div className="question-paper-category">
        <h3>University Exams</h3>
        <div className="question-paper-empty">
          No university question papers uploaded yet.
        </div>
      </div>
    </section>
  );
}

export default QuestionPapers;
