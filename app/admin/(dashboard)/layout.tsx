import Sidebar from "../../components/admin/dashboard/Sidebar";
import Navbar from "../../components/admin/dashboard/Navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar tetap di kiri */}
      <Sidebar />
      
      {/* Area Konten Utama */}
      <main className="flex-1 ml-64 p-8">
        {/* Navbar akan selalu muncul di atas setiap halaman admin */}
        <Navbar />
        
        {/* Content page (Dashboard / Produk / dll) */}
        {children}
      </main>
    </div>
  );
}