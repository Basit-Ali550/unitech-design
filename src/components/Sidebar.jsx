"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, Palette, Users, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Logo from "../../public/images/Logo.svg";

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: Package, label: "Material List", href: "/material-list" },
  { icon: Palette, label: "Style & Template", href: "/style-template" },
  { icon: Users, label: "Manage Users & Projects", href: "/manage" },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-white h-screen shadow-sm flex flex-col transition-all duration-300`}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between p-4 border-b border-gray-300">
        <div className="flex items-center gap-2">
          <Image
            src={Logo}
            alt="Logo"
            className={`transition-all duration-300 ${collapsed ? "w-8" : "h-10"}`}
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
    </div>
  );
};

export default Sidebar;
