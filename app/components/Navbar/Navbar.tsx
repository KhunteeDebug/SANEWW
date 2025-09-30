"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface UserData {
  username: string;
  points: number;
  role: string;
}

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);

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
            setUser(json.message); // รองรับหลายรูปแบบ response
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
    <div className="bg-[#802834] duration-200 h-[10vh] z-[100] fixed w-full flex items-center justify-between px-4">
      {/* LEFT: Profile + Menu Desktop */}
      <div className="flex items-center gap-4 w-full">
        {/* Profile Button */}
        <button className="flex items-center">
          <Image
            src="/persona.jpg"
            alt="profile"
            width={60}
            height={60}
            className="object-cover rounded-full z-10"
          />
          <div className="-ml-5 h-14 w-50 bg-white rounded-md flex items-center px-3 shadow-lg">
            <h1 className="font-bold text-[#802834] text-sm md:text-xl ml-4">
              HELLO! {user ? user.username : "USER"}
            </h1>
          </div>
        </button>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center gap-4 ml-4">
          <Link href="/select_time">
            <div className="h-14 w-40 bg-white rounded-md flex items-center gap-2 hover:bg-gray-100 transition">
              <Image
                src="/computer.png"
                alt="computer"
                width={30}
                height={30}
                className="object-contain ml-3"
              />
              <h1 className="ml-2 text-black font-bold text-lg">BOOKING</h1>
            </div>
          </Link>
          <Link href="/history">
            <div className="h-14 w-40 bg-white rounded-md flex items-center gap-2 hover:bg-gray-100 transition">
              <Image
                src="/clock.png"
                alt="History"
                width={30}
                height={30}
                className="object-contain ml-3"
              />
              <h1 className="ml-2 text-black font-bold text-lg">HISTORY</h1>
            </div>
          </Link>

          {user?.role == "Admin" && (
            <Link href="/admin">
              <div className="h-14 w-40 bg-white rounded-md flex items-center gap-2 hover:bg-gray-100 transition">
                <Image
                  src="/setting.png"
                  alt="Admin"
                  width={30}
                  height={30}
                  className="object-contain ml-3"
                />
                <h1 className="ml-2 text-black font-bold text-lg">Admin</h1>
              </div>
            </Link>
          )}

        </div>
      </div>

      {/* RIGHT: Desktop Menu */}
      <div className="hidden md:flex items-center gap-4">
        <Link href="/">
          <div className="h-14 w-14 flex items-center justify-center rounded-md bg-white hover:bg-gray-200 transition">
            <Image src="/home.png" alt="home" width={24} height={24} />
          </div>
        </Link>

        <Link href="/info">
          <div className="h-14 w-14 flex items-center justify-center rounded-md bg-white hover:bg-gray-200 transition">
            <Image src="/person+info+filled.png" alt="info" width={24} height={24} />
          </div>
        </Link>

        <Link href="">
          <div className="h-14 w-32 bg-white rounded-md flex flex-col justify-center">
            <h1 className="text-black font-bold text-center text-sm">POINT BALANCE</h1>
            <h1 className="text-lg text-[#802834] font-bold text-center">
              {user ? user.points.toFixed(2) : "000.00"}
            </h1>
          </div>
        </Link>
      </div>

      {/* Hamburger Button for Mobile */}
      <div className="md:hidden">
        <button
          className="text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <span className="text-3xl">&times;</span>
          ) : (
            <span className="text-3xl">&#9776;</span>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-[10vh] left-0 w-full bg-[#802834] text-white flex flex-col items-center py-4 space-y-4 shadow-lg md:hidden">
          <Link href="/booking" className="w-full text-center py-2 hover:bg-[#5d1c26]">
            BOOKING
          </Link>
          <Link href="/history" className="w-full text-center py-2 hover:bg-[#5d1c26]">
            HISTORY
          </Link>
          <Link href="/" className="w-full text-center py-2 hover:bg-[#5d1c26]">
            HOME
          </Link>
          <Link href="/info" className="w-full text-center py-2 hover:bg-[#5d1c26]">
            INFO
          </Link>
          <Link href="/point" className="w-full text-center py-2 hover:bg-[#5d1c26]">
            POINT BALANCE
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
