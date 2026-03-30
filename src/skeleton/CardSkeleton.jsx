import React from "react";

const CardSkeleton = () => {
  return (
    <div className="flex justify-center">
        <div className="p-4 w-full sm:w-1/2 md:w-1/3">
        <div className="rounded-lg p-4 animate-pulse">
            
            {/* Image */}
            <div className="h-40 bg-gray-300 rounded mb-4"></div>

            {/* Title */}
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>

            {/* Subtitle */}
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>

        </div>
        </div>
    </div>
  );
};

export default CardSkeleton;