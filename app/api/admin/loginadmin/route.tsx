import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req) {
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

    // 🔥 Success login
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
    console.error(error);
    return Response.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}