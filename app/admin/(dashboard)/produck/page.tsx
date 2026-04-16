import ProductCard from "../../../components/admin/dashboard/produk/ProductCard";
import { Plus, Search } from "lucide-react";

const products = [
  { name: "Monstera Deliciosa", category: "Tropical Houseplant", price: "Rp 450.000", stock: 12, image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=500" },
  { name: "Sansevieria Trifasciata", category: "Air Purifying", price: "Rp 185.000", stock: 45, image: "https://images.unsplash.com/photo-1593433551532-794aa83669ad?q=80&w=500" },
  { name: "Ficus Lyrata", category: "Statement Tree", price: "Rp 1.250.000", stock: 3, image: "https://images.unsplash.com/photo-1597055181300-e3633a207518?q=80&w=500" },
  { name: "ZZ Plant Raven", category: "Low Light Expert", price: "Rp 340.000", stock: 0, image: "https://images.unsplash.com/photo-1632213702844-1e0615781374?q=80&w=500" },
];

const categories = ["Semua Produk", "Tanaman Indoor", "Pot & Media Tanam", "Suplemen Nutrisi"];

export default function ProduckPage() {
  return (
    <section>
      {/* Header section dengan Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-emerald-900">Produk</h1>
          <p className="text-gray-400 text-sm mt-1">Kelola inventaris koleksi botani Anda.</p>
        </div>

        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search catalog, botanical collections..." 
            className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* Filter Categories */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat, i) => (
          <button 
            key={cat} 
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              i === 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-white text-gray-500 hover:bg-gray-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Produk */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {/* Tombol Add New Product (Sesuai Visual) */}
        <button className="border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center p-6 hover:border-emerald-300 hover:bg-emerald-50 transition-all group min-h-[250px]">
          <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-emerald-100 flex items-center justify-center text-gray-400 group-hover:text-emerald-600 mb-3 transition-colors">
            <Plus size={24} />
          </div>
          <span className="text-sm font-bold text-gray-400 group-hover:text-emerald-700">Add Product</span>
        </button>

        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </section>
  );
}