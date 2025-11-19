"use client";

import React, { useState, useRef, useEffect } from "react";
import { useField } from "formik";
import { Eye, EyeOff } from "lucide-react";

const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  className,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  hideLabel = false,
  onChange,
}) => {
  const [field, meta] = useField(name);
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const inputRef = useRef(null);
  const timePickerRef = useRef(null);

  const inputType = type === "password" ? (showPassword ? "text" : "password") : type;
  const hasError = meta.touched && meta.error;

  // Handle clicks outside to close time picker
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        timePickerRef.current &&
        !timePickerRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowTimePicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Combine Formik's onChange with custom onChange
  const handleChange = (e) => {
    field.onChange(e);
    if (onChange) {
      onChange(e);
    }
  };

  // Handle time selection
  const handleTimeSelect = (time) => {
    const event = {
      target: { name, value: time },
    };
    field.onChange(event);
    if (onChange) {
      onChange(event);
    }
    setShowTimePicker(false);
  };

  // Generate time options (e.g., every 30 minutes)
  const timeOptions = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      timeOptions.push(time);
    }
  }

  return (
    <div className={className}>
      {!hideLabel && label && (
        <label
          htmlFor={name}
          className="text-[#3C4566] font-medium text-sm mb-3"
        >
          {label}
        </label>
      )}

      <div className="relative mt-1">
        {LeftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LeftIcon className="h-4 w-4 text-gray-700" />
          </div>
        )}

        <input
          {...field}
          id={name}
          name={name}
          type={type === "time" ? "text" : inputType}
          className={`
            block w-full px-[14px] py-[10px]
            border border-[#597BE84D] rounded-[12px]
            focus:outline-none transition-all duration-200
            ${
              hasError
                ? "border-[#FDA29B] focus:shadow-[0_0_0_4px_rgba(239,68,68,0.1)]"
                : isFocused
                ? "shadow-[0_0_0_4px_rgba(89,123,232,0.1)]"
                : ""
            }
            ${LeftIcon ? "pl-10" : ""}
            ${RightIcon || type === "password" || type === "time" ? "pr-10" : ""}
            ${
              type === "number"
                ? "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                : ""
            }
          `}
          placeholder={placeholder}
          onChange={handleChange}
          onFocus={() => {
            setIsFocused(true);
            if (type === "time") setShowTimePicker(true);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            field.onBlur(e);
          }}
          onClick={() => type === "time" && setShowTimePicker(true)}
          ref={inputRef}
          readOnly={type === "time"}
        />

        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          {RightIcon && type !== "password" && type !== "number" && type !== "time" && (
            <RightIcon className="h-4 w-4 text-gray-700" />
          )}

          {type === "password" && !RightIcon && (
            <button
              type="button"
              className="text-gray-700 hover:text-gray-600 focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          )}
        </div>

        {type === "time" && showTimePicker && (
          <div
            ref={timePickerRef}
            className="absolute z-10 mt-2 w-full bg-white border border-[#597BE84D] rounded-xl shadow-lg max-h-60 overflow-y-auto"
          >
            {timeOptions.map((time) => (
              <div
                key={time}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-[#3C4566]"
                onClick={() => handleTimeSelect(time)}
              >
                {time}
              </div>
            ))}
          </div>
        )}
      </div>

      {hasError && (
        <div className="flex items-center mt-1 text-red-500">
          <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-xs">{meta.error}</span>
        </div>
      )}
    </div>
  );
};

export default InputField;