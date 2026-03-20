import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PaymentActions from "@/app/admin/payments/PaymentActions";

export default async function AdminPayments() {
  const session = await getServerSession(authOptions);
  
  // Get all payments
  const payments = await prisma.payment.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: true
    }
  });

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Admin */}
      <aside className="w-64 bg-slate-900 text-white shadow-xl flex flex-col hidden md:flex">
        <div className="p-4 border-b border-gray-800">
          <h1 className="text-xl font-bold text-white">SPMB DKN</h1>
          <p className="text-xs text-gray-400">Admin Control Panel</p>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <Link href="/admin/dashboard" className="block p-3 rounded-lg text-sm text-gray-300 hover:bg-slate-800">Dashboard</Link>
          <div className="pt-4 pb-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Verifikasi</p>
          </div>
          <Link href="/admin/payments" className="block p-3 rounded-lg bg-slate-800 text-white font-medium text-sm">Verifikasi Pembayaran</Link>
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
          <h2 className="text-xl font-semibold text-gray-800">Verifikasi Pembayaran</h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-600">Halo, {session?.user?.name || "Admin"}</span>
            <div className="h-8 w-8 bg-slate-800 rounded-full flex items-center justify-center text-white font-bold text-xs">
              AD
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Daftar Transaksi Pembayaran</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm whitespace-nowrap">
                <thead className="tracking-wider border-b-2 border-gray-100 uppercase text-gray-500">
                  <tr>
                    <th className="px-6 py-3">Pendaftar</th>
                    <th className="px-6 py-3">Bank & Atas Nama</th>
                    <th className="px-6 py-3">Nominal</th>
                    <th className="px-6 py-3">Tanggal Transfer</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {payments.length === 0 ? (
                    <tr><td colSpan={6} className="px-6 py-4 text-center text-gray-500">Belum ada transaksi pembayaran</td></tr>
                  ) : (
                    payments.map((payment: any) => (
                      <tr key={payment.id.toString()} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {payment.user.name} <br/>
                          <span className="text-xs text-gray-500 font-normal">{payment.user.email}</span>
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                           {payment.bank} <br/>
                           <span className="text-xs text-gray-500">a.n {payment.accountName} ({payment.accountNumber})</span>
                        </td>
                        <td className="px-6 py-4 text-gray-900 font-medium">Rp {parseInt(payment.amount || "0").toLocaleString('id-ID')}</td>
                        <td className="px-6 py-4 text-gray-500">
                          {new Date(payment.date!).toLocaleDateString("id-ID")}
                        </td>
                        <td className="px-6 py-4">
                           <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                             payment.status === 'approved' ? 'bg-green-100 text-green-700' :
                             payment.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                           }`}>
                             {payment.status === 'approved' ? 'Disetujui' : payment.status === 'rejected' ? 'Ditolak' : 'Pending'}
                           </span>
                        </td>
                        <td className="px-6 py-4">
                           {payment.status === 'pending' && (
                               <PaymentActions paymentId={payment.id.toString()} />
                           )}
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
