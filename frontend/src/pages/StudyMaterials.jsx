import DocumentSection from "../components/DocumentSection";

function StudyMaterials({ semesters }) {
  return (
    <DocumentSection
      title="Study Materials"
      description="Access notes and study documents for your subjects."
      documentType="STUDY_MATERIAL"
      semesters={semesters}
      basePath="/study-materials"
    />
  );
}

export default StudyMaterials;
