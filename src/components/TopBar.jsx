import React from "react";
import { ChevronLeft, Download, FileText } from "lucide-react";

const TopBar = () => {
  return (
    <div className="bg-white px-6 py-4 flex items-center border-b border-gray-200 justify-between">
      <button className="p-2 hover:bg-gray-100 rounded-lg">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gray-300 " />
          <div>
            <p className="text-sm font-medium">Jon Doe</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;