"use client";


import Image from "next/image";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
interface UserData {
    username: string;
    points: number;
}

export default function RedeemPointsPage({ params }: { params: Promise<{ id: string; start: string; end: string }> }) {
    const [points, setPoints] = useState("");
    const { id, start, end } = React.use(params);
    const [user, setUser] = useState<UserData | null>(null);
    const point_diss = (parseInt(points || "0") / 100).toFixed(0);



    // ✅ decode แล้ว parse Date
    const startDate = useMemo(() => new Date(decodeURIComponent(start)), [start]);
    const endDate = useMemo(() => new Date(decodeURIComponent(end)), [end]);

    // ✅ คำนวณชั่วโมง
    const hours = useMemo(() => {
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return 0;
        const diffMs = endDate.getTime() - startDate.getTime();
        const diffHours = diffMs / (1000 * 60 * 60);
        return diffHours > 0 ? diffHours : 0;
    }, [startDate, endDate]);

    // ✅ คำนวณราคา
    const price = hours * 50;

    // ✅ format วันที่
    const formatDate = (date: Date) => {
        if (isNaN(date.getTime())) return "-";
        return date.toLocaleString("th-TH", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await fetch("/api/getData", {
                    method: "GET",
                    credentials: "include",
                });

                if (res.ok) {
                    const json = await res.json();
                    if (json?.data || json?.message) {
                        setUser(json.data || json.message); // รองรับหลายรูปแบบ response
                    }
                } else {
                    console.warn("Not authenticated");
                }
            } catch (err) {
                console.error("Failed to fetch user:", err);
            }
        };

        fetchUserData();
    }, []);


    return (
        <div className="min-h-screen bg-[url('/backgraund.jpg')] text-white bg-center bg-cover flex flex-col">
            {/* Spacer */}
            <div className="h-[10vh] px-6"></div>

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-center p-4 sm:p-6 lg:p-8">
                {/* PC Image & Label */}
                <div className="text-center w-full sm:w-[80%] md:w-[60%] lg:w-auto">
                    <Image
                        src="/PC.png"
                        alt="PC"
                        width={400}
                        height={300}
                        className="rounded shadow mx-auto"
                    />
                    <div className="mt-2 bg-[#9F3F3F] py-2 px-4 rounded font-bold text-sm sm:text-base">
                        เครื่อง {id}
                    </div>
                </div>

                {/* Booking Info + Redeem Form */}
                <div className="bg-[#2F2F2F] p-4 sm:p-6 rounded shadow w-full max-w-[300px]">
                    <h2 className="text-lg sm:text-xl font-bold mb-4">รายการจอง</h2>
                    <p className="text-sm sm:text-base">PC : {id}</p>
                    <p className="text-sm sm:text-base">วันเริ่ม : {formatDate(startDate)}</p>
                    <p className="text-sm sm:text-base">วันสิ้นสุด : {formatDate(endDate)}</p>
                    <p className="text-sm sm:text-base">ชั่วโมง : {hours.toFixed(2)}</p>
                    <p className="text-sm sm:text-base">ราคา : {price.toFixed(2)}</p>

                   
                </div>
            </div>

            {/* Footer Buttons */}
            <div className="p-4 sm:p-6 h-[10vh] z-[100] fixed bottom-0 w-full flex items-center justify-between 
          bg-transparent sm:bg-[#802834]">
                <Link href={"/admin/select_time"}>
                    <button className="bg-white text-black px-4 sm:px-6 py-2 rounded font-bold text-sm sm:text-base">
                        ⬅ BACK
                    </button>
                </Link>
                <Link
                    href={`/admin/payment/${start}/${end}/${id}/${hours.toFixed(2)}/${price}/${price.toFixed(1)}/${point_diss}`}
                >



                    <button className="bg-white text-black px-4 sm:px-6 py-2 rounded font-bold text-sm sm:text-base">
                        NEXT ➡
                    </button>
                </Link>
            </div>
        </div>
    );
}

