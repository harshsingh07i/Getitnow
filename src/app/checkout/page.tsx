"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { useCartStore } from '@/store/useCartStore';
import { useLocationStore } from '@/store/useLocationStore';
import { useRouter } from 'next/navigation';
import { MapPin, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart, removeItem, outOfRangeItemIds } = useCartStore();
  const { address } = useLocationStore();
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { isVerified, verifyPhone } = useAuthStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const validItems = items.filter(item => !outOfRangeItemIds.includes(item.id));
  const subtotal = getTotalPrice();
  const deliveryFee = 15;
  const handlingFee = 2;
  const total = subtotal > 0 ? subtotal + deliveryFee + handlingFee : 0;

  const handleCheckout = async () => {
    setIsSubmitting(true);
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newOrder = {
        id: Math.random().toString(36).substr(2, 9),
        total: total,
        status: 'PENDING',
        createdAt: new Date().toISOString(),
        items: validItems.map(i => ({ 
          id: Math.random().toString(36).substr(2, 9),
          product: { name: i.name, image: i.image } 
        })),
        deliveryAddress: address
      };
      
      const existingOrders = JSON.parse(localStorage.getItem('mockOrders') || '[]');
      localStorage.setItem('mockOrders', JSON.stringify([newOrder, ...existingOrders]));
      
      clearCart();
      router.push('/account/orders');
    } catch (e) {
      console.error(e);
      alert("Error placing order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 md:py-12">
        <h1 className="text-3xl font-black text-secondary tracking-tight mb-8">Checkout</h1>
        
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Main Column */}
          <div className="flex-1 w-full flex flex-col gap-6">
            
            {/* Delivery Address Block */}
            <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <MapPin size={24} className="text-primary" />
                  Delivery Details
                </h2>
                <button className="text-sm font-bold text-primary hover:underline">Change</button>
              </div>
              
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <p className="font-medium text-slate-700">{address || 'No location set. Please set your location.'}</p>
                <p className="text-sm text-slate-500 mt-1">Delivery in ~12 minutes</p>
              </div>
            </div>

            {/* Cart Items Block */}
            <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-100 shadow-sm">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-6">
                <ShoppingBag size={24} className="text-primary" />
                Order Summary
              </h2>
              
              {validItems.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <ShoppingBag size={48} className="mx-auto opacity-20 mb-4" />
                  <p className="font-medium">No valid items in cart.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {validItems.map(item => (
                    <div key={item.id} className="flex gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                      <div className="w-16 h-16 bg-white rounded-lg p-2 border border-slate-100 shadow-sm shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-800 text-sm line-clamp-2">{item.name}</h4>
                        <p className="text-xs font-medium text-slate-500 mt-1">{item.qty}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-black text-secondary">₹{item.price}</span>
                          <span className="text-xs font-bold bg-slate-200 text-slate-600 px-2 py-1 rounded-md">
                            Qty: {item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
          </div>

          {/* Right Column - Billing */}
          <div className="w-full lg:w-[400px] flex flex-col gap-6 sticky top-28">
            <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-100 shadow-sm">
              <h2 className="text-xl font-bold text-slate-800 mb-6">Bill Details</h2>
              
              <div className="flex flex-col gap-4 text-sm font-medium text-slate-600">
                <div className="flex justify-between">
                  <span>Item Total</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>
                <div className="flex justify-between">
                  <span>Handling Fee</span>
                  <span>₹{handlingFee}</span>
                </div>
                
                <div className="h-px bg-slate-100 my-2"></div>
                
                <div className="flex justify-between text-lg font-black text-secondary">
                  <span>To Pay</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <div className="mt-8">
                {!isVerified ? (
                  <div className="mb-4 bg-red-50 border border-red-200 rounded-xl p-4 flex flex-col items-center text-center gap-2">
                    <ShieldCheck size={24} className="text-red-500" />
                    <p className="text-sm font-bold text-red-700">Phone Verification Required</p>
                    <p className="text-xs font-medium text-red-600">You must verify your phone number to place orders on this platform.</p>
                    <button 
                      onClick={() => {
                        verifyPhone();
                        alert("For demonstration purposes, your phone is now verified! You can place your order.");
                      }}
                      className="mt-2 bg-red-100 hover:bg-red-200 text-red-700 text-xs font-bold px-4 py-2 rounded-lg transition-colors"
                    >
                      Verify Now
                    </button>
                  </div>
                ) : null}

                <button 
                  disabled={validItems.length === 0 || isSubmitting || !isVerified}
                  onClick={handleCheckout}
                  className="w-full bg-primary hover:bg-[#E64A2E] text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 flex items-center justify-center gap-2 transform transition-all hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none"
                >
                  {isSubmitting ? 'Processing...' : 'Place Order'} <ArrowRight size={18} />
                </button>
              </div>
              
              <div className="mt-6 flex items-center justify-center gap-2 text-xs font-medium text-slate-400">
                <ShieldCheck size={16} /> Secure Payment Processing
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
