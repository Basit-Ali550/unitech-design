import MaterialTable from "../../../components/MaterialTable";

export default function MaterialListPage() {
  return (
    <div className="space-y-4 sm:p-6 p-4 rounded-2xl shadow-sm bg-white">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Material List</h1>
        <p className="text-sm text-gray-600 mt-1">
          Manage all your materials in one place.
        </p>
      </div>

      <MaterialTable />
    </div>
  );
}
