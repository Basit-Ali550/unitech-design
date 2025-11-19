// // src/components/ProjectsTable.jsx
// "use client";

// import React, { useState } from "react";
// import { Edit2, Trash2, Search } from "lucide-react";

// const projects = [
//   { id: 1, name: "Modern Living Room", style: "Modern", materials: "Oak Wood, Marble, Cotton Linen", created: "Jun 12, 2023" },
//   { id: 2, name: "Modern Living Room", style: "Modern", materials: "Oak Wood, Marble, Cotton Linen", created: "Jun 12, 2023" },
//   { id: 3, name: "Modern Living Room", style: "Modern", materials: "Oak Wood, Marble, Cotton Linen", created: "Jun 12, 2023" },
//   { id: 4, name: "Modern Living Room", style: "Modern", materials: "Oak Wood, Marble, Cotton Linen", created: "Jun 12, 2023" },
//   { id: 5, name: "Modern Living Room", style: "Modern", materials: "Oak Wood, Marble, Cotton Linen", created: "Jun 12, 2023" },
//   { id: 6, name: "Modern Living Room", style: "Modern", materials: "Oak Wood, Marble, Cotton Linen", created: "Jun 12, 2023" },
//   { id: 7, name: "Modern Living Room", style: "Modern", materials: "Oak Wood, Marble, Cotton Linen", created: "Jun 12, 2023" },
//   { id: 8, name: "Modern Living Room", style: "Modern", materials: "Oak Wood, Marble, Cotton Linen", created: "Jun 12, 2023" },
//   { id: 9, name: "Modern Living Room", style: "Modern", materials: "Oak Wood, Marble, Cotton Linen", created: "Jun 12, 2023" },
//   { id: 10, name: "Modern Living Room", style: "Modern", materials: "Oak Wood, Marble, Cotton Linen", created: "Jun 12, 2023" },
// ];

// const ProjectsTable = () => {
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("All Projects");

//   const filteredProjects = projects.filter(p =>
//     p.name.toLowerCase().includes(search.toLowerCase()) ||
//     p.style.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//       {/* Search & Filter */}
//       <div className="p-6 border-b">
//         <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
//           <div className="relative flex-1 max-w-md">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search Projects"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <select
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//             className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option>All Projects</option>
//             <option>Modern</option>
//             <option>Minimalist</option>
//             <option>Industrial</option>
//           </select>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-gray-50 border-b">
//             <tr>
//               <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">Project Name</th>
//               <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">Style</th>
//               <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">Materials Used</th>
//               <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">Created</th>
//               <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {filteredProjects.map((project) => (
//               <tr key={project.id} className="hover:bg-gray-50 transition-colors">
//                 <td className="px-6 py-4 text-sm font-medium text-gray-900">{project.name}</td>
//                 <td className="px-6 py-4 text-sm text-gray-600">{project.style}</td>
//                 <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{project.materials}</td>
//                 <td className="px-6 py-4 text-sm text-gray-600">{project.created}</td>
//                 <td className="px-6 py-4">
//                   <div className="flex items-center gap-2">
//                     <button className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
//                       <Edit2 className="w-4 h-4" />
//                     </button>
//                     <button className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ProjectsTable;
// src/components/ProjectsTable.jsx
"use client";

import React from "react";
import { Edit2, Trash2 } from "lucide-react";

const ProjectsTable = ({ projects }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 ">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">Project Name</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">Style</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">Materials Used</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">Created</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{project.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{project.style}</td>
                <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{project.materials}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{project.created}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectsTable;