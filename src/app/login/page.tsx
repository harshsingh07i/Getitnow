"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore, UserRole } from '@/store/useAuthStore';
import { Store, ShieldCheck, ShoppingBag, Phone, Lock, FileText, MapPin, Building2, CheckCircle2 } from 'lucide-react';

export default function LoginPortal() {
  const router = useRouter();
  const { login } = useAuthStore();
  
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer');
  const [showOTP, setShowOTP] = useState(false);
  
  // Form State
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  
  // Vendor specific
  const [shopName, setShopName] = useState('');
  const [shopAddress, setShopAddress] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [gstin, setGstin] = useState('');
  
  const [otp, setOtp] = useState('');

  const handleAuthSwitch = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    if (mode === 'signup' && selectedRole === 'admin') {
      setSelectedRole('customer'); // Hide admin from signup
    }
    setShowOTP(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !password) return;

    if (authMode === 'signin') {
      // In a real app, backend would determine isVerified based on user DB record.
      // Here we assume if they can sign in, they are verified.
      login(phone, selectedRole, true);
      router.push(`/${selectedRole}`);
    } else {
      // Sign Up Mode -> Trigger OTP
      setShowOTP(true);
    }
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === '1234') {
      // Success! Account created and verified.
      login(phone, selectedRole, true);
      router.push(`/${selectedRole}`);
    } else {
      alert("Invalid OTP. Try '1234'.");
    }
  };

  // Skip OTP (e.g. they abandon verification but we still create the account as unverified)
  const handleSkipVerify = () => {
    login(phone, selectedRole, false);
    router.push(`/${selectedRole}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <img src="/gin.png" alt="GetItNow Logo" className="w-12 h-12 drop-shadow-md" />
            <h1 className="text-4xl font-extrabold tracking-tight text-secondary">
              Get<span className="text-primary">ItNow</span>
            </h1>
          </div>
          <p className="text-slate-500 font-medium">Your local neighborhood, delivered.</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-xl border border-white">
          
          {!showOTP ? (
            <>
              {/* Auth Mode Toggle */}
              <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
                <button 
                  onClick={() => handleAuthSwitch('signin')}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${authMode === 'signin' ? 'bg-white text-secondary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Sign In
                </button>
                <button 
                  onClick={() => handleAuthSwitch('signup')}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${authMode === 'signup' ? 'bg-white text-secondary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Sign Up
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Role Selector */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700">I am a...</label>
                  <div className={`grid gap-3 ${authMode === 'signin' ? 'grid-cols-3' : 'grid-cols-2'}`}>
                    <button
                      type="button"
                      onClick={() => setSelectedRole('customer')}
                      className={`flex flex-col items-center justify-center py-3 rounded-xl border-2 transition-all duration-200 ${selectedRole === 'customer' ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                    >
                      <ShoppingBag size={20} className="mb-1" />
                      <span className="text-xs font-bold">Customer</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedRole('vendor')}
                      className={`flex flex-col items-center justify-center py-3 rounded-xl border-2 transition-all duration-200 ${selectedRole === 'vendor' ? 'border-tertiary bg-tertiary/10 text-yellow-700' : 'border-slate-100 bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                    >
                      <Store size={20} className="mb-1" />
                      <span className="text-xs font-bold">Vendor</span>
                    </button>
                    {authMode === 'signin' && (
                      <button
                        type="button"
                        onClick={() => setSelectedRole('admin')}
                        className={`flex flex-col items-center justify-center py-3 rounded-xl border-2 transition-all duration-200 ${selectedRole === 'admin' ? 'border-secondary bg-secondary/5 text-secondary' : 'border-slate-100 bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                      >
                        <ShieldCheck size={20} className="mb-1" />
                        <span className="text-xs font-bold">Admin</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Base Fields: Phone & Password */}
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700">Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Phone size={18} className="text-slate-400" />
                    </div>
                    <input 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit mobile number" 
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border-2 border-slate-100 focus:bg-white focus:border-primary/50 focus:ring-4 focus:ring-primary/10 rounded-xl text-sm font-medium outline-none transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-slate-700">Password</label>
                    {authMode === 'signin' && <a href="#" className="text-xs font-bold text-primary hover:underline">Forgot?</a>}
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock size={18} className="text-slate-400" />
                    </div>
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password" 
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border-2 border-slate-100 focus:bg-white focus:border-primary/50 focus:ring-4 focus:ring-primary/10 rounded-xl text-sm font-medium outline-none transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                {/* Vendor Signup Extended Fields */}
                {authMode === 'signup' && selectedRole === 'vendor' && (
                  <div className="pt-4 border-t border-slate-100 space-y-4">
                    <h3 className="text-sm font-bold text-tertiary flex items-center gap-2">
                      <Store size={16} /> Business Details
                    </h3>
                    
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Shop Name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Building2 size={16} className="text-slate-400" />
                        </div>
                        <input 
                          type="text" 
                          value={shopName}
                          onChange={(e) => setShopName(e.target.value)}
                          placeholder="E.g. Daily Needs Supermart" 
                          className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border-2 border-slate-100 focus:bg-white focus:border-tertiary/50 focus:ring-4 focus:ring-tertiary/10 rounded-xl text-sm font-medium outline-none transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Shop Address</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <MapPin size={16} className="text-slate-400" />
                        </div>
                        <input 
                          type="text" 
                          value={shopAddress}
                          onChange={(e) => setShopAddress(e.target.value)}
                          placeholder="Complete physical address" 
                          className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border-2 border-slate-100 focus:bg-white focus:border-tertiary/50 focus:ring-4 focus:ring-tertiary/10 rounded-xl text-sm font-medium outline-none transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Aadhar Number</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FileText size={14} className="text-slate-400" />
                          </div>
                          <input 
                            type="text" 
                            value={aadhar}
                            onChange={(e) => setAadhar(e.target.value)}
                            placeholder="12-digit ID" 
                            className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border-2 border-slate-100 focus:bg-white focus:border-tertiary/50 focus:ring-4 focus:ring-tertiary/10 rounded-xl text-xs font-medium outline-none transition-all"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">GSTIN</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FileText size={14} className="text-slate-400" />
                          </div>
                          <input 
                            type="text" 
                            value={gstin}
                            onChange={(e) => setGstin(e.target.value)}
                            placeholder="15-digit GSTIN" 
                            className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border-2 border-slate-100 focus:bg-white focus:border-tertiary/50 focus:ring-4 focus:ring-tertiary/10 rounded-xl text-xs font-medium outline-none transition-all"
                            required
                          />
                        </div>
                      </div>
                    </div>

                  </div>
                )}

                <button 
                  type="submit"
                  className={`w-full font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-white ${
                    selectedRole === 'vendor' ? 'bg-tertiary hover:bg-yellow-600' : 
                    selectedRole === 'admin' ? 'bg-secondary hover:bg-slate-800' : 
                    'bg-primary hover:bg-[#E64A2E]'
                  }`}
                >
                  {authMode === 'signin' ? 'Sign In' : 'Create Account'}
                </button>
              </form>
            </>
          ) : (
            
            /* OTP VERIFICATION MODAL */
            <div className="animate-in fade-in zoom-in duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mx-auto mb-4">
                  <ShieldCheck size={32} />
                </div>
                <h2 className="text-2xl font-black text-secondary tracking-tight">Verify Phone</h2>
                <p className="text-sm font-medium text-slate-500 mt-2">
                  We've sent a code to <span className="font-bold text-slate-700">{phone}</span>
                </p>
                <p className="text-xs text-primary mt-1">(Hint: use 1234)</p>
              </div>

              <form onSubmit={handleVerifyOTP} className="space-y-6">
                <div>
                  <input 
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 4-digit code"
                    maxLength={4}
                    className="w-full text-center text-2xl tracking-widest font-black py-4 bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-xl outline-none transition-all"
                    required
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <button 
                    type="submit"
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/30 transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 size={20} /> Verify & Continue
                  </button>
                  <button 
                    type="button"
                    onClick={handleSkipVerify}
                    className="w-full bg-white border border-slate-200 text-slate-500 font-bold py-3 rounded-xl hover:bg-slate-50 transition-all"
                  >
                    Skip for now
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
