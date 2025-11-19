// src/components/CustomDropdown.jsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const CustomDropdown = ({ options, value, onChange, placeholder = "Select" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block">
      {/* Trigger Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-between w-full px-4 py-2 
          border border-gray-300 rounded-lg text-sm 
          bg-white text-left
          focus:outline-none focus:ring-2 focus:ring-blue-500
          transition-none min-w-[140px]
        `}
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown
          className={`w-4 h-4 ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown List - Right Aligned */}
      {isOpen && (
        <div
          className={`
            absolute mt-1 
            w-[150px] bg-white border border-gray-300 
            rounded-lg shadow-lg z-50 overflow-hidden
            right-0
          `}
          style={{
            // Ensures list opens from bottom-left of button
            top: "100%",
            right: 0,
          }}
        >
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`
                w-full text-left px-3 py-2 text-sm 
                hover:bg-gray-50 transition-colors
                ${value === option ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700"}
              `}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;