"use client";

import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, ChevronDown, User, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import { useLocationStore } from '@/store/useLocationStore';

export default function Header() {
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const totalItems = useCartStore(state => state.getTotalItems());
  const totalPrice = useCartStore(state => state.getTotalPrice());
  const openCart = useCartStore(state => state.openCart);
  const { address, openModal } = useLocationStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 glass w-full transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo & Delivery Info */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <img 
                src="/gin.png" 
                alt="GetItNow Logo" 
                className="w-10 h-10 object-contain transform group-hover:rotate-6 group-hover:scale-105 transition-all duration-300 drop-shadow-sm"
              />
              <span className="font-extrabold text-2xl tracking-tight text-secondary">
                Get<span className="text-primary">ItNow</span>
              </span>
            </Link>
            
            <div className="hidden md:block w-px h-10 bg-slate-200"></div>
            
            <button 
              onClick={openModal}
              className="hidden md:flex flex-col items-start text-left group hover:bg-slate-50 p-2 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-1 text-sm font-bold text-secondary">
                Delivery in 12 minutes
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                <span className="truncate max-w-[200px]">
                  {address && address.length > 35 ? address.substring(0, 35) + '...' : address || 'Set Location'}
                </span>
                <ChevronDown size={14} className="text-primary group-hover:translate-y-0.5 transition-transform" />
              </div>
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl px-6 hidden lg:block">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={18} className="text-slate-400 group-focus-within:text-primary transition-colors" />
              </div>
              <input 
                type="text" 
                placeholder='Search for "paneer", "milk", or "bread"...' 
                className="w-full pl-11 pr-4 py-3 bg-slate-100 hover:bg-slate-200 focus:bg-white border-2 border-transparent focus:border-primary/30 focus:shadow-[0_0_15px_rgba(255,87,51,0.15)] rounded-2xl text-sm font-medium outline-none transition-all duration-300 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            
            {/* Account Dropdown */}
            <div 
              className="relative hidden sm:block"
              onMouseEnter={() => setIsAccountOpen(true)}
              onMouseLeave={() => setIsAccountOpen(false)}
            >
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-full text-secondary font-semibold hover:bg-slate-100 transition-colors">
                <User size={18} />
                <span>Account</span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${isAccountOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isAccountOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden transform opacity-100 scale-100 transition-all origin-top-right">
                  <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                    <div className="font-bold text-secondary">My Account</div>
                    <div className="text-xs text-slate-500 mt-1">9628616168</div>
                  </div>
                  <div className="flex flex-col py-2">
                    {['My Orders', 'Saved Addresses', 'My Prescriptions', "FAQ's", 'Log Out'].map((item, i) => (
                      <Link key={i} href="#" className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-primary hover:bg-orange-50 transition-colors">
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Cart Button */}
            <button 
              onClick={openCart}
              className={`flex items-center gap-3 px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm ${
                !isMounted || totalItems === 0 
                  ? 'bg-slate-100 text-slate-500 hover:bg-slate-200' 
                  : 'bg-primary text-white hover:bg-orange-600 shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5'
              }`}
            >
              <ShoppingCart size={20} className={isMounted && totalItems > 0 ? "animate-bounce-slight" : ""} />
              {isMounted && totalItems > 0 ? (
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-[10px] font-bold opacity-90">{totalItems} items</span>
                  <span className="text-sm font-extrabold">₹{totalPrice}</span>
                </div>
              ) : (
                <span className="font-bold text-sm">My Cart</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
