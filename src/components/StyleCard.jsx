
import React from "react";
import { Edit2, Trash2 } from "lucide-react";
import Image from "next/image";

const StyleCard = ({ style }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200  overflow-hidden">
      {/* Image Section - Fixed */}
      <div className="relative h-36 bg-gray-200">
        <Image
          src={style.image}
          alt={style.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>

      <div className="px-3 pb-3 space-y-1">
        <h3 className="font-medium text-base  text-gray-800">{style.name}</h3>
        <p className="text-sm text-gray-400 line-clamp-2">{style.description}</p>

        <div className="flex items-center justify-between mt-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors">
            {style.parameters} Parameters
          </button>
          <div className="flex items-center gap-2">
            <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <Edit2 className="w-4 h-4" />
            </button>
            <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleCard;