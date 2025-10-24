'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import type { UserRole } from '@/lib/types';

export function useRequireAuth(role?: UserRole) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!user) {
      router.replace('/login');
      return;
    }

    if (role && user.role !== role) {
      // If role is specified and doesn't match, redirect to home.
      // The home page will then redirect them to their correct dashboard.
      router.replace('/');
    }
  }, [user, loading, role, router]);

  return { user, loading };
}
