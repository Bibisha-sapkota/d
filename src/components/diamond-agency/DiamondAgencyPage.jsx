import React, { useState } from 'react'
import Sidebar, { diamondAgencyMenuGroups } from '../sidebar/Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  Zap, PlusCircle, Settings, Gem, Globe, TrendingUp,
  BarChart3, Wallet, Target, ArrowLeft, Building2,
  ChevronRight, Activity, Shield, Users, Send,
  Clock, CheckCircle2, XCircle, RefreshCw, Banknote,
  MapPin, Award, AlertTriangle, LayoutDashboard,
  History, Bell, Sliders, Edit, Trash2, Plus, ChevronDown,
  Lock, FileText, CheckSquare, CreditCard, Webhook, Server,
  Terminal, ShieldCheck, PieChart, User, Search, Receipt,
  ShoppingCart, Database, ArrowRightLeft, Link2, DollarSign,
  HelpCircle, Eye, EyeOff
  , MessageSquare
} from 'lucide-react'
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts'
import ChatSupport from './chat-support/ChatSupport'
import Dashboard from './dashboard/Dashboard'
import ManualRecharge from './manual-recharge/ManualRecharge'
import UserLookup from './user-lookup/UserLookup'
import RechargeHistory from './recharge-history/RechargeHistory'
import TransactionHistory from './transaction-history/TransactionHistory'
import Billing from './billing/Billing'
import UserCoinRecharge from './user-coin-recharge/UserCoinRecharge'
import NotificationsPanel from './notifications/NotificationsPanel'
import ProfilePanel from './profile/ProfilePanel'
import BlueDiamondSystem from './blue-diamond-system/BlueDiamondSystem'
import GreenDiamondSystem from './green-diamond-system/GreenDiamondSystem'
import DiamondSystem from './diamond-system/DiamondSystem'

const defaultPackages = [
  { id: 'PKG-001', name: 'Normal Coin Package', diamonds: 100, price: 49.99, bonusPct: 10, sold: 22, status: 'active' },
  { id: 'PKG-002', name: 'Blue Diamond Package', diamonds: 250, price: 89.99, bonusPct: 15, sold: 18, status: 'active' },
  { id: 'PKG-003', name: 'Green Diamond Package', diamonds: 500, price: 199.99, bonusPct: 20, sold: 12, status: 'disabled' },
  { id: 'PKG-004', name: 'Premium Diamond Bundle', diamonds: 1000, price: 349.99, bonusPct: 25, sold: 8, status: 'active' },
]

export default function DiamondAgencyPage() {
  const [packages, setPackages] = useState(defaultPackages)
  const [packagesLoading, setPackagesLoading] = useState(false)
  const [packagesError, setPackagesError] = useState(null)
  const [billingInvoices, setBillingInvoices] = useState([
    { invoiceId: 'INV-001', client: 'Aarav Shrestha', packageName: 'Normal Coin Package', amount: 49.99, issuedDate: '2026-07-17', dueDate: '2026-07-24', status: 'Paid' },
    { invoiceId: 'INV-002', client: 'Sima Koirala', packageName: 'Blue Diamond Package', amount: 89.99, issuedDate: '2026-07-16', dueDate: '2026-07-23', status: 'Due' },
    { invoiceId: 'INV-003', client: 'Jay Patel', packageName: 'Green Diamond Package', amount: 199.99, issuedDate: '2026-07-15', dueDate: '2026-07-22', status: 'Overdue' },
    { invoiceId: 'INV-004', client: 'Nina Tamang', packageName: 'Green Diamond Package', amount: 199.99, issuedDate: '2026-07-14', dueDate: '2026-07-25', status: 'Paid' }
  ])
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [showInvoiceModal, setShowInvoiceModal] = useState(false)
  const [selectedPackageDetail, setSelectedPackageDetail] = useState(null)
  const [showPkgDetailModal, setShowPkgDetailModal] = useState(false)
  const [selectedRechargeRecord, setSelectedRechargeRecord] = useState(null)
  const [showRechargeRecordModal, setShowRechargeRecordModal] = useState(false)

  const [activeSideTab, setActiveSideTab] = useState('dashboard')
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [expandedGroups, setExpandedGroups] = useState([])
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  const navigate = useNavigate()
  const { tab } = useParams()

  React.useEffect(() => {
    if (!tab || tab === '') {
      setActiveSideTab('dashboard')
      return
    }

    const supportedTabs = diamondAgencyMenuGroups.map((group) => group.key)
    if (supportedTabs.includes(tab)) {
      setActiveSideTab(tab)
    } else {
      setActiveSideTab('dashboard')
    }
  }, [tab])

  const toggleGroup = (groupId) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId]
    }))
  }

  const handleLogout = () => {
    setProfileOpen(false)
    setActiveSideTab('dashboard')
    navigate('/diamond-agency/dashboard')
  }

  React.useEffect(() => {
    const apiBase = import.meta.env.VITE_API_URL || ''
    if (!apiBase) return // no backend configured — keep mock data

    const controller = new AbortController()
    const fetchPackages = async () => {
      setPackagesLoading(true)
      setPackagesError(null)
      try {
        const res = await fetch(`${apiBase.replace(/\/$/, '')}/packages`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(import.meta.env.VITE_API_TOKEN ? { Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}` } : {})
          },
          signal: controller.signal
        })
        if (!res.ok) throw new Error(`Server returned ${res.status}`)
        const data = await res.json()
        if (Array.isArray(data)) setPackages(data)
        else if (Array.isArray(data.packages)) setPackages(data.packages)
      } catch (err) {
        if (err.name !== 'AbortError') setPackagesError(err.message || String(err))
      } finally {
        setPackagesLoading(false)
      }
    }

    fetchPackages()
    return () => controller.abort()
  }, [])
  const [pkgSearch, setPkgSearch] = useState('')
  const [pkgStatusFilter, setPkgStatusFilter] = useState('All Status')
  const [pkgSettings, setPkgSettings] = useState({
    autoPublish: true,
    displayInStore: true,
    allowGift: true,
    maxPerTransaction: 50000
  })

  const totalRevenue = packages.reduce((s, p) => s + p.price * p.sold, 0)
  const activePackages = packages.filter((p) => p.status === 'active').length
  const disabledPackages = packages.filter((p) => p.status === 'disabled').length
  const totalDiamondsSold = packages.reduce((s, p) => s + p.diamonds * p.sold, 0)
  const totalOrders = packages.reduce((s, p) => s + p.sold, 0)

  const togglePackageStatus = (id) => {
    setPackages((ps) => ps.map((p) => (p.id === id ? { ...p, status: p.status === 'active' ? 'disabled' : 'active' } : p)))
  }
  const deletePackage = (id) => {
    setPackages((ps) => ps.filter((p) => p.id !== id))
  }

  const filteredPackages = packages.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(pkgSearch.toLowerCase())
    const matchesStatus = pkgStatusFilter === 'All Status' || p.status === pkgStatusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  // ---- New Package Form State ----
  const [newPkgName, setNewPkgName] = useState('')
  const [newPkgDiamonds, setNewPkgDiamonds] = useState(100)
  const [newPkgPrice, setNewPkgPrice] = useState(0.99)
  const [newPkgBonus, setNewPkgBonus] = useState(10)

  // ---- Withdrawals State ----
  const [withdrawals, setWithdrawals] = useState([
    { id: 'WD-5001', requester: 'Ramesh Kumar', agency: 'Royal Diamond Agency', amount: 123.50, fraudRisk: 'Low', fraudScore: 8, kyc: 'Verified', status: 'Pending' },
    { id: 'WD-5002', requester: 'Priya Sharma', agency: 'Crown Diamonds Pvt Ltd', amount: 427.50, fraudRisk: 'High', fraudScore: 62, kyc: 'Mismatch', status: 'Pending' },
    { id: 'WD-5003', requester: 'Aarav Shrestha', agency: 'Royal Diamond Agency', amount: 31.82, fraudRisk: 'Low', fraudScore: 4, kyc: 'Verified', status: 'Pending' },
    { id: 'WD-5004', requester: 'David Osei', agency: 'Crown Diamonds Pvt Ltd', amount: 989.90, fraudRisk: 'High', fraudScore: 88, kyc: 'Mismatch', status: 'Pending' }
  ])
  const [withdrawalRules, setWithdrawalRules] = useState({ enabled: true, maxAmount: 50, maxScore: 20, requireKyc: true })

  const safeWithdrawals = withdrawals.filter(w => w.amount <= withdrawalRules.maxAmount && w.fraudScore <= withdrawalRules.maxScore && (withdrawalRules.requireKyc ? w.kyc === 'Verified' : true) && w.status === 'Pending')

  // ---- Agent Wallet State ----
  const [agentWallets] = useState([
    { id: 1, name: 'Aarav Shrestha', agency: 'Royal Streamers', region: 'NEPAL', beans: 420, bonus: 170, gift: 250, loanStatus: 'Active' },
    { id: 2, name: 'Sima Koirala', agency: 'Asia Live Group', region: 'INDIA', beans: 310, bonus: 100, gift: 210, loanStatus: 'Approved' },
    { id: 3, name: 'Jay Patel', agency: 'Coin Agency', region: 'SINGAPORE', beans: 280, bonus: 90, gift: 140, loanStatus: 'None' },
    { id: 4, name: 'Nina Tamang', agency: 'Global Talents', region: 'USA', beans: 400, bonus: 200, gift: 250, loanStatus: 'Pending' }
  ])
  const [sendCoinForm, setSendCoinForm] = useState({ agentId: 1, amount: '', note: '' })
  
  // ---- Recharge State ----
  const [rechargeForm, setRechargeForm] = useState({ userId: '', userName: '', coinsToAdd: '' })
  const [agencyWallet, setAgencyWallet] = useState({ coins: 500000 })
  const [userWallets, setUserWallets] = useState([
    { id: 1, name: 'Aarav Shrestha', coins: 1000, accountType: 'Normal Account' },
    { id: 2, name: 'Sima Koirala', coins: 2500, accountType: 'Official Account' },
    { id: 3, name: 'Jay Patel', coins: 800, accountType: 'Normal Account' },
    { id: 4, name: 'Nina Tamang', coins: 3200, accountType: 'Official Account' }
  ])
  const [rechargeSuccess, setRechargeSuccess] = useState(null)
  const [paymentVerified, setPaymentVerified] = useState(false)

  // ---- Profile State ----
  const [profile, setProfile] = useState({
    agencyId: 'AG-001',
    agencyName: 'Diamond Agency',
    contactNumber: '+977-9800000000',
    email: 'admin@diamondagency.com',
    kycStatus: 'Verified',
    agencyPin: '8899',
    customerPin: '123456'
  })
  const [showAgencyPin, setShowAgencyPin] = useState(false)
  const [showCustomerPin, setShowCustomerPin] = useState(false)
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [passwordSuccess, setPasswordSuccess] = useState(false)

  // ---- Custom Recharge Requests State ----
  const [customRechargeRequests, setCustomRechargeRequests] = useState([
    { id: 'CR-001', userId: '1', userName: 'Aarav Shrestha', requestedCoins: 5000, status: 'Pending', date: '2026-07-17 10:30' },
    { id: 'CR-002', userId: '2', userName: 'Sima Koirala', requestedCoins: 3000, status: 'Pending', date: '2026-07-17 09:15' },
    { id: 'CR-003', userId: '3', userName: 'Jay Patel', requestedCoins: 2000, status: 'Approved', date: '2026-07-16 14:20' },
    { id: 'CR-004', userId: '4', userName: 'Nina Tamang', requestedCoins: 4000, status: 'Rejected', date: '2026-07-16 11:45' }
  ])
  const [requestStatusFilter, setRequestStatusFilter] = useState('all')
  const [requestSearchTerm, setRequestSearchTerm] = useState('')

  // ---- Coin Transfer State ----
  const [coinTransferForm, setCoinTransferForm] = useState({
    userId: '',
    userName: '',
    coinAmount: '',
    coinType: 'Coin',
    transferType: 'instant'
  })
  const [showTransferConfirmation, setShowTransferConfirmation] = useState(false)
  const [transferSuccess, setTransferSuccess] = useState(null)

  const handleCoinTransferSubmit = (e) => {
    e.preventDefault()

    if (!coinTransferForm.userId || !coinTransferForm.coinAmount) {
      alert('Please fill all required fields!')
      return
    }

    if (Number(coinTransferForm.coinAmount) <= 0) {
      alert('Coin amount must be greater than 0!')
      return
    }

    setShowTransferConfirmation(true)
  }

  const handleCoinTransferConfirm = () => {
    const coinsToTransfer = Number(coinTransferForm.coinAmount)
    const userId = Number(coinTransferForm.userId)

    if (agencyWallet.coins < coinsToTransfer) {
      alert('Insufficient coins in Agency Wallet!')
      setShowTransferConfirmation(false)
      return
    }

    setAgencyWallet(prev => ({ coins: prev.coins - coinsToTransfer }))

    setUserWallets(prev => prev.map(user => {
      if (user.id === userId) {
        return { ...user, coins: user.coins + coinsToTransfer }
      }
      return user
    }))

    setTransferSuccess({
      userId: coinTransferForm.userId,
      userName: coinTransferForm.userName,
      coins: coinsToTransfer,
      coinType: coinTransferForm.coinType,
      transferType: coinTransferForm.transferType,
      timestamp: new Date().toLocaleString()
    })

    setCoinTransferForm({ userId: '', userName: '', coinAmount: '', coinType: 'Coin', transferType: 'instant' })
    setShowTransferConfirmation(false)
  }

  const handleCoinTransferCancel = () => {
    setShowTransferConfirmation(false)
  }

  // ---- Recharge History State ----
  const [rechargeHistory, setRechargeHistory] = useState([
    { transactionId: 'TXN-001', rechargeId: 'RC-001', userId: '1', userName: 'Aarav Shrestha', rechargeType: 'Normal Coin', coinsAdded: 500, status: 'Completed', dateTime: '2026-07-17 10:30', remarks: 'Payment verified' },
    { transactionId: 'TXN-002', rechargeId: 'RC-002', userId: '2', userName: 'Sima Koirala', rechargeType: 'Blue Diamond', coinsAdded: 1000, status: 'Pending', dateTime: '2026-07-17 09:15', remarks: 'Awaiting approval' },
    { transactionId: 'TXN-003', rechargeId: 'RC-003', userId: '3', userName: 'Jay Patel', rechargeType: 'Green Diamond', coinsAdded: 250, status: 'Failed', dateTime: '2026-07-16 14:20', remarks: 'Payment declined' },
    { transactionId: 'TXN-004', rechargeId: 'RC-004', userId: '4', userName: 'Nina Tamang', rechargeType: 'Normal Coin', coinsAdded: 750, status: 'Completed', dateTime: '2026-07-16 11:45', remarks: 'Successful' },
    { transactionId: 'TXN-005', rechargeId: 'RC-005', userId: '1', userName: 'Aarav Shrestha', rechargeType: 'Normal Coin', coinsAdded: 2000, status: 'Refunded', dateTime: '2026-07-15 16:30', remarks: 'User requested refund' },
    { transactionId: 'TXN-006', rechargeId: 'RC-006', userId: '2', userName: 'Sima Koirala', rechargeType: 'Blue Diamond', coinsAdded: 150, status: 'Completed', dateTime: '2026-07-15 08:20', remarks: 'Instant transfer' }
  ])
  const [historyFilters, setHistoryFilters] = useState({
    dateFilter: 'all',
    customDate: '',
    statusFilter: 'all',
    userIdFilter: ''
  })

  // ---- Coin Transfer History State ----
  const [coinTransferHistory, setCoinTransferHistory] = useState([
    { transactionId: 'TXF-001', userId: '1', userName: 'Aarav Shrestha', coinType: 'Coin', coins: 500, transferType: 'instant', status: 'Completed', timestamp: '2026-07-17 10:30' },
    { transactionId: 'TXF-002', userId: '2', userName: 'Sima Koirala', coinType: 'Blue Diamond', coins: 1000, transferType: 'scheduled', status: 'Completed', timestamp: '2026-07-17 09:15' },
    { transactionId: 'TXF-003', userId: '3', userName: 'Jay Patel', coinType: 'Red Diamond', coins: 250, transferType: 'instant', status: 'Completed', timestamp: '2026-07-16 14:20' },
    { transactionId: 'TXF-004', userId: '4', userName: 'Nina Tamang', coinType: 'Green Diamond', coins: 750, transferType: 'bulk', status: 'Completed', timestamp: '2026-07-16 11:45' }
  ])
  const [transferHistoryFilters, setTransferHistoryFilters] = useState({
    dateFilter: 'all',
    customDate: '',
    statusFilter: 'all',
    userIdFilter: ''
  })
  const [transactionHistoryFilters, setTransactionHistoryFilters] = useState({
    dateFilter: 'all',
    customDate: '',
    typeFilter: 'all',
    statusFilter: 'all',
    userIdFilter: '',
    searchTerm: ''
  })

  // ---- User Lookup State ----
  const [userLookupSearch, setUserLookupSearch] = useState('')
  const [userLookupResult, setUserLookupResult] = useState(null)

  // ---- Manual Recharge Form State ----
  const [manualRechargeForm, setManualRechargeForm] = useState({
    agencyId: 'AG-001',
    agencyName: 'Diamond Agency',
    userId: '',
    userName: '',
    accountType: '',
    coinAmount: '',
    rechargeType: 'Normal Coin',
    remarks: ''
  })
  const [showManualRechargeConfirm, setShowManualRechargeConfirm] = useState(false)
  const [manualRechargeSuccess, setManualRechargeSuccess] = useState(null)

  // ---- Loans State ----
  const [loans] = useState([
    { id: 'LOAN-101', agent: 'Aarav Shrestha', amount: 1200, tenor: '30 days', status: 'Active', disbursed: '05 Jul 2026' },
    { id: 'LOAN-102', agent: 'Sima Koirala', amount: 800, tenor: '21 days', status: 'Approved', disbursed: '06 Jul 2026' },
    { id: 'LOAN-103', agent: 'Nina Tamang', amount: 1500, tenor: '45 days', status: 'Pending', disbursed: '07 Jul 2026' }
  ])

  // Shared state for sub-agencies
  const [subAgencies, setSubAgencies] = useState([
    { id: 'AG-201', name: 'Alpha Agency', head: 'Karan Sharma', region: 'India', coins: 150000, status: 'Active' },
    { id: 'AG-202', name: 'Sagar Streamers', head: 'Sagar Adhikari', region: 'Nepal', coins: 95000, status: 'Active' },
    { id: 'AG-203', name: 'Royal Gaming', head: 'Sophia Rai', region: 'Nepal', coins: 50000, status: 'Suspended' }
  ])

  // Create Agency Form
  const [newAgencyName, setNewAgencyName] = useState('')
  const [newAgencyHead, setNewAgencyHead] = useState('')
  const [newAgencyRegion, setNewAgencyRegion] = useState('Nepal')
  const [initialCoins, setInitialCoins] = useState(20000)

  // Distribution
  const [distributionLedger, setDistributionLedger] = useState([
    { date: '2026-07-17 07:35', target: 'Alpha Agency', amount: '50,000 Coins', status: 'Success' },
    { date: '2026-07-16 14:20', target: 'Sagar Streamers', amount: '15,000 Blue Diamonds', status: 'Success' }
  ])
  const [distTarget, setDistTarget] = useState('AG-201')
  const [distAmount, setDistAmount] = useState(10000)
  const [distAsset, setDistAsset] = useState('E-Rupee Coins')

  // Platform Integration
  const [webhookLogs, setWebhookLogs] = useState([
    { time: '07:51:02', event: 'Heartbeat Ping', source: 'Super Admin Gateway', status: '200 OK' }
  ])
  const [isApiConnected, setIsApiConnected] = useState(true)

  // Expansion
  const [selectedExpansionRegion, setSelectedExpansionRegion] = useState('All Regions')

  // Commission
  const [availableCommission, setAvailableCommission] = useState(725000)
  const [withdrawAmount, setWithdrawAmount] = useState(100000)
  const [commissionHistory, setCommissionHistory] = useState([
    { id: 'CP-001', agency: 'Alpha Agency', type: 'Monthly Payout', beans: 250000, erupee: 2500, date: '2026-07-01', status: 'Paid' },
    { id: 'CP-002', agency: 'Sagar Streamers', type: 'Bonus Commission', beans: 80000, erupee: 800, date: '2026-07-05', status: 'Paid' },
    { id: 'CP-003', agency: 'Royal Gaming', type: 'Monthly Payout', beans: 45000, erupee: 450, date: '2026-07-10', status: 'Pending' },
    { id: 'CP-004', agency: 'Alpha Agency', type: 'Performance Bonus', beans: 120000, erupee: 1200, date: '2026-07-14', status: 'Processing' },
  ])
  const [payoutForm, setPayoutForm] = useState({ agency: 'AG-201', type: 'Monthly Payout', beans: '' })

  // Target
  const [targetSales] = useState(1500000)
  const [currentSales] = useState(1050000)

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'recharge_approved', title: 'Recharge Approved', message: 'User ID: 1234 - 500 coins successfully added to wallet.', time: '2 hours ago', read: false },
    { id: 2, type: 'recharge_failed', title: 'Recharge Failed', message: 'User ID: 5678 - Insufficient payment verification.', time: '3 hours ago', read: false },
    { id: 3, type: 'custom_recharge_approved', title: 'Custom Recharge Approved', message: 'User ID: 9012 - Custom request for 1000 coins approved.', time: '5 hours ago', read: false },
    { id: 4, type: 'system', title: 'System Notification', message: 'Scheduled maintenance this weekend from 2 AM to 4 AM.', time: '1 day ago', read: true },
    { id: 5, type: 'recharge_approved', title: 'Recharge Approved', message: 'User ID: 3456 - 250 coins successfully added to wallet.', time: '6 hours ago', read: true }
  ])
  const [notificationFilter, setNotificationFilter] = useState('all')

  // Settings
  const [agencySettings, setAgencySettings] = useState({
    email: 'admin@diamondagency.com',
    phone: '+977-9800000000',
    notifyEmail: true,
    notifySms: false
  })

  // ---- Help & Support State ----
  const [helpSearch, setHelpSearch] = useState('')
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [supportForm, setSupportForm] = useState({ subject: '', message: '' })
  const [supportTicketSubmitted, setSupportTicketSubmitted] = useState(false)

  const faqData = [
    { q: 'How do I recharge a user wallet?', a: 'Go to Manual Recharge or Recharge from the sidebar, enter the User ID, verify payment, and submit the coin amount.' },
    { q: 'How do I approve a withdrawal request?', a: 'Navigate to Diamond Packages > Withdrawals, review the fraud score and KYC status, then click Review or use Bulk Approve for safe requests.' },
    { q: 'How do I create a new diamond package?', a: 'Go to Diamond Packages > Add Diamond Package, fill in the name, diamonds, price, and bonus percentage, then publish.' },
    { q: 'How do I add a sub-agency?', a: 'Open Agency > Create Agency, fill in the brand name, representative head, territory, and initial coin quota.' },
    { q: 'How can I contact support?', a: "Use the Contact Support form on this page or email support@diamondagency.com." }
  ]

  // ---- System Configuration State ----
  const [paymentGateways, setPaymentGateways] = useState([
    { id: 'gw_stripe', name: 'Stripe', status: 'Active', type: 'Credit Card', keys: { pub: 'pk_live_********89', sec: 'sk_live_********2x' } },
    { id: 'gw_paypal', name: 'PayPal', status: 'Inactive', type: 'Wallet', keys: { pub: 'client_********ab', sec: 'secret_********9z' } },
    { id: 'gw_esewa', name: 'eSewa', status: 'Active', type: 'Local Wallet', keys: { pub: 'epay_********11', sec: 'esewa_********99' } }
  ])
  const [editingGwId, setEditingGwId] = useState(null)
  const [editGwForm, setEditGwForm] = useState({ pub: '', sec: '' })
  
  const [webhooks, setWebhooks] = useState([
    { id: 'wh_1', url: 'https://api.diamondagency.com/webhook', events: ['package.purchased', 'withdrawal.requested'], status: 'Active' }
  ])
  
  const [webhookLogsList, setWebhookLogsList] = useState([
    { id: 1, time: '10:05 AM', event: 'package.purchased', response: '200 OK', success: true },
    { id: 2, time: '09:12 AM', event: 'withdrawal.requested', response: '500 Server Error', success: false },
    { id: 3, time: '08:45 AM', event: 'package.purchased', response: '200 OK', success: true }
  ])

  const [securityLogs, setSecurityLogs] = useState([
    { id: 1, action: 'Payment Gateway Updated', ip: '192.168.1.45', user: 'Admin (Karan)', date: '2026-07-17 08:30 AM' },
    { id: 2, action: 'Webhook Endpoint Changed', ip: '10.0.0.12', user: 'System', date: '2026-07-16 11:15 AM' },
    { id: 3, action: 'Auto-Approval Rules Edited', ip: '192.168.1.45', user: 'Admin (Karan)', date: '2026-07-15 02:45 PM' }
  ])

  // History
  const [activityHistory] = useState([
    { id: 1, action: 'Created Agency', detail: 'Sagar Streamers created', date: '2026-07-16 10:00' },
    { id: 2, action: 'Distributed Coins', detail: 'Sent 15,000 to Alpha Agency', date: '2026-07-15 14:30' },
    { id: 3, action: 'Withdrew Commission', detail: '50,000 Beans withdrawn', date: '2026-07-14 09:15' }
  ])

  const [systemUsers, setSystemUsers] = useState([
    { id: 'U-1001', name: 'Karan Admin', role: 'Super Admin', email: 'karan@erupai.com', status: 'Active' },
    { id: 'U-1002', name: 'Sagar Support', role: 'Support Agent', email: 'sagar@erupai.com', status: 'Active' },
    { id: 'U-1003', name: 'Ramesh Manager', role: 'Regional Manager', email: 'ramesh@erupai.com', status: 'Inactive' }
  ])
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [inviteForm, setInviteForm] = useState({ name: '', email: '', role: 'Support Agent', status: 'Active' })

  const exportSecurityLogsToCSV = () => {
    const headers = ['TIMESTAMP', 'ADMIN / USER', 'ACTION TAKEN', 'IP ADDRESS']
    const csvRows = securityLogs.map(log => `"${log.date}","${log.user}","${log.action}","${log.ip}"`)
    const csvContent = [headers.join(','), ...csvRows].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', 'security_audit_logs.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleCreateAgency = (e) => {
    e.preventDefault()
    if (!newAgencyName || !newAgencyHead) return
    const newAg = {
      id: `AG-${Math.floor(200 + Math.random() * 800)}`,
      name: newAgencyName,
      head: newAgencyHead,
      region: newAgencyRegion,
      coins: initialCoins,
      status: 'Active'
    }
    setSubAgencies([newAg, ...subAgencies])
    setNewAgencyName('')
    setNewAgencyHead('')
  }

  const handleDistribute = (e) => {
    e.preventDefault()
    const targetAg = subAgencies.find(a => a.id === distTarget)
    if (!targetAg) return
    setSubAgencies(subAgencies.map(a => {
      if (a.id === distTarget && distAsset === 'E-Rupee Coins') {
        return { ...a, coins: a.coins + distAmount }
      }
      return a
    }))
    const log = {
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      target: targetAg.name,
      amount: `${distAmount.toLocaleString()} ${distAsset}`,
      status: 'Success'
    }
    setDistributionLedger([log, ...distributionLedger])
  }

  const toggleAgencyStatus = (id) => {
    setSubAgencies(subAgencies.map(a => {
      if (a.id === id) return { ...a, status: a.status === 'Active' ? 'Suspended' : 'Active' }
      return a
    }))
  }


  // renderDiamondSystem removed, replaced by top-level DiamondSystem component

  const renderPanel = () => {
    switch (activeSideTab) {
      case 'pkg_all':
        const handleExport = () => {
          const headers = ['Package ID,Name,Diamonds,Price(USD),Bonus(%),Sold,Status']
          const rows = packages.map(p => `${p.id},"${p.name}",${p.diamonds},${p.price},${p.bonusPct},${p.sold},${p.status}`)
          const csv = headers.concat(rows).join('\n')
          const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = 'diamond_packages.csv'
          a.click()
          URL.revokeObjectURL(url)
        }
        
        return (
          <div className="space-y-6">
            {/* Super Admin Auto-Fetch Notice Banner */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-red-100 text-[#E51E25] rounded-xl shrink-0">
                  <RefreshCw className={`w-5 h-5 ${packagesLoading ? 'animate-spin' : ''}`} />
                </div>
                <div>
                  <div className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                    Packages Auto-Fetched from Super Admin
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700">Auto Synced</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">Agency can only perform user coin recharges. Packages are configured and published by Super Admin.</div>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button 
                  onClick={handleExport}
                  className="bg-white border border-slate-200 text-slate-700 px-3 py-2 rounded-xl text-xs font-bold shadow-sm hover:bg-slate-50 transition-colors flex items-center gap-1.5"
                >
                  Export
                </button>
                <button 
                  onClick={() => {
                    setPackagesLoading(true);
                    setTimeout(() => { setPackages([...defaultPackages]); setPackagesLoading(false); }, 1000);
                  }}
                  disabled={packagesLoading}
                  className="bg-[#E51E25] hover:bg-[#c4161c] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${packagesLoading ? 'animate-spin' : ''}`} />
                  {packagesLoading ? 'Syncing...' : 'Sync Super Admin'}
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-white p-3 sm:p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-red-50 flex items-center justify-center mb-2 sm:mb-3">
                  <Gem className="w-3 h-3 sm:w-4 sm:h-4 text-[#E51E25]" />
                </div>
                <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wide">Total Diamonds Sold</div>
                <div className="text-lg sm:text-2xl font-black text-slate-800 mt-1">{totalDiamondsSold.toLocaleString()}</div>
                <div className="text-[10px] sm:text-xs font-semibold text-green-600 mt-1">↑ vs last 7 days</div>
              </div>
              <div className="bg-white p-3 sm:p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-green-50 flex items-center justify-center mb-2 sm:mb-3">
                  <Banknote className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                </div>
                <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wide">Total Revenue</div>
                <div className="text-lg sm:text-2xl font-black text-slate-800 mt-1">${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                <div className="text-[10px] sm:text-xs font-semibold text-green-600 mt-1">↑ vs last 7 days</div>
              </div>
              <div className="bg-white p-3 sm:p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-blue-50 flex items-center justify-center mb-2 sm:mb-3">
                  <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                </div>
                <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wide">Active Packages</div>
                <div className="text-lg sm:text-2xl font-black text-slate-800 mt-1">{activePackages}</div>
                <div className="text-[10px] sm:text-xs font-semibold text-green-600 mt-1">100% active</div>
              </div>
              <div className="bg-white p-3 sm:p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-amber-50 flex items-center justify-center mb-2 sm:mb-3">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600" />
                </div>
                <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wide">Total Orders</div>
                <div className="text-lg sm:text-2xl font-black text-slate-800 mt-1">{totalOrders.toLocaleString()}</div>
                <div className="text-[10px] sm:text-xs font-semibold text-green-600 mt-1">↑ vs last 7 days</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="text" 
                    placeholder="Search diamond package..." 
                    value={pkgSearch}
                    onChange={(e) => setPkgSearch(e.target.value)}
                    className="flex-1 bg-white border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                  />
                  <select 
                    value={pkgStatusFilter}
                    onChange={(e) => setPkgStatusFilter(e.target.value)}
                    className="bg-white border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                  >
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Disabled</option>
                  </select>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 text-slate-400 font-bold text-xs uppercase">
                        <tr>
                          <th className="p-4 w-10"></th>
                          <th className="p-4">Package Name</th>
                          <th className="p-4">Diamonds</th>
                          <th className="p-4">Price</th>
                          <th className="p-4">Bonus</th>
                          <th className="p-4">Total</th>
                          <th className="p-4 text-center">Status</th>
                          <th className="p-4 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredPackages.map((p) => (
                          <tr key={p.id} className="hover:bg-slate-50/50">
                            <td className="p-4"><input type="checkbox" className="rounded border-slate-300 text-red-600 focus:ring-red-500" /></td>
                            <td className="p-4 font-bold text-slate-800 flex items-center gap-2">
                              <div className="w-6 h-6 rounded bg-red-50 flex items-center justify-center shrink-0">
                                <Gem className="w-3 h-3 text-[#E51E25]" />
                              </div>
                              {p.name}
                            </td>
                            <td className="p-4 font-mono">{p.diamonds}</td>
                            <td className="p-4 font-mono font-bold">${p.price}</td>
                            <td className="p-4 font-mono text-green-600">+{Math.floor(p.diamonds * (p.bonusPct / 100))} ({p.bonusPct}%)</td>
                            <td className="p-4 font-mono font-black">{p.diamonds + Math.floor(p.diamonds * (p.bonusPct / 100))}</td>
                            <td className="p-4 text-center">
                              <button 
                                onClick={() => togglePackageStatus(p.id)}
                                className={`w-11 h-6 rounded-full relative transition-colors inline-block ${p.status === 'active' ? 'bg-[#E51E25]' : 'bg-slate-200'}`}
                              >
                                <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${p.status === 'active' ? 'translate-x-5' : ''}`} />
                              </button>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center justify-center gap-2">
                                <button 
                                  onClick={() => { setSelectedPackageDetail(p); setShowPkgDetailModal(true); }}
                                  className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                  title="View Package Details"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button className="p-1.5 text-slate-400 hover:text-[#E51E25] hover:bg-red-50 rounded-lg transition-colors">
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button onClick={() => deletePackage(p.id)} className="p-1.5 text-slate-400 hover:text-[#E51E25] hover:bg-red-50 rounded-lg transition-colors">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Package Settings Sidebar */}
              <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm h-fit space-y-4 sm:space-y-6">
                <h4 className="font-extrabold text-slate-800 flex items-center gap-2 text-sm sm:text-base"><Settings className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" /> Diamond Package Settings</h4>
                <div className="space-y-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-bold text-slate-800 text-sm">Auto Publish New Package</div>
                      <div className="text-xs text-slate-500 mt-0.5">Automatically publish new diamond packages</div>
                    </div>
                    <button 
                      onClick={() => setPkgSettings({...pkgSettings, autoPublish: !pkgSettings.autoPublish})}
                      className={`w-10 h-6 rounded-full relative transition-colors shrink-0 ${pkgSettings.autoPublish ? 'bg-[#E51E25]' : 'bg-slate-200'}`}
                    >
                      <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${pkgSettings.autoPublish ? 'translate-x-4' : ''}`} />
                    </button>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-bold text-slate-800 text-sm">Display In Store</div>
                      <div className="text-xs text-slate-500 mt-0.5">Show diamond packages in user store</div>
                    </div>
                    <button 
                      onClick={() => setPkgSettings({...pkgSettings, displayInStore: !pkgSettings.displayInStore})}
                      className={`w-10 h-6 rounded-full relative transition-colors shrink-0 ${pkgSettings.displayInStore ? 'bg-[#E51E25]' : 'bg-slate-200'}`}
                    >
                      <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${pkgSettings.displayInStore ? 'translate-x-4' : ''}`} />
                    </button>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-bold text-slate-800 text-sm">Allow Gift</div>
                      <div className="text-xs text-slate-500 mt-0.5">Allow users to send diamonds as gifts</div>
                    </div>
                    <button 
                      onClick={() => setPkgSettings({...pkgSettings, allowGift: !pkgSettings.allowGift})}
                      className={`w-10 h-6 rounded-full relative transition-colors shrink-0 ${pkgSettings.allowGift ? 'bg-[#E51E25]' : 'bg-slate-200'}`}
                    >
                      <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${pkgSettings.allowGift ? 'translate-x-4' : ''}`} />
                    </button>
                  </div>
                  <div className="pt-2">
                    <div className="font-bold text-slate-800 text-sm mb-2">Maximum Diamonds Per Transaction</div>
                    <input 
                      type="number" 
                      value={pkgSettings.maxPerTransaction} 
                      onChange={(e) => setPkgSettings({...pkgSettings, maxPerTransaction: Number(e.target.value)})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'pkg_analytics':
        const bestPerformer = packages.reduce((prev, curr) => (curr.sold * curr.price > prev.sold * prev.price) ? curr : prev, packages[0])
        const bestRevenue = bestPerformer.sold * bestPerformer.price
        const avgBonus = Math.round(packages.reduce((s, p) => s + p.bonusPct, 0) / packages.length)
        
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5">
              <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center">
                <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center gap-2 mb-2"><Banknote className="w-3 h-3 sm:w-4 sm:h-4 text-green-500"/> 7-Day Revenue</div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-800">${totalRevenue.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
                <div className="text-[10px] sm:text-xs font-semibold text-green-600 mt-1">all packages</div>
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center">
                <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center gap-2 mb-2"><TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500"/> Best Performer</div>
                <div className="text-base sm:text-xl lg:text-2xl font-black text-slate-800 truncate">{bestPerformer.name}</div>
                <div className="text-[10px] sm:text-xs font-semibold text-green-600 mt-1">${bestRevenue.toLocaleString(undefined, {minimumFractionDigits: 2})} revenue</div>
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center">
                <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center gap-2 mb-2"><Award className="w-3 h-3 sm:w-4 sm:h-4 text-[#E51E25]"/> Avg. Bonus Offered</div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-800">{avgBonus}%</div>
                <div className="text-[10px] sm:text-xs font-semibold text-green-600 mt-1">across packages</div>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="font-extrabold text-slate-800 text-base sm:text-lg mb-4 sm:mb-6">Revenue by Package</h4>
              <div className="space-y-4 sm:space-y-6">
                {[...packages].sort((a,b) => (b.sold*b.price) - (a.sold*a.price)).map(p => {
                  const rev = p.sold * p.price
                  const pct = Math.min(100, (rev / bestRevenue) * 100)
                  return (
                    <div key={p.id} className="flex items-center gap-2 sm:gap-4">
                      <div className="w-24 sm:w-32 md:w-48 text-xs sm:text-sm font-semibold text-slate-600 truncate">{p.name}</div>
                      <div className="flex-1 h-3 sm:h-4 bg-slate-100 rounded-r-full overflow-hidden flex items-center">
                        <div className="h-full bg-gradient-to-r from-teal-400 to-teal-500 rounded-r-full" style={{ width: `${pct}%` }}></div>
                      </div>
                      <div className="w-16 sm:w-24 text-right font-mono font-bold text-slate-700 text-xs sm:text-sm">${rev.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )
      
      case 'pkg_settings':
        return (
          <div className="space-y-4 sm:space-y-6 max-w-2xl">
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4 sm:space-y-6">
              <h4 className="font-extrabold text-slate-800 text-base sm:text-lg flex items-center gap-2"><Settings className="w-4 h-4 sm:w-5 sm:h-5 text-[#E51E25]" /> Global Package Configurations</h4>
              <div className="space-y-6">
                <div className="flex items-center justify-between gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50">
                  <div>
                    <div className="font-bold text-slate-800 text-sm">Auto Publish New Package</div>
                    <div className="text-xs text-slate-500 mt-1">Automatically push newly created diamond packages live to the store immediately.</div>
                  </div>
                  <button 
                    onClick={() => setPkgSettings({...pkgSettings, autoPublish: !pkgSettings.autoPublish})}
                    className={`w-12 h-7 rounded-full relative transition-colors shrink-0 ${pkgSettings.autoPublish ? 'bg-[#E51E25]' : 'bg-slate-300'}`}
                  >
                    <span className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${pkgSettings.autoPublish ? 'translate-x-5' : ''}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50">
                  <div>
                    <div className="font-bold text-slate-800 text-sm">Display In Store</div>
                    <div className="text-xs text-slate-500 mt-1">Make diamond packages visible and purchasable in the public user store interface.</div>
                  </div>
                  <button 
                    onClick={() => setPkgSettings({...pkgSettings, displayInStore: !pkgSettings.displayInStore})}
                    className={`w-12 h-7 rounded-full relative transition-colors shrink-0 ${pkgSettings.displayInStore ? 'bg-[#E51E25]' : 'bg-slate-300'}`}
                  >
                    <span className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${pkgSettings.displayInStore ? 'translate-x-5' : ''}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50">
                  <div>
                    <div className="font-bold text-slate-800 text-sm">Allow Gifting Diamonds</div>
                    <div className="text-xs text-slate-500 mt-1">Allow users to purchase diamonds and send them directly to other users as gifts.</div>
                  </div>
                  <button 
                    onClick={() => setPkgSettings({...pkgSettings, allowGift: !pkgSettings.allowGift})}
                    className={`w-12 h-7 rounded-full relative transition-colors shrink-0 ${pkgSettings.allowGift ? 'bg-[#E51E25]' : 'bg-slate-300'}`}
                  >
                    <span className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${pkgSettings.allowGift ? 'translate-x-5' : ''}`} />
                  </button>
                </div>
                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50">
                  <div className="font-bold text-slate-800 text-sm mb-1">Maximum Diamonds Per Transaction</div>
                  <div className="text-xs text-slate-500 mb-3">Hard limit on how many diamonds can be purchased or transferred in a single session.</div>
                  <input 
                    type="number" 
                    value={pkgSettings.maxPerTransaction} 
                    onChange={(e) => setPkgSettings({...pkgSettings, maxPerTransaction: Number(e.target.value)})}
                    className="w-full max-w-sm bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-mono font-bold focus:outline-none focus:ring-2 focus:ring-red-500/30"
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 'pkg_add':
        return (
          <div className="space-y-4 sm:space-y-6 max-w-2xl">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm text-center space-y-4">
              <div className="w-16 h-16 bg-red-50 text-[#E51E25] rounded-full flex items-center justify-center mx-auto">
                <Gem className="w-8 h-8" />
              </div>
              <h4 className="font-extrabold text-slate-800 text-lg">Packages Managed by Super Admin</h4>
              <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                As an Agency, packages are automatically fetched from the Super Admin panel. Agency accounts cannot manually create packages and perform user coin recharges using Super Admin rates.
              </p>
              <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-xl text-xs font-semibold text-slate-600 max-w-md mx-auto text-left space-y-2">
                <div className="flex items-center gap-2 text-slate-800 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-green-600" /> Auto-Sync Active
                </div>
                <div>All coin and diamond package rates, bonuses, and prices are set by Super Admin and update automatically.</div>
              </div>
              <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
                <button
                  onClick={() => setActiveSideTab('pkg_all')}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
                >
                  View Super Admin Packages
                </button>
                <button
                  onClick={() => setActiveSideTab('manual_recharge')}
                  className="bg-[#E51E25] hover:bg-[#c4161c] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all"
                >
                  Go to User Coin Recharge
                </button>
              </div>
            </div>
          </div>
        )

      case 'withdrawals':
        const handleBulkApprove = () => {
          const safeIds = safeWithdrawals.map(w => w.id)
          setWithdrawals(withdrawals.map(w => safeIds.includes(w.id) ? { ...w, status: 'Approved' } : w))
        }
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                <span className="font-extrabold text-slate-800 text-sm sm:text-base">{withdrawals.filter(w=>w.status==='Pending').length} pending withdrawals</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-slate-400 font-bold text-[10px] sm:text-xs uppercase">
                    <tr><th className="p-2 sm:p-4">ID</th><th className="p-2 sm:p-4">Requester</th><th className="p-2 sm:p-4">Net Amount</th><th className="p-2 sm:p-4">Fraud Risk</th><th className="p-2 sm:p-4">KYC</th><th className="p-2 sm:p-4">Status</th><th className="p-2 sm:p-4 text-center">Actions</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {withdrawals.filter(w=>w.status==='Pending').map(w => (
                      <tr key={w.id} className="hover:bg-slate-50/50">
                        <td className="p-2 sm:p-4 font-mono font-bold text-[#E51E25] text-xs">{w.id}</td>
                        <td className="p-2 sm:p-4">
                          <div className="font-bold text-slate-800 text-xs sm:text-sm">{w.requester}</div>
                          <div className="text-[10px] sm:text-xs text-slate-500">{w.agency}</div>
                        </td>
                        <td className="p-2 sm:p-4 font-mono font-bold text-xs sm:text-sm">${w.amount.toFixed(2)}</td>
                        <td className="p-2 sm:p-4">
                          <span className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-bold ${w.fraudRisk==='Low'?'bg-green-100 text-green-700':'bg-red-100 text-red-700'}`}>{w.fraudRisk} • {w.fraudScore}</span>
                        </td>
                        <td className="p-2 sm:p-4">
                          <span className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-bold ${w.kyc==='Verified'?'bg-green-100 text-green-700':'bg-amber-100 text-amber-700'}`}>{w.kyc}</span>
                        </td>
                        <td className="p-2 sm:p-4"><span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-bold bg-slate-100 text-slate-600">{w.status}</span></td>
                        <td className="p-2 sm:p-4 text-center"><button className="text-[10px] sm:text-xs font-bold text-[#E51E25] hover:underline">Review</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 p-3 sm:p-5 rounded-2xl mt-4 sm:mt-6">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-0 mb-4">
                <div>
                  <h4 className="font-extrabold text-emerald-800 flex items-center gap-2 text-sm sm:text-base"><CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" /> Bulk Approve — Safe Requests</h4>
                  <p className="text-[10px] sm:text-xs text-emerald-600 mt-1">Meets auto-rules: ≤ ${withdrawalRules.maxAmount} net, fraud score ≤ {withdrawalRules.maxScore}, KYC {withdrawalRules.requireKyc ? 'verified' : 'optional'}.</p>
                </div>
                <button onClick={handleBulkApprove} disabled={safeWithdrawals.length===0} className="bg-emerald-600 disabled:bg-emerald-300 text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all">
                  Approve Selected ({safeWithdrawals.length})
                </button>
              </div>
              {safeWithdrawals.length > 0 && (
                <div className="bg-white rounded-xl overflow-hidden border border-emerald-100">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                    <thead className="bg-emerald-50 text-emerald-700 font-bold text-xs uppercase">
                      <tr><th className="p-3 w-10"><input type="checkbox" checked readOnly className="rounded text-emerald-600" /></th><th className="p-3">ID</th><th className="p-3">Requester</th><th className="p-3">Net Amount</th><th className="p-3">Fraud Score</th></tr>
                    </thead>
                    <tbody className="divide-y divide-emerald-50">
                      {safeWithdrawals.map(w => (
                        <tr key={w.id}>
                          <td className="p-3"><input type="checkbox" checked readOnly className="rounded text-emerald-600" /></td>
                          <td className="p-3 font-mono text-[#E51E25] font-bold text-xs">{w.id}</td>
                          <td className="p-3 text-emerald-900">{w.requester}</td>
                          <td className="p-3 font-mono font-bold text-emerald-900">${w.amount.toFixed(2)}</td>
                          <td className="p-3 font-mono text-emerald-700">{w.fraudScore}/100</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-6">
                <h4 className="font-extrabold text-slate-800 flex items-center gap-2 mb-4 text-sm sm:text-base"><Settings className="w-4 h-4 sm:w-5 sm:h-5 text-[#E51E25]" /> Auto-Approval Rules</h4>
                <div className="space-y-4">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" checked={withdrawalRules.enabled} onChange={e=>setWithdrawalRules({...withdrawalRules,enabled:e.target.checked})} className="rounded text-red-600 w-4 h-4" />
                    <span className="font-bold text-slate-700 text-sm">Enable auto-eligibility for bulk approval</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Max net amount (USD)</label>
                      <input type="number" value={withdrawalRules.maxAmount} onChange={e=>setWithdrawalRules({...withdrawalRules,maxAmount:Number(e.target.value)})} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Max fraud score (0-100)</label>
                      <input type="number" value={withdrawalRules.maxScore} onChange={e=>setWithdrawalRules({...withdrawalRules,maxScore:Number(e.target.value)})} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30" />
                    </div>
                  </div>
                  <label className="flex items-center gap-3 pt-2">
                    <input type="checkbox" checked={withdrawalRules.requireKyc} onChange={e=>setWithdrawalRules({...withdrawalRules,requireKyc:e.target.checked})} className="rounded text-red-600 w-4 h-4" />
                    <span className="font-bold text-slate-700 text-sm">Require KYC status = Verified</span>
                  </label>
                  <button className="bg-[#E51E25] hover:bg-[#c4161c] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all active:scale-95 w-max mt-2">Save Rules</button>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h4 className="font-extrabold text-slate-800 flex items-center gap-2 mb-4"><Lock className="w-5 h-5 text-slate-400" /> Audit Log <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase tracking-wider ml-2">Immutable • Read-only</span></h4>
                <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <FileText className="w-5 h-5 text-slate-400 shrink-0" />
                  <div>
                    <div className="font-bold text-slate-700 text-sm">Panel initialized</div>
                    <div className="text-xs text-slate-500 mt-1">Withdrawal approval workflow enabled for Diamond Agency.</div>
                    <div className="text-xs text-slate-400 mt-2 font-mono">System • Jul 17, 2026, 08:46 AM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'wallet_beans':
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
              <div>
                <h4 className="font-extrabold text-slate-800 flex items-center gap-2 text-base sm:text-lg"><Wallet className="w-4 h-4 sm:w-5 sm:h-5 text-[#E51E25]" /> Bean Wallet</h4>
                <p className="text-[10px] sm:text-xs text-slate-500 mt-1">Track total beans, gifts, and platform bonuses for all agents.</p>
              </div>
              <div className="flex gap-2 sm:gap-4 flex-wrap">
                <div className="bg-slate-50 px-3 sm:px-5 py-2 sm:py-3 rounded-xl border border-slate-100 text-center">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Beans</div>
                  <div className="text-base sm:text-xl font-black text-slate-800">1,410</div>
                </div>
                <div className="bg-slate-50 px-3 sm:px-5 py-2 sm:py-3 rounded-xl border border-slate-100 text-center">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Gift Beans</div>
                  <div className="text-base sm:text-xl font-black text-slate-800">850</div>
                </div>
                <div className="bg-slate-50 px-3 sm:px-5 py-2 sm:py-3 rounded-xl border border-slate-100 text-center">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Platform Bonus</div>
                  <div className="text-base sm:text-xl font-black text-slate-800">560</div>
                </div>
                <div className="bg-slate-50 px-3 sm:px-5 py-2 sm:py-3 rounded-xl border border-slate-100 text-center">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Avg Beans/Agent</div>
                  <div className="text-base sm:text-xl font-black text-slate-800">353</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {agentWallets.map(w => (
                <div key={w.id} className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="flex justify-between items-start mb-4 sm:mb-6">
                    <div>
                      <h5 className="font-extrabold text-slate-800 text-base sm:text-lg">{w.name}</h5>
                      <div className="text-[10px] sm:text-xs text-slate-500">{w.agency}</div>
                    </div>
                    <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-2 sm:px-2.5 py-1 rounded-full uppercase tracking-wider">{w.region}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-y-4 sm:gap-y-6">
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Beans</div>
                      <div className="text-base sm:text-xl font-black text-slate-800">{w.beans}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Gift Beans</div>
                      <div className="text-base sm:text-xl font-black text-slate-800">{w.gift}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Bonus</div>
                      <div className="text-base sm:text-xl font-black text-slate-800">{w.bonus}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Loan Status</div>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full inline-block mt-1 ${
                        w.loanStatus === 'Active' ? 'bg-green-100 text-green-700' :
                        w.loanStatus === 'Approved' ? 'bg-blue-100 text-blue-700' :
                        w.loanStatus === 'Pending' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-500'
                      }`}>{w.loanStatus}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'wallet_send':
        return (
          <div className="space-y-4 sm:space-y-6 max-w-2xl">
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4 sm:space-y-6">
              <div>
                <h4 className="font-extrabold text-slate-800 flex items-center gap-2 text-base sm:text-lg"><Send className="w-4 h-4 sm:w-5 sm:h-5 text-[#E51E25]" /> Send Coin</h4>
                <p className="text-[10px] sm:text-xs text-slate-500 mt-1">Send beans directly to an agent's wallet from the platform reserve.</p>
              </div>
              <form onSubmit={e => { e.preventDefault(); setSendCoinForm({ agentId: 1, amount: '', note: '' }); alert('Coins Sent successfully!'); }} className="space-y-4 sm:space-y-5">
                <div>
                  <label className="block text-[10px] sm:text-xs font-bold text-slate-600 mb-2">Recipient agent</label>
                  <select 
                    value={sendCoinForm.agentId} 
                    onChange={e=>setSendCoinForm({...sendCoinForm, agentId: Number(e.target.value)})}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                  >
                    {agentWallets.map(a => <option key={a.id} value={a.id}>{a.name} — {a.agency}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-bold text-slate-600 mb-2">Amount (beans)</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 500" 
                    required
                    value={sendCoinForm.amount}
                    onChange={e=>setSendCoinForm({...sendCoinForm, amount: e.target.value})}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-bold text-slate-600 mb-2">Note (optional)</label>
                  <textarea 
                    rows="3" 
                    placeholder="Reason for this transfer..." 
                    value={sendCoinForm.note}
                    onChange={e=>setSendCoinForm({...sendCoinForm, note: e.target.value})}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30 resize-none" 
                  />
                </div>
                <div className="pt-2">
                  <button type="submit" className="w-full bg-[#E51E25] hover:bg-[#c4161c] text-white py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-bold shadow-sm active:scale-[0.98] transition-all flex justify-center items-center gap-2">
                    <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Send Coin
                  </button>
                </div>
              </form>
            </div>
          </div>
        )



      case 'wallet_loans':
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
              <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-green-50 flex items-center justify-center mb-2 sm:mb-4">
                  <Banknote className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                </div>
                <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wide">Active Loans</div>
                <div className="text-2xl sm:text-3xl font-black text-slate-800 mt-1">{loans.filter(l=>l.status==='Active').length}</div>
                <div className="text-[10px] sm:text-xs font-semibold text-green-600 mt-1">currently active</div>
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-amber-50 flex items-center justify-center mb-2 sm:mb-4">
                  <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500" />
                </div>
                <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wide">Pending Review</div>
                <div className="text-2xl sm:text-3xl font-black text-slate-800 mt-1">{loans.filter(l=>l.status==='Pending').length}</div>
                <div className="text-[10px] sm:text-xs font-semibold text-green-600 mt-1">awaiting decision</div>
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-red-50 flex items-center justify-center mb-2 sm:mb-4">
                  <span className="font-extrabold text-[#E51E25] text-base sm:text-lg">$</span>
                </div>
                <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wide">Outstanding</div>
                <div className="text-2xl sm:text-3xl font-black text-slate-800 mt-1">${loans.filter(l=>l.status!=='Pending').reduce((a,c)=>a+c.amount,0).toLocaleString(undefined,{minimumFractionDigits:2})}</div>
                <div className="text-[10px] sm:text-xs font-semibold text-green-600 mt-1">active + approved</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h4 className="font-extrabold text-slate-800 text-base sm:text-lg">Loan Management</h4>
                  <p className="text-[10px] sm:text-xs text-slate-500 mt-1">Track loan requests and outstanding balances for each agent.</p>
                </div>
                <select className="bg-white border border-slate-200 rounded-xl px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold focus:outline-none text-slate-700">
                  <option>All</option>
                  <option>Active</option>
                  <option>Pending</option>
                </select>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-slate-400 font-bold text-[10px] sm:text-xs uppercase">
                    <tr><th className="p-2 sm:p-4">Loan ID</th><th className="p-2 sm:p-4">Agent</th><th className="p-2 sm:p-4">Amount</th><th className="p-2 sm:p-4">Tenor</th><th className="p-2 sm:p-4">Status</th><th className="p-2 sm:p-4">Disbursed On</th><th className="p-2 sm:p-4 text-center">Action</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {loans.map(l => (
                      <tr key={l.id} className="hover:bg-slate-50/50">
                        <td className="p-2 sm:p-4 font-mono font-bold text-[#E51E25] text-xs">{l.id}</td>
                        <td className="p-2 sm:p-4 font-bold text-slate-800 text-xs sm:text-sm">{l.agent}</td>
                        <td className="p-2 sm:p-4 font-mono font-bold text-xs sm:text-sm">${l.amount.toLocaleString()}</td>
                        <td className="p-2 sm:p-4 text-slate-600 text-xs sm:text-sm">{l.tenor}</td>
                        <td className="p-2 sm:p-4">
                          <span className={`text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-1 rounded-full ${
                            l.status === 'Active' ? 'bg-green-100 text-green-700' :
                            l.status === 'Approved' ? 'bg-blue-100 text-blue-700' :
                            l.status === 'Pending' ? 'bg-amber-100 text-amber-700' : ''
                          }`}>{l.status}</span>
                        </td>
                        <td className="p-4 text-slate-500">{l.disbursed}</td>
                        <td className="p-4 text-center"><button className="text-xs font-bold text-[#E51E25] hover:underline">Review</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )

      case 'dashboard':
        return (
          <Dashboard
            rechargeHistory={rechargeHistory}
            customRechargeRequests={customRechargeRequests}
            agencyWallet={agencyWallet}
            setActiveSideTab={setActiveSideTab}
          />
        )

      case 'billing':
        return (
          <Billing
            billingInvoices={billingInvoices}
            setBillingInvoices={setBillingInvoices}
            packages={packages}
            setPackages={setPackages}
            defaultPackages={defaultPackages}
            packagesLoading={packagesLoading}
            setPackagesLoading={setPackagesLoading}
            agencyWallet={agencyWallet}
            activePackages={activePackages}
            setSelectedInvoice={setSelectedInvoice}
            setShowInvoiceModal={setShowInvoiceModal}
            selectedInvoice={selectedInvoice}
            showInvoiceModal={showInvoiceModal}
          />
        )

      case 'pkg_all':
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="font-extrabold text-slate-800 text-base sm:text-lg flex items-center gap-2"><Gem className="w-4 h-4 sm:w-5 sm:h-5 text-[#E51E25]" /> All Packages</h4>
              <p className="text-[10px] sm:text-xs text-slate-500 mt-1">Manage all diamond packages available for users.</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-slate-400 font-bold text-[10px] sm:text-xs uppercase">
                    <tr>
                      <th className="p-3 sm:p-4">Package Name</th>
                    <th className="p-3 sm:p-4">Coins</th>
                    <th className="p-3 sm:p-4">Price</th>
                    <th className="p-3 sm:p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {packages.map((pkg, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-3 sm:p-4 font-semibold text-slate-800">{pkg.name}</td>
                      <td className="p-3 sm:p-4 font-mono">{pkg.coins.toLocaleString()}</td>
                      <td className="p-3 sm:p-4 font-mono">{pkg.price}</td>
                      <td className="p-3 sm:p-4">
                        <span className={`px-2 py-1 rounded-lg text-[10px] sm:text-xs font-bold ${pkg.active ? 'bg-green-50 text-green-600' : 'bg-slate-50 text-slate-500'}`}>
                          {pkg.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>
          </div>
        )

      case 'platform':
        return (
          <div className="space-y-4 sm:space-y-6">
            {/* Connection Status */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-4 sm:mb-5">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Activity className={`w-4 h-4 sm:w-5 sm:h-5 ${isApiConnected ? 'text-green-500 animate-pulse' : 'text-red-500'}`} />
                  <span className="font-extrabold text-slate-800 text-sm sm:text-base">Gateway Status</span>
                </div>
                <span className={`px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold ${isApiConnected ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                  {isApiConnected ? '● Connected' : '● Disconnected'}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={() => {
                    setIsApiConnected(!isApiConnected)
                    setWebhookLogs([{
                      time: new Date().toTimeString().split(' ')[0],
                      event: isApiConnected ? 'Gateway Disconnected' : 'Gateway Connected',
                      source: 'Diamond Portal',
                      status: isApiConnected ? '400 Terminated' : '200 Connected'
                    }, ...webhookLogs])
                  }}
                  className="bg-[#E51E25] hover:bg-[#c4161c] text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-sm active:scale-95 transition-all flex items-center gap-2"
                >
                  {isApiConnected ? <XCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                  {isApiConnected ? 'Disconnect' : 'Connect'}
                </button>
                <button
                  onClick={() => {
                    setWebhookLogs([{
                      time: new Date().toTimeString().split(' ')[0],
                      event: 'Diagnostic Ping',
                      source: 'Diamond Portal',
                      status: isApiConnected ? '200 OK (6ms)' : '503 Unreachable'
                    }, ...webhookLogs])
                  }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-sm active:scale-95 transition-all flex items-center gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Ping
                </button>
                <button
                  onClick={() => setWebhookLogs([])}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-sm active:scale-95 transition-all flex items-center gap-2 sm:ml-auto"
                >
                  <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Clear Logs
                </button>
              </div>
            </div>

            {/* Logs */}
            <div className="bg-white border border-slate-100 shadow-sm p-3 sm:p-5 rounded-2xl font-mono text-[10px] sm:text-xs text-slate-700 space-y-2 max-h-56 overflow-y-auto">
              {webhookLogs.map((log, idx) => (
                <div key={idx} className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-400 font-bold">[{log.time}]</span>
                  <span className="flex-1 mx-2 sm:mx-3 font-semibold text-[10px] sm:text-xs">{log.event} — {log.source}</span>
                  <span className={`font-bold ${log.status.includes('OK') || log.status.includes('Connected') ? 'text-green-600' : 'text-[#E51E25]'}`}>{log.status}</span>
                </div>
              ))}
            </div>
          </div>
        )

      case 'create':
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-start gap-3 sm:gap-4 bg-gradient-to-r from-red-50 to-orange-50 p-4 sm:p-6 rounded-2xl border border-red-100">
              <Building2 className="w-8 h-8 sm:w-10 sm:h-10 text-[#E51E25] shrink-0 mt-1" />
              <div>
                <h4 className="text-base sm:text-lg font-extrabold text-slate-800">Register New Sub-Agency</h4>
                <p className="text-slate-500 text-[10px] sm:text-sm mt-1">Agencies registered here inherit your regional commission policies automatically.</p>
              </div>
            </div>
            <form onSubmit={handleCreateAgency} className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Agency Brand Name</label>
                <input type="text" required value={newAgencyName} onChange={(e) => setNewAgencyName(e.target.value)} placeholder="e.g. Omega Stream Team" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-400 transition-all" />
              </div>
              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Representative Head</label>
                <input type="text" required value={newAgencyHead} onChange={(e) => setNewAgencyHead(e.target.value)} placeholder="e.g. Ramesh Adhikari" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-400 transition-all" />
              </div>
              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Territory</label>
                <select value={newAgencyRegion} onChange={(e) => setNewAgencyRegion(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-400 transition-all">
                  <option>Nepal</option><option>India</option><option>Global</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Initial Coin Quota</label>
                <input type="number" value={initialCoins} onChange={(e) => setInitialCoins(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-400 transition-all" />
              </div>
              <div className="md:col-span-2 flex justify-end pt-2">
                <button type="submit" className="bg-[#E51E25] hover:bg-[#c4161c] text-white px-6 sm:px-8 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-sm active:scale-95 transition-all flex items-center gap-2">
                  <PlusCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Launch Agency
                </button>
              </div>
            </form>
          </div>
        )

      case 'manage':
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
              <div className="p-4 sm:p-5 border-b border-slate-100 flex justify-between items-center">
                <h4 className="font-extrabold text-slate-800 text-base sm:text-lg flex items-center gap-2"><Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#E51E25]" /> Network Agencies</h4>
                <span className="text-[10px] sm:text-xs bg-red-50 text-[#E51E25] font-bold px-2 sm:px-3 py-1 rounded-full">{subAgencies.length} Total</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-slate-400 font-bold text-[10px] sm:text-xs uppercase">
                    <tr>
                      <th className="p-2 sm:p-4">ID</th><th className="p-2 sm:p-4">Agency</th><th className="p-2 sm:p-4">Head</th>
                      <th className="p-2 sm:p-4 text-center">Region</th><th className="p-2 sm:p-4 text-right">E-Rupee Coins</th><th className="p-2 sm:p-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {subAgencies.map((a) => (
                      <tr key={a.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-2 sm:p-4 font-mono font-bold text-slate-700 text-xs">{a.id}</td>
                        <td className="p-2 sm:p-4 font-semibold text-slate-800 text-xs sm:text-sm">{a.name}</td>
                        <td className="p-2 sm:p-4 text-slate-500 text-xs sm:text-sm">{a.head}</td>
                        <td className="p-2 sm:p-4 text-center"><span className="text-[10px] sm:text-xs bg-slate-100 px-2 py-0.5 rounded-full font-bold text-slate-600">{a.region}</span></td>
                        <td className="p-2 sm:p-4 text-right font-mono font-bold text-[#E51E25] text-xs sm:text-sm">{a.coins.toLocaleString()}</td>
                        <td className="p-2 sm:p-4 text-center">
                          <button onClick={() => toggleAgencyStatus(a.id)} className={`text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-1 sm:py-1.5 rounded-lg active:scale-95 transition-all ${a.status === 'Active' ? 'bg-red-50 text-[#E51E25] hover:bg-red-100' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}>
                            {a.status === 'Active' ? 'Suspend' : 'Activate'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )

      case 'distribution':
        return (
          <div className="space-y-4 sm:space-y-6">
            <form onSubmit={handleDistribute} className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="font-extrabold text-slate-800 text-base sm:text-lg flex items-center gap-2 mb-4 sm:mb-5"><Send className="w-4 h-4 sm:w-5 sm:h-5 text-[#E51E25]" /> Distribute Assets</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[10px] sm:text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Agency</label>
                  <select value={distTarget} onChange={(e) => setDistTarget(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30">
                    {subAgencies.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Asset</label>
                  <select value={distAsset} onChange={(e) => setDistAsset(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30">
                    <option>E-Rupee Coins</option><option>Blue Diamonds</option><option>Green Diamonds</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Quantity</label>
                  <input type="number" value={distAmount} onChange={(e) => setDistAmount(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30" />
                </div>
                <div className="flex items-end">
                  <button type="submit" className="w-full bg-[#E51E25] hover:bg-[#c4161c] text-white py-2 sm:py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2">
                    <Gem className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Transfer
                  </button>
                </div>
              </div>
            </form>
            {/* Ledger */}
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
              <div className="p-4 sm:p-5 border-b border-slate-100">
                <h4 className="font-extrabold text-slate-800 text-sm sm:text-base flex items-center gap-2"><Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" /> Transfer Audit Ledger</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-slate-400 font-bold text-[10px] sm:text-xs uppercase">
                    <tr><th className="p-2 sm:p-4">Timestamp</th><th className="p-2 sm:p-4">Recipient</th><th className="p-2 sm:p-4 text-right">Volume</th><th className="p-2 sm:p-4 text-center">Status</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {distributionLedger.map((log, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="p-2 sm:p-4 font-mono text-[10px] sm:text-xs text-slate-500">{log.date}</td>
                        <td className="p-2 sm:p-4 font-semibold text-slate-800 text-xs sm:text-sm">{log.target}</td>
                        <td className="p-2 sm:p-4 text-right font-mono font-bold text-[#E51E25] text-xs sm:text-sm">{log.amount}</td>
                        <td className="p-2 sm:p-4 text-center"><span className="bg-green-50 text-green-600 text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 w-fit mx-auto"><CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />{log.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )

      case 'expansion':
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-start gap-3 sm:gap-4 bg-gradient-to-r from-red-50 to-orange-50 p-4 sm:p-6 rounded-2xl border border-red-100">
              <Globe className="w-8 h-8 sm:w-10 sm:h-10 text-[#E51E25] shrink-0 mt-1" />
              <div>
                <h4 className="text-base sm:text-lg font-extrabold text-slate-800">Network Expansion Hub</h4>
                <p className="text-slate-500 text-[10px] sm:text-sm mt-1">Monitor agency density, host acquisition, and territorial expansion analytics.</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E51E25]" />
                <select value={selectedExpansionRegion} onChange={(e) => setSelectedExpansionRegion(e.target.value)} className="bg-white border border-slate-200 rounded-xl pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 text-[10px] sm:text-xs font-bold focus:outline-none appearance-none cursor-pointer">
                  <option>All Regions</option><option>Nepal</option><option>India</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
              {[
                { label: 'Sub-Agencies', value: '142', icon: Building2, color: 'text-[#E51E25]' },
                { label: 'Hosts Recruited', value: '850', icon: Users, color: 'text-[#E51E25]' },
                { label: 'M-o-M Growth', value: '+15%', icon: TrendingUp, color: 'text-green-600' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-50 rounded-xl flex items-center justify-center">
                    <item.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${item.color}`} />
                  </div>
                  <div>
                    <div className={`text-lg sm:text-2xl font-black ${item.color}`}>{item.value}</div>
                    <div className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider">{item.label}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="font-extrabold text-slate-800 text-sm sm:text-base mb-4 flex items-center gap-2"><MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E51E25]" /> Regional Density</h4>
              <div className="space-y-3 sm:space-y-4">
                {[{ region: 'Nepal', agencies: 85, hosts: 420 }, { region: 'India', agencies: 52, hosts: 380 }, { region: 'Global', agencies: 5, hosts: 50 }].map((r, idx) => (
                  <div key={idx} className="flex items-center gap-2 sm:gap-4">
                    <span className="w-14 sm:w-16 text-xs sm:text-sm font-bold text-slate-600">{r.region}</span>
                    <div className="flex-1 bg-slate-100 h-2 sm:h-3 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-[#E51E25] to-orange-400 h-full rounded-full" style={{ width: `${(r.agencies / 85) * 100}%` }}></div>
                    </div>
                    <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-500 w-20 sm:w-24 text-right">{r.agencies} agencies</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'revenue': {
        const revenueData = [
          { label: 'Diamond Packages', value: 1240000, color: '#E51E25', pct: 42 },
          { label: 'Commission Fees', value: 740000, color: '#f97316', pct: 25 },
          { label: 'Agency Subscriptions', value: 590000, color: '#eab308', pct: 20 },
          { label: 'Bonus Pool Deductions', value: 295000, color: '#3b82f6', pct: 10 },
          { label: 'Other Income', value: 88500, color: '#22c55e', pct: 3 },
        ]
        const total = revenueData.reduce((s, d) => s + d.value, 0)

        // SVG Pie Chart
        let cumulative = 0
        const radius = 80
        const cx = 100
        const cy = 100
        const slices = revenueData.map((d) => {
          const startAngle = (cumulative / 100) * 2 * Math.PI - Math.PI / 2
          cumulative += d.pct
          const endAngle = (cumulative / 100) * 2 * Math.PI - Math.PI / 2
          const x1 = cx + radius * Math.cos(startAngle)
          const y1 = cy + radius * Math.sin(startAngle)
          const x2 = cx + radius * Math.cos(endAngle)
          const y2 = cy + radius * Math.sin(endAngle)
          const largeArc = d.pct > 50 ? 1 : 0
          return { ...d, d: `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z` }
        })

        return (
          <div className="space-y-4 sm:space-y-6">
            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
              {[
                { label: 'Total Revenue', value: '₹ 29.5L', sub: 'All time', icon: Banknote, color: 'text-[#E51E25]' },
                { label: 'This Month', value: '₹ 3.8L', sub: '+22% vs last month', icon: TrendingUp, color: 'text-green-600' },
                { label: 'Avg per Agency', value: '₹ 26.7K', sub: 'Monthly average', icon: BarChart3, color: 'text-blue-500' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-50 rounded-xl flex items-center justify-center"><item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#E51E25]" /></div>
                    <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">{item.label}</span>
                  </div>
                  <div className={`text-lg sm:text-2xl font-black ${item.color}`}>{item.value}</div>
                  <div className="text-[10px] sm:text-xs text-green-600 font-bold mt-1">{item.sub}</div>
                </div>
              ))}
            </div>

            {/* Pie Chart + Legend */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="font-extrabold text-slate-800 text-sm sm:text-base mb-4 sm:mb-6 flex items-center gap-2"><BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-[#E51E25]" /> Revenue Breakdown</h4>
              <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-8">
                {/* SVG Pie */}
                <div className="shrink-0">
                  <svg viewBox="0 0 200 200" width="160" height="160" className="w-40 h-40 sm:w-[200px] sm:h-[200px]">
                    {slices.map((slice, i) => (
                      <path key={i} d={slice.d} fill={slice.color} className="hover:opacity-80 transition-opacity cursor-pointer" stroke="white" strokeWidth="2" />
                    ))}
                    <circle cx={cx} cy={cy} r="45" fill="white" />
                    <text x={cx} y={cy - 6} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">Total</text>
                    <text x={cx} y={cy + 10} textAnchor="middle" fontSize="10" fill="#64748b">₹29.5L</text>
                  </svg>
                </div>
                {/* Legend */}
                <div className="flex-1 w-full space-y-2 sm:space-y-3">
                  {revenueData.map((d, i) => (
                    <div key={i} className="flex items-center justify-between gap-2 sm:gap-4">
                      <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                        <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shrink-0" style={{ backgroundColor: d.color }}></span>
                        <span className="text-xs sm:text-sm font-semibold text-slate-700 truncate">{d.label}</span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                        <div className="w-16 sm:w-24 bg-slate-100 h-1.5 sm:h-2 rounded-full overflow-hidden hidden sm:block">
                          <div className="h-full rounded-full" style={{ width: `${d.pct}%`, backgroundColor: d.color }}></div>
                        </div>
                        <span className="text-[10px] sm:text-xs font-bold text-slate-500 w-6 sm:w-8 text-right">{d.pct}%</span>
                        <span className="text-xs sm:text-sm font-extrabold text-slate-800 w-16 sm:w-24 text-right font-mono">₹{(d.value / 100000).toFixed(1)}L</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Monthly Bar Chart */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="font-extrabold text-slate-800 text-sm sm:text-base mb-4 sm:mb-6">Monthly Revenue Trend</h4>
              <div className="h-36 sm:h-48 flex items-end justify-between gap-1 sm:gap-2">
                {[{ m: 'Jan', v: 45 }, { m: 'Feb', v: 62 }, { m: 'Mar', v: 55 }, { m: 'Apr', v: 80 }, { m: 'May', v: 75 }, { m: 'Jun', v: 95 }, { m: 'Jul', v: 110 }, { m: 'Aug', v: 85 }, { m: 'Sep', v: 100 }].map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1 sm:gap-1.5 h-full justify-end">
                    <div className="text-[9px] sm:text-[10px] font-mono font-bold text-slate-400">{item.v}K</div>
                    <div className="bg-gradient-to-t from-[#E51E25] to-red-400 rounded-t-lg w-full hover:brightness-110 transition-all cursor-pointer" style={{ height: `${item.v}%` }}></div>
                    <span className="text-[8px] sm:text-[9px] font-bold text-slate-400">{item.m}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue Data List */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-slate-100">
                <h4 className="font-extrabold text-slate-800 text-sm sm:text-base flex items-center gap-2"><FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E51E25]" /> Revenue Source Breakdown</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-slate-400 font-bold text-[10px] sm:text-xs uppercase">
                    <tr><th className="p-2 sm:p-4">Source</th><th className="p-2 sm:p-4 text-right">Amount</th><th className="p-2 sm:p-4 text-right">Share</th><th className="p-2 sm:p-4 text-right">vs Last Month</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { source: 'Diamond Packages', amount: '₹12.4L', share: '42%', change: '+18%', up: true },
                      { source: 'Commission Fees', amount: '₹7.4L', share: '25%', change: '+5%', up: true },
                      { source: 'Agency Subscriptions', amount: '₹5.9L', share: '20%', change: '-2%', up: false },
                      { source: 'Bonus Pool Deductions', amount: '₹2.9L', share: '10%', change: '+11%', up: true },
                      { source: 'Other Income', amount: '₹0.88L', share: '3%', change: '0%', up: true },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-2 sm:p-4 font-semibold text-slate-800 text-xs sm:text-sm">{row.source}</td>
                        <td className="p-2 sm:p-4 text-right font-mono font-bold text-slate-700 text-xs sm:text-sm">{row.amount}</td>
                        <td className="p-2 sm:p-4 text-right font-bold text-slate-500 text-xs sm:text-sm">{row.share}</td>
                        <td className={`p-2 sm:p-4 text-right font-bold text-[10px] sm:text-xs ${row.up ? 'text-green-600' : 'text-[#E51E25]'}`}>{row.change}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-slate-50">
                    <tr>
                      <td className="p-2 sm:p-4 font-extrabold text-slate-800 text-xs sm:text-sm">Total</td>
                      <td className="p-2 sm:p-4 text-right font-extrabold font-mono text-[#E51E25] text-xs sm:text-sm">₹29.5L</td>
                      <td className="p-2 sm:p-4 text-right font-extrabold text-slate-800 text-xs sm:text-sm">100%</td>
                      <td className="p-2 sm:p-4 text-right font-extrabold text-green-600 text-xs sm:text-sm">+9.2%</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        )
      }

      case 'performance': {
        const perfData = [
          { label: 'On Target (≥80%)', color: '#22c55e', pct: 40 },
          { label: 'Near Target (50–79%)', color: '#f59e0b', pct: 35 },
          { label: 'Below Target (<50%)', color: '#E51E25', pct: 25 },
        ]
        let cumPerf = 0
        const perfSlices = perfData.map((d) => {
          const startAngle = (cumPerf / 100) * 2 * Math.PI - Math.PI / 2
          cumPerf += d.pct
          const endAngle = (cumPerf / 100) * 2 * Math.PI - Math.PI / 2
          const r = 80, cx = 100, cy = 100
          const x1 = cx + r * Math.cos(startAngle), y1 = cy + r * Math.sin(startAngle)
          const x2 = cx + r * Math.cos(endAngle), y2 = cy + r * Math.sin(endAngle)
          return { ...d, d: `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${d.pct > 50 ? 1 : 0} 1 ${x2} ${y2} Z` }
        })

        return (
          <div className="space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="flex items-start gap-3 sm:gap-4 bg-gradient-to-r from-red-50 to-orange-50 p-4 sm:p-5 rounded-2xl border border-red-100">
              <BarChart3 className="w-8 h-8 sm:w-9 sm:h-9 text-[#E51E25] shrink-0 mt-1" />
              <div>
                <h4 className="text-base sm:text-lg font-extrabold text-slate-800">Performance Metrics</h4>
                <p className="text-slate-500 text-[10px] sm:text-sm mt-0.5">eRupai Diamond Agency Protocol</p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {[
                { label: 'Total Agencies', value: subAgencies.length, icon: Building2, color: 'text-[#E51E25]', bg: 'bg-red-50' },
                { label: 'On Target', value: subAgencies.filter(a => Math.floor((a.coins / 180000) * 100) >= 80).length, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
                { label: 'Avg Score', value: `${Math.floor(subAgencies.reduce((s, a) => s + Math.min(100, (a.coins / 180000) * 100), 0) / subAgencies.length)}%`, icon: Target, color: 'text-amber-500', bg: 'bg-amber-50' },
                { label: 'Top Coins', value: `${Math.max(...subAgencies.map(a => a.coins)).toLocaleString()}`, icon: Gem, color: 'text-blue-500', bg: 'bg-blue-50' },
              ].map((s, i) => (
                <div key={i} className="bg-white p-3 sm:p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-2 sm:gap-4">
                  <div className={`w-8 h-8 sm:w-11 sm:h-11 ${s.bg} rounded-xl flex items-center justify-center shrink-0`}>
                    <s.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${s.color}`} />
                  </div>
                  <div>
                    <div className={`text-base sm:text-xl font-black ${s.color}`}>{s.value}</div>
                    <div className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wide">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pie Chart + Progress Bars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {/* Donut Pie */}
              <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h4 className="font-extrabold text-slate-800 text-sm sm:text-base mb-4 sm:mb-5 flex items-center gap-2"><Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E51E25]" /> Performance Distribution</h4>
                <div className="flex items-center gap-4 sm:gap-6">
                  <svg viewBox="0 0 200 200" width="140" height="140" className="shrink-0 w-36 h-36 sm:w-[160px] sm:h-[160px]">
                    {perfSlices.map((s, i) => (
                      <path key={i} d={s.d} fill={s.color} stroke="white" strokeWidth="2" className="hover:opacity-80 transition-opacity" />
                    ))}
                    <circle cx="100" cy="100" r="50" fill="white" />
                    <text x="100" y="96" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1e293b">Agencies</text>
                    <text x="100" y="112" textAnchor="middle" fontSize="10" fill="#64748b">{subAgencies.length} Total</text>
                  </svg>
                  <div className="space-y-2 sm:space-y-3 flex-1">
                    {perfData.map((d, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }}></span>
                            <span className="text-[10px] sm:text-xs font-semibold text-slate-600">{d.label}</span>
                          </div>
                          <span className="text-[10px] sm:text-xs font-extrabold" style={{ color: d.color }}>{d.pct}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1 sm:h-1.5 rounded-full">
                          <div className="h-full rounded-full" style={{ width: `${d.pct}%`, backgroundColor: d.color }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Monthly Trend Bar */}
              <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h4 className="font-extrabold text-slate-800 text-sm sm:text-base mb-4 sm:mb-5 flex items-center gap-2"><TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E51E25]" /> Monthly Coin Volume</h4>
                <div className="h-32 sm:h-40 flex items-end justify-between gap-1 sm:gap-1.5">
                  {[{ m: 'Jan', v: 55 }, { m: 'Feb', v: 70 }, { m: 'Mar', v: 60 }, { m: 'Apr', v: 85 }, { m: 'May', v: 78 }, { m: 'Jun', v: 92 }, { m: 'Jul', v: 100 }].map((item, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                      <div className="text-[8px] sm:text-[9px] font-mono font-bold text-slate-400">{item.v}K</div>
                      <div className="w-full rounded-t-lg hover:brightness-110 transition-all" style={{ height: `${item.v}%`, background: `linear-gradient(to top, #E51E25, #f97316)` }}></div>
                      <span className="text-[8px] sm:text-[9px] font-bold text-slate-400">{item.m}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Agency Progress Bars */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-6">
              <h4 className="font-extrabold text-slate-800 text-base sm:text-lg flex items-center gap-2 mb-4 sm:mb-6"><BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-[#E51E25]" /> Agency Target Performance</h4>
              <div className="space-y-3 sm:space-y-5">
                {subAgencies.map((agency) => {
                  const pct = Math.min(100, Math.floor((agency.coins / 180000) * 100))
                  return (
                    <div key={agency.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${agency.status === 'Active' ? 'bg-green-500' : 'bg-red-400'}`}></span>
                          <span className="text-xs sm:text-sm font-extrabold text-slate-800">{agency.name}</span>
                          <span className="text-[9px] sm:text-[10px] font-mono text-slate-400">{agency.id}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full ${pct >= 80 ? 'bg-green-50 text-green-600' : pct >= 50 ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-[#E51E25]'}`}>
                            {pct >= 80 ? 'On Target' : pct >= 50 ? 'Near Target' : 'Below Target'}
                          </span>
                          <span className="text-xs sm:text-sm font-black text-[#E51E25] font-mono">{pct}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-slate-100 h-2 sm:h-3 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all duration-700 ${pct >= 80 ? 'bg-green-500' : pct >= 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Detailed Data Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-slate-100">
                <h4 className="font-extrabold text-slate-800 text-sm sm:text-base flex items-center gap-2"><FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E51E25]" /> Agency Performance Summary</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-slate-400 font-bold text-[10px] sm:text-xs uppercase">
                    <tr>
                      <th className="p-2 sm:p-4">Agency</th>
                      <th className="p-2 sm:p-4">Head</th>
                      <th className="p-2 sm:p-4 text-right">Coins</th>
                      <th className="p-2 sm:p-4 text-center">Score</th>
                      <th className="p-2 sm:p-4 text-center">Status</th>
                      <th className="p-2 sm:p-4 text-center">Rating</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {subAgencies.map((a) => {
                      const pct = Math.min(100, Math.floor((a.coins / 180000) * 100))
                      const rating = pct >= 80 ? '⭐⭐⭐' : pct >= 50 ? '⭐⭐' : '⭐'
                      return (
                        <tr key={a.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-2 sm:p-4 font-semibold text-slate-800 text-xs sm:text-sm">{a.name}</td>
                          <td className="p-2 sm:p-4 text-slate-500 text-xs sm:text-sm">{a.head}</td>
                          <td className="p-2 sm:p-4 text-right font-mono font-bold text-[#E51E25] text-xs sm:text-sm">{a.coins.toLocaleString()}</td>
                          <td className="p-2 sm:p-4 text-center">
                            <span className={`font-extrabold text-xs sm:text-sm ${pct >= 80 ? 'text-green-600' : pct >= 50 ? 'text-amber-500' : 'text-[#E51E25]'}`}>{pct}%</span>
                          </td>
                          <td className="p-2 sm:p-4 text-center">
                            <span className={`px-2 sm:px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold ${a.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-[#E51E25]'}`}>{a.status}</span>
                          </td>
                          <td className="p-2 sm:p-4 text-center text-xs sm:text-sm">{rating}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )
      }

      case 'commission': {
        const totalPaid = commissionHistory.filter(c => c.status === 'Paid').reduce((s, c) => s + c.beans, 0)
        const totalPending = commissionHistory.filter(c => c.status === 'Pending').reduce((s, c) => s + c.beans, 0)
        return (
          <div className="space-y-4 sm:space-y-6">
            {/* Header Banner */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4 sm:p-8 rounded-2xl shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 sm:gap-3 mb-1">
                    <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
                    <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Commission Payouts</span>
                  </div>
                  <div className="text-2xl sm:text-4xl font-black font-mono mt-2">{availableCommission.toLocaleString()} <span className="text-sm sm:text-lg font-bold text-slate-400">Beans</span></div>
                  <div className="text-[10px] sm:text-xs text-slate-400 font-semibold mt-1">eRupai Diamond Agency Protocol</div>
                </div>
                <div className="flex gap-3 sm:gap-4">
                  <div className="text-center">
                    <div className="text-lg sm:text-xl font-black text-green-400">{totalPaid.toLocaleString()}</div>
                    <div className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase">Total Paid</div>
                  </div>
                  <div className="w-px bg-slate-700"></div>
                  <div className="text-center">
                    <div className="text-lg sm:text-xl font-black text-amber-400">{totalPending.toLocaleString()}</div>
                    <div className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase">Pending</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {[
                { label: 'Total Payouts', value: commissionHistory.length, icon: FileText, color: 'text-[#E51E25]', bg: 'bg-red-50' },
                { label: 'Paid', value: commissionHistory.filter(c => c.status === 'Paid').length, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
                { label: 'Pending', value: commissionHistory.filter(c => c.status === 'Pending').length, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
                { label: 'Processing', value: commissionHistory.filter(c => c.status === 'Processing').length, icon: RefreshCw, color: 'text-blue-500', bg: 'bg-blue-50' },
              ].map((s, i) => (
                <div key={i} className="bg-white p-3 sm:p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-2 sm:gap-4">
                  <div className={`w-8 h-8 sm:w-11 sm:h-11 ${s.bg} rounded-xl flex items-center justify-center shrink-0`}>
                    <s.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${s.color}`} />
                  </div>
                  <div>
                    <div className={`text-base sm:text-xl font-black ${s.color}`}>{s.value}</div>
                    <div className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wide">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Two column: Withdraw Form + Add Payout Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {/* Withdrawal Request */}
              <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h4 className="font-extrabold text-slate-800 text-sm sm:text-base mb-4 sm:mb-5 flex items-center gap-2"><Banknote className="w-4 h-4 sm:w-5 sm:h-5 text-[#E51E25]" /> Withdrawal Request</h4>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-[10px] sm:text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Amount (Beans)</label>
                    <input type="number" value={withdrawAmount} onChange={(e) => setWithdrawAmount(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30" />
                  </div>
                  <div className="bg-slate-50 rounded-xl p-2 sm:p-3 text-[10px] sm:text-xs text-slate-500">
                    <span className="font-bold text-slate-700">E-Rupee Equivalent: </span>
                    <span className="font-extrabold text-[#E51E25]">₹{(withdrawAmount / 100).toFixed(2)}</span>
                    <span className="ml-2 text-slate-400">(Rate: 100 Beans = ₹1)</span>
                  </div>
                  {withdrawAmount > availableCommission && (
                    <div className="p-2 sm:p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-[10px] sm:text-xs font-semibold flex items-center gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Insufficient balance
                    </div>
                  )}
                  <button
                    onClick={() => {
                      if (withdrawAmount > availableCommission) return
                      setAvailableCommission(availableCommission - withdrawAmount)
                      setCommissionHistory([{ id: `CP-${String(commissionHistory.length + 1).padStart(3,'0')}`, agency: 'Self Withdrawal', type: 'E-Rupee Conversion', beans: withdrawAmount, erupee: withdrawAmount / 100, date: new Date().toISOString().split('T')[0], status: 'Processing' }, ...commissionHistory])
                    }}
                    disabled={withdrawAmount > availableCommission}
                    className="w-full bg-[#E51E25] hover:bg-[#c4161c] disabled:opacity-50 text-white py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Wallet className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Withdraw to E-Rupee
                  </button>
                </div>
              </div>

              {/* Add Payout Form */}
              <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h4 className="font-extrabold text-slate-800 text-sm sm:text-base mb-4 sm:mb-5 flex items-center gap-2"><Send className="w-4 h-4 sm:w-5 sm:h-5 text-[#E51E25]" /> Add Commission Payout</h4>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-[10px] sm:text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Agency</label>
                    <select value={payoutForm.agency} onChange={(e) => setPayoutForm({...payoutForm, agency: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30">
                      {subAgencies.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] sm:text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Payout Type</label>
                    <select value={payoutForm.type} onChange={(e) => setPayoutForm({...payoutForm, type: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30">
                      <option>Monthly Payout</option>
                      <option>Bonus Commission</option>
                      <option>Performance Bonus</option>
                      <option>Referral Bonus</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] sm:text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Beans Amount</label>
                    <input type="number" placeholder="e.g. 50000" value={payoutForm.beans} onChange={(e) => setPayoutForm({...payoutForm, beans: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30" />
                  </div>
                  <button
                    onClick={() => {
                      if (!payoutForm.beans) return
                      const agency = subAgencies.find(a => a.id === payoutForm.agency)
                      const beans = Number(payoutForm.beans)
                      setCommissionHistory([{ id: `CP-${String(commissionHistory.length + 1).padStart(3,'0')}`, agency: agency?.name || '', type: payoutForm.type, beans, erupee: beans / 100, date: new Date().toISOString().split('T')[0], status: 'Pending' }, ...commissionHistory])
                      setPayoutForm({...payoutForm, beans: ''})
                    }}
                    className="w-full bg-[#E51E25] hover:bg-[#c4161c] text-white py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Add Payout
                  </button>
                </div>
              </div>
            </div>

            {/* Per-Agency Breakdown */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="font-extrabold text-slate-800 text-sm sm:text-base mb-4 sm:mb-5 flex items-center gap-2"><BarChart3 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E51E25]" /> Per-Agency Commission Breakdown</h4>
              <div className="space-y-3 sm:space-y-4">
                {subAgencies.map((ag) => {
                  const agTotal = commissionHistory.filter(c => c.agency === ag.name).reduce((s, c) => s + c.beans, 0)
                  const maxBeans = Math.max(...subAgencies.map(a => commissionHistory.filter(c => c.agency === a.name).reduce((s, c) => s + c.beans, 0)), 1)
                  const pct = Math.round((agTotal / maxBeans) * 100)
                  return (
                    <div key={ag.id} className="flex items-center gap-2 sm:gap-4">
                      <div className="w-24 sm:w-32 shrink-0">
                        <div className="font-bold text-slate-700 text-xs sm:text-sm truncate">{ag.name}</div>
                        <div className="text-[9px] sm:text-[10px] text-slate-400 font-mono">{ag.id}</div>
                      </div>
                      <div className="flex-1 bg-slate-100 h-2 sm:h-3 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-[#E51E25] to-orange-400 transition-all duration-700" style={{ width: `${pct}%` }}></div>
                      </div>
                      <div className="w-20 sm:w-28 text-right shrink-0">
                        <span className="font-extrabold text-xs sm:text-sm text-[#E51E25] font-mono">{agTotal.toLocaleString()}</span>
                        <span className="text-[10px] sm:text-xs text-slate-400 ml-1">Beans</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Payout History List */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-slate-100 flex justify-between items-center">
                <h4 className="font-extrabold text-slate-800 text-sm sm:text-base flex items-center gap-2"><History className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E51E25]" /> Payout History</h4>
                <span className="text-[10px] sm:text-xs bg-red-50 text-[#E51E25] font-bold px-2 sm:px-2.5 py-1 rounded-full">{commissionHistory.length} Records</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-slate-400 font-bold text-[10px] sm:text-xs uppercase">
                    <tr><th className="p-2 sm:p-4">ID</th><th className="p-2 sm:p-4">Agency</th><th className="p-2 sm:p-4">Type</th><th className="p-2 sm:p-4 text-right">Beans</th><th className="p-2 sm:p-4 text-right">E-Rupee</th><th className="p-2 sm:p-4">Date</th><th className="p-2 sm:p-4 text-center">Status</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {commissionHistory.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-2 sm:p-4 font-mono text-[10px] sm:text-xs font-bold text-slate-500">{c.id}</td>
                        <td className="p-2 sm:p-4 font-semibold text-slate-800 text-xs sm:text-sm">{c.agency}</td>
                        <td className="p-2 sm:p-4 text-slate-500 text-xs sm:text-sm">{c.type}</td>
                        <td className="p-2 sm:p-4 text-right font-mono font-bold text-[#E51E25] text-xs sm:text-sm">{c.beans.toLocaleString()}</td>
                        <td className="p-2 sm:p-4 text-right font-mono font-bold text-slate-700 text-xs sm:text-sm">₹{c.erupee.toLocaleString()}</td>
                        <td className="p-2 sm:p-4 text-slate-500 font-mono text-[10px] sm:text-xs">{c.date}</td>
                        <td className="p-2 sm:p-4 text-center">
                          <span className={`px-2 sm:px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold ${
                            c.status === 'Paid' ? 'bg-green-50 text-green-600' :
                            c.status === 'Pending' ? 'bg-amber-50 text-amber-600' :
                            'bg-blue-50 text-blue-600'
                          }`}>{c.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )
      }

      case 'target':
        const targetPct = Math.min(100, Math.floor((currentSales / targetSales) * 100))
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="font-extrabold text-slate-800 text-base sm:text-lg flex items-center gap-2 mb-3 sm:mb-4"><Target className="w-4 h-4 sm:w-5 sm:h-5 text-[#E51E25]" /> Monthly Milestone Tracker</h4>
              <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-slate-500 mb-2 sm:mb-3">
                <span>Coin Target Volume</span>
                <span className="font-mono text-[#E51E25] text-xs sm:text-sm">{currentSales.toLocaleString()} / {targetSales.toLocaleString()}</span>
              </div>
              <div className="w-full bg-slate-100 h-4 sm:h-5 rounded-full overflow-hidden mb-3 sm:mb-4">
                <div className="bg-gradient-to-r from-[#E51E25] to-amber-500 h-full rounded-full transition-all duration-700" style={{ width: `${targetPct}%` }}></div>
              </div>
              <div className="text-center font-bold text-slate-700 text-xs sm:text-sm">{targetPct}% Complete — Need <span className="text-[#E51E25] font-mono">{(targetSales - currentSales).toLocaleString()}</span> more for Diamond Bonus</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {[
                { tier: 'Tier 1 (50%)', bonus: '5% Extra', reached: targetPct >= 50 },
                { tier: 'Tier 2 (80%)', bonus: '10% Extra', reached: targetPct >= 80 },
                { tier: 'Tier 3 (100%)', bonus: '20% Super', reached: targetPct >= 100 }
              ].map((t, idx) => (
                <div key={idx} className={`p-3 sm:p-4 rounded-2xl border text-center ${t.reached ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex justify-center mb-2">{t.reached ? <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" /> : <Award className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300" />}</div>
                  <div className={`text-[10px] sm:text-xs font-black ${t.reached ? 'text-green-600' : 'text-slate-400'}`}>{t.tier}</div>
                  <div className="text-[9px] sm:text-[10px] font-bold text-slate-500 mt-1">{t.bonus}</div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'users':
        return (
          <div className="space-y-4 sm:space-y-6">
            {/* Invite User Modal */}
            {showInviteModal && (
              <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-4 sm:p-8 relative">
                  <button onClick={() => { setShowInviteModal(false); setInviteForm({ name: '', email: '', role: 'Support Agent', status: 'Active' }) }} className="absolute top-4 sm:top-5 right-4 sm:right-5 text-slate-400 hover:text-slate-700 transition-colors">
                    <XCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 mb-4 sm:mb-6">Invite User</h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <label className="block text-[10px] sm:text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Full Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Ramesh Adhikari"
                        value={inviteForm.name}
                        onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] sm:text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Email</label>
                      <input
                        type="email"
                        placeholder="e.g. ramesh@erupai.com"
                        value={inviteForm.email}
                        onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] sm:text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Role</label>
                      <select
                        value={inviteForm.role}
                        onChange={(e) => setInviteForm({ ...inviteForm, role: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                      >
                        <option>Super Admin</option>
                        <option>Regional Manager</option>
                        <option>Support Agent</option>
                        <option>Finance Officer</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-2 sm:gap-3 mt-5 sm:mt-7">
                    <button
                      onClick={() => { setShowInviteModal(false); setInviteForm({ name: '', email: '', role: 'Support Agent', status: 'Active' }) }}
                      className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm active:scale-95 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (!inviteForm.name || !inviteForm.email) return
                        const newUser = {
                          id: `U-${Math.floor(1000 + Math.random() * 9000)}`,
                          name: inviteForm.name,
                          email: inviteForm.email,
                          role: inviteForm.role,
                          status: 'Active'
                        }
                        setSystemUsers([...systemUsers, newUser])
                        setShowInviteModal(false)
                        setInviteForm({ name: '', email: '', role: 'Support Agent', status: 'Active' })
                      }}
                      className="flex-1 bg-[#E51E25] hover:bg-[#c4161c] text-white py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Add User
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-slate-100 flex justify-between items-center">
                <h4 className="font-extrabold text-slate-800 text-base sm:text-lg flex items-center gap-2"><Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#E51E25]" /> System Users <span className="text-[10px] sm:text-xs bg-red-50 text-[#E51E25] font-bold px-2 sm:px-2.5 py-1 rounded-full ml-1">{systemUsers.length}</span></h4>
                <button onClick={() => setShowInviteModal(true)} className="bg-[#E51E25] hover:bg-[#c4161c] text-white px-3 sm:px-4 py-2 rounded-xl text-[10px] sm:text-xs font-bold shadow-sm active:scale-95 transition-all flex items-center gap-2">
                  <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Invite User
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-slate-400 font-bold text-[10px] sm:text-xs uppercase">
                    <tr><th className="p-2 sm:p-4">User</th><th className="p-2 sm:p-4">Role</th><th className="p-2 sm:p-4">Email</th><th className="p-2 sm:p-4 text-center">Status</th><th className="p-2 sm:p-4 text-center">Action</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {systemUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50/50">
                        <td className="p-2 sm:p-4">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-100 flex items-center justify-center text-[10px] sm:text-xs font-extrabold text-[#E51E25] shrink-0">{u.name.split(' ').map(n => n[0]).join('').slice(0,2)}</div>
                            <span className="font-semibold text-slate-800 text-xs sm:text-sm">{u.name}</span>
                          </div>
                        </td>
                        <td className="p-2 sm:p-4">
                          <span className="text-[10px] sm:text-xs font-bold bg-slate-100 text-slate-600 px-2 sm:px-2.5 py-1 rounded-lg">{u.role}</span>
                        </td>
                        <td className="p-2 sm:p-4 font-mono text-slate-500 text-[10px] sm:text-xs">{u.email}</td>
                        <td className="p-2 sm:p-4 text-center">
                          <span className={`px-2 sm:px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold ${u.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-500'}`}>
                            {u.status}
                          </span>
                        </td>
                        <td className="p-2 sm:p-4 text-center">
                          <button
                            onClick={() => setSystemUsers(systemUsers.filter(x => x.id !== u.id))}
                            className="text-slate-400 hover:text-[#E51E25] transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )

      case 'history':
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-slate-100 flex justify-between items-center">
                <h4 className="font-extrabold text-slate-800 text-base sm:text-lg flex items-center gap-2"><History className="w-4 h-4 sm:w-5 sm:h-5 text-[#E51E25]" /> Activity Log</h4>
              </div>
              <div className="divide-y divide-slate-100">
                {activityHistory.map((item) => (
                  <div key={item.id} className="p-4 sm:p-5 hover:bg-slate-50 transition-colors flex items-start gap-3 sm:gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#E51E25]" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-800 text-xs sm:text-sm">{item.action}</div>
                      <div className="text-slate-500 text-xs sm:text-sm mt-0.5">{item.detail}</div>
                      <div className="text-[10px] sm:text-xs font-mono text-slate-400 mt-2">{item.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'notifications':
        return (
          <NotificationsPanel
            notifications={notifications}
            setNotifications={setNotifications}
            notificationFilter={notificationFilter}
            setNotificationFilter={setNotificationFilter}
          />
        )

      case 'settings':
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="font-extrabold text-slate-800 text-base sm:text-lg flex items-center gap-2 mb-4 sm:mb-6"><Sliders className="w-4 h-4 sm:w-5 sm:h-5 text-[#E51E25]" /> General Settings</h4>
              <div className="space-y-4 sm:space-y-5 max-w-lg">
                <div>
                  <label className="block text-[10px] sm:text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Contact Email</label>
                  <input
                    type="email"
                    value={agencySettings.email}
                    onChange={(e) => setAgencySettings({ ...agencySettings, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                  />
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Support Phone</label>
                  <input
                    type="text"
                    value={agencySettings.phone}
                    onChange={(e) => setAgencySettings({ ...agencySettings, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                  />
                </div>
                <div className="pt-3 sm:pt-4 border-t border-slate-100">
                  <h5 className="font-bold text-slate-800 text-xs sm:text-sm mb-3 sm:mb-4">Notification Preferences</h5>
                  <label className="flex items-center gap-2 sm:gap-3 mb-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agencySettings.notifyEmail}
                      onChange={(e) => setAgencySettings({ ...agencySettings, notifyEmail: e.target.checked })}
                      className="w-4 h-4 text-red-600 rounded focus:ring-red-500 cursor-pointer"
                    />
                    <span className="text-xs sm:text-sm font-semibold text-slate-600">Email Alerts</span>
                  </label>
                  <label className="flex items-center gap-2 sm:gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agencySettings.notifySms}
                      onChange={(e) => setAgencySettings({ ...agencySettings, notifySms: e.target.checked })}
                      className="w-4 h-4 text-red-600 rounded focus:ring-red-500 cursor-pointer"
                    />
                    <span className="text-xs sm:text-sm font-semibold text-slate-600">SMS Alerts</span>
                  </label>
                </div>
                <div className="pt-3 sm:pt-4">
                  <button className="bg-[#E51E25] hover:bg-[#c4161c] text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-sm active:scale-95 transition-all">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )

      case 'help': {
        const filteredFaqs = faqData.filter(f =>
          f.q.toLowerCase().includes(helpSearch.toLowerCase()) ||
          f.a.toLowerCase().includes(helpSearch.toLowerCase())
        )
        const handleSupportSubmit = (e) => {
          e.preventDefault()
          if (!supportForm.subject || !supportForm.message) return
          setSupportTicketSubmitted(true)
          setSupportForm({ subject: '', message: '' })
          setTimeout(() => setSupportTicketSubmitted(false), 4000)
        }
        return (
          <div className="space-y-4 sm:space-y-6 max-w-3xl">
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="font-extrabold text-slate-800 text-base sm:text-lg flex items-center gap-2 mb-4">
                <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#E51E25]" /> Frequently Asked Questions
              </h4>
              <input
                type="text"
                placeholder="Search help topics..."
                value={helpSearch}
                onChange={(e) => setHelpSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-red-500/30"
              />
              <div className="space-y-2">
                {filteredFaqs.length === 0 ? (
                  <div className="text-center py-8 text-slate-400 text-xs sm:text-sm">No matching help topics found</div>
                ) : (
                  filteredFaqs.map((faq, idx) => (
                    <div key={idx} className="border border-slate-100 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                        className="w-full flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 text-left bg-slate-50 hover:bg-slate-100 transition-colors"
                      >
                        <span className="text-xs sm:text-sm font-bold text-slate-700">{faq.q}</span>
                        <ChevronDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 shrink-0 transition-transform ${expandedFaq === idx ? 'rotate-180' : ''}`} />
                      </button>
                      {expandedFaq === idx && (
                        <div className="px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-slate-600 bg-white">{faq.a}</div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="font-extrabold text-slate-800 text-base sm:text-lg flex items-center gap-2 mb-1">
                <Send className="w-4 h-4 sm:w-5 sm:h-5 text-[#E51E25]" /> Contact Support
              </h4>
              <p className="text-[10px] sm:text-xs text-slate-500 mb-4">Can't find what you're looking for? Send us a message.</p>

              {supportTicketSubmitted && (
                <div className="bg-green-50 border border-green-200 p-3 sm:p-4 rounded-xl mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                  <span className="text-xs sm:text-sm font-bold text-green-800">Support request sent! Our team will get back to you soon.</span>
                </div>
              )}

              <form onSubmit={handleSupportSubmit} className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-[10px] sm:text-xs font-bold text-slate-600 mb-2">Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Issue with withdrawal approval"
                    value={supportForm.subject}
                    onChange={(e) => setSupportForm({ ...supportForm, subject: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                  />
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-bold text-slate-600 mb-2">Message</label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Describe your issue..."
                    value={supportForm.message}
                    onChange={(e) => setSupportForm({ ...supportForm, message: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30 resize-none"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button type="submit" className="flex-1 bg-[#E51E25] hover:bg-[#c4161c] text-white py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                    <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Send Request
                  </button>
                  <a href="mailto:support@diamondagency.com" className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                    Email Us Directly
                  </a>
                </div>
              </form>
            </div>
          </div>
        )
      }

      case 'sys_payment':
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-start gap-3 sm:gap-4 bg-gradient-to-r from-red-50 to-orange-50 p-4 sm:p-6 rounded-2xl border border-red-100">
              <CreditCard className="w-8 h-8 sm:w-10 sm:h-10 text-[#E51E25] shrink-0 mt-1" />
              <div>
                <h4 className="text-base sm:text-lg font-extrabold text-slate-800">Payment Gateway Integrations</h4>
                <p className="text-slate-500 text-[10px] sm:text-sm mt-1">Configure your payment processors for accepting diamond purchases and processing agency withdrawals.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {paymentGateways.map((gw) => (
                <div key={gw.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-6 flex flex-col h-full relative overflow-hidden">
                  {gw.status === 'Active' && <div className="absolute top-0 left-0 w-full h-1 bg-[#E51E25]"></div>}
                  <div className="flex justify-between items-start mb-4 sm:mb-6">
                    <div>
                      <div className="font-extrabold text-slate-800 text-base sm:text-lg">{gw.name}</div>
                      <div className="text-[10px] sm:text-xs text-slate-500 font-bold">{gw.type}</div>
                    </div>
                    <button 
                      onClick={() => setPaymentGateways(paymentGateways.map(p => p.id === gw.id ? {...p, status: p.status === 'Active' ? 'Inactive' : 'Active'} : p))}
                      className={`w-10 h-6 sm:w-12 sm:h-7 rounded-full relative transition-colors shrink-0 ${gw.status === 'Active' ? 'bg-[#E51E25]' : 'bg-slate-300'}`}
                    >
                      <span className={`absolute top-0.5 sm:top-1 left-0.5 sm:left-1 w-4 sm:w-5 h-4 sm:h-5 bg-white rounded-full shadow transition-transform ${gw.status === 'Active' ? 'translate-x-4 sm:translate-x-5' : ''}`} />
                    </button>
                  </div>
                  <div className="space-y-3 sm:space-y-4 flex-1">
                    <div>
                      <label className="block text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Public Key / Client ID</label>
                      {editingGwId === gw.id ? (
                        <input
                          type="text"
                          value={editGwForm.pub}
                          onChange={(e) => setEditGwForm({...editGwForm, pub: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500/30"
                        />
                      ) : (
                        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs font-mono font-bold text-slate-600">
                          <Lock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-400 mr-1 sm:mr-2" /> {gw.keys.pub}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Secret Key / Token</label>
                      {editingGwId === gw.id ? (
                        <input
                          type="text"
                          value={editGwForm.sec}
                          onChange={(e) => setEditGwForm({...editGwForm, sec: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500/30"
                        />
                      ) : (
                        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs font-mono font-bold text-slate-600">
                          <Lock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-400 mr-1 sm:mr-2" /> {gw.keys.sec}
                        </div>
                      )}
                    </div>
                  </div>
                  {editingGwId === gw.id ? (
                    <div className="mt-4 sm:mt-6 flex gap-2">
                      <button
                        onClick={() => {
                          setPaymentGateways(paymentGateways.map(p => p.id === gw.id ? {...p, keys: editGwForm} : p))
                          setEditingGwId(null)
                        }}
                        className="flex-1 bg-[#E51E25] hover:bg-[#c4161c] text-white py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2"
                      >
                        <CheckSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Save
                      </button>
                      <button
                        onClick={() => setEditingGwId(null)}
                        className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-sm active:scale-95 transition-all flex items-center justify-center"
                      >
                         Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingGwId(gw.id)
                        setEditGwForm({ pub: gw.keys.pub, sec: gw.keys.sec })
                      }}
                      className="w-full mt-4 sm:mt-6 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Edit Configuration
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )

      case 'sys_webhooks':
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="font-extrabold text-slate-800 text-base sm:text-lg flex items-center gap-2 mb-4 sm:mb-6"><Webhook className="w-4 h-4 sm:w-5 sm:h-5 text-[#E51E25]" /> Webhook Endpoint Configuration</h4>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex-1">
                  <label className="block text-[10px] sm:text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Payload URL</label>
                  <input type="text" value={webhooks[0].url} onChange={(e) => setWebhooks([{...webhooks[0], url: e.target.value}])} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-red-500/30" />
                </div>
                <div className="sm:w-48">
                  <label className="block text-[10px] sm:text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Status</label>
                  <select value={webhooks[0].status} onChange={(e) => setWebhooks([{...webhooks[0], status: e.target.value}])} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-red-500/30">
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>
              <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-3">
                <span className="bg-red-50 text-[#E51E25] font-bold text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg flex items-center gap-1 sm:gap-1.5"><CheckSquare className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> package.purchased</span>
                <span className="bg-red-50 text-[#E51E25] font-bold text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg flex items-center gap-1 sm:gap-1.5"><CheckSquare className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> withdrawal.requested</span>
                <span className="bg-slate-100 text-slate-400 font-bold text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-dashed border-slate-300 hover:bg-slate-50 cursor-pointer">+ Add Event</span>
              </div>
              <div className="mt-4 sm:mt-6 flex justify-end">
                <button className="bg-[#E51E25] hover:bg-[#c4161c] text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-sm active:scale-95 transition-all flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Send Test Payload
                </button>
              </div>
            </div>

            <div className="bg-white border border-slate-100 shadow-sm p-4 sm:p-5 rounded-2xl">
              <h4 className="font-extrabold text-slate-800 text-xs sm:text-sm flex items-center gap-2 mb-3 sm:mb-4"><Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E51E25]" /> Recent Deliveries</h4>
              <div className="space-y-2 sm:space-y-3">
                {webhookLogsList.map((log) => (
                  <div key={log.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-slate-400 font-bold font-mono text-[10px] sm:text-xs">[{log.time}]</span>
                      <span className="text-slate-700 font-semibold font-mono text-[10px] sm:text-xs">{log.event}</span>
                    </div>
                    <span className={`font-mono text-[10px] sm:text-xs font-bold ${log.success ? 'text-green-600' : 'text-[#E51E25]'}`}>{log.response}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'sys_security':
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3 sm:gap-5">
                <div className="w-10 h-10 sm:w-14 sm:h-14 bg-green-50 rounded-2xl flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 sm:w-7 sm:h-7 text-green-500" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-800 text-base sm:text-lg">System Secure</h4>
                  <p className="text-[10px] sm:text-xs text-slate-500 font-semibold mt-0.5">2FA is enabled for all admin accounts. 0 unauthorized attempts in the last 30 days.</p>
                </div>
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3 sm:gap-5">
                <div className="w-10 h-10 sm:w-14 sm:h-14 bg-red-50 rounded-2xl flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 sm:w-7 sm:h-7 text-[#E51E25]" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-extrabold text-slate-800 text-base sm:text-lg">3 Active Sessions</h4>
                    <button className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#E51E25] bg-red-50 hover:bg-red-100 px-1.5 sm:px-2 py-1 rounded">Revoke All</button>
                  </div>
                  <p className="text-[10px] sm:text-xs text-slate-500 font-semibold mt-0.5">Current IP: 192.168.1.45 (Kathmandu, NP)</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-slate-100 flex justify-between items-center">
                <h4 className="font-extrabold text-slate-800 text-sm sm:text-base flex items-center gap-2"><Lock className="w-4 h-4 sm:w-5 sm:h-5 text-[#E51E25]" /> Immutable Audit Log</h4>
                <button onClick={exportSecurityLogsToCSV} className="text-[10px] sm:text-xs font-bold text-slate-600 hover:text-[#E51E25] bg-slate-50 hover:bg-slate-100 active:scale-95 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-slate-200 transition-all">Export CSV</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-slate-400 font-bold text-[10px] sm:text-xs uppercase">
                    <tr><th className="p-2 sm:p-4">Timestamp</th><th className="p-2 sm:p-4">Admin / User</th><th className="p-2 sm:p-4">Action Taken</th><th className="p-2 sm:p-4">IP Address</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {securityLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50/50">
                        <td className="p-2 sm:p-4 text-[10px] sm:text-xs font-mono text-slate-500">{log.date}</td>
                        <td className="p-2 sm:p-4 font-bold text-slate-800 text-xs sm:text-sm">{log.user}</td>
                        <td className="p-2 sm:p-4 text-slate-600 text-xs sm:text-sm">{log.action}</td>
                        <td className="p-2 sm:p-4 text-[10px] sm:text-xs font-mono text-slate-400">{log.ip}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )

      case 'profile':
        return (
          <ProfilePanel
            profile={profile}
            setProfile={setProfile}
            showAgencyPin={showAgencyPin}
            setShowAgencyPin={setShowAgencyPin}
            showCustomerPin={showCustomerPin}
            setShowCustomerPin={setShowCustomerPin}
            passwordForm={passwordForm}
            setPasswordForm={setPasswordForm}
            passwordSuccess={passwordSuccess}
            setPasswordSuccess={setPasswordSuccess}
          />
        )

      case 'coin_transfer':
        return (
          <UserCoinRecharge
            coinTransferForm={coinTransferForm}
            setCoinTransferForm={setCoinTransferForm}
            showTransferConfirmation={showTransferConfirmation}
            transferSuccess={transferSuccess}
            setTransferSuccess={setTransferSuccess}
            setNotifications={setNotifications}
            handleCoinTransferSubmit={handleCoinTransferSubmit}
            handleCoinTransferConfirm={handleCoinTransferConfirm}
            handleCoinTransferCancel={handleCoinTransferCancel}
          />
        )

      case 'recharge_history':
        return (
          <RechargeHistory
            rechargeHistory={rechargeHistory}
            historyFilters={historyFilters}
            setHistoryFilters={setHistoryFilters}
            setSelectedRechargeRecord={setSelectedRechargeRecord}
            setShowRechargeRecordModal={setShowRechargeRecordModal}
          />
        )

      case 'transaction_history':
        return (
          <TransactionHistory
            rechargeHistory={rechargeHistory}
            coinTransferHistory={coinTransferHistory}
            agencyWallet={agencyWallet}
            transactionHistoryFilters={transactionHistoryFilters}
            setTransactionHistoryFilters={setTransactionHistoryFilters}
            setSelectedRechargeRecord={setSelectedRechargeRecord}
            setShowRechargeRecordModal={setShowRechargeRecordModal}
          />
        )

      case 'chat_support':
        return (
          <div className="space-y-4">
            <ChatSupport />
          </div>
        )

      case 'user_lookup':
        return (
          <UserLookup
            userLookupSearch={userLookupSearch}
            setUserLookupSearch={setUserLookupSearch}
            userLookupResult={userLookupResult}
            setUserLookupResult={setUserLookupResult}
            userWallets={userWallets}
            rechargeHistory={rechargeHistory}
          />
        )

      case 'manual_recharge':
        const handleManualRechargeSubmit = (e) => {
          e.preventDefault()
          
          // Validate form
          if (!manualRechargeForm.userId || !manualRechargeForm.coinAmount) {
            alert('Please fill all required fields!')
            return
          }
          
          if (Number(manualRechargeForm.coinAmount) <= 0) {
            alert('Coin amount must be greater than 0!')
            return
          }
          
          // Show confirmation popup
          setShowManualRechargeConfirm(true)
        }
        
        const handleManualRechargeConfirm = () => {
          const coinsToRecharge = Number(manualRechargeForm.coinAmount)
          const userId = Number(manualRechargeForm.userId)
          
          // Check if agency has enough coins
          if (agencyWallet.coins < coinsToRecharge) {
            alert('Insufficient coins in Agency Wallet!')
            setShowManualRechargeConfirm(false)
            return
          }
          
          // Deduct from agency wallet
          setAgencyWallet(prev => ({ coins: prev.coins - coinsToRecharge }))
          
          // Credit to user wallet
          setUserWallets(prev => prev.map(user => {
            if (user.id === userId) {
              return { ...user, coins: user.coins + coinsToRecharge }
            }
            return user
          }))
          
          // Add to recharge history
          const newTransaction = {
            transactionId: `TXN-${String(rechargeHistory.length + 1).padStart(3, '0')}`,
            rechargeId: `RC-${String(rechargeHistory.length + 1).padStart(3, '0')}`,
            userId: manualRechargeForm.userId,
            userName: manualRechargeForm.userName,
            rechargeType: manualRechargeForm.rechargeType,
            coinsAdded: coinsToRecharge,
            status: 'Completed',
            dateTime: new Date().toLocaleString('en-US', { 
              year: 'numeric', 
              month: '2-digit', 
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            }).replace(',', ''),
            remarks: manualRechargeForm.remarks || 'Manual recharge'
          }
          
          setRechargeHistory(prev => [newTransaction, ...prev])
          
          setManualRechargeSuccess({
            userId: manualRechargeForm.userId,
            userName: manualRechargeForm.userName,
            coins: coinsToRecharge,
            rechargeType: manualRechargeForm.rechargeType
          })
          
          // Reset form and close confirmation
          setManualRechargeForm({
            agencyId: 'AG-001',
            agencyName: 'Diamond Agency',
            userId: '',
            userName: '',
            accountType: '',
            coinAmount: '',
            rechargeType: 'Normal Coin',
            remarks: ''
          })
          setShowManualRechargeConfirm(false)
        }
        
        const handleManualRechargeCancel = () => {
          setShowManualRechargeConfirm(false)
        }

        return (
          <div className="space-y-4 sm:space-y-6 max-w-2xl">
            {/* Success Confirmation - eSewa Style */}
            {manualRechargeSuccess && (
              <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden">
                  <div className="bg-white p-6 flex flex-col items-center justify-center border-b border-green-100">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
                      <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>
                    <h4 className="font-extrabold text-green-500 text-lg">Transaction Successful!</h4>
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-slate-500 text-sm">User ID</span>
                      <span className="font-semibold text-slate-800 text-sm">{manualRechargeSuccess.userId}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-slate-500 text-sm">User Name</span>
                      <span className="font-semibold text-slate-800 text-sm">{manualRechargeSuccess.userName}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-slate-500 text-sm">Recharge Type</span>
                      <span className="font-semibold text-slate-800 text-sm">{manualRechargeSuccess.rechargeType}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-slate-500 text-sm">Status</span>
                      <span className="px-2 py-1 rounded-lg text-xs font-bold bg-green-50 text-green-600">Completed</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-slate-500 text-sm">Time</span>
                      <span className="font-semibold text-slate-800 text-sm">{new Date().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-4">
                      <span className="text-slate-500 text-sm">Amount</span>
                      <span className="font-bold text-green-600 text-2xl">{manualRechargeSuccess.coins.toLocaleString()}</span>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <button 
                        onClick={() => {
                          // Add dispute notification
                          setNotifications(prev => [{
                            id: Date.now(),
                            type: 'system',
                            title: 'Recharge Dispute Filed',
                            message: `User ${manualRechargeSuccess.userName} (ID: ${manualRechargeSuccess.userId}) has filed a dispute for ${manualRechargeSuccess.coins.toLocaleString()} coins recharge.`,
                            time: 'Just now',
                            read: false
                          }, ...prev])
                          setManualRechargeSuccess(null)
                        }}
                        className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl text-sm font-bold shadow-sm active:scale-[0.98] transition-all"
                      >
                        Dispute
                      </button>
                      <button 
                        onClick={() => setManualRechargeSuccess(null)}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl text-sm font-bold shadow-sm active:scale-[0.98] transition-all"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4 sm:space-y-6">
              <div>
                <h4 className="font-extrabold text-slate-800 text-base sm:text-lg">Manual Recharge</h4>
                <p className="text-[10px] sm:text-xs text-slate-500 mt-1">Recharge user wallet with different coin types.</p>
              </div>
              
              <form onSubmit={handleManualRechargeSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] sm:text-xs font-bold text-slate-600 mb-2">Agency ID(Auto)</label>
                    <input 
                      type="text" 
                      value={manualRechargeForm.agencyId}
                      readOnly
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-slate-500 cursor-not-allowed" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] sm:text-xs font-bold text-slate-600 mb-2">Agency Name (Auto)</label>
                    <input 
                      type="text" 
                      value={manualRechargeForm.agencyName}
                      readOnly
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-slate-500 cursor-not-allowed" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-bold text-slate-600 mb-2">User ID</label>
                  <input 
                    type="text" 
                    placeholder="Enter User ID" 
                    required
                    value={manualRechargeForm.userId}
                    onChange={e => {
                      setManualRechargeForm({...manualRechargeForm, userId: e.target.value})
                      // Auto-fetch user name and account type based on user ID
                      const user = userWallets.find(u => u.id === Number(e.target.value))
                      if (user) {
                        setManualRechargeForm(prev => ({ ...prev, userName: user.name, accountType: user.accountType }))
                      } else {
                        setManualRechargeForm(prev => ({ ...prev, userName: '', accountType: '' }))
                      }
                    }}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30" 
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] sm:text-xs font-bold text-slate-600 mb-2">User Name</label>
                    <input 
                      type="text" 
                      placeholder="Enter user name" 
                      value={manualRechargeForm.userName}
                      readOnly
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-slate-500 cursor-not-allowed" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] sm:text-xs font-bold text-slate-600 mb-2">Account Type</label>
                    <select 
                      value={manualRechargeForm.accountType}
                      onChange={e => setManualRechargeForm({...manualRechargeForm, accountType: e.target.value})}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                    >
                      <option value="">-- Select Account Type --</option>
                      <option value="Personal">Personal</option>
                      <option value="Official">Official</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-bold text-slate-600 mb-2">Coin Amount</label>
                  <input 
                    type="number" 
                    placeholder="Enter coin amount" 
                    required
                    min="1"
                    value={manualRechargeForm.coinAmount}
                    onChange={e=>setManualRechargeForm({...manualRechargeForm, coinAmount: e.target.value})}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-bold text-slate-600 mb-2">Recharge Type</label>
                  <select 
                    value={manualRechargeForm.rechargeType}
                    onChange={e=>setManualRechargeForm({...manualRechargeForm, rechargeType: e.target.value})}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                  >
                    <option value="Normal Coin">Normal Coin</option>
                    <option value="Blue Diamond">Blue Diamond</option>
                    <option value="Green Diamond">Green Diamond</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-bold text-slate-600 mb-2">Remarks (Optional)</label>
                  <textarea 
                    rows="3" 
                    placeholder="Enter remarks (optional)..." 
                    value={manualRechargeForm.remarks}
                    onChange={e=>setManualRechargeForm({...manualRechargeForm, remarks: e.target.value})}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30 resize-none" 
                  />
                </div>
                <div className="pt-2">
                  <button 
                    type="submit" 
                    className="w-full bg-[#E51E25] hover:bg-[#c4161c] text-white py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-bold shadow-sm active:scale-[0.98] transition-all"
                  >
                    Recharge
                  </button>
                </div>
              </form>
            </div>

            {/* Top 5 Recent Recharges Table */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-slate-800 text-base sm:text-lg flex items-center gap-2">
                    <History className="w-4 h-4 text-[#E51E25]" /> Recent Top 5 Recharges
                  </h4>
                  <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">Latest manual user recharge logs</p>
                </div>
                <button 
                  onClick={() => setActiveSideTab('recharge_history')}
                  className="text-xs font-bold text-[#E51E25] hover:underline"
                >
                  View Full History
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-400 font-bold uppercase">
                    <tr>
                      <th className="p-3">Txn ID</th>
                      <th className="p-3">User</th>
                      <th className="p-3">Coins Added</th>
                      <th className="p-3">Type</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold">
                    {rechargeHistory.slice(0, 5).map((rec) => (
                      <tr key={rec.transactionId} className="hover:bg-slate-50">
                        <td className="p-3 font-mono font-bold text-slate-700">{rec.transactionId}</td>
                        <td className="p-3">
                          <div className="font-bold text-slate-800">{rec.userName}</div>
                          <div className="text-[10px] font-mono text-slate-400">ID: {rec.userId}</div>
                        </td>
                        <td className="p-3 font-mono font-bold text-slate-800">{rec.coinsAdded.toLocaleString()}</td>
                        <td className="p-3 text-slate-600">{rec.rechargeType}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            rec.status === 'Completed' ? 'bg-green-100 text-green-700' :
                            rec.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {rec.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Confirmation Popup */}
            {showManualRechargeConfirm && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
                  <div className="text-center">
                    <h4 className="font-extrabold text-slate-800 text-lg sm:text-xl mb-2">Confirm Recharge</h4>
                    <p className="text-slate-600 text-sm sm:text-base mb-6">
                      Are you sure you want to recharge <span className="font-bold text-[#E51E25]">{Number(manualRechargeForm.coinAmount).toLocaleString()}</span> {manualRechargeForm.rechargeType} to User <span className="font-bold">{manualRechargeForm.userName}</span> (ID: {manualRechargeForm.userId})?
                    </p>
                    <div className="flex gap-3">
                      <button 
                        onClick={handleManualRechargeConfirm}
                        className="flex-1 bg-[#E51E25] hover:bg-[#c4161c] text-white py-3 rounded-xl text-sm font-bold shadow-sm active:scale-[0.98] transition-all"
                      >
                        Confirm
                      </button>
                      <button 
                        onClick={handleManualRechargeCancel}
                        className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl text-sm font-bold shadow-sm active:scale-[0.98] transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}


          </div>
        )

      case 'blue_diamond':
        return <BlueDiamondSystem type="Blue" />
      case 'green_diamond':
        return <GreenDiamondSystem />
      default:
        return null
    }
  }

  return ( <>
    <div className="min-h-screen bg-[#F8F8FA] font-sans selection:bg-red-500 selection:text-white overflow-x-hidden">
      {/* Top Bar */}
      <header className="w-full bg-[#E51E25] text-white py-3 px-3 sm:px-4 md:px-8 flex items-center justify-between fixed top-0 left-0 right-0 z-[9999] shadow-md min-h-[56px] sm:min-h-[60px]">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          {/* Mobile sidebar toggle */}
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-white/10 transition-colors shrink-0"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          <Link to="/" className="flex items-center gap-1.5 sm:gap-2 hover:opacity-80 transition-opacity shrink-0">
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm font-bold hidden sm:inline">Back to Home</span>
          </Link>
          <div className="w-px h-5 sm:h-6 bg-white/30 hidden sm:block"></div>
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <Gem className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300 shrink-0" />
            <span className="font-extrabold text-sm sm:text-lg tracking-tight truncate">Diamond Agency</span>
          </div>
        </div>

        {/* Agency + Notification + Language + Profile */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Agency Badge */}
          <div className="hidden md:flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1.5 rounded-xl">
            <Building2 className="w-4 h-4 text-yellow-300 shrink-0" />
            <span className="text-xs font-bold truncate max-w-[160px]">
              {profile.agencyId} - {profile.agencyName}
            </span>
          </div>

          {/* Language Selector */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
              className="flex items-center gap-2 bg-white/10 border border-white/20 text-white rounded-full px-3 py-1.5 text-xs font-semibold hover:bg-white/15 transition"
              aria-label="Select language"
            >
              <Globe className="w-4 h-4 text-white" />
              <span>{selectedLanguage}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${languageMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            {languageMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-slate-800 rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-[10002]">
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

          {/* Notification Bell */}
          <button
            onClick={() => { setActiveSideTab('notifications'); setProfileOpen(false) }}
            className="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-yellow-300 text-[#E51E25] text-[9px] font-black min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center">
                {notifications.filter(n => !n.read).length}
              </span>
            )}
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-1.5 sm:gap-2 pl-1.5 sm:pl-2 pr-1 py-1 rounded-xl hover:bg-white/10 transition-colors"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div className="hidden sm:flex flex-col items-start leading-tight">
                <span className="text-xs font-bold text-yellow-300 truncate max-w-[130px]">
                  {profile.agencyName}
                </span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform shrink-0 ${profileOpen ? 'rotate-180' : ''}`} />
            </button>

            {profileOpen && (
              <>
                <div className="fixed inset-0 z-[10000]" onClick={() => setProfileOpen(false)} />
                <div className="absolute right-0 top-full mt-2 w-60 bg-white rounded-xl shadow-2xl border border-slate-100 py-2 text-slate-800 z-[10001]">
                  <div className="px-4 py-2.5 border-b border-slate-100">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Agency</div>
                    <div className="text-sm font-extrabold text-slate-800">{profile.agencyId} — {profile.agencyName}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{profile.email}</div>
                  </div>
                  <button onClick={() => { setActiveSideTab('profile'); setProfileOpen(false) }} className="w-full text-left px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-slate-400" /> View Profile
                  </button>
                  <button onClick={() => { setActiveSideTab('settings'); setProfileOpen(false) }} className="w-full text-left px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                    <Settings className="w-3.5 h-3.5 text-slate-400" /> Settings
                  </button>
                  <button onClick={() => { setActiveSideTab('help'); setProfileOpen(false) }} className="w-full text-left px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                    <HelpCircle className="w-3.5 h-3.5 text-slate-400" /> Help
                  </button>
                  <button onClick={() => { setActiveSideTab('chat_support'); setProfileOpen(false) }} className="w-full text-left px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5 text-slate-400" /> Chat Support
                  </button>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2">
  <Lock className="w-3.5 h-3.5 text-slate-400" /> Sign Out
</button>
</div>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="flex min-h-screen pt-[56px] sm:pt-[60px]">
        <Sidebar
          menuGroups={diamondAgencyMenuGroups}
          mobileSidebarOpen={mobileSidebarOpen}
          setMobileSidebarOpen={setMobileSidebarOpen}
          activeSideTab={activeSideTab}
          setActiveSideTab={setActiveSideTab}
          expandedGroups={expandedGroups}
          toggleGroup={toggleGroup}
        />

        {/* Content Area */}
        <main className="flex-1 min-w-0 p-3 sm:p-4 md:p-6 lg:p-8 overflow-x-hidden">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-black text-slate-800">
              {diamondAgencyMenuGroups.flatMap(g => g.key ? [g] : g.subItems).find(m => m.key === activeSideTab)?.label || (activeSideTab === 'help' ? 'Help & Support' : '')}
            </h2>
          </div>
          {renderPanel()}
        </main>
      </div>

      {/* Package Details Modal */}
      {showPkgDetailModal && selectedPackageDetail && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99999] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-slideUp">
            <div className="bg-gradient-to-r from-red-600 to-[#E51E25] p-5 text-white flex justify-between items-start">
              <div>
                <div className="inline-flex items-center gap-1.5 bg-black/20 border border-white/30 rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider mb-2">
                  <Gem className="w-3 h-3 text-white" /> Super Admin Package
                </div>
                <h3 className="font-black text-xl">{selectedPackageDetail.name}</h3>
                <p className="text-xs text-red-100 mt-1">Package ID: {selectedPackageDetail.id}</p>
              </div>
              <button 
                onClick={() => setShowPkgDetailModal(false)}
                className="p-1 rounded-lg bg-black/20 hover:bg-black/40 text-white transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
                  <div className="text-[10px] font-bold uppercase text-slate-400">Base Diamonds</div>
                  <div className="text-lg font-black text-slate-800 font-mono">{selectedPackageDetail.diamonds.toLocaleString()}</div>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
                  <div className="text-[10px] font-bold uppercase text-slate-400">Price (USD)</div>
                  <div className="text-lg font-black text-green-600 font-mono">${selectedPackageDetail.price.toFixed(2)}</div>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
                  <div className="text-[10px] font-bold uppercase text-slate-400">Bonus Percentage</div>
                  <div className="text-lg font-black text-amber-600 font-mono">+{selectedPackageDetail.bonusPct}%</div>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
                  <div className="text-[10px] font-bold uppercase text-slate-400">Total Diamonds</div>
                  <div className="text-lg font-black text-[#E51E25] font-mono">
                    {(selectedPackageDetail.diamonds + Math.floor(selectedPackageDetail.diamonds * (selectedPackageDetail.bonusPct / 100))).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Total Packages Sold:</span>
                  <span className="font-bold text-slate-800">{selectedPackageDetail.sold.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Status:</span>
                  <span className="font-bold text-green-600 uppercase text-[10px] bg-green-50 border border-green-200 px-2 py-0.5 rounded-md">
                    {selectedPackageDetail.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Source:</span>
                  <span className="font-bold text-slate-700">Auto-Fetched (Super Admin)</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setShowPkgDetailModal(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl text-xs font-bold transition-all"
                >
                  Close
                </button>
                <button 
                  onClick={() => {
                    const totalDiamonds = selectedPackageDetail.diamonds + Math.floor(selectedPackageDetail.diamonds * (selectedPackageDetail.bonusPct / 100))
                    setManualRechargeForm(prev => ({ 
                      ...prev, 
                      coinAmount: String(totalDiamonds),
                      rechargeType: selectedPackageDetail.name 
                    }))
                    setShowPkgDetailModal(false)
                    setActiveSideTab('manual_recharge')
                  }}
                  className="flex-1 bg-[#E51E25] hover:bg-[#c4161c] text-white py-3 rounded-xl text-xs font-bold shadow-md transition-all"
                >
                  Use for Recharge
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recharge Record details modal (with matched package specifications) */}
      {showRechargeRecordModal && selectedRechargeRecord && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99999] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-slideUp">
            <div className="bg-gradient-to-r from-red-600 to-[#E51E25] p-5 text-white flex justify-between items-start">
              <div>
                <span className="inline-flex items-center gap-1 bg-black/20 border border-white/20 rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider mb-2">
                  Transaction Info
                </span>
                <h3 className="font-extrabold text-lg leading-tight">{selectedRechargeRecord.userName}</h3>
                <p className="text-[10px] text-red-100 mt-1 font-mono">Txn ID: {selectedRechargeRecord.transactionId}</p>
              </div>
              <button 
                onClick={() => setShowRechargeRecordModal(false)}
                className="p-1 rounded-lg bg-black/20 hover:bg-black/40 text-white transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-slate-50 border border-slate-100/80 p-3.5 rounded-xl space-y-2 text-xs font-semibold">
                <div className="flex justify-between">
                  <span className="text-slate-500">User ID:</span>
                  <span className="font-mono font-bold text-slate-800">{selectedRechargeRecord.userId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Coins/Diamonds Added:</span>
                  <span className="font-mono font-black text-slate-800">{selectedRechargeRecord.coinsAdded.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Recharge Type:</span>
                  <span className="font-bold text-[#E51E25]">{selectedRechargeRecord.rechargeType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Date & Time:</span>
                  <span className="text-slate-600 font-bold">{selectedRechargeRecord.dateTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Remarks:</span>
                  <span className="text-slate-600 font-semibold">{selectedRechargeRecord.remarks || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-slate-500">Status:</span>
                  <span className={`px-2.5 py-0.5 rounded-md text-[9px] font-bold ${
                    selectedRechargeRecord.status === 'Completed' ? 'bg-green-50 text-green-700 border border-green-200' :
                    selectedRechargeRecord.status === 'Pending' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 
                    'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {selectedRechargeRecord.status}
                  </span>
                </div>
              </div>

              {/* Match and display the coin package */}
              {(() => {
                const matchedPkg = packages.find(p => 
                  selectedRechargeRecord.rechargeType.toLowerCase().includes(p.name.replace(" Package", "").toLowerCase()) ||
                  selectedRechargeRecord.rechargeType.toLowerCase().includes(p.name.toLowerCase()) ||
                  p.name.toLowerCase().includes(selectedRechargeRecord.rechargeType.toLowerCase()) ||
                  (selectedRechargeRecord.rechargeType.toLowerCase().includes("normal") && p.name.toLowerCase().includes("normal")) ||
                  (selectedRechargeRecord.rechargeType.toLowerCase().includes("blue") && p.name.toLowerCase().includes("blue")) ||
                  (selectedRechargeRecord.rechargeType.toLowerCase().includes("green") && p.name.toLowerCase().includes("green"))
                )
                if (matchedPkg) {
                  return (
                    <div className="border border-red-100 bg-red-50/40 p-4 rounded-xl space-y-3">
                      <div className="text-xs font-bold text-[#E51E25] flex items-center gap-1.5 uppercase tracking-wide">
                        <Gem className="w-3.5 h-3.5" /> Associated Coin Package Specifications
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                        <div className="bg-white border border-red-50/50 p-2 rounded-lg">
                          <div className="text-[9px] font-bold text-slate-400 uppercase">Package Name</div>
                          <div className="font-bold text-slate-800 mt-0.5">{matchedPkg.name}</div>
                        </div>
                        <div className="bg-white border border-red-50/50 p-2 rounded-lg">
                          <div className="text-[9px] font-bold text-slate-400 uppercase">Price (USD)</div>
                          <div className="font-bold text-green-600 mt-0.5">${matchedPkg.price.toFixed(2)}</div>
                        </div>
                        <div className="bg-white border border-red-50/50 p-2 rounded-lg">
                          <div className="text-[9px] font-bold text-slate-400 uppercase">Base Diamonds</div>
                          <div className="font-bold text-slate-700 mt-0.5">{matchedPkg.diamonds.toLocaleString()}</div>
                        </div>
                        <div className="bg-white border border-red-50/50 p-2 rounded-lg">
                          <div className="text-[9px] font-bold text-slate-400 uppercase">Bonus %</div>
                          <div className="font-bold text-amber-600 mt-0.5">+{matchedPkg.bonusPct}%</div>
                        </div>
                      </div>
                    </div>
                  )
                }
                return (
                  <div className="border border-slate-100 bg-slate-50 p-3.5 rounded-xl text-center text-xs text-slate-500 font-semibold">
                    No matching Super Admin package found for this coin type.
                  </div>
                )
              })()}

              <div className="pt-1">
                <button 
                  onClick={() => setShowRechargeRecordModal(false)}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl text-xs font-bold transition-all"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  )
}
