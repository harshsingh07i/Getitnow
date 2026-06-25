"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore, UserRole } from '@/store/useAuthStore';
import { Store, ShieldCheck, ShoppingBag, Phone, Lock } from 'lucide-react';

export default function LoginPortal() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer');
  const [phone, setPhone] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    
    // Simulate login and set role
    login(phone, selectedRole);
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
          <p className="text-slate-500 font-medium">Log in to your account</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-xl border border-white">
          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Role Selector */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700">I am a...</label>
              <div className="grid grid-cols-3 gap-3">
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
                <button
                  type="button"
                  onClick={() => setSelectedRole('admin')}
                  className={`flex flex-col items-center justify-center py-3 rounded-xl border-2 transition-all duration-200 ${selectedRole === 'admin' ? 'border-secondary bg-secondary/5 text-secondary' : 'border-slate-100 bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                >
                  <ShieldCheck size={20} className="mb-1" />
                  <span className="text-xs font-bold">Admin</span>
                </button>
              </div>
            </div>

            {/* Phone Input */}
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
                  placeholder="Enter your phone number" 
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border-2 border-slate-100 focus:bg-white focus:border-primary/50 focus:ring-4 focus:ring-primary/10 rounded-xl text-sm font-medium outline-none transition-all duration-300"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-700">Password</label>
                <a href="#" className="text-xs font-bold text-primary hover:underline">Forgot?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-slate-400" />
                </div>
                <input 
                  type="password" 
                  placeholder="Enter your password" 
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border-2 border-slate-100 focus:bg-white focus:border-primary/50 focus:ring-4 focus:ring-primary/10 rounded-xl text-sm font-medium outline-none transition-all duration-300"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-secondary hover:bg-slate-800 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
