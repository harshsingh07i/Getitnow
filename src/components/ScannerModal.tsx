"use client";

import React, { useState, useEffect } from 'react';
import { X, ScanLine, Loader2, CheckCircle2, PackagePlus } from 'lucide-react';

interface ScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ScannerState = 'scanning' | 'processing' | 'detected' | 'added';

export default function ScannerModal({ isOpen, onClose }: ScannerModalProps) {
  const [scanState, setScanState] = useState<ScannerState>('scanning');
  
  useEffect(() => {
    if (isOpen) {
      setScanState('scanning');
      
      // Simulate scanning process
      const scanTimer = setTimeout(() => setScanState('processing'), 2500);
      const processTimer = setTimeout(() => setScanState('detected'), 3500);
      
      return () => {
        clearTimeout(scanTimer);
        clearTimeout(processTimer);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAddToInventory = () => {
    setScanState('added');
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-slate-900/95 backdrop-blur-md animate-in fade-in duration-300">
      
      {/* Top Header */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-50">
        <h2 className="text-white font-bold text-xl flex items-center gap-2">
          <ScanLine className="text-primary" />
          Handheld Scanner
        </h2>
        <button 
          onClick={onClose}
          className="text-white/50 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* Main Viewfinder Area */}
      {scanState === 'scanning' && (
        <div className="relative w-full max-w-sm aspect-[3/4] flex items-center justify-center animate-in zoom-in-95 duration-500">
          
          {/* Scanner Overlay Box */}
          <div className="absolute inset-0 border-2 border-white/20 rounded-3xl overflow-hidden shadow-[0_0_0_4000px_rgba(15,23,42,0.8)] z-10 pointer-events-none">
            {/* Viewfinder Corners */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-primary rounded-tl-3xl m-4"></div>
            <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-primary rounded-tr-3xl m-4"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-primary rounded-bl-3xl m-4"></div>
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-primary rounded-br-3xl m-4"></div>
            
            {/* Animated Laser Line */}
            <div className="absolute left-0 right-0 h-1 bg-primary/80 shadow-[0_0_20px_4px_rgba(255,87,51,0.6)] animate-[scan_2s_ease-in-out_infinite]"></div>
          </div>

          <div className="z-20 text-white flex flex-col items-center justify-center gap-4">
            <ScanLine size={48} className="text-white/30 animate-pulse" />
            <p className="font-mono text-sm tracking-widest text-primary uppercase animate-pulse">Align Barcode within frame</p>
          </div>

          {/* Fake Camera Feed Background (Dark) */}
          <div className="absolute inset-0 bg-slate-800 rounded-3xl -z-10"></div>
        </div>
      )}

      {scanState === 'processing' && (
        <div className="flex flex-col items-center justify-center gap-6 animate-in fade-in duration-300">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <ScanLine size={24} className="text-primary" />
            </div>
          </div>
          <p className="text-white font-mono uppercase tracking-widest text-sm">Parsing EAN Database...</p>
        </div>
      )}

      {scanState === 'detected' && (
        <div className="w-full max-w-md bg-white rounded-[2rem] p-8 shadow-2xl animate-in slide-in-from-bottom-10 duration-500 mx-4">
          <div className="flex gap-6 mb-8">
            <div className="w-24 h-24 bg-slate-50 rounded-xl border border-slate-100 p-2 shrink-0 shadow-inner">
              <img src="https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=100&q=80" alt="Lays" className="w-full h-full object-contain mix-blend-multiply" />
            </div>
            <div>
              <div className="text-xs font-mono text-slate-400 mb-1">EAN: 8901491101912</div>
              <h3 className="font-bold text-slate-800 text-lg leading-tight mb-2">Lay's Magic Masala Potato Chips</h3>
              <p className="text-sm font-medium text-slate-500">Category: Snacks & Munchies</p>
              <p className="text-sm font-medium text-slate-500">Weight: 90g</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Stock Quantity</label>
              <input type="number" defaultValue={24} className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-800 outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Selling Price (₹)</label>
              <input type="number" defaultValue={20} className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-800 outline-none focus:border-primary" />
            </div>
          </div>

          <button 
            onClick={handleAddToInventory}
            className="w-full bg-secondary hover:bg-slate-800 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95"
          >
            <PackagePlus size={20} />
            Push to Live Inventory
          </button>
        </div>
      )}

      {scanState === 'added' && (
        <div className="flex flex-col items-center justify-center gap-4 animate-in zoom-in duration-300">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.4)]">
            <CheckCircle2 size={48} className="text-white" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight mt-4">Inventory Updated</h2>
          <p className="text-slate-300 font-medium text-sm">Product is now live within your 2km catchment.</p>
        </div>
      )}
      
      {/* Required CSS for Laser Animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { top: 10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 90%; opacity: 0; }
        }
      `}} />
    </div>
  );
}
