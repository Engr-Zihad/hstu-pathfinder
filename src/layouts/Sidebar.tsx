import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare, Search, BookOpen, Calculator, Calendar, FileText,
  Code2, Palette, TestTube, Link2, Brain, Shield, Cloud, Smartphone, Trophy,
  Globe, Code, Zap, Swords, BookMarked, Terminal, GraduationCap, Database,
  Briefcase, Globe2, Map, User, Settings, ChevronLeft, ChevronRight, Plus,
} from 'lucide-react';

const sections = [
  {
    label: 'CORE AI',
    items: [
      { to: '/chat', icon: MessageSquare, label: 'AI Chat' },
      { to: '/search', icon: Search, label: 'Smart Search' },
    ],
  },
  {
    label: 'ACADEMICS',
    items: [
      { to: '/curriculum', icon: BookOpen, label: 'Curriculum' },
      { to: '/cgpa', icon: Calculator, label: 'CGPA Calculator' },
      { to: '/planner', icon: Calendar, label: 'Study Planner' },
      { to: '/notes', icon: FileText, label: 'My Notes' },
    ],
  },
  {
    label: 'LEARNING TRACKS',
    items: [
      { to: '/track/webdev', icon: Code2, label: 'Web Development' },
      { to: '/track/uiux', icon: Palette, label: 'UI/UX Design' },
      { to: '/track/sqa', icon: TestTube, label: 'SQA & Testing' },
      { to: '/track/web3', icon: Link2, label: 'Web3 & Blockchain' },
      { to: '/track/aiml', icon: Brain, label: 'AI & Machine Learning' },
      { to: '/track/cyber', icon: Shield, label: 'Cybersecurity' },
      { to: '/track/cloud', icon: Cloud, label: 'Cloud & DevOps' },
      { to: '/track/mobile', icon: Smartphone, label: 'Mobile Development' },
      { to: '/track/cp', icon: Trophy, label: 'Competitive Prog.' },
    ],
  },
  {
    label: 'PLATFORMS',
    items: [
      { to: '/platform/w3schools', icon: Globe, label: 'W3Schools' },
      { to: '/platform/hackerrank', icon: Code, label: 'HackerRank' },
      { to: '/platform/leetcode', icon: Zap, label: 'LeetCode' },
      { to: '/platform/codeforces', icon: Swords, label: 'Codeforces' },
      { to: '/platform/gfg', icon: BookMarked, label: 'GeeksforGeeks' },
      { to: '/platform/freecodecamp', icon: Terminal, label: 'freeCodeCamp' },
      { to: '/platform/coursera', icon: GraduationCap, label: 'Coursera' },
      { to: '/platform/kaggle', icon: Database, label: 'Kaggle' },
      { to: '/platform/cs50', icon: GraduationCap, label: 'CS50 Harvard' },
    ],
  },
  {
    label: 'CAREER',
    items: [
      { to: '/internship', icon: Briefcase, label: 'Internship & Jobs' },
      { to: '/higher-study', icon: Globe2, label: 'Higher Study Abroad' },
      { to: '/roadmap', icon: Map, label: 'Career Roadmap' },
    ],
  },
  {
    label: 'INFO',
    items: [
      { to: '/about', icon: User, label: 'About Developer' },
      { to: '/settings', icon: Settings, label: 'Settings' },
    ],
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem('hstu_sidebar_collapsed') === 'true';
  });
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('hstu_sidebar_collapsed', String(collapsed));
  }, [collapsed]);

  return (
    <aside
      className={`fixed top-0 left-0 h-full z-40 transition-all duration-300 flex flex-col border-r border-border bg-[hsl(var(--sidebar-background))] ${
        collapsed ? 'w-[72px]' : 'w-[260px]'
      } hidden md:flex`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-border shrink-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
          <Brain className="w-5 h-5 text-primary-foreground" />
        </div>
        {!collapsed && (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-heading font-bold text-foreground truncate">
            HSTU CSE AI
          </motion.span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors shrink-0"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* New Chat button */}
      <div className="px-3 py-3 shrink-0">
        <NavLink
          to="/chat"
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4 shrink-0" />
          {!collapsed && <span>New Chat</span>}
        </NavLink>
      </div>

      {/* Nav sections */}
      <nav className="flex-1 overflow-y-auto px-3 pb-4 space-y-4">
        {sections.map((section) => (
          <div key={section.label}>
            {!collapsed && (
              <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase px-3 mb-1.5">
                {section.label}
              </p>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = location.pathname === item.to;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    title={item.label}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                      isActive
                        ? 'bg-primary/10 text-primary border-l-[3px] border-primary'
                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground border-l-[3px] border-transparent'
                    }`}
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-border shrink-0">
        {!collapsed ? (
          <p className="text-[10px] text-muted-foreground text-center">© 2025 HSTU CSE Guide AI</p>
        ) : (
          <p className="text-[10px] text-muted-foreground text-center">CSE</p>
        )}
      </div>
    </aside>
  );
}
