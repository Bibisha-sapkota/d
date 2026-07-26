import React from 'react'
import { TrendingUp, Activity, Globe } from 'lucide-react'

const agencyPerformance = [
  { name: 'Alpha Agency', score: 92, revenue: '₹ 5.8L' },
  { name: 'Sagar Streamers', score: 84, revenue: '₹ 3.2L' },
  { name: 'Royal Gaming', score: 71, revenue: '₹ 2.6L' }
]

export default function DiamondAgencyPerformance() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400 font-bold">Performance</p>
          <h3 className="mt-3 text-xl font-extrabold text-slate-900">Top agencies this month</h3>
        </div>
        <div className="rounded-2xl bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">Live score</div>
      </div>

      <div className="mt-6 space-y-4">
        {agencyPerformance.map((agency) => (
          <div key={agency.name} className="rounded-3xl border border-slate-100 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-900">{agency.name}</p>
                <p className="text-xs text-slate-500">Revenue {agency.revenue}</p>
              </div>
              <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-[#E51E25]">{agency.score}%</span>
            </div>
            <div className="mt-4 h-2 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-[#E51E25] to-orange-400" style={{ width: `${agency.score}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-3xl bg-slate-50 p-4 border border-slate-100">
        <div className="flex items-center gap-3 text-slate-700 font-semibold">
          <Activity className="w-4 h-4 text-[#E51E25]" />
          Realtime engagement is up by 14% compared to last week.
        </div>
      </div>
    </div>
  )
}
