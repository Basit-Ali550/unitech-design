"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronDown, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const TopBar = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const initial = user?.first_name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="bg-white px-6 py-2 flex items-center border-b border-gray-200 justify-between relative">
      <div></div>

      {/* Profile */}
      <div className="flex items-center border-blue-100  rounded-full p-1 border-4 gap-4">
        <div
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={() => setOpen(!open)}
        >
          {/* Avatar Letter */}
          <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-lg font-semibold text-white">
            {initial}
          </div>

          {/* Full Name */}
          <div>
            <p className="text-sm text-gray-800 font-medium">
              {user?.first_name}
            </p>
          </div>

          <ChevronDown
            className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>

        {/* ATTRACTIVE DROPDOWN */}
        {open && (
          <div
            className="absolute right-6 top-16 w-52 bg-white shadow-xl border border-gray-100 rounded-xl py-2 z-50 
                       animate-fadeIn"
          >
            {/* User Info */}
            <div className="px-4 pt-2">
              <p className="text-xs text-gray-500">Signed in as</p>
              <p className="text-sm font-semibold text-gray-800 mt-1">
                {user?.email}
              </p>
            </div>

            {/* Options */}
            <button
              onClick={logout}
              className="w-full flex items-center gap-2 px-4 py-2.5 cursor-pointer  text-sm text-red-600 
                         hover:bg-red-50 rounded-lg transition"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        )}
      </div>

      {/* ANIMATION STYLES */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-6px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.18s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default TopBar;
