import React, { useEffect, useState } from "react";
import "./ReadingPopup.css";

function ReadingPopup({ text, onClose }) {
  const [fontSize, setFontSize] = useState(18);
  const [theme, setTheme] = useState("light");
  const [isBangla, setIsBangla] = useState(true);

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
            <button hidden={text?.text?.bangla === ""} className="control-btn" onClick={() => setIsBangla(true)}>
              Bangla
            </button>
            <button hidden={text?.text?.english === ""} className="control-btn" onClick={() => setIsBangla(false)}>
              English
            </button>
          </div>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Book content */}
        <div className={`book-content ${theme}`}>
          <div className="book-page" style={{ fontSize: `${fontSize}px` }}>
            {isBangla
              ? text?.text?.bangla || "Loading..."
              : text?.text?.english || "Loading..."}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReadingPopup;
