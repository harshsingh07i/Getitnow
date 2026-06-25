"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, MapPin, Clock } from 'lucide-react';
import BenefitsSection from '@/components/BenefitsSection';

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

      {/* Footer */}
      <footer className="w-full bg-white border-t border-slate-200 text-slate-800 relative z-20 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            
            {/* Brand Column */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <img src="/gin.png" alt="GetItNow Logo" className="w-8 h-8 object-contain" />
                <span className="font-extrabold text-xl tracking-tight text-secondary">
                  Get<span className="text-primary">ItNow</span>
                </span>
              </div>
              <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6">
                Your neighborhood stores, delivered to your door in 12 minutes.
              </p>
            </div>

            {/* Links Column 1 */}
            <div>
              <h4 className="font-bold text-slate-800 mb-4 uppercase tracking-wider text-sm">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-500 hover:text-primary transition-colors text-sm font-medium">About Us</a></li>
                <li><a href="#" className="text-slate-500 hover:text-primary transition-colors text-sm font-medium">Careers</a></li>
                <li><a href="#" className="text-slate-500 hover:text-primary transition-colors text-sm font-medium">Press</a></li>
              </ul>
            </div>

            {/* Links Column 2 */}
            <div>
              <h4 className="font-bold text-slate-800 mb-4 uppercase tracking-wider text-sm">Partners</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-500 hover:text-primary transition-colors text-sm font-medium">Become a Vendor</a></li>
                <li><a href="#" className="text-slate-500 hover:text-primary transition-colors text-sm font-medium">Deliver with Us</a></li>
                <li><a href="#" className="text-slate-500 hover:text-primary transition-colors text-sm font-medium">Franchise</a></li>
              </ul>
            </div>

            {/* Links Column 3 */}
            <div>
              <h4 className="font-bold text-slate-800 mb-4 uppercase tracking-wider text-sm">Legal</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-500 hover:text-primary transition-colors text-sm font-medium">Terms of Service</a></li>
                <li><a href="#" className="text-slate-500 hover:text-primary transition-colors text-sm font-medium">Privacy Policy</a></li>
                <li><a href="#" className="text-slate-500 hover:text-primary transition-colors text-sm font-medium">Cookie Policy</a></li>
              </ul>
            </div>

          </div>

          <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm font-medium">
              © {new Date().getFullYear()} GetItNow. All rights reserved.
            </p>
            <div className="flex gap-4">
              {/* Mock Social Icons */}
              <a href="#" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-primary hover:text-white transition-all">
                <span className="sr-only">Twitter</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-primary hover:text-white transition-all">
                <span className="sr-only">Instagram</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
