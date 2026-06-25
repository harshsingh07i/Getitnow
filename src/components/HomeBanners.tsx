import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Clock, Percent } from 'lucide-react';

export default function HomeBanners() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Bento Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px]">
        
        {/* Main Banner - Spans 2 columns on desktop */}
        <Link 
          href="/products" 
          className="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#FFEBE5] to-[#FFD5CC] group shadow-sm hover:shadow-xl transition-all duration-500"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/60 to-transparent z-10 pointer-events-none"></div>
          
          <div className="relative z-20 h-full flex flex-col justify-center p-10 md:p-14 w-2/3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 text-primary text-xs font-bold uppercase tracking-wider mb-6 w-fit shadow-sm backdrop-blur-sm">
              <Sparkles size={14} className="text-tertiary" />
              Daily Essentials
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold text-secondary leading-[1.1] mb-6 tracking-tight">
              Farm-fresh<br />goodness.
            </h2>
            <p className="text-slate-600 text-lg mb-8 max-w-sm font-medium leading-relaxed">
              Get exotic fruits, fresh vegetables, and organic eggs delivered in 12 minutes.
            </p>
            <button className="flex items-center gap-2 bg-primary hover:bg-[#E64A2E] text-white px-8 py-4 rounded-full font-bold w-fit shadow-lg shadow-primary/30 transform group-hover:scale-105 group-hover:shadow-primary/50 transition-all duration-300">
              Shop Now <ArrowRight size={18} />
            </button>
          </div>
          
          {/* Main Image */}
          <img 
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800" 
            alt="Fresh Groceries" 
            className="absolute right-0 top-0 h-full w-1/2 object-cover object-left mask-image-to-l transform group-hover:scale-105 transition-transform duration-700 ease-out"
            style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%)' }}
          />
        </Link>

        {/* Small Banner 1: Pharmacy */}
        <Link 
          href="/products" 
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] group shadow-sm hover:shadow-lg transition-all duration-500 flex flex-col justify-between p-8"
        >
          <div className="relative z-20">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4 shadow-sm">
              <Clock size={20} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 leading-tight mb-2">Pharmacy at<br/>your door</h3>
            <p className="text-slate-600 text-sm font-medium">Cough, cold & pain relief</p>
          </div>
          <div className="flex justify-between items-end relative z-20">
            <span className="text-green-600 font-bold text-sm uppercase tracking-wide group-hover:translate-x-2 transition-transform duration-300 flex items-center gap-1">
              Order <ArrowRight size={14} />
            </span>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ad?auto=format&fit=crop&q=80&w=300" 
            alt="Pharmacy" 
            className="absolute -right-6 -bottom-6 w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
          />
        </Link>
        
        {/* Small Banner 2: Pet Care */}
        <Link 
          href="/products" 
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#FFFBEB] to-[#FEF3C7] group shadow-sm hover:shadow-lg transition-all duration-500 flex flex-col justify-between p-8"
        >
          <div className="relative z-20">
            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mb-4 shadow-sm">
              <Percent size={20} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 leading-tight mb-2">Pet care<br/>supplies</h3>
            <p className="text-slate-600 text-sm font-medium">Food, treats & toys</p>
          </div>
          <div className="flex justify-between items-end relative z-20">
            <span className="text-tertiary font-bold text-sm uppercase tracking-wide group-hover:translate-x-2 transition-transform duration-300 flex items-center gap-1">
              Order <ArrowRight size={14} />
            </span>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=300" 
            alt="Pet Care" 
            className="absolute -right-6 -bottom-6 w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500"
          />
        </Link>

      </div>
    </div>
  );
}
