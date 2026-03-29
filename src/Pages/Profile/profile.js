import React from 'react';
import BottomNav from '../../Components/BottomNav/BottomNav';
import './profile.css';

const Profile = () => {
  // User data
  const userData = {
    name: "Alexandra Story",
    balance: 1250,
    currency: "Taka",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"
  };

  const handleAddBalance = () => {
    alert('💰 Add balance feature coming soon!');
  };

  return (
    <>
      <div className="profile-simple">
        {/* Header */}
        <div className="profile-header-simple">
          <h1>My Profile</h1>
        </div>

        {/* Profile Card */}
        <div className="profile-card-simple">
          {/* Profile Image */}
          <div className="profile-image-container">
            <img 
              src={userData.avatar} 
              alt={userData.name} 
              className="profile-image-simple"
            />
          </div>

          {/* Name */}
          <h2 className="profile-name-simple">{userData.name}</h2>

          {/* Balance Card */}
          <div className="balance-card-simple">
            <div className="balance-label">Balance</div>
            <div className="balance-amount-simple">
              <span className="currency">{userData.currency}</span>
              <span className="amount">{userData.balance.toLocaleString()}</span>
              <span className="decimal">.00</span>
            </div>
            <button className="add-balance-btn" onClick={handleAddBalance}>
              + Add Balance
            </button>
          </div>
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <BottomNav />
    </>
  );
};

export default Profile;