import React from 'react'
import {
  Users,
  Banknote,
  Clock,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  PieChart,
  BarChart3,
  RefreshCw
} from 'lucide-react'
import {
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar
} from 'recharts'

export default function Dashboard({
  rechargeHistory,
  customRechargeRequests,
  agencyWallet,
  setActiveSideTab
}) {
  const totalUsersRecharged = new Set(rechargeHistory.map(r => r.userId)).size
  const today = new Date().toISOString().split('T')[0]
  const todayRecharge = rechargeHistory.filter(r => r.dateTime?.startsWith(today)).length
  const pendingRecharge = customRechargeRequests.filter(r => r.status === 'Pending').length
  const completedRecharge = rechargeHistory.filter(r => r.status === 'Completed').length
  const failedRecharge = rechargeHistory.filter(r => r.status === 'Failed').length
  const agencyStatus = agencyWallet.coins > 100000 ? 'Active' : 'Low Balance'

  const rechargeTypeData = [
    { name: 'Normal Coin', value: rechargeHistory.filter(r => r.rechargeType === 'Normal Coin').length, color: '#3B82F6' },
    { name: 'Blue Diamond', value: rechargeHistory.filter(r => r.rechargeType === 'Blue Diamond').length, color: '#06B6D4' },
    { name: 'Green Diamond', value: rechargeHistory.filter(r => r.rechargeType === 'Green Diamond').length, color: '#10B981' }
  ]

  const dailyRechargeData = [
    { name: 'Mon', value: 15 },
    { name: 'Tue', value: 23 },
    { name: 'Wed', value: 18 },
    { name: 'Thu', value: 29 },
    { name: 'Fri', value: 35 },
    { name: 'Sat', value: 42 },
    { name: 'Sun', value: 38 }
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
        {[
          { label: 'Total Users Recharged', value: totalUsersRecharged, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: "Today's Recharge", value: todayRecharge, icon: Banknote, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Pending Recharge', value: pendingRecharge, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
          { label: 'Completed Recharge', value: completedRecharge, icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50' },
          { label: 'Failed Recharge', value: failedRecharge, icon: XCircle, color: 'text-red-500', bg: 'bg-red-50' },
          { label: 'Agency Status', value: agencyStatus, icon: ShieldCheck, color: agencyStatus === 'Active' ? 'text-green-500' : 'text-red-500', bg: agencyStatus === 'Active' ? 'bg-green-50' : 'bg-red-50' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-3 sm:p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center gap-1">
            <div className="flex items-center gap-2 mb-1">
              <div className={`p-1.5 sm:p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
            <div className="text-lg sm:text-2xl font-black text-slate-800 truncate">{stat.value}</div>
            <div className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-6">
          <h4 className="font-extrabold text-slate-800 flex items-center gap-2 mb-4 sm:mb-6 text-sm sm:text-base"><PieChart className="w-4 h-4 sm:w-5 sm:h-5 text-[#E51E25]" /> Recharge Types</h4>
          <div className="h-48 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={rechargeTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={60}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {rechargeTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, 'Recharges']} />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value) => <span className="text-[10px] sm:text-xs font-semibold text-slate-600">{value}</span>}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-6">
          <h4 className="font-extrabold text-slate-800 flex items-center gap-2 mb-4 sm:mb-6 text-sm sm:text-base"><BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-[#E51E25]" /> Daily Recharge Trend</h4>
          <div className="h-48 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyRechargeData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip formatter={(value) => [value, 'Recharges']} />
                <Bar dataKey="value" fill="#E51E25" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Manual Recharges */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex justify-between items-center">
          <h4 className="font-extrabold text-slate-800 flex items-center gap-2 text-sm sm:text-base">
            <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 text-[#E51E25]" /> Recent Manual Recharges
          </h4>
          <button 
            onClick={() => setActiveSideTab('recharge_history')} 
            className="text-xs font-bold text-[#E51E25] hover:underline"
          >
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-400 font-bold text-[10px] sm:text-xs uppercase">
              <tr>
                <th className="p-3 sm:p-4">Transaction ID</th>
                <th className="p-3 sm:p-4">User ID</th>
                <th className="p-3 sm:p-4">User Name</th>
                <th className="p-3 sm:p-4">Recharge Type</th>
                <th className="p-3 sm:p-4">Coins</th>
                <th className="p-3 sm:p-4">Status</th>
                <th className="p-3 sm:p-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rechargeHistory.slice(0, 5).map((record, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-3 sm:p-4 font-mono text-slate-600">{record.transactionId}</td>
                  <td className="p-3 sm:p-4 font-semibold text-slate-800">{record.userId}</td>
                  <td className="p-3 sm:p-4 text-slate-600">{record.userName}</td>
                  <td className="p-3 sm:p-4 text-slate-600">{record.rechargeType}</td>
                  <td className="p-3 sm:p-4 font-mono font-bold text-[#E51E25]">{record.coinsAdded.toLocaleString()}</td>
                  <td className="p-3 sm:p-4">
                    <span className={`px-2 py-1 rounded-lg text-[10px] sm:text-xs font-bold ${
                      record.status === 'Completed' ? 'bg-green-50 text-green-600' :
                      record.status === 'Pending' ? 'bg-amber-50 text-amber-600' :
                      record.status === 'Failed' ? 'bg-red-50 text-red-600' :
                      'bg-slate-50 text-slate-600'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="p-3 sm:p-4 text-slate-500 text-[10px] sm:text-xs">{record.dateTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
