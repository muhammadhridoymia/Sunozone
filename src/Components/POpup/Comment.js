import React, { useState } from "react";
import "./Comment.css";

const CommentPopup = ({ onClose }) => {
  const [comments, setComments] = useState([
    "Nice post!",
    "Good work 👍",
  ]);

  const [text, setText] = useState("");

  const addComment = () => {
    if (!text.trim()) return;
    setComments([text, ...comments]);
    setText("");
  };


  return (
    <div className="overlay">
      <div className="popup">

        <div className="header">
          <h4>Comments</h4>
          <button onClick={onClose}>X</button>
        </div>

        <div className="body">
          {comments.map((c, i) => (
            <p key={i} className="comment">{c}</p>
          ))}
        </div>

        <div className="footer">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write comment..."
          />
          <button onClick={addComment}>Send</button>
        </div>

      </div>
    </div>
  );
};

export default CommentPopup;