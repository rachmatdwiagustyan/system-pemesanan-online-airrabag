import { MoreHorizontal, Edit2 } from "lucide-react";

interface ProductProps {
  name: string;
  category: string;
  price: string;
  stock: number;
  image: string;
}

export default function ProductCard({ name, category, price, stock, image }: ProductProps) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative group">
      {/* Header Card */}
      <div className="flex justify-between items-center mb-3">
        <button className="flex items-center text-xs font-semibold text-emerald-600 hover:text-emerald-700">
          <Edit2 size={14} className="mr-1" /> Edit
        </button>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Product Image */}
      <div className="aspect-square w-full rounded-xl overflow-hidden bg-gray-50 mb-4">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
      </div>

      {/* Info */}
      <div className="space-y-1">
        <h3 className="font-bold text-gray-800 text-sm truncate">{name}</h3>
        <p className="text-[10px] text-gray-400 font-medium">{category}</p>
        
        <div className="flex justify-between items-end mt-3">
          <p className="font-bold text-emerald-700 text-sm">{price}</p>
          <div className={`text-[10px] font-bold px-2 py-1 rounded-md text-white shadow-sm ${
            stock > 0 ? 'bg-emerald-500' : 'bg-red-500'
          }`}>
            {stock}
          </div>
        </div>
      </div>
    </div>
  );
}