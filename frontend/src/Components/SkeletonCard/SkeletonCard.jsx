import React from "react";

const SkeletonCard = () => {
  return (
    <div className="flex flex-col border border-[var(--border-color)] bg-[var(--bg-primary)] p-3">
      <div className="w-full aspect-[3/4] skeleton-shimmer mb-4" />
      <div className="h-[14px] w-[85%] skeleton-shimmer mb-3" />
      <div className="h-[14px] w-[40%] skeleton-shimmer" />
    </div>
  );
};

export default SkeletonCard;
