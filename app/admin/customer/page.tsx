"use client";

import { useEffect, useState } from "react";

function formatThaiBE(dateStr: string): string {
  const [yStr, mStr, dStr] = dateStr.split("-");
  let y = Number(yStr);
  const m = Number(mStr);
  const d = Number(dStr);
  const beYear = y >= 2400 ? y : y + 543;
  const dd = String(d).padStart(2, "0");
  const mm = String(m).padStart(2, "0");
  return `${dd}/${mm}/${beYear}`;
}

type Row = {
  id: string;
  username: string;
  points: number;
  reason: string;
  ban: boolean;
  datetime: string;
  time: string;
  email?: string;
  role?: string;
  create_data?: string;
};

export default function ListPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [selectedRow, setSelectedRow] = useState<Row | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/getAlluser");
        const json = await res.json();
        if (!json.success || !Array.isArray(json.users)) return;

        const mapped: Row[] = json.users.map((user: any) => {
          const createdAt = new Date(user.create_data);
          const datePart = createdAt.toISOString().split("T")[0];
          const timePart = createdAt.toTimeString().slice(0, 5);

          return {
            id: user._id,
            username: user.username,
            points: user.points ?? 0,
            reason: user.reason ?? "",
            ban: user.ban ?? false,
            datetime: datePart,
            time: timePart,
            email: user.email ?? "",
            role: user.role ?? "",
            create_data: user.create_data ?? "",
          };
        });

        setRows(mapped);
      } catch (err) {
        console.error("Fetch failed:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-image text-slate-100 px-4 py-8 pt-50">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Customers</h1>
            <p className="text-slate-400 text-sm">User · Email · Create Date</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-slate-950/70 text-slate-300 text-sm">
                  <th className="px-6 py-4 text-left font-semibold">Username</th>
                  <th className="px-6 py-4 text-left font-semibold">Email</th>
                  <th className="px-6 py-4 text-left font-semibold">Create Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {rows.map((r) => (
                  <tr
                    key={r.id}
                    className="hover:bg-slate-800/40 cursor-pointer"
                    onClick={() => setSelectedRow(r)}
                  >
                    <td className="px-6 py-4">{r.username}</td>
                    <td className="px-6 py-4">{r.email}</td>
                    <td className="px-6 py-4">{r.create_data}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="h-2 bg-slate-900/60" />
        </div>
      </div>

      {/* Popup */}
      {selectedRow && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-900 rounded-xl p-6 w-96 relative shadow-lg">
             <button
              className="absolute top-2 right-2 text-white font-bold text-xl bg-red"
              onClick={() => setSelectedRow(null)}
            >
               &times;
            </button>
            <h2 className="text-xl font-bold mb-4">{selectedRow.username}</h2>
            <div className="space-y-1 text-sm">
              <p>Points | <strong className="ml-auto">{selectedRow.points}</strong></p>
              <p>Ban | <strong className="ml-auto">{selectedRow.ban ? "Yes" : "No"}</strong></p>
              <p>Role | <strong className="ml-auto">{selectedRow.role}</strong></p>
              <p>Email | <strong className="ml-auto">{selectedRow.email}</strong></p>
              <p>Time | <strong className="ml-auto">{selectedRow.time}</strong></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
