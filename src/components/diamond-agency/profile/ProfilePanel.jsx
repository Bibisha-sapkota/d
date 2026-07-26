import React from 'react'
import { User, Edit, Eye, EyeOff, Lock, CheckCircle2 } from 'lucide-react'

export default function ProfilePanel({
  profile,
  setProfile,
  showAgencyPin,
  setShowAgencyPin,
  showCustomerPin,
  setShowCustomerPin,
  passwordForm,
  setPasswordForm,
  passwordSuccess,
  setPasswordSuccess
}) {
  const handlePasswordChange = (e) => {
    e.preventDefault()

    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      alert('Please fill all password fields!')
      return
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New password and confirm password do not match!')
      return
    }

    if (passwordForm.newPassword.length < 6) {
      alert('Password must be at least 6 characters!')
      return
    }

    setPasswordSuccess(true)
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })

    setTimeout(() => setPasswordSuccess(false), 3000)
  }

  const handleProfileUpdate = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-4 sm:space-y-6 max-w-2xl">
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4 sm:space-y-6">
        <div>
          <h4 className="font-extrabold text-slate-800 flex items-center gap-2 text-base sm:text-lg">
            <User className="w-4 h-4 sm:w-5 sm:h-5 text-[#E51E25]" /> Profile
          </h4>
          <p className="text-[10px] sm:text-xs text-slate-500 mt-1">Manage your agency profile information.</p>
        </div>

        <div className="space-y-4 sm:space-y-5">
          <div>
            <label className="block text-[10px] sm:text-xs font-bold text-slate-600 mb-2">Agency ID</label>
            <input
              type="text"
              value={profile.agencyId}
              readOnly
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-slate-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-[10px] sm:text-xs font-bold text-slate-600 mb-2">Agency Name</label>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={profile.agencyName}
                readOnly
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-slate-500 cursor-not-allowed"
              />
              <button
                type="button"
                onClick={() => {
                  const val = prompt('Enter new Agency Name:', profile.agencyName)
                  if (val !== null) handleProfileUpdate('agencyName', val)
                }}
                className="bg-[#E51E25] hover:bg-red-600 text-white font-bold px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm rounded-xl transition-colors shrink-0 flex items-center gap-1.5"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[10px] sm:text-xs font-bold text-slate-600 mb-2">Contact Number</label>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={profile.contactNumber}
                readOnly
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-slate-500 cursor-not-allowed"
              />
              <button
                type="button"
                onClick={() => {
                  const val = prompt('Enter new Contact Number:', profile.contactNumber)
                  if (val !== null) handleProfileUpdate('contactNumber', val)
                }}
                className="bg-[#E51E25] hover:bg-red-600 text-white font-bold px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm rounded-xl transition-colors shrink-0 flex items-center gap-1.5"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[10px] sm:text-xs font-bold text-slate-600 mb-2">Email</label>
            <div className="flex gap-2 items-center">
              <input
                type="email"
                value={profile.email}
                readOnly
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-slate-500 cursor-not-allowed"
              />
              <button
                type="button"
                onClick={() => {
                  const val = prompt('Enter new Email:', profile.email)
                  if (val !== null) handleProfileUpdate('email', val)
                }}
                className="bg-[#E51E25] hover:bg-red-600 text-white font-bold px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm rounded-xl transition-colors shrink-0 flex items-center gap-1.5"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[10px] sm:text-xs font-bold text-slate-600 mb-2">KYC Status</label>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                profile.kycStatus === 'Verified'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-amber-100 text-amber-700'
              }`}>
                {profile.kycStatus}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-[10px] sm:text-xs font-bold text-slate-600 mb-2">Agency PIN</label>
              <div className="flex gap-2 items-center">
                <div className="relative flex-1 flex items-center">
                  <input
                    type={showAgencyPin ? 'text' : 'password'}
                    value={profile.agencyPin}
                    readOnly
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-3 sm:pl-4 pr-10 py-2 sm:py-3 text-xs sm:text-sm font-mono font-bold text-slate-800 focus:outline-none cursor-not-allowed"
                  />
                  <button
                    type="button"
                    onClick={() => setShowAgencyPin(!showAgencyPin)}
                    className="absolute right-3 text-slate-400 hover:text-[#E51E25] transition-colors"
                    title={showAgencyPin ? 'Hide PIN' : 'Show PIN'}
                  >
                    {showAgencyPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const val = prompt('Enter new Agency PIN:', profile.agencyPin)
                    if (val !== null) handleProfileUpdate('agencyPin', val)
                  }}
                  className="bg-[#E51E25] hover:bg-red-600 text-white font-bold px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm rounded-xl transition-colors shrink-0 flex items-center gap-1.5"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[10px] sm:text-xs font-bold text-slate-600 mb-2">Customer PIN</label>
              <div className="flex gap-2 items-center">
                <div className="relative flex-1 flex items-center">
                  <input
                    type={showCustomerPin ? 'text' : 'password'}
                    value={profile.customerPin}
                    readOnly
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-3 sm:pl-4 pr-10 py-2 sm:py-3 text-xs sm:text-sm font-mono font-bold text-slate-800 focus:outline-none cursor-not-allowed"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCustomerPin(!showCustomerPin)}
                    className="absolute right-3 text-slate-400 hover:text-blue-600 transition-colors"
                    title={showCustomerPin ? 'Hide PIN' : 'Show PIN'}
                  >
                    {showCustomerPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const val = prompt('Enter new Customer PIN:', profile.customerPin)
                    if (val !== null) handleProfileUpdate('customerPin', val)
                  }}
                  className="bg-[#E51E25] hover:bg-red-600 text-white font-bold px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm rounded-xl transition-colors shrink-0 flex items-center gap-1.5"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4 sm:space-y-6">
        <div>
          <h4 className="font-extrabold text-slate-800 flex items-center gap-2 text-base sm:text-lg">
            <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-[#E51E25]" /> Password Change
          </h4>
          <p className="text-[10px] sm:text-xs text-slate-500 mt-1">Update your account password.</p>
        </div>

        {passwordSuccess && (
          <div className="bg-green-50 border border-green-200 p-3 sm:p-4 rounded-xl">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
              <span className="text-xs sm:text-sm font-bold text-green-800">Password changed successfully!</span>
            </div>
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-4 sm:space-y-5">
          <div>
            <label className="block text-[10px] sm:text-xs font-bold text-slate-600 mb-2">Current Password</label>
            <input
              type="password"
              placeholder="Enter current password"
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
            />
          </div>
          <div>
            <label className="block text-[10px] sm:text-xs font-bold text-slate-600 mb-2">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
            />
          </div>
          <div>
            <label className="block text-[10px] sm:text-xs font-bold text-slate-600 mb-2">Confirm New Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
            />
          </div>
          <div className="pt-2">
            <button type="submit" className="w-full bg-[#E51E25] hover:bg-[#c4161c] text-white py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-bold shadow-sm active:scale-[0.98] transition-all flex justify-center items-center gap-2">
              <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
