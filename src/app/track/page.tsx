"use client";

import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Package, Phone, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import styles from './Track.module.css';

export default function TrackOrder() {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => Math.min(prev + 5, 100));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />
      <main className="container" style={{ padding: '2rem 1rem' }}>
        <h1 className="text-gradient" style={{ marginBottom: '1.5rem' }}>Live ONDC Tracking</h1>
        
        <div className={styles.trackingContainer}>
          <div className={styles.mapView}>
            {/* Map Placeholder */}
            <div className={styles.mapPlaceholder}>
              <div className={styles.radar}></div>
              <MapPin size={32} className={styles.markerStore} style={{ top: '30%', left: '30%' }} />
              <MapPin size={32} className={styles.markerStore} style={{ top: '40%', left: '70%' }} />
              <Navigation size={32} className={styles.markerRider} style={{ top: `${80 - progress * 0.5}%`, left: `${40 + progress * 0.1}%` }} />
              <div className={styles.markerHome} style={{ bottom: '10%', right: '20%' }}>Home</div>
            </div>
          </div>
          
          <div className={styles.statusPanel}>
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <div className={styles.etaHeader}>
                <h2>Arriving in</h2>
                <div className={styles.etaTime}>12 mins</div>
              </div>
              
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
              </div>
              
              <div className={styles.statusSteps}>
                <div className={`${styles.step} ${progress >= 10 ? styles.stepActive : ''}`}>
                  <CheckCircle size={20} /> Order Confirmed
                </div>
                <div className={`${styles.step} ${progress >= 30 ? styles.stepActive : ''}`}>
                  <Package size={20} /> Merchants Packing
                </div>
                <div className={`${styles.step} ${progress >= 60 ? styles.stepActive : ''}`}>
                  <Navigation size={20} /> ONDC Rider Picked Up
                </div>
              </div>
              
              <div className={styles.riderInfo}>
                <div className={styles.riderAvatar}>R</div>
                <div>
                  <h4 style={{ margin: 0 }}>Rahul Kumar</h4>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Dunzo Delivery Partner</p>
                </div>
                <button className={styles.callBtn} aria-label="Call Rider"><Phone size={20} /></button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
