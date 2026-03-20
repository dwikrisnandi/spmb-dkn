import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phone: phone || undefined }]
      }
    });

    if (existingUser) {
      return NextResponse.json({ message: "Email atau Nomor Telepon sudah terdaftar." }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        roles: JSON.stringify(["user"])
      },
    });

    return NextResponse.json(
      { message: "Registrasi berhasil", user: { id: newUser.id.toString(), email: newUser.email } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ message: "Terjadi kesalahan sistem saat registrasi." }, { status: 500 });
  }
}
