"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from "next/link"
import Image from "next/image";
type Form = {
  Computer_Name: string;
  PC_ID: string;
  description: string;
  enable: boolean;
  img: string;
};

const ZONES = ["Zone A", "Zone B", "Zone C"];
const STATUS = [
  { value: "available", label: "Available" },
  { value: "busy", label: "Busy" },
  { value: "maintenance", label: "Maintenance" },
];

export default function AddPcPage() {
  const router = useRouter();
  const [form, setForm] = useState<Form>({
    Computer_Name: "",
    PC_ID: "",
    description: "",
    enable: false,
    img: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = <K extends keyof Form>(k: K, v: Form[K]) =>
    setForm((p) => ({ ...p, [k]: v }));


  // const validate = () => {
  //   const e: Record<string, string> = {};
  //   if (!form.PC_ID.trim()) e.PC_ID = "กรอก PC ID";
  //   if (!form.Computer_Name.trim()) e.Computer_Name = "กรอก Computer Name";
  //   if (!form.cpu.trim()) e.cpu = "กรอก CPU";
  //   if (!form.gpu.trim()) e.gpu = "กรอก GPU";
  //   if (!form.ram.trim()) e.ram = "กรอก RAM";
  //   if (!form.storage.trim()) e.storage = "กรอก Storage";
  //   setErrors(e);
  //   return Object.keys(e).length === 0;
  // };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/addpc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        toast.success("เข้าสู่ระบบสำเร็จ 🎉");

        // redirect ไปหน้า dashboard
        // setTimeout(() => {
        //   router.push("admin/pcwalkin");
        // }, 1000);
      } else {
        toast.error((data.message || "Login failed"));
      }
    } catch (err) {
      toast.error("⚠️ Error: " + err);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative text-slate-100 bg-image pt-[5rem]">
      <div className="absolute inset-0 bg-black/70" />

      <main className="relative z-10 max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-center text-3xl font-bold mb-6">Add Pc</h1>

        <form
          onSubmit={onSubmit}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6"
        >
          {/* 2 columns on md+, 1 column on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* PC ID */}
            <div>
              <label className="block text-sm mb-2 opacity-90">PC ID</label>
              <input
                value={form.PC_ID}
                onChange={(e) => set("PC_ID", e.target.value)}
                placeholder="PC-07"
                className={`w-full rounded-lg bg-white/10 border px-4 py-3 outline-none focus:ring-2
                  ${errors.PC_ID ? "border-rose-500 focus:ring-rose-500" : "border-white/15 focus:ring-rose-500/60"}`}
              />
              {errors.PC_ID && <p className="text-rose-400 text-xs mt-1">{errors.PC_ID}</p>}
            </div>

            {/* Computer Name */}
            <div>
              <label className="block text-sm mb-2 opacity-90">Computer Name</label>
              <input
                value={form.Computer_Name}
                onChange={(e) => set("Computer_Name", e.target.value)}
                placeholder="GAMESHOP-07"
                className={`w-full rounded-lg bg-white/10 border px-4 py-3 outline-none focus:ring-2
                  ${errors.Computer_Name ? "border-rose-500 focus:ring-rose-500" : "border-white/15 focus:ring-rose-500/60"}`}
              />
              {errors.Computer_Name && <p className="text-rose-400 text-xs mt-1">{errors.Computer_Name}</p>}
            </div>

            {/* Zone */}
            {/* <div>
              <label className="block text-sm mb-2 opacity-90">Zone</label>
              <select
                value={form.zone}
                onChange={(e) => set("zone", e.target.value)}
                className="w-full rounded-lg bg-white/10 border border-white/15 px-4 py-3 outline-none focus:ring-2 focus:ring-rose-500/60"
              >
                {ZONES.map((z) => (
                  <option key={z} value={z}>
                    {z}
                  </option>
                ))}
              </select>
            </div> */}

            {/* Status */}
            {/* <div>
              <label className="block text-sm mb-2 opacity-90">Status</label>
              <select
                value={form.status}
                onChange={(e) => set("status", e.target.value as Form["status"])}
                className="w-full rounded-lg bg-white/10 border border-white/15 px-4 py-3 outline-none focus:ring-2 focus:ring-rose-500/60"
              >
                {STATUS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div> */}

            {/* CPU */}
            {/* <div>
              <label className="block text-sm mb-2 opacity-90">CPU</label>
              <input
                value={form.cpu}
                onChange={(e) => set("cpu", e.target.value)}
                placeholder="Intel i7 14700F"
                className={`w-full rounded-lg bg-white/10 border px-4 py-3 outline-none focus:ring-2
                  ${errors.cpu ? "border-rose-500 focus:ring-rose-500" : "border-white/15 focus:ring-rose-500/60"}`}
              />
              {errors.cpu && <p className="text-rose-400 text-xs mt-1">{errors.cpu}</p>}
            </div> */}

            {/* RAM */}
            {/* <div>
              <label className="block text-sm mb-2 opacity-90">RAM</label>
              <input
                value={form.ram}
                onChange={(e) => set("ram", e.target.value)}
                placeholder="32 GB"
                className={`w-full rounded-lg bg-white/10 border px-4 py-3 outline-none focus:ring-2
                  ${errors.ram ? "border-rose-500 focus:ring-rose-500" : "border-white/15 focus:ring-rose-500/60"}`}
              />
              {errors.ram && <p className="text-rose-400 text-xs mt-1">{errors.ram}</p>}
            </div> */}

            {/* GPU */}
            {/* <div>
              <label className="block text-sm mb-2 opacity-90">GPU</label>
              <input
                value={form.gpu}
                onChange={(e) => set("gpu", e.target.value)}
                placeholder="RTX 5060 Ti 16GB"
                className={`w-full rounded-lg bg-white/10 border px-4 py-3 outline-none focus:ring-2
                  ${errors.gpu ? "border-rose-500 focus:ring-rose-500" : "border-white/15 focus:ring-rose-500/60"}`}
              />
              {errors.gpu && <p className="text-rose-400 text-xs mt-1">{errors.gpu}</p>}
            </div> */}

            {/* Storage */}
            {/* <div>
              <label className="block text-sm mb-2 opacity-90">Storage</label>
              <input
                value={form.storage}
                onChange={(e) => set("storage", e.target.value)}
                placeholder="NVMe M.2 512GB"
                className={`w-full rounded-lg bg-white/10 border px-4 py-3 outline-none focus:ring-2
                  ${errors.storage ? "border-rose-500 focus:ring-rose-500" : "border-white/15 focus:ring-rose-500/60"}`}
              />
              {errors.storage && <p className="text-rose-400 text-xs mt-1">{errors.storage}</p>}
            </div>*/}
          </div>

          {/* description */}
          <div>
            <label className="block text-sm mb-2 opacity-90">หมายเหตุ</label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={4}
              placeholder="รายละเอียดเพิ่มเติม..."
              className="w-full rounded-lg bg-white/10 border border-white/15 px-4 py-3 outline-none focus:ring-2 focus:ring-rose-500/60"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-3 rounded-lg bg-[#802834] hover:bg-[#6a202a] disabled:opacity-60 font-semibold"
            >
              {submitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </main>
      <div className="hidden lg:flex flex-col items-end">
        {/* ใช้ sticky ให้อยู่แถวบนขวาเสมอ (เลื่อนหน้าก็ยังเห็น) */}
        <div className="sticky top-6">
          <Link
            href="/Add"
            className="group w-[84px] h-[84px] rounded-xl border border-white/20 bg-[#802834] hover:bg-[#6a202a] flex flex-col items-center justify-center shadow-md transition"
            title="Add Computer"
          >
            <Image src="/plus.png" alt="Add" width={28} height={28} className="mb-1" />
            <span className="text-white text-[11px] font-medium opacity-90 group-hover:opacity-100">
              Add
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
