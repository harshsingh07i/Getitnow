import React from 'react';
import Header from '@/components/Header';
import HomeBanners from '@/components/HomeBanners';
import CategoryGrid from '@/components/CategoryGrid';
import RoleGuard from '@/components/RoleGuard';

export default function CustomerDashboard() {
  return (
    <RoleGuard allowedRoles={['customer']}>
      <Header />
      <main className="container mx-auto">
        <HomeBanners />
        <CategoryGrid />
      </main>
    </RoleGuard>
  );
}
