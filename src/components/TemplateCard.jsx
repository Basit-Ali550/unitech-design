// // src/components/TemplateCard.jsx
// import React from "react";
// import { Edit2, Trash2 } from "lucide-react";
// import Image from "next/image";

// const TemplateCard = ({ template }) => {
//   return (
//     <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
//       <div className="h-48 bg-gray-200 border-b">
//         <Image
//           src={template.image}
//           alt={template.name}
//           className="w-full h-full object-cover"
//         />
//       </div>

//       <div className="p-4 space-y-2">
//         <h3 className="font-semibold text-gray-900">{template.name}</h3>
//         <p className="text-sm text-gray-600 line-clamp-2">{template.description}</p>

//         <div className="flex items-center justify-between pt-2">
//           <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors">
//             {template.parameters} Parameters
//           </button>
//           <div className="flex items-center gap-2">
//             <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
//               <Edit2 className="w-4 h-4" />
//             </button>
//             <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
//               <Trash2 className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TemplateCard;


// src/components/TemplateCard.jsx
import React from "react";
import { Edit2, Trash2 } from "lucide-react";
import Image from "next/image";

const TemplateCard = ({ template }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200  overflow-hidden">
      {/* Image Section - Fixed */}
      <div className="relative h-36 bg-gray-200">
        <Image
          src={template.image}
          alt={template.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>

      <div className="px-3 pb-3 space-y-1">
        <h3 className="font-semibold text-gray-800">{template.name}</h3>
        <p className="text-sm text-gray-400 line-clamp-2">{template.description}</p>

        <div className="flex items-center justify-between pt-1">
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors">
            {template.parameters} Parameters
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

export default TemplateCard;