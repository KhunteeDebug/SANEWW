import React from "react"

const Point = () => {
  return (
    <div className="min-h-screen flex justify-center items-center p-6 bg-image">
        <div className="h-[40rem] w-[60rem] bg-white/50 rounded-md">
            <div className="space-y-50 pt-20">
                <h1 className="text-5xl text-white font-bold text-center">POINTS BALANCE</h1>
                <h1 className="text-5xl text-white font-bold text-center">000.00</h1>
                <div>
                    <h1 className=" text-white text-center">คะแนนที่กำลังหมดอายุ 000.00 คะแนน</h1>
                    <h1 className=" text-white text-center">วันที่ วว/ดด/ปป</h1>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Point