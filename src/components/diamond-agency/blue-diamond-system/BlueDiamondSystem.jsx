import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Gem,
  TrendingUp,
  ShoppingCart,
  Database,
  ArrowRightLeft,
  Link2,
  History,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  PlusCircle,
  Settings,
  Zap,
  Globe,
  Wallet,
  Target,
  ArrowLeft,
  Building2,
  ChevronRight,
  Activity,
  Shield,
  Users,
  Send,
  Clock,
  RefreshCw,
  Banknote,
  MapPin,
  Award,
  LayoutDashboard,
  Bell,
  Sliders,
  Edit,
  Trash2,
  Plus,
  ChevronDown,
  Lock,
  FileText,
  CheckSquare,
  CreditCard,
  Webhook,
  Server,
  Terminal,
  ShieldCheck,
  PieChart,
  Search,
  Receipt,
  MessageSquare
} from 'lucide-react'

export default function BlueDiamondSystem({ type = 'Blue' }) {
  const isBlue = type === 'Blue'
  const colorMain = isBlue ? '#3B82F6' : '#10B981'
  const colorLight = isBlue ? '#EFF6FF' : '#ECFDF5'
  const colorBorder = isBlue ? '#BFDBFE' : '#A7F3D0'
  const colorText = isBlue ? '#1D4ED8' : '#065F46'
  const colorSubText = isBlue ? '#3B82F6' : '#10B981'

  const [activeTab, setActiveTab] = useState('overview')
  const [notification, setNotification] = useState({ type: '', message: '' })
  const navigate = useNavigate()

  const [buyUserId, setBuyUserId] = useState('')
  const [buyAmount, setBuyAmount] = useState('')
  const [buyCost, setBuyCost] = useState('')

  const [storeUserId, setStoreUserId] = useState('')
  const [storeAmount, setStoreAmount] = useState('')

  const [transferFromUserId, setTransferFromUserId] = useState('')
  const [transferToUserId, setTransferToUserId] = useState('')
  const [transferAmount, setTransferAmount] = useState('')

  const [convertUserId, setConvertUserId] = useState('')
  const [convertAmount, setConvertAmount] = useState('')

  const showNotification = (type, msg) => {
    setNotification({ type, message: msg })
    setTimeout(() => {
      setNotification({ type: '', message: '' })
    }, 5000)
  }

  const handleBuySubmit = (e) => {
    e.preventDefault()
    if (!buyUserId.trim()) {
      showNotification('error', 'User ID is required.')
      return
    }
    if (!buyAmount || parseFloat(buyAmount) <= 0) {
      showNotification('error', 'Please enter a valid amount greater than 0.')
      return
    }
    if (!buyCost || parseFloat(buyCost) <= 0) {
      showNotification('error', 'Please enter a valid cost greater than 0.')
      return
    }
    showNotification('success', `Successfully bought ${buyAmount} ${type} Diamonds for User ID ${buyUserId} ($${buyCost})!`)
    setBuyUserId('')
    setBuyAmount('')
    setBuyCost('')
  }

  const handleStoreSubmit = (e) => {
    e.preventDefault()
    if (!storeUserId.trim()) {
      showNotification('error', 'User ID is required.')
      return
    }
    if (!storeAmount || parseFloat(storeAmount) <= 0) {
      showNotification('error', 'Please enter a valid amount to store.')
      return
    }
    showNotification('success', `Successfully stored ${storeAmount} ${type} Diamonds for User ID ${storeUserId}!`)
    setStoreUserId('')
    setStoreAmount('')
  }

  const handleTransferSubmit = (e) => {
    e.preventDefault()
    if (!transferFromUserId.trim()) {
      showNotification('error', 'Sender User ID is required.')
      return
    }
    if (!transferToUserId.trim()) {
      showNotification('error', 'Recipient User ID is required.')
      return
    }
    if (!transferAmount || parseFloat(transferAmount) <= 0) {
      showNotification('error', 'Please enter a valid amount to transfer.')
      return
    }
    showNotification('success', `Successfully transferred ${transferAmount} ${type} Diamonds from User ID ${transferFromUserId} to User ID ${transferToUserId}!`)
    setTransferFromUserId('')
    setTransferToUserId('')
    setTransferAmount('')
  }

  const handleConvertSubmit = (e) => {
    e.preventDefault()
    if (!convertUserId.trim()) {
      showNotification('error', 'User ID is required.')
      return
    }
    if (!convertAmount || parseFloat(convertAmount) <= 0) {
      showNotification('error', 'Please enter a valid amount to convert.')
      return
    }
    showNotification('success', `Successfully converted ${convertAmount} ${type} Diamonds for User ID ${convertUserId}!`)
    setConvertUserId('')
    setConvertAmount('')
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'buy', label: 'Buy', icon: ShoppingCart },
    { id: 'store', label: 'Store', icon: Database },
    { id: 'transfer', label: 'Transfer', icon: ArrowRightLeft },
    { id: 'convert', label: 'Convert', icon: Link2 },
    { id: 'history', label: 'History', icon: History }
  ]

  const inputCls = 'w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-100 transition-all'
  const formWrap = 'w-full'

  const renderFormContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className={formWrap}>
            <h3 className="text-sm sm:text-base font-black text-slate-800 mb-4">Recent Transactions</h3>
            <div className="overflow-x-auto -mx-3 sm:mx-0">
              <div className="min-w-[480px] px-3 sm:px-0">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[9px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <th className="pb-3 pr-4">ID</th>
                      <th className="pb-3 pr-4">Type</th>
                      <th className="pb-3 pr-4">User</th>
                      <th className="pb-3 pr-4">Amount</th>
                      <th className="pb-3 pr-4">Status</th>
                      <th className="pb-3">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td colSpan={6} className="text-center py-10 text-slate-400 text-xs sm:text-sm">No transactions found</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )
      case 'buy':
        return (
          <form onSubmit={handleBuySubmit} className={formWrap}>
            <div className="flex items-center gap-2 mb-5">
              <ShoppingCart className="w-5 h-5" style={{ color: colorMain }} />
              <h3 className="text-base sm:text-lg font-black text-slate-800">Buy {type} Diamond</h3>
            </div>
            {notification.message && (
              <div className={`p-3 rounded-xl mb-4 text-xs font-bold flex items-center gap-2 border ${
                notification.type === 'error'
                  ? 'bg-red-50 text-red-700 border-red-200'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}>
                {notification.type === 'error' ? (
                  <AlertTriangle className="w-4 h-4 shrink-0 text-red-500" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                )}
                <span>{notification.message}</span>
              </div>
            )}
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">User ID</label>
                <input
                  type="text"
                  placeholder="Enter user ID"
                  className={inputCls}
                  value={buyUserId}
                  onChange={(e) => setBuyUserId(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Amount</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  className={inputCls}
                  value={buyAmount}
                  onChange={(e) => setBuyAmount(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Cost ($)</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Enter cost"
                  className={inputCls}
                  value={buyCost}
                  onChange={(e) => setBuyCost(e.target.value)}
                />
              </div>
              <button type="submit" className="w-full text-white font-bold py-2.5 rounded-xl transition-opacity hover:opacity-90 text-sm mt-1" style={{ backgroundColor: colorMain }}>
                Buy {type} Diamonds
              </button>
            </div>
          </form>
        )
      case 'store':
        return (
          <form onSubmit={handleStoreSubmit} className={formWrap}>
            <div className="flex items-center gap-2 mb-5">
              <Database className="w-5 h-5" style={{ color: colorMain }} />
              <h3 className="text-base sm:text-lg font-black text-slate-800">Store {type} Diamond</h3>
            </div>
            {notification.message && (
              <div className={`p-3 rounded-xl mb-4 text-xs font-bold flex items-center gap-2 border ${
                notification.type === 'error'
                  ? 'bg-red-50 text-red-700 border-red-200'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}>
                {notification.type === 'error' ? (
                  <AlertTriangle className="w-4 h-4 shrink-0 text-red-500" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                )}
                <span>{notification.message}</span>
              </div>
            )}
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">User ID</label>
                <input
                  type="text"
                  placeholder="Enter user ID"
                  className={inputCls}
                  value={storeUserId}
                  onChange={(e) => setStoreUserId(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Amount to Store</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  className={inputCls}
                  value={storeAmount}
                  onChange={(e) => setStoreAmount(e.target.value)}
                />
              </div>
              <button type="submit" className="w-full text-white font-bold py-2.5 rounded-xl transition-opacity hover:opacity-90 text-sm mt-1" style={{ backgroundColor: colorMain }}>
                Store {type} Diamonds
              </button>
            </div>
          </form>
        )
      case 'transfer':
        return (
          <form onSubmit={handleTransferSubmit} className={formWrap}>
            <div className="flex items-center gap-2 mb-5">
              <ArrowRightLeft className="w-5 h-5" style={{ color: colorMain }} />
              <h3 className="text-base sm:text-lg font-black text-slate-800">Transfer {type} Diamond</h3>
            </div>
            {notification.message && (
              <div className={`p-3 rounded-xl mb-4 text-xs font-bold flex items-center gap-2 border ${
                notification.type === 'error'
                  ? 'bg-red-50 text-red-700 border-red-200'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}>
                {notification.type === 'error' ? (
                  <AlertTriangle className="w-4 h-4 shrink-0 text-red-500" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                )}
                <span>{notification.message}</span>
              </div>
            )}
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">From User ID</label>
                <input
                  type="text"
                  placeholder="Enter sender user ID"
                  className={inputCls}
                  value={transferFromUserId}
                  onChange={(e) => setTransferFromUserId(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">To User ID</label>
                <input
                  type="text"
                  placeholder="Enter recipient user ID"
                  className={inputCls}
                  value={transferToUserId}
                  onChange={(e) => setTransferToUserId(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Amount</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  className={inputCls}
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                />
              </div>
              <button type="submit" className="w-full text-white font-bold py-2.5 rounded-xl transition-opacity hover:opacity-90 text-sm mt-1" style={{ backgroundColor: colorMain }}>
                Transfer {type} Diamonds
              </button>
            </div>
          </form>
        )
      case 'convert':
        return (
          <form onSubmit={handleConvertSubmit} className={formWrap}>
            <div className="flex items-center gap-2 mb-5">
              <Link2 className="w-5 h-5" style={{ color: colorMain }} />
              <h3 className="text-base sm:text-lg font-black text-slate-800">Convert to E-Rupee Coin</h3>
            </div>
            {notification.message && (
              <div className={`p-3 rounded-xl mb-4 text-xs font-bold flex items-center gap-2 border ${
                notification.type === 'error'
                  ? 'bg-red-50 text-red-700 border-red-200'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}>
                {notification.type === 'error' ? (
                  <AlertTriangle className="w-4 h-4 shrink-0 text-red-500" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                )}
                <span>{notification.message}</span>
              </div>
            )}
            <div className="p-3 sm:p-4 rounded-xl mb-5 border" style={{ backgroundColor: colorLight, borderColor: colorBorder }}>
              <div className="flex items-center gap-2 font-bold mb-2 text-xs sm:text-sm" style={{ color: colorText }}>
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center text-[9px] font-black shrink-0" style={{ borderColor: colorMain, color: colorMain }}>i</div>
                Conversion Information
              </div>
              <div className="text-xs sm:text-sm space-y-1" style={{ color: colorSubText }}>
                <div><span className="font-bold">Rate:</span> 1 {type} Diamond = 50 Coins</div>
                <div><span className="font-bold">Fee:</span> 0% conversion charge</div>
              </div>
            </div>
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">User ID</label>
                <input
                  type="text"
                  placeholder="Enter user ID"
                  className={inputCls}
                  value={convertUserId}
                  onChange={(e) => setConvertUserId(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">{type} Diamonds to Convert</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  className={inputCls}
                  value={convertAmount}
                  onChange={(e) => setConvertAmount(e.target.value)}
                />
              </div>
              <button type="submit" className="w-full text-white font-bold py-2.5 rounded-xl transition-opacity hover:opacity-90 text-sm mt-1" style={{ backgroundColor: colorMain }}>
                Convert to Coins
              </button>
            </div>
          </form>
        )
      case 'history':
        return (
          <div className={formWrap}>
            <h3 className="text-sm sm:text-base font-black text-slate-800 mb-4">Conversion History</h3>
            <div className="overflow-x-auto -mx-3 sm:mx-0">
              <div className="min-w-[420px] px-3 sm:px-0">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[9px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <th className="pb-3 pr-4">ID</th>
                      <th className="pb-3 pr-4">User</th>
                      <th className="pb-3 pr-4">Amount</th>
                      <th className="pb-3 pr-4">Coins Received</th>
                      <th className="pb-3">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td colSpan={5} className="text-center py-10 text-slate-400 text-xs sm:text-sm">No conversion history found</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const activeTabLabel = {
    overview: 'Overview',
    buy: `Buy ${type} Diamond`,
    store: `Store ${type} Diamond`,
    transfer: `Transfer ${type} Diamond`,
    convert: 'Convert to E-Rupee',
    history: 'Conversion History'
  }[activeTab] || ''

  return (
    <div className="space-y-3 sm:space-y-5">
      <div className="rounded-2xl p-3 sm:p-5 border" style={{ backgroundColor: colorLight, borderColor: colorBorder }}>
        <div className="flex items-center gap-2 mb-0.5">
          <Gem className="w-5 h-5 sm:w-7 sm:h-7 shrink-0" style={{ color: colorMain }} />
          <h2 className="text-base sm:text-xl font-black leading-tight" style={{ color: colorText }}>{type} Diamond System</h2>
        </div>
        <p className="text-[11px] sm:text-sm font-medium mb-3 sm:mb-4 pl-7 sm:pl-9" style={{ color: colorSubText }}>
          Buy, store, transfer, and convert {type.toLowerCase()} diamonds
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { label: 'Total Transactions', value: '0', icon: Gem },
            { label: 'Total Diamonds', value: '0', icon: Gem },
            { label: 'Conversion Rate', value: '1:50', icon: Link2 },
            { label: 'Conversion Fee', value: '0%', icon: DollarSign, yellow: true }
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-2.5 sm:p-3.5 border border-white shadow-sm flex items-center justify-between gap-1.5">
              <div className="min-w-0">
                <div className="text-[9px] sm:text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-tight mb-0.5 truncate">{stat.label}</div>
                <div className="text-base sm:text-xl font-black text-slate-800">{stat.value}</div>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: stat.yellow ? '#FEF9C3' : colorLight }}>
                <stat.icon className="w-3.5 h-3.5 sm:w-5 sm:h-5" style={{ color: stat.yellow ? '#CA8A04' : colorMain }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-slate-100 overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id)
                setNotification({ type: '', message: '' })
              }}
              title={tab.label}
              className={`flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-0.5 sm:gap-1.5 px-3 sm:px-4 py-2.5 sm:py-3 text-[10px] sm:text-xs font-bold whitespace-nowrap transition-colors relative flex-1 sm:flex-none min-w-[44px] ${
                activeTab === tab.id ? 'text-slate-800 bg-slate-50/80' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
              }`}
            >
              <tab.icon className="w-4 h-4 sm:w-3.5 sm:h-3.5 shrink-0" style={activeTab === tab.id ? { color: colorMain } : {}} />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden text-[8px] leading-tight text-center">{tab.label}</span>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t" style={{ backgroundColor: colorMain }} />
              )}
            </button>
          ))}
        </div>

        <div className="sm:hidden px-4 py-2.5 bg-slate-50/50 border-b border-slate-100">
          <span className="text-xs font-black" style={{ color: colorMain }}>{activeTabLabel}</span>
        </div>

        <div className="p-3 sm:p-5">
          {renderFormContent()}
        </div>
      </div>
    </div>
  )
}
