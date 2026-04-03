import { ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { MessageSquare, BookOpen, Calculator, Map, User } from 'lucide-react';
import Sidebar from './Sidebar';

const mobileNavItems = [
  { to: '/chat', icon: MessageSquare, label: 'Chat' },
  { to: '/curriculum', icon: BookOpen, label: 'Curriculum' },
  { to: '/cgpa', icon: Calculator, label: 'CGPA' },
  { to: '/roadmap', icon: Map, label: 'Roadmap' },
  { to: '/about', icon: User, label: 'About' },
];

export default function AppLayout({ children }: { children: ReactNode }) {
  const collapsed = typeof window !== 'undefined' && localStorage.getItem('hstu_sidebar_collapsed') === 'true';

  return (
    <div className="min-h-screen mesh-bg relative">
      {/* Animated gradient blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute -top-12 -right-24 w-80 h-80 bg-[hsl(var(--purple))]/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-accent/8 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }} />
      </div>

      <Sidebar />

      <main className={`relative z-10 transition-all duration-300 min-h-screen pb-20 md:pb-0 ${collapsed ? 'md:ml-[72px]' : 'md:ml-[260px]'}`}>
        {children}
      </main>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-border bg-[hsl(var(--sidebar-background))]/95 backdrop-blur-xl">
        <div className="flex justify-around items-center h-16">
          {mobileNavItems.map((item) => {
            const loc = useLocation();
            const isActive = loc.pathname === item.to;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={`flex flex-col items-center gap-1 px-3 py-2 text-xs transition-colors ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
