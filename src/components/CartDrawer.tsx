"use client";

import React, { useEffect, useState } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { X, MapPin, AlertTriangle, ArrowRight, MapPinOff, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CartDrawer() {
  const { 
    items, 
    isCartOpen, 
    closeCart, 
    getTotalPrice, 
    addItem, 
    removeItem, 
    isLocationChanged, 
    simulateLocationChange,
    outOfRangeItemIds
  } = useCartStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isCartOpen) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] transition-opacity"
        onClick={closeCart}
      />
      
      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-[110] transform transition-transform duration-300 flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-white">
          <h2 className="text-xl font-extrabold text-secondary tracking-tight">Your Cart</h2>
          <button 
            onClick={closeCart}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* Location Simulator Tool (For Demo Purposes) */}
        <div className="bg-slate-50 border-b border-slate-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">DEV TOOL: Geolocation</span>
          </div>
          <button 
            onClick={() => simulateLocationChange(!isLocationChanged)}
            className={`w-full py-2 px-3 rounded-lg text-sm font-bold border transition-colors flex items-center justify-center gap-2 ${
              isLocationChanged 
                ? 'bg-orange-50 border-orange-200 text-orange-600' 
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <MapPin size={16} />
            {isLocationChanged ? 'Reset to Home Location' : 'Simulate: Travel 3km to Cafe'}
          </button>
        </div>

        {/* Body - Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50">
          
          {isLocationChanged && items.length > 0 && (
            <div className="mb-6 p-4 rounded-xl bg-orange-50 border border-orange-200 flex gap-3 animate-in fade-in slide-in-from-top-4">
              <AlertTriangle className="text-orange-500 shrink-0" size={20} />
              <div>
                <h4 className="font-bold text-orange-800 text-sm">You moved outside the 2km active zone!</h4>
                <p className="text-orange-700 text-xs mt-1 leading-relaxed font-medium">
                  Some items in your cart are no longer available from merchants within a 2km radius of your new location.
                </p>
              </div>
            </div>
          )}

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-4">
              <ShoppingBag size={48} className="opacity-20" />
              <p className="font-medium">Your cart is empty.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map(item => {
                const isOutOfRange = outOfRangeItemIds.includes(item.id);
                
                return (
                  <div key={item.id} className={`bg-white border rounded-2xl p-3 flex gap-4 transition-all ${isOutOfRange ? 'border-orange-200 opacity-80' : 'border-slate-100 shadow-sm'}`}>
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className={`w-16 h-16 object-contain rounded-xl bg-slate-50 p-1 ${isOutOfRange ? 'grayscale opacity-60' : ''}`} 
                    />
                    
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className={`text-sm font-semibold line-clamp-2 leading-tight ${isOutOfRange ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                          {item.name}
                        </h4>
                        {!isOutOfRange && (
                          <span className="font-bold text-sm text-secondary shrink-0">₹{item.price * item.quantity}</span>
                        )}
                      </div>
                      
                      <span className="text-xs text-slate-500 font-medium mt-1">{item.qty}</span>
                      
                      <div className="mt-2 flex items-center gap-3 bg-secondary text-white w-fit px-2 py-1 rounded-lg">
                        <button onClick={() => removeItem(item.id)} className="w-6 h-6 flex items-center justify-center font-bold hover:bg-white/20 rounded-md transition-colors">−</button>
                        <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                        <button onClick={() => addItem(item)} className="w-6 h-6 flex items-center justify-center font-bold hover:bg-white/20 rounded-md transition-colors">+</button>
                      </div>

                      {/* Mock Alternative Suggestion if out of range */}
                      {isOutOfRange && (
                        <div className="mt-3 pt-3 border-t border-slate-100">
                          <p className="text-xs font-bold text-primary mb-2">Available near you instead:</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xl">🍎</div>
                              <div>
                                <div className="text-xs font-bold text-slate-800">Fresh Local Alternative</div>
                                <div className="text-[10px] text-slate-500 font-medium font-mono">1.2km away</div>
                              </div>
                            </div>
                            <button className="text-xs font-bold bg-slate-100 text-secondary px-3 py-1.5 rounded-lg hover:bg-primary hover:text-white transition-colors">
                              Swap
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer - Checkout */}
        {items.length > 0 && (
          <div className="p-4 bg-white border-t border-slate-100 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
            <div className="flex items-center justify-between mb-4 px-2">
              <span className="text-sm font-bold text-slate-600">Total to pay</span>
              <span className="text-2xl font-black text-secondary">₹{getTotalPrice()}</span>
            </div>
            
            <button 
              onClick={() => {
                closeCart();
                router.push('/checkout');
              }}
              className="w-full bg-primary hover:bg-[#E64A2E] text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 flex items-center justify-center gap-2 transform transition-all hover:-translate-y-1"
            >
              Proceed to Checkout <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
