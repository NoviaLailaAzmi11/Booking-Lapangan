"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Counts = { payments: number; bookings: number; customers: number; lapangan: number };

export default function ResetDataPage() {
  const [counts, setCounts] = useState<Counts | null>(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isResetting, setIsResetting] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    async function loadSummary() {
      try {
        const response = await fetch("/api/admin/reset-data", { cache: "no-store" });
        if (!response.ok) return;
        setCounts(await response.json());
        setIsAuthorized(true);
      } finally {
        setIsLoading(false);
      }
    }
    void loadSummary();
  }, []);

  async function resetData() {
    if (!window.confirm("Hapus seluruh data pembayaran, booking, pelanggan, dan lapangan? Tindakan ini tidak dapat dibatalkan.")) return;
    setIsResetting(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/reset-data", { method: "DELETE" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message ?? "Reset data gagal.");
      setCounts({ payments: 0, bookings: 0, customers: 0, lapangan: 0 });
      setMessage(result.message);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Reset data gagal.");
    } finally {
      setIsResetting(false);
    }
  }

  if (isLoading) return <main className="min-h-screen bg-[#F5F7FB] p-5 text-[#132238] sm:p-8 lg:p-12">Memeriksa akses admin...</main>;
  if (!isAuthorized) return <main className="min-h-screen bg-[#F5F7FB] p-5 text-[#132238] sm:p-8 lg:p-12">Akses halaman ini hanya untuk admin.</main>;

  const data = [
    ["Pembayaran", counts?.payments ?? 0],
    ["Booking", counts?.bookings ?? 0],
    ["Pelanggan", counts?.customers ?? 0],
    ["Lapangan", counts?.lapangan ?? 0],
  ];

  return (
    <main className="min-h-screen bg-[#F5F7FB] p-5 text-[#132238] sm:p-8 lg:p-12">
      <div className="mx-auto max-w-4xl">
        <Link href="/dashboard" className="text-sm font-semibold text-[#1E3A8A]">? Kembali ke dashboard</Link>
        <header className="mt-6 border-b border-[#E4E9F2] pb-7">
          <p className="text-sm font-medium text-[#8090A8]">ArenaPro • Administrasi</p>
          <h1 className="mt-1 text-3xl font-bold">Reset data</h1>
          <p className="mt-2 text-sm text-[#728197]">Hapus data operasional dan mulai kembali dengan data kosong.</p>
        </header>
        <section className="mt-7 rounded-2xl border border-red-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="font-bold text-red-700">Zona berbahaya</h2>
          <p className="mt-2 text-sm leading-6 text-[#728197]">Reset menghapus pembayaran, booking, pelanggan, dan lapangan secara permanen. Akun admin dan data autentikasi tidak dihapus.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-4">
            {data.map(([label, count]) => <div key={label} className="rounded-xl bg-[#F8FAFD] p-4"><p className="text-xs font-semibold text-[#8090A8]">{label}</p><p className="mt-1 text-2xl font-bold">{count}</p></div>)}
          </div>
          {message && <p className={`mt-5 text-sm font-semibold ${message.includes("berhasil") ? "text-emerald-600" : "text-red-600"}`}>{message}</p>}
          <button type="button" onClick={resetData} disabled={isResetting} className="mt-6 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60">
            {isResetting ? "Mereset data..." : "Reset semua data"}
          </button>
        </section>
      </div>
    </main>
  );
}