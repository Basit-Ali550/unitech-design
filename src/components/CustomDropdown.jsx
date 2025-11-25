// src/components/CustomDropdown.jsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const CustomDropdown = ({
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Find selected label
  const selectedOption = options.find((opt) =>
    typeof opt === "object" ? opt.value === value : opt === value
  );
  const displayText =
    selectedOption && typeof selectedOption === "object"
      ? selectedOption.label
      : selectedOption || placeholder;

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-between w-full px-4 py-3 
          border border-gray-300 rounded-xl text-sm font-medium
          bg-white text-left
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          transition-all duration-200
          hover:border-gray-400
          min-w-[160px]
        `}
      >
        <span
          className={`truncate ${value ? "text-gray-900" : "text-gray-500"}`}
        >
          {displayText}
        </span>
        <ChevronDown
          className={`w-4 h-4 ml-3 transition-transform duration-200 flex-shrink-0 text-gray-500 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu - Right Aligned */}
      {isOpen && (
        <div
          className={`
            absolute right-0 mt-2 
            w-full min-w-[180px] 
            bg-white border border-gray-200 rounded-xl 
            shadow-lg z-50 overflow-hidden
            animate-in fade-in slide-in-from-top-2 duration-200
          `}
        >
          <div className="py-1">
            {options.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                No options available
              </div>
            ) : (
              options.map((option, index) => {
                const optionValue =
                  typeof option === "object" ? option.value : option;
                const optionLabel =
                  typeof option === "object" ? option.label : option;

                return (
                  <button
                    key={index}
                    onClick={() => {
                      onChange(optionValue);
                      setIsOpen(false);
                    }}
                    className={`
                      w-full px-4 py-3 text-left text-sm font-medium
                      transition-colors duration-150
                      ${
                        optionValue === value
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-50"
                      }
                    `}
                  >
                    {optionLabel}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
