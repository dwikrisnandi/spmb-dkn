import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function AdminExams() {
  const session = await getServerSession(authOptions);
  const exams = await prisma.exam.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { examQuestions: true }
        }
      }
  });

  return (
    <div className="flex h-screen bg-gray-50">
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
          <Link href="/admin/payments" className="block p-3 rounded-lg text-sm text-gray-300 hover:bg-slate-800">Verifikasi Pembayaran</Link>
          <Link href="/admin/documents" className="block p-3 rounded-lg text-sm text-gray-300 hover:bg-slate-800">Verifikasi Dokumen & Data</Link>
          
          <div className="pt-4 pb-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Ujian & Seleksi</p>
          </div>
          <Link href="/admin/exams" className="block p-3 rounded-lg bg-slate-800 text-white font-medium text-sm">Bank Soal & Ujian</Link>
          <Link href="/admin/interviews" className="block p-3 rounded-lg text-sm text-gray-300 hover:bg-slate-800">Jadwal Wawancara</Link>

          <div className="pt-4 pb-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Master Data</p>
          </div>
          <Link href="/admin/waves" className="block p-3 rounded-lg text-sm text-gray-300 hover:bg-slate-800">Gelombang Pendaftaran</Link>
          <Link href="/admin/prodi" className="block p-3 rounded-lg text-sm text-gray-300 hover:bg-slate-800">Program Studi</Link>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b flex items-center justify-between px-6 z-10">
          <h2 className="text-xl font-semibold text-gray-800">Modul Ujian & Bank Soal</h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-600">Halo, {session?.user?.name || "Admin"}</span>
            <div className="h-8 w-8 bg-slate-800 rounded-full flex items-center justify-center text-white font-bold text-xs">AD</div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          <div className="mb-4 flex justify-between items-center">
             <p className="text-sm text-gray-600">Kelola paket soal Computer Based Test (CBT) untuk calon mahasiswa.</p>
             <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">Buat Paket Ujian Baru</button>
          </div>
          <div className="bg-white rounded-xl border shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm whitespace-nowrap">
                <thead className="tracking-wider border-b-2 border-gray-100 uppercase text-gray-500">
                  <tr>
                    <th className="px-6 py-3">Nama Paket Ujian</th>
                    <th className="px-6 py-3">Durasi</th>
                    <th className="px-6 py-3">Jumlah Soal</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {exams.length === 0 ? (
                    <tr><td colSpan={5} className="px-6 py-4 text-center text-gray-500">Belum ada paket ujian. Silakan buat baru.</td></tr>
                  ) : (
                    exams.map((exam: any) => (
                      <tr key={exam.id.toString()} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">{exam.name} <br/><span className="text-xs text-gray-500">{exam.description?.substring(0, 30)}...</span></td>
                        <td className="px-6 py-4 text-gray-700">{exam.duration} Menit</td>
                        <td className="px-6 py-4 text-gray-700">
                           <span className="font-bold">{exam._count.examQuestions}</span> Butir
                        </td>
                        <td className="px-6 py-4">
                           <span className={`px-2 py-1 rounded-full text-xs font-semibold ${exam.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                             {exam.isActive ? 'Bisa Dikerjakan' : 'Ditutup'}
                           </span>
                        </td>
                        <td className="px-6 py-4">
                           <button className="text-blue-600 hover:underline mr-3 font-medium">Kelola Soal</button>
                           <button className="text-blue-600 hover:underline mr-3 font-medium">Edit</button>
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
