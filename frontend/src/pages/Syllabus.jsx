import DocumentSection from "../components/DocumentSection";

function Syllabus({ subjects }) {
  return (
    <DocumentSection
      title="Syllabus"
      description="View syllabus documents for your subjects."
      documentType="SYLLABUS"
      subjects={subjects}
    />
  );
}

export default Syllabus;
