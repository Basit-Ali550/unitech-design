"use client";
import React, { useState } from "react";
import StyleCard from "../../../components/StyleCard";
import TemplateCard from "../../../components/TemplateCard";
import { Plus } from "lucide-react";
import Template from "../../../../public/images/template.jpg";
import Image from "next/image";

const STYLES = Array(15)
  .fill(null)
  .map((_, i) => ({
    id: i + 1,
    name: "Modern Minimalist",
    description:
      "Clean lines, neutral colors, and simple geometric shapes for a contemporary look",
    parameters: 12,
    image: Template,
  }));
const TEMPLATES = Array(10)
  .fill(null)
  .map((_, i) => ({
    id: i + 1,
    name: "Modern Minimalist",
    description:
      "Clean lines, neutral colors, and simple geometric shapes for a contemporary look",
    parameters: 12,
    image: Template,
  }));
export default function StyleTemplateManager() {
  const [activeTab, setActiveTab] = useState("styles");
  return (
    <div className="space-y-4 sm:p-6 p-4 rounded-2xl shadow-sm bg-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">
          Style & Template Manager
        </h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
            <Plus className="w-4 h-4" />
            Add Style
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            Add Template
          </button>
        </div>
      </div>
      <div className="">
        <div className="flex gap-8">
          <button
            onClick={() => setActiveTab("styles")}
            className={`pb-2 cursor-pointer text-sm font-medium border-b-2 transition-colors ${
              activeTab === "styles"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            Styles
          </button>
          <button
            onClick={() => setActiveTab("templates")}
            className={`pb-2 cursor-pointer text-sm font-medium border-b-2 transition-colors ${
              activeTab === "templates"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            Templates
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {activeTab === "styles"
          ? STYLES.map((style) => <StyleCard key={style.id} style={style} />)
          : TEMPLATES.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
      </div>
    </div>
  );
}
