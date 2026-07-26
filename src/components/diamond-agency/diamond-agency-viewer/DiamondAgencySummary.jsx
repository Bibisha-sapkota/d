import React from 'react'
import { ShieldCheck, Users, Banknote, Gem } from 'lucide-react'

const summaryMetrics = [
  { label: 'Active Agencies', value: '28', icon: Users, bg: 'bg-sky-50', color: 'text-sky-500' },
  { label: 'Monthly Revenue', value: '₹ 12.4L', icon: Banknote, bg: 'bg-emerald-50', color: 'text-emerald-500' },
  { label: 'Diamond Balance', value: '63,200', icon: Gem, bg: 'bg-amber-50', color: 'text-amber-500' },
  { label: 'Platform Health', value: 'Stable', icon: ShieldCheck, bg: 'bg-lime-50', color: 'text-lime-500' }
]

export default function DiamondAgencySummary() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
        <div className="bg-gradient-to-r from-[#E51E25] via-[#dc2626] to-[#f97316] px-6 py-7 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] font-bold text-white/80">Diamond Agency Snapshot</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight">Agency performance at a glance</h2>
              <p className="mt-3 text-sm text-white/80 max-w-2xl">Track agency expansion, revenue growth, and diamond balance for your core distribution team.</p>
            </div>
            <div className="rounded-3xl bg-white/10 border border-white/15 px-4 py-3 text-sm font-semibold text-white backdrop-blur">
              <span>Updated just now</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {summaryMetrics.map((metric) => (
          <div key={metric.label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className={`inline-flex rounded-2xl p-3 ${metric.bg}`}> 
              <metric.icon className={`w-5 h-5 ${metric.color}`} />
            </div>
            <p className="mt-5 text-sm font-semibold text-slate-500">{metric.label}</p>
            <p className="mt-2 text-2xl font-black text-slate-900">{metric.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
