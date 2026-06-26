"use client";

import React from 'react';
import { MapContainer, TileLayer, Circle, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React-Leaflet
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom icon for Active Riders
const RiderIcon = L.divIcon({
  className: 'custom-rider-icon',
  html: '<div style="width:12px;height:12px;background-color:#3b82f6;border-radius:50%;border:2px solid white;box-shadow:0 0 8px rgba(59,130,246,0.8);"></div>',
  iconSize: [12, 12],
  iconAnchor: [6, 6]
});

// Custom icon for Dead Zones Alert Node
const AlertIcon = L.divIcon({
  className: 'custom-alert-icon',
  html: '<div style="position:relative;width:32px;height:32px;display:flex;align-items:center;justify-content:center;"><div style="position:absolute;inset:0;background-color:#ef4444;border-radius:50%;opacity:0.3;animation:pulse 2s cubic-bezier(0.4,0,0.6,1) infinite;"></div><div style="width:12px;height:12px;background-color:#ef4444;border-radius:50%;border:2px solid white;box-shadow:0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -4px rgba(0,0,0,0.1);"></div></div>',
  iconSize: [32, 32],
  iconAnchor: [16, 16]
});

export default function MapComponent() {
  const centerPosition: [number, number] = [12.9250, 77.6350]; // Bangalore HSR Layout

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer 
        center={centerPosition} 
        zoom={13} 
        scrollWheelZoom={true}
        zoomControl={false}
        className="w-full h-full absolute inset-0 bg-slate-50"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {/* --- LIQUIDITY RIPPLES --- */}
        <Circle 
          center={[12.9150, 77.6300]} 
          pathOptions={{ fillColor: '#10b981', color: '#10b981', fillOpacity: 0.2, weight: 1 }} 
          radius={1200} 
        />
        <Circle 
          center={[12.9100, 77.6350]} 
          pathOptions={{ fillColor: '#10b981', color: '#10b981', fillOpacity: 0.15, weight: 1 }} 
          radius={1500} 
        />
        <Circle 
          center={[12.9350, 77.6250]} 
          pathOptions={{ fillColor: '#10b981', color: '#10b981', fillOpacity: 0.2, weight: 1 }} 
          radius={1000} 
        />

        {/* --- ALGORITHMIC DEAD ZONES --- */}
        <Circle 
          center={[12.9180, 77.6550]} 
          pathOptions={{ fillColor: '#ef4444', color: 'transparent', fillOpacity: 0.2 }} 
          radius={1500} 
        />
        <Marker position={[12.9180, 77.6550]} icon={AlertIcon} />

        {/* --- ONDC RIDERS --- */}
        <Marker position={[12.9130, 77.6320]} icon={RiderIcon} />
        <Marker position={[12.9320, 77.6230]} icon={RiderIcon} />
        <Marker position={[12.9150, 77.6380]} icon={RiderIcon} />
        <Marker position={[12.9380, 77.6180]} icon={RiderIcon} />

      </MapContainer>

      <style dangerouslySetInnerHTML={{__html: `
        .leaflet-container {
          background-color: #f8fafc;
          font-family: inherit;
        }
        .leaflet-control-attribution {
          display: none;
        }
      `}} />
    </div>
  );
}
