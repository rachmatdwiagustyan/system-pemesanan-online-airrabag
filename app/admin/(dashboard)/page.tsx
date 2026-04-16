import StatCard from "../../components/admin/dashboard/StatCard";
import OrderTable from "../../components/admin/dashboard/OrderTable";
import { Package, ShoppingCart, Wallet, Users } from "lucide-react";

export default function AdminDashboard() {
  return (
    <section>
      <h1 className="text-3xl font-bold text-gray-800">Overview</h1>
      <p className="text-gray-400 mt-1">Here's what's happening with your atelier today.</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <StatCard label="Total Produk" value="1,284" percentage="12" icon={<Package />} />
        <StatCard label="Total Pesanan" value="856" percentage="5.4" icon={<ShoppingCart />} />
        <StatCard label="Total Penjualan" value="Rp 42.5M" percentage="18.2" icon={<Wallet />} />
        <StatCard label="Customer" value="3,120" percentage="2.1" icon={<Users />} />
      </div>

      <div className="grid grid-cols-3 gap-6 mt-8">
        {/* Area Grafik */}
        <div className="col-span-2 bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-80 flex items-center justify-center">
          <p className="text-gray-400 italic text-sm text-center">
            [GRAFIK PENJUALAN]<br/>Integrasikan dengan Chart.js atau Recharts
          </p>
        </div>
        
        {/* Top Performer Card */}
        <div className="bg-emerald-900 rounded-xl p-8 text-white relative overflow-hidden flex flex-col justify-end">
          <div className="absolute top-0 right-0 p-4 opacity-20 text-white">
            <Package size={120} />
          </div>
          <span className="text-[10px] bg-white/20 px-2 py-1 rounded-md w-fit mb-4">TOP PERFORMER</span>
          <h2 className="text-2xl font-bold leading-tight mb-2 text-white">Monstera Deliciosa</h2>
          <p className="text-sm text-emerald-200 mb-6">342 units sold this month with 98% positive reviews.</p>
          <button className="bg-white text-emerald-900 font-bold py-3 rounded-lg text-sm hover:bg-emerald-50 transition-colors">
            View Insights
          </button>
        </div>
      </div>

      {/* Table Section */}
      <OrderTable />
    </section>
  );
}