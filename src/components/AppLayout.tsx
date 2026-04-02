import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  MessageSquare, BookOpen, Calculator, Map, Link2, CalendarDays,
  Trophy, Target, Globe, User, ChevronLeft, ChevronRight, Sparkles, GraduationCap,
} from 'lucide-react';

const NAV = [
  { to: '/', icon: MessageSquare, label: 'AI Chat', emoji: '💬' },
  { to: '/curriculum', icon: BookOpen, label: 'Curriculum', emoji: '📚' },
  { to: '/cgpa', icon: Calculator, label: 'CGPA Calc', emoji: '🧮' },
  { to: '/roadmap', icon: Map, label: 'Roadmap', emoji: '🗺️' },
  { to: '/resources', icon: Link2, label: 'Resources', emoji: '🔗' },
  { to: '/planner', icon: CalendarDays, label: 'Planner', emoji: '📝' },
  { to: '/practice', icon: Trophy, label: 'Practice', emoji: '🏆' },
  { to: '/internship', icon: Target, label: 'Internship', emoji: '🎯' },
  { to: '/higher-study', icon: Globe, label: 'Higher Study', emoji: '🌐' },
  { to: '/about', icon: User, label: 'About', emoji: 'ℹ️' },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen overflow-hidden mesh-bg">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative z-50 h-full flex flex-col transition-all duration-300 ease-in-out
          ${collapsed ? 'w-[68px]' : 'w-[260px]'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          bg-sidebar border-r border-sidebar-border
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 h-16 border-b border-sidebar-border shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0 glow-border">
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <h1 className="text-sm font-heading font-bold text-foreground leading-tight truncate">
                HSTU CSE Guide
              </h1>
              <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-accent" /> AI Platform
              </p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
          {NAV.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200 group
                  ${isActive
                    ? 'bg-primary/15 text-primary font-semibold glow-border'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  }
                  ${collapsed ? 'justify-center px-0' : ''}
                `}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`} />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(c => !c)}
          className="hidden lg:flex items-center justify-center h-10 border-t border-sidebar-border text-muted-foreground hover:text-foreground transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center gap-3 h-14 px-4 border-b border-border bg-card/50 backdrop-blur-sm shrink-0">
          <button onClick={() => setMobileOpen(true)} className="text-muted-foreground hover:text-foreground">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <GraduationCap className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-heading font-bold text-sm text-foreground">HSTU CSE Guide AI</span>
        </div>
        {children}
      </main>
    </div>
  );
}
