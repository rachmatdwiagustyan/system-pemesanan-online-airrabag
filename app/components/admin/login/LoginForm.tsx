"use client";

import { useState } from "react";
import LoginInput from "./LoginInput";
import LoginButton from "./LoginButton";
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      // 🔥 nanti bisa simpan token di sini
      console.log("Login success:", data);

      // redirect ke dashboard
      router.push("/admin");

    } catch (err: any) {
      setError(err.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="bg-white p-6 rounded-2xl shadow-md w-80"
    >
      <h2 className="text-xl font-bold mb-4 text-center">
        Login Admin
      </h2>

      <LoginInput
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
      />

      <LoginInput
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
      />

      {error && (
        <p className="text-red-500 text-sm mb-2">{error}</p>
      )}

      <LoginButton loading={loading} />
    </form>
  );
}