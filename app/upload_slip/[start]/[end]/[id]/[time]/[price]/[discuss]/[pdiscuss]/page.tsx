"use client";
import Link from "next/link";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
interface PaymentPageProps {
  params: {
    id: string;
    start: string;
    end: string;
    timepa: string;
    price: string;
    discuss: string;
    pdiscuss: string;
  };
}

export default function PaymentPage({ params }: { params: Promise<{ start: string; end: string; id: string; timepa: string; price: string; discuss: string; pdiscuss: string }> }) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const router = useRouter();

  const { start, end, id, timepa, price, discuss, pdiscuss } = React.use(params);

  const accept = useMemo(() => ["image/*", "application/pdf"].join(","), []);

  const onSelectFile = (f: File | null) => {
    setFile(f);
    if (f && f.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(f));
    } else {
      setPreview(null);
    }
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) onSelectFile(f);
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("กรุณาแนบสลิป");
      return;
    }

    try {
      const form = new FormData();
      form.append("pc_id", id);
      form.append("start_time", decodeURIComponent(start));
      form.append("end_time", decodeURIComponent(end));
      form.append("usepoint", pdiscuss);
      form.append("slip", file);

      const res = await fetch("/api/booking", {
        method: "POST",
        body: form,
      });
      const data = await res.json();

      const encoded = data.message;
      if (res.ok) {


        const link = `/randomID/${encodeURIComponent(data.end_time)}/${data.username}/${data.password}`;

        // ส่งผู้ใช้ไปหน้าผลลัพธ์
        toast.success(data.message);
        setTimeout(() => {
          router.push(link);
        }, 1000);;
      } else {
        toast.error((data.message || "Login failed"));

      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen relative bg-image text-white pt-35">
      <div className="absolute inset-0 bg-gray/60" />
      <main className="relative z-10 mx-auto w-full max-w-3xl px-4 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          Upload slip
        </h1>

        <form
          onSubmit={onSubmit}
          className="space-y-6 bg-black/40 backdrop-blur-md rounded-2xl p-5 sm:p-8 border border-white/10"
        >
          <div
            onDragEnter={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            className={[
              "rounded-xl border-2 border-dashed transition flex flex-col items-center justify-center text-center p-6 sm:p-8 cursor-pointer",
              dragOver
                ? "border-rose-400 bg-white/10"
                : "border-white/20 bg-white/5",
            ].join(" ")}
          >
            <input
              ref={inputRef}
              type="file"
              accept={accept}
              className="hidden"
              onChange={(e) => onSelectFile(e.target.files?.[0] ?? null)}
            />
            {!preview ? (
              <>
                <div className="i-lucide-file-text w-10 h-10 mb-3 opacity-80" />
                <p className="text-base sm:text-lg opacity-90">
                  Upload transfer slip here
                </p>
                <p className="text-xs opacity-60 mt-1">
                  รองรับ .jpg .png .pdf (สูงสุด ~10MB)
                </p>
              </>
            ) : (
              <div className="w-full">
                <p className="text-sm opacity-80 mb-3">
                  ไฟล์ที่เลือก: {file?.name}
                </p>
                {file?.type.startsWith("image/") && (
                  <div className="w-full rounded-lg overflow-hidden border border-white/10 bg-black/30">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full max-h-[320px] object-contain bg-black"
                    />
                  </div>
                )}
                <div className="flex gap-3 mt-3 justify-center">
                  <button
                    type="button"
                    className="px-3 py-2 rounded-md bg-white/10 hover:bg-white/20"
                    onClick={() => inputRef.current?.click()}
                  >
                    เปลี่ยนรูป
                  </button>
                  <button
                    type="button"
                    className="px-3 py-2 rounded-md bg-white/10 hover:bg-white/20"
                    onClick={() => {
                      setFile(null);
                      setPreview(null);
                      if (inputRef.current) inputRef.current.value = "";
                    }}
                  >
                    ลบไฟล์
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#802834] hover:bg-[#6a202a] font-semibold transition"
            >
              ส่งข้อมูล
            </button>
          </div>
        </form>
      </main>

      <div className="p-4 sm:p-6 h-[10vh] z-[100] fixed bottom-0 w-full flex items-center justify-between bg-transparent sm:bg-[#802834]">
        <Link
          href={`/admin/payment/${start}/${end}/${id}/${timepa}/${price}/${discuss}/${pdiscuss}`}
        >
          <button className="bg-white text-black px-4 sm:px-6 py-2 rounded font-bold text-sm sm:text-base">
            ⬅ BACK
          </button>
        </Link>
      </div>
    </div>
  );
}
