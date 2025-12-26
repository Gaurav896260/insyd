// src/services/api.js
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

export const api = {
  // Pulls from inventory.controller.js (getAllItems)
  getInventory: async (page = 1, limit = 10, category = "", search = "") => {
    const url = new URL(`${API_BASE_URL}/inventory`);
    url.searchParams.append("page", page);
    url.searchParams.append("limit", limit);
    if (category) url.searchParams.append("category", category);
    if (search) url.searchParams.append("search", search);

    const res = await fetch(url.toString());
    const json = await res.json();
    // Return the whole object now because we need totalPages
    return json.success ? json : { data: [], totalPages: 0 };
  },

  // Pulls from analytics.controller.js (getDeadStockReport)
  getDeadStock: async () => {
    const res = await fetch(`${API_BASE_URL}/analytics/dead-stock`);
    const json = await res.json();
    return json.success ? json.data : [];
  },

  // Pulls from analytics.controller.js (getFastMovingItems)
  getFastMoving: async () => {
    const res = await fetch(`${API_BASE_URL}/analytics/fast-moving`);
    const json = await res.json();
    return json.success ? json.data : [];
  },
};
