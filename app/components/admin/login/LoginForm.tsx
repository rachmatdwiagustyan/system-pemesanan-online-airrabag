"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/loginadmin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#176A21] h-screen overflow-hidden flex items-center justify-center">
      <div className="bg-white lg:w-4/12 md:w-7/12 w-10/12 shadow-3xl rounded-xl relative">
        {/* Icon User Bagian Atas (Ganti dari Email ke User) */}
        <div className="bg-gray-800 shadow shadow-gray-200 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-4 md:p-8">
          <svg width="42" height="42" viewBox="0 0 24 24" fill="#FFF">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>

        <form onSubmit={handleLogin} className="p-12 md:p-24">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Welcome</h2>
          
          {/* Input Email */}
          <div className="flex items-center text-lg mb-6 md:mb-8 relative">
            <svg className="absolute ml-3" width="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"/>
            </svg>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-400 rounded pl-12 py-2 md:py-4 focus:outline-none w-full" 
              placeholder="Email" 
              required
            />
          </div>

          {/* Input Password */}
          <div className="flex items-center text-lg mb-6 md:mb-8 relative">
            <svg className="absolute ml-3" viewBox="0 0 24 24" width="24" fill="currentColor">
              <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z"/>
            </svg>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-400 rounded pl-12 py-2 md:py-4 focus:outline-none w-full" 
              placeholder="Password" 
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

          <button 
            type="submit"
            disabled={loading}
            className="bg-gradient-to-b from-green-700 to-green-900 font-medium p-2 md:p-4 text-white uppercase w-full rounded hover:opacity-90 transition shadow-lg"
          >
            {loading ? "Processing..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}