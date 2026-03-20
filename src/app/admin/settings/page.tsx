import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function AdminSettings() {
  const session = await getServerSession(authOptions);
  
  // Get first web setting or null
  const setting = await prisma.webSetting.findFirst();

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-slate-900 text-white shadow-xl flex flex-col hidden md:flex">
        <div className="p-4 border-b border-gray-800">
          <h1 className="text-xl font-bold text-white">{setting?.short_name || "SPMB DKN"}</h1>
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
          <Link href="/admin/waves" className="block p-3 rounded-lg text-sm text-gray-300 hover:bg-slate-800">Gelombang Pendaftaran</Link>
          <Link href="/admin/prodi" className="block p-3 rounded-lg text-sm text-gray-300 hover:bg-slate-800">Program Studi</Link>
          <Link href="/admin/users" className="block p-3 rounded-lg text-sm text-gray-300 hover:bg-slate-800">Data User</Link>
          <Link href="/admin/settings" className="block p-3 rounded-lg bg-slate-800 text-white font-medium text-sm">Web Settings</Link>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b flex items-center justify-between px-6 z-10">
          <h2 className="text-xl font-semibold text-gray-800">Pengaturan Website</h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-600">Halo, {session?.user?.name || "Admin"}</span>
            <div className="h-8 w-8 bg-slate-800 rounded-full flex items-center justify-center text-white font-bold text-xs">AD</div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl bg-white p-8 rounded-xl border shadow-sm mx-auto">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-6">Informasi Kampus & Institusi</h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Institusi</label>
                  <input type="text" defaultValue={setting?.institution_name || "Universitas Singaperbangsa Karawang"} className="w-full rounded-md border border-gray-300 px-3 py-2 bg-gray-50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Singkatan Institusi</label>
                  <input type="text" defaultValue={setting?.institution_short_name || "UNSIKA"} className="w-full rounded-md border border-gray-300 px-3 py-2 bg-gray-50" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Kontak</label>
                  <textarea defaultValue={setting?.contact_address || "Jl. HS.Ronggo Waluyo, Puseurjaya, Telukjambe Timur, Karawang"} className="w-full rounded-md border border-gray-300 px-3 py-2 bg-gray-50" rows={2}></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Kontak</label>
                  <input type="email" defaultValue={setting?.contact_email || "info@unsika.ac.id"} className="w-full rounded-md border border-gray-300 px-3 py-2 bg-gray-50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telepon Kontak</label>
                  <input type="text" defaultValue={setting?.contact_telp || "(0267) 641177"} className="w-full rounded-md border border-gray-300 px-3 py-2 bg-gray-50" />
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-6 mt-8">Rekening Pembayaran Default</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bank</label>
                  <input type="text" defaultValue={setting?.payment_bank || "Bank BSI"} className="w-full rounded-md border border-gray-300 px-3 py-2 bg-gray-50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Atas Nama</label>
                  <input type="text" defaultValue={setting?.payment_name || "SPMB UNSIKA"} className="w-full rounded-md border border-gray-300 px-3 py-2 bg-gray-50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Rekening</label>
                  <input type="text" defaultValue={setting?.payment_account || "7123456789"} className="w-full rounded-md border border-gray-300 px-3 py-2 bg-gray-50" />
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                  <button type="button" className="px-6 py-2 bg-red-700 text-white rounded-md font-medium text-sm hover:bg-red-800">
                    Simpan Perubahan
                  </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
