"use client";

import React from 'react';
import { Home as HomeIcon, MapPin, MoreVertical } from 'lucide-react';
import { useLocationStore } from '@/store/useLocationStore';
import styles from './Addresses.module.css';

export default function AddressesPage() {
  const { savedAddresses, openModal } = useLocationStore();

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>My addresses</h1>
        <button className={styles.addBtn} onClick={openModal}>
          + Add new address
        </button>
      </div>

      <div className={styles.addressList}>
        {savedAddresses.map((addr) => (
          <div key={addr.id} className={styles.addressCard}>
            <div className={styles.iconBox}>
              {addr.type === 'Home' ? <HomeIcon size={20} className={styles.iconYellow} /> : <MapPin size={20} className={styles.iconYellow} />}
            </div>
            <div className={styles.addressInfo}>
              <h4 className={styles.addressType}>{addr.type}</h4>
              <p className={styles.addressDetails}>{addr.details}</p>
            </div>
            <button className={styles.menuBtn}>
              <MoreVertical size={20} />
            </button>
          </div>
        ))}
        {savedAddresses.length === 0 && (
          <div className={styles.emptyState}>No saved addresses.</div>
        )}
      </div>
    </>
  );
}
