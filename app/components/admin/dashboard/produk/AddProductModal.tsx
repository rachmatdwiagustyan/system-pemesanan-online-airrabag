"use client";

import { X, Plus } from "lucide-react";
import { useState, ChangeEvent, FormEvent } from "react";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; // Callback untuk refresh data di parent
}

export default function AddProductModal({ isOpen, onClose, onSuccess }: AddProductModalProps) {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
// Di dalam AddProductModal
const [formData, setFormData] = useState({
  name: "",
  price: "",
  stock: "",
  category: "Tanaman Indoor",
  description: "",
  image: "" // Ini yang akan dikirim ke database
});

const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    setImagePreview(URL.createObjectURL(file));
    // Simpan file aslinya ke state, bukan link Unsplash
    setFormData({ ...formData, image: file as any }); 
  }
};

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    // Gunakan FormData untuk mengirim File
    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("stock", formData.stock);
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("file", formData.image); // Mengirim file asli

    const response = await fetch("/api/admin/produk", {
      method: "POST",
      // Jangan pakai headers Content-Type JSON kalau kirim FormData
      body: data, 
    });

    if (response.ok) {
      onSuccess();
      onClose();
      // Reset form...
    }
  } catch (error) {
    console.error("Gagal menyimpan:", error);
  } finally {
    setLoading(false);
  }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden relative">
        <button onClick={onClose} className="absolute top-5 right-5 cursor-pointer p-2 hover:bg-gray-100 rounded-full text-gray-400 z-10">
          <X size={20} />
        </button>

        <div className="p-8 pb-0">
          <h2 className="text-2xl font-bold text-emerald-900">Tambah Produk</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Kolom Kiri: Image */}
          <div className="group relative border-2 border-dashed border-gray-200 rounded-3xl h-64 flex flex-col items-center justify-center bg-gray-50 overflow-hidden">
            {imagePreview && <img src={imagePreview} className="absolute inset-0 w-full h-full object-cover" alt="preview" />}
            <div className={`absolute inset-0 flex flex-col items-center justify-center ${imagePreview ? 'bg-black/20 opacity-0 group-hover:opacity-100' : ''}`}>
              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={handleImageChange} />
              <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-emerald-600"><Plus size={24} /></div>
            </div>
          </div>

          {/* Kolom Kanan: Inputs */}
          <div className="space-y-4">
            <input 
              required 
              placeholder="Nama Barang" 
              className="w-full px-4 py-3 text-gray-500 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            
            <select 
              className="w-full px-4 py-3 text-gray-500 bg-gray-100 rounded-xl outline-none"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="Tanaman Indoor">Tas Pria</option>
              <option value="Pot & Media Tanam">Tas Wanita</option>
              <option value="Suplemen Nutrisi">Backpack</option>
              <option value="Suplemen Nutrisi">Pouch</option>
              <option value="Suplemen Nutrisi">Wallet</option>
              <option value="Suplemen Nutrisi">Asesoris</option>
            </select>

            <div className="grid grid-cols-2 gap-4">
              <input 
                type="number" required placeholder="Harga" 
                className="w-full px-4 py-3 text-gray-500 bg-gray-100 rounded-xl outline-none"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
              />
              <input 
                type="number" required placeholder="Stok" 
                className="w-full px-4 py-3 text-gray-500 bg-gray-100 rounded-xl outline-none"
                value={formData.stock}
                onChange={(e) => setFormData({...formData, stock: e.target.value})}
              />
            </div>

            <textarea 
              placeholder="Deskripsi..." 
              className="w-full px-4 py-3 text-gray-500 bg-gray-100 rounded-xl h-24 resize-none outline-none"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />

            <button 
              disabled={loading}
              type="submit" 
              className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 disabled:bg-gray-400 transition-all cursor-pointer"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}