"use client";

import React, { useState, useEffect } from 'react';
import { Check, ChevronRight } from 'lucide-react';
import styles from './Orders.module.css';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const mockOrders = JSON.parse(localStorage.getItem('mockOrders') || '[]');
      setOrders(mockOrders);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) return <div style={{ padding: '2rem' }}>Loading orders...</div>;
  if (orders.length === 0) return (
    <div style={{ padding: '2rem', background: 'white', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
      You have no past orders.
    </div>
  );

  return (
    <>
      <h1 className={styles.pageTitle}>My Orders</h1>
      <div className={styles.ordersList}>
        {orders.map(order => (
          <div key={order.id} className={styles.orderCard}>
            <div className={styles.orderHeader}>
              <div className={styles.statusBox}>
                <div className={styles.checkIcon}>
                  <Check size={16} />
                </div>
                <div className={styles.statusInfo}>
                  <h4>{order.status}</h4>
                  <p>₹{order.total} • {new Date(order.createdAt).toLocaleString()}</p>
                </div>
              </div>
              <ChevronRight className={styles.chevron} />
            </div>
            
            <div className={styles.productRow}>
              {order.items.slice(0, 5).map((item: any) => (
                <div key={item.id} className={styles.productImgBox}>
                  <img src={item.product.image} alt={item.product.name} />
                </div>
              ))}
              {order.items.length > 5 && (
                <div className={styles.moreBox}>
                  +{order.items.length - 5}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
