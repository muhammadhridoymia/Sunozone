import React, { useEffect, useState } from "react";
import "./ReadingPopup.css";

function ReadingPopup({ text, onClose }) {
  const [fontSize, setFontSize] = useState(18);
  const [theme, setTheme] = useState("light");
  const [selectedLanguage, setSelectedLanguage] = useState("bangla");

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  return (
    <div className="book-overlay" onClick={onClose}>
      <div className="book-container" onClick={(e) => e.stopPropagation()}>
        {/* Header with controls */}
        <div className="book-header">
          <div className="controls">
            <button
              onClick={() => setFontSize((prev) => Math.max(12, prev - 2))}
              className="control-btn"
              aria-label="Decrease font size"
            >
              A-
            </button>
            <span className="font-size">{fontSize}px</span>
            <button
              onClick={() => setFontSize((prev) => Math.min(32, prev + 2))}
              className="control-btn"
              aria-label="Increase font size"
            >
              A+
            </button>
            <button
              onClick={() => setTheme(theme === "light" ? "sepia" : "light")}
              className="control-btn"
              aria-label="Toggle theme"
            >
              {theme === "light" ? "📖" : "☀️"}
            </button>
            <button hidden={text?.text?.bangla === "" || text?.text?.bangla === undefined} className="control-btn" onClick={() => setSelectedLanguage("bangla")}>
              Bangla
            </button>
            <button hidden={text?.text?.english === "" || text?.text?.english === undefined} className="control-btn" onClick={() => setSelectedLanguage("english")}>
              English
            </button>
            <button hidden={text?.text?.arabic === "" || text?.text?.arabic === undefined} className="control-btn" onClick={() => setSelectedLanguage("arabic")}>
              Arabic
            </button>
            <div className="close-container">
         </div>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close reading popup">
            &times;
          </button>
        </div>

        {/* Book content */}
        <div className={`book-content ${theme}`}>
          <div className="book-page" style={{ fontSize: `${fontSize}px` }}>
            {selectedLanguage === "bangla" && text?.text?.bangla ? (
              <p>{text.text.bangla}</p>
            ) : selectedLanguage === "english" && text?.text?.english ? (
              <p>{text.text.english}</p>
            ) : selectedLanguage === "arabic" && text?.text?.arabic ? (
              <p>{text.text.arabic}</p>
            ) : (
              <p>No text available in this language.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReadingPopup;