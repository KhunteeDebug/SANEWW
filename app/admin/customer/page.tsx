"use client";

import { useEffect, useState } from "react";

interface Booking {
  _id: string;
  username: string;
  pc_id: string;
  start_time: string;
  end_time: string;
  booking_status: string;
  slip_url: string;
  created_at: string;
}

function formatThaiBE(dateStr: string) {
  const d = new Date(dateStr);
  const year = d.getFullYear() + 543;
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${day}/${month}/${year}`;
}

export default function CustomersPage() {
  const [rows, setRows] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState<Booking | null>(null);

  useEffect(() => {
  async function fetchBookings() {
    try {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      const currentDate = `${yyyy}-${mm}-${dd}`;

      const res = await fetch(`/api/admin/getBookingAll?start=${currentDate}`, { cache: "no-store" });
      const data = await res.json();
      if (data.success && Array.isArray(data.bookings)) {
        setRows(data.bookings);
      } else {
        setRows([]);
      }
    } catch (err) {
      console.error("Error loading bookings:", err);
      setRows([]);
    } finally {
      setLoading(false);
    }
  }
  fetchBookings();
}, []);


  return (
    <div className="min-h-screen bg-image text-slate-100 px-4 py-8 pt-50">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Customers</h1>
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
                {loading ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-4 text-center">
                      Loading...
                    </td>
                  </tr>
                ) : rows.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-4 text-center">
                      No data
                    </td>
                  </tr>
                ) : (
                  rows.map((r) => (
                    <tr
                      key={r._id}
                      className="hover:bg-slate-800/40 cursor-pointer"
                      onClick={() => setSelectedRow(r)}
                    >
                      <td className="px-6 py-4">{r.username}</td>
                      <td className="px-6 py-4">{formatThaiBE(r.start_time)}</td>
                      <td className="px-6 py-4">
                        {new Date(r.start_time).toLocaleTimeString("th-TH", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        -{" "}
                        {new Date(r.end_time).toLocaleTimeString("th-TH", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))
                )}
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
              className="absolute top-2 right-2 text-white font-bold text-xl"
              onClick={() => setSelectedRow(null)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">{selectedRow.username}</h2>
            <div className="space-y-1 text-sm">
              <p>
                PC | <strong>{selectedRow.pc_id}</strong>
              </p>
              <p>
                Status | <strong>{selectedRow.booking_status}</strong>
              </p>
              <p>
                Start |{" "}
                <strong>
                  {new Date(selectedRow.start_time).toLocaleString("th-TH")}
                </strong>
              </p>
              <p>
                End |{" "}
                <strong>
                  {new Date(selectedRow.end_time).toLocaleString("th-TH")}
                </strong>
              </p>
              <p>
                Created |{" "}
                <strong>
                  {new Date(selectedRow.created_at).toLocaleString("th-TH")}
                </strong>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
