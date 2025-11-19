// components/AuthContainer.jsx
import React from "react";
import Image from "next/image";
import Logo from "../../public/images/Logo.svg"

const AuthContainer = ({ title, children }) => {
  return (

      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image src={Logo} alt="Logo" width={100} height={100} />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>

        {/* Content (Form or other children) */}
        {children}
      </div>
    </div>

  );
};

export default AuthContainer;