"use client";
import { useState } from "react";
import { api } from "@/services/api";

export default function AddItemModal({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    category: "Cement",
    unit: "bag",
    quantity: 0,
    unitCost: "",
    reorderLevel: 10,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await api.addItem(formData);
      if (data.success) {
        onSuccess();
      } else {
        alert(data.message || "Error adding item.");
      }
    } catch (err) {
      alert("Error adding item. Ensure SKU is unique and server is running.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-6">Add New Material</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                SKU (Unique ID)
              </label>
              <input
                required
                className="w-full border rounded-lg p-2"
                placeholder="e.g. CMT-ULT-01"
                value={formData.sku}
                onChange={(e) =>
                  setFormData({ ...formData, sku: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                Material Name
              </label>
              <input
                required
                className="w-full border rounded-lg p-2"
                placeholder="UltraTech Cement"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                Category
              </label>
              <select
                className="w-full border rounded-lg p-2"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                {["Cement", "Steel", "Tiles", "Pipes", "Paint", "Hardware"].map(
                  (c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  )
                )}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                Unit
              </label>
              <select
                className="w-full border rounded-lg p-2"
                value={formData.unit}
                onChange={(e) =>
                  setFormData({ ...formData, unit: e.target.value })
                }
              >
                {["bag", "piece", "meter", "kg", "bundle"].map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                Initial Qty
              </label>
              <input
                type="number"
                required
                className="w-full border rounded-lg p-2"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: Number(e.target.value) })
                }
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                Unit Cost (₹)
              </label>
              <input
                type="number"
                required
                className="w-full border rounded-lg p-2"
                value={formData.unitCost}
                onChange={(e) =>
                  setFormData({ ...formData, unitCost: Number(e.target.value) })
                }
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
            >
              Save Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
