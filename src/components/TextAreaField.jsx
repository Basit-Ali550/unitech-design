"use client";

import React, { useState } from "react";
import { useField } from "formik";

const TextAreaField = ({
  label,
  name,
  placeholder,
  className,
  rows = 4,
  leftIcon: LeftIcon,
  hideLabel = false,
  onChange,
}) => {
  const [field, meta] = useField(name);
  const [isFocused, setIsFocused] = useState(false);

  const hasError = meta.touched && meta.error;

  const handleChange = (e) => {
    field.onChange(e);
    if (onChange) onChange(e);
  };

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
          <div className="absolute left-0 top-3 pl-3 flex items-start pointer-events-none">
            <LeftIcon className="h-4 w-4 text-gray-700" />
          </div>
        )}

        <textarea
          {...field}
          id={name}
          name={name}
          rows={rows}
          placeholder={placeholder}
          className={`
            block w-full px-[14px] py-[10px]
            border border-[#597BE84D] rounded-[12px]
            focus:outline-none transition-all duration-200 resize-none
            ${
              hasError
                ? "border-[#FDA29B] focus:shadow-[0_0_0_4px_rgba(239,68,68,0.1)]"
                : isFocused
                ? "shadow-[0_0_0_4px_rgba(89,123,232,0.1)]"
                : ""
            }
            ${LeftIcon ? "pl-10" : ""}
          `}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            field.onBlur(e);
          }}
        />
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

export default TextAreaField;
