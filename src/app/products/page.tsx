"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { useCartStore } from '@/store/useCartStore';
import { useLocationStore } from '@/store/useLocationStore';
import { categories as staticCategories, products as staticProducts } from '@/lib/staticData';
import { Search, MapPin, Crosshair, Clock, Plus, Minus, ArrowRight } from 'lucide-react';

export default function ProductsPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const { items, addItem, removeItem, outOfRangeItemIds } = useCartStore();
  const { address } = useLocationStore();
  const [isMounted, setIsMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsMounted(true);
    setCategories(staticCategories);
    
    // Check if URL has a categoryId
    const params = new URLSearchParams(window.location.search);
    const urlCatId = params.get('categoryId');
    
    if (urlCatId && staticCategories.find((c: any) => c.id === urlCatId)) {
      setActiveCategoryId(urlCatId);
    } else {
      setActiveCategoryId(staticCategories[0].id);
    }
  }, []);

  useEffect(() => {
    if (activeCategoryId) {
      let filtered = staticProducts.filter(p => p.categoryId === activeCategoryId);
      if (searchQuery) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
      }
      setProducts(filtered);
    }
  }, [activeCategoryId, searchQuery]);

  const activeCategory = categories.find(c => c.id === activeCategoryId);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <div className="flex-1 max-w-[1600px] w-full mx-auto flex overflow-hidden" style={{ height: 'calc(100vh - 80px)' }}>
        
        {/* Sticky Sidebar */}
        <aside className="w-[280px] bg-white border-r border-slate-200 hidden md:flex flex-col h-full overflow-y-auto">
          <div className="p-4 border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-md z-10">
            <h3 className="font-extrabold text-secondary text-lg">Categories</h3>
          </div>
          <div className="p-2 flex flex-col gap-1">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategoryId(cat.id)}
                className={`flex items-center gap-3 w-full p-2.5 rounded-xl text-left transition-all duration-200 group ${
                  cat.id === activeCategoryId 
                    ? 'bg-orange-50/50 shadow-sm border border-orange-100' 
                    : 'hover:bg-slate-50 border border-transparent'
                }`}
              >
                <div className={`w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center overflow-hidden shrink-0 transition-transform duration-300 ${cat.id === activeCategoryId ? 'scale-105 shadow-sm' : 'group-hover:scale-105'}`}>
                  <img src={cat.image} alt={cat.name} className="w-8 h-8 object-contain" />
                </div>
                <span className={`text-sm font-semibold flex-1 ${cat.id === activeCategoryId ? 'text-primary' : 'text-slate-600 group-hover:text-slate-800'}`}>
                  {cat.name}
                </span>
                {cat.id === activeCategoryId && (
                  <ArrowRight size={16} className="text-primary shrink-0" />
                )}
              </button>
            ))}
          </div>
        </aside>

        {/* Main Catalog Area */}
        <main className="flex-1 h-full overflow-y-auto bg-slate-50 relative scroll-smooth">
          
          {/* Geospatial Search Header */}
          <div className="sticky top-0 z-20 bg-slate-50/90 backdrop-blur-lg border-b border-slate-200 px-6 py-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-secondary tracking-tight">
                  {activeCategory?.name || 'Loading...'}
                </h1>
              </div>

              {/* Dynamic Geospatial Search Bar */}
              <div className="relative max-w-md w-full">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search size={18} className="text-slate-400" />
                </div>
                <input 
                  type="text" 
                  placeholder={`Search near ${address ? address.split(',')[0] : 'your location'}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white border-2 border-slate-200 focus:border-primary/50 focus:shadow-[0_0_20px_rgba(255,87,51,0.1)] rounded-2xl text-sm font-medium outline-none transition-all duration-300 placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="p-6">
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <Search size={48} className="opacity-20 mb-4" />
                <p className="font-medium text-lg text-slate-500">No items found.</p>
                <p className="text-sm mt-1">Try expanding your search term or checking another category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {products.map(product => {
                  const cartItem = items.find(i => i.id === product.id);
                  const isOutOfRange = outOfRangeItemIds.includes(product.id);

                  return (
                    <div 
                      key={product.id} 
                      className={`group relative bg-white border rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                        isOutOfRange ? 'border-orange-200 opacity-80' : 'border-slate-100'
                      }`}
                    >
                      <div className="relative w-full aspect-square p-4 flex items-center justify-center bg-slate-50/50 group-hover:bg-slate-50 transition-colors">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className={`w-full h-full object-contain transform transition-transform duration-500 group-hover:scale-110 ${isOutOfRange ? 'grayscale opacity-70' : ''}`}
                        />
                      </div>
                      
                      <div className="p-4 flex flex-col flex-1">
                        <h3 className={`text-sm font-bold line-clamp-2 leading-snug mb-1 ${isOutOfRange ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                          {product.name}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium mb-4">{product.qty}</p>
                        
                        <div className="mt-auto flex items-center justify-between">
                          <div className={`font-black text-lg ${isOutOfRange ? 'text-slate-400' : 'text-secondary'}`}>
                            ₹{product.price}
                          </div>
                          
                          {/* Cart Actions */}
                          {isOutOfRange ? (
                            <div className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-1.5 rounded-lg border border-orange-100">
                              Out of Range
                            </div>
                          ) : isMounted && cartItem ? (
                            <div className="flex items-center gap-3 bg-primary text-white px-2 py-1 rounded-xl shadow-lg shadow-primary/30 animate-in zoom-in-95 duration-200">
                              <button onClick={() => removeItem(product.id)} className="w-6 h-6 flex items-center justify-center font-bold hover:bg-white/20 rounded-md transition-colors"><Minus size={14} /></button>
                              <span className="font-bold text-sm w-3 text-center">{cartItem.quantity}</span>
                              <button onClick={() => addItem(product)} className="w-6 h-6 flex items-center justify-center font-bold hover:bg-white/20 rounded-md transition-colors"><Plus size={14} /></button>
                            </div>
                          ) : (
                            <button 
                              onClick={() => addItem(product)} 
                              className="text-xs font-bold text-primary bg-orange-50 hover:bg-primary hover:text-white border border-orange-100 px-4 py-2 rounded-xl transition-all duration-300"
                            >
                              ADD
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
