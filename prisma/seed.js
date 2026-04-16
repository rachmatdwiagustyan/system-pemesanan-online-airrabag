import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("Admin berhasil dibuat");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });