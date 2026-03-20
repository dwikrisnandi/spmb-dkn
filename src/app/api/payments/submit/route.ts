import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !(session.user as any).id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = BigInt((session.user as any).id);
    const body = await req.json();
    const { amount, bank, accountName, accountNumber, date, code } = body;

    const newPayment = await prisma.payment.create({
        data: {
            userId,
            amount: amount.toString(),
            bank,
            accountName,
            accountNumber,
            date: new Date(date).toISOString(),
            code,
            typePayment: "form",
            status: "pending"
        }
    });

    return NextResponse.json({ message: "Pembayaran berhasil disubmit", payment: newPayment }, { status: 201 });

  } catch (error) {
    console.error("Payment submission error:", error);
    return NextResponse.json({ message: "Terjadi kesalahan sistem saat menyimpan data pembayaran." }, { status: 500 });
  }
}
