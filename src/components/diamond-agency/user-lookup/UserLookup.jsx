import React from 'react'
import { Search, User } from 'lucide-react'

export default function UserLookup({
  userLookupSearch,
  setUserLookupSearch,
  userLookupResult,
  setUserLookupResult,
  userWallets,
  rechargeHistory,
}) {
  const handleUserLookup = (e) => {
    e.preventDefault()

    if (!userLookupSearch.trim()) {
      alert('Please enter a User ID to search!')
      return
    }

    const user = userWallets.find((u) => u.id === Number(userLookupSearch))

    if (user) {
      const userRecharges = rechargeHistory.filter((r) => r.userId === userLookupSearch)
      const lastRecharge = userRecharges.length > 0
        ? userRecharges.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))[0].dateTime
        : 'No recharge history'

      setUserLookupResult({
        userId: user.id,
        userName: user.name,
        accountStatus: 'Active',
        lastRechargeDate: lastRecharge,
      })
    } else {
      setUserLookupResult(null)
      alert('User not found!')
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6 max-w-2xl">
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4 sm:space-y-6">
        <div>
          <h4 className="font-extrabold text-slate-800 flex items-center gap-2 text-base sm:text-lg">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#E51E25]" /> User Lookup
          </h4>
          <p className="text-[10px] sm:text-xs text-slate-500 mt-1">Search for user information by User ID.</p>
        </div>

        <form onSubmit={handleUserLookup} className="space-y-4 sm:space-y-5">
          <div>
            <label className="block text-[10px] sm:text-xs font-bold text-slate-600 mb-2">User ID</label>
            <input
              type="text"
              placeholder="Enter User ID"
              value={userLookupSearch}
              onChange={(e) => setUserLookupSearch(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
            />
          </div>
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#E51E25] hover:bg-[#c4161c] text-white py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-bold shadow-sm active:scale-[0.98] transition-all flex justify-center items-center gap-2"
            >
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Search
            </button>
          </div>
        </form>
      </div>

      {userLookupResult && (
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-800 text-sm sm:text-base">User Found</h4>
              <p className="text-[10px] sm:text-xs text-slate-500">User information retrieved successfully</p>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div className="flex justify-between items-center py-2 sm:py-3 border-b border-slate-100">
              <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">User ID</span>
              <span className="text-xs sm:text-sm font-mono font-bold text-slate-800">{userLookupResult.userId}</span>
            </div>
            <div className="flex justify-between items-center py-2 sm:py-3 border-b border-slate-100">
              <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">User Name</span>
              <span className="text-xs sm:text-sm font-semibold text-slate-800">{userLookupResult.userName}</span>
            </div>
            <div className="flex justify-between items-center py-2 sm:py-3 border-b border-slate-100">
              <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Account Status</span>
              <span className="px-3 py-1 rounded-lg text-[10px] sm:text-xs font-bold bg-green-100 text-green-700">{userLookupResult.accountStatus}</span>
            </div>
            <div className="flex justify-between items-center py-2 sm:py-3">
              <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Last Recharge Date</span>
              <span className="text-xs sm:text-sm text-slate-600">{userLookupResult.lastRechargeDate}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
