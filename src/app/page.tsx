"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, MapPin, Clock } from 'lucide-react';
import BenefitsSection from '@/components/BenefitsSection';
import Footer from '@/components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans overflow-hidden">
      
      {/* Navbar */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center relative z-20">
        <div className="flex items-center gap-2">
          <img src="/gin.png" alt="GetItNow Logo" className="w-10 h-10 object-contain drop-shadow-sm" />
          <span className="font-extrabold text-2xl tracking-tight text-secondary">
            Get<span className="text-primary">ItNow</span>
          </span>
        </div>
        <div className="flex gap-4">
          <Link href="/login" className="px-6 py-2.5 rounded-full font-bold bg-secondary text-white hover:bg-slate-800 transition-colors shadow-lg">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center relative px-6 py-20 text-center">
        
        {/* Abstract Background Elements */}
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-tertiary/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-black text-slate-800 tracking-tight leading-[1.05] mb-8">
            Hyperlocal delivery,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary">reimagined.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Whether you are a customer craving fresh groceries, or a vendor looking to expand your reach. GetItNow bridges the gap instantly.
          </p>
        </div>

      </main>

      <BenefitsSection />

      <Footer />
    </div>
  );
}
