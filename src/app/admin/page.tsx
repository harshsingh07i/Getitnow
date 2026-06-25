"use client";

import React, { useState } from 'react';
import RoleGuard from '@/components/RoleGuard';
import { useAuthStore } from '@/store/useAuthStore';
import { 
  ShieldCheck, LogOut, Activity, Target, Network, Layers, 
  Zap, AlertOctagon, TrendingUp, Search, Bell, MapPin, 
  UserPlus, Navigation
} from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import MapComponent to disable SSR for Leaflet
const DynamicMap = dynamic(() => import('@/components/MapComponent'), { ssr: false, loading: () => <div className="w-full h-full bg-slate-100 animate-pulse flex items-center justify-center text-slate-400 font-medium">Loading geospatial data...</div> });

export default function AdminDashboard() {
  const { logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <RoleGuard allowedRoles={['admin']}>
      <div className="min-h-screen flex bg-slate-50 overflow-hidden font-sans">
        
        {/* SIDEBAR */}
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
          <div className="p-6 flex items-center gap-3 border-b border-slate-100">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <ShieldCheck size={24} />
            </div>
            <h2 className="text-xl font-black tracking-tight text-secondary">City Ops</h2>
          </div>
          
          <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest px-4 mb-3 mt-2">Main Menu</div>
            {[
              { icon: Activity, label: 'Overview' },
              { icon: Network, label: 'Global Ripple Map' },
              { icon: Target, label: 'Dead Zones' },
              { icon: Navigation, label: 'Rider Heatmaps' },
              { icon: Layers, label: 'Supply Layer' },
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
        <main className="flex-1 flex flex-col h-screen overflow-y-auto bg-slate-50/50">
          
          {/* HEADER */}
          <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-10">
            <div className="px-8 py-4 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-black text-secondary tracking-tight">Command Center</h1>
                <p className="text-sm font-medium text-slate-500">Real-time geospatial supply & demand tracking.</p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input type="text" placeholder="Search sectors, vendors..." className="pl-10 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 rounded-xl text-sm font-medium outline-none transition-all w-64" />
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

          {/* DASHBOARD GRID */}
          <div className="p-8 max-w-[1600px] w-full mx-auto space-y-6">
            
            {/* TOP METRICS ROW */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex items-center gap-5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Network size={28} />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-500 mb-1">Active Vendor Nodes</div>
                  <div className="flex items-end gap-3">
                    <span className="text-3xl font-black text-secondary leading-none">1,204</span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-lg mb-0.5">+12 today</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex items-center gap-5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow">
                <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                  <AlertOctagon size={28} />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-500 mb-1">Critical Dead Zones</div>
                  <div className="flex items-end gap-3">
                    <span className="text-3xl font-black text-secondary leading-none">3</span>
                    <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-lg mb-0.5">High Priority</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex items-center gap-5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                  <Zap size={28} />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-500 mb-1">ONDC Rider Surplus</div>
                  <div className="flex items-end gap-3">
                    <span className="text-3xl font-black text-secondary leading-none">+8.4%</span>
                    <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-lg mb-0.5">Healthy SLA</span>
                  </div>
                </div>
              </div>
            </div>

            {/* MIDDLE ROW: MAP & PIPELINE */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">
              
              {/* GLOBAL RIPPLE MAP WIDGET */}
              <div className="lg:col-span-2 bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden flex flex-col relative group">
                <div className="absolute top-5 left-6 z-10">
                  <h2 className="font-black text-lg text-secondary bg-white/80 backdrop-blur-md px-3 py-1 rounded-xl shadow-sm">Live Ripple Map</h2>
                </div>
                
                {/* Map Container */}
                <div className="relative flex-1 bg-slate-100 overflow-hidden">
                  {/* Dynamic React-Leaflet Map Integration */}
                  <DynamicMap />
                </div>

                {/* Map Footer Tools */}
                <div className="h-14 bg-white border-t border-slate-100 flex items-center px-6 gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <span className="text-xs font-bold text-slate-600">High Liquidity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-xs font-bold text-slate-600">Demand Gap</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-xs font-bold text-slate-600">Active Rider</span>
                  </div>
                </div>
              </div>

              {/* DEAD ZONE ACTION PIPELINE */}
              <div className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col h-full overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-black text-lg text-secondary flex items-center gap-2">
                    <Target size={20} className="text-red-500" />
                    Dead Zone Pipeline
                  </h2>
                  <span className="bg-red-50 text-red-600 text-xs font-bold px-2 py-1 rounded-lg">3 Actionable</span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                  
                  {/* Alert Item 1 */}
                  <div className="p-4 rounded-2xl border-2 border-red-100 bg-red-50/30">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-slate-800 text-sm">Sector 42, HSR Layout</h4>
                      <span className="text-[10px] font-extrabold text-red-500 uppercase tracking-wider bg-white px-2 py-1 rounded-md border border-red-100 shadow-sm">Critical</span>
                    </div>
                    <p className="text-xs font-medium text-slate-600 mb-4 leading-relaxed">
                      1,420 unmet searches for "Cold Drinks" in last 24h. Zero vendor overlap.
                    </p>
                    <button className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold py-2 rounded-xl transition-colors shadow-sm">
                      <UserPlus size={14} /> Assign Sales Rep
                    </button>
                  </div>

                  {/* Alert Item 2 */}
                  <div className="p-4 rounded-2xl border border-orange-100 bg-orange-50/30">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-slate-800 text-sm">Phase 1, Electronic City</h4>
                      <span className="text-[10px] font-extrabold text-orange-500 uppercase tracking-wider bg-white px-2 py-1 rounded-md border border-orange-100 shadow-sm">High</span>
                    </div>
                    <p className="text-xs font-medium text-slate-600 mb-4 leading-relaxed">
                      850 unmet searches for "Fresh Bread". Nearest vendor is 3.2km away.
                    </p>
                    <button className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold py-2 rounded-xl transition-colors shadow-sm">
                      <UserPlus size={14} /> Assign Sales Rep
                    </button>
                  </div>

                </div>
              </div>
            </div>

            {/* BOTTOM ROW: ONDC LOGISTICS */}
            <div className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
              <h2 className="font-black text-lg text-secondary flex items-center gap-2 mb-6">
                <Navigation size={20} className="text-blue-500" />
                ONDC Logistics Utilization
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {['North Zone', 'South Zone', 'East Zone', 'West Zone'].map((zone, i) => {
                  const usage = [82, 94, 65, 45][i];
                  const color = usage > 90 ? 'bg-red-500' : usage > 70 ? 'bg-emerald-500' : 'bg-orange-500';
                  const label = usage > 90 ? 'Strained' : usage > 70 ? 'Optimal' : 'Underutilized';
                  
                  return (
                    <div key={zone} className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="flex justify-between items-end mb-3">
                        <span className="font-bold text-sm text-slate-700">{zone}</span>
                        <span className="text-xs font-bold text-slate-500">{usage}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden mb-3">
                        <div className={`h-full ${color} rounded-full`} style={{ width: usage + '%' }}></div>
                      </div>
                      <span className="text-xs font-bold text-slate-500">{label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </main>
        
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes riderMove1 {
            0% { transform: translate(0, 0); }
            50% { transform: translate(40px, -20px); }
            100% { transform: translate(0, 0); }
          }
          @keyframes riderMove2 {
            0% { transform: translate(0, 0); }
            50% { transform: translate(-30px, 30px); }
            100% { transform: translate(0, 0); }
          }
        `}} />
      </div>
    </RoleGuard>
  );
}
