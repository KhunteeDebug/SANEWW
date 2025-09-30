import React from "react"
import Image from "next/image"
import Link from "next/link"

const free = () => {
  return (
    <div className="min-h-screen flex justify-center items-center p-6 bg-image">
        <div className="space-y-10">
          {/* PC */}
            <div className="h-[20rem] w-[25rem] bg-[#802834] rounded-md">
                <Image 
                    src="/PC.png"
                    alt="Logout"
                    width={450}
                    height={300}
                    className="object-contain rounded-t-md"
                />
              <h1 className="text-2xl text-white text-center pt-1">สถานะ : ว่าง</h1>
            </div>

            <div className="flex gap-20">
              {/* Button */}
              <Link href="/redeempoint">
                <div className="h-17 w-40 bg-white rounded-md flex items-center justify-center">
                  <h1 className="text-xl font-bold text-center">ยืนยันการจอง</h1>
                </div>
              </Link>

              {/* Button */}
              <Link href="/booking">
                <div className="h-17 w-40 bg-white rounded-md flex items-center justify-center">
                  <h1 className="text-xl font-bold text-center">ยกเลิกการจอง</h1>
                </div>
              </Link>
            </div>
        </div>
    </div>
  )
}
export default free