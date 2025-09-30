"use client";

import { useEffect, useState } from "react";

type Row = {
    id: string;
    username: string;
    datetime: string; // YYYY-MM-DD
    details: string; // YYYY-MM-DD
    time: string;     // HH:mm
};

/** YYYY-MM-DD (BE หรือ CE) → DD/MM/YYYY (BE) */
function formatThaiBE(dateStr: string): string {
    const [yStr, mStr, dStr] = dateStr.split("-");
    const y = Number(yStr);
    const m = Number(mStr);
    const d = Number(dStr);
    const beYear = y >= 2400 ? y : y + 543;
    return `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${beYear}`;
}

export default function ListPage() {
    const [rows, setRows] = useState<Row[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const res = await fetch("/api/history");
                const data = await res.json();

                if (data.success && Array.isArray(data.logs)) {
                    const mapped: Row[] = data.logs.map((log: any, idx: number) => {
                        const dt = new Date(log.timestamp);
                        const yyyy = dt.getFullYear();
                        const mm = String(dt.getMonth() + 1).padStart(2, "0");
                        const dd = String(dt.getDate()).padStart(2, "0");

                        return {
                            id: log._id ?? String(idx),
                            username: log.username,
                            datetime: `${yyyy}-${mm}-${dd}`,
                            details: log.details,
                            time: `${String(dt.getHours()).padStart(2, "0")}:${String(
                                dt.getMinutes()
                            ).padStart(2, "0")}`,
                        };
                    });
                    setRows(mapped);
                }
            } catch (e) {
                console.error("Load history error:", e);
            } finally {
                setLoading(false);
            }
        }

        load();
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
                        {loading ? (
                            <div className="p-6 text-center text-slate-400">Loading...</div>
                        ) : (   
                            <table className="min-w-full">
                                <thead>
                                    <tr className="bg-slate-950/70 text-slate-300 text-sm">
                                        {/* <th className="px-6 py-4 text-left font-semibold">
                                            Username
                                        </th> */}
                                        <th className="px-6 py-4 text-left font-semibold">
                                            Details
                                        </th>
                                        <th className="px-6 py-4 text-left font-semibold">
                                            Datetime (พ.ศ.)
                                        </th>
                                        <th className="px-6 py-4 text-left font-semibold">Time</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800">
                                    {rows.map((r) => (
                                        <tr key={r.id} className="hover:bg-slate-800/40">
                                            {/* <td className="px-6 py-4">{r.username}</td> */}
                                            <td className="px-6 py-4">{r.details}</td>
                                            <td className="px-6 py-4">{formatThaiBE(r.datetime)}</td>
                                            <td className="px-6 py-4">{r.time}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                    <div className="h-2 bg-slate-900/60" />
                </div>
            </div>
        </div>
    );
}
