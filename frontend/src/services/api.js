// src/services/api.js
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

export const api = {
  // Inventory Fetching
  getInventory: async (page = 1, limit = 10, category = "", search = "") => {
    const url = new URL(`${API_BASE_URL}/inventory`);
    url.searchParams.append("page", page);
    url.searchParams.append("limit", limit);
    if (category) url.searchParams.append("category", category);
    if (search) url.searchParams.append("search", search);

    const res = await fetch(url.toString());
    return await res.json();
  },

  // NEW: Add Inventory Item
  addItem: async (formData) => {
    const res = await fetch(`${API_BASE_URL}/inventory`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    return await res.json();
  },

  // Analytics
  getDeadStock: async () => {
    const res = await fetch(`${API_BASE_URL}/analytics/dead-stock`);
    const json = await res.json();
    return json.success ? json.data : [];
  },

  getFastMoving: async () => {
    const res = await fetch(`${API_BASE_URL}/analytics/fast-moving`);
    const json = await res.json();
    return json.success ? json.data : [];
  },

  // NEW: Record Sale
  recordSale: async (payload) => {
    const res = await fetch(`${API_BASE_URL}/sales`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return await res.json();
  },

  // NEW: Physical Audit
  submitAudit: async (auditData) => {
    const res = await fetch(`${API_BASE_URL}/audit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(auditData),
    });
    return await res.json();
  },
};
