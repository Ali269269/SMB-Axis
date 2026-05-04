'use client';

import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab?: string;
  title?: string;
  userName?: string;
  userImage?: string;
}

export default function AdminLayout({
  children,
  activeTab = 'overview',
  title = 'Dashboard',
  userName = 'John Doe',
  userImage = '/images/jhon.jpg',
}: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#0c0c18] text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Header */}
        <Header title={title} userName={userName} userImage={userImage} />

        {/* Page Content */}
        <main className="flex-1 px-8 py-6 flex flex-col gap-6">
          {children}
        </main>
      </div>
    </div>
  );
}
