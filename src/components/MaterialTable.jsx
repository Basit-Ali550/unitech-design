// "use client";

// import React from "react";
// import { Edit2, Trash2 } from "lucide-react";
// import useGet from "../hooks/useGet"; // adjust path if needed

// const MaterialTable = () => {
//   // Call API with default queries
//   const { data, loading, error } = useGet("/api/v1/materials", {
//     material_type: "",
//     page: 1,
//     page_size: 20,
//   });

//   if (loading) {
//     return (
//       <div className="p-6 text-center text-gray-600">Loading materials...</div>
//     );
//   }

//   if (error) {
//     return <div className="p-6 text-center text-red-600">Error: {error}</div>;
//   }

//   const materials = data?.materials || [];

//   return (
//     <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//       <table className="w-full">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">
//               Thumbnail
//             </th>
//             <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">
//               Name
//             </th>
//             <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">
//               SKU
//             </th>
//             <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">
//               Category
//             </th>
//             <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">
//               Actions
//             </th>
//           </tr>
//         </thead>

//         <tbody className="divide-y divide-gray-200">
//           {materials.length === 0 ? (
//             <tr>
//               <td colSpan="5" className="text-center py-6 text-gray-600">
//                 No materials found.
//               </td>
//             </tr>
//           ) : (
//             materials.map((item, index) => (
//               <tr key={index} className="hover:bg-gray-50 transition-colors">
//                 {/* Thumbnail */}
//                 <td className="px-6 py-3">
//                   <img
//                     src={item.thumbnail_url}
//                     alt={item.name}
//                     className="w-10 h-10 rounded object-cover"
//                   />
//                 </td>

//                 {/* Name */}
//                 <td className="px-6 py-3 text-sm font-medium text-gray-600">
//                   {item.name}
//                 </td>

//                 {/* SKU */}
//                 <td className="px-6 py-3 text-sm text-gray-600 font-mono">
//                   {item.sku}
//                 </td>

//                 {/* Category */}
//                 <td className="px-6 py-3 text-sm text-gray-600">
//                   {item.material_type}
//                 </td>

//                 {/* Actions */}
//                 <td className="px-6 py-3">
//                   <div className="flex items-center gap-2">
//                     <button
//                       className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
//                       title="Edit"
//                     >
//                       <Edit2 className="w-4 h-4" />
//                     </button>
//                     <button
//                       className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
//                       title="Delete"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default MaterialTable;
"use client";

import React, { useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import useGet from "../hooks/useGet";
import useDelete from "../hooks/useDelete";
import DeleteModal from "../components/DeleteModal";

const MaterialTable = () => {
  const { data, loading, error, refetch } = useGet("/api/v1/materials", {
    page: 1,
    page_size: 20,
  });

  const { deleteData, loading: deleting } = useDelete();

  const [selectedId, setSelectedId] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setOpenModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteData(`/api/v1/admin/materials/${selectedId}`);
      setOpenModal(false);
      refetch(); // reload table
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  const materials = data?.materials || [];

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-6 py-4">Thumbnail</th>
              <th className="text-left px-6 py-4">Name</th>
              <th className="text-left px-6 py-4">SKU</th>
              <th className="text-left px-6 py-4">Category</th>
              <th className="text-left px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {materials.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-3">
                  <img
                    src={item.thumbnail_url}
                    className="w-12 h-12 rounded object-cover"
                  />
                </td>
                <td className="px-6 py-3">{item.name}</td>
                <td className="px-6 py-3">{item.sku}</td>
                <td className="px-6 py-3">{item.material_type}</td>
                <td className="px-6 py-3">
                  <div className="flex gap-2">
                    <button className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDeleteClick(item.id)}
                      className="p-2 bg-red-50 text-red-600 rounded-lg"
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

      {/* DELETE MODAL */}
      <DeleteModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={confirmDelete}
        loading={deleting}
      />
    </>
  );
};

export default MaterialTable;
