export default function StatCard({
  title,
  value,
  subtext,
  color = "text-blue-600",
}) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
        {title}
      </p>
      <h3 className={`text-3xl font-bold mt-2 ${color}`}>{value}</h3>
      <p className="text-xs text-slate-400 mt-2">{subtext}</p>
    </div>
  );
}
