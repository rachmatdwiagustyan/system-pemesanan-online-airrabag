"use client";

import { useState, useEffect } from "react";
import ProductCard from "../../../components/admin/dashboard/produk/ProductCard";
import AddProductModal from "../../../components/admin/dashboard/produk/AddProductModal";
import { Plus, Loader2 } from "lucide-react";

export default function ProduckPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // State untuk filtering
  const [selectedCategory, setSelectedCategory] = useState("Semua Produk");

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/admin/produk");
      if (!res.ok) throw new Error("Gagal mengambil data");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 1. Ambil Kategori Dinamis dari Data Produk
  // Menggunakan Set agar kategori yang sama tidak muncul dua kali
  const dynamicCategories = [
    "Semua Produk",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  // 2. Filter Produk berdasarkan Kategori yang dipilih
  const filteredProducts = selectedCategory === "Semua Produk"
    ? products
    : products.filter((p) => p.category === selectedCategory);

  const formatIDR = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section>
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-emerald-900">Produk</h1>
          <p className="text-gray-400 text-sm mt-1">Kelola inventaris koleksi botani Anda.</p>
        </div>
      </div>

      {/* 3. Filter Categories Dinamis */}
      {!loading && products.length > 0 && (
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {dynamicCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-100"
                  : "bg-white text-gray-500 hover:bg-gray-100 border border-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Grid Produk */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {/* Button Add New */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="border-2 cursor-pointer border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center p-6 hover:border-emerald-300 hover:bg-emerald-50 transition-all group min-h-[280px]"
        >
          <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-emerald-100 flex items-center justify-center text-gray-400 group-hover:text-emerald-600 mb-3 transition-colors">
            <Plus size={24} />
          </div>
          <span className="text-sm font-bold text-gray-400 group-hover:text-emerald-700">Add Product</span>
        </button>

        {loading ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400">
            <Loader2 className="animate-spin mb-2 text-emerald-500" size={32} />
            <p className="text-sm font-medium">Menyinkronkan data...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product: any) => (
            <ProductCard
              key={product.id}
              name={product.name}
              category={product.category}
              price={formatIDR(product.price)}
              stock={product.stock}
              image={product.image || "https://images.unsplash.com/photo-1501004318641-729e8e22bd0e?q=80&w=500"}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
            <p className="text-gray-400">
              {products.length === 0 
                ? "Belum ada produk. Mulai tambahkan koleksi baru!" 
                : `Tidak ada produk di kategori "${selectedCategory}"`}
            </p>
          </div>
        )}
      </div>

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchProducts}
      />
    </section>
  );
}