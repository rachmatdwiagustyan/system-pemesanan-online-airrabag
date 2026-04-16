import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">
          Sistem Pemesanan Online Airra Bag
        </h1>

        <p className="text-gray-600 mb-6">
          Silakan login untuk mengakses dashboard admin
        </p>

        <Link
          href="/admin/login"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Login Admin
        </Link>
      </div>
    </main>
  );
}