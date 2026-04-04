import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { MessageSquare, BookOpen, Calculator, Map, User } from 'lucide-react';

const items = [
  { path: '/chat', icon: MessageSquare, label: 'Chat' },
  { path: '/curriculum', icon: BookOpen, label: 'Curriculum' },
  { path: '/cgpa', icon: Calculator, label: 'CGPA' },
  { path: '/roadmap', icon: Map, label: 'Roadmap' },
  { path: '/about', icon: User, label: 'About' },
];

const MobileBottomNav: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex items-center justify-around h-16 border-t border-[--border]"
      style={{ background: 'rgba(13,17,23,0.95)', backdropFilter: 'blur(12px)' }}>
      {items.map(item => {
        const isActive = location.pathname === item.path;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1 py-1 px-3 min-w-[56px] ${
              isActive ? 'text-blue-400' : 'text-[--text-3]'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default React.memo(MobileBottomNav);
