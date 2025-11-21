"use client";

import React, { useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import useGet from "../hooks/useGet";
import useDelete from "../hooks/useDelete";
import DeleteModal from "../components/DeleteModal";
import MaterialTableSkeleton from "./MaterialTableSkeleton"; // Import skeleton
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
    return <MaterialTableSkeleton />;
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
