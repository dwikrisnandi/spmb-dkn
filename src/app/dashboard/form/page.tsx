"use client";

import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useSettings } from "@/components/SettingsProvider";

export default function FormSubmission() {
  const { data: session } = useSession();
  const settings = useSettings();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    nationalId: "",
    birthPlaceCity: "",
    birthDate: "",
    gender: "Laki-Laki",
    religion: "Islam",
    address: "",
    fatherName: "",
    motherName: "",
    educationName: "",
    lastEducation: "SMA",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsLoading(true);
      try {
        const res = await fetch("/api/forms/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nationalId: formData.nationalId,
                birthPlaceCity: formData.birthPlaceCity,
                birthDate: new Date(formData.birthDate).toISOString(),
                gender: formData.gender,
                religion: formData.religion,
                address: formData.address,
                fatherName: formData.fatherName,
                motherName: formData.motherName,
                educationName: formData.educationName,
                lastEducation: formData.lastEducation,
            })
        });

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || "Gagal submit formulir");
        }
        
        alert("Formulir berhasil disubmit! Mohon tunggu verifikasi admin.");
        // Redirect or show success message here in a real app
      } catch (error: any) {
        alert(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Same as dashboard */}
      <aside className="w-64 bg-white shadow-md flex flex-col hidden md:flex">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-red-700">{settings?.short_name || "SPMB DKN"}</h1>
          <p className="text-xs text-gray-500">Panel Calon Mahasiswa</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/dashboard" className="block p-3 rounded-lg text-gray-600 hover:bg-gray-50 font-medium">Dashboard</Link>
          <Link href="/dashboard/form" className="block p-3 rounded-lg bg-red-50 text-red-800">Pengisian Formulir</Link>
          <Link href="/dashboard/documents" className="block p-3 rounded-lg text-gray-600 hover:bg-gray-50">Upload Dokumen</Link>
          <Link href="/dashboard/payment" className="block p-3 rounded-lg text-gray-600 hover:bg-gray-50">Pembayaran</Link>
        </nav>
        <LogoutButton />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white shadow-sm flex items-center px-6">
          <h2 className="text-xl font-semibold text-gray-800">Formulir Pendaftaran</h2>
        </header>

        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white p-8 rounded-xl border shadow-sm max-w-4xl mx-auto">
            
            {/* Stepper */}
            <div className="flex items-center justify-between mb-8">
              <div className={`flex flex-col items-center cursor-pointer ${step >= 1 ? 'text-red-700' : 'text-gray-400'}`} onClick={() => setStep(1)}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 mb-2 ${step >= 1 ? 'border-blue-600 bg-red-50' : 'border-gray-300'}`}>1</div>
                <span className="text-sm font-medium">Biodata Diri</span>
              </div>
              <div className={`flex-1 h-1 mx-4 rounded ${step >= 2 ? 'bg-red-700' : 'bg-gray-200'}`}></div>
              <div className={`flex flex-col items-center cursor-pointer ${step >= 2 ? 'text-red-700' : 'text-gray-400'}`} onClick={() => setStep(2)}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 mb-2 ${step >= 2 ? 'border-blue-600 bg-red-50' : 'border-gray-300'}`}>2</div>
                <span className="text-sm font-medium">Data Orang Tua</span>
              </div>
              <div className={`flex-1 h-1 mx-4 rounded ${step >= 3 ? 'bg-red-700' : 'bg-gray-200'}`}></div>
              <div className={`flex flex-col items-center cursor-pointer ${step >= 3 ? 'text-red-700' : 'text-gray-400'}`} onClick={() => setStep(3)}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 mb-2 ${step >= 3 ? 'border-blue-600 bg-red-50' : 'border-gray-300'}`}>3</div>
                <span className="text-sm font-medium">Asal Sekolah</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Biodata Calon Mahasiswa</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">NIK (Nomor Induk Kependudukan)</label>
                      <input type="text" name="nationalId" value={formData.nationalId} onChange={handleChange} className="w-full rounded-md border border-gray-300 px-3 py-2" required placeholder="16 Digit NIK" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tempat Lahir</label>
                      <input type="text" name="birthPlaceCity" value={formData.birthPlaceCity} onChange={handleChange} className="w-full rounded-md border border-gray-300 px-3 py-2" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir</label>
                      <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} className="w-full rounded-md border border-gray-300 px-3 py-2" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin</label>
                      <select name="gender" value={formData.gender} onChange={handleChange} className="w-full rounded-md border border-gray-300 px-3 py-2">
                        <option value="Laki-Laki">Laki-Laki</option>
                        <option value="Perempuan">Perempuan</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Agama</label>
                      <select name="religion" value={formData.religion} onChange={handleChange} className="w-full rounded-md border border-gray-300 px-3 py-2">
                        <option value="Islam">Islam</option>
                        <option value="Kristen">Kristen</option>
                        <option value="Katolik">Katolik</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Buddha">Buddha</option>
                        <option value="Konghucu">Konghucu</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
                      <textarea name="address" value={formData.address} onChange={handleChange} className="w-full rounded-md border border-gray-300 px-3 py-2" rows={3} required></textarea>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Data Orang Tua / Wali</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nama Ayah</label>
                      <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} className="w-full rounded-md border border-gray-300 px-3 py-2" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nama Ibu</label>
                      <input type="text" name="motherName" value={formData.motherName} onChange={handleChange} className="w-full rounded-md border border-gray-300 px-3 py-2" required />
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Data Asal Sekolah</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Asal Sekolah (SMA/SMK/MA)</label>
                      <input type="text" name="educationName" value={formData.educationName} onChange={handleChange} className="w-full rounded-md border border-gray-300 px-3 py-2" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Jenjang Pendidikan</label>
                      <select name="lastEducation" value={formData.lastEducation} onChange={handleChange} className="w-full rounded-md border border-gray-300 px-3 py-2" required>
                        <option value="SMA">SMA</option>
                        <option value="SMK">SMK</option>
                        <option value="MA">MA</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Controls */}
              <div className="mt-8 flex justify-between border-t pt-4">
                <button 
                  type="button" 
                  onClick={() => setStep(step - 1)} 
                  disabled={step === 1 || isLoading}
                  className={`px-6 py-2 rounded-md font-medium text-sm border ${step === 1 ? 'border-gray-200 text-gray-400 bg-gray-50' : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'}`}
                >
                  Kembali
                </button>
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2 rounded-md font-medium text-sm bg-red-700 text-white hover:bg-red-800 disabled:bg-blue-400"
                >
                  {isLoading ? 'Menyimpan...' : (step === 3 ? 'Kirim Formulir' : 'Selanjutnya')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
