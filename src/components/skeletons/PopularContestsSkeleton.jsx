import React from 'react';

const PopularContestsSkeleton = () => {
    return (
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-4">
    {[...Array(4)].map((_, index) => (
      <div
        key={index}
        className="overflow-hidden rounded-2xl bg-base-300 shadow h-full animate-pulse"
      >
        {/* Image Skeleton */}
        <div className="relative h-48 bg-base-100">
          {/* Type Badge Skeleton */}
          <div className="absolute top-3 left-3">
            <div className="h-6 w-20 bg-base-300 rounded-full"></div>
          </div>

          {/* Status Badge Skeleton */}
          <div className="absolute top-3 right-3">
            <div className="h-6 w-16 bg-base-300 rounded-full"></div>
          </div>

          {/* Prize Skeleton */}
          <div className="absolute bottom-3 right-3">
            <div className="h-8 w-20 bg-base-300 rounded-lg"></div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="p-5 space-y-4">
          {/* Title Skeleton */}
          <div className="space-y-2">
            <div className="h-5 w-full bg-base-200 rounded"></div>
            <div className="h-5 w-3/4 bg-base-200 rounded"></div>
          </div>

          {/* Description Skeleton */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-base-200 rounded"></div>
            <div className="h-4 w-5/6 bg-base-200 rounded"></div>
          </div>

          {/* Stats Skeleton */}
          <div className="flex items-center justify-between">
            <div className="h-4 w-24 bg-base-200 rounded"></div>
            <div className="h-4 w-16 bg-base-200 rounded"></div>
          </div>

          {/* Button Skeleton */}
          <div className="h-12 w-full bg-base-200 rounded-lg"></div>
        </div>
      </div>
    ))}
  </div>
    );
};

export default PopularContestsSkeleton;