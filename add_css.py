responsive_css = """

/* ==========================================================================
   Mobile Responsiveness Media Queries
   ========================================================================== */

@media (max-width: 768px) {
  /* Global adjustments */
  .container {
    width: 100%;
    margin: 20px auto;
    padding: 0 10px;
  }

  /* Header / Navigation */
  .header {
    padding: 20px 5%;
  }

  .header-row {
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
  }

  .header-actions, .header-nav {
    justify-content: center;
    width: 100%;
  }

  .header-nav .btn {
    flex: 1;
    text-align: center;
    padding: 10px 5px;
    font-size: 13px;
  }

  /* Typography */
  h1 { font-size: 24px; }
  h2 { font-size: 20px; }
  h3 { font-size: 18px; }

  /* Generic Grid / Flex adjustments */
  .grid, .subject-grid, .button-grid, .doc-grid, .grid-container, .features-grid {
    grid-template-columns: 1fr !important;
    display: grid !important;
    gap: 15px;
  }
  
  .flex-row, .row {
    flex-direction: column !important;
  }

  /* Sections / Cards */
  .academic-section, .card, .profile-card, .document-card, .subject-card {
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 10px;
  }

  /* Modals */
  .modal, .modal-content, .upload-modal {
    width: 95% !important;
    max-width: none !important;
    padding: 20px !important;
    margin: 10px !important;
  }

  /* Chat Interface */
  .chat-container, .ai-assistant-container, .ai-chat-interface {
    width: 100% !important;
    height: auto !important;
    min-height: 80vh;
    border-radius: 0 !important;
    margin: 0 !important;
    padding: 10px !important;
  }
  
  .chat-messages {
    padding: 10px;
  }
  
  .chat-input-area {
    flex-direction: column;
    gap: 10px;
  }
  
  .chat-input-area input {
    width: 100%;
  }
  
  .chat-input-area button {
    width: 100%;
  }

  /* Footer */
  .footer, .site-footer {
    padding: 30px 5%;
    text-align: center;
  }
  
  .footer-links, .footer-content {
    flex-direction: column;
    gap: 20px;
  }
}

@media (max-width: 480px) {
  /* Extra small devices */
  .header-nav {
    flex-direction: column;
  }
  
  .header-nav .btn {
    width: 100%;
  }

  .btn {
    padding: 12px 15px;
    font-size: 14px;
    width: 100%;
    box-sizing: border-box;
    text-align: center;
  }
  
  input, select, textarea {
    font-size: 16px !important; /* Prevents iOS zoom on focus */
  }
}
"""

with open(r'frontend\src\App.css', 'a', encoding='utf-8') as f:
    f.write(responsive_css)

print("Appended responsive CSS to App.css")
