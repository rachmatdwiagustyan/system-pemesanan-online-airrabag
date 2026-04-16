"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Bell, Settings, User, LogOut, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation"; 
import ProfileModal from "./ProfileModal";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({ name: "Loading...", role: "" }); // 🔥 State baru
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // 🔥 Ambil data user saat komponen di-load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/admin/me");
        if (res.ok) {
          const data = await res.json();
          setUserData({ name: data.name, role: data.role });
        }
      } catch (err) {
        console.error("Gagal mengambil data user");
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/admin/logout", { method: "POST" });
      if (response.ok) {
        setIsDropdownOpen(false);
        window.location.href = "/admin/login"; 
      }
    } catch (error) {
      window.location.href = "/admin/login";
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="flex justify-between items-center mb-10 relative">
        <div className="flex items-center bg-gray-200/50 rounded-full px-4 py-2 w-96">
          <Search size={18} className="text-gray-400 mr-2" />
          <input type="text" placeholder="Search..." className="bg-transparent outline-none text-sm w-full" />
        </div>

        <div className="flex items-center space-x-6">
          <Bell size={20} className="text-gray-400 cursor-pointer" />
          <Settings size={20} className="text-gray-400 cursor-pointer" />
          
          <div className="relative" ref={dropdownRef}>
            <div 
              className="flex items-center space-x-3 border-l pl-6 cursor-pointer group"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="text-right">
                {/* 🔥 Ganti nama statis dengan userData.name */}
                <p className="text-sm font-bold text-emerald-900 leading-tight group-hover:text-emerald-600 transition-colors">
                  {userData.name}
                </p>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">
                  {userData.role || "Owner"}
                </p>
              </div>
              <div className="w-10 h-10 bg-gray-300 rounded-lg overflow-hidden border border-emerald-100">
                <img 
                  src={`https://ui-avatars.com/api/?name=${userData.name}&background=10b981&color=fff`} 
                  alt="avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
              <ChevronDown size={14} className={`text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </div>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-[60]">
                <button 
                  onClick={() => { setIsDropdownOpen(false); setIsModalOpen(true); }}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-600 hover:bg-emerald-50"
                >
                  <User size={16} />
                  <span className="font-medium">Profile Detail</span>
                </button>
                <div className="h-px bg-gray-100 my-1 mx-2" />
                <button 
                  className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <ProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}