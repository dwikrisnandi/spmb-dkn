import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function AdminWaves() {
  const settings = await prisma.webSetting.findFirst();
  const session = await getServerSession(authOptions);
  const waves = await prisma.wave.findMany({
      orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-slate-900 text-white shadow-xl flex flex-col hidden md:flex">
        <div className="p-4 border-b border-gray-800">
          <h1 className="text-xl font-bold text-white">{settings?.shortName || "SPMB DKN"}</h1>
          <p className="text-xs text-gray-400">Admin Control Panel</p>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <Link href="/admin/dashboard" className="block p-3 rounded-lg text-sm text-gray-300 hover:bg-slate-800">Dashboard</Link>
          <div className="pt-4 pb-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Verifikasi</p>
          </div>
          <Link href="/admin/payments" className="block p-3 rounded-lg text-sm text-gray-300 hover:bg-slate-800">Verifikasi Pembayaran</Link>
          <Link href="/admin/documents" className="block p-3 rounded-lg text-sm text-gray-300 hover:bg-slate-800">Verifikasi Dokumen & Data</Link>
          
          <div className="pt-4 pb-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Master Data</p>
          </div>
          <Link href="/admin/waves" className="block p-3 rounded-lg bg-slate-800 text-white font-medium text-sm">Gelombang Pendaftaran</Link>
          <Link href="/admin/prodi" className="block p-3 rounded-lg text-sm text-gray-300 hover:bg-slate-800">Program Studi</Link>
          <Link href="/admin/users" className="block p-3 rounded-lg text-sm text-gray-300 hover:bg-slate-800">Data User</Link>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b flex items-center justify-between px-6 z-10">
          <h2 className="text-xl font-semibold text-gray-800">Manajemen Gelombang</h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-600">Halo, {session?.user?.name || "Admin"}</span>
            <div className="h-8 w-8 bg-slate-800 rounded-full flex items-center justify-center text-white font-bold text-xs">AD</div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          <div className="mb-4 flex justify-between items-center">
             <p className="text-sm text-gray-600">Kelola batas waktu pendaftaran, ujian, dan gelombang aktif.</p>
             <button className="px-4 py-2 bg-red-700 text-white rounded-md text-sm font-medium hover:bg-red-800">Tambah Gelombang</button>
          </div>
          <div className="bg-white rounded-xl border shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm whitespace-nowrap">
                <thead className="tracking-wider border-b-2 border-gray-100 uppercase text-gray-500">
                  <tr>
                    <th className="px-6 py-3">Gelombang</th>
                    <th className="px-6 py-3">Tahun Akademik</th>
                    <th className="px-6 py-3">Masa Pendaftaran</th>
                    <th className="px-6 py-3">Tes Tulis</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {waves.length === 0 ? (
                    <tr><td colSpan={6} className="px-6 py-4 text-center text-gray-500">Belum ada data gelombang.</td></tr>
                  ) : (
                    waves.map((wave: any) => (
                      <tr key={wave.id.toString()} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">{wave.gelombang} ({wave.code})</td>
                        <td className="px-6 py-4 text-gray-700">{wave.tahunAkademik}</td>
                        <td className="px-6 py-4 text-gray-700">
                           {wave.awalDaftar ? new Date(wave.awalDaftar).toLocaleDateString("id-ID") : '-'} s/d <br />
                           {wave.akhirDaftar ? new Date(wave.akhirDaftar).toLocaleDateString("id-ID") : '-'}
                        </td>
                        <td className="px-6 py-4 text-gray-700">{wave.tesTulis ? new Date(wave.tesTulis).toLocaleDateString("id-ID") : '-'}</td>
                        <td className="px-6 py-4">
                           <span className={`px-2 py-1 rounded-full text-xs font-semibold ${wave.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                             {wave.active ? 'Aktif' : 'Non-Aktif'}
                           </span>
                        </td>
                        <td className="px-6 py-4">
                           <button className="text-red-700 hover:underline mr-3 font-medium">Edit</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
