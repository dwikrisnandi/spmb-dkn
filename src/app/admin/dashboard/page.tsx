import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function AdminDashboard() {
  const settings = await prisma.webSetting.findFirst();
  const session = await getServerSession(authOptions);
  
  // Real DB Stats
  const totalUsersCount = await prisma.user.count({ where: { roles: { contains: "user" } } });
  const pendingPaymentsCount = await prisma.payment.count({ where: { status: "pending" } });
  const approvedFormsCount = await prisma.form.count({ where: { status: "approved" } });

  // Get latest 5 users
  const recentUsers = await prisma.user.findMany({
    where: { roles: { contains: "user" } },
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: {
      payments: { orderBy: { createdAt: 'desc' }, take: 1 }
    }
  });

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Admin */}
      <aside className="w-64 bg-slate-900 text-white shadow-xl flex flex-col hidden md:flex">
        <div className="p-4 border-b border-gray-800">
          <h1 className="text-xl font-bold text-white">{settings?.short_name || "SPMB DKN"}</h1>
          <p className="text-xs text-gray-400">Admin Control Panel</p>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <Link href="/admin/dashboard" className="block p-3 rounded-lg bg-slate-800 text-white font-medium text-sm">Dashboard</Link>
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
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-6 z-10">
          <h2 className="text-xl font-semibold text-gray-800">Overview Panel</h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-600">Halo, {session?.user?.name || "Admin"}</span>
            <div className="h-8 w-8 bg-slate-800 rounded-full flex items-center justify-center text-white font-bold text-xs">
              AD
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <span className="text-sm text-gray-500 font-medium">Total Calon Mahasiswa</span>
              <div className="mt-2 text-3xl font-bold text-gray-900">{totalUsersCount}</div>
            </div>
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <span className="text-sm text-gray-500 font-medium">Menunggu Verifikasi Pembayaran</span>
              <div className="mt-2 text-3xl font-bold text-yellow-600">{pendingPaymentsCount}</div>
            </div>
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <span className="text-sm text-gray-500 font-medium">Formulir Disetujui</span>
              <div className="mt-2 text-3xl font-bold text-green-600">{approvedFormsCount}</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Pendaftar Terbaru</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm whitespace-nowrap">
                <thead className="tracking-wider border-b-2 border-gray-100 uppercase text-gray-500">
                  <tr>
                    <th className="px-6 py-3">Nama</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Status Pembayaran</th>
                    <th className="px-6 py-3">Tgl Daftar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentUsers.length === 0 ? (
                    <tr><td colSpan={4} className="px-6 py-4 text-center text-gray-500">Belum ada pendaftar</td></tr>
                  ) : (
                    recentUsers.map((user: any) => (
                      <tr key={user.id.toString()} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                        <td className="px-6 py-4 text-gray-500">{user.email}</td>
                        <td className="px-6 py-4">
                          {user.payments.length > 0 ? (
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.payments[0].status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                              {user.payments[0].status === 'approved' ? 'Lunas' : 'Menunggu Cek'}
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-semibold">Belum Bayar</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-gray-500">
                          {new Date(user.createdAt!).toLocaleDateString("id-ID")}
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
