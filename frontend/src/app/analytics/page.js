// src/app/analytics/page.js
"use client";
import { useEffect, useState } from "react";
import FastMovingChart from "@/components/charts/FastMovingChart";
import StockAgingChart from "@/components/charts/StockAgingChart"; // New Component
import { api } from "@/services/api";
import { Loader2, Clock, TrendingUp } from "lucide-react";

export default function AnalyticsPage() {
  const [reports, setReports] = useState({ dead: [], fast: [], loading: true });

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const [deadData, fastData] = await Promise.all([
          api.getDeadStock(),
          api.getFastMoving(),
        ]);
        setReports({ dead: deadData, fast: fastData, loading: false });
      } catch (err) {
        console.error("Analytics fetch failed", err);
        setReports((prev) => ({ ...prev, loading: false }));
      }
    };
    loadAnalytics();
  }, []);

  if (reports.loading)
    return (
      <div className="flex justify-center p-20">
        <Loader2 className="animate-spin h-10 w-10 text-black" />
      </div>
    );

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-black text-black tracking-tighter uppercase">
          Deep Dive Analytics
        </h1>
        <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">
          Categorizing stock based on movement velocity and age.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Stock Aging Line Graph */}
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <div className="flex items-center gap-2 mb-6 text-black">
            <Clock size={20} />
            <h3 className="font-black uppercase tracking-tight">
              Stock Aging Report (Velocity)
            </h3>
          </div>
          <StockAgingChart data={reports.dead} />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* List View of Aging Stock */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-200">
            <h3 className="font-black uppercase text-xs mb-4 tracking-widest">
              Aging Details
            </h3>
            <div className="space-y-4">
              {reports.dead.map((item) => (
                <div
                  key={item.sku}
                  className="flex justify-between items-center border-b border-zinc-100 pb-2"
                >
                  <span className="text-sm font-bold text-black uppercase">
                    {item.name}
                  </span>
                  <span className="text-xs font-mono bg-black text-white px-2 py-0.5 rounded">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Fast Moving Bar Chart */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-black">
              <TrendingUp size={20} />
              <h3 className="font-black uppercase tracking-tight">
                Top Sellers
              </h3>
            </div>
            <FastMovingChart chartData={reports.fast} />
          </div>
        </div>
      </div>
    </div>
  );
}
