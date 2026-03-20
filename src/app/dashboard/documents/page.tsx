"use client";

import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useSettings } from "@/components/SettingsProvider";

export default function DocumentUpload() {
  const { data: session } = useSession();
  const settings = useSettings();
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState<string | null>(null);

  const [files, setFiles] = useState<{ [key: string]: File | null }>({
    ktp: null,
    kk: null,
    akte_kelahiran: null,
    ijazah: null,
    transkrip_nilai: null,
    foto: null,
  });

  const handleDrag = function(e: React.DragEvent, type: string) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(type);
    } else if (e.type === "dragleave") {
      setDragActive(null);
    }
  };

  const handleDrop = function(e: React.DragEvent, type: string) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(null);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFiles({ ...files, [type]: e.dataTransfer.files[0] });
    }
  };

  const handleChange = function(e: React.ChangeEvent<HTMLInputElement>, type: string) {
    if (e.target.files && e.target.files[0]) {
      setFiles({ ...files, [type]: e.target.files[0] });
    }
  };

  const handleRemove = (type: string) => {
    setFiles({ ...files, [type]: null });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
      alert("Fitur upload dokumen sedang dalam tahap pengembangan. File Anda disimpan sementara di memori peramban.");
    }, 1500);
  };

  const UploadZone = ({ title, description, type, required = true }: { title: string, description: string, type: string, required?: boolean }) => {
    const file = files[type];
    const isActive = dragActive === type;

    return (
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          {title} {required && <span className="text-red-500">*</span>}
        </label>
        <p className="text-xs text-gray-500 mb-3">{description}</p>
        
        {file ? (
          <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <div>
                <p className="text-sm font-medium text-green-800 truncate max-w-xs">{file.name}</p>
                <p className="text-xs text-green-600">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <button 
              type="button" 
              onClick={() => handleRemove(type)}
              className="text-sm text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1 rounded-md transition-colors"
            >
              Hapus
            </button>
          </div>
        ) : (
          <div 
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ease-in-out ${isActive ? 'border-red-500 bg-red-50 scale-[1.02]' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'}`}
            onDragEnter={(e) => handleDrag(e, type)}
            onDragLeave={(e) => handleDrag(e, type)}
            onDragOver={(e) => handleDrag(e, type)}
            onDrop={(e) => handleDrop(e, type)}
          >
            <input 
              type="file" 
              id={`file-upload-${type}`}
              className="hidden" 
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleChange(e, type)}
            />
            <label htmlFor={`file-upload-${type}`} className="cursor-pointer flex flex-col items-center justify-center h-full w-full">
              <div className={`h-12 w-12 rounded-full flex items-center justify-center mb-3 ${isActive ? 'bg-blue-100 text-red-700' : 'bg-gray-100 text-gray-500'}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-700">Klik untuk upload atau seret file ke sini</p>
              <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (Maks 2MB)</p>
            </label>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col hidden md:flex">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-red-700">{settings?.short_name || "SPMB DKN"}</h1>
          <p className="text-xs text-gray-500">Panel Calon Mahasiswa</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/dashboard" className="block p-3 rounded-lg text-gray-600 hover:bg-gray-50 font-medium">Dashboard</Link>
          <Link href="/dashboard/form" className="block p-3 rounded-lg text-gray-600 hover:bg-gray-50">Pengisian Formulir</Link>
          <Link href="/dashboard/documents" className="block p-3 rounded-lg bg-red-50 text-red-800 font-medium">Upload Dokumen</Link>
          <Link href="/dashboard/payment" className="block p-3 rounded-lg text-gray-600 hover:bg-gray-50">Pembayaran</Link>
          <Link href="/dashboard/exams" className="block p-3 rounded-lg text-gray-600 hover:bg-gray-50">Ujian Online</Link>
        </nav>
        <LogoutButton />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white shadow-sm flex items-center px-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Upload Dokumen Persyaratan</h2>
        </header>

        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white p-8 rounded-xl border shadow-sm max-w-4xl mx-auto">
            
            <div className="mb-8 border-l-4 border-red-500 bg-red-50 p-4 rounded-r-md">
              <h3 className="text-sm font-bold text-blue-800">Informasi Penting</h3>
              <p className="text-sm text-red-800 mt-1">
                Harap unggah dokumen yang sah dan jelas terbaca. Dokumen akan diverifikasi oleh panitia sebelum Anda dapat melanjutkan ke tahap ujian.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-2">
                <UploadZone 
                  title="Kartu Tanda Penduduk (KTP)" 
                  description="Kartu identitas resmi yang masih berlaku."
                  type="ktp" 
                />

                <UploadZone 
                  title="Kartu Keluarga (KK)" 
                  description="Scan dokumen asli atau fotokopi KK yang dilegalisir."
                  type="kk" 
                />

                <UploadZone 
                  title="Akte Kelahiran" 
                  description="Scan dokumen asli akte kelahiran atau surat keterangan lahir."
                  type="akte_kelahiran" 
                />
                
                <UploadZone 
                  title="Ijazah Terakhir / Surat Keterangan Lulus" 
                  description="Scan dokumen asli atau fotokopi yang telah dilegalisir."
                  type="ijazah" 
                />

                <UploadZone 
                  title="Transkrip Nilai / Rapor Terakhir" 
                  description="Scan dokumen asli transkrip nilai akademik."
                  type="transkrip_nilai" 
                />
                
                <UploadZone 
                  title="Pas Foto Berwarna" 
                  description="Foto formal terbaru dengan latar belakang merah atau biru."
                  type="foto" 
                />
              </div>

              {/* Form Controls */}
              <div className="mt-10 pt-6 border-t flex justify-end">
                <button 
                  type="submit"
                  disabled={isUploading || (!files.ktp || !files.kk || !files.akte_kelahiran || !files.ijazah || !files.transkrip_nilai || !files.foto)}
                  className={`px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200 ${
                    isUploading || (!files.ktp || !files.kk || !files.akte_kelahiran || !files.ijazah || !files.transkrip_nilai || !files.foto) 
                      ? 'bg-blue-300 cursor-not-allowed' 
                      : 'bg-red-700 hover:bg-red-800 hover:shadow-lg transform hover:-translate-y-0.5'
                  }`}
                >
                  {isUploading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Menyimpan...
                    </span>
                  ) : "Simpan Dokumen"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
