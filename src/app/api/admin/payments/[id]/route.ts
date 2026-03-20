import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !(session.user as any).roles.includes("admin")) {
        return NextResponse.json({ message: "Konfirmasi gagal: Hanya Admin yang diizinkan." }, { status: 403 });
    }

    const { id } = await params;
    const paymentId = BigInt(id);
    const body = await req.json();
    const { status } = body;

    if (!["approved", "rejected"].includes(status)) {
        return NextResponse.json({ message: "Status tidak valid." }, { status: 400 });
    }

    const updatedPayment = await prisma.payment.update({
        where: { id: paymentId },
        data: { status }
    });

    return NextResponse.json({ message: "Status pembayaran berhasil diupdate", payment: updatedPayment }, { status: 200 });

  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json({ message: "Terjadi kesalahan sistem saat memverifikasi pembayaran." }, { status: 500 });
  }
}
