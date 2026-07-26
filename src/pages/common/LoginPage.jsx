import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import coinLogo from "../../assets/coin-logo.png";
import {
  Users,
  BarChart3,
  Wallet,
  ShieldCheck,
  Globe,
  Building2,
  ChevronDown,
  Lock,
  Eye,
  EyeOff,
  ChevronRight,
  Smartphone,
  MessageSquare,
} from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("mobile");
  const [mobileNumber, setMobileNumber] = useState("");
  const [agencyId, setAgencyId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetInput, setResetInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login and redirect
    navigate("/diamond-agency/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#FFF0F0] relative overflow-hidden flex flex-col font-sans text-gray-800">
      {/* Dynamic Background with Red Waves and Center Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-500/20 via-transparent to-transparent opacity-80 mix-blend-multiply" />
        
        {/* Abstract Waves (Simulated with curved divs) */}
        <div className="absolute bottom-0 left-0 w-full h-[60vh] bg-gradient-to-t from-red-600 to-transparent opacity-90 blur-xl" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 40%, 0 80%)' }} />
        <div className="absolute bottom-0 right-0 w-full h-[50vh] bg-gradient-to-t from-[#B20000] to-transparent opacity-80 blur-2xl" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 10%, 0 90%)' }} />
        
        {/* Glowing Center Logo Area */}
        <div className="absolute top-1/2 left-[45%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <div className="absolute w-[450px] h-[450px] bg-yellow-500/20 rounded-full blur-[80px]" />
          <div className="absolute w-[300px] h-[300px] bg-yellow-600/30 rounded-full blur-[60px]" />
          <img src={coinLogo} alt="eRupai Coin Logo" className="relative z-10 w-80 h-80 object-contain drop-shadow-[0_0_30px_rgba(234,179,8,0.5)]" />
        </div>
      </div>

      {/* Header / Logo */}
      <div className="relative z-10 w-full p-6 flex justify-between items-start">
        <div className="flex items-center gap-2">
          <img src={coinLogo} alt="Logo" className="w-12 h-12 object-contain drop-shadow-md" />
          <div className="flex flex-col leading-none">
            <span className="text-2xl font-bold text-red-600 italic">eRupai</span>
            <span className="text-[10px] font-bold text-red-700 tracking-widest bg-red-100 px-1 rounded-sm w-fit mt-0.5">PANEL</span>
          </div>
        </div>

        <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm text-sm font-medium border border-red-100 hover:bg-gray-50 transition-colors">
          <Globe className="w-4 h-4 text-red-600" />
          <span>English</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-6 lg:px-12">
        
        {/* Left Side Content */}
        <div className="w-full lg:w-5/12 pt-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-1">
            Welcome Back,
          </h2>
          <h1 className="text-5xl lg:text-6xl font-extrabold text-[#990000] mb-4">
            Diamond Agency
          </h1>
          <p className="text-gray-600 text-lg mb-8 max-w-md">
            Login to access your dashboard, manage your network and grow your business.
          </p>

          <div className="flex flex-col gap-4">
            {/* Feature 1 */}
            <div className="flex items-center bg-white/80 backdrop-blur-sm p-3 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-white max-w-md transition-transform hover:-translate-y-1">
              <div className="bg-gradient-to-br from-red-500 to-red-700 w-12 h-12 rounded-lg flex items-center justify-center shrink-0 shadow-md">
                <Users className="text-white w-6 h-6" />
              </div>
              <div className="ml-4">
                <h4 className="font-bold text-gray-800 text-base">Manage Agents</h4>
                <p className="text-sm text-gray-500">Add, manage and monitor your agents</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center bg-white/80 backdrop-blur-sm p-3 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-white max-w-md transition-transform hover:-translate-y-1">
              <div className="bg-gradient-to-br from-red-500 to-red-700 w-12 h-12 rounded-lg flex items-center justify-center shrink-0 shadow-md">
                <BarChart3 className="text-white w-6 h-6" />
              </div>
              <div className="ml-4">
                <h4 className="font-bold text-gray-800 text-base">Track Performance</h4>
                <p className="text-sm text-gray-500">Real-time reports and analytics</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center bg-white/80 backdrop-blur-sm p-3 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-white max-w-md transition-transform hover:-translate-y-1">
              <div className="bg-gradient-to-br from-red-500 to-red-700 w-12 h-12 rounded-lg flex items-center justify-center shrink-0 shadow-md">
                <Wallet className="text-white w-6 h-6" />
              </div>
              <div className="ml-4">
                <h4 className="font-bold text-gray-800 text-base">Commission & Payouts</h4>
                <p className="text-sm text-gray-500">View earnings and payout history</p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-center bg-white/80 backdrop-blur-sm p-3 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-white max-w-md transition-transform hover:-translate-y-1">
              <div className="bg-gradient-to-br from-red-500 to-red-700 w-12 h-12 rounded-lg flex items-center justify-center shrink-0 shadow-md">
                <ShieldCheck className="text-white w-6 h-6" />
              </div>
              <div className="ml-4">
                <h4 className="font-bold text-gray-800 text-base">Secure & Reliable</h4>
                <p className="text-sm text-gray-500">100% Secure platform for your business</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Login Card */}
        <div className="w-full lg:w-5/12 flex justify-end mt-12 lg:mt-0 relative z-20">
          <div className="bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(153,0,0,0.3)] w-full max-w-[460px] p-8 border border-red-50">
            
            <div className="flex flex-col items-center mb-6">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center border border-red-100 mb-4 shadow-sm">
                <Building2 className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold">
                <span className="text-red-600">Diamond</span> <span className="text-gray-800">Agency Login</span>
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {isForgotPassword ? "Enter your registered email or mobile to reset password" : "Enter your credentials to continue"}
              </p>
            </div>

            {!isForgotPassword ? (
              <>
                {/* Login Tabs */}
                <div className="flex p-1 bg-gray-50 rounded-lg mb-6 border border-gray-100">
                  <button 
                    onClick={() => setActiveTab("mobile")}
                    className={`flex-1 py-2 px-2 text-xs font-semibold rounded-md transition-all ${activeTab === "mobile" ? "bg-red-600 text-white shadow-sm" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"}`}
                  >
                    Mobile Number
                  </button>
                  <button 
                    onClick={() => setActiveTab("agency")}
                    className={`flex-1 py-2 px-2 text-xs font-semibold rounded-md transition-all ${activeTab === "agency" ? "bg-red-600 text-white shadow-sm" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"}`}
                  >
                    Agency ID / Email
                  </button>
                  <button 
                    onClick={() => setActiveTab("username")}
                    className={`flex-1 py-2 px-2 text-xs font-semibold rounded-md transition-all ${activeTab === "username" ? "bg-red-600 text-white shadow-sm" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"}`}
                  >
                    Username
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Mobile Input */}
                  {activeTab === "mobile" && (
                    <div className="flex border border-gray-200 rounded-xl overflow-hidden bg-white focus-within:border-red-400 focus-within:ring-1 focus-within:ring-red-400 transition-all">
                      <div className="flex items-center px-4 py-3 bg-gray-50 border-r border-gray-200 gap-2 cursor-pointer hover:bg-gray-100">
                        <Smartphone className="w-5 h-5 text-red-600" />
                        <span className="font-semibold text-gray-700">+91</span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        placeholder="Enter Mobile Number"
                        className="flex-1 px-4 py-3 outline-none text-gray-700 w-full"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                      />
                    </div>
                  )}

                  {/* Agency ID / Email Input */}
                  {activeTab === "agency" && (
                    <div className="flex border border-gray-200 rounded-xl overflow-hidden bg-white focus-within:border-red-400 focus-within:ring-1 focus-within:ring-red-400 transition-all">
                      <div className="flex items-center px-4 py-3 bg-gray-50 border-r border-gray-200 gap-2">
                        <Building2 className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Enter Agency ID or Email"
                        className="flex-1 px-4 py-3 outline-none text-gray-700 w-full"
                        value={agencyId}
                        onChange={(e) => setAgencyId(e.target.value)}
                      />
                    </div>
                  )}

                  {/* Username Input */}
                  {activeTab === "username" && (
                    <div className="flex border border-gray-200 rounded-xl overflow-hidden bg-white focus-within:border-red-400 focus-within:ring-1 focus-within:ring-red-400 transition-all">
                      <div className="flex items-center px-4 py-3 bg-gray-50 border-r border-gray-200 gap-2">
                        <Users className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Enter Username"
                        className="flex-1 px-4 py-3 outline-none text-gray-700 w-full"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                  )}

                  {/* Password Input */}
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white focus-within:border-red-400 focus-within:ring-1 focus-within:ring-red-400 transition-all px-4 py-3">
                    <Lock className="w-5 h-5 text-red-600 shrink-0" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="flex-1 px-3 outline-none text-gray-700 w-full"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Remember & Forgot */}
                  <div className="flex justify-between items-center text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500 cursor-pointer accent-red-600"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <span className="text-gray-600 font-medium">Remember me</span>
                    </label>
                    <button 
                      type="button"
                      onClick={() => setIsForgotPassword(true)}
                      className="text-red-600 font-semibold hover:text-red-700 transition-colors"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-600 to-[#B20000] hover:from-red-700 hover:to-[#990000] text-white py-3.5 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-[0_8px_20px_-6px_rgba(220,38,38,0.5)] group"
                  >
                    Login
                    <div className="bg-white rounded-full p-1 group-hover:translate-x-1 transition-transform">
                        <ChevronRight className="w-4 h-4 text-red-600" />
                    </div>
                  </button>

                  {/* Divider */}
                  <div className="relative flex items-center py-2">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-semibold">OR</span>
                    <div className="flex-grow border-t border-gray-200"></div>
                  </div>

                  {/* Login with OTP */}
                  <button
                    type="button"
                    className="w-full bg-white border-2 border-red-100 hover:border-red-200 text-gray-700 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all hover:bg-gray-50"
                  >
                    <MessageSquare className="w-5 h-5 text-red-600" />
                    Login with OTP
                  </button>
                </form>

                {/* Footer text */}
                <p className="text-center text-sm text-gray-500 mt-8">
                  Don't have an account? <a href="#" className="text-red-600 font-bold hover:underline">Contact Support</a>
                </p>
              </>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); alert("Password reset link sent to " + resetInput); setIsForgotPassword(false); }} className="space-y-6">
                <div className="flex border border-gray-200 rounded-xl overflow-hidden bg-white focus-within:border-red-400 focus-within:ring-1 focus-within:ring-red-400 transition-all">
                  <div className="flex items-center px-4 py-3 bg-gray-50 border-r border-gray-200 gap-2">
                    <MessageSquare className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter registered Email or Mobile"
                    className="flex-1 px-4 py-3 outline-none text-gray-700 w-full"
                    value={resetInput}
                    onChange={(e) => setResetInput(e.target.value)}
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-[#B20000] hover:from-red-700 hover:to-[#990000] text-white py-3.5 rounded-xl font-bold text-lg flex items-center justify-center transition-all shadow-[0_8px_20px_-6px_rgba(220,38,38,0.5)] group"
                >
                  Send Reset Link
                </button>

                <button
                  type="button"
                  onClick={() => setIsForgotPassword(false)}
                  className="w-full bg-white border-2 border-red-100 hover:border-red-200 text-gray-700 py-3 rounded-xl font-semibold flex items-center justify-center transition-all hover:bg-gray-50"
                >
                  Back to Login
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer Zoom Options */}
      <div className="relative z-10 w-full mt-auto bg-white/90 backdrop-blur py-2 border-t border-gray-200 flex justify-center gap-8 md:gap-16 text-xs font-semibold text-gray-500 overflow-x-auto px-4 whitespace-nowrap">
        <span className="text-gray-800">100% (Default)</span>
        <span className="hover:text-gray-800 cursor-pointer transition-colors">125% Zoom</span>
        <span className="hover:text-gray-800 cursor-pointer transition-colors">150% Zoom</span>
        <span className="hover:text-gray-800 cursor-pointer transition-colors">200% Zoom</span>
        <span className="hover:text-gray-800 cursor-pointer transition-colors">250% Zoom</span>
      </div>
    </div>
  );
}
