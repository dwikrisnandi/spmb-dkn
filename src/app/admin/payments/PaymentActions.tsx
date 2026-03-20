"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PaymentActions({ paymentId }: { paymentId: string }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleAction = async (status: 'approved' | 'rejected') => {
        if (!confirm(`Apakah Anda yakin ingin ${status === 'approved' ? 'menyetujui' : 'menolak'} pembayaran ini?`)) {
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch(`/api/admin/payments/${paymentId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status })
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || "Gagal memproses pembayaran");
            }

            alert("Status pembayaran berhasil diupdate");
            router.refresh();
        } catch (error: any) {
            alert(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex space-x-2">
            <button 
                onClick={() => handleAction('approved')}
                disabled={isLoading}
                className="px-3 py-1 bg-green-600 text-white text-xs font-medium rounded hover:bg-green-700 disabled:opacity-50"
            >
                Setuju
            </button>
            <button 
                onClick={() => handleAction('rejected')}
                disabled={isLoading}
                className="px-3 py-1 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 disabled:opacity-50"
            >
                Tolak
            </button>
        </div>
    );
}
