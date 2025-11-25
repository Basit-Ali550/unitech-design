"use client";

import React, { useState, useMemo, useEffect } from "react";
import useGet from "../../../hooks/useGet";
import UsersTable from "../../../components/UsersTable";
import ProjectsTable from "../../../components/ProjectsTable";
import CustomDropdown from "../../../components/CustomDropdown";
import { Search, Loader2 } from "lucide-react";
import TableSkeleton from "../../../components/TableSkeleton";

// Role & Status Options (for Users tab)
const ROLE_OPTIONS = [
  { label: "All Roles", value: "" },
  { label: "Admin", value: "admin" },
  { label: "User", value: "user" },
];

const STATUS_OPTIONS = [
  { label: "All Status", value: "" },
  { label: "Active", value: "active" },
  { label: "Suspended", value: "suspended" },
  { label: "Banned", value: "banned" },
  { label: "Pending Verification", value: "pending_verification" },
];

// Design Type Filter (for Projects tab)
const DESIGN_TYPE_OPTIONS = [
  { label: "All Types", value: "" },
  { label: "Interior", value: "Interior" },
  { label: "Exterior", value: "Exterior" },
];

export default function ManageUsersProjects() {
  const [activeTab, setActiveTab] = useState("users");

  // Shared pagination
  const [page, setPage] = useState(1);
  const pageSize = 20;

  // === USERS TAB STATES ===
  const [userSearch, setUserSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // === PROJECTS TAB STATES ===
  const [projectSearch, setProjectSearch] = useState("");
  const [designTypeFilter, setDesignTypeFilter] = useState("");
  const [userIdFilter, setUserIdFilter] = useState(""); // optional

  // Reset all filters & search when tab changes
  useEffect(() => {
    setPage(1);

    if (activeTab === "users") {
      // Switching TO Users → clear Projects filters
      setProjectSearch("");
      setDesignTypeFilter("");
      setUserIdFilter("");
    } else if (activeTab === "projects") {
      // Switching TO Projects → clear Users filters
      setUserSearch("");
      setRoleFilter("");
      setStatusFilter("");
    }
  }, [activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // No need to reset page here — useEffect will handle it + filter reset
  };

  // === USERS QUERY PARAMS ===
  const usersQueryParams = useMemo(() => {
    return {
      page,
      page_size: pageSize,
      ...(userSearch && { search: userSearch.trim() }),
      ...(roleFilter && { role: roleFilter }),
      ...(statusFilter && { profile_status: statusFilter }),
    };
  }, [page, userSearch, roleFilter, statusFilter]);

  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
    refetch: refetchUsers,
  } = useGet("/api/v1/users/admin/users", usersQueryParams);

  const users = useMemo(() => {
    if (!usersData?.users) return [];
    return usersData.users.map((user) => ({
      id: user.id,
      name:
        `${user.first_name || ""} ${user.last_name || ""}`.trim() ||
        "Unnamed User",
      email: user.email,
      date: new Date(user.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      role: user.role === "admin" ? "Admin" : "User",
      projects: 0,
      status: user.profile_status
        .split("_")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
      avatar_url: user.avatar_url,
      is_active: user.is_active,
    }));
  }, [usersData?.users]);

  // === PROJECTS QUERY PARAMS ===
  const projectsQueryParams = useMemo(() => {
    const params = {
      page,
      page_size: pageSize,
    };

    if (projectSearch) params.search = projectSearch.trim();
    if (designTypeFilter) params.design_type = designTypeFilter;
    if (userIdFilter) params.user_id = userIdFilter;

    return params;
  }, [page, projectSearch, designTypeFilter, userIdFilter]);

  const {
    data: projectsData,
    loading: projectsLoading,
    error: projectsError,
    refetch: refetchProjects,
  } = useGet("/api/v1/design/admin/projects", projectsQueryParams);

  const projects = useMemo(() => {
    if (!projectsData?.projects) return [];
    return projectsData.projects.map((project) => ({
      id: project.id,
      name: project.name || "Untitled Project",
      userName:
        `${project.user.first_name || ""} ${
          project.user.last_name || ""
        }`.trim() || project.user.email,
      userEmail: project.user.email,
      style: project.design_style === "No Style" ? "—" : project.design_style,
      roomType: project.room_type || "—",
      designType: project.design_type,
      created: new Date(project.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      originalImage: project.original_image_url,
    }));
  }, [projectsData?.projects]);

  const totalPages =
    activeTab === "users"
      ? usersData?.total_pages || 1
      : projectsData?.total_pages || 1;

  const totalCount =
    activeTab === "users" ? usersData?.total || 0 : projectsData?.total || 0;

  const isLoading = activeTab === "users" ? usersLoading : projectsLoading;
  const isError = activeTab === "users" ? usersError : projectsError;
  const refetch = activeTab === "users" ? refetchUsers : refetchProjects;

  return (
    <div className="min-h-screen">
      <div className="">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h1 className="text-3xl text-gray-900 font-medium">
              {activeTab === "users" ? "Manage Users" : "Manage Projects"}
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={
                  activeTab === "users"
                    ? "Search by name or email..."
                    : "Search by project or user..."
                }
                value={activeTab === "users" ? userSearch : projectSearch}
                onChange={(e) => {
                  const value = e.target.value;
                  if (activeTab === "users") {
                    setUserSearch(value);
                  } else {
                    setProjectSearch(value);
                  }
                  setPage(1);
                }}
                className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-sm w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {activeTab === "users" ? (
              <>
                <CustomDropdown
                  options={ROLE_OPTIONS}
                  value={roleFilter}
                  onChange={(val) => {
                    setRoleFilter(val);
                    setPage(1);
                  }}
                  placeholder="Role"
                />
                <CustomDropdown
                  options={STATUS_OPTIONS}
                  value={statusFilter}
                  onChange={(val) => {
                    setStatusFilter(val);
                    setPage(1);
                  }}
                  placeholder="Status"
                />
              </>
            ) : (
              <CustomDropdown
                options={DESIGN_TYPE_OPTIONS}
                value={designTypeFilter}
                onChange={(val) => {
                  setDesignTypeFilter(val);
                  setPage(1);
                }}
                placeholder="Design Type"
              />
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="my-6 ">
          <div className="flex gap-8">
            <button
              onClick={() => handleTabChange("users")}
              className={`pb-2 px-1 cursor-pointer text-sm font-medium border-b-2 transition-colors ${
                activeTab === "users"
                  ? "border-[#0461A6] text-[#0461A6]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Users
            </button>
            <button
              onClick={() => handleTabChange("projects")}
              className={`pb-2 px-1 cursor-pointer text-sm font-medium border-b-2 transition-colors ${
                activeTab === "projects"
                  ? "border-[#0461A6] text-[#0461A6]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Projects
            </button>
          </div>
        </div>

        {/* Loading */}
        {isLoading && <TableSkeleton />}

        {/* Error */}
        {isError && (
          <div className="my-10 p-8 bg-red-50 border border-red-200 rounded-xl text-center">
            <p className="text-red-700 font-medium">
              Error loading {activeTab}
            </p>
            <p className="text-red-600 text-sm mt-1">{isError}</p>
            <button
              onClick={refetch}
              className="mt-4 px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading &&
          !isError &&
          (activeTab === "users"
            ? users.length === 0
            : projects.length === 0) && (
            <div className="text-center py-20 text-gray-500">
              <p className="text-xl">No {activeTab} found</p>
              <p className="text-sm mt-2">
                Try adjusting your filters or search term
              </p>
            </div>
          )}

        {/* Users Table */}
        {activeTab === "users" &&
          !isLoading &&
          !isError &&
          users.length > 0 && <UsersTable users={users} />}

        {/* Projects Table */}
        {activeTab === "projects" &&
          !isLoading &&
          !isError &&
          projects.length > 0 && <ProjectsTable projects={projects} />}

        {/* Pagination */}
        {totalPages > 1 && !isLoading && (
          <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4">
            <p className="text-sm text-gray-600">
              Showing {(page - 1) * pageSize + 1} to{" "}
              {Math.min(page * pageSize, totalCount)} of {totalCount}{" "}
              {activeTab === "users" ? "users" : "projects"}
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
              >
                Previous
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition ${
                        page === pageNum
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                {totalPages > 5 && (
                  <>
                    <span className="px-2 text-gray-500">...</span>
                    <button
                      onClick={() => setPage(totalPages)}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition ${
                        page === totalPages
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {totalPages}
                    </button>
                  </>
                )}
              </div>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
