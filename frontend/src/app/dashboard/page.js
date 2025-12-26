// src/app/dashboard/page.js
"use client";
import { useEffect, useState } from "react";
import StatCard from "@/components/StatCard";
import FastMovingChart from "@/components/charts/FastMovingChart";
import DeadStockChart from "@/components/charts/DeadStockChart";
import { AlertTriangle, Loader2 } from "lucide-react";
import { api } from "@/services/api";

export default function Dashboard() {
  const [data, setData] = useState({
    inventory: [],
    deadStock: [],
    fastMoving: [],
    loading: true,
  });

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // The API now returns an object { success, data, totalPages... }
        const [inventoryRes, deadStock, fastMoving] = await Promise.all([
          api.getInventory(1, 1000), // Get a large limit for dashboard stats
          api.getDeadStock(),
          api.getFastMoving(),
        ]);

        setData({
          inventory: inventoryRes.data || [], // Access the .data property
          deadStock,
          fastMoving,
          loading: false,
        });
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
        setData((prev) => ({ ...prev, loading: false }));
      }
    };
    loadDashboardData();
  }, []);

  if (data.loading) {
    return (
      <div className="flex h-96 items-center justify-center bg-white">
        <Loader2 className="animate-spin h-10 w-10 text-gray-900" />
      </div>
    );
  }

  // Derived Stats
  const totalSKUs = data.inventory.length;
  const totalQuantity = data.inventory.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  const lowStockItems = data.inventory.filter(
    (item) => item.quantity <= item.reorderLevel
  );
  const deadStockPercent =
    totalSKUs > 0 ? ((data.deadStock.length / totalSKUs) * 100).toFixed(0) : 0;

  return (
    <div className="space-y-8 bg-white min-h-screen">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
          Business Overview
        </h1>
        <p className="text-sm text-gray-500 font-normal">
          Real-time visibility into your Cement, Steel, and Paint stock.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total SKUs"
          value={totalSKUs}
          subtext="Active materials"
          color="text-gray-900"
        />
        <StatCard
          title="Total Quantity"
          value={totalQuantity.toLocaleString()}
          subtext="Units on hand"
          color="text-gray-900"
        />
        <StatCard
          title="Low Stock"
          value={lowStockItems.length}
          subtext="Requires reorder"
          color="text-gray-900"
        />
        <StatCard
          title="Dead Stock"
          value={`${deadStockPercent}%`}
          subtext="No movement recently"
          color="text-gray-900"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FastMovingChart chartData={data.fastMoving} />
        <DeadStockChart inventoryData={data.inventory} />
      </div>

      <div className="bg-white p-7 rounded-2xl border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-gray-900" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            Critical Low Stock Alerts
          </h3>
        </div>
        <div className="space-y-3">
          {lowStockItems.slice(0, 5).map((item) => (
            <div
              key={item.sku}
              className="flex items-center justify-between p-5 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors"
            >
              <div className="flex flex-col gap-1">
                <span className="font-medium text-gray-900">{item.name}</span>
                <span className="text-sm text-gray-500 font-normal">
                  Current: {item.quantity} {item.unit} · Min:{" "}
                  {item.reorderLevel}
                </span>
              </div>
              <span className="text-xs font-medium px-4 py-1.5 rounded-full bg-gray-900 text-white">
                REORDER
              </span>
            </div>
          ))}
          {lowStockItems.length === 0 && (
            <p className="text-gray-400 text-sm font-normal py-4 text-center">
              All stock levels are healthy.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
