"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "@/auth-client";

const navigation = [
  { label: "Ringkasan", icon: "▦", href: "/dashboard", active: true },
  { label: "Daftar Lapangan", icon: "▣", href: "/dashboard/lapangan" },
  { label: "Riwayat Booking", icon: "◷", href: "/dashboard/booking" },
  { label: "Manajemen User", icon: "♙", href: "/dashboard/users" },
  { label: "Laporan Pendapatan", icon: "↗", href: "/dashboard/laporan" },
];

const fields = [
  { name: "Lapangan Futsal A", type: "Futsal", status: "Tersedia", time: "Sampai 16:00", color: "bg-emerald-500" },
  { name: "Lapangan Badminton 1", type: "Badminton", status: "Sedang dipakai", time: "Selesai 14:30", color: "bg-amber-500" },
  { name: "Mini Soccer Outdoor", type: "Mini soccer", status: "Tersedia", time: "Sampai 17:00", color: "bg-emerald-500" },
];

const activities = [
  { name: "Nadia Pratama", detail: "Booking Futsal A • 13:00 - 15:00", status: "Dikonfirmasi", amount: "Rp240.000" },
  { name: "Bagas Ramadhan", detail: "Booking Badminton 1 • 14:30 - 16:00", status: "Menunggu pembayaran", amount: "Rp120.000" },
  { name: "Salsa Putri", detail: "Booking Mini Soccer • 16:00 - 18:00", status: "Dikonfirmasi", amount: "Rp480.000" },
];

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function checkAdminAccess() {
      const response = await fetch("/api/admin/reset-data", { cache: "no-store" });
      setIsAdmin(response.ok);
    }

    if (!isPending) void checkAdminAccess();
  }, [isPending]);

  if (isPending) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#F4F8FF] text-[#0A192F]">
        Memuat dashboard...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F7FB] text-[#132238]">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <aside className="hidden w-72 shrink-0 border-r border-[#E4E9F2] bg-white px-6 py-8 lg:block">
          <div className="flex items-center gap-3 border-b border-[#EEF1F6] pb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1E3A8A] text-xl text-white">⚽</div>
            <div>
              <p className="text-lg font-bold tracking-tight">ArenaPro</p>
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#8090A8]">Sports venue</p>
            </div>
          </div>

          <div className="mt-9">
            <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#9AA6B8]">Menu utama</p>
            <nav className="space-y-1">
              {[...navigation, ...(isAdmin ? [{ label: "Reset Data", icon: "!", href: "/dashboard/reset-data" }] : [])].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition-colors ${item.active ? "bg-[#EAF1FF] text-[#1E3A8A]" : "text-[#708096] hover:bg-[#F5F7FB] hover:text-[#132238]"}`}
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-base shadow-sm" aria-hidden="true">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="mt-auto pt-28">
            <div className="rounded-2xl bg-[#132238] p-4 text-white">
              <p className="text-xs font-semibold text-[#AFC7F7]">Peran aktif</p>
              <p className="mt-1 font-semibold">Admin / Kasir</p>
              <p className="mt-2 text-xs leading-5 text-[#A9B6C9]">Kelola operasional lapangan dari satu tempat.</p>
            </div>
          </div>
        </aside>

        <section className="min-w-0 flex-1 px-5 py-6 sm:px-8 sm:py-8 lg:px-12">
          <header className="flex flex-col justify-between gap-5 border-b border-[#E4E9F2] pb-7 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-medium text-[#8090A8]">Kamis, 18 September 2026</p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Ringkasan operasional</h1>
              <p className="mt-2 text-sm text-[#728197]">Pantau aktivitas ArenaPro hari ini.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold">{session?.user?.name || "Pengguna ArenaPro"}</p>
                <p className="text-xs text-[#8090A8]">Admin / Kasir</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#CFE0FF] font-bold text-[#1E3A8A]">
                {(session?.user?.name || "A").slice(0, 1).toUpperCase()}
              </div>
              <Link href="/login" aria-label="Keluar dari dashboard" className="rounded-xl border border-[#DCE3EE] bg-white px-3 py-2 text-xs font-semibold text-[#63738A] hover:bg-[#F8FAFD]">Keluar</Link>
            </div>
          </header>

          <div className="grid gap-4 py-7 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ["Booking hari ini", "24", "+12,5%", "↗", "text-[#1E3A8A]"],
              ["Menunggu konfirmasi", "06", "Perlu ditangani", "◷", "text-amber-600"],
              ["Pendapatan hari ini", "Rp4,8 jt", "+8,2%", "↗", "text-emerald-600"],
              ["Lapangan aktif", "08 / 10", "80% terisi", "▣", "text-violet-600"],
            ].map(([label, value, detail, icon, color]) => (
              <div key={label} className="rounded-2xl border border-[#E4E9F2] bg-white p-5 shadow-[0_8px_24px_rgba(21,42,75,0.04)]">
                <div className="flex items-start justify-between">
                  <p className="text-sm font-medium text-[#8090A8]">{label}</p>
                  <span className={`text-lg ${color}`} aria-hidden="true">{icon}</span>
                </div>
                <p className="mt-5 text-2xl font-bold tracking-tight">{value}</p>
                <p className="mt-1 text-xs font-semibold text-emerald-600">{detail}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.35fr_1fr]">
            <section className="rounded-2xl border border-[#E4E9F2] bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-bold">Ketersediaan lapangan</h2>
                  <p className="mt-1 text-xs text-[#8090A8]">Status penggunaan secara real-time</p>
                </div>
                <Link href="/dashboard/lapangan" className="text-xs font-bold text-[#1E3A8A]">Lihat semua</Link>
              </div>
              <div className="mt-6 space-y-4">
                {fields.map((field) => (
                  <div key={field.name} className="flex items-center gap-3 border-b border-[#F0F2F6] pb-4 last:border-0 last:pb-0">
                    <span className={`h-2.5 w-2.5 rounded-full ${field.color}`} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{field.name}</p>
                      <p className="mt-1 text-xs text-[#8A97A9]">{field.type} • {field.time}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-[11px] font-bold ${field.status === "Tersedia" ? "bg-[#E8F8F0] text-[#16834C]" : "bg-[#FFF4DA] text-[#A66A00]"}`}>{field.status}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl bg-[#1E3A8A] p-6 text-white shadow-[0_12px_30px_rgba(30,58,138,0.18)]">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-[#CFE0FF]">Pendapatan bulan ini</p>
                  <p className="mt-3 text-3xl font-bold">Rp48.250.000</p>
                </div>
                <span className="rounded-xl bg-white/15 px-3 py-2 text-lg" aria-hidden="true">↗</span>
              </div>
              <div className="mt-8 flex items-end gap-1" aria-label="Grafik pendapatan mingguan">
                {[35, 48, 42, 64, 54, 76, 88, 68, 94, 82, 100, 92].map((height, index) => (
                  <span key={index} className="flex-1 rounded-t bg-[#AFC7F7]/70" style={{ height: `${height}px` }} />
                ))}
              </div>
              <div className="mt-3 flex justify-between text-[11px] text-[#CFE0FF]"><span>1 Sep</span><span>18 Sep</span></div>
            </section>
          </div>

          <section className="mt-6 rounded-2xl border border-[#E4E9F2] bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold">Booking terbaru</h2>
                <p className="mt-1 text-xs text-[#8090A8]">Aktivitas pemesanan yang perlu dipantau</p>
              </div>
              <Link href="/dashboard/booking" className="text-xs font-bold text-[#1E3A8A]">Lihat riwayat</Link>
            </div>
            <div className="mt-5 overflow-x-auto">
              <div className="min-w-162.5">
                <div className="grid grid-cols-[1.1fr_1.8fr_1fr_0.8fr] gap-4 border-b border-[#EEF1F6] px-3 pb-3 text-[11px] font-bold uppercase tracking-wider text-[#9AA6B8]">
                  <span>Pelanggan</span><span>Detail booking</span><span>Status</span><span className="text-right">Total</span>
                </div>
                {activities.map((activity) => (
                  <div key={activity.name} className="grid grid-cols-[1.1fr_1.8fr_1fr_0.8fr] items-center gap-4 border-b border-[#F3F5F8] px-3 py-4 last:border-0">
                    <span className="text-sm font-semibold">{activity.name}</span>
                    <span className="text-xs text-[#728197]">{activity.detail}</span>
                    <span className={`w-fit rounded-full px-2.5 py-1 text-[10px] font-bold ${activity.status === "Dikonfirmasi" ? "bg-[#E8F8F0] text-[#16834C]" : "bg-[#FFF4DA] text-[#A66A00]"}`}>{activity.status}</span>
                    <span className="text-right text-sm font-bold">{activity.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}