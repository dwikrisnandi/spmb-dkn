"use client";

import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function PaymentSubmission() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: "250000",
    bank: "",
    accountName: "",
    accountNumber: "",
    date: "",
    code: `PAY-${Date.now()}`
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/payments/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
      });

      if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "Gagal submit pembayaran");
      }
      
      alert("Bukti pembayaran berhasil disubmit! Mohon tunggu verifikasi admin.");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md flex flex-col hidden md:flex">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-blue-600">SPMB DKN</h1>
          <p className="text-xs text-gray-500">Panel Calon Mahasiswa</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/dashboard" className="block p-3 rounded-lg text-gray-600 hover:bg-gray-50 font-medium">Dashboard</Link>
          <Link href="/dashboard/form" className="block p-3 rounded-lg text-gray-600 hover:bg-gray-50">Pengisian Formulir</Link>
          <Link href="/dashboard/documents" className="block p-3 rounded-lg text-gray-600 hover:bg-gray-50">Upload Dokumen</Link>
          <Link href="/dashboard/payment" className="block p-3 rounded-lg bg-blue-50 text-blue-700">Pembayaran</Link>
        </nav>
        <LogoutButton />
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white shadow-sm flex items-center px-6">
          <h2 className="text-xl font-semibold text-gray-800">Pembayaran Pendaftaran</h2>
        </header>

        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white p-8 rounded-xl border shadow-sm max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Instruksi Pembayaran</h3>
            <p className="text-sm text-gray-600 mb-6">
                Silakan transfer biaya registrasi sebesar <strong>Rp 250.000</strong> ke rekening berikut:
                <br /><strong>Bank BSI: 7123456789 a.n SPMB DKN</strong>
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 border-t pt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nominal Transfer (Rp)</label>
                <input type="number" name="amount" value={formData.amount} readOnly className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bank Pengirim</label>
                <input type="text" name="bank" required value={formData.bank} onChange={handleChange} placeholder="Contoh: BCA, Mandiri, BRI" className="w-full rounded-md border border-gray-300 px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Pemilik Rekening Pengirim</label>
                <input type="text" name="accountName" required value={formData.accountName} onChange={handleChange} className="w-full rounded-md border border-gray-300 px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Transfer</label>
                <input type="date" name="date" required value={formData.date} onChange={handleChange} className="w-full rounded-md border border-gray-300 px-3 py-2" />
              </div>

              <div className="mt-8 pt-4">
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-6 py-2 rounded-md font-medium text-sm bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400"
                >
                  {isLoading ? 'Menunggu...' : 'Konfirmasi Pembayaran'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
