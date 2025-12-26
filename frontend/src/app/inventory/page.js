"use client";
import { useEffect, useState } from "react";
import InventoryTable from "@/components/InventoryTable";
import AddItemModal from "@/components/AddItemModal"; // Restore Modal Import
import { api } from "@/services/api";
import { Loader2, ChevronLeft, ChevronRight, Search, Plus } from "lucide-react";

export default function InventoryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Restore Modal State

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const response = await api.getInventory(page, 10, category, search);
      setItems(response.data || []);
      setTotalPages(response.totalPages || 1);
    } catch (error) {
      console.error("Failed to load inventory", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, [page, category]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchInventory();
  };

  return (
    <div className="space-y-6">
      {/* HEADER SECTION RESTORED */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Current Inventory
          </h1>
          <p className="text-sm text-gray-500">
            Manage your materials and stock levels.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)} // Opens the modal
          className="bg-black hover:bg-zinc-800 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors border border-black"
        >
          <Plus size={18} />
          Add Item
        </button>
      </div>

      {/* FILTER SECTION */}
      <div className="flex flex-col md:flex-row gap-4 justify-between bg-white p-4 rounded-xl border border-zinc-200">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            className="border border-zinc-300 p-2 rounded-lg text-sm w-64 focus:outline-none focus:ring-1 focus:ring-black"
            placeholder="Search SKU or Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            <Search size={16} />
          </button>
        </form>

        <select
          className="border border-zinc-300 p-2 rounded-lg text-sm focus:outline-none"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Categories</option>
          {["Cement", "Steel", "Tiles", "Pipes", "Paint", "Hardware"].map(
            (c) => (
              <option key={c} value={c}>
                {c}
              </option>
            )
          )}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <InventoryTable items={items} />
      )}

      {/* PAGINATION SECTION */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-zinc-200">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="flex items-center gap-1 disabled:opacity-30 font-bold text-sm"
        >
          <ChevronLeft size={20} /> PREV
        </button>
        <span className="text-xs font-black uppercase tracking-widest">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="flex items-center gap-1 disabled:opacity-30 font-bold text-sm"
        >
          NEXT <ChevronRight size={20} />
        </button>
      </div>

      {/* MODAL COMPONENT RESTORED */}
      {isModalOpen && (
        <AddItemModal
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            setIsModalOpen(false);
            fetchInventory(); // Refresh list after adding
          }}
        />
      )}
    </div>
  );
}
