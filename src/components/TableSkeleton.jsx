// components/TableSkeleton.jsx
import React from "react";

const TableSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
      {/* Table Header */}
      <div className="bg-gray-100 h-16 px-6 flex items-center">
        <div className="h-4 bg-gray-300 rounded w-48"></div>
      </div>

      {/* Table Body - 8 rows */}
      <div className="divide-y divide-gray-200">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="px-6 py-5 flex items-center gap-6">
            {/* Name */}
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-64"></div>
              <div className="h-3 bg-gray-100 rounded w-48 mt-2"></div>
            </div>

            {/* Email / User */}
            <div className="w-56">
              <div className="h-4 bg-gray-200 rounded w-48"></div>
            </div>

            {/* Date */}
            <div className="w-32">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>

            {/* Role / Type */}
            <div className="w-28">
              <div className="h-7 bg-gray-200 rounded-full w-20"></div>
            </div>

            {/* Projects / Room */}
            <div className="w-32">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>

            {/* Status */}
            <div className="w-32">
              <div className="h-8 bg-gray-200 rounded-full w-24"></div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <div className="w-9 h-9 bg-gray-200 rounded-lg"></div>
              <div className="w-9 h-9 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;
