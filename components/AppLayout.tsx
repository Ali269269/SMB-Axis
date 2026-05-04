'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showNavbar = !pathname.includes('Admin-Dashboard');

  return (
    <>
      {/* Fixed Navbar sits above all content */}
      {showNavbar && <Navbar />}
      {/* Page content */}
      {children}
    </>
  );
}