"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSettings } from "@/components/SettingsProvider";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const settings = useSettings();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Decorative Blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-red-100/30 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-slate-200/40 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="max-w-md w-full space-y-8 bg-white/70 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.04)] border border-white/20 relative z-10">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
             <div className="w-16 h-16 bg-red-700 rounded-[1.5rem] flex items-center justify-center text-white font-black text-2xl shadow-2xl shadow-red-200 transition-transform hover:scale-110">P</div>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
            Sign In {settings?.shortName || ""}
          </h2>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Masukkan akun pendaftaran Anda</p>
        </div>
        
        {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                <p className="text-sm text-red-700">{error}</p>
            </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                placeholder="Alamat Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-2xl border border-transparent bg-red-700 py-4 px-4 text-sm font-black text-white hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all shadow-xl shadow-red-100 uppercase tracking-widest"
            >
              Explore Now
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-6 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>

          <div className="text-center pt-4">
             <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Belum punya akun? <Link href="/register" className="text-red-700 hover:underline">Daftar Akun Baru</Link>
             </p>
          </div>
        </form>
      </div>
    </div>
  );
}
