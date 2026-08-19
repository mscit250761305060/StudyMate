import React from "react";
import Breadcrumb from "../components/Breadcrumb";

function FAQ() {
  const faqs = [
    {
      question: "What is StudyMate?",
      answer: "StudyMate is an all-in-one academic assistant designed specifically for BSc IT students. It provides access to syllabus details, study materials, lab plans, previous question papers, and an AI-powered assistant."
    },
    {
      question: "How does the AI Assistant work?",
      answer: "Our AI Assistant uses advanced Retrieval-Augmented Generation (RAG) technology. It searches through our extensive database of verified college materials and syllabus documents to give you precise, context-aware answers to your study questions."
    },
    {
      question: "Do I need to pay to use StudyMate?",
      answer: "No, StudyMate is completely free for all registered BSc IT students."
    },
    {
      question: "Can I download the study materials?",
      answer: "Materials are designed to be viewed directly within our seamlessly integrated PDF viewer to keep your study sessions focused and organized without cluttering your device."
    }
  ];

  return (
    <div className="page-container">
      <Breadcrumb items={[{ label: "FAQ" }]} />
      
      <div className="page-header" style={{ marginBottom: "40px" }}>
        <h2>Frequently Asked Questions</h2>
        <p>Find answers to common questions about using StudyMate.</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "800px" }}>
        {faqs.map((faq, index) => (
          <div key={index} style={{ background: "white", padding: "24px", borderRadius: "12px", border: "1px solid #e5eaf2" }}>
            <h3 style={{ margin: "0 0 12px 0", fontSize: "18px", color: "#1f2937" }}>{faq.question}</h3>
            <p style={{ margin: 0, color: "#4b5563", lineHeight: "1.6" }}>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
