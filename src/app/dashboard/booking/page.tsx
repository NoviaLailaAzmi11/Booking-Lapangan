"use client";

import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

const bookings = [
  { customer: "Nadia Pratama", field: "Lapangan Futsal A", schedule: "18 Sep 2026 • 13:00 - 15:00", status: "Dikonfirmasi", amount: "Rp240.000" },
  { customer: "Bagas Ramadhan", field: "Lapangan Badminton 1", schedule: "18 Sep 2026 • 14:30 - 16:00", status: "Menunggu pembayaran", amount: "Rp120.000" },
  { customer: "Salsa Putri", field: "Mini Soccer Outdoor", schedule: "19 Sep 2026 • 16:00 - 18:00", status: "Dikonfirmasi", amount: "Rp480.000" },
];

export default function BookingPage() {
  const searchParams = useSearchParams();
  const [field, setField] = useState(searchParams.get("lapangan") || "");
  const [customer, setCustomer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-[#F5F7FB] p-5 text-[#132238] sm:p-8 lg:p-12">
      <div className="mx-auto max-w-6xl">
        <Link href="/dashboard" className="text-sm font-semibold text-[#1E3A8A]">← Kembali ke dashboard</Link>
        <header className="mt-6 border-b border-[#E4E9F2] pb-7">
          <p className="text-sm font-medium text-[#8090A8]">ArenaPro • Operasional</p>
          <h1 className="mt-1 text-3xl font-bold">Booking lapangan</h1>
          <p className="mt-2 text-sm text-[#728197]">Buat pemesanan baru atau pantau riwayat booking.</p>
        </header>

        <div className="mt-7 grid gap-6 lg:grid-cols-[0.9fr_1.4fr]">
          <form onSubmit={handleSubmit} className="rounded-2xl border border-[#E4E9F2] bg-white p-6 shadow-sm">
            <h2 className="font-bold">Booking baru</h2>
            {submitted && <p className="mt-4 rounded-xl bg-[#E8F8F0] p-3 text-sm font-semibold text-[#16834C]">Booking berhasil dibuat dan menunggu pembayaran.</p>}
            <label className="mt-5 block text-xs font-bold uppercase tracking-wider text-[#8090A8]">Nama pelanggan</label>
            <input required value={customer} onChange={(event) => setCustomer(event.target.value)} className="mt-2 w-full rounded-xl border border-[#DCE3EE] px-4 py-3 text-sm outline-none focus:border-[#1E3A8A]" placeholder="Contoh: Budi Santoso" />
            <label className="mt-4 block text-xs font-bold uppercase tracking-wider text-[#8090A8]">Lapangan</label>
            <select required value={field} onChange={(event) => setField(event.target.value)} className="mt-2 w-full rounded-xl border border-[#DCE3EE] bg-white px-4 py-3 text-sm outline-none focus:border-[#1E3A8A]"><option value="">Pilih lapangan</option><option>Lapangan Futsal A</option><option>Lapangan Futsal B</option><option>Lapangan Badminton 2</option><option>Mini Soccer Outdoor</option></select>
            <div className="mt-4 grid grid-cols-2 gap-3"><div><label className="text-xs font-bold uppercase tracking-wider text-[#8090A8]">Tanggal</label><input required type="date" className="mt-2 w-full rounded-xl border border-[#DCE3EE] px-3 py-3 text-sm" /></div><div><label className="text-xs font-bold uppercase tracking-wider text-[#8090A8]">Jam mulai</label><input required type="time" className="mt-2 w-full rounded-xl border border-[#DCE3EE] px-3 py-3 text-sm" /></div></div>
            <button type="submit" className="mt-6 w-full rounded-xl bg-[#1E3A8A] py-3 text-sm font-bold text-white hover:bg-[#132238]">Simpan booking</button>
          </form>

          <section className="rounded-2xl border border-[#E4E9F2] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between"><div><h2 className="font-bold">Riwayat booking</h2><p className="mt-1 text-xs text-[#8090A8]">Pemesanan terbaru di ArenaPro</p></div><span className="rounded-full bg-[#EAF1FF] px-3 py-1 text-xs font-bold text-[#1E3A8A]">{bookings.length} booking</span></div>
            <div className="mt-5 space-y-3">{bookings.map((booking) => <div key={booking.customer} className="rounded-xl border border-[#EEF1F6] p-4"><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-bold">{booking.customer}</p><p className="mt-1 text-xs font-semibold text-[#1E3A8A]">{booking.field}</p><p className="mt-1 text-xs text-[#8090A8]">{booking.schedule}</p></div><p className="text-sm font-bold">{booking.amount}</p></div><span className={`mt-3 inline-block rounded-full px-2.5 py-1 text-[10px] font-bold ${booking.status === "Dikonfirmasi" ? "bg-[#E8F8F0] text-[#16834C]" : "bg-[#FFF4DA] text-[#A66A00]"}`}>{booking.status}</span></div>)}</div>
          </section>
        </div>
      </div>
    </main>
  );
}
