import React from "react";
import Breadcrumb from "../components/Breadcrumb";

function AboutUs() {
  return (
    <div className="page-container">
      <Breadcrumb
        items={[
          { label: "Home", path: "/" },
          { label: "About Us", path: "/about" },
        ]}
      />
      <div className="academic-section">
        <h2>About StudySphere</h2>
        <p>
          Welcome to StudySphere, your comprehensive BSc IT Academic Assistant. Our platform is dedicated to empowering IT students by providing a centralized hub for all their educational needs.
        </p>

        <h3>Our Mission</h3>
        <p>
          Our mission is to simplify the academic journey for students by seamlessly integrating syllabus details, study materials, lab plans, and practice papers into one easily accessible portal. We believe that technology should enable learning, not complicate it.
        </p>

        <h3>What We Offer</h3>
        <ul style={{ lineHeight: '1.8', marginLeft: '20px' }}>
          <li><strong>Curated Study Materials:</strong> Access high-quality resources structured exactly according to your semester and subject syllabus.</li>
          <li><strong>AI-Powered Assistance:</strong> Our cutting-edge RAG-based AI assistant is trained directly on your college materials to provide context-aware, accurate answers to your technical questions.</li>
          <li><strong>Practice & Preparation:</strong> Browse through previous years' question papers to prepare effectively for your upcoming exams.</li>
          <li><strong>Seamless Experience:</strong> Built with a modern tech stack to ensure a fast, responsive, and distraction-free study environment across all devices.</li>
        </ul>

        <h3>Our Vision</h3>
        <p>
          We envision a future where every student has instant access to personalized, AI-driven educational support. StudySphere is our first step toward building an inclusive, intelligent ecosystem for academic growth.
        </p>

        <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
          <strong>LEARN • GROW • ACHIEVE</strong>
          <p style={{ margin: '10px 0 0 0', color: '#64748b' }}>
            We're constantly evolving to serve you better. Join us as we build the future of education.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
