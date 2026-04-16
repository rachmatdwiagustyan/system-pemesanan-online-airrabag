interface StatProps {
  label: string;
  value: string;
  percentage: string;
  icon: React.ReactNode;
}

export default function StatCard({ label, value, percentage, icon }: StatProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative overflow-hidden">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
          {icon}
        </div>
        <span className="text-emerald-500 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-full">
          +{percentage}%
        </span>
      </div>
      <div>
        <p className="text-gray-500 text-sm font-medium">{label}</p>
        <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500 opacity-20"></div>
    </div>
  );
}