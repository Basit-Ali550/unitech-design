"use client";

import React from "react";
import AuthContainer from "../../../components/AuthContainer";
import InputField from "../../../components/InputFeild";
import Button from "../../../components/Button";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const CreateNewPassword = () => {
  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Must contain uppercase, lowercase, number & special character"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      console.log("New Password Set:", values.password);
      alert("Password changed successfully!");
      setSubmitting(false);
      // Redirect to login
    }, 1000);
  };

  return (
    <AuthContainer title="Create new password">
      <p className="text-center text-[#6B7280] text-sm mt-2 mb-8">
        This password must be different from your previous password.
      </p>

      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            {/* Password Field */}
            <InputField
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your new password"
              leftIcon={Lock}
            />

            {/* Confirm Password Field */}
            <InputField
              label="Confirm password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your new password"
              leftIcon={Lock}
            />

            {/* Submit Button */}
            <div className="flex justify-center mt-10">
              <Button
                label="SUBMIT"
                type="submit"
                loading={isSubmitting}
                variant="primary"
                className="w-full max-w-xs bg-[#0461A6] hover:bg-[#03548F]"
              />
            </div>
          </Form>
        )}
      </Formik>
    </AuthContainer>
  );
};

export default CreateNewPassword;