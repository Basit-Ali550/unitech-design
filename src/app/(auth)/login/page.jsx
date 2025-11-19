// components/Login.jsx
"use client";

import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../../components/InputFeild";
import { Mail, Lock } from "lucide-react";
import Logo from "../../../../public/images/Logo.svg"
import Image from "next/image";
const Login = () => {
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
  });

  const handleSubmit = (values) => {
    console.log("Login submitted:", values);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
               <Image src={Logo} alt="Logo" width={100} height={100} />

        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-4">Let's Sign you in</h2>

        {/* Form */}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-4">
              {/* Email Input */}
              <InputField
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email"
                leftIcon={Mail}
              />

              {/* Password Input */}
              <InputField
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
                leftIcon={Lock}
              />

              {/* Remember me and Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="rememberMe" className="ml-2 text-gray-700">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-blue-600 hover:underline">
                  Forgot Password?
                </a>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                SIGN IN
              </button>

              {/* Sign Up Link */}
              <p className="text-center text-gray-500 text-sm">
                Don't have an account?{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Sign up
                </a>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;