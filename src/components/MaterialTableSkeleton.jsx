// components/MaterialTableSkeleton.tsx
import React from "react";

const MaterialTableSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
      <div className="bg-gray-100 h-16" /> {/* Header placeholder */}
      <div className="divide-y divide-gray-200">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center px-6 py-4">
            {/* Thumbnail */}
            <div className="w-6 h-6 bg-gray-200 rounded mr-6" />

            {/* Name */}
            <div className="flex-1 mr-6">
              <div className="h-4 bg-gray-200 rounded w-48" />
            </div>

            {/* SKU */}
            <div className="w-32 mr-6">
              <div className="h-4 bg-gray-200 rounded" />
            </div>

            {/* Category */}
            <div className="w-28 mr-6">
              <div className="h-4 bg-gray-200 rounded" />
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <div className="w-9 h-9 bg-gray-200 rounded-lg" />
              <div className="w-9 h-9 bg-gray-200 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaterialTableSkeleton;
