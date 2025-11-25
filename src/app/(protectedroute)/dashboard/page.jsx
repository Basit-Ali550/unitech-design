"use client";
import AnalyticsCard from "../../../components/AnalyticsCard";
import LineChart from "../../../components/LineChart";
import BarChart from "../../../components/BarChart";
import { Users, FolderOpen, Palette, Clock } from "lucide-react";
import useGet from "../../../hooks/useGet"; // your custom hook
import { useState, useEffect } from "react";

export default function Dashboard() {
  // Fetch Users
  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
  } = useGet("/api/v1/users/admin/users", { page_size: 1 }); // only need count

  // Fetch Projects (Designs)
  const {
    data: projectsData,
    loading: projectsLoading,
    error: projectsError,
  } = useGet("/api/v1/design/admin/projects", { page_size: 1 });

  // Extract totals safely
  const totalUsers = usersData?.total || 0;
  const totalProjects = projectsData?.total || 0;

  // You can calculate designs created ≈ total projects (or use another endpoint later)
  const designsCreated = totalProjects;

  // For Avg Session Duration - you may need a separate endpoint later
  // For now, keeping static or you can add another API call
  const avgSession = "4m 32s"; // placeholder or fetch from analytics endpoint

  // Loading state for cards
  const isLoading = usersLoading || projectsLoading;

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Analytics & Insights</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Total Users */}
        <AnalyticsCard
          icon={Users}
          title="TOTAL USERS"
          value={isLoading ? "..." : totalUsers}
          change={12.5}
          positive={true}
          loading={isLoading}
        />

        {/* Active Projects */}
        <AnalyticsCard
          icon={FolderOpen}
          title="ACTIVE PROJECTS"
          value={isLoading ? "..." : totalProjects}
          change={8.3}
          positive={true}
          loading={isLoading}
        />

        {/* Designs Created */}
        <AnalyticsCard
          icon={Palette}
          title="DESIGNS CREATED"
          value={isLoading ? "..." : designsCreated}
          change={15.7}
          positive={true}
          loading={isLoading}
        />

        {/* Avg Session - static for now */}
        <AnalyticsCard
          icon={Clock}
          title="AVG. SESSION"
          value={avgSession}
          change={-5.4}
          positive={false}
          loading={false}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Company Analytics</h3>
            <select className="text-sm border rounded-lg px-3 py-1">
              <option>1 Jan 2025 - 31 Dec 2025</option>
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
            </select>
          </div>
          <LineChart />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Popular Styles</h3>
            <select className="text-sm border rounded-lg px-3 py-1">
              <option>1 Jan 2025 - 31 Dec 2025</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <BarChart />
        </div>
      </div>

      {/* Optional: Show errors */}
      {(usersError || projectsError) && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
          Error loading data: {usersError || projectsError}
        </div>
      )}
    </>
  );
}
