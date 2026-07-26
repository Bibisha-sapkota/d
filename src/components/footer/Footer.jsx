import React from 'react'
import FooterLink from './FooterLink'

export default function Footer() {
  return (
    <footer className="w-full bg-black text-slate-400 pt-16 pb-8 px-4 md:px-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Top Section: Logo, Input, and Socials */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 pb-8 border-b border-slate-950">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-[#E51E25] text-white w-9 h-9 rounded-full flex items-center justify-center font-black text-xl select-none">
              e
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-white select-none">
              e<span className="text-[#FFD700]">Rupai</span>
            </span>
          </div>

          {/* Email Subscription */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-lg w-full">
            <input
              type="email"
              placeholder="Enter your email to stay updated..."
              className="bg-slate-900 border border-slate-800 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 flex-1 focus:outline-none focus:border-red-500 transition-colors"
            />
            <button className="bg-[#E51E25] hover:bg-[#c4161c] text-white px-6 py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 active:scale-95">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Subscribe
            </button>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {['youtube', 'instagram', 'twitter', 'facebook'].map((platform, idx) => (
              <a
                key={idx}
                href={`#${platform}`}
                className="bg-slate-900 border border-slate-850 hover:border-red-500 hover:text-white p-2.5 rounded-xl transition-all"
              >
                {platform === 'youtube' && (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.516 0-9.387.507a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.871.507 9.386.507 9.386.507s7.517 0 9.389-.507a3.002 3.002 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                )}
                {platform === 'instagram' && (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                )}
                {platform === 'twitter' && (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                )}
                {platform === 'facebook' && (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Middle Section: Columns of links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <FooterLink 
            title="ABOUT US" 
            links={[
              { label: 'Our Story', href: '#story' },
              { label: 'Team', href: '#team' },
              { label: 'Press Kit', href: '#press' }
            ]} 
          />
          <FooterLink 
            title="CONTACT" 
            links={[
              { label: 'Support', href: '#support' },
              { label: 'Contact Us', href: '#contact' },
              { label: 'Feedback', href: '#feedback' },
              { label: 'Partners', href: '#partners' },
              { label: 'Advertise', href: '#advertise' }
            ]} 
          />
          <FooterLink 
            title="HELP" 
            links={[
              { label: 'FAQ', href: '#faq' },
              { label: 'Guide', href: '#guide' },
              { label: 'Terms', href: '#terms' },
              { label: 'Community', href: '#community' }
            ]} 
          />
          <FooterLink 
            title="PRIVACY" 
            links={[
              { label: 'Data Protection', href: '#dataprotection' },
              { label: 'Cookies', href: '#cookies' },
              { label: 'Legal', href: '#legal' }
            ]} 
          />
        </div>

        {/* Bottom Section: Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-950 text-xs">
          <span>
            © 2025 eRupai. All rights reserved. Made with ❤️ in India
          </span>
          <div className="flex gap-4">
            <a href="#terms" className="hover:text-white transition-colors">Terms</a>
            <a href="#privacy" className="hover:text-white transition-colors">Privacy</a>
            <a href="#cookies" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
