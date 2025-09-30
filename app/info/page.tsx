import React from "react"
import Image from "next/image"

const Information = () => {
  return (
    <div className="min-h-screen flex justify-center items-center p-6 bg-image">
        <div className="space-y-6 items-center justify-center">
            <h1 className="text-white text-5xl font-bold text-center">CONTACT US!</h1>
            <div className="flex justify-center">
                <Image
                src="/PAYMENT.png"
                alt="QR Code"
                width={400}   
                height={150}  
                className="object-cover"
            />
            </div>
            <h1 className="text-white text-5xl font-bold text-center">ONLINE 08:00 AM - 21.00 PM.</h1>
        </div>
    </div>
  )
}
export default Information