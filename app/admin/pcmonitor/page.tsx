"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import togglePC from "./togglePC";
import Link from "next/link";

interface PC {
  PC_ID: string;
  name: string;
  enable: boolean;
}

export default function PcMonitorPage() {
  const [selectedDate, setSelectedDate] = useState("");
  const [bookings, setBookings] = useState<any[]>([]);
  const [pcs, setPcs] = useState<PC[]>([]);
  const [loading, setLoading] = useState(true);

  const timeSlots = [
    "08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00",
    "11:00 - 12:00", "13:00 - 14:00", "14:00 - 15:00",
    "15:00 - 16:00", "16:00 - 17:00", "17:00 - 18:00",
    "18:00 - 19:00", "19:00 - 20:00", "20:00 - 21:00",
  ];

  // dynamic map ของ PC_ID -> PC name
  const [pcIdMap, setPcIdMap] = useState<Record<string, string>>({});

  // โหลดข้อมูล PC จาก API
  useEffect(() => {
    const fetchPCs = async () => {
      try {
        const res = await fetch("/api/pc_manage", { cache: "no-store" });
        const data = await res.json();
        if (Array.isArray(data.computers)) {
          // สร้าง pcs เป็น object พร้อม enable
          const newPcs: PC[] = data.computers.map((pc: any) => ({
            PC_ID: pc.PC_ID,
            name: pc.PC_ID,
            enable: pc.enable ?? true, // default true
          }));

          setPcs(newPcs);

          // สร้าง map dynamic
          const newMap: Record<string, string> = {};
          newPcs.forEach((pc) => {
            newMap[pc.PC_ID] = pc.name;
          });
          setPcIdMap(newMap);
        } else {
          setPcs([]);
        }
      } catch (err) {
        console.error("Error fetching PCs:", err);
        setPcs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPCs();
  }, []);

  // โหลด booking จาก API เมื่อเปลี่ยนวันที่
  useEffect(() => {
    if (!selectedDate || pcs.length === 0) return;
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/admin/getBookingAll?start=${selectedDate}`);
        const data = await res.json();
        if (data.success) {
          setBookings(data.bookings || []);
        } else {
          setBookings([]);
        }
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setBookings([]);
      }
    };
    fetchData();
  }, [selectedDate, pcs]);

  // แปลง bookings เป็น map { PC -> { timeSlot -> booking } }
  const bookingMap: Record<string, Record<string, any>> = {};
  pcs.forEach((pc) => (bookingMap[pc.name] = {}));

  bookings.forEach((b) => {
    const startHour = new Date(b.start_time).getHours();
    const endHour = new Date(b.end_time).getHours();

    const pcName = pcIdMap[b.pc_id] || "PC";

    for (let h = startHour; h < endHour; h++) {
      const slotLabel = `${String(h).padStart(2, "0")}:00 - ${String(
        h + 1
      ).padStart(2, "0")}:00`;
      bookingMap[pcName][slotLabel] = b;
    }
  });

  const renderCell = (pc: string, slot: string) => {
    const booking = bookingMap[pc]?.[slot];
    if (!booking) {
      return (
        <td className="border px-2 py-6 bg-green-600 min-w-[100px]">
          Available
        </td>
      );
    }
    const statusClass =
      booking.booking_status === "approved" ? "bg-yellow-500" : "bg-blue-500";
    const statusText =
      booking.booking_status === "approved" ? "BOOKED" : "IN USE";

    return (
      <td className={`border px-2 py-6 min-w-[100px] ${statusClass}`}>
        <div className="flex flex-col items-center">
          <span className="font-bold uppercase">{statusText}</span>
          <span className="text-xs">{booking.username}</span>
        </div>
      </td>
    );
  };

  if (loading) {
    return <p className="text-white p-4">Loading PCs...</p>;
  }

  return (
    <>
      {/* NavBar-Admin */}
      <div className="bg-[#802834] h-[10vh] fixed top-0 left-0 right-0 z-50 flex items-center justify-end px-4">
        <div className="hidden md:flex items-center gap-4">
          <Link href="/">
            <div className="h-12 w-12 flex items-center justify-center rounded-md bg-white hover:bg-gray-200 transition">
              <Image src="/home.png" alt="home" width={24} height={24} />
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <button className="flex items-center">
              <Image
                src="/persona.jpg"
                alt="profile"
                width={50}
                height={50}
                className="object-cover rounded-full z-10"
              />
              <div className="-ml-4 h-12 px-3 bg-white rounded-md flex items-center shadow-lg">
                <h1 className="font-bold text-[#802834] text-sm md:text-lg ml-2">
                  HELLO! ADMIN
                </h1>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="min-h-screen bg-[url('/backgraund.jpg')] bg-center bg-cover p-3 pt-[12vh]">
        {/* Date Picker */}
        <div className="mt-2">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 rounded-md bg-gray-200 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#802834] transition"
          />
        </div>

        {/* Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="border-collapse w-full text-center text-white text-xs sm:text-sm md:text-base min-w-[800px]">
            <thead>
              <tr className="bg-gray-700">
                <th className="border px-2 py-3 min-w-[80px]">PC</th>
                {timeSlots.map((time, i) => (
                  <th key={i}>{time}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pcs.map((pc, idx) => (
                <tr key={idx} className="bg-gray-800 hover:bg-gray-600">
                  {/* PC Name + Toggle */}
                  <td className="border px-2 py-3 font-bold min-w-[80px]">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-1">
                      <span>{pc.name}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={pc.enable}
                          onChange={async (e) => {
                            const checked = e.target.checked;
                            await togglePC(pc.PC_ID, checked);

                            setPcs((prev) =>
                              prev.map((p) =>
                                p.PC_ID === pc.PC_ID ? { ...p, enable: checked } : p
                              )
                            );
                          }}
                          className="sr-only peer"
                        />
                        <div className="w-10 h-5 bg-red-300 rounded-full peer peer-checked:bg-green-300 transition-colors duration-300"></div>
                        <div className="absolute left-[2px] top-[2px] bg-white w-4 h-4 rounded-full shadow-md transition-transform duration-300 peer-checked:translate-x-5"></div>
                      </label>
                    </div>
                  </td>

                  {/* Cells */}
                  {timeSlots.map((slot, j) => (
                    <React.Fragment key={j}>
                      {renderCell(pc.name, slot)}
                    </React.Fragment>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
