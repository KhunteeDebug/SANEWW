"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface PC {
  _id: string;
  Computer_Name: string;
  PC_ID: string;
  img?: string;
  enable: boolean;
}

export default function Booking() {
  const [pcs, setPcs] = useState<PC[]>([]);
  const [availableNames, setAvailableNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // โหลด PCs ทั้งหมด
  useEffect(() => {
    async function fetchPCs() {
      setLoading(true); // เริ่มโหลด
      try {
        const res = await fetch("/api/pc_manage", { cache: "no-store" });
        const data = await res.json();
        console.log("PCs response:", data);
        if (Array.isArray(data.computers)) {
          setPcs(data.computers);
        } else {
          setPcs([]);
        }
      } catch (err) {
        console.error(err);
        setPcs([]);
      } finally {
        setLoading(false); // โหลดเสร็จ
      }
    }
    fetchPCs();
  }, []);

  // โหลด availablePCs เมื่อเลือกเวลา
  useEffect(() => {
    async function fetchAvailablePCs() {
      if (!selectedDate || !startTime || !endTime) {
        // ถ้าไม่ได้เลือกเวลา → แสดงทั้งหมด
        setAvailableNames([]);
        return;
      }

      setLoading(true);
      try {
        const startISO = new Date(`${selectedDate}T${startTime}`).toISOString();
        const endISO = new Date(`${selectedDate}T${endTime}`).toISOString();

        const res = await fetch(
          `/api/admin/selecttime?start=${encodeURIComponent(startISO)}&end=${encodeURIComponent(endISO)}`,
          { cache: "no-store" }
        );
        const data = await res.json();
        console.log("AvailablePCs response:", data);

        if (Array.isArray(data.availablePCs)) {
          setAvailableNames(data.availablePCs);
        } else {
          setAvailableNames([]);
        }
      } catch (err) {
        console.error(err);
        setAvailableNames([]);
      } finally {
        setLoading(false);
      }
    }

    fetchAvailablePCs();
  }, [selectedDate, startTime, endTime]);

  // ถ้ามี availablePCs → filter pcs ให้เหลือเฉพาะที่ตรง
  const filteredPCs =
    availableNames.length > 0
      ? pcs.filter((pc) => availableNames.includes(pc.PC_ID))
      : pcs;

  // const enabledPCs = filteredPCs.filter((pc) => pc.enable);

  return (
    <div className="min-h-screen bg-image flex flex-col items-center px-4 sm:px-6 py-6 pt-30">
      <div className="w-full max-w-7xl space-y-6">
        {/* Top controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Date */}
          <div className="bg-white/10 rounded-md p-3 flex items-center justify-between md:justify-center gap-3 backdrop-blur">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-200"
            />
            {selectedDate && (
              <p className="mt-4 text-white ml-3">
                วันที่ที่คุณเลือก: <span className="font-bold">{selectedDate}</span>
              </p>
            )}
          </div>

          {/* Start time */}
          <div className="bg-white/10 rounded-md p-3 flex items-center justify-between md:justify-center gap-3 backdrop-blur">
            <h1 className="text-white font-bold">Start</h1>
            <div>
              <input
                id="timeStart"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="h-11 w-[300px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              />
            </div>
          </div>

          {/* End time */}
          <div className="bg-white/10 rounded-md p-3 flex items-center justify-between md:justify-center gap-3 backdrop-blur">
            <h1 className="text-white font-bold">End</h1>
            <div>
              <input
                id="timeEnd"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="h-11 w-[300px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              />
            </div>
          </div>
        </div>

        {/* PC cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {loading ? (
            <p className="text-white">Loading...</p>
          ) : !selectedDate || !startTime || !endTime ? (
            <p className="text-white text-center col-span-full">
              กรุณาเลือกวันที่และเวลาเพื่อดูเครื่องคอมพิวเตอร์ที่พร้อมใช้งาน
            </p>
          ) : filteredPCs.length === 0 ? (
            <p className="text-white text-center col-span-full">No PCs available</p>
          ) : (
            filteredPCs
              .filter(pc => pc.enable)
              .map((pc, i) => (
                <Link
                  key={pc._id || i}
                  href={`/confirm_pc/${selectedDate}T${startTime}/${selectedDate}T${endTime}/${pc.PC_ID}`}
                  className="group bg-[#802834] rounded-md overflow-hidden shadow-md transition hover:shadow-lg"
                >
                  <div className="relative w-full aspect-[4/3]">
                    <Image
                      src={"/PC.png"}
                      alt={pc.Computer_Name}
                      fill
                      className="object-contain p-2"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="py-2 px-3">
                    <h1 className="text-white text-center text-base sm:text-lg">
                      {pc.Computer_Name + `(เครื่องที่ ${i + 1})`}
                    </h1>
                  </div>
                </Link>
              ))
          )}
        </div>
      </div>
    </div>
  );
}
