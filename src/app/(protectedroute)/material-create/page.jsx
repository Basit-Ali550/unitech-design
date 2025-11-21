"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../../components/InputFeild";
import usePost from "../../../hooks/usePost";
import TextAreaField from "../../../components/TextAreaField";

const MaterialCreatePage = () => {
  const router = useRouter();
  const { postData, loading, error } = usePost("/api/v1/admin/materials");
  const [imagePreview, setImagePreview] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  // Validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Material name is required"),
    sku: Yup.string().required("SKU is required"),
    price_per_sqft: Yup.number()
      .positive("Price must be positive")
      .required("Price is required"),
    rating: Yup.number()
      .min(0, "Rating must be at least 0")
      .max(5, "Rating cannot exceed 5"),
    image_url: Yup.string().required("Main image is required"),
    thumbnail_url: Yup.string().required("Thumbnail image is required"),
    supplier_name: Yup.string().required("Supplier name is required"),
    supplier_logo_url: Yup.string().url("Must be a valid URL"),
    finish: Yup.string().required("Finish is required"),
    thickness: Yup.string().required("Thickness is required"),
    origin: Yup.string().required("Origin is required"),
    maintenance: Yup.string().required("Maintenance info is required"),
    description: Yup.string().required("Description is required"),
    material_type: Yup.string().required("Material type is required"),
  });

  // Initial values
  const initialValues = {
    name: "",
    sku: "",
    price_per_sqft: "",
    rating: "",
    image_url: "",
    thumbnail_url: "",
    supplier_name: "",
    supplier_logo_url: "",
    finish: "",
    thickness: "",
    origin: "",
    maintenance: "",
    description: "",
    material_type: "",
  };

  // Function to convert file to base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      console.log("Form submitted with values:", values);

      // Convert numeric fields
      const payload = {
        ...values,
        price_per_sqft: parseFloat(values.price_per_sqft),
        rating: values.rating ? parseFloat(values.rating) : 4.8,
        common_use_ids: ["da1e8e00-81c7-45b0-96c3-50a6ccfc3d18"],
      };

      console.log("Sending payload:", payload);

      const result = await postData(payload);
      console.log("API Response:", result);

      // Redirect to materials list on success
      if (result) {
        router.push("/admin/materials");
      }
    } catch (err) {
      console.error("Error creating material:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageUpload = async (
    event,
    setFieldValue,
    fieldName,
    setPreview
  ) => {
    const file = event.target.files[0];
    if (file) {
      // Create a local URL for preview
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      try {
        // Convert file to base64 for actual upload
        const base64String = await fileToBase64(file);

        // Set the base64 string as the field value (without blob: prefix)
        setFieldValue(fieldName, base64String);

        console.log(`${fieldName} uploaded successfully`);
      } catch (error) {
        console.error("Error converting file to base64:", error);
        // Fallback: use the blob URL if base64 conversion fails
        setFieldValue(fieldName, previewUrl);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className=" mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="px-8 py-6 border-b border-gray-100">
            <h1 className="text-2xl font-bold text-gray-900">
              Create New Material
            </h1>
            <p className="text-gray-600 mt-1">
              Add a new material to your inventory
            </p>
          </div>

          {/* Form */}
          <div className="p-8">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ setFieldValue, values, isSubmitting, errors, touched }) => (
                <Form className="space-y-8">
                  {/* Texture Upload Section */}
                  <div className="border border-dashed border-blue-400 bg-blue-50 rounded-2xl p-8 text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Texture Upload
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Click to upload texture or drag and drop
                      <br />
                      PNG, JPG, GIF up to 10MB
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Main Image Upload */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Main Image *
                        </label>
                        <div className="border-2 border-dashed bg-white border-gray-300 rounded-xl p-4 hover:border-gray-400 transition-colors">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            id="image-upload"
                            onChange={(e) =>
                              handleImageUpload(
                                e,
                                setFieldValue,
                                "image_url",
                                setImagePreview
                              )
                            }
                          />
                          <label
                            htmlFor="image-upload"
                            className="cursor-pointer block"
                          >
                            {imagePreview ? (
                              <div>
                                <img
                                  src={imagePreview}
                                  alt="Preview"
                                  className="mx-auto h-32 w-full object-cover rounded-lg"
                                />
                                <p className="text-xs text-green-600 mt-2">
                                  ✓ Image uploaded successfully
                                </p>
                              </div>
                            ) : (
                              <div className="text-center py-8">
                                <div className="mx-auto h-12 w-12 text-gray-400">
                                  <svg
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                  </svg>
                                </div>
                                <span className="mt-2 block text-sm text-gray-600">
                                  Upload main image
                                </span>
                              </div>
                            )}
                          </label>
                        </div>
                        {errors.image_url && touched.image_url && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.image_url}
                          </div>
                        )}
                      </div>

                      {/* Thumbnail Upload */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Thumbnail Image *
                        </label>
                        <div className="border-2 border-dashed bg-white border-gray-300 rounded-xl hover:border-gray-400 transition-colors">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            id="thumbnail-upload"
                            onChange={(e) =>
                              handleImageUpload(
                                e,
                                setFieldValue,
                                "thumbnail_url",
                                setThumbnailPreview
                              )
                            }
                          />
                          <label
                            htmlFor="thumbnail-upload"
                            className="cursor-pointer block"
                          >
                            {thumbnailPreview ? (
                              <div>
                                <img
                                  src={thumbnailPreview}
                                  alt="Thumbnail Preview"
                                  className="mx-auto h-32 w-full object-cover rounded-lg"
                                />
                                <p className="text-xs text-green-600 mt-2">
                                  ✓ Thumbnail uploaded successfully
                                </p>
                              </div>
                            ) : (
                              <div className="text-center py-8">
                                <div className="mx-auto h-12 w-12 text-gray-400">
                                  <svg
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                  </svg>
                                </div>
                                <span className="mt-2 block text-sm text-gray-600">
                                  Upload thumbnail
                                </span>
                              </div>
                            )}
                          </label>
                        </div>
                        {errors.thumbnail_url && touched.thumbnail_url && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.thumbnail_url}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Rest of your form remains the same */}
                  {/* Basic Information Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                        Basic Information
                      </h3>

                      <InputField
                        label="Material Name *"
                        name="name"
                        placeholder="Enter material name"
                      />

                      <InputField
                        label="Category *"
                        name="material_type"
                        placeholder="e.g., Natural Stone, Quartz"
                      />

                      <InputField
                        label="Price ($ per sqft) *"
                        name="price_per_sqft"
                        type="number"
                        placeholder="0.00"
                      />

                      <InputField
                        label="Rating"
                        name="rating"
                        type="number"
                        step="0.1"
                        placeholder="4.8"
                      />
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                        Inventory & Identification
                      </h3>

                      <InputField
                        label="SKU *"
                        name="sku"
                        placeholder="Enter SKU"
                      />

                      <InputField
                        label="Finish"
                        name="finish"
                        placeholder="e.g., Polished, Honed"
                      />

                      <InputField
                        label="Thickness"
                        name="thickness"
                        placeholder="e.g., 30mm, 20mm"
                      />

                      <InputField
                        label="Origin"
                        name="origin"
                        placeholder="Country of origin"
                      />
                    </div>
                  </div>

                  {/* Supplier Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                        Supplier Information
                      </h3>

                      <InputField
                        label="Supplier Name *"
                        name="supplier_name"
                        placeholder="Enter supplier name"
                      />

                      <InputField
                        label="Supplier Logo URL"
                        name="supplier_logo_url"
                        placeholder="https://example.com/logo.jpg"
                      />
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                        Additional Details
                      </h3>

                      <InputField
                        label="Maintenance"
                        name="maintenance"
                        placeholder="Maintenance requirements"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                      Description
                    </h3>

                    <TextAreaField
                      label="Description *"
                      name="description"
                      placeholder="Detailed description of the material"
                      className="col-span-full"
                    />
                  </div>

                  {/* Error Display */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                      <div className="flex items-center">
                        <svg
                          className="h-5 w-5 text-red-400 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-red-800 text-sm">{error}</span>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="remember"
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor="remember"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Remember me
                      </label>
                    </div>

                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        disabled={loading || isSubmitting}
                        className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                      >
                        {loading || isSubmitting
                          ? "Creating..."
                          : "Save Material"}
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialCreatePage;
