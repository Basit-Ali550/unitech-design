// "use client";

// import React from "react";
// import Sidebar from "../components/Sidebar";
// import TopBar from "../components/TopBar";
// import AnalyticsCard from "../components/AnalyticsCard";
// import LineChart from "../components/LineChart";
// import BarChart from "..//components/BarChart";
// import { Users, FolderOpen, Palette, Clock } from "lucide-react";

// const Dashboard = () => {
//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Sidebar />

//       <div className="flex-1 flex flex-col">
//         <TopBar />

//         <main className="flex-1 p-6 overflow-auto">
//           <h1 className="text-2xl font-bold mb-6">Analytics & Insights</h1>

//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//             <AnalyticsCard
//               icon={Users}
//               title="TOTAL USERS"
//               value={2842}
//               change={12.5}
//               positive={true}
//             />
//             <AnalyticsCard
//               icon={FolderOpen}
//               title="ACTIVE PROJECTS"
//               value={1259}
//               change={12.5}
//               positive={true}
//             />
//             <AnalyticsCard
//               icon={Palette}
//               title="DESIGNS CREATED"
//               value={2842}
//               change={12.5}
//               positive={true}
//             />
//             <AnalyticsCard
//               icon={Clock}
//               title="AVG. SESSION"
//               value={2842}
//               change={12.5}
//               positive={false}
//             />
//           </div>

//           {/* Charts */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* Company Analytics */}
//             <div className="bg-white p-6 rounded-xl shadow-sm">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="font-semibold">Company Analytics</h3>
//                 <select className="text-sm border rounded-lg px-3 py-1">
//                   <option>1 Jan 2025 - 31 Dec 2025</option>
//                 </select>
//               </div>
//               <LineChart />
//             </div>

//             {/* Popular Styles */}
//             <div className="bg-white p-6 rounded-xl shadow-sm">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="font-semibold">Popular Styles</h3>
//                 <select className="text-sm border rounded-lg px-3 py-1">
//                   <option>1 Jan 2025 - 31 Dec 2025</option>
//                 </select>
//               </div>
//               <BarChart />
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import AnalyticsCard from "../../components/AnalyticsCard";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import { Users, FolderOpen, Palette, Clock } from "lucide-react";

export default function Dashboard() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Analytics & Insights</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <AnalyticsCard icon={Users} title="TOTAL USERS" value={2842} change={12.5} positive={true} />
        <AnalyticsCard icon={FolderOpen} title="ACTIVE PROJECTS" value={1259} change={12.5} positive={true} />
        <AnalyticsCard icon={Palette} title="DESIGNS CREATED" value={2842} change={12.5} positive={true} />
        <AnalyticsCard icon={Clock} title="AVG. SESSION" value={2842} change={12.5} positive={false} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex justify-between">
            <h3 className="font-semibold">Company Analytics</h3>
            <select className="text-sm border rounded-lg px-3 py-1">
              <option>1 Jan 2025 - 31 Dec 2025</option>
            </select>
          </div>
          <LineChart />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between">
            <h3 className="font-semibold">Popular Styles</h3>
            <select className="text-sm border rounded-lg px-3 py-1">
              <option>1 Jan 2025 - 31 Dec 2025</option>
            </select>
          </div>
          <BarChart />
        </div>
      </div>
    </>
  );
}