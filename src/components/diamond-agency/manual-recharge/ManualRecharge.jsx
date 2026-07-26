import React from 'react'
import { CheckCircle2, History } from 'lucide-react'

export default function ManualRecharge({
  manualRechargeForm,
  setManualRechargeForm,
  showManualRechargeConfirm,
  setShowManualRechargeConfirm,
  manualRechargeSuccess,
  setManualRechargeSuccess,
  agencyWallet,
  setAgencyWallet,
  userWallets,
  setUserWallets,
  rechargeHistory,
  setRechargeHistory,
  setNotifications,
  setActiveSideTab,
}) {
  const handleManualRechargeSubmit = (e) => {
    e.preventDefault()

    if (!manualRechargeForm.userId || !manualRechargeForm.coinAmount) {
      alert('User ID and Coin Amount are required.')
      return
    }

    if (Number(manualRechargeForm.coinAmount) <= 0) {
      alert('Coin Amount must be greater than 0.')
      return
    }

    setShowManualRechargeConfirm(true)
  }

  const handleManualRechargeConfirm = () => {
    const coinsToRecharge = Number(manualRechargeForm.coinAmount)
    const userId = Number(manualRechargeForm.userId)

    if (agencyWallet.coins < coinsToRecharge) {
      alert('Insufficient coins in Agency Wallet!')
      setShowManualRechargeConfirm(false)
      return
    }

    setAgencyWallet((prev) => ({ coins: prev.coins - coinsToRecharge }))

    setUserWallets((prev) =>
      prev.map((user) => {
        if (user.id === userId) {
          return { ...user, coins: user.coins + coinsToRecharge }
        }
        return user
      })
    )

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
        minute: '2-digit',
      }).replace(',', ''),
      remarks: manualRechargeForm.remarks || 'Manual recharge',
    }

    setRechargeHistory((prev) => [newTransaction, ...prev])

    setManualRechargeSuccess({
      userId: manualRechargeForm.userId,
      userName: manualRechargeForm.userName,
      coins: coinsToRecharge,
      rechargeType: manualRechargeForm.rechargeType,
    })

    setManualRechargeForm({
      agencyId: 'AG-001',
      agencyName: 'Diamond Agency',
      userId: '',
      userName: '',
      accountType: '',
      coinAmount: '',
      rechargeType: 'Normal Coin',
      remarks: '',
    })
    setShowManualRechargeConfirm(false)
  }

  const handleManualRechargeCancel = () => {
    setShowManualRechargeConfirm(false)
  }

  return (
    <div className="space-y-4 sm:space-y-6 max-w-2xl">
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
                    setNotifications((prev) => [
                      {
                        id: Date.now(),
                        type: 'system',
                        title: 'Recharge Dispute Filed',
                        message: `User ${manualRechargeSuccess.userName} (ID: ${manualRechargeSuccess.userId}) has filed a dispute for ${manualRechargeSuccess.coins.toLocaleString()} coins recharge.`,
                        time: 'Just now',
                        read: false,
                      },
                      ...prev,
                    ])
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
                value={manualRechargeForm?.agencyId || ''}
                readOnly
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-slate-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-[10px] sm:text-xs font-bold text-slate-600 mb-2">Agency Name (Auto)</label>
              <input
                type="text"
                value={manualRechargeForm?.agencyName || ''}
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
              value={manualRechargeForm?.userId || ''}
              onChange={(e) => {
                setManualRechargeForm({ ...manualRechargeForm, userId: e.target.value })
                const user = userWallets.find((u) => u.id === Number(e.target.value))
                if (user) {
                  setManualRechargeForm((prev) => ({ ...prev, userName: user.name, accountType: user.accountType }))
                } else {
                  setManualRechargeForm((prev) => ({ ...prev, userName: '', accountType: '' }))
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
                value={manualRechargeForm?.userName || ''}
                readOnly
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-slate-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-[10px] sm:text-xs font-bold text-slate-600 mb-2">Account Type</label>
              <select
                value={manualRechargeForm?.accountType || ''}
                onChange={(e) => setManualRechargeForm({ ...manualRechargeForm, accountType: e.target.value })}
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
              value={manualRechargeForm?.coinAmount || ''}
              onChange={(e) => setManualRechargeForm({ ...manualRechargeForm, coinAmount: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
            />
          </div>

          <div>
            <label className="block text-[10px] sm:text-xs font-bold text-slate-600 mb-2">Recharge Type</label>
            <select
              value={manualRechargeForm?.rechargeType || 'Normal Coin'}
              onChange={(e) => setManualRechargeForm({ ...manualRechargeForm, rechargeType: e.target.value })}
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
              onChange={(e) => setManualRechargeForm({ ...manualRechargeForm, remarks: e.target.value })}
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
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        rec.status === 'Completed'
                          ? 'bg-green-100 text-green-700'
                          : rec.status === 'Pending'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {rec.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
}
