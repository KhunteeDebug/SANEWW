"use client"
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

interface Incomedata {
  totalIncome: string;
}

export default function HomeAdminPage() {
  const menuItems = [
    { label: "CUSTOMERS", icon: "/person-HomeAdmin.png", route: "/admin/customer" },
    { label: "PC MONITORING", icon: "/computer.png", route: "/admin/pcmonitor" },
    { label: "SELECT TIME", icon: "/computer.png", route: "/admin/select_time" },
    { label: "EDIT PROMOTION", icon: "/edit-promotion.png", route: "/admin/uploadpromotion" },
  ];

  const [income, setIncome] = useState<Incomedata | null>(null);

  useEffect(() => {
    const fetchIncomeData = async () => {
      try {
        const res = await fetch("/api/admin/incometoday", {
          method: "GET",
          credentials: "include",
        });
        const json = await res.json();
        if (res.ok) {
          setIncome(json);
        } else {
          console.warn("Not authenticated");
        }
      } catch (err) {
        console.error("Failed to fetch income:", err);
      }
    };

    fetchIncomeData();
  }, []);

  return (
    <div className="bg-image min-h-screen flex flex-col justify-center items-center text-white">
      {/* รายได้วันนี้ */}
      <div className="mb-8 px-6 py-3 bg-[#D9D9D9]/50 rounded-xl shadow-lg ring-1 ring-white/20 backdrop-blur">
        <h1 className="text-sm text-gray-200">รายได้วันนี้</h1>
        <p className="text-2xl font-semibold">
          {income ? Number(income.totalIncome).toLocaleString("th-TH", { minimumFractionDigits: 2 }) : "0.00"}
        </p>
      </div>

      {/* Main content */}
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, i) => (
            <Link key={i} href={item.route}>
              <div className="bg-[#D9D9D9]/50 min-h-[220px] rounded-xl shadow-xl flex flex-col justify-center items-center cursor-pointer hover:scale-105 transition-transform duration-200">
                <Image src={item.icon} alt={item.label} width={100} height={100} />
                <span className="mt-4 font-bold text-center text-sm sm:text-base md:text-lg">
                  {item.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
