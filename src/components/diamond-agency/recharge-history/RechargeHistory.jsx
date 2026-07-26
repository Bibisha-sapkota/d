import React from 'react'
import { History } from 'lucide-react'

export default function RechargeHistory({
  rechargeHistory,
  historyFilters,
  setHistoryFilters,
  setSelectedRechargeRecord,
  setShowRechargeRecordModal,
}) {
  const filterRechargeHistory = () => {
    if (!rechargeHistory || !Array.isArray(rechargeHistory)) return []
    return rechargeHistory.filter((record) => {
      let matchesDate = true
      const recordDate = new Date(record.dateTime.split(' ')[0])
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (historyFilters.dateFilter === 'today') {
        const todayDate = new Date()
        todayDate.setHours(0, 0, 0, 0)
        matchesDate = recordDate.toDateString() === todayDate.toDateString()
      } else if (historyFilters.dateFilter === 'yesterday') {
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)
        matchesDate = recordDate.toDateString() === yesterday.toDateString()
      } else if (historyFilters.dateFilter === 'week') {
        const weekAgo = new Date(today)
        weekAgo.setDate(weekAgo.getDate() - 7)
        matchesDate = recordDate >= weekAgo
      } else if (historyFilters.dateFilter === 'custom' && historyFilters.customDate) {
        const customDate = new Date(historyFilters.customDate)
        matchesDate = recordDate.toDateString() === customDate.toDateString()
      }

      const matchesStatus = historyFilters.statusFilter === 'all' || record.status === historyFilters.statusFilter
      const matchesUserId = !historyFilters.userIdFilter || record.userId.includes(historyFilters.userIdFilter)

      return matchesDate && matchesStatus && matchesUserId
    })
  }

  const filteredHistory = filterRechargeHistory()

  const getHistoryStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-100 text-amber-700'
      case 'Completed':
        return 'bg-green-100 text-green-700'
      case 'Failed':
        return 'bg-red-100 text-red-700'
      case 'Refunded':
        return 'bg-slate-100 text-slate-700'
      default:
        return 'bg-slate-100 text-slate-700'
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3 sm:mb-4">
        <h4 className="font-extrabold text-slate-800 text-base sm:text-lg flex items-center gap-2">
          <History className="w-4 h-4 sm:w-5 sm:h-5 text-[#E51E25]" /> Recharge History
        </h4>
      </div>

      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label className="block text-[10px] sm:text-xs font-bold text-slate-600 mb-2">Date Filter</label>
            <select
              value={historyFilters.dateFilter}
              onChange={(e) => setHistoryFilters({ ...historyFilters, dateFilter: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="week">This Week</option>
              <option value="custom">Custom Date</option>
            </select>
          </div>

          {historyFilters.dateFilter === 'custom' && (
            <div>
              <label className="block text-[10px] sm:text-xs font-bold text-slate-600 mb-2">Select Date</label>
              <input
                type="date"
                value={historyFilters.customDate}
                onChange={(e) => setHistoryFilters({ ...historyFilters, customDate: e.target.value })}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
              />
            </div>
          )}

          <div>
            <label className="block text-[10px] sm:text-xs font-bold text-slate-600 mb-2">Status</label>
            <select
              value={historyFilters.statusFilter}
              onChange={(e) => setHistoryFilters({ ...historyFilters, statusFilter: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Failed">Failed</option>
              <option value="Refunded">Refunded</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] sm:text-xs font-bold text-slate-600 mb-2">User ID</label>
            <input
              type="text"
              placeholder="Enter User ID"
              value={historyFilters.userIdFilter}
              onChange={(e) => setHistoryFilters({ ...historyFilters, userIdFilter: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-400 font-bold text-xs uppercase">
              <tr>
                <th className="p-4">Transaction ID</th>
                <th className="p-4">Recharge ID</th>
                <th className="p-4">User ID</th>
                <th className="p-4">User Name</th>
                <th className="p-4">Recharge Type</th>
                <th className="p-4">Coins Added</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredHistory.length === 0 ? (
                <tr>
                  <td colSpan="9" className="p-8 text-center text-slate-500">
                    <History className="w-8 h-8 sm:w-10 sm:h-10 text-slate-300 mx-auto mb-3" />
                    <div className="text-sm font-bold">No records found</div>
                  </td>
                </tr>
              ) : (
                filteredHistory.map((record) => (
                  <tr
                    key={record.transactionId}
                    className="hover:bg-slate-50/50 cursor-pointer transition-colors"
                    onClick={() => {
                      setSelectedRechargeRecord(record)
                      setShowRechargeRecordModal(true)
                    }}
                    title="Click to view associated package details"
                  >
                    <td className="p-4 font-mono font-bold text-slate-700">{record.transactionId}</td>
                    <td className="p-4 font-mono">{record.rechargeId}</td>
                    <td className="p-4 font-mono">{record.userId}</td>
                    <td className="p-4 font-semibold text-slate-800">{record.userName}</td>
                    <td className="p-4">{record.rechargeType}</td>
                    <td className="p-4 font-mono font-bold">{record.coinsAdded.toLocaleString()}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-lg text-[10px] sm:text-xs font-bold ${getHistoryStatusBadge(record.status)}`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-slate-500">{record.dateTime}</td>
                    <td className="p-4 text-xs text-slate-600">{record.remarks}</td>
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
