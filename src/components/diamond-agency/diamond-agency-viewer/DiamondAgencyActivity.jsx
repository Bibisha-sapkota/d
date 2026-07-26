import React from 'react'
import { Clock, Bell } from 'lucide-react'

const recentActivity = [
  { time: '09:12 AM', event: 'Diamond shipment assigned', detail: 'Alpha Agency received 25,000 diamonds.' },
  { time: '08:45 AM', event: 'Revenue milestone reached', detail: 'Sagar Streamers crossed ₹3L in monthly revenue.' },
  { time: 'Yesterday', event: 'Security audit passed', detail: 'Platform checks completed with zero findings.' }
]

export default function DiamondAgencyActivity() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400 font-bold">Activity</p>
          <h3 className="mt-3 text-xl font-extrabold text-slate-900">Recent updates</h3>
        </div>
        <button className="rounded-2xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200">View all</button>
      </div>

      <div className="mt-6 space-y-4">
        {recentActivity.map((activity) => (
          <div key={`${activity.time}-${activity.event}`} className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-900">{activity.event}</p>
                <p className="text-xs text-slate-500">{activity.detail}</p>
              </div>
              <span className="text-[11px] font-semibold text-slate-500">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-3xl bg-[#FEF3F2] p-4 border border-[#FECACA]">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#B91C1C]"><Bell className="w-4 h-4" /> New campaign planned for next week.</div>
      </div>
    </div>
  )
}
