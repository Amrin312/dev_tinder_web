import React from "react";

const RequestSkeleton = () => {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xl mt-5">
        
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-white rounded-lg shadow p-4 mb-4 animate-pulse"
          >
            {/* Left section */}
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="w-12 h-12 bg-gray-300 rounded-full"></div>

              {/* Text */}
              <div>
                <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-20"></div>
              </div>
            </div>

            {/* Right buttons */}
            <div className="flex gap-2">
              <div className="w-16 h-8 bg-gray-300 rounded-md"></div>
              <div className="w-16 h-8 bg-gray-300 rounded-md"></div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default RequestSkeleton;