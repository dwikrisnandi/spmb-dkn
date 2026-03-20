import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import { prisma } from "@/lib/prisma";

export default async function UserDashboard() {
  const settings = await prisma.webSetting.findFirst();
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-white/80 backdrop-blur-xl border-r border-slate-100 flex flex-col hidden md:flex relative z-20">
        <div className="p-8 border-b border-slate-50">
          <div className="flex items-center gap-3 group cursor-pointer">
             <div className="w-10 h-10 bg-red-700 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-red-100 transition-transform group-hover:scale-110">P</div>
             <div className="flex flex-col">
                <h1 className="text-lg font-black text-slate-900 leading-tight uppercase tracking-tighter">{settings?.short_name || "SPMB"}</h1>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Student Panel</p>
             </div>
          </div>
        </div>
        <nav className="flex-1 p-6 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 text-red-700 font-black text-xs uppercase tracking-widest transition-all shadow-sm">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
             Dashboard
          </Link>
          {[
            { n: 'Formulir', h: '/dashboard/form', i: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
            { n: 'Dokumen', h: '/dashboard/documents', i: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12' },
            { n: 'Pembayaran', h: '/dashboard/payment', i: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z' },
            { n: 'Ujian', h: '/dashboard/exams', i: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' }
          ].map(x => (
            <Link key={x.n} href={x.h} className="flex items-center gap-3 p-4 rounded-2xl text-slate-500 hover:bg-slate-50 hover:text-red-700 font-bold text-xs uppercase tracking-widest transition-all">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-50 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={x.i} /></svg>
               {x.n}
            </Link>
          ))}
        </nav>
        <div className="p-6">
           <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6">
          <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-600">Halo, Calon Mahasiswa</span>
            <div className="h-8 w-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
              CM
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col justify-center items-center text-center">
              <span className="text-sm text-gray-500 mb-1">Status Pendaftaran</span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">Menunggu Pembayaran</span>
            </div>
            <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col justify-center items-center text-center">
              <span className="text-sm text-gray-500 mb-1">Kelengkapan Data</span>
              <span className="text-2xl font-bold text-gray-800">20%</span>
            </div>
            <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col justify-center items-center text-center">
              <span className="text-sm text-gray-500 mb-1">Jadwal Ujian</span>
              <span className="text-lg font-bold text-gray-800">Menunggu Verifikasi</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Langkah Pendaftaran</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold leading-none">1</div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Registrasi Akun (Selesai)</p>
                  <p className="text-xs text-gray-500">Anda telah berhasil membuat akun dan login.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-bold leading-none">2</div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Pembayaran Pendaftaran</p>
                  <p className="text-xs text-gray-500">Lakukan pembayaran registrasi untuk membuka akses pengisian formulir.</p>
                  <Link href="/dashboard/payment" className="mt-2 inline-block text-xs font-medium text-red-700 hover:underline">Bayar Sekarang &rarr;</Link>
                </div>
              </li>
              <li className="flex items-start opacity-60">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-bold leading-none">3</div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Pengisian Formulir Lengkap</p>
                  <p className="text-xs text-gray-500">Lengkapi biodata diri, data orang tua, dan riwayat sekolah.</p>
                </div>
              </li>
              <li className="flex items-start opacity-60">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-bold leading-none">4</div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Ujian Seleksi Online</p>
                  <p className="text-xs text-gray-500">Ikuti ujian TPA, wawancara, dan tes kesehatan jika diperlukan.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
