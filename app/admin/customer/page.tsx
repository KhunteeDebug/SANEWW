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

// ประเภทของข้อมูลแต่ละ row
type Row = {
  id: string;
  username: string;
  datetime: string; // YYYY-MM-DD
  time: string;     // HH:mm
};

export default function ListPage() {
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/getAlluser");
        const json = await res.json();

        if (!json.success || !Array.isArray(json.users)) return;

        const mapped: Row[] = json.users.map((user: any) => {
          const createdAt = new Date(user.create_data);

          const datePart = createdAt.toISOString().split("T")[0]; // YYYY-MM-DD
          const timePart = createdAt.toTimeString().slice(0, 5); // HH:mm

          return {
            id: user._id,
            username: user.username,
            datetime: datePart,
            time: timePart,
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
            <h1 className="text-2xl font-bold">History</h1>
            <p className="text-slate-400 text-sm">User · Datetime · Time</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-slate-950/70 text-slate-300 text-sm">
                  <th className="px-6 py-4 text-left font-semibold">Username</th>
                  <th className="px-6 py-4 text-left font-semibold">Datetime (พ.ศ.)</th>
                  <th className="px-6 py-4 text-left font-semibold">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {rows.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-800/40">
                    <td className="px-6 py-4">{r.username}</td>
                    <td className="px-6 py-4">{formatThaiBE(r.datetime)}</td>
                    <td className="px-6 py-4">{r.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="h-2 bg-slate-900/60" />
        </div>
      </div>
    </div>
  );
}
