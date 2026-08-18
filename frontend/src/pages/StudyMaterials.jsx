import DocumentSection from "../components/DocumentSection";

function StudyMaterials({ subjects }) {
  return (
    <DocumentSection
      title="Study Materials"
      description="Access notes and study documents for your subjects."
      documentType="STUDY_MATERIAL"
      subjects={subjects}
    />
  );
}

export default StudyMaterials;
