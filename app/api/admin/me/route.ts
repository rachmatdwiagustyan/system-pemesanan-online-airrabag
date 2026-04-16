import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const secret = new TextEncoder().encode(process.env.JWT_SECRET || "rahasia_super_aman_123");

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token")?.value;

    if (!token) return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

    // 1. Dekripsi token untuk dapatkan ID User
    const { payload } = await jwtVerify(token, secret);
    const userId = payload.id as number;

    // 2. Ambil data TERBARU dari Database berdasarkan ID
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        role: true,
        email: true,
      }
    });

    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    // 3. Kembalikan data terbaru
    return NextResponse.json(user);
    
  } catch (error) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}