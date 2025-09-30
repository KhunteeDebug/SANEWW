import React from 'react'
import Image from 'next/image'
import Link from "next/link";
const Navbar = () => {
  return (
    <div className=" bg-[#802834] duration-200 h-[10vh] z-[100] fixed w-full flex items-center justify-between">


      {/* Button Profile */}
      <div className="relative flex items-center w-full mr-20 ">
        <div className="absolute right-70">
          <Link href="/">
            <div className="h-[50px] w-[50px] flex items-center justify-center rounded-md bg-white hover:bg-gray-200 transition">
              <Image
                src="/home.png"
                alt="home"
                width={30}
                height={30}
                className="object-contain"
              />
            </div>
          </Link>
        </div>
        {/* Image */}
        {/* Profile Button */}
        <button className="flex items-center absolute right-0">
          <Image
            src="/persona.jpg"
            alt="profile"
            width={60}
            height={60}
            className="object-cover rounded-full z-10"
          />
          <div className="-ml-5 h-14 w-50 bg-white rounded-md flex items-center px-3 shadow-lg">
            <h1 className="font-bold text-[#802834] text-sm md:text-xl ml-4">
              HELLO! ADMIN
            </h1>
          </div>
        </button>
      </div>
    </div>
  )
}
export default Navbar