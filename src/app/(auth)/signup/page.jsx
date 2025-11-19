// components/Signup.jsx
"use client";

import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../../components/InputFeild";
import { Mail, Lock, User } from "lucide-react";
import AuthContainer from "../../../components/AuthContainer";

const Signup = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
  });

  const handleSubmit = (values) => {
    console.log("Signup submitted:", values);
    // Add your signup logic here (e.g., API call)
  };

  return (
    <AuthContainer title="Create Your Account">
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="space-y-4">
            <InputField
              label="Name"
              name="name"
              type="text"
              placeholder="Enter your name"
              leftIcon={User}
            />
            <InputField
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
              leftIcon={Mail}
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              leftIcon={Lock}
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              SIGN UP
            </button>
            <p className="text-center text-gray-500 text-sm">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                Sign in
              </a>
            </p>
          </Form>
        )}
      </Formik>
    </AuthContainer>
  );
};

export default Signup;