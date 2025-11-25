"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Package,
  Palette,
  Users,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import Logo from "../../public/images/Logo.svg";
import { useAuth } from "../context/AuthContext";

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: Package, label: "Material List", href: "/material-list" },
  { icon: Palette, label: "Style & Template", href: "/style-template" },
  { icon: Users, label: "Manage Users & Projects", href: "/manage" },
];

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    router.push("/login");
  };
  return (
    <div
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-white h-screen shadow-sm border-r border-gray-300 flex  flex-col transition-all duration-300`}
    >
      <div className="flex items-center py-5.5 px-4 justify-between border-b border-gray-300">
        <div className="flex items-center pl-6 gap-2">
          <Image
            src={Logo}
            alt="Logo"
            width={80}
            height={80}
            className="transition-all duration-300"
          />
        </div>

        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded cursor-pointer bg-gray-100 hover:bg-blue-100 transition"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-700" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          )}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                isActive
                  ? "bg-[#F3F4F6] text-[#0461A6] font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button Section */}
      <div className="px-4 pb-4">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all group ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Logout</span>}

          {/* Tooltip for collapsed state */}
          {collapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
              Logout
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
