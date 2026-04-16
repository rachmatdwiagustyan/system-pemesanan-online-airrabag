"use client";

import { X, Camera, Mail, Shield, MapPin } from "lucide-react";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Header Modal */}
        <div className="relative h-32 bg-emerald-600">
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 p-2 bg-white/20 hover:bg-white/40 rounded-full text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Profile Info */}
        <div className="px-8 pb-8">
          <div className="relative -mt-16 mb-4">
            <div className="w-32 h-32 rounded-3xl border-4 border-white overflow-hidden bg-gray-200 shadow-md">
              <img 
                src="https://ui-avatars.com/api/?name=Ratri+S&background=10b981&color=fff&size=128" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-2 right-2 p-2 bg-emerald-500 text-white rounded-xl shadow-lg hover:bg-emerald-600 transition-transform hover:scale-110">
              <Camera size={18} />
            </button>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800">Ratri Siswidyarti W</h2>
            <p className="text-emerald-600 font-semibold flex items-center mt-1">
              <Shield size={14} className="mr-1" /> Owner & Master Florist
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center space-x-3 text-gray-600">
              <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
                <Mail size={18} className="text-gray-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter">Email Address</p>
                <p className="text-sm font-medium">ratri.siswidyarti@atelier.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-gray-600">
              <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
                <MapPin size={18} className="text-gray-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter">Location</p>
                <p className="text-sm font-medium">Yogyakarta, Indonesia</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <button 
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-200 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <button className="flex-1 px-4 py-3 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 transition-shadow hover:shadow-lg hover:shadow-emerald-200">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}