import DocumentSection from "../components/DocumentSection";

function LabPlan({ subjects }) {
  return (
    <DocumentSection
      title="Lab Plan"
      description="View lab plans and practical documents for your subjects."
      documentType="LAB_PLAN"
      subjects={subjects}
    />
  );
}

export default LabPlan;
