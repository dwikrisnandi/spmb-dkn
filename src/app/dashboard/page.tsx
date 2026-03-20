import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import { prisma } from "@/lib/prisma";

export default async function UserDashboard() {
  const settings = await prisma.webSetting.findFirst();
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col hidden md:flex">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-blue-600">{settings?.shortName || "SPMB DKN"}</h1>
          <p className="text-xs text-gray-500">Panel Calon Mahasiswa</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/dashboard" className="block p-3 rounded-lg bg-blue-50 text-blue-700 font-medium">Dashboard</Link>
          <Link href="/dashboard/form" className="block p-3 rounded-lg text-gray-600 hover:bg-gray-50">Pengisian Formulir</Link>
          <Link href="/dashboard/documents" className="block p-3 rounded-lg text-gray-600 hover:bg-gray-50">Upload Dokumen</Link>
          <Link href="/dashboard/payment" className="block p-3 rounded-lg text-gray-600 hover:bg-gray-50">Pembayaran</Link>
          <Link href="/dashboard/exams" className="block p-3 rounded-lg text-gray-600 hover:bg-gray-50">Ujian Online</Link>
        </nav>
        <LogoutButton />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6">
          <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-600">Halo, Calon Mahasiswa</span>
            <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
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
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold leading-none">1</div>
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
                  <Link href="/dashboard/payment" className="mt-2 inline-block text-xs font-medium text-blue-600 hover:underline">Bayar Sekarang &rarr;</Link>
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
