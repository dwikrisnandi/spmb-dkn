import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="px-4 lg:px-6 h-16 flex items-center shadow-sm bg-white">
        <Link className="flex items-center justify-center font-bold text-xl text-blue-600" href="/">
          SPMB DKN
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-blue-600 transition-colors" href="#">
            Beranda
          </Link>
          <Link className="text-sm font-medium hover:text-blue-600 transition-colors" href="#">
            Program Studi
          </Link>
          <Link className="text-sm font-medium hover:text-blue-600 transition-colors" href="#">
            Biaya
          </Link>
          <Link className="text-sm font-medium hover:text-blue-600 transition-colors" href="#">
            Kontak
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-blue-600">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Sistem Penerimaan Mahasiswa Baru
                </h1>
                <p className="mx-auto max-w-[700px] text-blue-100 md:text-xl">
                  Daftar sekarang dan raih masa depan cerah Anda bersama kami. Pendaftaran mahasiswa baru tahun akademik 2026/2027 telah dibuka!
                </p>
              </div>
              <div className="space-x-4">
                <Link
                  href="/register"
                  className="inline-flex h-11 items-center justify-center rounded-md bg-white px-8 py-2 text-sm font-medium text-blue-600 shadow transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                >
                  Daftar Sekarang
                </Link>
                <Link
                  href="/login"
                  className="inline-flex h-11 items-center justify-center rounded-md border border-white bg-transparent px-8 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                >
                  Login Calon Mahasiswa
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Tentang Kampus Kami</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center text-center space-y-4 p-6 border rounded-lg shadow-sm">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-graduation-cap"><path d="M21.42 10.922a2 2 0 0 1-.01 3.016l-7.13 7.19a2 2 0 0 1-2.81 0l-7.15-7.12a2 2 0 0 1-.01-3.006L11.3 4.29a2 2 0 0 1 2.82 0l7.3 6.632z"/><path d="M22 10v6"/><path d="M6 12v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-6"/></svg>
                </div>
                <h3 className="text-xl font-bold">Fasilitas Modern</h3>
                <p className="text-gray-500">Laboratorium, perpustakaan digital, dan ruang kelas yang dilengkapi dengan teknologi terkini.</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4 p-6 border rounded-lg shadow-sm">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open-text"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/><path d="M6 8h2"/><path d="M6 12h2"/><path d="M16 8h2"/><path d="M16 12h2"/></svg>
                </div>
                <h3 className="text-xl font-bold">Kurikulum Relevan</h3>
                <p className="text-gray-500">Materi pembelajaran yang disesuaikan dengan kebutuhan industri dan selalu diperbarui.</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4 p-6 border rounded-lg shadow-sm">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <h3 className="text-xl font-bold">Pengajar Profesional</h3>
                <p className="text-gray-500">Dosen berpengalaman yang ahli di bidangnya masing-masing siap membimbing Anda.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white">
        <p className="text-xs text-gray-500">
          © 2026 SPMB DKN. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-gray-500" href="#">
            Syarat & Ketentuan
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-gray-500" href="#">
            Kebijakan Privasi
          </Link>
        </nav>
      </footer>
    </div>
  );
}
