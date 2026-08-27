import { useState } from "react";
import CustomSelect from "./CustomSelect";

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
      <CustomSelect
        id="examType"
        value={examType}
        onChange={(event) => setExamType(event.target.value)}
        options={[
          { value: "UNIVERSITY", label: "University", icon: "🎓" },
          { value: "COLLEGE", label: "College", icon: "🏛️" },
        ]}
        placeholder="Select Exam Type"
      />

      <label className="practice-label">Number of Papers</label>
      <CustomSelect
        id="numberOfPapers"
        value={numberOfPapers}
        onChange={(event) => setNumberOfPapers(Number(event.target.value))}
        options={[
          { value: 1, label: "1" },
          { value: 2, label: "2" },
        ]}
        placeholder="Select Number of Papers"
      />

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
