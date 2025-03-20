'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { routes } from '@/routes';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push(routes.login);
  }, [router]);

  return null;
}