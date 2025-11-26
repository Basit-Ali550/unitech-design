// "use client";

// import React from "react";
// import { Edit2, Trash2 } from "lucide-react";

// const ProjectsTable = ({ projects }) => {
//   return (
//     <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-gray-100 ">
//             <tr>
//               <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">
//                 Project Name
//               </th>
//               <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">
//                 Style
//               </th>
//               <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">
//                 Materials Used
//               </th>
//               <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">
//                 Created
//               </th>
//               <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {projects.map((project) => (
//               <tr
//                 key={project.id}
//                 className="hover:bg-gray-50 transition-colors"
//               >
//                 <td className="px-6 py-4 text-sm font-medium text-gray-900">
//                   {project.name}
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-600">
//                   {project.style}
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
//                   {project.materials}
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-600">
//                   {project.created}
//                 </td>
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
"use client";

import React from "react";
import { Edit2, Trash2, ExternalLink } from "lucide-react";

const ProjectsTable = ({ projects }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">
                Project Name
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">
                User
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">
                Type
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">
                Style
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">
                Room
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">
                Created
              </th>
              {/* <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">
                Actions
              </th> */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {projects.map((project) => (
              <tr
                key={project.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {project.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <div>
                    <p className="font-medium">{project.userName}</p>
                    <p className="text-xs text-gray-500">{project.userEmail}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      project.designType === "Interior"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {project.designType}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {project.style}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {project.roomType}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {project.created}
                </td>
                {/* <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {project.originalImage && (
                      <a
                        href={project.originalImage}
                        target="_blank"
                        rel="noopener Tadnorefer"
                        className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <button className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectsTable;
