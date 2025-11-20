"use client";

import React, { useState, useMemo } from "react";
import UsersTable from "../../../components/UsersTable";
import ProjectsTable from "../../../components/ProjectsTable";
import CustomDropdown from "../../../components/CustomDropdown";
import { Search } from "lucide-react";

// Data
const USERS_DATA = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    date: "Jan 12, 2023",
    role: "User",
    projects: 16,
    status: "Active",
  },
  {
    id: 2,
    name: "John Doe",
    email: "john.doe@example.com",
    date: "Jan 12, 2023",
    role: "User",
    projects: 16,
    status: "Blocked",
  },
  {
    id: 3,
    name: "John Doe",
    email: "john.doe@example.com",
    date: "Jan 12, 2023",
    role: "User",
    projects: 16,
    status: "Active",
  },
  {
    id: 4,
    name: "John Doe",
    email: "john.doe@example.com",
    date: "Jan 12, 2023",
    role: "User",
    projects: 16,
    status: "Pending",
  },
  {
    id: 5,
    name: "John Doe",
    email: "john.doe@example.com",
    date: "Jan 12, 2023",
    role: "User",
    projects: 16,
    status: "Active",
  },
];

const PROJECTS_DATA = [
  {
    id: 1,
    name: "Modern Living Room",
    style: "Modern",
    materials: "Oak Wood, Marble, Cotton Linen",
    created: "Jun 12, 2023",
  },
  {
    id: 2,
    name: "Modern Living Room",
    style: "Modern",
    materials: "Oak Wood, Marble, Cotton Linen",
    created: "Jun 12, 2023",
  },
  {
    id: 3,
    name: "Minimalist Office",
    style: "Minimalist",
    materials: "Steel, Glass",
    created: "May 10, 2023",
  },
  {
    id: 4,
    name: "Industrial Loft",
    style: "Industrial",
    materials: "Concrete, Metal",
    created: "Apr 5, 2023",
  },
];

export default function ManageUsersProjects() {
  const [activeTab, setActiveTab] = useState("users");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Filter Logic
  const filteredData = useMemo(() => {
    if (activeTab === "users") {
      return USERS_DATA.filter(
        (u) =>
          (u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase())) &&
          (filter === "All" || u.status === filter)
      );
    } else {
      return PROJECTS_DATA.filter(
        (p) =>
          (p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.style.toLowerCase().includes(search.toLowerCase())) &&
          (filter === "All" || p.style === filter)
      );
    }
  }, [activeTab, search, filter]);

  const dropdownOptions =
    activeTab === "users"
      ? ["All", "Active", "Blocked", "Pending"]
      : ["All", "Modern", "Minimalist", "Industrial"];

  return (
    <div className="space-y-6">
      {/* Title + Search + Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">
          Manage Users & Projects
        </h1>
        <div className="flex gap-3 items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={`Search ${
                activeTab === "users" ? "Users" : "Projects"
              }`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
        pl-10 pr-4 py-2 
        border border-gray-300 rounded-lg text-sm 
        w-64 
        focus:outline-none focus:ring-2 focus:ring-blue-500
        transition-none
      "
            />
          </div>
          <CustomDropdown
            options={dropdownOptions}
            value={filter}
            onChange={setFilter}
            placeholder="Filter"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="">
        <div className="flex gap-8">
          <button
            onClick={() => {
              setActiveTab("users");
              setSearch("");
              setFilter("All");
            }}
            className={`pb-1 text-sm cursor-pointer font-medium border-b-2 transition-colors ${
              activeTab === "users"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            Users
          </button>
          <button
            onClick={() => {
              setActiveTab("projects");
              setSearch("");
              setFilter("All");
            }}
            className={`pb-1 text-sm cursor-pointer font-medium border-b-2 transition-colors ${
              activeTab === "projects"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            Projects
          </button>
        </div>
      </div>

      {/* Table */}
      {activeTab === "users" ? (
        <UsersTable users={filteredData} />
      ) : (
        <ProjectsTable projects={filteredData} />
      )}
    </div>
  );
}
