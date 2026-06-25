"use client";

import React from 'react';
import Header from '@/components/Header';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import styles from './layout.module.css';

const SIDEBAR_LINKS = [
  { id: 'addresses', label: 'My Addresses', href: '/account/addresses' },
  { id: 'orders', label: 'My Orders', href: '/account/orders' },
  { id: 'prescriptions', label: 'My Prescriptions', href: '/account/prescriptions' },
  { id: 'giftcards', label: 'E-Gift Cards', href: '/account/giftcards' },
  { id: 'privacy', label: 'Account privacy', href: '/account/privacy' },
  { id: 'logout', label: 'Logout', href: '#' },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { phone, logout } = useAuthStore();

  return (
    <>
      <Header />
      <div className={styles.containerWrap}>
        <div className={styles.layout}>
          
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.phoneBox}>
              {phone || 'Not logged in'}
            </div>
            <nav className={styles.nav}>
              {SIDEBAR_LINKS.map(link => {
                const isActive = pathname.startsWith(link.href);
                return (
                  <Link 
                    href={link.href} 
                    key={link.id} 
                    className={`${styles.navItem} ${isActive ? styles.navActive : ''}`}
                    onClick={(e) => {
                      if (link.id === 'logout') {
                        e.preventDefault();
                        logout();
                      }
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className={styles.mainContent}>
            {children}
          </main>

        </div>
      </div>
    </>
  );
}
