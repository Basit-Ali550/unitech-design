import React from "react";

const Button = ({
  label,
  loading = false,
  variant = "primary",
  onClick,
  disabled = false,
  className = "",
}) => {
  let variantStyles = "";

  if (variant === "primary") {
    variantStyles = "bg-[#0461A6] hover:bg-[#03548F] text-white";
  } else if (variant === "secondary") {
    variantStyles = "bg-gray-500 hover:bg-gray-600 text-white";
  } else if (variant === "outline") {
    variantStyles =
      "border border-[#0461A6] text-[#0461A6] bg-transparent hover:bg-[#0461A6] hover:text-white";
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`flex items-center justify-center 
        w-[335px] h-[52px] rounded-[10px] font-medium 
        transition-all duration-200 
        ${variantStyles} 
        ${disabled || loading ? "opacity-70 cursor-not-allowed" : ""} 
        ${className}`}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          Loading...
        </span>
      ) : (
        label
      )}
    </button>
  );
};

export default Button;
