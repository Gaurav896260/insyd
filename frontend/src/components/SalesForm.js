// src/components/SalesForm.js
"use client";
import { useState } from "react";
import { api } from "@/services/api";

export default function SalesForm() {
  const [formData, setFormData] = useState({
    sku: "",
    quantity: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [status, setStatus] = useState({ type: "", msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.recordSale(formData);
      setStatus({ type: "success", msg: "Sale recorded successfully!" });
      setFormData({
        sku: "",
        quantity: "",
        date: new Date().toISOString().split("T")[0],
      });
    } catch (err) {
      setStatus({ type: "error", msg: "Error recording sale. Check SKU." });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md space-y-4 bg-white p-6 border border-gray-200 rounded-xl shadow-sm"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          SKU ID
        </label>
        <input
          required
          type="text"
          value={formData.sku}
          onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="e.g. TMT-12MM-JSW"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Quantity Sold
        </label>
        <input
          required
          type="number"
          value={formData.quantity}
          onChange={(e) =>
            setFormData({ ...formData, quantity: e.target.value })
          }
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date of Sale
        </label>
        <input
          required
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-700 text-white py-2 px-4 rounded font-medium hover:bg-blue-800 transition-colors"
      >
        Record Transaction
      </button>
      {status.msg && (
        <p
          className={`text-sm p-2 rounded ${
            status.type === "success"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {status.msg}
        </p>
      )}
    </form>
  );
}
