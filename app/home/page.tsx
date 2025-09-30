"use client";
import Image from "next/image";
import Footer from "../components/Footer/Footer"
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-image pt-35">
      <div className="flex justify-center items-start p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">

          {/* NEWS */}
          <div>
            <div className="bg-[#802834] text-white px-4 py-2 rounded-md w-fit mb-4">
              NEWS
            </div>
            <div className="space-y-4">
              {/* กล่องรูป 1 */}
              <div className="w-full aspect-video relative rounded-md overflow-hidden">
                <Image
                  src="/farlight.jpg"
                  alt="Farlight"
                  fill
                  className="object-cover"
                />
              </div>
              {/* กล่องรูป 2 */}
              <div className="w-full aspect-video relative rounded-md overflow-hidden">
                <Image
                  src="/genshin-impact.jpg"
                  alt="Genshin Impact"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* INFOMATION */}
          <div>
            <div className="bg-[#802834] text-white px-4 py-2 rounded-md w-fit mb-4">
              INFOMATION
            </div>
            <div className="w-full aspect-[4/3] bg-gray-300 rounded-md flex items-center justify-center">
              <Image
                src="/promotion.png"
                alt="Promotion"
                width={500}
                height={400}
                className="object-contain"
              />
            </div>
          </div>

          {/* GAMES */}
          <div>
            <div className="bg-[#802834] text-white px-4 py-2 rounded-md w-fit mb-4">
              GAMES
            </div>
            <div className="grid grid-cols-2 gap-8">
              {/* Valorant */}
              <div className="w-full aspect-square relative rounded-md overflow-hidden">
                <Image
                  src="/valorant.png"
                  alt="Valorant"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Elden Ring */}
              <div className="w-full aspect-square relative rounded-md overflow-hidden">
                <Image
                  src="/eldenr.png"
                  alt="Elden Ring"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Roblox */}
              <div className="w-full aspect-square relative rounded-md overflow-hidden">
                <Image
                  src="/Roblox.png"
                  alt="Roblox"
                  fill
                  className="object-contain bg-black"
                />
              </div>

              {/* FIFA */}
              <div className="w-full aspect-square relative rounded-md overflow-hidden">
                <Image
                  src="/FIFA.png"
                  alt="FIFA 22"
                  fill
                  className="object-contain bg-black"
                />
              </div>

              {/* Ragnarok M */}
              <div className="w-full aspect-square relative rounded-md overflow-hidden">
                <Image
                  src="/Ragnarokm.jpg"
                  alt="FIFA 22"
                  fill
                  className="object-contain bg-black"
                />
              </div>

              {/* dead by day light */}
              <div className="w-full aspect-square relative rounded-md overflow-hidden">
                <Image
                  src="/deadbydaylight.jpg"
                  alt="FIFA 22"
                  fill
                  className="object-contain bg-black"
                />
              </div>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
