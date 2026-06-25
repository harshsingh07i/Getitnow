"use client";

import React from 'react';
import { Clock, Navigation, Plus } from 'lucide-react';
import styles from './HyperlocalFeed.module.css';

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Cold Coca-Cola (750ml)",
    price: 45,
    store: "Sharma General Store",
    distance: "200m",
    eta: "6 mins",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=200&auto=format&fit=crop",
    category: "Grocery"
  },
  {
    id: 2,
    name: "Maggi Masala Noodles (70g)",
    price: 14,
    store: "Sharma General Store",
    distance: "200m",
    eta: "6 mins",
    image: "https://images.unsplash.com/photo-1612929633738-8fe01f38e4c5?q=80&w=200&auto=format&fit=crop",
    category: "Grocery"
  },
  {
    id: 3,
    name: "Crocin Advance 500mg",
    price: 35,
    store: "City Pharmacy",
    distance: "450m",
    eta: "10 mins",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ad?q=80&w=200&auto=format&fit=crop",
    category: "Pharmacy"
  },
  {
    id: 4,
    name: "Type-C Charging Cable (1m)",
    price: 150,
    store: "Tech World Mobile",
    distance: "800m",
    eta: "14 mins",
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=200&auto=format&fit=crop",
    category: "Electronics"
  }
];

export default function HyperlocalFeed() {
  return (
    <div className={styles.feedContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>Available Nearby</h2>
        <div className={styles.sorter}>
          <span className={styles.sorterLabel}>Sort by:</span>
          <select className={styles.sorterSelect}>
            <option>Fastest ETA (Urgency)</option>
            <option>Nearest Distance</option>
            <option>Lowest Price</option>
          </select>
        </div>
      </div>
      
      <div className={styles.grid}>
        {MOCK_PRODUCTS.map((product, idx) => (
          <div key={product.id} className={`${styles.card} glass-panel`} style={{ animationDelay: `${idx * 0.1}s` }}>
            <div className={styles.imageBox}>
              <img src={product.image} alt={product.name} className={styles.image} />
              <div className={styles.categoryBadge}>{product.category}</div>
            </div>
            
            <div className={styles.content}>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.storeName}>{product.store}</p>
              
              <div className={styles.metrics}>
                <span className={styles.metric}>
                  <Navigation size={14} className={styles.metricIcon} />
                  {product.distance}
                </span>
                <span className={styles.metric}>
                  <Clock size={14} className={styles.metricIcon} />
                  {product.eta}
                </span>
              </div>
              
              <div className={styles.footer}>
                <span className={styles.price}>₹{product.price}</span>
                <button className={`btn btn-primary ${styles.addBtn}`}>
                  <Plus size={18} />
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
