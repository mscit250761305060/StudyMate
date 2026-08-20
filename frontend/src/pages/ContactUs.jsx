import React, { useState } from "react";
import Breadcrumb from "../components/Breadcrumb";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate an API call
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 800);
  };

  return (
    <div className="page-container">
      <Breadcrumb items={[{ label: "Contact Us" }]} />
      
      <div className="page-header" style={{ marginBottom: "40px" }}>
        <h2>Contact Us</h2>
        <p>Have a question or need support? We'd love to hear from you.</p>
      </div>

      <div className="contact-container">
        <div className="contact-info-panel">
          <h3>Get in Touch</h3>
          <p>We are here to help you succeed in your BSc IT journey. Reach out to us through any of the following channels.</p>
          
          <div className="contact-detail">
            <div className="contact-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </div>
            <div>
              <strong>Email</strong>
              <span>support@studysphere.edu</span>
            </div>
          </div>
          
          <div className="contact-detail">
            <div className="contact-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </div>
            <div>
              <strong>Phone</strong>
              <span>+1 (555) 123-4567</span>
            </div>
          </div>
          
          <div className="contact-detail">
            <div className="contact-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </div>
            <div>
              <strong>Office</strong>
              <span>IT Department, SSASIT College<br/>123 University Road</span>
            </div>
          </div>
        </div>

        <div className="contact-form-panel">
          {submitted ? (
            <div className="success-message">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "15px" }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              <h3>Message Sent!</h3>
              <p>Thank you for reaching out. Our team will get back to you shortly.</p>
              <button className="submit-btn" onClick={() => setSubmitted(false)} style={{ marginTop: "20px" }}>Send Another Message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required placeholder="How can we help you?" />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} required placeholder="Type your message here..." rows="5"></textarea>
              </div>
              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
