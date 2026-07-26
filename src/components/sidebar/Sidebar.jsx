import React from 'react'
import {
  X,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  RefreshCw,
  Search,
  History,
  Receipt,
  CreditCard,
  MessageSquare,
  Send,
  Bell,
  User,
  Gem,
} from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

export const diamondAgencyMenuGroups = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, key: 'dashboard' },
  { id: 'manual_recharge', label: 'Manual Recharge', icon: RefreshCw, key: 'manual_recharge' },
  { id: 'user_lookup', label: 'User Lookup', icon: Search, key: 'user_lookup' },
  { id: 'recharge_history', label: 'Recharge History', icon: History, key: 'recharge_history' },
  { id: 'transaction_history', label: 'Transaction History', icon: Receipt, key: 'transaction_history' },
  { id: 'billing', label: 'Billing', icon: CreditCard, key: 'billing' },
  { id: 'chat_support', label: 'Chat Support', icon: MessageSquare, key: 'chat_support' },
  { id: 'coin_transfer', label: 'User Coin Recharge', icon: Send, key: 'coin_transfer' },
  { id: 'notifications', label: 'Notifications', icon: Bell, key: 'notifications' },
  { id: 'profile', label: 'Profile', icon: User, key: 'profile' },
  { id: 'blue_diamond', label: 'Blue Diamond System', icon: Gem, key: 'blue_diamond' },
  { id: 'green_diamond', label: 'Green Diamond System', icon: Gem, key: 'green_diamond' },
]

export default function Sidebar({
  mobileSidebarOpen,
  setMobileSidebarOpen,
  menuGroups = diamondAgencyMenuGroups,
  activeSideTab,
  setActiveSideTab,
  expandedGroups,
  toggleGroup,
}) {
  const navigate = useNavigate()
  const location = useLocation()

  const renderMenuItem = (group) => {
    const Icon = group.icon
    const isActive = location.pathname.includes(group.key) || (group.key === 'dashboard' && location.pathname === '/diamond-agency')

    return (
      <button
        key={group.id || group.key}
        type="button"
        onClick={() => {
          if (setActiveSideTab) setActiveSideTab(group.key)
          setMobileSidebarOpen(false)
          navigate(`/diamond-agency/${group.key}`)
        }}
        className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left transition ${
          isActive
            ? 'bg-[#E51E25] text-white shadow-sm'
            : 'text-slate-700 hover:bg-red-50 hover:text-[#E51E25]'
        }`}
      >
        <span className="flex items-center gap-3 min-w-0">
          {Icon && <Icon className="w-4 h-4 shrink-0" />}
          <span className="text-xs sm:text-sm font-semibold truncate">{group.label}</span>
        </span>
      </button>
    )
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-[#E51E25]/30 transition lg:hidden ${mobileSidebarOpen ? 'block' : 'hidden'}`}
        onClick={() => setMobileSidebarOpen(false)}
      />

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-[280px] border-r border-slate-200 bg-white shadow-xl transform transition-transform duration-200 lg:translate-x-0 lg:static lg:z-auto lg:shadow-none lg:w-[260px] ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 lg:hidden">
          <div className="text-sm font-black text-slate-800">Diamond Agency</div>
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(false)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-56px)] lg:h-[calc(100vh-0px)] px-3 py-3">
          <div className="space-y-2">
            {menuGroups.map((group) => {
              const isExpanded = expandedGroups?.[group.id] ?? true
              const Icon = group.icon
              const hasChildren = Array.isArray(group.subItems) && group.subItems.length > 0

              if (hasChildren) {
                return (
                  <div key={group.id || group.key} className="rounded-xl border border-slate-100 bg-slate-50/60">
                    <button
                      type="button"
                      onClick={() => toggleGroup?.(group.id)}
                      className="w-full flex items-center justify-between gap-3 px-3 py-3 text-left"
                    >
                      <span className="flex items-center gap-3 min-w-0">
                        {Icon && <Icon className="w-4 h-4 text-slate-500" />}
                        <span className="text-xs sm:text-sm font-bold text-slate-700">{group.label}</span>
                      </span>
                      {isExpanded ? <ChevronDown className="w-4 h-4 text-slate-500" /> : <ChevronRight className="w-4 h-4 text-slate-500" />}
                    </button>

                    {isExpanded && (
                      <div className="space-y-1 px-2 pb-2">
                        {group.subItems.map((item) => renderMenuItem(item))}
                      </div>
                    )}
                  </div>
                )
              }

              return renderMenuItem(group)
            })}
          </div>
        </div>
      </aside>
    </>
  )
}
