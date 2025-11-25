"use client";

import React, { useState } from "react";
import { ChevronDown, Check, Edit2, Trash2 } from "lucide-react";
import apiClient from "../hooks/apiClient";
import toast from "react-hot-toast";

const STATUS_OPTIONS = [
  { value: "active", label: "Active", color: "bg-green-100 text-green-700" },
  {
    value: "suspended",
    label: "Suspended",
    color: "bg-orange-100 text-orange-700",
  },
  { value: "banned", label: "Banned", color: "bg-red-100 text-red-700" },
  {
    value: "pending_verification",
    label: "Pending",
    color: "bg-yellow-100 text-yellow-700",
  },
];

const StatusDropdown = ({ currentStatus, userId, onStatusUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);

  const handleStatusChange = async (newStatus) => {
    if (newStatus === selectedStatus) {
      setIsOpen(false);
      return;
    }

    const toastId = toast.loading("Updating status...");

    setLoading(true);
    try {
      await apiClient(`/api/v1/users/admin/users/${userId}/profile-status`, {
        method: "PATCH",
        body: { profile_status: newStatus },
      });

      setSelectedStatus(newStatus);
      onStatusUpdate?.(); // ← safe call
      setIsOpen(false);

      toast.success("Status updated successfully!", { id: toastId });
    } catch (err) {
      toast.error(err.message || "Failed to update status", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const currentOption =
    STATUS_OPTIONS.find((opt) => opt.value === selectedStatus) ||
    STATUS_OPTIONS[0];

  const displayText = selectedStatus
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="relative cursor-pointer inline-block text-left">
      <button
        onClick={() => !loading && setIsOpen(!isOpen)}
        disabled={loading}
        className={`${currentOption.color}  cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:shadow-sm disabled:opacity-70 disabled:cursor-not-allowed`}
      >
        {loading ? (
          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <>
            {displayText}
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </>
        )}
      </button>

      {isOpen && !loading && (
        <div className="absolute top-full left-0 mt-2 w-44 bg-white rounded-lg shadow-xl border border-gray-200 z-20 overflow-hidden">
          {STATUS_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => handleStatusChange(option.value)}
              className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition flex items-center justify-between ${
                option.value === selectedStatus ? "bg-gray-50 font-medium" : ""
              }`}
            >
              <span>{option.label}</span>
              {option.value === selectedStatus && (
                <Check className="w-4 h-4 text-green-600" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const UsersTable = ({ users, onStatusUpdate }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">
                User Name
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">
                Email
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">
                Date
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">
                Role
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">
                Projects
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">
                Status
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {user.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.date}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.role === "Admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {user.projects}
                </td>
                <td className="px-6 py-4">
                  <StatusDropdown
                    currentStatus={user.status
                      .toLowerCase()
                      .replace(/\s/g, "_")}
                    userId={user.id}
                    onStatusUpdate={onStatusUpdate}
                  />
                </td>
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

export default UsersTable;
