import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 🔥 GET ALL PRODUCT
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    return Response.json(products, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Gagal mengambil data produk" },
      { status: 500 }
    );
  }
}

// 🔥 CREATE PRODUCT
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, price, stock, image } = body;

    if (!name || !price || !stock) {
      return Response.json(
        { message: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        stock: parseInt(stock),
        image,
      },
    });

    return Response.json(product, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Gagal menambahkan produk" },
      { status: 500 }
    );
  }
}

// 🔥 UPDATE PRODUCT
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, name, price, stock, image } = body;

    if (!id) {
      return Response.json(
        { message: "ID wajib diisi" },
        { status: 400 }
      );
    }

    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name,
        price: price ? parseFloat(price) : undefined,
        stock: stock ? parseInt(stock) : undefined,
        image,
      },
    });

    return Response.json(product, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Gagal update produk" },
      { status: 500 }
    );
  }
}

// 🔥 DELETE PRODUCT
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return Response.json(
        { message: "ID wajib diisi" },
        { status: 400 }
      );
    }

    await prisma.product.delete({
      where: { id: Number(id) },
    });

    return Response.json(
      { message: "Produk berhasil dihapus" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Gagal hapus produk" },
      { status: 500 }
    );
  }
}