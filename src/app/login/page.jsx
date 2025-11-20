// app/login/page.jsx
"use client";

import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../components/InputFeild";
import { Mail, Lock } from "lucide-react";
import Logo from "../../../public/images/Logo.svg";
import Image from "next/image";
import { useAuth } from "../../context/AuthContext";
import apiClient from "../../hooks/apiClient";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const { user, login } = useAuth();
  const router = useRouter();

  // Agar user already logged in hai to dashboard redirect karo
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await apiClient("/api/v1/auth/login", {
        method: "POST",
        body: {
          email: values.email,
          password: values.password,
          remember_me: values.rememberMe || false,
        },
      });

      // Auth context ke through login karo
      login(response.user, response.tokens);
    } catch (err) {
      setFieldError("email", " ");
      setFieldError("password", err.message || "Invalid credentials");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Image src={Logo} alt="Logo" width={100} height={100} />
        </div>

        <h2 className="text-2xl font-bold text-center mb-4">
          Let's Sign you in
        </h2>

        <Formik
          initialValues={{ email: "", password: "", rememberMe: false }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className="space-y-4">
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

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={values.rememberMe}
                    onChange={(e) =>
                      setFieldValue("rememberMe", e.target.checked)
                    }
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-70"
              >
                {isSubmitting ? "Signing in..." : "SIGN IN"}
              </button>

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
