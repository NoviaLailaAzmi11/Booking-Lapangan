"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession } from "@/auth-client";

const fields = [
  { name: "Lapangan Futsal A", type: "Futsal", location: "Gedung utama • Lantai 1", price: "Rp120.000 / jam", status: "Tersedia", color: "bg-emerald-500", description: "Rumput sintetis premium dengan pencahayaan LED." },
  { name: "Lapangan Futsal B", type: "Futsal", location: "Gedung utama • Lantai 1", price: "Rp100.000 / jam", status: "Tersedia", color: "bg-emerald-500", description: "Lapangan indoor nyaman untuk latihan dan pertandingan." },
  { name: "Lapangan Badminton 1", type: "Badminton", location: "Gedung utama • Lantai 2", price: "Rp80.000 / jam", status: "Sedang dipakai", color: "bg-amber-500", description: "Lantai vinyl dengan area penonton dan ruang tunggu." },
  { name: "Lapangan Badminton 2", type: "Badminton", location: "Gedung utama • Lantai 2", price: "Rp80.000 / jam", status: "Tersedia", color: "bg-emerald-500", description: "Lapangan indoor dengan perlengkapan standar turnamen." },
  { name: "Mini Soccer Outdoor", type: "Mini soccer", location: "Area outdoor", price: "Rp240.000 / jam", status: "Tersedia", color: "bg-emerald-500", description: "Lapangan outdoor luas untuk tim hingga 14 pemain." },
  { name: "Basket Court", type: "Basket", location: "Area outdoor", price: "Rp150.000 / jam", status: "Perawatan", color: "bg-slate-400", description: "Lapangan basket outdoor dengan ring standar kompetisi." },
];

export default function FieldsPage() {
  const { data: session } = useSession();
  const [filter, setFilter] = useState("Semua");
  const visibleFields = fields.filter((field) => {
    if (filter === "Tersedia") return field.status === "Tersedia";
    if (filter === "Futsal" || filter === "Badminton") return field.type === filter;
    return true;
  });

  return (
    <main className="min-h-screen bg-[#F5F7FB] text-[#132238]">
      <div className="mx-auto min-h-screen max-w-[1600px] px-5 py-6 sm:px-8 sm:py-8 lg:px-12">
        <header className="flex flex-col gap-5 border-b border-[#E4E9F2] pb-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link href="/dashboard" className="text-sm font-semibold text-[#1E3A8A]">← Kembali ke dashboard</Link>
            <p className="mt-6 text-sm font-medium text-[#8090A8]">ArenaPro • Operasional lapangan</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">Daftar lapangan</h1>
            <p className="mt-2 text-sm text-[#728197]">Pilih lapangan yang tersedia untuk membuat booking.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold">{session?.user?.name || "Pengguna ArenaPro"}</p>
              <p className="text-xs text-[#8090A8]">Admin / Kasir</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#CFE0FF] font-bold text-[#1E3A8A]">A</div>
          </div>
        </header>

        <div className="mt-7 flex flex-wrap gap-3">
          {["Semua", "Tersedia", "Futsal", "Badminton"].map((option) => (
            <button key={option} type="button" onClick={() => setFilter(option)} className={`rounded-xl px-4 py-2.5 text-sm font-semibold ${filter === option ? "bg-[#1E3A8A] text-white" : "border border-[#DCE3EE] bg-white text-[#63738A]"}`}>
              {option === "Semua" ? "Semua lapangan" : option === "Tersedia" ? "Yang tersedia" : option}
            </button>
          ))}
        </div>

        <section className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {visibleFields.map((field) => (
            <article key={field.name} className="overflow-hidden rounded-2xl border border-[#E4E9F2] bg-white shadow-[0_8px_24px_rgba(21,42,75,0.04)]">
              <div className="flex h-36 items-end bg-[#DDE9FA] p-5">
                <div>
                  <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-[#1E3A8A]">{field.type}</span>
                  <h2 className="mt-3 text-xl font-bold text-[#132238]">{field.name}</h2>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-xs font-semibold text-[#63738A]"><span className={`h-2.5 w-2.5 rounded-full ${field.color}`} />{field.status}</span>
                  <span className="text-sm font-bold text-[#1E3A8A]">{field.price}</span>
                </div>
                <p className="mt-4 text-sm leading-6 text-[#728197]">{field.description}</p>
                <p className="mt-3 text-xs font-medium text-[#9AA6B8]">⌖ {field.location}</p>
                {field.status === "Tersedia" ? (
                  <Link href={`/dashboard/booking?lapangan=${encodeURIComponent(field.name)}`} className="mt-5 block w-full rounded-xl bg-[#1E3A8A] py-3 text-center text-sm font-bold text-white transition hover:bg-[#132238]">Booking lapangan</Link>
                ) : (
                  <button type="button" disabled className="mt-5 w-full rounded-xl bg-[#E9EDF3] py-3 text-sm font-bold text-[#9AA6B8]">{field.status}</button>
                )}
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}