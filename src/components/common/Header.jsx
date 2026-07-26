import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Home, Play, Gem, Users, User, Mic, Target, Coins, LayoutDashboard, BarChart3,
  Gamepad2, Camera, Heart, Info, X, ChevronDown, Menu, LogIn
} from 'lucide-react'

export default function Header({ onSelectAgencyTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [agencyDropdownOpen, setAgencyDropdownOpen] = useState(false)
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  const [mobileAgencyExpanded, setMobileAgencyExpanded] = useState(false)

  const languages = ['English', 'Nepali']

  return (
    <header className="w-full bg-[#E51E25] text-white py-3 px-4 md:px-8 flex items-center justify-between fixed top-0 left-0 right-0 z-[9999] shadow-md min-h-[60px]">
      {/* Left side: Logo */}
      <div className="flex items-center gap-2">
        <div className="bg-white text-[#E51E25] w-8 h-8 rounded-full flex items-center justify-center font-black text-xl select-none">
          e
        </div>
        <span className="font-extrabold text-2xl tracking-tight select-none">
          e<span className="text-[#FFD700]">Rupai</span>
        </span>
      </div>

      {/* Middle side: Navigation Menu */}
      <nav className="hidden md:flex gap-6">
  <a href="/">Home</a>
  <a href="/live">Live Streaming</a>
        <div className="relative cursor-pointer flex items-center gap-1 hover:text-slate-200 transition-colors py-2">
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setAgencyDropdownOpen(!agencyDropdownOpen)
            }}
            className="flex items-center gap-1 focus:outline-none"
          >
            <span>Agency</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          {/* Dropdown Menu - only shows on click */}
          {agencyDropdownOpen && (
            <div className="absolute top-full left-0 pt-2 z-50">
              <div className="bg-white text-slate-800 rounded-xl shadow-xl border border-slate-100 py-2 w-56">
                {/* Diamond Agency - navigates to separate page */}
                <Link
                  to="/diamond-agency"
                  onClick={() => setAgencyDropdownOpen(false)}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm font-medium hover:bg-red-50 hover:text-[#E51E25] transition-colors"
                >
                  <Gem className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>Diamond Agency</span>
                </Link>
                {/* Other items - direct routes */}
                {[
                  { name: 'Agency', tab: 'agency', icon: Users, color: 'text-emerald-500' },
                  { name: 'Agent', tab: 'agent', icon: User, color: 'text-violet-500' },
                  { name: 'Host Agency', tab: 'host-agency', icon: Mic, color: 'text-amber-500' },
                  { name: 'Target System', tab: 'target', icon: Target, color: 'text-rose-500' },
                  { name: 'Revenue Distribution', tab: 'revenue', icon: Coins, color: 'text-yellow-500' },
                  { name: 'Agency Dashboard', tab: 'agency-dash', icon: LayoutDashboard, color: 'text-indigo-500' },
                  { name: 'Agent Dashboard', tab: 'agent-dash', icon: BarChart3, color: 'text-blue-500' }
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.tab}
                      to={`/agency?tab=${item.tab}`}
                      onClick={() => setAgencyDropdownOpen(false)}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm font-medium hover:bg-red-50 hover:text-[#E51E25] transition-colors"
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${item.color}`} />
                      <span>{item.name}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
        </div>
        <a href="#gaming" className="hover:text-slate-200 transition-colors">Gaming</a>
        <a href="#photo" className="hover:text-slate-200 transition-colors">Photo/Video</a>
        <a href="#sponsor" className="hover:text-slate-200 transition-colors">Social ad Sponsor</a>
        <div className="relative group cursor-pointer flex items-center gap-1 hover:text-slate-200 transition-colors">
          <span>Privacy Policy</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <a href="#about" className="hover:text-slate-200 transition-colors">About</a>
      </nav>

      {/* Right side: Search, Language, Login & Menu Icon */}
      <div className="flex items-center gap-3">
        {/* Search Input */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search eRupai"
            className="bg-[#B91319] text-white placeholder-red-200 text-sm rounded-full py-1.5 pl-9 pr-4 w-52 focus:outline-none focus:ring-2 focus:ring-red-300 transition-all"
          />
          <svg className="w-4 h-4 text-red-200 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
            className="hidden md:inline-flex items-center gap-2 bg-white bg-opacity-10 border border-white/20 text-white rounded-full px-3 py-2 text-sm hover:bg-opacity-20 transition"
          >
            <span>{selectedLanguage}</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          {languageMenuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setSelectedLanguage(lang)
                    setLanguageMenuOpen(false)
                  }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100"
                >
                  {lang}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Login Button */}
        <Link to="/login" className="text-white hover:text-red-200 p-2 transition-colors flex items-center justify-center" title="Login">
          <LogIn className="w-6 h-6" />
        </Link>

        {/* Hamburger Menu Icon */}
        <button
          onClick={() => {
            setMobileMenuOpen(!mobileMenuOpen)
            setLanguageMenuOpen(false)
          }}
          className="bg-[#B91319] hover:bg-[#a11015] p-2 rounded-lg transition-colors md:hidden flex items-center justify-center"
        >
          <Menu className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[10000] md:hidden transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <div className={`fixed top-0 right-0 h-full w-80 max-w-[80vw] bg-[#E51E25] text-white z-[10001] shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Drawer Header */}
        <div className="p-4 border-b border-red-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-white text-[#E51E25] w-8 h-8 rounded-full flex items-center justify-center font-black text-xl select-none">
              e
            </div>
            <span className="font-extrabold text-xl tracking-tight select-none">
              e<span className="text-yellow-300">Rupai</span>
            </span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="flex flex-col gap-1">
            <a
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors text-sm font-bold"
            >
              <Home className="w-4 h-4 text-red-200" />
              <span>Home</span>
            </a>
            
            <a
              href="/live"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors text-sm font-bold"
            >
              <Play className="w-4 h-4 text-red-200" />
              <span>Live Streaming</span>
            </a>

            {/* Accordion for Agency */}
            <div>
              <button
                onClick={() => setMobileAgencyExpanded(!mobileAgencyExpanded)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/10 transition-colors text-sm font-bold text-left"
              >
                <span className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-red-200" />
                  <span>Agency Portal</span>
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileAgencyExpanded ? 'rotate-180' : ''}`} />
              </button>
              
              {mobileAgencyExpanded && (
                <div className="mt-1 ml-4 pl-4 border-l border-red-700 flex flex-col gap-1">
                  <Link
                    to="/diamond-agency"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-xs font-bold"
                  >
                    <Gem className="w-3.5 h-3.5 text-sky-300" />
                    <span>Diamond Agency</span>
                  </Link>
                  {[
                    { name: 'Agency', tab: 'agency', icon: Users },
                    { name: 'Agent', tab: 'agent', icon: User },
                    { name: 'Host Agency', tab: 'host-agency', icon: Mic },
                    { name: 'Target System', tab: 'target', icon: Target },
                    { name: 'Revenue Distribution', tab: 'revenue', icon: Coins },
                    { name: 'Agency Dashboard', tab: 'agency-dash', icon: LayoutDashboard },
                    { name: 'Agent Dashboard', tab: 'agent-dash', icon: BarChart3 }
                  ].map((subItem) => {
                    const SubIcon = subItem.icon
                    return (
                      <Link
                        key={subItem.tab}
                        to={`/agency?tab=${subItem.tab}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-xs font-bold"
                      >
                        <SubIcon className="w-3.5 h-3.5 text-red-200" />
                        <span>{subItem.name}</span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>

            <a
              href="#gaming"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors text-sm font-bold"
            >
              <Gamepad2 className="w-4 h-4 text-red-200" />
              <span>Gaming</span>
            </a>

            <a
              href="#photo"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors text-sm font-bold"
            >
              <Camera className="w-4 h-4 text-red-200" />
              <span>Photo/Video</span>
            </a>

            <a
              href="#sponsor"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors text-sm font-bold"
            >
              <Heart className="w-4 h-4 text-red-200" />
              <span>Social ad Sponsor</span>
            </a>

            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors text-sm font-bold"
            >
              <Info className="w-4 h-4 text-red-200" />
              <span>About</span>
            </a>
          </div>
        </div>
      </div>

    </header>
  )
}
