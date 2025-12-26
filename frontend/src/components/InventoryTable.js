// src/components/InventoryTable.js
import { getStockStatus } from "@/utils/formatters";

export default function InventoryTable({ items }) {
  return (
    <div className="overflow-hidden bg-white rounded-2xl border border-zinc-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50/50">
              <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-widest">
                Material Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-widest">
                Category
              </th>
              <th className="px-6 py-4 text-right text-xs font-bold text-black uppercase tracking-widest">
                Stock Level
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-widest">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {items.map((item) => {
              const status = getStockStatus(item.quantity, item.reorderLevel);

              return (
                <tr
                  key={item.sku}
                  className="hover:bg-zinc-50 transition-colors"
                >
                  <td className="px-6 py-5">
                    <span className="font-semibold text-black">
                      {item.name}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-zinc-600 text-sm">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <span className="font-bold text-black font-mono">
                      {item.quantity}
                    </span>
                    <span className="text-zinc-500 text-sm ml-1">
                      {item.unit}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-tighter border ${status.color}`}
                    >
                      {status.label}
                    </span>
                  </td>
                </tr>
              );
            })}
            {items.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-12 text-center">
                  <span className="text-zinc-400 text-sm font-normal">
                    No materials found in inventory.
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
