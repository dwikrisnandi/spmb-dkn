import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const settings = await prisma.webSetting.findFirst();

  const primacy = [
    { title: "Kampus Nyaman", description: "Lingkungan belajar yang asri dan kondusif untuk konsentrasi maksimal.", icon: "leaf" },
    { title: "Fasilitas Lengkap", description: "Laboratorium modern, perpustakaan digital, dan smart classroom.", icon: "building" },
    { title: "Kampus Merdeka", description: "Program kurikulum yang fleksibel sesuai minat dan bakat mahasiswa.", icon: "star" },
    { title: "Tenaga Pengajar", description: "Dosen praktisi dan akademisi berpengalaman di bidang teknologi.", icon: "users" },
    { title: "Akses Karir", description: "Kemitraan luas dengan industri IT ternama untuk penyaluran kerja.", icon: "briefcase" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa] font-sans text-slate-900 overflow-x-hidden selection:bg-red-100 selection:text-red-700">
      {/* Decorative Blur Blobs */}
      <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] bg-red-100/30 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-slate-200/40 rounded-full blur-[100px] pointer-events-none z-0"></div>

      {/* Modern Glass Header */}
      <header className="fixed top-0 inset-x-0 z-[100] px-6 lg:px-16 h-20 flex items-center justify-between transition-all duration-300 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-[0_2px_20px_rgba(0,0,0,0.02)]">
        <Link className="flex items-center gap-3 transition-all hover:opacity-80 group" href="/">
          {settings?.logo ? (
            <img src={`/images/${settings.logo}`} alt="Logo" className="w-12 h-12 object-contain drop-shadow-sm" />
          ) : (
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-red-200">P</div>
          )}
          <div className="flex flex-col leading-none">
            <span className="font-extrabold text-[22px] tracking-tight text-slate-900 group-hover:text-red-700 transition-colors">
              {settings?.short_name || "SPMB DKN"}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400">Professional Education</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-12">
          {['Beranda', 'Tentang', 'Alur', 'Kontak'].map((item) => (
            <Link key={item} href={item === 'Beranda' ? '#' : `#${item.toLowerCase()}`} className="text-[13px] font-bold text-slate-500 hover:text-red-700 transition-all uppercase tracking-widest relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-700 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden sm:block text-sm font-bold text-slate-600 hover:text-red-700 px-4 py-2 transition-all uppercase tracking-widest">
            Login
          </Link>
          <Link href="/register" className="relative px-8 py-3.5 bg-slate-900 hover:bg-red-700 text-white rounded-2xl font-bold text-xs shadow-xl shadow-slate-200 transition-all transform hover:-translate-y-0.5 active:scale-95 uppercase tracking-widest">
            Join Now
          </Link>
        </div>
      </header>

      <main className="flex-1 relative z-10 pt-20">
        {/* Premium Hero Section */}
        <section className="relative min-h-[90vh] flex items-center py-20 px-6 lg:px-16 overflow-hidden">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-20">
              <div className="lg:col-span-7 space-y-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white shadow-[0_4px_15px_rgba(0,0,0,0.05)] border border-slate-100 text-red-700 text-[10px] font-black tracking-[0.2em] uppercase">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
                  </span>
                  Pendaftaran {new Date().getFullYear()} Terbuka
                </div>

                <div className="space-y-6">
                  <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1] tracking-tight">
                    Masa Depan <br /> IT Dimulai di <br />
                    <span className="relative inline-block mt-2">
                      <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-red-700 via-red-500 to-red-800">
                        {settings?.institution_name || "Institusi Kami"}
                      </span>
                      <span className="absolute bottom-2 left-0 w-full h-4 bg-red-50 -z-10 rotate-[-1deg]"></span>
                    </span>
                  </h1>
                  <p className="text-xl text-slate-500 leading-relaxed max-w-2xl font-medium tracking-tight">
                    {settings?.institution_synopsis || "Daftar sekarang dan bergabunglah dengan komunitas pembelajar paling inovatif untuk merancang masa depan karir digital Anda."}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-5 pt-4">
                  <Link href="/register" className="group px-10 py-5 bg-red-700 hover:bg-slate-900 text-white rounded-[2rem] font-bold shadow-2xl shadow-red-200 transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1 duration-300">
                    Daftar Sekarang
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </Link>
                  <a href="#tentang" className="group px-10 py-5 bg-white border border-slate-200 text-slate-800 rounded-[2rem] font-bold transition-all flex items-center justify-center gap-3 hover:bg-slate-50 hover:border-red-200 duration-300 shadow-sm">
                    Kenali Kami
                  </a>
                </div>

                <div className="flex items-center gap-6 pt-10 border-t border-slate-100 max-w-md">
                  <div className="flex -space-x-4">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-sm shadow-black/5">
                        <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="avatar" />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-slate-900 leading-none tracking-tight">3,400+ Students</span>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">Telah Terverifikasi</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 relative animate-in fade-in zoom-in duration-1000 delay-300">
                <div className="relative aspect-[4/5] w-full max-w-[450px] mx-auto overflow-hidden rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.12)] border-[12px] border-white ring-1 ring-slate-100">
                  {settings?.cover ? (
                    <img src={`/images/${settings.cover}`} alt="Hero" className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-110" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-100 to-white flex items-center justify-center">
                      <div className="flex flex-col items-center gap-4 grayscale opacity-20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        <span className="font-bold tracking-widest uppercase text-xs">Visual Assets Here</span>
                      </div>
                    </div>
                  )}
                  {/* Floating Elements */}
                  <div className="absolute top-10 right-[-30px] p-6 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/40 hidden xl:block animate-bounce duration-[3000ms]">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-2xl font-black text-red-700">A+</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Akreditasi</span>
                    </div>
                  </div>
                  <div className="absolute bottom-10 left-[-30px] p-5 bg-slate-900 rounded-3xl shadow-2xl hidden xl:flex items-center gap-4 transition-transform hover:scale-105 duration-300">
                    <div className="w-10 h-10 bg-red-700 rounded-2xl flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-white leading-none">Safe & Fast</span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Verified System</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Advantage Section - Modern Cards */}
        <section className="py-32 relative bg-white overflow-hidden">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-20 animate-in fade-in slide-in-from-bottom-10 duration-1000">
              <div className="space-y-4 max-w-2xl text-center lg:text-left">
                <span className="text-red-700 font-black tracking-[0.3em] uppercase text-xs">Why Pamitran?</span>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">
                  Kualitas Pendidikan Tinggi <br /> Tanpa Kompromi.
                </h2>
              </div>
              <p className="text-slate-500 font-medium max-w-sm text-center lg:text-right text-sm leading-relaxed">
                Kami menggabungkan kurikulum industri dengan fasilitas terbaik untuk mencetak lulusan yang siap bersaing di pasar kerja global.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
              {primacy.map((x, index) => (
                <div key={index} className="group relative p-10 bg-slate-50 rounded-[3rem] transition-all duration-500 hover:bg-white hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] hover:-translate-y-4">
                  <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mb-10 shadow-sm group-hover:bg-red-700 group-hover:text-white transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <h4 className="font-black text-slate-900 text-xl mb-4 leading-tight group-hover:text-red-700 transition-colors">{x.title}</h4>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed group-hover:text-slate-600 transition-colors">{x.description}</p>
                  <div className="mt-8 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="text-[10px] font-black text-red-700 uppercase tracking-widest flex items-center gap-2">Read More <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section - Layered Minimalist */}
        <section id="tentang" className="py-32 bg-[#fafafa]">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="relative group overflow-hidden rounded-[4rem] shadow-2xl aspect-video bg-slate-900 order-2 lg:order-1">
                <img src="/images/thumbnail-video.jpg" className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-[3s] group-hover:scale-125" alt="Campus Video" />
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/80 to-transparent"></div>
                <div className="absolute bottom-10 left-10 text-white z-10">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-400">Official Video</span>
                  <p className="text-lg font-bold mt-1">Tour Kampus & Fasilitas Kami</p>
                </div>
                <button className="absolute inset-0 flex items-center justify-center group/btn z-20">
                  <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-500 scale-90 group-hover/btn:scale-110 group-hover/btn:bg-red-700 group-hover/btn:shadow-2xl group-hover/btn:shadow-red-500/50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 ml-2" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </button>
              </div>

              <div className="space-y-12 order-1 lg:order-2">
                <div className="space-y-4">
                  <span className="text-red-700 font-black tracking-[0.3em] uppercase text-xs">Mengenal Institusi</span>
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">Tradisi Kecemerlangan <br /> Dimulai dari Sini.</h2>
                  <div className="w-24 h-2.5 bg-red-700 rounded-full mt-6"></div>
                </div>

                <div className="space-y-10">
                  <div className="space-y-3">
                    <h3 className="text-sm font-black text-red-800 uppercase tracking-widest">Sejarah & Perjalanan</h3>
                    <p className="text-slate-500 leading-relaxed font-medium">
                      {settings?.institution_history || "Institusi kami berdiri dengan dedikasi tinggi untuk pendidikan berkualitas..."}
                    </p>
                  </div>
                  <div className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-black/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full -translate-y-1/2 translate-x-1/2 transition-transform group-hover:scale-150 duration-500"></div>
                    <h3 className="text-lg font-black text-slate-900 mb-4 relative z-10 flex items-center gap-3 italic">
                      <span className="text-red-700 not-italic uppercase font-black text-xl">Visi</span>
                      & Misi Kami
                    </h3>
                    <p className="text-slate-500 leading-relaxed font-semibold italic text-lg relative z-10">
                      "{settings?.institution_vision_mission || "Visi institusi kami adalah mencetak pemimpin masa depan di era digital."}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step Section - Sleek Timeline */}
        <section id="alur" className="py-32 bg-slate-900 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-800/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-[150px] opacity-20"></div>

          <div className="container mx-auto px-6 lg:px-16 relative z-10">
            <div className="max-w-3xl mb-24">
              <span className="text-red-500 font-black tracking-[0.3em] uppercase text-xs">Join Us</span>
              <h2 className="text-4xl md:text-5xl font-black mt-4 tracking-tighter leading-tight">Mulai Perjalanan Anda <br /> Hanya dalam 4 Tahap.</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { t: 'Daftar Akun', d: 'Buat kunci akses untuk memasuki dashboard PMB eksklusif kami.' },
                { t: 'Lengkapi Data', d: 'Isi biodata & unggah dokumen pendukung secara digital.' },
                { t: 'Verifikasi', d: 'Tim kami akan memproses data Anda dengan cepat dan transparan.' },
                { t: 'Daftar Ulang', d: 'Selamat! Selesaikan administrasi dan resmilah jadi mahasiswa.' }
              ].map((step, i) => (
                <div key={i} className="group relative p-12 bg-white/5 backdrop-blur-md rounded-[3.5rem] border border-white/5 transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:-translate-y-2">
                  <span className="text-7xl font-black text-red-700/20 group-hover:text-red-600/40 transition-colors duration-500 mb-6 block leading-none">{i + 1}</span>
                  <h3 className="text-xl font-black mb-4 uppercase tracking-tighter group-hover:text-red-500 transition-colors">{step.t}</h3>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed mb-6">{step.d}</p>
                  <div className="w-10 h-1 bg-red-900 group-hover:w-full group-hover:bg-red-700 transition-all duration-500"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action - Bento Box Style */}
        <section id="kontak" className="py-32 bg-white">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3 p-12 md:p-16 bg-slate-900 rounded-[4rem] text-white flex flex-col justify-between items-start gap-12 relative overflow-hidden group shadow-2xl">
                <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-red-700/20 rounded-full blur-[80px] group-hover:scale-150 duration-700"></div>
                <div className="space-y-6 relative z-10 w-full max-w-xl">
                  <span className="text-red-500 font-black tracking-[0.3em] uppercase text-xs">Information Center</span>
                  <h3 className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tighter">Butuh Konsultasi <br /> Masalah Kampus?</h3>
                  <p className="text-slate-400 font-medium text-lg lg:text-xl">Admin kami siap membantu menjawab pertanyaan Anda seputar program studi, beasiswa, dan biaya kuliah.</p>
                </div>
                <div className="relative z-10 group/btn flex items-center gap-6 flex-wrap">
                  <a href={`https://wa.me/${settings?.contact_whatsapp || "6285775870428"}`} target="_blank" className="px-10 py-5 bg-green-600 hover:bg-white hover:text-green-700 rounded-full font-black transition-all shadow-xl shadow-green-900/20 flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.417-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.305 1.652zm6.599-3.835c1.406.836 2.067 1.218 3.321 1.219 5.401 0 9.805-4.403 9.807-9.805a9.75 9.75 0 0 0-2.859-6.932 9.755 9.755 0 0 0-6.933-2.863c-5.401 0-9.804 4.403-9.807 9.806-.001 2.04.534 3.313 1.348 4.717l-.989 3.612 3.712-.974zm12.333-6.427c-.314-.158-1.859-.917-2.146-1.022-.288-.105-.497-.158-.707.158-.209.315-.812 1.022-1.047 1.258-.235.236-.47.263-.784.105-.314-.158-1.326-.488-2.527-1.558-.934-.833-1.565-1.862-1.748-2.177-.183-.315-.02-.485.137-.642.142-.141.314-.368.471-.552.157-.184.209-.315.314-.526.105-.21.053-.394-.026-.552-.079-.158-.707-1.705-.969-2.335-.255-.615-.514-.532-.707-.541-.183-.008-.393-.01-.603-.01s-.552.079-.838.394c-.288.315-1.1.1 .075-1.1 2.417s.471 2.502.471 2.502c4.215 1.83 2.094 3.308 3.3 3.308s2.304-1.47 2.304-2.1c0 0 .157.079 0z" /></svg>
                    WhatsApp Kami
                  </a>
                  <span className="text-slate-500 font-bold uppercase tracking-tight hidden sm:block">Open 24/7 Service</span>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-8 flex flex-col items-stretch">
                <div className="p-12 bg-red-100 rounded-[4rem] text-red-900 space-y-6 flex flex-col justify-between flex-1 hover:bg-red-200 transition-all duration-300">
                  <div className="space-y-4">
                    <h3 className="text-3xl font-black leading-tight tracking-tighter uppercase">Dokumen <br /> PMB Digital</h3>
                    <p className="text-red-700/70 font-bold text-sm leading-relaxed tracking-tight">Dapatkan informasi komprehensif mengenai kurikulum dan perkiraan beban biaya.</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    {settings?.brochure && (
                      <a href={`/assets/img/${settings.brochure}`} target="_blank" className="px-8 py-4 bg-white hover:bg-slate-900 hover:text-white text-red-700 rounded-3xl font-black transition-all flex items-center justify-between shadow-xl shadow-red-500/10">
                        Brosur Digital
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      </a>
                    )}
                    {settings?.cost_details && (
                      <a href={`/assets/img/${settings.cost_details}`} target="_blank" className="px-8 py-4 bg-red-700 hover:bg-slate-900 text-white rounded-3xl font-black transition-all flex items-center justify-between shadow-xl shadow-red-500/10">
                        Rincian Biaya
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Premium Minimal Footer */}
      <footer className="py-20 px-6 lg:px-16 bg-white border-t border-slate-100 relative z-10 overflow-hidden">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-20">
            <div className="space-y-6 max-w-sm text-center lg:text-left mx-auto lg:mx-0">
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-xs uppercase tracking-tighter">P</div>
                <span className="font-extrabold text-xl tracking-tighter text-slate-900 uppercase">
                  {settings?.short_name || "SPMB DKN"}
                </span>
              </div>
              <p className="text-slate-400 text-sm font-medium leading-relaxed uppercase tracking-tighter">
                Mencetak inovator digital masa depan dengan standar pendidikan praktis dan kurikulum industri terkini.
              </p>
              <div className="flex items-center gap-4 justify-center lg:justify-start">
                {['twitter', 'facebook', 'instagram', 'linkedin'].map(social => (
                  <div key={social} className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-red-700 hover:text-white transition-all cursor-pointer">
                    <i className={`fa-brands fa-${social}`}></i>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-12 w-full lg:w-auto text-center sm:text-left">
              {[
                { t: 'Program', l: ['Teknik Informatika', 'Sistem Informasi', 'Manajemen Informatika'] },
                { t: 'Kampus', l: ['Tentang Kami', 'Fasilitas', 'Beasiswa'] },
                { t: 'Tautan', l: ['Syarat & Ketentuan', 'Kebijakan Privasi', 'Help Center'] },
                { t: 'Kontak', l: [`WA: ${settings?.contact_whatsapp || "-"}`, `Email: info@pamitran.ac.id`] }
              ].map(group => (
                <div key={group.t} className="space-y-6">
                  <h5 className="font-black text-[10px] uppercase tracking-[0.3em] text-red-700">{group.t}</h5>
                  <ul className="space-y-3">
                    {group.l.map(link => (
                      <li key={link}><Link href="#" className="text-slate-500 hover:text-red-700 text-sm font-bold transition-all tracking-tight">{link}</Link></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 pt-10 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              © {new Date().getFullYear()} {settings?.institution_name || "STMIK Pamitran"}. All rights reserved.
            </p>
            <div className="flex items-center gap-8">
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Handcrafted by DKN Team</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
