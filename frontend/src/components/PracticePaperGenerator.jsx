import { useState } from "react";

function PracticePaperGenerator() {
  const [examType, setExamType] = useState("UNIVERSITY");
  const [numberOfPapers, setNumberOfPapers] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);

    try {
      console.log({ examType, numberOfPapers });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="practice-generator">
      <h2>Practice Question Paper Generator</h2>
      <p>
        Generate practice papers based on previous examination patterns.
      </p>

      <label className="practice-label">Exam Type</label>
      <select
        className="practice-select"
        value={examType}
        onChange={(event) => setExamType(event.target.value)}
      >
        <option value="UNIVERSITY">University</option>
        <option value="COLLEGE">College</option>
      </select>

      <label className="practice-label">Number of Papers</label>
      <select
        className="practice-select"
        value={numberOfPapers}
        onChange={(event) => setNumberOfPapers(Number(event.target.value))}
      >
        <option value={1}>1</option>
        <option value={2}>2</option>
      </select>

      <button
        type="button"
        className="practice-generate-button"
        onClick={handleGenerate}
        disabled={isGenerating}
      >
        {isGenerating ? "Generating..." : "Generate Practice Paper"}
      </button>
    </section>
  );
}

export default PracticePaperGenerator;
