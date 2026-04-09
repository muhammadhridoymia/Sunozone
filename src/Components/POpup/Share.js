import React, { useState } from 'react';
import { 
  FaFacebook, 
  FaTwitter, 
  FaLinkedin, 
  FaWhatsapp, 
  FaLink, 
  FaTimes 
} from "react-icons/fa";
import './Share.css';   // ← Import the CSS file

function SharePopUp({ link, onClose }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(link)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(link)}`,
  };

  const openShare = (url) => {
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <div className="share-backdrop" onClick={onClose}>
      <div className="share-popup" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="share-header">
          <div>
            <h2>Share this link</h2>
            <p>Spread the word with your friends!</p>
          </div>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        {/* Social Icons */}
        <div className="social-icons">
          <button 
            onClick={() => openShare(shareUrls.facebook)} 
            className="icon-btn facebook"
            aria-label="Share on Facebook"
          >
            <FaFacebook />
            <span>Facebook</span>
          </button>

          <button 
            onClick={() => openShare(shareUrls.twitter)} 
            className="icon-btn twitter"
            aria-label="Share on Twitter"
          >
            <FaTwitter />
            <span>Twitter</span>
          </button>

          <button 
            onClick={() => openShare(shareUrls.linkedin)} 
            className="icon-btn linkedin"
            aria-label="Share on LinkedIn"
          >
            <FaLinkedin />
            <span>LinkedIn</span>
          </button>

          <button 
            onClick={() => openShare(shareUrls.whatsapp)} 
            className="icon-btn whatsapp"
            aria-label="Share on WhatsApp"
          >
            <FaWhatsapp />
            <span>WhatsApp</span>
          </button>
        </div>

        {/* Copy Link Section */}
        <div className="copy-section">
          <p className="copy-title">Or copy the link</p>
          
          <div className="copy-box">
            <input 
              type="text" 
              value={link}
              readOnly 
              className="link-input"
            />
            <button 
              onClick={handleCopyLink}
              className="copy-btn"
            >
              <FaLink /> 
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="share-footer">
          <button className="close-text-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default SharePopUp;