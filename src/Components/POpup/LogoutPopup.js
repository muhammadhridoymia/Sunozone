import React from 'react';
import './LogoutPopup.css';

function LogoutPopup({ onClose }) {


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="logout-popup-overlay">
      <div className="logout-popup">
        <div className="popup-content">

          <h2>Logout?</h2>
          <p>Are you sure? You want to logout from your account?</p>

          <div className="popup-actions">
            <button className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              Yes, Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogoutPopup;