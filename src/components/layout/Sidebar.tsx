import React, { useCallback } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSidebar } from '@/contexts/SidebarContext';
import AIAvatar from '@/components/ui/AIAvatar';
import {
  MessageSquare, Search, BookOpen, Users, Calculator, Calendar, FileText,
  Code2, Palette, TestTube2, Blocks, Brain, Shield, Cloud, Smartphone, Trophy,
  Globe, Code, Zap, Swords, BookMarked, Terminal, GraduationCap, Database,
  Briefcase, Globe2, Map, User, Settings, ChevronLeft, ChevronRight
} from 'lucide-react';

interface NavSection {
  label: string;
  items: { path: string; icon: React.ElementType; label: string }[];
}

const sections: NavSection[] = [
  {
    label: 'CORE AI',
    items: [
      { path: '/chat', icon: MessageSquare, label: 'AI Chat' },
      { path: '/search', icon: Search, label: 'Smart Search' },
    ],
  },
  {
    label: 'ACADEMICS',
    items: [
      { path: '/curriculum', icon: BookOpen, label: 'Curriculum' },
      { path: '/teachers', icon: Users, label: 'Teachers' },
      { path: '/cgpa', icon: Calculator, label: 'CGPA Calculator' },
      { path: '/planner', icon: Calendar, label: 'Study Planner' },
      { path: '/notes', icon: FileText, label: 'My Notes' },
    ],
  },
  {
    label: 'LEARNING TRACKS',
    items: [
      { path: '/track/webdev', icon: Code2, label: 'Web Development' },
      { path: '/track/uiux', icon: Palette, label: 'UI/UX Design' },
      { path: '/track/sqa', icon: TestTube2, label: 'SQA & Testing' },
      { path: '/track/web3', icon: Blocks, label: 'Web3 & Blockchain' },
      { path: '/track/aiml', icon: Brain, label: 'AI & ML' },
      { path: '/track/cyber', icon: Shield, label: 'Cybersecurity' },
      { path: '/track/cloud', icon: Cloud, label: 'Cloud & DevOps' },
      { path: '/track/mobile', icon: Smartphone, label: 'Mobile Dev' },
      { path: '/track/cp', icon: Trophy, label: 'Competitive Prog' },
    ],
  },
  {
    label: 'PLATFORMS',
    items: [
      { path: '/platform/w3schools', icon: Globe, label: 'W3Schools' },
      { path: '/platform/hackerrank', icon: Code, label: 'HackerRank' },
      { path: '/platform/leetcode', icon: Zap, label: 'LeetCode' },
      { path: '/platform/codeforces', icon: Swords, label: 'Codeforces' },
      { path: '/platform/gfg', icon: BookMarked, label: 'GeeksforGeeks' },
      { path: '/platform/freecodecamp', icon: Terminal, label: 'freeCodeCamp' },
      { path: '/platform/coursera', icon: GraduationCap, label: 'Coursera' },
      { path: '/platform/kaggle', icon: Database, label: 'Kaggle' },
      { path: '/platform/cs50', icon: GraduationCap, label: 'CS50 Harvard' },
    ],
  },
  {
    label: 'CAREER',
    items: [
      { path: '/internship', icon: Briefcase, label: 'Internship & Jobs' },
      { path: '/higherstudy', icon: Globe2, label: 'Higher Study' },
      { path: '/roadmap', icon: Map, label: 'Career Roadmap' },
    ],
  },
  {
    label: 'INFO',
    items: [
      { path: '/about', icon: User, label: 'About Developer' },
      { path: '/settings', icon: Settings, label: 'Settings' },
    ],
  },
];

const Sidebar: React.FC = () => {
  const { isOpen, isCollapsed, close, toggleCollapse } = useSidebar();
  const location = useLocation();

  const handleNavClick = useCallback(() => {
    if (window.innerWidth < 768) close();
  }, [close]);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={close} />
      )}

      <aside
        className={`fixed top-0 left-0 h-full z-50 flex flex-col transition-all duration-300 border-r border-[--border]
          ${isCollapsed ? 'w-[72px]' : 'w-[268px]'}
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
        style={{ background: '#0d1117' }}
      >
        {/* Header */}
        <div className={`flex items-center gap-3 p-4 border-b border-[--border] ${isCollapsed ? 'justify-center' : ''}`}>
          <AIAvatar size={32} />
          {!isCollapsed && (
            <div className="min-w-0">
              <h1 className="font-heading font-bold text-sm text-[--text-1] truncate">CSE Guide AI</h1>
              <p className="text-[10px] text-[--text-3]">HSTU Dinajpur</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-4">
          {sections.map(section => (
            <div key={section.label}>
              {!isCollapsed && (
                <p className="text-[10px] font-semibold text-[--text-3] uppercase tracking-wider px-3 mb-1">
                  {section.label}
                </p>
              )}
              <div className="space-y-0.5">
                {section.items.map(item => {
                  const isActive = location.pathname === item.path;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={handleNavClick}
                      title={isCollapsed ? item.label : undefined}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all group
                        ${isActive
                          ? 'bg-blue-500/10 text-blue-400 border-l-[3px] border-blue-400'
                          : 'text-[--text-2] hover:bg-white/5 hover:text-[--text-1] border-l-[3px] border-transparent'
                        }
                        ${isCollapsed ? 'justify-center px-2' : ''}
                      `}
                    >
                      <item.icon className={`w-[18px] h-[18px] shrink-0 ${isActive ? 'text-blue-400' : ''}`} />
                      {!isCollapsed && <span className="truncate">{item.label}</span>}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-[--border] flex items-center justify-between">
          {!isCollapsed && <span className="text-[10px] text-[--text-3]">v1.0 • HSTU CSE</span>}
          <button
            onClick={toggleCollapse}
            className="hidden md:flex w-7 h-7 items-center justify-center rounded-lg hover:bg-white/10 text-[--text-3]"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </aside>
    </>
  );
};

export default React.memo(Sidebar);
