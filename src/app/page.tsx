import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const settings = await prisma.webSetting.findFirst();
  
  const primacy = [
    { title: "Kampus Nyaman", description: "Kampus yang nyaman dan asri" },
    { title: "Fasilitas Lengkap", description: "Fasilitas yang lengkap dan modern" },
    { title: "Kampus Merdeka", description: "Mendukung kemandirian mahasiswa" },
    { title: "Tenaga Pengajar", description: "Tenaga pengajar yang mumpuni" },
    { title: "Lokasi Strategis", description: "Lokasi kampus yang strategis berada di pusat kota" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-slate-900 transition-all duration-300">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 px-6 lg:px-12 h-20 flex items-center shadow-sm bg-white/80 backdrop-blur-md border-b border-slate-100">
        <Link className="flex items-center gap-3 transition-transform hover:scale-105" href="/">
          {settings?.logo ? (
            <img src={`/images/${settings.logo}`} alt="Logo" className="w-10 h-10 object-contain" />
          ) : (
            <div className="w-10 h-10 bg-red-700 rounded-lg flex items-center justify-center text-white font-bold">P</div>
          )}
          <span className="font-black text-xl tracking-tighter text-slate-900 uppercase">
            {settings?.shortName || "SPMB DKN"}
          </span>
        </Link>
        <nav className="ml-auto hidden md:flex gap-8">
          <Link className="text-sm font-bold text-slate-600 hover:text-red-700 transition-colors uppercase tracking-widest" href="#">Beranda</Link>
          <Link className="text-sm font-bold text-slate-600 hover:text-red-700 transition-colors uppercase tracking-widest" href="#tentang">Profil</Link>
          <Link className="text-sm font-bold text-slate-600 hover:text-red-700 transition-colors uppercase tracking-widest" href="#alur">Alur</Link>
          <Link className="text-sm font-bold text-slate-600 hover:text-red-700 transition-colors uppercase tracking-widest" href="/login">Login</Link>
        </nav>
        <div className="ml-auto md:ml-8">
          <Link href="/register" className="px-6 py-2.5 bg-red-700 hover:bg-red-800 text-white rounded-xl font-bold text-sm shadow-lg shadow-red-200 transition-all">
            Daftar Sekarang
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-white">
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-red-50 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-72 h-72 bg-slate-100 rounded-full blur-3xl opacity-60"></div>

          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
              <div className="text-center lg:text-left space-y-8 animate-in fade-in slide-in-from-left duration-1000">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-700 text-xs font-black tracking-widest border border-red-100 uppercase">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                  </span>
                  PMB Telah Dibuka
                </div>
                
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
                    Bangun Karir IT Terbaik di <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-700 via-red-600 to-slate-900">
                      {settings?.institutionName || "Institusi Kami"}
                    </span>
                  </h1>
                  <p className="text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                    {settings?.institutionSynopsis || "Daftar sekarang dan raih masa depan cerah Anda bersama kami."}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link href="/register" className="px-8 py-4 bg-red-700 hover:bg-red-800 text-white rounded-2xl font-bold shadow-xl shadow-red-200 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1">
                    Daftar Sekarang
                  </Link>
                  <a href="#tentang" className="px-8 py-4 bg-white border-2 border-slate-200 hover:border-red-200 text-slate-700 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 hover:bg-slate-50">
                    Profil Kampus
                  </a>
                </div>
              </div>

              <div className="relative hidden lg:block animate-in fade-in zoom-in duration-1000">
                <div className="absolute -inset-4 bg-gradient-to-tr from-red-100 to-slate-200 rounded-3xl rotate-3 scale-95 opacity-50"></div>
                {settings?.cover ? (
                  <img 
                    src={`/images/${settings.cover}`} 
                    alt="Hero Image" 
                    className="relative rounded-3xl shadow-2xl transition-transform hover:scale-[1.02] duration-500 border-4 border-white object-cover aspect-[4/3] w-full"
                  />
                ) : (
                  <div className="relative rounded-3xl shadow-2xl bg-slate-200 aspect-[4/3] w-full border-4 border-white flex items-center justify-center">
                    <span className="text-slate-400 font-bold">Image Placeholder</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Advantage Section */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-red-700 font-bold tracking-widest uppercase text-xs">Prinsip Keunggulan</h2>
              <p className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                Mengapa Memilih {settings?.institutionShortName || "Kami"}?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {primacy.map((x, index) => (
                <div key={index} className="group p-8 bg-white rounded-3xl border border-slate-100 hover:border-red-200 shadow-sm hover:shadow-xl hover:shadow-red-500/5 transition-all duration-300 transform hover:-translate-y-2">
                  <div className="w-12 h-12 bg-red-50 text-red-700 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-700 group-hover:text-white transition-colors shadow-inner">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-lg mb-2 group-hover:text-red-700 transition-colors">{x.title}</h4>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">{x.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="tentang" className="py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8 animate-in fade-in slide-up duration-1000">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900">Mengenal Lebih Dekat</h2>
                  <div className="w-20 h-2 bg-red-700 rounded-full"></div>
                </div>
                
                <div className="space-y-6">
                  <div className="p-8 bg-slate-50 rounded-[2.5rem] border-l-8 border-red-700 shadow-sm transition-all hover:shadow-md">
                    <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                      Visi & Misi
                    </h3>
                    <p className="text-slate-600 leading-relaxed font-medium italic">
                      {settings?.institutionVision || "Visi dan misi institusi akan ditampilkan di sini."}
                    </p>
                  </div>
                  <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm transition-all hover:shadow-md">
                    <h3 className="text-xl font-black text-red-800 mb-4 uppercase tracking-tighter">Sejarah Kampus</h3>
                    <p className="text-slate-600 leading-relaxed font-medium">
                      {settings?.institutionHistory || "Sejarah singkat institusi akan ditampilkan di sini."}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="relative group cursor-pointer overflow-hidden rounded-[3rem] shadow-2xl aspect-video bg-slate-900">
                <img src="/images/thumbnail-video.jpg" className="absolute inset-0 w-full h-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-110" alt="Video Thumbnail" />
                <div className="absolute inset-0 bg-gradient-to-t from-red-900/40 to-transparent"></div>
                <div className="relative z-10 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-red-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-900 group-hover:text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step Section */}
        <section id="alur" className="py-24 bg-slate-900 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-700/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter">Alur Pendaftaran</h2>
              <p className="text-slate-400 mt-4 font-medium uppercase tracking-widest text-xs">Proses mudah dan transparan bagi calon mahasiswa</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 font-bold">
              {[
                { t: 'Daftar Akun', d: 'Buat akun di sistem PMB Online' },
                { t: 'Isi Data', d: 'Lengkapi biodata & berkas digital' },
                { t: 'Verifikasi', d: 'Validasi data oleh tim administrasi' },
                { t: 'Hasil', d: 'Pengumuman seleksi & daftar ulang' }
              ].map((step, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 text-center transition-all hover:border-red-500/50 hover:bg-white/10">
                  <div className="text-6xl font-black text-red-700 opacity-30 mb-4">{i + 1}</div>
                  <h3 className="text-xl font-black mb-2 uppercase">{step.t}</h3>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed">{step.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Help & Documents */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-10 bg-slate-900 rounded-[3rem] text-white space-y-8 relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 p-8 opacity-10 transition-transform group-hover:rotate-12 group-hover:scale-125">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                </div>
                <div className="space-y-4 relative z-10">
                  <h3 className="text-4xl font-black leading-tight">Butuh Bantuan <br/> Cepat?</h3>
                  <p className="text-slate-400 font-medium">Konsultasikan pendaftaranmu melalui layanan informasi kami.</p>
                </div>
                <div className="relative z-10">
                  <a href={`https://wa.me/${settings?.contactWhatsapp || "6285775870428"}`} target="_blank" className="inline-flex items-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-700 rounded-2xl font-black transition-all shadow-lg shadow-green-900/40 transform hover:-translate-y-1">
                    Chat Admin PMB
                  </a>
                </div>
              </div>

              <div className="p-10 bg-red-50 rounded-[3rem] space-y-8 border border-red-100 shadow-sm flex flex-col justify-between">
                <div className="space-y-4">
                  <h3 className="text-3xl font-black text-slate-900 leading-tight uppercase tracking-tighter">Dokumen PMB <br/> {settings?.institutionShortName || "Institusi"}</h3>
                  <p className="text-slate-600 font-bold">Download panduan resmi dan estimasi biaya perkuliahan.</p>
                </div>
                <div className="flex flex-wrap gap-4 font-black">
                  {settings?.brochure && (
                    <a href={`/assets/img/${settings.brochure}`} target="_blank" className="px-6 py-4 bg-red-700 hover:bg-red-800 text-white rounded-2xl transition-all shadow-xl shadow-red-100 flex items-center gap-2">
                      Brosur Digital
                    </a>
                  )}
                  {settings?.costDetails && (
                    <a href={`/assets/img/${settings.costDetails}`} target="_blank" className="px-6 py-4 bg-white border-2 border-red-200 text-red-700 hover:bg-red-50 rounded-2xl transition-all flex items-center gap-2">
                      Rincian Biaya
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-12 border-t border-slate-100 bg-white">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
             <span className="font-black text-lg tracking-tighter text-slate-900 uppercase">
                {settings?.siteName || "SPMB DKN"}
             </span>
             <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                © {new Date().getFullYear()} {settings?.institutionName || "Institusi"}. All rights reserved.
             </p>
          </div>
          <nav className="flex gap-8">
            <Link className="text-xs font-bold text-slate-500 hover:text-red-700 transition-colors uppercase tracking-widest" href="#">Syarat & Ketentuan</Link>
            <Link className="text-xs font-bold text-slate-500 hover:text-red-700 transition-colors uppercase tracking-widest" href="#">Kebijakan Privasi</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
