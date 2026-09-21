"use client";

import Link from "next/link";
import { useState } from "react";

const initialUsers = [
  { name: "Nadia Pratama", email: "nadia@example.com", role: "Customer", status: "Aktif" },
  { name: "Bagas Ramadhan", email: "bagas@example.com", role: "Customer", status: "Aktif" },
  { name: "Raka Wijaya", email: "raka@arenapro.id", role: "Kasir", status: "Aktif" },
  { name: "Maya Lestari", email: "maya@arenapro.id", role: "Manager", status: "Aktif" },
];

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function addUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setUsers([...users, { name, email, role: "Customer", status: "Aktif" }]);
    setName("");
    setEmail("");
    setShowForm(false);
  }

  return <main className="min-h-screen bg-[#F5F7FB] p-5 text-[#132238] sm:p-8 lg:p-12"><div className="mx-auto max-w-6xl"><Link href="/dashboard" className="text-sm font-semibold text-[#1E3A8A]">← Kembali ke dashboard</Link><header className="mt-6 flex flex-col justify-between gap-4 border-b border-[#E4E9F2] pb-7 sm:flex-row sm:items-end"><div><p className="text-sm font-medium text-[#8090A8]">ArenaPro • Administrasi</p><h1 className="mt-1 text-3xl font-bold">Manajemen user</h1><p className="mt-2 text-sm text-[#728197]">Kelola akses admin, kasir, manager, dan pelanggan.</p></div><button type="button" onClick={() => setShowForm(!showForm)} className="rounded-xl bg-[#1E3A8A] px-4 py-3 text-sm font-bold text-white">+ Tambah user</button></header>{showForm && <form onSubmit={addUser} className="mt-6 grid gap-3 rounded-2xl border border-[#E4E9F2] bg-white p-5 sm:grid-cols-[1fr_1fr_auto]"><input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Nama lengkap" className="rounded-xl border border-[#DCE3EE] px-4 py-3 text-sm" /><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Alamat email" className="rounded-xl border border-[#DCE3EE] px-4 py-3 text-sm" /><button type="submit" className="rounded-xl bg-[#16834C] px-5 py-3 text-sm font-bold text-white">Simpan</button></form>}<section className="mt-7 overflow-x-auto rounded-2xl border border-[#E4E9F2] bg-white p-5 shadow-sm"><div className="min-w-180"><div className="grid grid-cols-[1.2fr_1.5fr_0.8fr_0.7fr] gap-4 border-b border-[#EEF1F6] px-3 pb-3 text-[11px] font-bold uppercase tracking-wider text-[#9AA6B8]"><span>Nama</span><span>Email</span><span>Peran</span><span>Status</span></div>{users.map((user) => <div key={user.email} className="grid grid-cols-[1.2fr_1.5fr_0.8fr_0.7fr] items-center gap-4 border-b border-[#F3F5F8] px-3 py-4 last:border-0"><span className="text-sm font-semibold">{user.name}</span><span className="text-sm text-[#728197]">{user.email}</span><span className="w-fit rounded-full bg-[#EAF1FF] px-3 py-1 text-[11px] font-bold text-[#1E3A8A]">{user.role}</span><span className="text-xs font-bold text-[#16834C]">● {user.status}</span></div>)}</div></section></div></main>;
}
