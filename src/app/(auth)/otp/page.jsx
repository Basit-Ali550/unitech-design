"use client";

import React, { useState, useRef, useEffect } from "react";
import AuthContainer from "../../../components/AuthContainer";
import Button from "../../../components/Button";
import { Formik, Form } from "formik";
import * as Yup from "yup";

// Custom OTP Input Component (6 digits, auto-focus, paste support)
const OTPInput = ({ length = 6, onComplete }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }

    // Trigger complete
    if (newOtp.every((digit) => digit !== "")) {
      onComplete(newOtp.join(""));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputsRef.current[index - 1].focus();
      }
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    const newOtp = paste.split("").concat(new Array(length - paste.length).fill(""));
    setOtp(newOtp);
    onComplete(newOtp.join(""));
    // Focus last filled input
    const lastIndex = Math.min(paste.length - 1, length - 1);
    inputsRef.current[lastIndex].focus();
  };

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  return (
    <div className="flex justify-center gap-2 md:gap-3">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={index === 0 ? handlePaste : undefined}
          className={`
            w-12 h-12 md:w-14 md:h-14
            text-center text-lg md:text-xl font-medium
            border border-[#E5E7EB] rounded-xl
            focus:outline-none focus:ring-2 focus:ring-[#597BE8] focus:ring-opacity-20
            focus:border-[#597BE8] transition-all
            bg-white shadow-sm
          `}
        />
      ))}
    </div>
  );
};

// Timer Component
const Timer = ({ initialSeconds = 180, onResend }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive || seconds === 0) return;

    const interval = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          setIsActive(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const formatTime = () => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleResend = () => {
    setSeconds(initialSeconds);
    setIsActive(true);
    onResend();
  };

  return (
    <div className="flex items-center justify-between mt-6 px-1">
      <div className="flex items-center gap-2 text-sm text-[#6B7280]">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
            clipRule="evenodd"
          />
        </svg>
        <span>{isActive ? formatTime() : "00:00"} min</span>
      </div>

      <button
        type="button"
        onClick={handleResend}
        disabled={isActive}
        className={`
          text-sm font-medium transition-colors
          ${isActive ? "text-[#9CA3AF] cursor-not-allowed" : "text-[#0461A6] hover:text-[#03548F]"}
        `}
      >
        Resend
      </button>
    </div>
  );
};

const VerifyOTP = () => {
  const maskedEmail = "shetXXXXXXXXXX@gmail.com"; // Replace with dynamic email

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      console.log("OTP Verified:", values.otp);
      alert("OTP Verified Successfully!");
      setSubmitting(false);
      // Redirect to reset password
    }, 1000);
  };

  const handleResend = () => {
    alert("New OTP sent!");
  };

  return (
    <AuthContainer title="Verify OTP for email">
      <p className="text-center text-[#6B7280] text-sm mt-2">
        Enter the OTP sent to your email address:
      </p>
      <p className="text-center text-[#3C4566] font-medium text-sm mt-1">
        {maskedEmail}
      </p>

      <Formik
        initialValues={{ otp: "" }}
        validationSchema={Yup.object({
          otp: Yup.string().length(6, "OTP must be 6 digits").required("Required"),
        })}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="mt-8">
            <OTPInput
              onComplete={(otp) => setFieldValue("otp", otp)}
            />

            <Timer onResend={handleResend} />

            <div className="flex justify-center mt-10">
              <Button
                label="NEXT"
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

export default VerifyOTP;