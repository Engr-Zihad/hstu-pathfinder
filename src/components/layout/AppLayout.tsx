import React from 'react';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import MobileBottomNav from './MobileBottomNav';
import { useSidebar } from '@/contexts/SidebarContext';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isCollapsed } = useSidebar();

  return (
    <div className="min-h-screen relative">
      {/* Animated blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute" style={{ top: -100, left: -100, width: 500, height: 500, background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)', animation: 'blobFloat1 10s ease-in-out infinite alternate' }} />
        <div className="absolute" style={{ top: '20%', right: -150, width: 400, height: 400, background: 'radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)', animation: 'blobFloat2 12s ease-in-out infinite alternate' }} />
        <div className="absolute" style={{ bottom: -100, left: '30%', width: 450, height: 450, background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)', animation: 'blobFloat3 9s ease-in-out infinite alternate' }} />
      </div>

      <Sidebar />
      <div
        className={`relative z-10 flex flex-col min-h-screen transition-all duration-300 ${
          isCollapsed ? 'md:ml-[72px]' : 'md:ml-[268px]'
        }`}
      >
        <TopHeader />
        <main className="flex-1 flex flex-col pb-16 md:pb-0">
          {children}
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
};

export default React.memo(AppLayout);
