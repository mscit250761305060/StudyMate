import DocumentSection from "../components/DocumentSection";

function Syllabus({ semesters }) {
  return (
    <DocumentSection
      title="Syllabus"
      description="View syllabus documents for your subjects."
      documentType="SYLLABUS"
      semesters={semesters}
      basePath="/syllabus"
    />
  );
}

export default Syllabus;
