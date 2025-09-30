'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showcPassword, setShowcPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        toast.success("เข้าสู่ระบบสำเร็จ 🎉");

        // redirect ไปหน้า dashboard
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        toast.error((data.message || "Login failed"));
      }
    } catch (err) {
      toast.error("⚠️ Error: " + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-image relative overflow-hidden">
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-6xl flex items-center justify-between">

          {/* Left Side - Login Form */}
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h1 className="text-6xl font-black text-white mb-2 tracking-tight">
                HELLO
              </h1>
              <h2 className="text-6xl font-black text-white tracking-tight">
                GAMER!
              </h2>
            </div>

            <div className="bg-[#802834] backdrop-blur-xl rounded-2xl p-8 border border-red-500/30 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Username Field */}
                <div >
                  <label className="block text-white text-sm font-semibold mb-2 uppercase tracking-wide">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="username"
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      placeholder="กรอกชื่อผู้ใช้"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-white text-sm font-semibold mb-2 uppercase tracking-wide">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      onChange={handleChange}
                      className="block w-full pl-10 pr-12 py-3 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      placeholder="กรอกรหัสผ่าน"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full bg-black hover:bg-gray-900 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 uppercase tracking-wider shadow-lg"
                >
                  เข้าสู่ระบบ
                </button>

                {/* Register Link */}
                <div className="text-center">
                  <p className="text-white text-sm">
                    ยังไม่มีบัญชี?{' '}
                    <a href="/register" className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors">
                      สมัครสมาชิก
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}