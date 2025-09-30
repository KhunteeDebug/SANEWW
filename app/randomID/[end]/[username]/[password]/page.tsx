"use client";
import Image from 'next/image'
import React, { useState, useEffect, useMemo } from "react";

const RedeemID = ({ params }: { params: Promise<{ end: string; username: string; password: string }> }) => {
     const { end, username, password } = React.use(params);
     

    return (
        <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-image">
            <div className='space-y-10'>
                <div>
                    <Image
                        src="/PC.png"
                        alt="QR Code"
                        width={400}
                        height={150}
                        className="object-cover mx-auto"
                    />
                </div>

                <div className='flex gap-12'>
                    {/* เครื่องและเวลาจบ */}
                    <div className='bg-[#802834] rounded-md'>
                        <div className='text-white p-5'>
                            <h1 className='text-xl font-bold text-center'>เครื่องที่ 00</h1>
                            <h1 className='text-xl font-bold text-center'>วว/ดด/ปป เวลา</h1>
                            <div className='flex gap-3 ml-8'>
                                <h1 className='text-xl font-bold text-center'>End:</h1>
                                <h1 className='text-xl font-bold text-center'>{decodeURIComponent(end)}</h1>
                            </div>
                        </div>
                    </div>

                    {/* USER / PASS */}
                    <div className='bg-[#802834] rounded-md'>
                        <div className='ml-2 p-5'>
                            <div className='text-xl font-bold text-white'>
                                <div className='flex gap-3'>
                                    <h1>USER :</h1>
                                    <h1>{username}</h1>
                                </div>
                            </div>
                            <div className='text-xl font-bold text-white'>
                                <div className='flex gap-3'>
                                    <h1>PASS :</h1>
                                    <h1>{password}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default RedeemID;
