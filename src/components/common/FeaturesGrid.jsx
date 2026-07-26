import React from 'react'

const features = [
  {
    title: 'Real-time Face-Camera Live Streaming',
    description: 'Virtual coin economy system, subscriptions, VIP features and more.',
    icon: (
      <svg className="w-6 h-6 text-[#E51E25]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    title: 'Skill-based Gaming',
    description: 'Compete, earn rewards, and challenge friends.',
    icon: (
      <svg className="w-6 h-6 text-[#E51E25]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a2 2 0 01-2 2 2 2 0 01-2-2V4zm-5 6h12a2 2 0 012 2v4a4 4 0 01-4 4H8a4 4 0 01-4-4v-4a2 2 0 012-2z" />
        <circle cx="9" cy="13" r="1" fill="currentColor" />
        <circle cx="15" cy="13" r="1" fill="currentColor" />
      </svg>
    ),
    highlighted: true
  },
  {
    title: 'Beauty-Enhanced Photo/Video',
    description: 'Create beautiful content with filters and tools.',
    icon: (
      <svg className="w-6 h-6 text-[#E51E25]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <circle cx="12" cy="13" r="3" />
      </svg>
    )
  },
  {
    title: 'Social Entertainment Hub',
    description: 'Enjoy verified, secure interaction experiences.',
    icon: (
      <svg className="w-6 h-6 text-[#E51E25]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  }
]

export default function FeaturesGrid() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8 mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className={`p-8 rounded-3xl bg-white flex flex-col items-start gap-4 transition-all duration-300 ${
              feature.highlighted
                ? 'border-2 border-red-500 shadow-lg shadow-red-50'
                : 'border border-slate-100 hover:border-red-200 hover:shadow-md'
            }`}
          >
            {/* Icon Container */}
            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
              {feature.icon}
            </div>

            {/* Title */}
            <h4 className="text-xl font-bold text-[#E51E25]">
              {feature.title}
            </h4>

            {/* Description */}
            <p className="text-slate-500 text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
