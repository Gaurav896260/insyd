export default function SettingsPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-8">System Settings</h1>

      <section className="bg-white rounded-xl border p-6 space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-4">Stock Thresholds</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-500">
                Global Low Stock Alert (%)
              </label>
              <input
                type="number"
                defaultValue="20"
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="text-sm text-slate-500">
                Dead Stock Period (Days)
              </label>
              <input
                type="number"
                defaultValue="90"
                className="w-full border rounded p-2"
              />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t">
          <button className="bg-slate-900 text-white px-6 py-2 rounded-lg font-medium">
            Save Changes
          </button>
        </div>
      </section>
    </div>
  );
}
