"use client";

import React from 'react';
import { X, CheckCircle, Navigation } from 'lucide-react';
import Link from 'next/link';
import styles from './CartPanel.module.css';

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  store: string;
}

const CART_ITEMS: CartItem[] = [
  { id: 1, name: "Cold Coca-Cola (750ml)", price: 45, qty: 2, store: "Sharma General Store" },
  { id: 2, name: "Crocin Advance 500mg", price: 35, qty: 1, store: "City Pharmacy" }
];

export default function CartPanel({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;

  const stores = Array.from(new Set(CART_ITEMS.map(i => i.store)));
  const subtotal = CART_ITEMS.reduce((sum, i) => sum + (i.price * i.qty), 0);
  const delivery = 25;
  const total = subtotal + delivery;

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.panel}>
        <div className={styles.header}>
          <h2>Multi-Merchant Cart</h2>
          <button onClick={onClose} className={styles.closeBtn}><X size={24} /></button>
        </div>

        <div className={styles.content}>
          <div className={styles.splitNotice}>
            <CheckCircle size={16} className={styles.splitIcon} />
            <p>Smart Split: Your order will be routed to {stores.length} independent merchants concurrently for fastest delivery.</p>
          </div>

          {stores.map(store => (
            <div key={store} className={styles.storeSection}>
              <h3 className={styles.storeName}>{store}</h3>
              {CART_ITEMS.filter(i => i.store === store).map(item => (
                <div key={item.id} className={styles.cartItem}>
                  <div className={styles.itemInfo}>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemPrice}>₹{item.price} x {item.qty}</span>
                  </div>
                  <span className={styles.itemTotal}>₹{item.price * item.qty}</span>
                </div>
              ))}
            </div>
          ))}

          <div className={styles.logistics}>
            <h3>ONDC Logistics Quote</h3>
            <div className={styles.quoteRow}>
              <span><Navigation size={14} className="inline mr-1" /> Dynamic Delivery</span>
              <span>₹{delivery}</span>
            </div>
            <p className={styles.quoteHint}>Based on current traffic and 1.2km combined distance.</p>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.totals}>
            <span>Total to pay</span>
            <span className={styles.totalPrice}>₹{total}</span>
          </div>
          <Link href="/track" className="btn btn-primary w-full" onClick={onClose}>Pay via UPI & Track</Link>
        </div>
      </div>
    </>
  );
}
