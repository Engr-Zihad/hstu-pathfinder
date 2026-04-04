import React from 'react';
import { useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useSidebar } from '@/contexts/SidebarContext';

const routeTitles: Record<string, string> = {
  '/chat': 'AI Chat',
  '/search': 'Smart Search',
  '/curriculum': 'Curriculum',
  '/teachers': 'Teachers',
  '/cgpa': 'CGPA Calculator',
  '/planner': 'Study Planner',
  '/notes': 'My Notes',
  '/internship': 'Internship & Jobs',
  '/higherstudy': 'Higher Study',
  '/roadmap': 'Career Roadmap',
  '/about': 'About Developer',
  '/settings': 'Settings',
};

const TopHeader: React.FC = () => {
  const { toggle } = useSidebar();
  const location = useLocation();

  const getTitle = () => {
    if (location.pathname.startsWith('/track/')) return 'Learning Track';
    if (location.pathname.startsWith('/platform/')) return 'Platform Guide';
    return routeTitles[location.pathname] || 'HSTU CSE Guide AI';
  };

  return (
    <header className="sticky top-0 z-30 flex items-center h-14 px-4 border-b border-[--border] md:hidden"
      style={{ background: 'rgba(13,17,23,0.9)', backdropFilter: 'blur(12px)' }}>
      <button onClick={toggle} className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 text-[--text-2]">
        <Menu className="w-5 h-5" />
      </button>
      <h2 className="ml-3 font-heading font-semibold text-sm text-[--text-1] truncate">{getTitle()}</h2>
    </header>
  );
};

export default React.memo(TopHeader);
