import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-hero">
      <div className="landing-glow" />
      <div className="landing-glow-2" />
      
      <div className="landing-content">
        <h1 className="landing-title">Empower your academic journey</h1>
        <p className="landing-subtitle">
          Instantly access syllabus, materials, question papers, and an AI-driven learning assistant built exclusively for BSc IT students.
        </p>
        
        <div className="landing-prompt-box">
          <div className="prompt-header">
            <span>StudyMate AI Assistant</span>
            <span className="badge">NEW</span>
          </div>
          <div className="prompt-body">
            <p>Analyze my <strong>@Computer_Networks_Syllabus</strong> and generate a study plan that flags any complex topics I need to focus on before the midterms.</p>
            
            <div className="prompt-actions">
              <div className="prompt-suggestions">
                <span>Starter prompts ▾</span>
              </div>
              <button className="prompt-submit-btn" onClick={() => navigate('/register')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div className="landing-integrations">
          <div className="integration-pill">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>
            <span>Seamless Document Integration</span>
          </div>
          <div className="integration-pill">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
            <span>Powered by Gemini 2.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
