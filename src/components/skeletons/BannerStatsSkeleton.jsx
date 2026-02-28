import React from "react";

const BannerStatsSkeleton = () => {
  return (
    <div className="grid grid-cols-3 gap-2 md:gap-6 max-w-3xl mx-auto">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex flex-col md:flex-row items-center gap-1 md:gap-4 p-4 bg-base-300 rounded-2xl animate-pulse"
        >
          {/* Icon skeleton */}
          <div className="w-15 md:w-12 h-15 md:h-12 rounded-xl bg-base-200"></div>

          {/* Text skeleton */}
          <div className="text-center md:text-left w-full">
            {/* Number skeleton */}
            <div className="h-6 md:h-8 w-16 md:w-20 bg-base-200 rounded mb-1 mx-auto md:mx-0"></div>
            {/* Label skeleton */}
            <div className="h-3 md:h-4 w-20 md:w-24 bg-base-200 rounded mx-auto md:mx-0"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BannerStatsSkeleton;
