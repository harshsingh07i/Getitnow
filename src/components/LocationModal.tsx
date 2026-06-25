"use client";

import React, { useState } from 'react';
import { X, MapPin, Home as HomeIcon, Edit2, Trash2, Navigation, Search } from 'lucide-react';
import { useLocationStore } from '@/store/useLocationStore';

export default function LocationModal() {
  const { isModalOpen, closeModal, setAddress, savedAddresses, addAddress } = useLocationStore();
  const [isDetecting, setIsDetecting] = useState(false);

  if (!isModalOpen) return null;

  const handleDetectLocation = () => {
    setIsDetecting(true);
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      setIsDetecting(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
          const data = await res.json();
          if (data && data.display_name) {
            setAddress(data.display_name); // Set global header address
            addAddress({ type: 'Current Location', details: data.display_name }); // Add to saved addresses list
          } else {
            alert("Could not detect address from coordinates.");
          }
        } catch (error) {
          console.error("Error fetching reverse geocoding:", error);
          alert("Error detecting your location.");
        } finally {
          setIsDetecting(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert('Unable to retrieve your location. Please check your browser permissions.');
        setIsDetecting(false);
      }
    );
  };

  return (
    <div 
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[1000] flex items-center justify-center p-4 transition-opacity duration-300" 
      onClick={closeModal}
    >
      <div 
        className="bg-white w-full max-w-[500px] max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300" 
        onClick={e => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100 bg-white">
          <h2 className="text-xl font-extrabold text-secondary tracking-tight">Change Location</h2>
          <button 
            className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors" 
            onClick={closeModal}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto bg-slate-50 flex-1">
          
          {/* Action Row */}
          <div className="flex flex-col gap-4 mb-8">
            <button 
              className="w-full bg-orange-50 hover:bg-orange-100 text-primary border border-orange-200 py-4 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50" 
              onClick={handleDetectLocation}
              disabled={isDetecting}
            >
              <Navigation size={18} className={isDetecting ? "animate-spin" : ""} />
              {isDetecting ? 'Detecting your location...' : 'Use current location'}
            </button>
            
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative bg-slate-50 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                OR
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={18} className="text-slate-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search delivery location" 
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 focus:border-primary/50 focus:shadow-[0_0_15px_rgba(255,87,51,0.1)] rounded-xl text-sm font-medium outline-none transition-all duration-300 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Saved Addresses */}
          <div>
            <h3 className="text-sm font-bold text-slate-800 mb-4 px-1">Your saved addresses</h3>
            <div className="flex flex-col gap-3">
              {savedAddresses.map((addr) => (
                <div 
                  key={addr.id} 
                  className="bg-white border border-slate-100 hover:border-orange-200 hover:shadow-md rounded-2xl p-4 flex gap-4 cursor-pointer transition-all group"
                  onClick={() => setAddress(addr.details)}
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    {addr.type === 'Home' ? (
                      <HomeIcon size={20} className="text-primary" />
                    ) : (
                      <MapPin size={20} className="text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-800 text-sm mb-1">{addr.type}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed truncate-2-lines">{addr.details}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <button className="text-xs font-bold text-slate-400 hover:text-secondary transition-colors" onClick={(e) => e.stopPropagation()}>Edit</button>
                      <span className="text-slate-300">&bull;</span>
                      <button className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors" onClick={(e) => e.stopPropagation()}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
