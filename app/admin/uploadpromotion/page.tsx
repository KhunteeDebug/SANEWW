"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";

export default function UploadPage() {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const [dragOver, setDragOver] = useState(false);
    const router = useRouter();

    const accept = useMemo(() => ["image/*", "application/pdf"].join(","), []);

    const onSelectFile = (f: File | null) => {
        setFile(f);
        if (f && f.type.startsWith("image/")) {
            const url = URL.createObjectURL(f);
            setPreview(url);
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
            form.append("promotionImage", file);

            const res = await fetch("/api/admin/uploadpromotion", {
                method: "POST",
                body: form,
            });
            console.log(res);
            const data = await res.json();

            const encoded = data.message;
            if (res.ok) {


                const link = `/admin`;

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
            {/* overlay มืด */}
            <div className="absolute inset-0 bg-gray/60" />

            <main className="relative z-10 mx-auto w-full max-w-3xl px-4 py-8 sm:py-12">
                <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
                    Upload Promotion
                </h1>

                <form
                    onSubmit={onSubmit}
                    className="space-y-6 bg-black/40 backdrop-blur-md rounded-2xl p-5 sm:p-8 border border-white/10"
                >
                    {/* Upload box */}
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
                        className={[
                            "rounded-xl border-2 border-dashed transition",
                            dragOver ? "border-rose-400 bg-white/10" : "border-white/20 bg-white/5",
                            "flex flex-col items-center justify-center text-center p-6 sm:p-8 cursor-pointer"
                        ].join(" ")}
                        onClick={() => inputRef.current?.click()}
                        role="button"
                        aria-label="Upload transfer slip here"
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
                                    Upload transfer Promotion here
                                </p>
                                <p className="text-xs opacity-60 mt-1">
                                    รองรับ .jpg .png .pdf (สูงสุด ~10MB)
                                </p>
                            </>
                        ) : (
                            <div className="w-full">
                                <p className="text-sm opacity-80 mb-3">ไฟล์ที่เลือก: {file?.name}</p>
                                <div className="w-full rounded-lg overflow-hidden border border-white/10 bg-black/30">
                                    {/* preview เฉพาะรูปภาพ */}
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="w-full max-h-[320px] object-contain bg-black"
                                    />
                                </div>
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

                    {/* Submit */}
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
        </div>
    );
}
