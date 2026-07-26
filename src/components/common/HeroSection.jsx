import React from 'react'
import deviceFinderBg from '../assets/device_finder_bg.jpg'
import liveStreamingBg from '../assets/live_streaming_bg.jpg'

export default function HeroSection() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Card: 360° Finder */}
        <div
          className="relative h-[25rem] md:h-[28rem] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer flex flex-col justify-between p-6 md:p-8 bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.95) 20%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.6) 100%), url(${deviceFinderBg})` }}
        >
          {/* Top Badge */}
          <div>
            <span className="bg-black/70 text-white font-bold text-xs uppercase px-3 py-1.5 rounded-full tracking-wider">
              360°
            </span>
          </div>

          {/* Bottom Content */}
          <div className="space-y-3 z-10">
            <h4 className="text-sm md:text-base font-black tracking-widest text-[#FF4500] uppercase animate-pulse">
              LIVE STREAMING & SECURE PAYMENTS
            </h4>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
              All Direction Device Finding Lost Device System
            </h3>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              eRupai prevents theft — all 0° to 360° all direction device finding. Lost device system — after restore factory settings, track the device anytime via API.
            </p>
          </div>
        </div>

        {/* Right Card: Live Streaming */}
        <div
          className="relative h-[25rem] md:h-[28rem] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer flex flex-col justify-between p-6 md:p-8 bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.95) 20%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.6) 100%), url(${liveStreamingBg})` }}
        >
          {/* Top Badge */}
          <div>
            <span className="bg-[#E51E25] text-white font-bold text-xs uppercase px-3 py-1.5 rounded-full tracking-wider">
              LIVE
            </span>
          </div>

          {/* Bottom Content */}
          <div className="space-y-3 z-10">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
              Live Streaming Platform
            </h3>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Real-time face-camera live streaming with virtual coin economy, subscriptions, VIP features and more.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
