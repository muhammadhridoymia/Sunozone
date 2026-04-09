import React from 'react';
import BottomNav from '../../Components/BottomNav/BottomNav';
import Login from '../../Register/Login';
import LogoutPopup from '../../Components/POpup/LogoutPopup';
import './profile.css';

const Profile = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const userData = user ? JSON.parse(user) : null;
  const [showLogoutPopup, setShowLogoutPopup] = React.useState(false);

  if (!token || !userData) {
    return <Login />;
  }

  const handleAddBalance = () => {
    alert('💰 Add balance feature coming soon!');
  };

  const handleLogout = () => {
    setShowLogoutPopup(true);
  };

  return (
    <>
      {showLogoutPopup && <LogoutPopup onClose={()=> setShowLogoutPopup(false)} />}
      <div className="profile-page">
        <div className="profile-container">
          {/* Main Card */}
          <div className="profile-card">
            {/* Avatar Section */}
            <div className="avatar-section">
              <div className="avatar-wrapper">
                <img 
                  src={userData.avatar || 'https://via.placeholder.com/200'} 
                  alt={userData.name} 
                  className="profile-avatar"
                />
              </div>
            </div>

            {/* Content */}
            <div className="profile-content">
              <h2 className="user-name">{userData.name}</h2>
              {userData.email && <p className="user-email">{userData.email}</p>}

              {/* Balance */}
              <div className="balance-section">
                <div className="balance-label">Your Balance</div>
                <div className="balance-amount">
                  <span className="currency">{userData.currency || '$'}</span>
                  <span className="main-amount">1,000</span>
                  <span className="decimal">.00</span>
                </div>
                <button className="add-btn" onClick={handleAddBalance}>
                  + Add Money
                </button>
              </div>

              {/* Info Rows */}
              <div className="info-list">
                {userData.phone && (
                  <div className="info-row">
                    <span className="info-icon">📱</span>
                    <div>
                      <div className="info-title">Phone</div>
                      <div className="info-value">{userData.phone}</div>
                    </div>
                  </div>
                )}
                <div className="info-row">
                  <span className="info-icon">📅</span>
                  <div>
                    <div className="info-title">Member Since</div>
                    <div className="info-value">April 2026</div>
                  </div>
                  <div>
                    <span className="info-icon">⭐</span>
                    <div className="info-title">Premium User</div>
                  </div>
                  <div>
                    <span className="info-icon">🎧</span>
                    <div className="info-title">Listening History</div>
                  </div>
                  <div>
                    <span className='info-icon'>🔔</span>
                    <div className="info-title">Notifications</div>

                  </div>
                </div>
              </div>

              {/* Logout */}
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </>
  );
};

export default Profile;