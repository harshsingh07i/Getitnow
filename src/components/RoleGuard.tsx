"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore, UserRole } from '@/store/useAuthStore';

interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

export default function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const router = useRouter();
  const { isLoggedIn, role } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      if (!isLoggedIn || !role || !allowedRoles.includes(role)) {
        router.push('/');
      }
    }
  }, [isMounted, isLoggedIn, role, allowedRoles, router]);

  if (!isMounted) {
    // Prevent hydration mismatch by rendering nothing on the server
    return null;
  }

  // Double check before rendering
  if (!isLoggedIn || !role || !allowedRoles.includes(role)) {
    return null;
  }

  return <>{children}</>;
}
