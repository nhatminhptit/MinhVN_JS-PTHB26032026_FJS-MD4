import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "./generated/prisma/client/client.ts";
import dotenv from "dotenv";
dotenv.config();

const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("=== BẮT ĐẦU CHẠY PRISMA CRUD ===");

  console.log("\n[1] Tạo Author và 2 Books...");
  const newAuthor = await prisma.author.create({
    data: {
      name: "Vũ Nhật Minh",
      books: {
        create: [
          { title: "Tài liệu Fullstack JavaScript", price: 150000 },
          { title: "Bí kíp sinh tồn tại PTIT", price: 95000 },
        ],
      },
    },
  });
  console.log("=> Đã tạo:", newAuthor);

  console.log("\n[2] Đọc danh sách Author kèm Books...");
  const authorsWithBooks = await prisma.author.findMany({
    include: {
      books: true,
    },
  });
  console.dir(authorsWithBooks, { depth: null });

  console.log("\n[3] Cập nhật giá của một Book...");
  const bookToUpdateId = authorsWithBooks[0].books[0].id;
  const updatedBook = await prisma.book.update({
    where: { id: bookToUpdateId },
    data: { price: 200000 },
  });
  console.log(`=> Đã cập nhật giá cho sách ID ${bookToUpdateId}:`, updatedBook);

  console.log("\n[4] Xóa Book với ID không tồn tại và bắt lỗi...");
  const fakeId = 99999;
  try {
    await prisma.book.delete({
      where: { id: fakeId },
    });
    console.log("Xóa thành công!");
  } catch (error) {
    if (error.code === "P2025") {
      console.log(
        `=> [BẮT LỖI]: Không thể xóa. Không tìm thấy Book nào có ID = ${fakeId}`,
      );
    } else {
      console.log("=> [LỖI KHÁC]:", error.message);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
