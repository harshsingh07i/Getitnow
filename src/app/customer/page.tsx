import React from 'react';
import Header from '@/components/Header';
import HomeBanners from '@/components/HomeBanners';
import CategoryGrid from '@/components/CategoryGrid';
import RoleGuard from '@/components/RoleGuard';

import Footer from '@/components/Footer';

export default function CustomerDashboard() {
  return (
    <RoleGuard allowedRoles={['customer']}>
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Header />
        <main className="container mx-auto flex-1">
          <HomeBanners />
          <CategoryGrid />
        </main>
        <Footer />
      </div>
    </RoleGuard>
  );
}
