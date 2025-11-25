import MaterialTable from "../../../components/MaterialTable";
import Link from "next/link";

export default function MaterialListPage() {
  return (
    <div className="space-y-4 sm:p-6 p-4 rounded-2xl shadow-sm bg-white">
      <div className="flex items-center justify-between">
        {/* Left side title */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Material List</h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage all your materials in one place.
          </p>
        </div>

        {/* Right side button */}
        <Link
          href="/material-create"
          className="px-4 py-2 bg-[#0461A6] text-white rounded-lg shadow hover:bg-blue-900 transition"
        >
          + Add Material
        </Link>
      </div>

      <MaterialTable />
    </div>
  );
}
