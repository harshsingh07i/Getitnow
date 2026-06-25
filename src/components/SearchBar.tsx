"use client";

import React, { useState } from 'react';
import { Search, Mic, Camera, MapPin } from 'lucide-react';
import styles from './SearchBar.module.css';

export default function SearchBar() {
  const [query, setQuery] = useState('');

  return (
    <div className={styles.searchContainer}>
      <div className={styles.locationBadge}>
        <MapPin size={16} className={styles.iconPrimary} />
        <span>Deliver to: Home (Within 2km)</span>
      </div>
      
      <h1 className="text-gradient">What do you need right now?</h1>
      
      <div className={styles.searchBox}>
        <Search className={styles.iconSecondary} size={24} />
        <input 
          type="text" 
          placeholder="e.g. 'cold soft drink and a packet of instant noodles'" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.input}
        />
        <div className={styles.actions}>
          <button className={styles.actionBtn} aria-label="Voice Search">
            <Mic size={20} />
          </button>
          <button className={styles.actionBtn} aria-label="Visual Search">
            <Camera size={20} />
          </button>
        </div>
      </div>
      <p className={styles.hint}>Powered by Conversational AI & Dynamic 2km Geofencing</p>
    </div>
  );
}
