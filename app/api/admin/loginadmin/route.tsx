import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose"; // Pastikan sudah install: npm install jose
import { cookies } from "next/headers";

const prisma = new PrismaClient();

// Ambil secret dari .env, pastikan sudah ditambahkan di file .env
const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "rahasia_super_aman_123"
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // 🔥 Validasi input
    if (!email || !password) {
      return Response.json(
        { message: "Email dan password wajib diisi" },
        { status: 400 }
      );
    }

    // 🔥 Cari user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // 🔥 Jika user tidak ada
    if (!user) {
      return Response.json(
        { message: "User tidak ditemukan" },
        { status: 404 }
      );
    }

    // 🔥 Cek role ADMIN
    if (user.role !== "ADMIN") {
      return Response.json(
        { message: "Akses ditolak, bukan admin" },
        { status: 403 }
      );
    }

    // 🔥 Cek password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return Response.json(
        { message: "Password salah" },
        { status: 401 }
      );
    }

    // --- BAGIAN BARU: IMPLEMENTASI SESSION & COOKIE ---

    // 1. Buat Token JWT menggunakan jose
    const token = await new SignJWT({
      id: user.id,
      email: user.email,
      role: user.role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("2h") // Token mati dalam 2 jam
      .sign(secret);

    // 2. Set Cookie ke Browser
    const cookieStore = await cookies();
    cookieStore.set("session_token", token, {
      httpOnly: true, // Keamanan: tidak bisa diakses lewat script JS
      secure: process.env.NODE_ENV === "production", // Hanya lewat HTTPS di production
      maxAge: 60 * 60 * 2, // 2 Jam (dalam detik)
      path: "/", // Berlaku untuk seluruh route
      sameSite: "lax",
    });

    // 3. Success login
    return Response.json(
      {
        message: "Login berhasil",
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Login Error:", error);
    return Response.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}