import React from 'react'
import { Send, CheckCircle2 } from 'lucide-react'

export default function UserCoinRecharge({
  coinTransferForm,
  setCoinTransferForm,
  showTransferConfirmation,
  transferSuccess,
  setTransferSuccess,
  setNotifications,
  handleCoinTransferSubmit,
  handleCoinTransferConfirm,
  handleCoinTransferCancel
}) {
  return (
    <div className="space-y-4 sm:space-y-6 max-w-2xl">
      {transferSuccess && (
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
                <span className="text-slate-500 text-sm">Transferred To</span>
                <span className="font-semibold text-slate-800 text-sm">{transferSuccess.userName}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-500 text-sm">Coin Type</span>
                <span className="font-semibold text-slate-800 text-sm">{transferSuccess.coinType}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-500 text-sm">Status</span>
                <span className="px-2 py-1 rounded-lg text-xs font-bold bg-green-50 text-green-600">Completed</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-500 text-sm">Transfer Type</span>
                <span className="font-semibold text-slate-800 text-sm">{transferSuccess.transferType}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-500 text-sm">Time</span>
                <span className="font-semibold text-slate-800 text-sm">{transferSuccess.timestamp}</span>
              </div>
              <div className="flex justify-between items-center py-4">
                <span className="text-slate-500 text-sm">Amount</span>
                <span className="font-bold text-green-600 text-2xl">{transferSuccess.coins.toLocaleString()}</span>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => {
                    setNotifications(prev => [{
                      id: Date.now(),
                      type: 'system',
                      title: 'Transfer Dispute Filed',
                      message: `User ${transferSuccess.userName} (ID: ${transferSuccess.userId}) has filed a dispute for ${transferSuccess.coins.toLocaleString()} coins transfer.`,
                      time: 'Just now',
                      read: false
                    }, ...prev])
                    setTransferSuccess(null)
                  }}
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl text-sm font-bold shadow-sm active:scale-[0.98] transition-all"
                >
                  Dispute
                </button>
                <button
                  onClick={() => setTransferSuccess(null)}
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
          <h4 className="font-extrabold text-slate-800 text-base sm:text-lg">User Coin Recharge</h4>
          <p className="text-[10px] sm:text-xs text-slate-500 mt-1">Recharge user wallet with coins directly from Agency Wallet balance.</p>
        </div>

        <form onSubmit={handleCoinTransferSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <label className="block text-[10px] sm:text-xs font-bold text-slate-600 mb-2">User ID</label>
            <input
              type="text"
              placeholder="Enter User ID"
              required
              value={coinTransferForm.userId}
              onChange={e => {
                setCoinTransferForm({ ...coinTransferForm, userId: e.target.value })
              }}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
            />
          </div>
          <div>
            <label className="block text-[10px] sm:text-xs font-bold text-slate-600 mb-2">User Name</label>
            <input
              type="text"
              placeholder="Enter user name"
              value={coinTransferForm.userName}
              onChange={e => setCoinTransferForm({ ...coinTransferForm, userName: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
            />
          </div>
          <div>
            <label className="block text-[10px] sm:text-xs font-bold text-slate-600 mb-2">Coin Amount</label>
            <input
              type="number"
              placeholder="Enter coin amount"
              required
              min="1"
              value={coinTransferForm.coinAmount}
              onChange={e => setCoinTransferForm({ ...coinTransferForm, coinAmount: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
            />
          </div>
          <div>
            <label className="block text-[10px] sm:text-xs font-bold text-slate-600 mb-2">Type of RC</label>
            <select
              value={coinTransferForm.coinType}
              onChange={e => setCoinTransferForm({ ...coinTransferForm, coinType: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
            >
              <option value="Coin">Coin</option>
              <option value="Blue Diamond">Blue Diamond 💎</option>
              <option value="Green Diamond">Green Diamond 💎</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] sm:text-xs font-bold text-slate-600 mb-2">Transfer Type</label>
            <select
              value={coinTransferForm.transferType}
              onChange={e => setCoinTransferForm({ ...coinTransferForm, transferType: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
            >
              <option value="instant">Instant Transfer</option>
              <option value="scheduled">Scheduled Transfer</option>
              <option value="bulk">Bulk Transfer</option>
            </select>
          </div>
          <div className="pt-2 flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-[#E51E25] hover:bg-[#c4161c] text-white py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-bold shadow-sm active:scale-[0.98] transition-all flex justify-center items-center gap-2"
            >
              <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Confirm
            </button>
            <button
              type="button"
              onClick={() => setCoinTransferForm({ userId: '', userName: '', coinAmount: '', coinType: 'Coin', transferType: 'instant' })}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-bold shadow-sm active:scale-[0.98] transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {showTransferConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
            <div className="text-center">
              <h4 className="font-extrabold text-slate-800 text-lg sm:text-xl mb-2">Confirm Transfer</h4>
              <p className="text-slate-600 text-sm sm:text-base mb-6">
                Are you sure you want to transfer <span className="font-bold text-[#E51E25]">{Number(coinTransferForm.coinAmount).toLocaleString()} Coins</span> to User <span className="font-bold">{coinTransferForm.userName}</span> (ID: {coinTransferForm.userId})?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleCoinTransferConfirm}
                  className="flex-1 bg-[#E51E25] hover:bg-[#c4161c] text-white py-3 rounded-xl text-sm font-bold shadow-sm active:scale-[0.98] transition-all"
                >
                  Yes, Transfer
                </button>
                <button
                  onClick={handleCoinTransferCancel}
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
