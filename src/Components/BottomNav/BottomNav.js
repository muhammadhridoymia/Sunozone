import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaBookmark, FaUser } from 'react-icons/fa';
import './BottomNav.css';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'home', label: 'Home', icon: FaHome, path: '/home' },
    { id: 'mylist', label: 'My List', icon: FaBookmark, path: '/mylist' },
    { id: 'profile', label: 'Profile', icon: FaUser, path: '/profile' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Get current active tab based on path
  const getActiveTab = () => {
    const currentPath = location.pathname;
    const activeItem = navItems.find(item => item.path === currentPath);
    return activeItem ? activeItem.id : 'home';
  };

  const activeTab = getActiveTab();

  return (
    <div className="bottom-nav-simple">
      {navItems.map(item => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        
        return (
          <div
            key={item.id}
            className={`nav-item-simple ${isActive ? 'active' : ''}`}
            onClick={() => handleNavigation(item.path)}
          >
            <Icon className="nav-icon-simple" />
            <span className="nav-label-simple">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default BottomNav;