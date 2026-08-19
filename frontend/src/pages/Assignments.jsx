import DocumentSection from "../components/DocumentSection";

function Assignments({ semesters }) {
  return (
    <DocumentSection
      title="Assignments"
      description="View and download assignments for your subjects."
      documentType="ASSIGNMENT"
      semesters={semesters}
      basePath="/assignments"
    />
  );
}

export default Assignments;
