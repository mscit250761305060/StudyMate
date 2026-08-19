import DocumentSection from "../components/DocumentSection";

function AIAssistant({ semesters }) {
  return (
    <DocumentSection
      title="AI Assistant"
      description="Select your subject to ask questions about your BSc IT study material."
      documentType="AI_ASSISTANT"
      semesters={semesters}
      basePath="/ai-assistant"
    />
  );
}

export default AIAssistant;
