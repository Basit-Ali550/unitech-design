"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../../components/InputFeild";
import TextAreaField from "../../../components/TextAreaField";
import apiClient from "../../../hooks/apiClient";

const MaterialCreatePage = () => {
  const router = useRouter();

  const [materialImagePreview, setMaterialImagePreview] = useState(null);
  const [materialImageUploading, setMaterialImageUploading] = useState(false);

  const [supplierLogoPreview, setSupplierLogoPreview] = useState(null);
  const [supplierLogoUploading, setSupplierLogoUploading] = useState(false);

  const [serverError, setServerError] = useState("");

  const validationSchema = Yup.object({
    name: Yup.string().required("Material name is required"),
    sku: Yup.string().required("SKU is required"),
    price_per_sqft: Yup.number().positive().required("Price is required"),
    rating: Yup.number().min(0).max(5),
    image_url: Yup.string().url().required("Material image is required"),
    thumbnail_url: Yup.string().url().required("Thumbnail is required"),
    supplier_name: Yup.string().required("Supplier name is required"),
    supplier_logo_url: Yup.string().url(),
    finish: Yup.string().required("Finish is required"),
    thickness: Yup.string().required("Thickness is required"),
    origin: Yup.string().required("Origin is required"),
    maintenance: Yup.string().required("Maintenance info is required"),
    description: Yup.string().required("Description is required"),
    material_type: Yup.string().required("Material type is required"),
  });

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

  // Single Image Upload for Material (used for both main & thumbnail)
  const uploadMaterialImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("folder", "materials");

    const data = await apiClient("/api/v1/admin/upload-image", {
      method: "POST",
      body: formData,
    });

    if (!data.success || !data.image_url) {
      throw new Error(data.message || "Upload failed");
    }
    return data.image_url;
  };

  const handleMaterialImageUpload = async (e, setFieldValue) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setMaterialImagePreview(previewUrl);
    setMaterialImageUploading(true);
    setFieldValue("image_url", "uploading...");
    setFieldValue("thumbnail_url", "uploading...");

    try {
      const uploadedUrl = await uploadMaterialImage(file);
      // Same URL dono jagah set kar do
      setFieldValue("image_url", uploadedUrl);
      setFieldValue("thumbnail_url", uploadedUrl);
    } catch (err) {
      alert("Material image upload failed: " + err.message);
      setFieldValue("image_url", "");
      setFieldValue("thumbnail_url", "");
      setMaterialImagePreview(null);
    } finally {
      setMaterialImageUploading(false);
    }
  };

  const uploadSupplierLogo = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("folder", "suppliers");

    const data = await apiClient("/api/v1/admin/upload-image", {
      method: "POST",
      body: formData,
    });

    if (!data.success || !data.image_url)
      throw new Error(data.message || "Upload failed");
    return data.image_url;
  };

  const handleSupplierLogoUpload = async (e, setFieldValue) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setSupplierLogoPreview(previewUrl);
    setSupplierLogoUploading(true);
    setFieldValue("supplier_logo_url", "uploading...");

    try {
      const uploadedUrl = await uploadSupplierLogo(file);
      setFieldValue("supplier_logo_url", uploadedUrl);
    } catch (err) {
      alert("Logo upload failed: " + err.message);
      setFieldValue("supplier_logo_url", "");
      setSupplierLogoPreview(null);
    } finally {
      setSupplierLogoUploading(false);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setServerError("");
    try {
      const payload = {
        ...values,
        price_per_sqft: parseFloat(values.price_per_sqft) || 0,
        rating: values.rating ? parseFloat(values.rating) : 4.8,
        common_use_ids: ["da1e8e00-81c7-45b0-96c3-50a6ccfc3d18"],
      };

      await apiClient("/api/v1/admin/materials", {
        method: "POST",
        body: payload,
      });

      router.push("/admin/materials");
    } catch (err) {
      setServerError(err.message || "Failed to create material");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100">
            <h1 className="text-2xl font-bold text-gray-900">
              Create New Material
            </h1>
            <p className="text-gray-600 mt-1">
              Add a new material to your inventory
            </p>
          </div>

          <div className="p-8">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue, values, isSubmitting }) => (
                <Form className="space-y-10">
                  {/* === SINGLE FULL WIDTH MATERIAL IMAGE UPLOAD === */}
                  <div className="border border-dashed border-blue-500 bg-blue-50/50 rounded-2xl p-10 text-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Material Image
                    </h3>
                    <p className="text-gray-600 mb-8">
                      Upload one high-quality image (used as main image &
                      thumbnail)
                    </p>

                    <div className="max-w-2xl mx-auto">
                      <div className="border-4 border-dashed border-blue-300 rounded-2xl bg-white hover:border-blue-400 transition-all duration-300 cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="material-image"
                          onChange={(e) =>
                            handleMaterialImageUpload(e, setFieldValue)
                          }
                        />
                        <label htmlFor="material-image" className="block p-12">
                          {materialImagePreview ? (
                            <div className="space-y-4">
                              <img
                                src={materialImagePreview}
                                alt="Material Preview"
                                className="mx-auto max-h-96 rounded-xl shadow-lg object-cover"
                              />
                              <div>
                                {materialImageUploading ? (
                                  <p className="text-blue-600 font-medium animate-pulse">
                                    Uploading image...
                                  </p>
                                ) : values.image_url?.startsWith("http") ? (
                                  <p className="text-green-600 font-medium">
                                    Image uploaded successfully
                                  </p>
                                ) : null}
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <div className="mx-auto w-20 h-20 text-blue-500">
                                <svg
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                  />
                                </svg>
                              </div>
                              <p className="text-lg font-medium text-gray-700">
                                Click to upload material image
                              </p>
                              <p className="text-sm text-gray-500">
                                PNG, JPG, WebP • Up to 10MB • High resolution
                                recommended
                              </p>
                            </div>
                          )}
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Supplier Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                        Supplier Information
                      </h3>
                      <InputField
                        label="Supplier Name *"
                        name="supplier_name"
                        placeholder="e.g., Stone World Inc."
                      />

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Supplier Logo (Optional)
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-gray-400 bg-white">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            id="supplier-logo"
                            onChange={(e) =>
                              handleSupplierLogoUpload(e, setFieldValue)
                            }
                          />
                          <label
                            htmlFor="supplier-logo"
                            className="cursor-pointer block text-center"
                          >
                            {supplierLogoPreview ? (
                              <div className="space-y-3">
                                <img
                                  src={supplierLogoPreview}
                                  alt="Logo"
                                  className="mx-auto h-24 w-24 object-contain rounded-full border-2"
                                />
                                {supplierLogoUploading ? (
                                  <p className="text-blue-600 text-sm">
                                    Uploading...
                                  </p>
                                ) : values.supplier_logo_url?.startsWith(
                                    "http"
                                  ) ? (
                                  <p className="text-green-600 text-sm">
                                    Logo uploaded
                                  </p>
                                ) : null}
                              </div>
                            ) : (
                              <div className="py-4">
                                <div className="mx-auto w-12 h-12 text-gray-400">
                                  <svg
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h-4m-6 0H5"
                                    />
                                  </svg>
                                </div>
                                <p className="text-sm text-gray-600 mt-2">
                                  Click to upload logo
                                </p>
                              </div>
                            )}
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                        Additional Details
                      </h3>
                      <InputField
                        label="Maintenance *"
                        name="maintenance"
                        placeholder="e.g., Seal every 12 months"
                      />
                    </div>
                  </div>

                  {/* Rest of the form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                        Basic Information
                      </h3>
                      <InputField
                        label="Material Name *"
                        name="name"
                        placeholder="e.g., Calacatta Gold Marble"
                      />
                      <InputField
                        label="Category *"
                        name="material_type"
                        placeholder="e.g., Marble, Quartz, Granite"
                      />
                      <InputField
                        label="Price ($ per sqft) *"
                        name="price_per_sqft"
                        type="number"
                        step="0.01"
                        placeholder="89.99"
                      />
                      <InputField
                        label="Rating"
                        name="rating"
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
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
                        placeholder="e.g., MAR-CAL-001"
                      />
                      <InputField
                        label="Finish *"
                        name="finish"
                        placeholder="Polished, Honed, Leather"
                      />
                      <InputField
                        label="Thickness *"
                        name="thickness"
                        placeholder="20mm, 30mm"
                      />
                      <InputField
                        label="Origin *"
                        name="origin"
                        placeholder="Italy, Brazil, India"
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                      Description
                    </h3>
                    <TextAreaField
                      label="Description *"
                      name="description"
                      placeholder="Write a detailed description of this beautiful material..."
                      rows={6}
                    />
                  </div>

                  {serverError && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-800 text-sm">
                      {serverError}
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-8 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => router.back()}
                      className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={
                        isSubmitting ||
                        materialImageUploading ||
                        supplierLogoUploading
                      }
                      className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 font-medium transition shadow-md"
                    >
                      {isSubmitting ? "Creating Material..." : "Save Material"}
                    </button>
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
