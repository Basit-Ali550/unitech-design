"use client";

import React from "react";
import AuthContainer from "../../../components/AuthContainer";
import InputField from "../../../components/InputFeild"
import Button from "../../../components/Button";
import { Mail } from "lucide-react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const ForgotPassword = () => {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    // Simulate API call
    setTimeout(() => {
      console.log("Reset link sent to:", values.email);
      setSubmitting(false);
      alert("Password reset link has been sent to your email!");
    }, 1000);
  };

  return (
    <AuthContainer title="Forgot Password?">
      <p className="text-center text-[#6B7280] text-sm mb-8">
        Enter the email address with your account to reset your password
      </p>

      <Formik
        initialValues={{ email: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            <InputField
              name="email"
              type="email"
              placeholder="Enter your email"
              leftIcon={Mail}
            />

            <div className="flex items-center justify-between text-sm">
              <span className="text-[#6B7280]">Don't have an Account?</span>
              <a
                href="/auth/signup"
                className="text-[#0461A6] font-medium hover:underline"
              >
                Sign up!
              </a>
            </div>

            <div className="flex justify-center mt-8">
              <Button
                label="CONTINUE"
                type="submit"
                loading={isSubmitting}
                className="w-full max-w-xs"
              />
            </div>
          </Form>
        )}
      </Formik>
    </AuthContainer>
  );
};

export default ForgotPassword;