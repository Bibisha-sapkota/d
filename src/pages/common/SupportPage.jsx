import React from "react";
import { Link } from "react-router-dom";
import coinLogo from "../../assets/coin-logo.png";
import { Mail, Phone, MapPin, ArrowLeft, Send } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-[#FFF0F0] relative overflow-hidden flex flex-col font-sans text-gray-800">
      {/* Background with Red Waves */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-500/20 via-transparent to-transparent opacity-80 mix-blend-multiply" />
        <div className="absolute bottom-0 left-0 w-full h-[60vh] bg-gradient-to-t from-red-600 to-transparent opacity-90 blur-xl" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 40%, 0 80%)' }} />
        <div className="absolute bottom-0 right-0 w-full h-[50vh] bg-gradient-to-t from-[#B20000] to-transparent opacity-80 blur-2xl" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 10%, 0 90%)' }} />
      </div>

      {/* Header */}
      <div className="relative z-10 w-full p-6 flex justify-between items-start">
        <div className="flex items-center gap-2">
          <img src={coinLogo} alt="Logo" className="w-12 h-12 object-contain drop-shadow-md" />
          <div className="flex flex-col leading-none">
            <span className="text-2xl font-bold text-red-600 italic">eRupai</span>
            <span className="text-[10px] font-bold text-red-700 tracking-widest bg-red-100 px-1 rounded-sm w-fit mt-0.5">SUPPORT</span>
          </div>
        </div>
        <Link to="/" className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm text-sm font-medium border border-red-100 hover:bg-gray-50 transition-colors">
          <ArrowLeft className="w-4 h-4 text-red-600" />
          <span>Back to Login</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 px-6 py-12">
        
        {/* Left Side: Contact Info */}
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#990000] mb-4">
            How can we help?
          </h1>
          <p className="text-gray-600 text-lg mb-8 max-w-md">
            Our support team is always ready to help you with your account, transactions, and any other inquiries.
          </p>

          <div className="flex flex-col gap-6">
            <div className="flex items-center bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-white max-w-md transition-transform hover:-translate-y-1">
              <div className="bg-gradient-to-br from-red-500 to-red-700 w-12 h-12 rounded-lg flex items-center justify-center shrink-0 shadow-md">
                <Phone className="text-white w-6 h-6" />
              </div>
              <div className="ml-4">
                <h4 className="font-bold text-gray-800 text-base">Call Us</h4>
                <p className="text-sm text-gray-500">+91 1800-123-4567</p>
                <p className="text-xs text-red-600 font-semibold mt-1">Available 24/7</p>
              </div>
            </div>

            <div className="flex items-center bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-white max-w-md transition-transform hover:-translate-y-1">
              <div className="bg-gradient-to-br from-red-500 to-red-700 w-12 h-12 rounded-lg flex items-center justify-center shrink-0 shadow-md">
                <Mail className="text-white w-6 h-6" />
              </div>
              <div className="ml-4">
                <h4 className="font-bold text-gray-800 text-base">Email Support</h4>
                <p className="text-sm text-gray-500">support@erupai.com</p>
                <p className="text-xs text-red-600 font-semibold mt-1">We reply within 2 hours</p>
              </div>
            </div>

            <div className="flex items-center bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-white max-w-md transition-transform hover:-translate-y-1">
              <div className="bg-gradient-to-br from-red-500 to-red-700 w-12 h-12 rounded-lg flex items-center justify-center shrink-0 shadow-md">
                <MapPin className="text-white w-6 h-6" />
              </div>
              <div className="ml-4">
                <h4 className="font-bold text-gray-800 text-base">Head Office</h4>
                <p className="text-sm text-gray-500">123 Business Tower, Tech Park</p>
                <p className="text-sm text-gray-500">New Delhi, India 110001</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(153,0,0,0.3)] w-full max-w-md p-8 border border-red-50 relative">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Send us a message</h3>
            
            <form onSubmit={(e) => { e.preventDefault(); alert("Message sent successfully! Our team will contact you shortly."); }} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                <input type="text" placeholder="John Doe" required className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 bg-gray-50 transition-all" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email or Mobile</label>
                <input type="text" placeholder="name@example.com" required className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 bg-gray-50 transition-all" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                <textarea rows="4" placeholder="How can we help you?" required className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 bg-gray-50 transition-all resize-none"></textarea>
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-red-600 to-[#B20000] hover:from-red-700 hover:to-[#990000] text-white py-3.5 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-md group mt-2">
                Send Message
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
