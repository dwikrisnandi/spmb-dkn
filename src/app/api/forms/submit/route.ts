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
    
    // Check if user already has a form submitted or in progress
    const existingForm = await prisma.form.findFirst({
        where: { userId }
    });

    if (existingForm) {
        // Update existing form
        const updatedForm = await prisma.form.update({
            where: { id: existingForm.id },
            data: {
                ...body,
                status: "submitted",
            }
        });
        return NextResponse.json({ message: "Formulir berhasil diupdate", form: updatedForm }, { status: 200 });
    } else {
        // Create new form
        const newForm = await prisma.form.create({
            data: {
                userId,
                ...body,
                status: "submitted",
                codeRegistration: `REG-${Date.now()}`
            }
        });
        return NextResponse.json({ message: "Formulir berhasil disubmit", form: newForm }, { status: 201 });
    }

  } catch (error) {
    console.error("Form submission error:", error);
    return NextResponse.json({ message: "Terjadi kesalahan sistem saat menyimpan formulir." }, { status: 500 });
  }
}
