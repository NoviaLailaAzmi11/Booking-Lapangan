"use client";

import Link from "next/link";
import { useState } from "react";

const reports = [
  { date: "18 Sep 2026", bookings: 24, income: "Rp4.800.000", paid: "Rp4.320.000" },
  { date: "17 Sep 2026", bookings: 21, income: "Rp4.250.000", paid: "Rp4.010.000" },
  { date: "16 Sep 2026", bookings: 19, income: "Rp3.860.000", paid: "Rp3.540.000" },
  { date: "15 Sep 2026", bookings: 23, income: "Rp4.560.000", paid: "Rp4.200.000" },
];

export default function ReportPage() {
  const [period, setPeriod] = useState("Minggu ini");
  return <main className="min-h-screen bg-[#F5F7FB] p-5 text-[#132238] sm:p-8 lg:p-12"><div className="mx-auto max-w-6xl"><Link href="/dashboard" className="text-sm font-semibold text-[#1E3A8A]">← Kembali ke dashboard</Link><header className="mt-6 flex flex-col justify-between gap-4 border-b border-[#E4E9F2] pb-7 sm:flex-row sm:items-end"><div><p className="text-sm font-medium text-[#8090A8]">ArenaPro • Analitik</p><h1 className="mt-1 text-3xl font-bold">Laporan pendapatan</h1><p className="mt-2 text-sm text-[#728197]">Pantau pemasukan dan performa booking.</p></div><select value={period} onChange={(event) => setPeriod(event.target.value)} className="rounded-xl border border-[#DCE3EE] bg-white px-4 py-3 text-sm font-semibold"><option>Minggu ini</option><option>Bulan ini</option><option>Tahun ini</option></select></header><div className="mt-7 grid gap-4 sm:grid-cols-3"><div className="rounded-2xl bg-[#1E3A8A] p-5 text-white"><p className="text-sm text-[#CFE0FF]">Total pendapatan</p><p className="mt-3 text-2xl font-bold">Rp17.470.000</p><p className="mt-2 text-xs text-[#CFE0FF]">{period} • +8,2%</p></div><div className="rounded-2xl border border-[#E4E9F2] bg-white p-5"><p className="text-sm text-[#8090A8]">Booking selesai</p><p className="mt-3 text-2xl font-bold">87</p><p className="mt-2 text-xs font-semibold text-emerald-600">+12,5% dari periode lalu</p></div><div className="rounded-2xl border border-[#E4E9F2] bg-white p-5"><p className="text-sm text-[#8090A8]">Rata-rata transaksi</p><p className="mt-3 text-2xl font-bold">Rp200.800</p><p className="mt-2 text-xs text-[#8090A8]">Per booking</p></div></div><section className="mt-6 overflow-x-auto rounded-2xl border border-[#E4E9F2] bg-white p-5 shadow-sm"><h2 className="font-bold">Rincian pendapatan harian</h2><div className="mt-5 min-w-160"><div className="grid grid-cols-[1fr_0.8fr_1fr_1fr] gap-4 border-b border-[#EEF1F6] px-3 pb-3 text-[11px] font-bold uppercase tracking-wider text-[#9AA6B8]"><span>Tanggal</span><span>Booking</span><span>Total tagihan</span><span>Sudah dibayar</span></div>{reports.map((report) => <div key={report.date} className="grid grid-cols-[1fr_0.8fr_1fr_1fr] gap-4 border-b border-[#F3F5F8] px-3 py-4 text-sm last:border-0"><span className="font-semibold">{report.date}</span><span>{report.bookings} booking</span><span className="font-semibold">{report.income}</span><span className="font-semibold text-emerald-600">{report.paid}</span></div>)}</div></section></div></main>;
}
