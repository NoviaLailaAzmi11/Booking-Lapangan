"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from '@/auth-client';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handler Login dengan Email & Password
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      setIsLoading(true);
      await signIn.email({
        email,
        password,
        callbackURL: '/dashboard',
      }, {
        onSuccess: () => {
          router.push('/dashboard');
        },
        onError: (ctx) => {
          setErrorMessage(ctx.error.message || 'Gagal masuk, periksa kembali email dan password.');
        }
      });
    } catch (error) {
      console.error('Error signing in:', error);
      setErrorMessage('Terjadi kesalahan pada sistem.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handler Login dengan Google OAuth
  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signIn.social({
        provider: 'google',
        callbackURL: '/dashboard',
        additionalParams: {
          prompt: 'select_account',
        },
      });
    } catch (error) {
      console.error('Gagal login dengan Google:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F4F8FF] p-4 lg:p-8">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 border border-[#C6DEFF]/40">
        
        {/* Sisi Kiri: Branding / Ilustrasi */}
        <div className="relative hidden lg:flex flex-col justify-between p-12 bg-linear-to-br from-[#1E3A8A] via-[#0A192F] to-[#1E3A8A] text-white">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#C6DEFF]/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C6DEFF] flex items-center justify-center text-[#0A192F] font-bold text-xl shadow-lg">
              ⚽
            </div>
            <span className="text-xl font-bold tracking-wide text-white">ArenaPro</span>
          </div>

          <div className="relative z-10 my-auto py-10">
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-[#0A192F] bg-[#C6DEFF] rounded-full">
              Sistem Booking Lapangan
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight leading-tight mb-4">
              Main Lebih Mudah,<br />Jadwalkan Lapanganmu.
            </h1>
            <p className="text-blue-100/80 text-sm leading-relaxed max-w-md">
              Temukan dan pesan lapangan futsal, badminton, atau mini soccer favoritmu secara real-time kapan saja dan di mana saja.
            </p>
          </div>

          <div className="relative z-10 text-xs text-blue-200/60">
            &copy; {new Date().getFullYear()} Booking Lapangan App. All rights reserved.
          </div>
        </div>

        {/* Sisi Kanan: Form Login */}
        <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16 bg-white">
          <div className="max-w-md w-full mx-auto">
            
            <div className="text-center lg:text-left mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0A192F] mb-2">
                Selamat Datang!
              </h2>
              <p className="text-gray-500 text-sm">
                Masuk untuk mulai memesan lapangan impianmu.
              </p>
            </div>

            {/* Pesan Error jika ada */}
            {errorMessage && (
              <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl">
                {errorMessage}
              </div>
            )}

            {/* Form Email & Password */}
            <form onSubmit={handleEmailSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/20 outline-none text-sm text-gray-800 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/20 outline-none text-sm text-gray-800 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 bg-[#1E3A8A] hover:bg-[#0A192F] text-white font-medium rounded-2xl shadow-lg shadow-blue-900/20 transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Memproses...' : 'Masuk dengan Email'}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-gray-400 font-medium">
                  Atau
                </span>
              </div>
            </div>

            {/* Tombol Google OAuth */}
            <div className="space-y-4">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 px-6 py-3.5 border border-gray-200 rounded-2xl font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-[#C6DEFF] transition-all duration-200 shadow-sm active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.19v3.15C3.17 21.3 7.22 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.19C.43 8.1 0 9.99 0 12s.43 3.9 1.19 5.42l4.09-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.22 0 3.17 2.7 1.19 6.58l4.09 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>Lanjutkan dengan Google</span>
              </button>
            </div>

            <p className="text-center text-xs text-gray-500 mt-6 leading-relaxed">
              Dengan masuk, Anda menyetujui{' '}
              <Link href="#" className="text-[#1E3A8A] font-semibold hover:underline">
                Syarat & Ketentuan
              </Link>{' '}
              serta{' '}
              <Link href="#" className="text-[#1E3A8A] font-semibold hover:underline">
                Kebijakan Privasi
              </Link>{' '}
              kami.
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}