
import Image from 'next/image'
import Link from "next/link";
import React, { useState, useEffect, useMemo } from "react";

export default function Payment({ params }: { params: Promise<{ id: string; start: string; end: string, time: string, price: string, discuss: string, pdiscuss: string }> }) {
    const { id, start, end, time, price, discuss, pdiscuss } = React.use(params);
    const total_price = (price - pdiscuss).toFixed(2);

    return (
        <div className="min-h-screen flex justify-center items-center p-6 bg-image">
            <div className="space-y-6 items-center justify-center">
                <h1 className="text-white text-4xl font-bold text-center">SCAN TO PAY</h1>
                <div className="flex justify-center rounded-md">
                    <Image
                        src="/PAYMENT.png"
                        alt="QR Code"
                        width={250}
                        height={95}
                        className="object-cover"
                    />
                </div>


                <div className='bg-[#463B3B] rounded-md pt-5 px-20'>
                    <div className='text-white text-center pt-9 space-y-8 font-bold text-3xl'>
                        <h1>Order Summary</h1>
                        <h1>Total : {total_price} Bath</h1>
                        <h1>Order : #{id}</h1>
                    </div>
                </div>
            </div>
            {/* Footer Buttons */}
            <div className="p-4 sm:p-6 h-[10vh] z-[100] fixed bottom-0 w-full flex items-center justify-between 
                bg-transparent sm:bg-[#802834]">
                <Link href={`/redeempoint/${start}/${end}/${id}`}>

                    <button className="bg-white text-black px-4 sm:px-6 py-2 rounded font-bold text-sm sm:text-base">
                        ⬅ BACK
                    </button>
                </Link>
                <Link href={`/upload_slip/${start}/${end}/${id}/${time}/${price}/${discuss}/${pdiscuss}`}>
                    <button className="bg-white text-black px-4 sm:px-6 py-2 rounded font-bold text-sm sm:text-base">
                        NEXT ➡
                    </button>
                </Link>
            </div>
        </div>
    )
}