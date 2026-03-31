import React from 'react';
import './SkeletonCard.css';

export const SkeletonCard = () => {
  return (
    <div className="story-card-horizontal skeleton">
      <div className="story-image-wrapper skeleton-box"></div>

      <div className="story-info">
        <div className="skeleton-line title"></div>
        <div className="skeleton-line author"></div>
        <div className="skeleton-line views"></div>
      </div>
    </div>
  );
};