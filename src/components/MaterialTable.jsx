"use client";

import React from "react";
import { Edit2, Trash2 } from "lucide-react";

const materials = [
  { thumbnail: "Wood", name: "Oak Wood", sku: "MT-WD-001", category: "Wood" },
  { thumbnail: "Metal", name: "Brushed Steel", sku: "MT-MT-005", category: "Metal" },
  { thumbnail: "Marble", name: "Carrara Marble", sku: "MT-ST-012", category: "Stone" },
  { thumbnail: "Fabric", name: "Cotton Linen", sku: "MT-FB-008", category: "Fabric" },
  { thumbnail: "Leather", name: "Genuine Leather", sku: "MT-LT-003", category: "Leather" },
];

const MaterialTable = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">Thumbnail</th>
            <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">Name</th>
            <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">SKU</th>
            <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">Category</th>
            <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {materials.map((item, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 transition-colors"
            >
              {/* Thumbnail */}
              <td className="px-6 py-3">
                <div className=" text-sm font-medium text-gray-800">
                  {item.thumbnail}
                </div>
              </td>

              {/* Name */}
              <td className="px-6 py-3 text-sm font-medium text-gray-600">
                {item.name}
              </td>

              {/* SKU */}
              <td className="px-6 py-3 text-sm text-gray-600 font-mono">
                {item.sku}
              </td>

              {/* Category */}
              <td className="px-6 py-3 text-sm text-gray-600">
                {item.category}
              </td>

              {/* Actions */}
              <td className="px-6 py-3">
                <div className="flex items-center gap-2">
                  <button
                    className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaterialTable;