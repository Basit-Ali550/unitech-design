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
  Menu,
  X,
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  // Desktop sidebar (md and up) left unchanged except making it md:flex and hidden on small screens
  const DesktopSidebar = (
    <div
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-white h-screen shadow-sm border-r border-gray-300 flex flex-col transition-all duration-300 hidden md:flex`}
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
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
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

  // Mobile panel content uses the same structure (but full width panel)
  const MobilePanel = (
    <div
      className="w-64 max-w-full h-full bg-white shadow-xl border-r border-gray-200 flex flex-col"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Image src={Logo} alt="Logo" width={60} height={60} />
        </div>
        <button
          onClick={() => setMobileOpen(false)}
          className="p-1 rounded bg-gray-100 hover:bg-gray-200"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 p-4 overflow-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                isActive
                  ? "bg-[#F3F4F6] text-[#0461A6] font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-4 pb-6">
        <button
          onClick={() => {
            setMobileOpen(false);
            handleLogout();
          }}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile top-left menu button (visible on small screens only) */}
      <div className="md:hidden fixed top-3 left-3 z-40">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded bg-white shadow-sm border border-gray-200 hover:bg-gray-50 focus:outline-none"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Desktop sidebar */}
      {DesktopSidebar}

      {/* Mobile slide-over panel */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <button
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/40"
            aria-hidden="true"
          />

          {/* Panel */}
          <div className="relative z-50 transform transition-transform duration-200 ease-in-out">
            {MobilePanel}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
