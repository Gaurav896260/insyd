"use client";
import { useState, useEffect } from "react";
import { api } from "@/services/api";
import { ShoppingCart, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function SalesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    sku: "",
    quantitySold: "",
    invoiceRef: "",
  });
  const [status, setStatus] = useState({ type: "", msg: "" });

  // Fetch available SKUs for the dropdown
  useEffect(() => {
    const loadItems = async () => {
      try {
        // The API now returns { success: true, data: [...], totalPages: X }
        const response = await api.getInventory(1, 1000); // Fetch all for the dropdown

        // Update state with the nested 'data' array
        setItems(response.data || []);
      } catch (err) {
        console.error("Failed to fetch SKUs", err);
        setItems([]); // Fallback to empty array to prevent .map() error
      } finally {
        setLoading(false);
      }
    };
    loadItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", msg: "" });

    try {
      // Backend expects: { sku, quantitySold, invoiceRef }
      const payload = {
        ...form,
        quantitySold: Number(form.quantitySold),
      };

      const res = await fetch("http://localhost:5001/api/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (result.success) {
        setStatus({
          type: "success",
          msg: `Sale recorded! Remaining stock: ${result.remainingStock}`,
        });
        setForm({ sku: "", quantitySold: "", invoiceRef: "" });
      } else {
        setStatus({
          type: "error",
          msg: result.message || "Error recording sale",
        });
      }
    } catch (err) {
      setStatus({ type: "error", msg: "Server connection failed" });
    }
  };

  if (loading)
    return (
      <div className="flex justify-center p-20">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-blue-50 rounded-lg">
            <ShoppingCart className="w-5 h-5 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">New Sales Entry</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
              Select Material (SKU)
            </label>
            <select
              className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={form.sku}
              onChange={(e) => setForm({ ...form, sku: e.target.value })}
              required
            >
              <option value="">Choose item...</option>
              {items.map((item) => (
                <option key={item.sku} value={item.sku}>
                  {item.name} ({item.sku}) — {item.quantity} available
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                Quantity Sold
              </label>
              <input
                type="number"
                className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="0"
                value={form.quantitySold}
                onChange={(e) =>
                  setForm({ ...form, quantitySold: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                Invoice / Ref
              </label>
              <input
                type="text"
                className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="INV-2024-001"
                value={form.invoiceRef}
                onChange={(e) =>
                  setForm({ ...form, invoiceRef: e.target.value })
                }
              />
            </div>
          </div>

          <button className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold mt-4 hover:bg-gray-800 transition-all shadow-lg active:scale-[0.98]">
            Complete Transaction
          </button>
        </form>

        {status.msg && (
          <div
            className={`mt-6 p-4 rounded-xl flex items-center gap-3 ${
              status.type === "success"
                ? "bg-green-50 text-green-700 border border-green-100"
                : "bg-red-50 text-red-700 border border-red-100"
            }`}
          >
            {status.type === "success" ? (
              <CheckCircle2 size={18} />
            ) : (
              <AlertCircle size={18} />
            )}
            <p className="text-sm font-medium">{status.msg}</p>
          </div>
        )}
      </div>
    </div>
  );
}
