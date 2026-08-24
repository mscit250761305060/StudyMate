import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import { 
  getChatSessions, 
  createChatSession, 
  getChatMessages, 
  sendChatMessage,
  deleteChatSession
} from "../services/api";
import Breadcrumb from "../components/Breadcrumb";

function AIAssistantChat() {
  const { semesterId, subjectId, sessionId } = useParams();
  const navigate = useNavigate();

  const [sessions, setSessions] = useState([]);
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    loadSessions();
  }, []);

  // When sessionId in URL changes, load its messages
  useEffect(() => {
    if (sessionId) {
      loadMessages(sessionId);
    } else {
      setMessages([]);
    }
  }, [sessionId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadSessions = async () => {
    try {
      const data = await getChatSessions();
      setSessions(data);
    } catch (err) {
      console.error("Failed to load sessions", err);
    }
  };

  const loadMessages = async (sid) => {
    try {
      const data = await getChatMessages(sid);
      setMessages(data);
    } catch (err) {
      console.error("Failed to load messages", err);
    }
  };

  const handleNewChat = () => {
    // Navigate back to the AI Assistant root so the user can select a new Semester/Subject context
    navigate("/ai-assistant");
  };

  const handleSelectSession = (sid) => {
    navigate(`/ai-assistant/chat/${sid}`);
  };

  const handleAsk = async () => {
    if (!question.trim()) {
      setError("Please enter a question.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      let currentSessionId = sessionId;

      // If there's no sessionId in the URL, we are starting a brand new chat for a specific subject
      if (!currentSessionId) {
        if (!semesterId || !subjectId) {
          setError("Missing semester or subject context to start a new chat.");
          setLoading(false);
          return;
        }
        
        // Generate a title based on the first question
        const title = question.length > 30 ? question.substring(0, 30) + "..." : question;
        const newSession = await createChatSession(parseInt(semesterId), parseInt(subjectId), title);
        currentSessionId = newSession.id;
        
        setSessions([newSession, ...sessions]);
        
        // We do NOT navigate immediately to avoid unmounting the component while it's loading,
        // Instead, we just proceed with the backend request, but we update URL eventually?
        // Actually, updating the URL via navigate will re-render but might unmount if paths are different.
        // It's safer to just push history so the user can refresh and stay here.
        window.history.replaceState(null, "", `/ai-assistant/chat/${currentSessionId}`);
      }

      // Optimistically add user message to UI
      const userMsg = { role: "user", content: question.trim() };
      setMessages(prev => [...prev, userMsg]);
      const currentQuestion = question.trim();
      setQuestion("");

      // Send to backend
      const aiResponse = await sendChatMessage(currentSessionId, currentQuestion);
      
      // Update with AI response
      setMessages(prev => [...prev, aiResponse]);

    } catch (err) {
      console.error("AI question failed:", err);
      setError("Unable to get an answer right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSession = async (e, sid) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this chat session?")) return;
    
    try {
      await deleteChatSession(sid);
      setSessions(sessions.filter(s => s.id !== sid));
      setActiveDropdown(null);
      if (sessionId && parseInt(sessionId) === sid) {
        navigate("/ai-assistant");
      }
    } catch (err) {
      console.error("Failed to delete session", err);
      alert("Failed to delete chat session.");
    }
  };

  return (
    <div className="page-container" style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 230px)", overflow: "hidden" }}>
      <Breadcrumb items={[{ label: "AI Assistant", link: "/ai-assistant" }, { label: "Chat" }]} />
      
      <div style={{ display: "flex", flex: 1, gap: "20px", marginTop: "10px", minHeight: 0 }}>
        
        {/* Sidebar */}
        <div className="chat-sidebar" style={{ width: "250px", background: "#f8f9fa", borderRadius: "8px", border: "1px solid #e9ecef", display: "flex", flexDirection: "column", overflow: "hidden", flexShrink: 0 }}>
          <div style={{ padding: "15px", borderBottom: "1px solid #e9ecef" }} className="chat-sidebar-header">
            <button 
              onClick={handleNewChat}
              style={{ width: "100%", padding: "10px", background: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
            >
              + New Chat
            </button>
          </div>
          <div style={{ flex: 1, overflowY: "auto" }}>
            {sessions.map(session => {
              const isActive = (sessionId && parseInt(sessionId) === session.id) || window.location.pathname.includes(`/chat/${session.id}`);
              return (
                <div 
                  key={session.id}
                  className={`chat-session-item ${isActive ? "active" : ""}`}
                  onClick={() => handleSelectSession(session.id)}
                  onMouseLeave={() => setActiveDropdown(null)}
                  style={{ 
                    padding: "12px 15px", 
                    cursor: "pointer", 
                    borderBottom: "1px solid #eee",
                    background: isActive ? "#e2e6ea" : "transparent",
                    fontWeight: isActive ? "bold" : "normal",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    position: "relative"
                  }}
                >
                  <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", flex: 1 }}>
                    {session.title}
                  </div>
                  <div style={{ position: "relative" }}>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setActiveDropdown(activeDropdown === session.id ? null : session.id); }}
                      style={{ background: "transparent", border: "none", cursor: "pointer", color: "inherit", padding: "4px" }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="12" cy="5" r="1"></circle>
                        <circle cx="12" cy="19" r="1"></circle>
                      </svg>
                    </button>
                    {activeDropdown === session.id && (
                      <div className="chat-dropdown" style={{ position: "absolute", top: "100%", right: "0", background: "white", border: "1px solid #ccc", borderRadius: "4px", boxShadow: "0 2px 5px rgba(0,0,0,0.2)", zIndex: 10 }}>
                        <button 
                          className="chat-dropdown-item"
                          onClick={(e) => handleDeleteSession(e, session.id)}
                          style={{ padding: "8px 16px", background: "transparent", border: "none", color: "#ef4444", cursor: "pointer", width: "100%", textAlign: "left", whiteSpace: "nowrap" }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            {sessions.length === 0 && (
              <div className="chat-sidebar-empty" style={{ padding: "15px", color: "#6c757d", textAlign: "center", fontSize: "0.9rem" }}>
                No chat history found.
              </div>
            )}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="chat-main-area" style={{ flex: 1, background: "white", borderRadius: "8px", border: "1px solid #e9ecef", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          
          {/* Messages Area */}
          <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
            
            {messages.length === 0 && (
              <div className="chat-empty-state" style={{ maxWidth: "600px", margin: "40px auto", textAlign: "center", color: "#6c757d" }}>
                <h2 className="chat-empty-title" style={{ color: "#343a40", marginBottom: "15px" }}>Ready to help!</h2>
                <p>
                  You've selected a specific subject context. Type your question below, and I will search through the syllabus, materials, assignments, and lab plans to find the answer.
                </p>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div key={idx} style={{ 
                marginBottom: "20px", 
                display: "flex", 
                flexDirection: "column",
                alignItems: msg.role === "user" ? "flex-end" : "flex-start" 
              }}>
                <div className={msg.role === "user" ? "chat-user-message" : "chat-bot-message"} style={{ 
                  maxWidth: "80%", 
                  padding: "15px", 
                  borderRadius: "8px", 
                  background: msg.role === "user" ? "#007bff" : "#f1f3f5",
                  color: msg.role === "user" ? "white" : "#212529",
                  lineHeight: "1.5"
                }}>
                  {msg.role === "user" ? (
                    <div style={{ whiteSpace: "pre-wrap" }}>{msg.content}</div>
                  ) : (
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "20px" }}>
                <div className="chat-bot-message" style={{ padding: "15px", borderRadius: "8px", background: "#f1f3f5", color: "#6c757d" }}>
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="chat-input-area" style={{ padding: "20px", borderTop: "1px solid #e9ecef", background: "#f8f9fa" }}>
            {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                className="chat-input"
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => { if(e.key === "Enter") handleAsk(); }}
                placeholder="Message AI Assistant..."
                disabled={loading}
                style={{ flex: 1, padding: "15px", borderRadius: "24px", border: "1px solid #ccc", outline: "none" }}
              />
              <button 
                onClick={handleAsk} 
                disabled={loading}
                style={{ padding: "0 25px", background: "#007bff", color: "white", border: "none", borderRadius: "24px", cursor: "pointer", fontWeight: "bold" }}
              >
                Send
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AIAssistantChat;
