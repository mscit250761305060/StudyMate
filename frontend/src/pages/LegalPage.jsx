import React from "react";
import Breadcrumb from "../components/Breadcrumb";

function LegalPage({ title, lastUpdated, content }) {
  return (
    <div className="page-container">
      <Breadcrumb items={[{ label: title }]} />
      
      <div className="page-header" style={{ marginBottom: "40px" }}>
        <h2>{title}</h2>
        <p>Last updated: {lastUpdated}</p>
      </div>

      <div style={{ background: "white", padding: "40px", borderRadius: "12px", border: "1px solid #e5eaf2", lineHeight: "1.8", color: "#4b5563" }}>
        {content.map((paragraph, idx) => (
          <p key={idx} style={{ marginBottom: "20px" }}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}

export default LegalPage;
