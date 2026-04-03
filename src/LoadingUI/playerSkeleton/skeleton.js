import React from "react";
import "./skeleton.css";

export const SkeletonCard = () => {
  return (
    <div className="related-card skeleton-card">
      <div className="related-image skeleton skeleton-img"></div>

      <div className="related-info">
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-author"></div>
        <div className="skeleton skeleton-duration"></div>
      </div>
    </div>
  );
};