"use client";

import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useSettings } from "@/components/SettingsProvider";

export default function UserExams() {
  const { data: session } = useSession();
  const settings = useSettings();
  const [examStarted, setExamStarted] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {!examStarted && (
        <aside className="w-64 bg-white shadow-md flex flex-col hidden md:flex">
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold text-blue-600">{settings?.shortName || "SPMB DKN"}</h1>
            <p className="text-xs text-gray-500">Panel Calon Mahasiswa</p>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <Link href="/dashboard" className="block p-3 rounded-lg text-gray-600 hover:bg-gray-50 font-medium">Dashboard</Link>
            <Link href="/dashboard/form" className="block p-3 rounded-lg text-gray-600 hover:bg-gray-50">Pengisian Formulir</Link>
            <Link href="/dashboard/documents" className="block p-3 rounded-lg text-gray-600 hover:bg-gray-50">Upload Dokumen</Link>
            <Link href="/dashboard/payment" className="block p-3 rounded-lg text-gray-600 hover:bg-gray-50">Pembayaran</Link>
            <Link href="/dashboard/exams" className="block p-3 rounded-lg bg-blue-50 text-blue-700">Ujian Online</Link>
          </nav>
          <LogoutButton />
        </aside>
      )}

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white shadow-sm flex items-center px-6 justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            {examStarted ? "Sedang Mengerjakan Ujian" : "Computer Based Test (CBT)"}
          </h2>
          {examStarted && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-bold">
              Sisa Waktu: 00:59:42
            </div>
          )}
        </header>

        <div className="flex-1 overflow-auto p-6">
          {!examStarted ? (
            <div className="bg-white p-8 rounded-xl border shadow-sm max-w-4xl mx-auto">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center p-3 bg-blue-100 text-blue-600 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-monitor-check"><path d="m9 10 2 2 4-4"/><rect width="20" height="14" x="2" y="3" rx="2"/><path d="M12 17v4"/><path d="M8 21h8"/></svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Ujian Saringan Masuk</h3>
                <p className="text-gray-500 mt-2">Pastikan koneksi internet Anda stabil. Ujian ini diawasi secara otomatis.</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Tata Tertib Ujian:</h4>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                  <li>Ujian terdiri dari beberapa soal pilihan ganda (TPA & Bidang Studi).</li>
                  <li>Waktu pengerjaan adalah 60 Menit. Timer akan otomatis berhenti jika waktu habis.</li>
                  <li>Dilarang membuka tab baru, merefresh halaman, atau menutup browser saat ujian berlangsung.</li>
                  <li>Jika terindikasi kecurangan, hasil ujian akan dianulir.</li>
                </ul>
              </div>

              <div className="flex justify-center">
                <button 
                  onClick={() => setExamStarted(true)}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 shadow-md transition"
                >
                  Mulai Ujian Sekarang
                </button>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto flex gap-6 h-full pb-10">
              <div className="flex-1 bg-white p-6 rounded-xl border shadow-sm flex flex-col">
                <div className="mb-4">
                  <span className="text-sm font-semibold text-gray-500">Soal No. 1 dari 50</span>
                  <h3 className="text-lg font-medium text-gray-900 mt-2">
                    Berapakah hasil dari 25% dari 2.000 + 150?
                  </h3>
                </div>
                <div className="space-y-3 flex-1 mt-6">
                  {["A. 500", "B. 550", "C. 650", "D. 700", "E. 750"].map((opt) => (
                    <label key={opt} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input type="radio" name="answer" className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                      <span className="ml-3 text-sm text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
                <div className="flex justify-between mt-8 pt-4 border-t">
                  <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium text-sm">Kembali</button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium text-sm">Soal Selanjutnya</button>
                </div>
              </div>
              
              {/* Navigasi Soal */}
              <div className="w-64 bg-white p-4 rounded-xl border shadow-sm h-fit">
                <h4 className="font-semibold text-gray-800 mb-3 text-sm">Navigasi Soal</h4>
                <div className="grid grid-cols-5 gap-2">
                  {Array.from({length: 50}).map((_, i) => (
                    <button key={i} className={`w-8 h-8 flex items-center justify-center rounded text-xs font-medium border
                      ${i === 0 ? 'bg-blue-600 text-white border-blue-600' : 
                        i < 5 ? 'bg-green-100 text-green-700 border-green-200' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}
                    `}>
                      {i + 1}
                    </button>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t">
                  <button onClick={() => setExamStarted(false)} className="w-full px-4 py-2 bg-red-600 text-white rounded-md text-sm font-bold hover:bg-red-700">
                    Selesaikan Ujian
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
