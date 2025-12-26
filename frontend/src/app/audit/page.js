"use client";
import { useState, useEffect } from "react";
import { api } from "@/services/api";
import { ClipboardCheck, AlertTriangle } from "lucide-react";

export default function AuditPage() {
  const [items, setItems] = useState([]);
  const [selectedSku, setSelectedSku] = useState("");
  const [physicalQty, setPhysicalQty] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    const loadItems = async () => {
      try {
        // The API now returns a paginated object
        const response = await api.getInventory(1, 1000);

        // Extract the 'data' array specifically
        setItems(response.data || []);
      } catch (err) {
        console.error("Audit load failed", err);
        setItems([]); // Safety fallback
      }
    };
    loadItems();
  }, []);
  const handleAudit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5001/api/audit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sku: selectedSku,
        physicalQuantity: Number(physicalQty),
        note,
      }),
    });
    if (res.ok) alert("Audit Logged & System Stock Updated!");
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl border border-zinc-200">
      <div className="flex items-center gap-3 mb-6">
        <ClipboardCheck className="text-blue-600" />
        <h1 className="text-xl font-bold">Physical Stock Audit</h1>
      </div>

      <form onSubmit={handleAudit} className="space-y-4">
        <select
          className="w-full border p-3 rounded-xl"
          onChange={(e) => setSelectedSku(e.target.value)}
        >
          <option value="">Select Material to Audit</option>
          {items.map((item) => (
            <option key={item.sku} value={item.sku}>
              {item.name} (System: {item.quantity})
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Actual Physical Quantity Found"
          className="w-full border p-3 rounded-xl"
          value={physicalQty}
          onChange={(e) => setPhysicalQty(e.target.value)}
        />

        <textarea
          placeholder="Notes (e.g., '10 bags damaged by rain')"
          className="w-full border p-3 rounded-xl"
          onChange={(e) => setNote(e.target.value)}
        />

        <button className="w-full bg-black text-white py-3 rounded-xl font-bold">
          Sync System Stock
        </button>
      </form>
    </div>
  );
}
