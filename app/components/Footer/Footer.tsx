"use client";
import React from 'react'
import Image from 'next/image'

const logout = async () => {
  await fetch("/api/auth/logout", { method: "GET" });
  window.location.href = "/login";
};

const Footer = () => {
  return (
    <div className="bg-[#802834] duration-200 h-[10vh] z-[100] fixed w-full flex items-center bottom-0 justify-between">
      <div className="flex items-center w-full justify-end mr-20">
        {/* Box LOGOUT */}
        <button
          onClick={logout}
          className="h-17 w-60 bg-white rounded-md ml-20 flex items-center gap-2"
        >
          <Image
            src="/logout.png"
            alt="Logout"
            width={40}
            height={40}
            className="object-contain ml-4"
          />
          <h1 className="ml-5 text-[#802834] font-bold text-3xl">LOGOUT</h1>
        </button>
      </div>
    </div>
  )
}

export default Footer
