import React from 'react'
import { Receipt, Wallet } from 'lucide-react'

export default function TransactionHistory({
  rechargeHistory,
  coinTransferHistory,
  agencyWallet,
  transactionHistoryFilters,
  setTransactionHistoryFilters,
  setSelectedRechargeRecord,
  setShowRechargeRecordModal,
}) {
  const mergedTransactionHistory = [
    ...rechargeHistory.map((record) => ({
      transactionId: record.transactionId,
      userId: record.userId,
      userName: record.userName,
      type: 'Recharge',
      coinsAdded: record.coinsAdded,
      status: record.status,
      dateTime: record.dateTime,
      remarks: record.remarks,
    })),
    ...coinTransferHistory.map((record) => ({
      transactionId: record.transactionId,
      userId: record.userId,
      userName: record.userName,
      type: 'User RC',
      coinsAdded: record.coins,
      status: record.status,
      dateTime: record.timestamp,
      remarks: `${record.coinType} • ${record.transferType}`,
    })),
  ].filter((record, index, all) => all.findIndex((item) => item.transactionId === record.transactionId) === index)

  const filterTransactionHistory = () => {
    return mergedTransactionHistory.filter((record) => {
      let matchesDate = true
      const recordDate = new Date(record.dateTime.split(' ')[0])
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (transactionHistoryFilters.dateFilter === 'today') {
        const todayDate = new Date()
        todayDate.setHours(0, 0, 0, 0)
        matchesDate = recordDate.toDateString() === todayDate.toDateString()
      } else if (transactionHistoryFilters.dateFilter === 'yesterday') {
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)
        matchesDate = recordDate.toDateString() === yesterday.toDateString()
      } else if (transactionHistoryFilters.dateFilter === 'week') {
        const weekAgo = new Date(today)
        weekAgo.setDate(weekAgo.getDate() - 1)
        matchesDate = recordDate >= weekAgo
      } else if (transactionHistoryFilters.dateFilter === 'custom' && transactionHistoryFilters.customDate) {
        const customDate = new Date(transactionHistoryFilters.customDate)
        matchesDate = recordDate.toDateString() === customDate.toDateString()
      }

      const matchesType = transactionHistoryFilters.typeFilter === 'all' || record.type === transactionHistoryFilters.typeFilter
      const matchesStatus = transactionHistoryFilters.statusFilter === 'all' || record.status === transactionHistoryFilters.statusFilter
      const matchesSearch = !transactionHistoryFilters.searchTerm || `${record.transactionId} ${record.userId} ${record.userName} ${record.type} ${record.remarks}`.toLowerCase().includes(transactionHistoryFilters.searchTerm.toLowerCase())

      return matchesDate && matchesType && matchesStatus && matchesSearch
    })
  }

  const filteredTransactionHistory = filterTransactionHistory()

  const computeRunningBalances = (list) => {
    const sorted = [...list].sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))
    let cur = Number(agencyWallet.coins || 0)
    return sorted.map((record) => {
      const running = cur
      const amt = Number(record.coinsAdded || 0)
      let delta = 0
      if (record.status === 'Completed') {
        delta = record.type === 'User RC' ? -amt : amt
      } else if (record.status === 'Refunded') {
        delta = record.type === 'User RC' ? amt : -amt
      }
      cur = cur - delta
      return { ...record, runningBalance: running }
    })
  }

  const transactionHistoryWithBalance = computeRunningBalances(filteredTransactionHistory)

  const totalCoinsReceived = filteredTransactionHistory.reduce((sum, record) => {
    if (record.type === 'Recharge' && record.status === 'Completed') {
      return sum + Number(record.coinsAdded || 0)
    }
    return sum
  }, 0)

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 mb-3 sm:mb-4">
        <div>
          <h4 className="font-extrabold text-slate-800 text-base sm:text-lg flex items-center gap-2">
            <Receipt className="w-4 h-4 sm:w-5 sm:h-5 text-[#E51E25]" /> Transaction History
          </h4>
        </div>

        <div className="bg-gradient-to-r from-[#E51E25] to-red-500 rounded-xl p-4 sm:p-5 text-white shadow-lg flex items-center gap-4 w-full lg:w-auto">
          <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-[10px] sm:text-xs font-bold text-red-100 uppercase tracking-wider mb-1">Agency Remaining Coins</div>
            <div className="text-2xl sm:text-3xl font-black leading-none">{agencyWallet.coins.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-3">
          <div className="sm:col-span-2 xl:col-span-2">
            <label className="block text-[10px] sm:text-xs font-bold text-slate-600 mb-2">Search</label>
            <input
              type="text"
              placeholder="Search by ID, user or note"
              value={transactionHistoryFilters.searchTerm}
              onChange={(e) => setTransactionHistoryFilters({ ...transactionHistoryFilters, searchTerm: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
            />
          </div>
          <div>
            <label className="block text-[10px] sm:text-xs font-bold text-slate-600 mb-2">Date Filter</label>
            <select
              value={transactionHistoryFilters.dateFilter}
              onChange={(e) => setTransactionHistoryFilters({ ...transactionHistoryFilters, dateFilter: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="week">This Week</option>
              <option value="custom">Custom Date</option>
            </select>
          </div>
          {transactionHistoryFilters.dateFilter === 'custom' && (
            <div>
              <label className="block text-[10px] sm:text-xs font-bold text-slate-600 mb-2">Select Date</label>
              <input
                type="date"
                value={transactionHistoryFilters.customDate}
                onChange={(e) => setTransactionHistoryFilters({ ...transactionHistoryFilters, customDate: e.target.value })}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
              />
            </div>
          )}
          <div>
            <label className="block text-[10px] sm:text-xs font-bold text-slate-600 mb-2">Type</label>
            <select
              value={transactionHistoryFilters.typeFilter}
              onChange={(e) => setTransactionHistoryFilters({ ...transactionHistoryFilters, typeFilter: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
            >
              <option value="all">All Types</option>
              <option value="Recharge">Recharge</option>
              <option value="User RC">User RC</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] sm:text-xs font-bold text-slate-600 mb-2">Status</label>
            <select
              value={transactionHistoryFilters.statusFilter}
              onChange={(e) => setTransactionHistoryFilters({ ...transactionHistoryFilters, statusFilter: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Failed">Failed</option>
              <option value="Refunded">Refunded</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
          <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">Total Records</div>
          <div className="mt-1 text-xl sm:text-2xl font-black text-slate-800">{filteredTransactionHistory.length}</div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
          <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">Completed</div>
          <div className="mt-1 text-xl sm:text-2xl font-black text-green-600">{filteredTransactionHistory.filter((r) => r.status === 'Completed').length}</div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
          <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">Pending</div>
          <div className="mt-1 text-xl sm:text-2xl font-black text-amber-600">{filteredTransactionHistory.filter((r) => r.status === 'Pending').length}</div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
          <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">Total Coins Received</div>
          <div className="mt-1 text-xl sm:text-2xl font-black text-slate-800">{totalCoinsReceived.toLocaleString()}</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-400 font-bold text-xs uppercase">
              <tr>
                <th className="p-4">Transaction ID</th>
                <th className="p-4">User ID</th>
                <th className="p-4">User Name</th>
                <th className="p-4">Type</th>
                <th className="p-4">Coins Added</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4 text-right">Available Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactionHistory.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-slate-500">
                    <Receipt className="w-8 h-8 sm:w-10 sm:h-10 text-slate-300 mx-auto mb-3" />
                    <div className="text-sm font-bold">No records found</div>
                  </td>
                </tr>
              ) : (
                transactionHistoryWithBalance.map((record) => (
                  <tr
                    key={record.transactionId}
                    className="hover:bg-slate-50/50 cursor-pointer transition-colors"
                    onClick={() => {
                      setSelectedRechargeRecord({
                        transactionId: record.transactionId,
                        userId: record.userId,
                        userName: record.userName,
                        rechargeType: record.type,
                        coinsAdded: record.coinsAdded,
                        status: record.status,
                        dateTime: record.dateTime,
                        remarks: record.remarks || '',
                      })
                      setShowRechargeRecordModal(true)
                    }}
                    title="Click to view associated package details"
                  >
                    <td className="p-4 font-mono font-bold text-slate-700">{record.transactionId}</td>
                    <td className="p-4 font-mono text-slate-800">{record.userId}</td>
                    <td className="p-4 font-semibold text-slate-800">{record.userName}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center whitespace-nowrap px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold ${record.type === 'User RC' ? 'bg-blue-100 text-blue-700' : 'bg-[#E51E25]/10 text-[#E51E25]'}`}>
                        {record.type}
                      </span>
                    </td>
                    <td className="p-4 font-mono font-bold">{record.coinsAdded.toLocaleString()}</td>
                    <td className="p-4 text-xs text-slate-500">{record.dateTime}</td>
                    <td className="p-4 font-mono text-slate-800 text-right">{(record.runningBalance || 0).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
