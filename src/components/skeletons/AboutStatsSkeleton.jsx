import React from "react";

const AboutStatsSkeleton = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="text-center bg-base-100 p-4 rounded-2xl shadow-xl animate-pulse"
        >
          {/* Icon skeleton */}
          <div className="flex justify-center mb-2">
            <div className="w-10 h-10 bg-base-300 rounded-full"></div>
          </div>
          {/* Number skeleton */}
          <div className="flex justify-center mb-1">
            <div className="h-10 w-24 bg-base-300 rounded"></div>
          </div>
          {/* Label skeleton */}
          <div className="flex justify-center">
            <div className="h-4 w-20 bg-base-300 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AboutStatsSkeleton;
