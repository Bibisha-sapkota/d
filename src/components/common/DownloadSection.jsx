import React from 'react'

export default function DownloadSection() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12 flex flex-col items-center text-center">
      <h2 className="text-4xl md:text-5xl font-black text-[#E51E25] tracking-tight mb-3">
        Welcome to eRupai
      </h2>
      <p className="text-slate-600 md:text-lg max-w-2xl leading-relaxed mb-8">
        Your ultimate streaming platform for live content, gaming, and social entertainment
      </p>

      {/* Download Box */}
      <div className="w-full max-w-4xl bg-red-50/30 border border-red-100 rounded-3xl p-8 md:p-10 shadow-sm flex flex-col items-center">
        <h3 className="text-2xl md:text-3xl font-black text-[#E51E25] mb-2">
          Download eRupai App
        </h3>
        <p className="text-slate-500 text-sm md:text-base mb-8">
          Experience the ultimate streaming platform on your mobile device
        </p>

        {/* Buttons Group */}
        <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
          {/* App Store */}
          <a
            href="#appstore"
            className="flex items-center gap-3 bg-white border border-slate-300 hover:border-slate-800 text-slate-800 py-2.5 px-6 rounded-xl hover:shadow-md active:scale-95 transition-all text-left"
          >
            <svg className="w-7 h-7 text-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.69-1.12 1.84-.98 2.94.1.08.21.12.33.12.87 0 1.99-.54 2.48-1.45" />
            </svg>
            <div>
              <div className="text-[10px] text-slate-400 font-semibold leading-none uppercase">Download on the</div>
              <div className="text-sm font-bold mt-0.5">App Store</div>
            </div>
          </a>

          {/* Google Play */}
          <a
            href="#googleplay"
            className="flex items-center gap-3 bg-white border border-slate-300 hover:border-slate-800 text-slate-800 py-2.5 px-6 rounded-xl hover:shadow-md active:scale-95 transition-all text-left"
          >
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
              <path d="M3.25 20.35V3.65C3.25 2.85 4.15 2.37 4.8 2.81L18.42 11.16C19.01 11.52 19.01 12.48 18.42 12.84L4.8 21.19C4.15 21.63 3.25 21.15 3.25 20.35Z" fill="url(#playGrad)" />
              <defs>
                <linearGradient id="playGrad" x1="3.25" y1="12" x2="18.84" y2="12" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00A1FF" />
                  <stop offset="0.4" stopColor="#00E5FF" />
                  <stop offset="0.75" stopColor="#30FFB7" />
                  <stop offset="1" stopColor="#FFD400" />
                </linearGradient>
              </defs>
            </svg>
            <div>
              <div className="text-[10px] text-slate-400 font-semibold leading-none uppercase">GET IT ON</div>
              <div className="text-sm font-bold mt-0.5">Google Play</div>
            </div>
          </a>

          {/* Android APK */}
          <a
            href="#apk"
            className="flex items-center gap-3 bg-white border border-slate-300 hover:border-slate-800 text-slate-800 py-2.5 px-6 rounded-xl hover:shadow-md active:scale-95 transition-all text-left"
          >
            <svg className="w-7 h-7 text-slate-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="5" y="2" width="14" height="20" rx="2" />
              <path d="M12 18h.01" strokeLinecap="round" />
            </svg>
            <div>
              <div className="text-[10px] text-slate-400 font-semibold leading-none uppercase">Download for</div>
              <div className="text-sm font-bold mt-0.5">Android APK</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
