// "use client";

// import React, { useState } from "react";
// import { Edit2, Trash2, Search } from "lucide-react";

// const users = [
//   { id: 1, name: "John Doe", email: "john.doe@example.com", date: "Jan 12, 2023", role: "User", projects: 16, status: "Active" },
//   { id: 2, name: "John Doe", email: "john.doe@example.com", date: "Jan 12, 2023", role: "User", projects: 16, status: "Blocked" },
//   { id: 3, name: "John Doe", email: "john.doe@example.com", date: "Jan 12, 2023", role: "User", projects: 16, status: "Active" },
//   { id: 4, name: "John Doe", email: "john.doe@example.com", date: "Jan 12, 2023", role: "User", projects: 16, status: "Active" },
//   { id: 5, name: "John Doe", email: "john.doe@example.com", date: "Jan 12, 2023", role: "User", projects: 16, status: "Pending" },
//   { id: 6, name: "John Doe", email: "john.doe@example.com", date: "Jan 12, 2023", role: "User", projects: 16, status: "Active" },
//   { id: 7, name: "John Doe", email: "john.doe@example.com", date: "Jan 12, 2023", role: "User", projects: 16, status: "Active" },
//   { id: 8, name: "John Doe", email: "john.doe@example.com", date: "Jan 12, 2023", role: "User", projects: 16, status: "Active" },
//   { id: 9, name: "John Doe", email: "john.doe@example.com", date: "Jan 12, 2023", role: "User", projects: 16, status: "Active" },
//   { id: 10, name: "John Doe", email: "john.doe@example.com", date: "Jan 12, 2023", role: "User", projects: 16, status: "Active" },
// ];

// const StatusBadge = ({ status }) => {
//   const styles = {
//     Active: "bg-green-100 text-green-700",
//     Blocked: "bg-red-100 text-red-700",
//     Pending: "bg-yellow-100 text-yellow-700",
//   };

//   return (
//     <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status] || "bg-gray-100 text-gray-700"}`}>
//       {status}
//     </span>
//   );
// };

// const UsersTable = () => {
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("All Users");

//   const filteredUsers = users.filter(user =>
//     user.name.toLowerCase().includes(search.toLowerCase()) ||
//     user.email.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//       {/* Search & Filter */}
//       <div className="p-6 border-b">
//         <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
//           <div className="relative flex-1 max-w-md">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search Users"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <select
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//             className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option>All Users</option>
//             <option>Active</option>
//             <option>Blocked</option>
//             <option>Pending</option>
//           </select>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-gray-50 border-b">
//             <tr>
//               <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">User Name</th>
//               <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">Email</th>
//               <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">Date</th>
//               <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">Role</th>
//               <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">Projects</th>
//               <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">Status</th>
//               <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {filteredUsers.map((user) => (
//               <tr key={user.id} className="hover:bg-gray-50 transition-colors">
//                 <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
//                 <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
//                 <td className="px-6 py-4 text-sm text-gray-600">{user.date}</td>
//                 <td className="px-6 py-4 text-sm text-gray-600">{user.role}</td>
//                 <td className="px-6 py-4 text-sm text-gray-900 font-medium">{user.projects}</td>
//                 <td className="px-6 py-4">
//                   <StatusBadge status={user.status} />
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="flex items-center gap-2">
//                     <button className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
//                       <Edit2 className="w-4 h-4" />
//                     </button>
//                     <button className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UsersTable;
// src/components/UsersTable.jsx
"use client";

import React from "react";
import { Edit2, Trash2 } from "lucide-react";

const StatusBadge = ({ status }) => {
  const styles = {
    Active: "bg-green-100 text-green-700",
    Blocked: "bg-red-100 text-red-700",
    Pending: "bg-yellow-100 text-yellow-700",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status] || "bg-gray-100 text-gray-700"}`}>
      {status}
    </span>
  );
};

const UsersTable = ({ users }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 ">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">User Name</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">Email</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">Date</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">Role</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">Projects</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">Status</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.date}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.role}</td>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{user.projects}</td>
                <td className="px-6 py-4"><StatusBadge status={user.status} /></td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;