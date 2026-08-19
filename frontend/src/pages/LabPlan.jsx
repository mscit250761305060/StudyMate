import DocumentSection from "../components/DocumentSection";

function LabPlan({ semesters }) {
  return (
    <DocumentSection
      title="Lab Plan"
      description="View lab plans and practical documents for your subjects."
      documentType="LAB_PLAN"
      semesters={semesters}
      basePath="/lab-plan"
    />
  );
}

export default LabPlan;
