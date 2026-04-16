const orders = [
  { id: "#AT-9021", product: "Succulent Trio Set", date: "12 Okt 2023", customer: "Budi Santoso", total: "Rp 450.000", status: "COMPLETED" },
  { id: "#AT-9022", product: "Sansevieria Laurentii", date: "12 Okt 2023", customer: "Siti Aminah", total: "Rp 210.000", status: "COMPLETED" },
];

export default function OrderTable() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 mt-8 overflow-hidden">
      <div className="p-6 border-b flex justify-between items-center">
        <div>
          <h2 className="font-bold text-gray-800">DATA PESANAN</h2>
          <p className="text-xs text-gray-400">Monitoring real-time transactions</p>
        </div>
        <button className="text-emerald-600 text-sm font-semibold hover:underline">Export Report ↓</button>
      </div>
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 text-gray-400 text-xs uppercase">
          <tr>
            <th className="p-4 font-medium">Order ID</th>
            <th className="p-4 font-medium">Produk</th>
            <th className="p-4 font-medium">Tanggal</th>
            <th className="p-4 font-medium">Customer</th>
            <th className="p-4 font-medium">Total</th>
            <th className="p-4 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="text-sm divide-y">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50 transition">
              <td className="p-4 font-bold">{order.id}</td>
              <td className="p-4">{order.product}</td>
              <td className="p-4 text-gray-500">{order.date}</td>
              <td className="p-4 font-semibold text-emerald-700">{order.customer}</td>
              <td className="p-4 font-bold">{order.total}</td>
              <td className="p-4">
                <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-bold">
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}