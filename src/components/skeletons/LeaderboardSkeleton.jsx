import React from "react";

const LeaderboardSkeleton = () => (
  <div className="max-w-5xl mx-auto">
    {/* Podium Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
      {/* 1st Place */}
      <div className="glass-card p-6 text-center order-1 md:order-2 scale-105 border-2 border-base-300 animate-pulse">
        <div className="w-18 h-18 rounded-full mx-auto mb-2 bg-base-300"></div>
        <div className="h-8 w-8 bg-base-300 rounded mx-auto mb-2"></div>
        <div className="h-5 w-24 bg-base-300 rounded mx-auto mb-2"></div>
        <div className="h-4 w-16 bg-base-300 rounded mx-auto"></div>
      </div>
      {/* 2nd Place */}
      <div className="glass-card p-5 text-center order-2 md:order-1 animate-pulse">
        <div className="w-16 h-16 rounded-full mx-auto mb-2 bg-base-300"></div>
        <div className="h-8 w-8 bg-base-300 rounded mx-auto mb-2"></div>
        <div className="h-5 w-24 bg-base-300 rounded mx-auto mb-2"></div>
        <div className="h-4 w-16 bg-base-300 rounded mx-auto"></div>
      </div>
      {/* 3rd Place */}
      <div className="glass-card p-5 text-center order-3 animate-pulse">
        <div className="w-16 h-16 rounded-full mx-auto mb-2 bg-base-300"></div>
        <div className="h-8 w-8 bg-base-300 rounded mx-auto mb-2"></div>
        <div className="h-5 w-24 bg-base-300 rounded mx-auto mb-2"></div>
        <div className="h-4 w-16 bg-base-300 rounded mx-auto"></div>
      </div>
    </div>

    {/* Mobile List Skeleton */}
    <div className="space-y-3 md:hidden">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="glass-card p-4 flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-3">
            <div className="h-5 w-8 bg-base-300 rounded"></div>
            <div className="w-10 h-10 rounded-full bg-base-300"></div>
            <div>
              <div className="h-4 w-24 bg-base-300 rounded mb-2"></div>
              <div className="h-3 w-16 bg-base-300 rounded"></div>
            </div>
          </div>
          <div className="h-5 w-20 bg-base-300 rounded"></div>
        </div>
      ))}
    </div>

    {/* Desktop Table Skeleton */}
    <div className="hidden md:block glass-card rounded-xl overflow-hidden animate-pulse">
      <table className="w-full">
        <thead className="bg-base-300">
          <tr>
            <th className="px-6 py-4 text-left">
              <div className="h-4 w-12 bg-base-200 rounded"></div>
            </th>
            <th className="px-6 py-4 text-left">
              <div className="h-4 w-20 bg-base-200 rounded"></div>
            </th>
            <th className="px-6 py-4 text-center">
              <div className="h-4 w-12 bg-base-200 rounded mx-auto"></div>
            </th>
            <th className="px-6 py-4 text-right">
              <div className="h-4 w-20 bg-base-200 rounded ml-auto"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          {[...Array(10)].map((_, i) => (
            <tr key={i} className="border-t border-base-content/30">
              <td className="px-6 py-4">
                <div className="h-4 w-8 bg-base-300 rounded"></div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-base-300"></div>
                  <div className="h-4 w-32 bg-base-300 rounded"></div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="h-6 w-12 bg-base-300 rounded-full mx-auto"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-5 w-24 bg-base-300 rounded ml-auto"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default LeaderboardSkeleton;