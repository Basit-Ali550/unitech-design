import React from "react";

const AnalyticsCard = ({ icon: Icon, title, value, change, positive }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="p-2 bg-pink-50 rounded-lg">
          <Icon className="w-5 h-5 text-pink-600" />
        </div>
      </div>
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-2xl font-bold mt-1">{value.toLocaleString()}</p>
      <p className={`text-sm mt-2 ${positive ? "text-green-600" : "text-red-600"}`}>
        {positive ? "Up" : "Down"} {change}% From Last Month
      </p>
    </div>
  );
};

export default AnalyticsCard;