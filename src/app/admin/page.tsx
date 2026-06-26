"use client";

import React, { useState } from 'react';
import RoleGuard from '@/components/RoleGuard';
import { useAuthStore } from '@/store/useAuthStore';
import { 
  ShieldCheck, LogOut, Network, Search, Bell, Target, 
  MapPin, CheckCircle2, XCircle, Clock, AlertTriangle, ChevronRight, Activity, DollarSign,
  Server, Zap, Share2, Users, ArrowRight
} from 'lucide-react';
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('@/components/MapComponent'), { 
  ssr: false, 
  loading: () => <div className="w-full h-full bg-slate-100 animate-pulse flex items-center justify-center text-slate-400 font-medium">Loading geospatial data...</div> 
});

export default function AdminDashboard() {
  const { logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('Neighborhood Map');

  return (
    <RoleGuard allowedRoles={['admin']}>
      <div className="min-h-screen flex bg-slate-50 font-sans text-slate-900 overflow-hidden">
        
        {/* PREMIUM SIDEBAR */}
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
          <div className="p-6 flex items-center gap-3 border-b border-slate-100">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <ShieldCheck size={24} />
            </div>
            <h2 className="text-xl font-black tracking-tight text-secondary">City Ops</h2>
          </div>
          
          <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest px-4 mb-3 mt-2">Core Modules</div>
            {[
              { icon: MapPin, label: 'Neighborhood Map' },
              { icon: Target, label: 'Product Fixer' },
              { icon: Activity, label: 'Money & Logs' },
            ].map((item, i) => (
              <button 
                key={i} 
                onClick={() => setActiveTab(item.label)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-semibold ${
                  activeTab === item.label 
                    ? 'bg-orange-50 text-primary shadow-[inset_0_0_0_1px_rgba(255,87,51,0.1)]' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-secondary'
                }`}
              >
                <item.icon size={20} className={activeTab === item.label ? 'text-primary' : 'text-slate-400'} />
                {item.label}
              </button>
            ))}

            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest px-4 mb-3 mt-6">Growth & Systems</div>
            {[
              { icon: Server, label: 'Store Onboarding' },
              { icon: Zap, label: 'Stress Monitor' },
              { icon: Share2, label: 'Viral Spread' },
            ].map((item, i) => (
              <button 
                key={i} 
                onClick={() => setActiveTab(item.label)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-semibold ${
                  activeTab === item.label 
                    ? 'bg-orange-50 text-primary shadow-[inset_0_0_0_1px_rgba(255,87,51,0.1)]' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-secondary'
                }`}
              >
                <item.icon size={20} className={activeTab === item.label ? 'text-primary' : 'text-slate-400'} />
                {item.label}
              </button>
            ))}
          </nav>
          
          <div className="p-4 border-t border-slate-100 bg-slate-50/50">
            <button onClick={logout} className="flex items-center gap-3 w-full px-4 py-3 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-colors font-bold">
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-50/50">
          
          {/* HEADER */}
          <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-10">
            <div className="px-8 py-4 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-black text-secondary tracking-tight">{activeTab}</h1>
                <p className="text-sm font-medium text-slate-500">Real-time command center.</p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input type="text" placeholder="Search operations..." className="pl-10 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 rounded-xl text-sm font-medium outline-none transition-all w-64" />
                </div>
                <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-slate-50 transition-colors relative">
                  <Bell size={20} />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-orange-400 shadow-sm shadow-primary/20 flex items-center justify-center text-white font-bold border-2 border-white">
                  SA
                </div>
              </div>
            </div>
          </header>

          {/* DYNAMIC CONTENT based on Tabs */}
          <div className="flex-1 overflow-y-auto p-8 max-w-[1600px] w-full mx-auto pb-24">
            
            {/* TAB 1: NEIGHBORHOOD MAP */}
            {activeTab === 'Neighborhood Map' && (
              <div className="w-full h-[700px] flex gap-6">
                <div className="flex-1 bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden relative">
                  <div className="absolute top-5 left-6 z-10">
                    <h2 className="font-black text-lg text-secondary bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm flex items-center gap-2">
                      <Network size={18} className="text-emerald-500" /> Live Liquidity Map
                    </h2>
                  </div>
                  <DynamicMap />
                </div>

                <div className="w-80 flex flex-col gap-6">
                  {/* Stats Card */}
                  <div className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col gap-4">
                    <h3 className="font-bold text-slate-800 text-lg">Live Supply Metrics</h3>
                    
                    <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                      <span className="text-sm font-medium text-slate-500">Active Searches</span>
                      <span className="text-xl font-black text-secondary">4,892</span>
                    </div>
                    
                    <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                      <span className="text-sm font-medium text-slate-500">Open Shops (2km)</span>
                      <span className="text-xl font-black text-emerald-600">142</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-500">Active Riders</span>
                      <span className="text-xl font-black text-blue-600">84</span>
                    </div>
                  </div>

                  {/* Dead Zone Alert Card */}
                  <div className="bg-gradient-to-br from-red-50 to-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-red-100 mt-auto relative overflow-hidden group">
                    <div className="absolute -right-6 -top-6 text-red-100 opacity-50 group-hover:scale-110 transition-transform">
                      <AlertTriangle size={120} />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 text-red-600 mb-3">
                        <AlertTriangle size={20} className="animate-pulse" />
                        <h3 className="font-bold text-sm uppercase tracking-wider">Dead Zone Detected</h3>
                      </div>
                      <h4 className="font-black text-xl text-secondary mb-1">Sector 42, HSR</h4>
                      <p className="text-sm font-medium text-slate-600 mb-4">
                        1,420 unmet searches. 0 active vendors in range.
                      </p>
                      <button className="w-full bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700 transition-colors shadow-sm shadow-red-200">
                        Assign Sales Team
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: PRODUCT FIXER */}
            {activeTab === 'Product Fixer' && (
              <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden flex flex-col h-[700px]">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <div>
                    <h2 className="font-black text-xl text-secondary">Catalog Reconciliation</h2>
                    <p className="text-sm font-medium text-slate-500">Match messy vendor inputs to official Master Catalog SKUs.</p>
                  </div>
                  <div className="bg-orange-50 text-primary px-3 py-1 rounded-lg text-sm font-bold border border-orange-100">
                    23 Pending Reviews
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  
                  {/* Reconciliation Row 1 */}
                  <div className="flex items-stretch gap-4">
                    {/* Messy Input */}
                    <div className="flex-1 bg-red-50/50 border border-red-100 rounded-2xl p-4 flex flex-col justify-center">
                      <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">Vendor Input (Raw)</div>
                      <div className="font-mono text-slate-700 bg-white p-3 rounded-xl border border-red-100 shadow-sm">- "coke 0 tin 300ml"</div>
                      <div className="mt-3 text-xs font-medium text-slate-500">Vendor ID: #8492 | Submitted Price: ₹40</div>
                    </div>
                    
                    <div className="flex items-center text-slate-300">
                      <ChevronRight size={32} />
                    </div>

                    {/* Official Match */}
                    <div className="flex-1 bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 relative group">
                      <div className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">Algorithm Match (Official)</div>
                      <div className="font-bold text-secondary bg-white p-3 rounded-xl border border-emerald-100 shadow-sm flex items-center gap-2">
                        <CheckCircle2 size={18} className="text-emerald-500" />
                        + Coca-Cola Zero Can (300ml)
                      </div>
                      <div className="mt-3 text-xs font-medium text-slate-500">SKU: CCZ-300 | Master MRP: ₹40</div>
                      
                      {/* Action Buttons */}
                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="bg-white text-red-500 border border-red-100 px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-50 shadow-sm flex items-center gap-1">
                          <XCircle size={16} /> Reject
                        </button>
                        <button className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-emerald-700 shadow-sm shadow-emerald-200 flex items-center gap-1">
                          <CheckCircle2 size={16} /> Approve
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Reconciliation Row 2 */}
                  <div className="flex items-stretch gap-4 opacity-75">
                    {/* Messy Input */}
                    <div className="flex-1 bg-red-50/50 border border-red-100 rounded-2xl p-4 flex flex-col justify-center">
                      <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">Vendor Input (Raw)</div>
                      <div className="font-mono text-slate-700 bg-white p-3 rounded-xl border border-red-100 shadow-sm">- "lay magc masla 90g"</div>
                      <div className="mt-3 text-xs font-medium text-slate-500">Vendor ID: #1102 | Submitted Price: ₹20</div>
                    </div>
                    
                    <div className="flex items-center text-slate-300">
                      <ChevronRight size={32} />
                    </div>

                    {/* Official Match */}
                    <div className="flex-1 bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 relative group">
                      <div className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">Algorithm Match (Official)</div>
                      <div className="font-bold text-secondary bg-white p-3 rounded-xl border border-emerald-100 shadow-sm flex items-center gap-2">
                        <CheckCircle2 size={18} className="text-emerald-500" />
                        + Lay's Magic Masala (90g)
                      </div>
                      <div className="mt-3 text-xs font-medium text-slate-500">SKU: LYS-MM90 | Master MRP: ₹20</div>
                      
                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="bg-white text-red-500 border border-red-100 px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-50 shadow-sm flex items-center gap-1">
                          <XCircle size={16} /> Reject
                        </button>
                        <button className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-emerald-700 shadow-sm shadow-emerald-200 flex items-center gap-1">
                          <CheckCircle2 size={16} /> Approve
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* TAB 3: MONEY & LOGS */}
            {activeTab === 'Money & Logs' && (
              <div className="space-y-6">
                
                {/* ONDC Server Status */}
                <div className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-800 flex items-center gap-2"><Network size={18} className="text-blue-500" /> ONDC Logistics Network</h3>
                    <p className="text-sm font-medium text-slate-500">Live connection status to rider nodes.</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex gap-1.5">
                      {[...Array(12)].map((_, i) => (
                        <div key={i} className={`w-3 h-8 rounded-full ${i === 8 ? 'bg-orange-400 animate-pulse' : 'bg-emerald-400'}`}></div>
                      ))}
                    </div>
                    <div className="text-sm font-bold text-orange-500 bg-orange-50 px-3 py-1.5 rounded-xl border border-orange-100">
                      Node 8 Latency
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Financial Splits Grid */}
                  <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden flex flex-col h-[500px]">
                    <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                      <h3 className="font-bold text-slate-800 flex items-center gap-2"><DollarSign size={18} className="text-emerald-500" /> Financial Splits Ledger</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50">
                          <tr>
                            <th className="p-4 border-b border-slate-100">Order ID</th>
                            <th className="p-4 border-b border-slate-100">GROV</th>
                            <th className="p-4 border-b border-slate-100">Vendor (75%)</th>
                            <th className="p-4 border-b border-slate-100 text-blue-500">Rider (10%)</th>
                            <th className="p-4 border-b border-slate-100 text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm font-medium text-slate-700 divide-y divide-slate-50">
                          <tr>
                            <td className="p-4 font-bold">#ORD-9921</td>
                            <td className="p-4">₹1000</td>
                            <td className="p-4">₹750</td>
                            <td className="p-4 text-blue-600 font-bold">₹100</td>
                            <td className="p-4 text-right"><span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">Settled</span></td>
                          </tr>
                          <tr>
                            <td className="p-4 font-bold">#ORD-9922</td>
                            <td className="p-4">₹450</td>
                            <td className="p-4">₹337.50</td>
                            <td className="p-4 text-blue-600 font-bold">₹45</td>
                            <td className="p-4 text-right"><span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">Settled</span></td>
                          </tr>
                          <tr className="bg-red-50/30">
                            <td className="p-4 font-bold text-red-600">#ORD-9923</td>
                            <td className="p-4">₹120</td>
                            <td className="p-4">₹90</td>
                            <td className="p-4 text-blue-600 font-bold">₹12</td>
                            <td className="p-4 text-right"><span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded-lg animate-pulse">Disputed</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Dispute Queue Timeline */}
                  <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden flex flex-col h-[500px]">
                    <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                      <h3 className="font-bold text-slate-800 flex items-center gap-2"><AlertTriangle size={18} className="text-red-500" /> Dispute Resolution Queue</h3>
                      <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-lg">1 Active</span>
                    </div>
                    <div className="flex-1 p-6 overflow-y-auto space-y-4">
                      
                      {/* Normal Log */}
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-1"><Clock size={14} className="text-slate-400" /></div>
                        <div>
                          <p className="text-sm font-medium text-slate-600">Order #ORD-9921 completed successfully.</p>
                          <span className="text-xs text-slate-400">23:41:02</span>
                        </div>
                      </div>

                      {/* Critical Log */}
                      <div className="flex items-start gap-4 bg-red-50 p-4 rounded-2xl border border-red-100">
                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-1"><AlertTriangle size={14} className="text-red-600" /></div>
                        <div className="flex-1">
                          <h4 className="text-sm font-bold text-red-700 mb-1">CRITICAL DISPUTE: #ORD-9923</h4>
                          <p className="text-xs font-medium text-red-600 mb-3 bg-white/50 p-2 rounded-lg">"Driver stalled at location for 15 mins."</p>
                          <div className="flex items-center gap-3 text-xs font-bold text-slate-500 mb-4">
                            <span className="bg-white px-2 py-1 rounded-md border border-slate-200">Rider ID: R-4921</span>
                            <span className="bg-white px-2 py-1 rounded-md border border-slate-200">Vendor ID: V-1102</span>
                          </div>
                          <div className="flex gap-2">
                            <button className="bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-700 shadow-sm shadow-red-200 flex-1">
                              Refund User
                            </button>
                            <button className="bg-white text-slate-600 border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-50 shadow-sm flex-1">
                              Penalize Rider
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                
              </div>
            )}

            {/* TAB 4: STORE ONBOARDING */}
            {activeTab === 'Store Onboarding' && (
              <div className="space-y-6">
                
                {/* Modern Progress Bar */}
                <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-black text-secondary">Network Onboarding Target</h2>
                      <p className="text-sm font-medium text-slate-500">Launch threshold: 500 active vendor nodes.</p>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-black text-primary">342</span>
                      <span className="text-sm font-bold text-slate-400"> / 500 Stores</span>
                    </div>
                  </div>
                  
                  {/* Premium Progress Bar */}
                  <div className="h-6 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200 shadow-inner relative">
                    <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-orange-400 rounded-full transition-all duration-1000 ease-out flex items-center justify-end px-2" style={{ width: '68.4%' }}>
                      <span className="text-[10px] font-black text-white/90">68%</span>
                    </div>
                  </div>
                </div>

                {/* Node Sync Feed */}
                <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
                  <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2"><Server size={18} className="text-primary" /> Active Sync Sequences</h3>
                    <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-lg animate-pulse">Live</span>
                  </div>
                  
                  <div className="divide-y divide-slate-100">
                    
                    {/* Live Node */}
                    <div className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm border border-emerald-100">
                          <CheckCircle2 size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-secondary">Node: V-8492 (Supermart)</h4>
                          <p className="text-xs font-medium text-slate-500">Initial 10-min inventory ingestion completed.</p>
                        </div>
                      </div>
                      <div className="bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl shadow-md shadow-emerald-200 flex items-center gap-2 animate-bounce">
                        <div className="w-2 h-2 bg-white rounded-full"></div> Status: Connection Live
                      </div>
                    </div>

                    {/* Syncing Node */}
                    <div className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors opacity-70">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 shadow-sm border border-blue-100">
                          <Activity size={24} className="animate-spin" />
                        </div>
                        <div>
                          <h4 className="font-bold text-secondary">Node: V-8493 (Daily Needs)</h4>
                          <p className="text-xs font-medium text-slate-500">Mapping 4,200 SKUs to Master Catalog...</p>
                        </div>
                      </div>
                      <div className="bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl border border-blue-100">
                        Syncing (45%)
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: SYSTEM STRESS MONITOR */}
            {activeTab === 'Stress Monitor' && (
              <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden flex flex-col h-[750px]">
                <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                  <div>
                    <h2 className="font-black text-xl text-secondary flex items-center gap-2"><Zap size={24} className="text-amber-500" /> Live Operations Health</h2>
                    <p className="text-sm font-medium text-slate-500">Monitoring real-time order volume and automatic throttle triggers.</p>
                  </div>
                  <div className="bg-amber-50 text-amber-600 text-xs font-bold px-3 py-1.5 rounded-lg border border-amber-200 flex items-center gap-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-ping"></div> High Volume Detected
                  </div>
                </div>

                <div className="flex-1 p-8 overflow-y-auto bg-slate-50 relative">
                  {/* Decorative background lines to represent 'falling data branches' elegantly */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(90deg, #cbd5e1 1px, transparent 1px)', backgroundSize: '40px 100%' }}></div>
                  
                  <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                    
                    {/* Normal Traffic Log */}
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex gap-4">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center shrink-0"><Activity size={18} className="text-slate-500" /></div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-slate-400">18:42:10</span>
                          <span className="text-sm font-bold text-slate-700">Volume nominal in Sector 4</span>
                        </div>
                        <p className="text-sm text-slate-500">Processing 12 orders/min. 0 stores throttled.</p>
                      </div>
                    </div>

                    {/* Throttle Alert Card */}
                    <div className="bg-gradient-to-br from-red-500 to-rose-600 p-1 rounded-3xl shadow-xl shadow-red-200 animate-in slide-in-from-bottom-4 duration-500">
                      <div className="bg-white rounded-[22px] p-6 h-full flex gap-5">
                        <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center shrink-0 text-red-600">
                          <Zap size={28} />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-black text-xl text-red-600">Store Overwhelmed</h3>
                            <span className="bg-red-100 text-red-600 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-lg">Auto-Paused</span>
                          </div>
                          <p className="text-sm font-medium text-slate-600 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <strong>Vendor:</strong> V-2291 (FreshBazaar)<br/>
                            <strong>Trigger:</strong> Order queue exceeded 15 active tickets.<br/>
                            <strong>Action:</strong> Digital storefront temporarily hidden from consumer app to prevent SLA failure.
                          </p>
                          <div className="flex gap-3">
                            <button className="bg-red-600 text-white font-bold text-sm px-6 py-2.5 rounded-xl hover:bg-red-700 shadow-sm shadow-red-200">
                              Acknowledge
                            </button>
                            <button className="bg-white text-slate-600 font-bold text-sm px-6 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50">
                              Force Unpause
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Normal Traffic Log */}
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex gap-4">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center shrink-0"><Activity size={18} className="text-slate-500" /></div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-slate-400">18:43:05</span>
                          <span className="text-sm font-bold text-slate-700">Rider dispatch optimized</span>
                        </div>
                        <p className="text-sm text-slate-500">Re-routed 4 ONDC riders to Sector 42 high-demand cluster.</p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: VIRAL SPREAD */}
            {activeTab === 'Viral Spread' && (
              <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden flex flex-col h-[750px]">
                <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between z-10 relative">
                  <div>
                    <h2 className="font-black text-xl text-secondary flex items-center gap-2"><Share2 size={24} className="text-primary" /> WhatsApp Referral Graph</h2>
                    <p className="text-sm font-medium text-slate-500">Mapping neighborhood organic viral growth.</p>
                  </div>
                  <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 font-bold text-secondary text-sm">
                    K-Factor: <span className="text-emerald-500">1.4</span>
                  </div>
                </div>

                <div className="flex-1 relative bg-slate-50 overflow-hidden">
                  
                  {/* Modern Graph Visualization Area */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    
                    {/* SVG Connecting Lines (Elegant brand colors) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                      <path d="M 500 300 Q 600 200 700 250" fill="none" stroke="url(#orange-grad)" strokeWidth="3" strokeDasharray="5,5" className="animate-[dash_20s_linear_infinite]" />
                      <path d="M 500 300 Q 400 400 300 350" fill="none" stroke="url(#emerald-grad)" strokeWidth="3" />
                      <path d="M 700 250 Q 800 200 850 300" fill="none" stroke="url(#orange-grad)" strokeWidth="2" opacity="0.5" />
                      <path d="M 300 350 Q 200 300 150 400" fill="none" stroke="url(#emerald-grad)" strokeWidth="2" opacity="0.5" />
                      
                      <defs>
                        <linearGradient id="orange-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#ff5733" />
                          <stop offset="100%" stopColor="#fbbf24" />
                        </linearGradient>
                        <linearGradient id="emerald-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Nodes */}
                    
                    {/* Seed Node */}
                    <div className="absolute z-10" style={{ left: '500px', top: '300px', transform: 'translate(-50%, -50%)' }}>
                      <div className="relative group">
                        <div className="w-16 h-16 bg-primary rounded-full shadow-lg shadow-primary/30 flex items-center justify-center text-white border-4 border-white z-10 relative">
                          <Users size={24} />
                        </div>
                        <div className="absolute -inset-4 bg-primary/20 rounded-full animate-ping -z-10"></div>
                        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-lg shadow-md border border-slate-100 text-xs font-bold text-slate-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                          Seed: U-001 (14 Invites)
                        </div>
                      </div>
                    </div>

                    {/* Child Node 1 */}
                    <div className="absolute z-10" style={{ left: '700px', top: '250px', transform: 'translate(-50%, -50%)' }}>
                      <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-primary border-2 border-primary">
                        U
                      </div>
                    </div>

                    {/* Child Node 2 */}
                    <div className="absolute z-10" style={{ left: '300px', top: '350px', transform: 'translate(-50%, -50%)' }}>
                      <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-emerald-500 border-2 border-emerald-500">
                        U
                      </div>
                    </div>

                    {/* Grandchild Node 1 */}
                    <div className="absolute z-10" style={{ left: '850px', top: '300px', transform: 'translate(-50%, -50%)' }}>
                      <div className="w-8 h-8 bg-white rounded-full shadow-sm flex items-center justify-center text-slate-400 border border-slate-200">
                        U
                      </div>
                    </div>
                    
                    {/* Grandchild Node 2 */}
                    <div className="absolute z-10" style={{ left: '150px', top: '400px', transform: 'translate(-50%, -50%)' }}>
                      <div className="w-8 h-8 bg-white rounded-full shadow-sm flex items-center justify-center text-slate-400 border border-slate-200">
                        U
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </RoleGuard>
  );
}
