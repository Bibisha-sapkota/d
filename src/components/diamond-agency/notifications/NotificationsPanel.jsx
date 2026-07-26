import React from 'react'
import { Bell, CheckCircle2, XCircle, Award, AlertTriangle } from 'lucide-react'

export default function NotificationsPanel({
  notifications = [],
  setNotifications,
  notificationFilter,
  setNotificationFilter
}) {
  const filteredNotifications = notificationFilter === 'all'
    ? notifications
    : notifications.filter((n) => n.type === notificationFilter)

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'recharge_approved':
        return <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
      case 'recharge_failed':
        return <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
      case 'custom_recharge_approved':
        return <Award className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
      case 'system':
        return <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
      default:
        return <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
    }
  }

  const getNotificationColor = (type) => {
    switch (type) {
      case 'recharge_approved':
        return 'bg-green-50 border-green-200'
      case 'recharge_failed':
        return 'bg-red-50 border-red-200'
      case 'custom_recharge_approved':
        return 'bg-blue-50 border-blue-200'
      case 'system':
        return 'bg-amber-50 border-amber-200'
      default:
        return 'bg-white border-slate-100'
    }
  }

  const markAsRead = (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3 sm:mb-4">
        <h4 className="font-extrabold text-slate-800 text-base sm:text-lg flex items-center gap-2">
          <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-[#E51E25]" /> Notifications
        </h4>
        <button
          onClick={markAllAsRead}
          className="text-[10px] sm:text-xs font-bold text-[#E51E25] hover:underline"
        >
          Mark all as read
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {[
          { value: 'all', label: 'All' },
          { value: 'recharge_approved', label: 'Recharge Approved' },
          { value: 'recharge_failed', label: 'Recharge Failed' },
          { value: 'custom_recharge_approved', label: 'Custom Recharge Approved' },
          { value: 'system', label: 'System' }
        ].map((filter) => (
          <button
            key={filter.value}
            onClick={() => setNotificationFilter(filter.value)}
            className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold transition-all ${
              notificationFilter === filter.value
                ? 'bg-[#E51E25] text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="space-y-2 sm:space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm text-center">
            <Bell className="w-8 h-8 sm:w-10 sm:h-10 text-slate-300 mx-auto mb-3" />
            <div className="text-sm font-bold text-slate-500">No notifications found</div>
          </div>
        ) : (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all flex items-start gap-3 sm:gap-4 ${notif.read ? 'bg-white border-slate-100 shadow-sm' : getNotificationColor(notif.type)}`}
            >
              <div className="shrink-0 mt-0.5">
                {getNotificationIcon(notif.type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div className="font-bold text-slate-800 text-xs sm:text-sm">{notif.title}</div>
                  <div className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider">{notif.time}</div>
                </div>
                <div className="text-xs sm:text-sm text-slate-600 mt-1">{notif.message}</div>
                {!notif.read && (
                  <button
                    onClick={() => markAsRead(notif.id)}
                    className="mt-2 sm:mt-3 text-[10px] sm:text-xs font-bold text-[#E51E25] bg-red-100 px-2 sm:px-3 py-1 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    Mark as read
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
