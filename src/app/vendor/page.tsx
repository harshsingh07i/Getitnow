"use client";

import React, { useState } from 'react';
import RoleGuard from '@/components/RoleGuard';
import { useAuthStore } from '@/store/useAuthStore';
import { Store, LogOut, Bell, Users, Zap, TrendingUp, Target, RefreshCw, Package, Wallet } from 'lucide-react';
import ScannerModal from '@/components/ScannerModal';
import Footer from '@/components/Footer';

export default function VendorDashboard() {
  const { logout } = useAuthStore();
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isDiscountActive, setIsDiscountActive] = useState(false);

  return (
    <RoleGuard allowedRoles={['vendor']}>
      <div className="min-h-screen bg-slate-50 pb-20">
        
        {/* Vendor Topbar */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-tertiary/20 text-yellow-600 rounded-lg flex items-center justify-center">
                <Store size={18} />
              </div>
              <h1 className="font-bold text-xl text-slate-800 tracking-tight">Vendor Portal</h1>
            </div>
            <div className="flex items-center gap-6">
              <button className="relative text-slate-400 hover:text-slate-600">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary rounded-full border-2 border-white"></span>
              </button>
              <div className="h-6 w-px bg-slate-200"></div>
              <button onClick={logout} className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary transition-colors">
                <LogOut size={16} /> Logout
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-secondary mb-1">Welcome back, Fresh Mart!</h2>
              <p className="text-slate-500">Your digital catchment area is highly active right now.</p>
            </div>
            <button 
              onClick={() => setIsScannerOpen(true)}
              className="bg-primary hover:bg-[#E64A2E] text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/30 transition-transform active:scale-95 flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              + Scan & Add Inventory
            </button>
          </div>

          {/* Hyper-Local Price Flexing Widget */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-orange-500 to-primary rounded-[2rem] p-6 sm:p-8 text-white shadow-xl shadow-primary/20 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
              {/* Background abstract shape */}
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="relative z-10 flex-1">
                <h3 className="text-2xl md:text-3xl font-black tracking-tight leading-tight mb-2">
                  200+ users are searching for "Cold Drinks" within 1km.
                </h3>
                <p className="text-orange-50 font-medium">
                  Your store is perfectly positioned. Deploy a flash discount to capture this immediate demand loop.
                </p>
              </div>

              <div className="relative z-10 shrink-0 w-full md:w-auto">
                {isDiscountActive ? (
                  <div className="bg-white/20 border border-white/30 backdrop-blur-md px-6 py-4 rounded-2xl flex items-center gap-4 animate-in fade-in zoom-in duration-300">
                    <div className="w-10 h-10 bg-green-400 rounded-full flex items-center justify-center shrink-0">
                      <Zap size={20} className="text-white fill-white" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white uppercase tracking-wider">Flash Discount Active</div>
                      <div className="text-xs text-green-100 mt-0.5">Capturing hyper-local traffic...</div>
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={() => setIsDiscountActive(true)}
                    className="w-full md:w-auto bg-white text-primary hover:bg-orange-50 px-8 py-4 rounded-2xl font-black text-lg shadow-lg transition-transform hover:-translate-y-1 active:scale-95"
                  >
                    Deploy 10% Flash Discount
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Dynamic Catchment Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            
            {/* Live Foot-Traffic Density */}
            <div className="lg:col-span-2 bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-bold text-xl text-slate-800">Live Digital Catchment</h3>
                  <p className="text-sm text-slate-500 mt-1">Users currently within your 2km radius</p>
                </div>
              </div>

              {/* Mock Catchment Visualization */}
              <div className="flex-1 min-h-[250px] bg-slate-50 rounded-2xl border border-slate-200 relative overflow-hidden flex items-center justify-center p-4">
                {/* Abstract radar/heat map circles */}
                <div className="absolute w-[400px] h-[400px] rounded-full border border-primary/10 flex items-center justify-center">
                  <div className="w-[300px] h-[300px] rounded-full border border-primary/20 flex items-center justify-center bg-primary/5">
                    <div className="w-[150px] h-[150px] rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                      <div className="w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_rgba(255,87,51,0.8)] relative z-10">
                        {/* Store marker */}
                        <div className="absolute -top-8 -left-8 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded-md whitespace-nowrap">Your Store</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Mock user nodes overlapping */}
                <div className="absolute w-2 h-2 bg-blue-500 rounded-full top-[30%] left-[40%] shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-pulse"></div>
                <div className="absolute w-2 h-2 bg-blue-500 rounded-full top-[45%] left-[60%] shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-[pulse_2s_ease-in-out_infinite]"></div>
                <div className="absolute w-2 h-2 bg-blue-500 rounded-full top-[60%] left-[35%] shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-[pulse_1.5s_ease-in-out_infinite]"></div>
                <div className="absolute w-2 h-2 bg-blue-500 rounded-full top-[20%] left-[70%] shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                
                {/* Cluster showing the demand surge */}
                <div className="absolute top-[35%] right-[20%] text-center z-10">
                  <div className="w-16 h-16 bg-yellow-400/20 border border-yellow-400/50 rounded-full flex items-center justify-center animate-pulse mx-auto mb-1">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Stats */}
            <div className="flex flex-col gap-6">
              <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex-1 flex flex-col justify-center">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                  <Users size={24} />
                </div>
                <div className="text-slate-500 text-sm font-medium mb-1">Overlapping Active Users</div>
                <div className="text-4xl font-black text-slate-800">842</div>
              </div>
              
              <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex-1 flex flex-col justify-center">
                <div className="w-12 h-12 bg-tertiary/20 rounded-xl flex items-center justify-center text-yellow-600 mb-4">
                  <Target size={24} />
                </div>
                <div className="text-slate-500 text-sm font-medium mb-1">Catchment Conversion Rate</div>
                <div className="text-4xl font-black text-slate-800">4.2%</div>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Percentage of overlapping users who completed an order from you.
                </p>
              </div>
            </div>
            
          </div>
          
          {/* Store Performance Metrics */}
          <div>
            <h3 className="font-bold text-xl text-slate-800 mb-6 flex items-center gap-2">
              <TrendingUp size={24} className="text-primary" />
              Store Performance
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {[
                { label: 'Fulfillment Speed', value: '2.4 mins', desc: 'Avg. prep time per order', color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Inventory Accuracy', value: '99.8%', desc: 'Successful scan-to-cart rate', color: 'text-green-600', bg: 'bg-green-50' },
                { label: 'Customer Rating', value: '4.9/5', desc: 'From 342 local reviews', color: 'text-yellow-600', bg: 'bg-yellow-50' },
                { label: "Today's Revenue", value: '₹14,250', desc: '+22% vs yesterday', color: 'text-primary', bg: 'bg-orange-50' }
              ].map((metric, i) => (
                <div key={i} className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between hover:border-orange-200 hover:shadow-md transition-all">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl mb-4 flex items-center justify-center shrink-0 ${metric.bg} ${metric.color}`}>
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">{metric.value}</div>
                    <div className="font-bold text-sm text-slate-700 mt-1">{metric.label}</div>
                    <div className="text-xs font-medium text-slate-400 mt-1 leading-tight">{metric.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* --- DETAILED ANALYTICS EXPANSION --- */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* 1. Operations & SLA Tracking */}
            <div className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-sm border border-slate-100">
              <h3 className="font-bold text-xl text-slate-800 mb-6 flex items-center gap-2">
                <RefreshCw size={24} className="text-blue-500" />
                Operations & SLAs
              </h3>
              
              {/* Pack-Time Distribution Chart (Mock CSS) */}
              <div className="mb-8">
                <div className="flex justify-between text-sm font-bold text-slate-700 mb-3">
                  <span>Pack-Time Distribution</span>
                  <span className="text-green-600">Goal: &lt; 3 mins</span>
                </div>
                <div className="flex h-6 rounded-full overflow-hidden w-full bg-slate-100">
                  <div className="bg-green-500 h-full w-[78%] relative group cursor-pointer">
                    <div className="absolute opacity-0 group-hover:opacity-100 -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap transition-opacity z-10">78% (&lt; 2 mins)</div>
                  </div>
                  <div className="bg-yellow-400 h-full w-[15%] relative group cursor-pointer">
                    <div className="absolute opacity-0 group-hover:opacity-100 -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap transition-opacity z-10">15% (2-5 mins)</div>
                  </div>
                  <div className="bg-red-500 h-full w-[7%] relative group cursor-pointer">
                    <div className="absolute opacity-0 group-hover:opacity-100 -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap transition-opacity z-10">7% (&gt; 5 mins)</div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"></div> Excellent (&lt; 2m)</span>
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-yellow-400"></div> Okay (2-5m)</span>
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500"></div> Breach (&gt; 5m)</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="text-sm font-medium text-slate-500 mb-1">Avg Rider Handoff</div>
                  <div className="text-2xl font-black text-slate-800">45 sec</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="text-sm font-medium text-slate-500 mb-1">Order Defect Rate</div>
                  <div className="text-2xl font-black text-slate-800">0.4%</div>
                </div>
              </div>
            </div>

            {/* 2. Missed Opportunity Radar */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 sm:p-8 rounded-[2rem] shadow-lg text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Target size={120} />
              </div>
              <div className="relative z-10">
                <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
                  <Target size={24} className="text-orange-400" />
                  Missed Opportunity Radar
                </h3>
                <p className="text-slate-400 text-sm mb-6">Local search queries with zero inventory match in your store.</p>
                
                <div className="space-y-3">
                  {[
                    { query: "Oat Milk 1L", searches: 84, trend: "up" },
                    { query: "Avocado", searches: 56, trend: "up" },
                    { query: "Coke Zero Can", searches: 42, trend: "neutral" },
                  ].map((item, i) => (
                    <div key={i} className="bg-white/10 border border-white/10 backdrop-blur-sm p-4 rounded-xl flex items-center justify-between">
                      <div>
                        <div className="font-bold text-sm">"{item.query}"</div>
                        <div className="text-xs text-orange-300 mt-1">{item.searches} searches nearby today</div>
                      </div>
                      <button className="bg-white text-slate-900 text-xs font-bold px-3 py-2 rounded-lg hover:bg-orange-400 hover:text-white transition-colors">
                        Add Stock
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Inventory Health (Top Movers vs Dead Stock) */}
            <div className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-sm border border-slate-100 lg:col-span-2">
              <h3 className="font-bold text-xl text-slate-800 mb-6 flex items-center gap-2">
                <Package size={24} className="text-primary" />
                Inventory Health
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Top Movers */}
                <div>
                  <h4 className="font-bold text-sm text-green-600 mb-4 uppercase tracking-wider flex items-center gap-2">
                    <TrendingUp size={16} /> Top Movers
                  </h4>
                  <div className="space-y-3">
                    {['Amul Taaza Milk 500ml', 'Britannia Bread 400g', 'Lays Magic Masala 90g', 'Coca Cola 1.25L'].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="text-sm font-semibold text-slate-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dead Stock */}
                <div>
                  <h4 className="font-bold text-sm text-red-500 mb-4 uppercase tracking-wider flex items-center gap-2">
                    <TrendingUp size={16} className="rotate-180" /> Dead Stock Warning
                  </h4>
                  <div className="space-y-3">
                    {['Premium Saffron 1g', 'Imported Blueberries 100g', 'Gourmet Cheese Block'].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-red-50 rounded-xl border border-red-100">
                        <span className="text-sm font-semibold text-slate-700">{item}</span>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 border-2 border-dashed border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 font-bold py-3 rounded-xl transition-colors text-sm">
                    Run Clearance Sale on Dead Stock
                  </button>
                </div>
              </div>
            </div>

            {/* 4. Hourly Revenue Heatmap */}
            <div className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-sm border border-slate-100 lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-xl text-slate-800 flex items-center gap-2">
                  <Wallet size={24} className="text-green-600" />
                  Hourly Revenue Heatmap
                </h3>
                <div className="text-right">
                  <div className="text-sm text-slate-500">Average Order Value</div>
                  <div className="font-black text-secondary">₹245</div>
                </div>
              </div>
              
              {/* CSS Grid Heatmap Simulator */}
              <div className="w-full overflow-x-auto pb-4">
                <div className="min-w-[600px]">
                  <div className="grid grid-cols-12 gap-2 h-24">
                    {[1,2,3,4,3,2,1,5,8,9,6,4].map((intensity, i) => (
                      <div key={i} className="flex flex-col justify-end group">
                        <div 
                          className="w-full bg-primary/20 rounded-t-lg transition-all group-hover:bg-primary/40 relative"
                          style={{ height: `${intensity * 10}%`, backgroundColor: `rgba(255, 87, 51, ${intensity * 0.1 + 0.1})` }}
                        >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-slate-800 text-white text-xs px-2 py-1 rounded shadow whitespace-nowrap transition-opacity">
                            ₹{intensity * 1500}
                          </div>
                        </div>
                        <div className="text-[10px] font-bold text-slate-400 text-center mt-2 border-t border-slate-100 pt-1">
                          {i * 2 + 8}:00
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

        </main>
        <Footer />
      </div>

      <ScannerModal isOpen={isScannerOpen} onClose={() => setIsScannerOpen(false)} />
    </RoleGuard>
  );
}
