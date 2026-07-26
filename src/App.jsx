import React from 'react'
import { Routes, Route } from 'react-router-dom'
import DiamondAgencyPage from './components/diamond-agency/DiamondAgencyPage'
import LoginPage from './pages/common/LoginPage'
import DiamondAgencySummary from './components/diamond-agency/diamond-agency-viewer/DiamondAgencySummary'
import DiamondAgencyPerformance from './components/diamond-agency/diamond-agency-viewer/DiamondAgencyPerformance'
import DiamondAgencyActivity from './components/diamond-agency/diamond-agency-viewer/DiamondAgencyActivity'


import Dashboard from './components/diamond-agency/dashboard/Dashboard'
import ManualRecharge from './components/diamond-agency/manual-recharge/ManualRecharge'
import UserLookup from './components/diamond-agency/user-lookup/UserLookup'
import RechargeHistory from './components/diamond-agency/recharge-history/RechargeHistory'
import TransactionHistory from './components/diamond-agency/transaction-history/TransactionHistory'
import Billing from './components/diamond-agency/billing/Billing'
import UserCoinRecharge from './components/diamond-agency/user-coin-recharge/UserCoinRecharge'
import NotificationsPanel from './components/diamond-agency/notifications/NotificationsPanel'
import ProfilePanel from './components/diamond-agency/profile/ProfilePanel'
import BlueDiamondSystem from './components/diamond-agency/blue-diamond-system/BlueDiamondSystem'
import GreenDiamondSystem from './components/diamond-agency/green-diamond-system/GreenDiamondSystem'
import DiamondSystem from './components/diamond-agency/diamond-system/DiamondSystem'
import ChatSupport from './components/diamond-agency/chat-support/ChatSupport'

function DiamondAgencyViewer() {
  return (
    <div className="space-y-6 animate-fadeIn">
      <DiamondAgencySummary />
      <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_0.85fr] gap-6">
        <DiamondAgencyPerformance />
        <DiamondAgencyActivity />
      </div>
    </div>
  )
}

function App() {
  const Panels = {
    Dashboard,
    ManualRecharge,
    UserLookup,
    RechargeHistory,
    TransactionHistory,
    Billing,
    UserCoinRecharge,
    NotificationsPanel,
    ProfilePanel,
    BlueDiamondSystem,
    GreenDiamondSystem,
    DiamondSystem,
    ChatSupport,
  }

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/diamond-agency/viewer" element={<DiamondAgencyViewer />} />
      <Route path="/diamond-agency" element={<DiamondAgencyPage Panels={Panels} />} />
      <Route path="/diamond-agency/dashboard" element={<DiamondAgencyPage Panels={Panels} />} />
      <Route path="/diamond-agency/manual_recharge" element={<DiamondAgencyPage Panels={Panels} />} />
      <Route path="/diamond-agency/user_lookup" element={<DiamondAgencyPage Panels={Panels} />} />
      <Route path="/diamond-agency/recharge_history" element={<DiamondAgencyPage Panels={Panels} />} />
      <Route path="/diamond-agency/transaction_history" element={<DiamondAgencyPage Panels={Panels} />} />
      <Route path="/diamond-agency/billing" element={<DiamondAgencyPage Panels={Panels} />} />
      <Route path="/diamond-agency/coin_transfer" element={<DiamondAgencyPage Panels={Panels} />} />
      <Route path="/diamond-agency/chat_support" element={<DiamondAgencyPage Panels={Panels} />} />
      <Route path="/diamond-agency/notifications" element={<DiamondAgencyPage Panels={Panels} />} />
      <Route path="/diamond-agency/profile" element={<DiamondAgencyPage Panels={Panels} />} />
      <Route path="/diamond-agency/blue_diamond" element={<DiamondAgencyPage Panels={Panels} />} />
      <Route path="/diamond-agency/green_diamond" element={<DiamondAgencyPage Panels={Panels} />} />
      <Route path="/diamond-agency/:tab/*" element={<DiamondAgencyPage Panels={Panels} />} />
    </Routes>
  )
}

export default App
