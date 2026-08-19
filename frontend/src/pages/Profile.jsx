import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';

function Profile() {
  const { user, logout } = useAuth();

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="profile-page">
      <Breadcrumb
        items={[
          { label: "My Profile" },
        ]}
      />

      <div className="profile-container">
        <div className="profile-header-card">
          <div className="profile-avatar-large">
            {getInitials(user?.name)}
          </div>
          <div className="profile-title-block">
            <h1>{user?.name || 'User'}</h1>
            <p className="profile-email">{user?.email}</p>
            <div className="profile-badge">Student</div>
          </div>
        </div>

        <div className="profile-grid">
          {/* Account Details */}
          <div className="profile-card">
            <div className="profile-card-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              <h2>Account Details</h2>
            </div>
            <div className="profile-card-content">
              <div className="profile-detail-row">
                <span className="detail-label">Full Name</span>
                <span className="detail-value">{user?.name}</span>
              </div>
              <div className="profile-detail-row">
                <span className="detail-label">Email Address</span>
                <span className="detail-value">{user?.email}</span>
              </div>
              <div className="profile-detail-row">
                <span className="detail-label">Account Status</span>
                <span className="detail-value status-active">Active</span>
              </div>
            </div>
          </div>

          {/* Academic Details */}
          <div className="profile-card">
            <div className="profile-card-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>
              <h2>Academic Profile</h2>
            </div>
            <div className="profile-card-content">
              <div className="profile-detail-row">
                <span className="detail-label">Course</span>
                <span className="detail-value">{user?.course_id ? `Course ID: ${user.course_id}` : 'BSc IT'}</span>
              </div>
              <div className="profile-detail-row">
                <span className="detail-label">College</span>
                <span className="detail-value">{user?.college_id ? `College ID: ${user.college_id}` : 'Gujarat Technological University'}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="profile-card profile-actions-card">
            <div className="profile-card-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
              <h2>Settings & Actions</h2>
            </div>
            <div className="profile-card-content profile-actions">
              <Link to="/" className="btn-secondary" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
                Back to Dashboard
              </Link>
              <button onClick={logout} className="btn-danger" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: 'none', background: '#ef4444', color: 'white', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
