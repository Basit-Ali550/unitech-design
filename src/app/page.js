"use client" 
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../components/InputFeild";
import { Mail, Lock } from "lucide-react"; // Icons for left/right icons

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
  time: Yup.string().required("Required"),
});

const MyForm = () => {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        time: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("Form submitted:", values);
      }}
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

          {/* Time Input */}
          <InputField
            label="Select Time"
            name="time"
            type="time"
            placeholder="Select a time"
          />

          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;