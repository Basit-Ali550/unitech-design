// // src/app/admin/users-projects/page.jsx
// "use client";

// import React, { useState, useMemo } from "react";
// import useGet from "../../../hooks/useGet";
// import UsersTable from "../../../components/UsersTable";
// import CustomDropdown from "../../../components/CustomDropdown";
// import { Search, Loader2 } from "lucide-react";

// const ROLE_OPTIONS = [
//   { label: "All Roles", value: "" },
//   { label: "Admin", value: "admin" },
//   { label: "User", value: "user" },
// ];

// const STATUS_OPTIONS = [
//   { label: "All Status", value: "" },
//   { label: "Active", value: "active" },
//   { label: "Suspended", value: "suspended" },
//   { label: "Banned", value: "banned" },
//   { label: "Pending Verification", value: "pending_verification" },
// ];

// export default function ManageUsersProjects() {
//   const [activeTab, setActiveTab] = useState("users");

//   // Filters
//   const [search, setSearch] = useState("");
//   const [roleFilter, setRoleFilter] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [page, setPage] = useState(1);
//   const pageSize = 20;

//   // Build query params
//   const queryParams = useMemo(() => {
//     const params = {
//       page: page,
//       page_size: pageSize,
//       ...(search && { search: search.trim() }),
//       ...(roleFilter && { role: roleFilter }),
//       ...(statusFilter && { profile_status: statusFilter }),
//     };
//     return params;
//   }, [page, search, roleFilter, statusFilter]);

//   // Fetch users using useGet hook
//   const { data, loading, error, refetch } = useGet(
//     "/api/v1/users/admin/users",
//     queryParams
//   );

//   // Transform API data to match table
//   const users = useMemo(() => {
//     if (!data?.users) return [];
//     return data.users.map((user) => ({
//       id: user.id,
//       name:
//         `${user.first_name || ""} ${user.last_name || ""}`.trim() ||
//         "Unnamed User",
//       email: user.email,
//       date: new Date(user.created_at).toLocaleDateString("en-US", {
//         month: "short",
//         day: "numeric",
//         year: "numeric",
//       }),
//       role: user.role === "admin" ? "Admin" : "User",
//       projects: 0, // backend se nahi aa raha, static rakha
//       status: user.profile_status
//         .split("_")
//         .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
//         .join(" "),
//       avatar_url: user.avatar_url,
//       is_active: user.is_active,
//     }));
//   }, [data?.users]);

//   const totalPages = data?.total_pages || 1;

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto space-y-8">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">Manage Users</h1>
//             <p className="text-gray-600 mt-1">
//               View and manage all registered users
//             </p>
//           </div>

//           <div className="flex flex-col sm:flex-row gap-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search by name or email..."
//                 value={search}
//                 onChange={(e) => {
//                   setSearch(e.target.value);
//                   setPage(1); // reset to first page on search
//                 }}
//                 className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-sm w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//               />
//             </div>

//             <CustomDropdown
//               options={ROLE_OPTIONS}
//               value={roleFilter}
//               onChange={(val) => {
//                 setRoleFilter(val);
//                 setPage(1);
//               }}
//               placeholder="Role"
//             />

//             <CustomDropdown
//               options={STATUS_OPTIONS}
//               value={statusFilter}
//               onChange={(val) => {
//                 setStatusFilter(val);
//                 setPage(1);
//               }}
//               placeholder="Status"
//             />
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="border-b border-gray-200">
//           <div className="flex gap-8">
//             <button
//               onClick={() => setActiveTab("users")}
//               className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
//                 activeTab === "users"
//                   ? "border-blue-600 text-blue-600"
//                   : "border-transparent text-gray-500 hover:text-gray-700"
//               }`}
//             >
//               Users ({data?.total || 0})
//             </button>
//             {/* Projects tab later */}
//           </div>
//         </div>

//         {/* Loading State */}
//         {loading && (
//           <div className="flex items-center justify-center py-20">
//             <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
//             <span className="ml-3 text-lg text-gray-600">Loading users...</span>
//           </div>
//         )}

//         {/* Error State */}
//         {error && (
//           <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
//             <p className="text-red-700 font-medium">Error loading users</p>
//             <p className="text-red-600 text-sm mt-1">{error}</p>
//             <button
//               onClick={refetch}
//               className="mt-4 px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
//             >
//               Retry
//             </button>
//           </div>
//         )}

//         {/* Users Table */}
//         {!loading && !error && users.length === 0 && (
//           <div className="text-center py-20 text-gray-500">
//             <p className="text-xl">No users found</p>
//             <p className="text-sm mt-2">
//               Try adjusting your filters or search term
//             </p>
//           </div>
//         )}

//         {!loading && !error && users.length > 0 && (
//           <>
//             <UsersTable users={users} />

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="flex items-center justify-between mt-8">
//                 <p className="text-sm text-gray-600">
//                   Showing {(page - 1) * pageSize + 1} to{" "}
//                   {Math.min(page * pageSize, data?.total)} of {data?.total}{" "}
//                   users
//                 </p>

//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => setPage((p) => Math.max(1, p - 1))}
//                     disabled={page === 1}
//                     className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
//                   >
//                     Previous
//                   </button>
//                   <div className="flex items-center gap-2">
//                     {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                       const pageNum = i + 1;
//                       return (
//                         <button
//                           key={pageNum}
//                           onClick={() => setPage(pageNum)}
//                           className={`w-10 h-10 rounded-lg text-sm font-medium transition ${
//                             page === pageNum
//                               ? "bg-blue-600 text-white"
//                               : "hover:bg-gray-100 text-gray-700"
//                           }`}
//                         >
//                           {pageNum}
//                         </button>
//                       );
//                     })}
//                     {totalPages > 5 && (
//                       <>
//                         <span className="px-2 text-gray-500">...</span>
//                         <button
//                           onClick={() => setPage(totalPages)}
//                           className={`w-10 h-10 rounded-lg text-sm font-medium transition ${
//                             page === totalPages
//                               ? "bg-blue-600 text-white"
//                               : "hover:bg-gray-100 text-gray-700"
//                           }`}
//                         >
//                           {totalPages}
//                         </button>
//                       </>
//                     )}
//                   </div>
//                   <button
//                     onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//                     disabled={page === totalPages}
//                     className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
//                   >
//                     Next
//                   </button>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";

import React, { useState, useMemo } from "react";
import useGet from "../../../hooks/useGet";
import UsersTable from "../../../components/UsersTable";
import ProjectsTable from "../../../components/ProjectsTable"; // Import new table
import CustomDropdown from "../../../components/CustomDropdown";
import { Search, Loader2 } from "lucide-react";

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
  const [projectSearch, setProjectSearch] = useState(""); // by user name/email or project name
  const [designTypeFilter, setDesignTypeFilter] = useState("");
  const [userIdFilter, setUserIdFilter] = useState(""); // optional: filter by specific user

  // Reset page when switching tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPage(1);
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
      projects: 0, // will be replaced if needed later
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

    // Optional: search by project name OR user email/name
    if (projectSearch) {
      params.search = projectSearch.trim();
    }
    if (designTypeFilter) {
      params.design_type = designTypeFilter;
    }
    if (userIdFilter) {
      params.user_id = userIdFilter;
    }

    return params;
  }, [page, projectSearch, designTypeFilter, userIdFilter]);

  const {
    data: projectsData,
    loading: projectsLoading,
    error: projectsError,
    refetch: refetchProjects,
  } = useGet("/api/v1/design/admin/projects", projectsQueryParams);

  // Transform projects for table
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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {activeTab === "users" ? "Manage Users" : "Manage Projects"}
            </h1>
            <p className="text-gray-600 mt-1">
              {activeTab === "users"
                ? "View and manage all registered users"
                : "View and manage all generated projects"}
            </p>
          </div>

          {/* Filters */}
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
                  if (activeTab === "users") {
                    setUserSearch(e.target.value);
                  } else {
                    setProjectSearch(e.target.value);
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
        <div className="border-b border-gray-200">
          <div className="flex gap-8">
            <button
              onClick={() => handleTabChange("users")}
              className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "users"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Users ({usersData?.total || 0})
            </button>
            <button
              onClick={() => handleTabChange("projects")}
              className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "projects"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Projects ({projectsData?.total || 0})
            </button>
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            <span className="ml-3 text-lg text-gray-600">
              Loading {activeTab}...
            </span>
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
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
          users.length > 0 && (
            <>
              <UsersTable users={users} />
            </>
          )}

        {/* Projects Table */}
        {activeTab === "projects" &&
          !isLoading &&
          !isError &&
          projects.length > 0 && (
            <>
              <ProjectsTable projects={projects} />
            </>
          )}

        {/* Pagination */}
        {totalPages > 1 && !isLoading && (
          <div className="flex items-center justify-between mt-8">
            <p className="text-sm text-gray-600">
              Showing {(page - 1) * pageSize + 1} to{" "}
              {Math.min(page * pageSize, totalCount)} of {totalCount}{" "}
              {activeTab === "users" ? "users" : "projects"}
            </p>

            <div className="flex gap-2">
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
