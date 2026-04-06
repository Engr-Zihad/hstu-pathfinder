import React from 'react';
import { ExternalLink } from 'lucide-react';
import devPhoto from '@/assets/developer-photo.jpg';

const socials = [
  { label: 'Facebook', handle: '@mojahidul.islam.zihad', href: 'https://www.facebook.com/md.mojahidul.islam.zihad.2024', bg: '#1877F2', icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
  { label: 'GitHub', handle: '@Engr-Zihad', href: 'https://github.com/Engr-Zihad', bg: '#24292e', icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg> },
  { label: 'Gmail', handle: 'mojahidulislamzihad686@gmail.com', href: 'mailto:mojahidulislamzihad686@gmail.com', bg: '#EA4335', icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg> },
  { label: 'WhatsApp', handle: '+880 1724-999047', href: 'https://wa.me/8801724999047', bg: '#25D366', icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> },
  { label: 'Telegram', handle: '+880 1724-999047', href: 'https://t.me/+8801724999047', bg: '#0088cc', icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg> },
  { label: 'LinkedIn', handle: 'md-mojahidul-islam-zihad', href: 'https://www.linkedin.com/in/md-mojahidul-islam-zihad', bg: '#0077B5', icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
];

export default React.memo(function AboutPage() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="relative px-4 py-16 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-cyan-600/10" />

        {/* Avatar - static gradient border, no rotation */}
        <div className="relative z-10 mb-6">
          <div className="w-[156px] h-[156px] rounded-full p-[3px]"
            style={{ background: 'conic-gradient(from 0deg, #3b82f6, #06b6d4, #8b5cf6, #ec4899, #3b82f6)' }}>
            <div className="w-full h-full rounded-full overflow-hidden" style={{ background: '#0f1623' }}>
              <img src={devPhoto} alt="MD Mojahidul Islam Zihad" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <h1 className="relative z-10 font-heading font-extrabold text-2xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          MD Mojahidul Islam Zihad
        </h1>
        <p className="relative z-10 text-sm text-[--text-2] mt-1">CSE Student & Full-Stack Developer</p>
        <p className="relative z-10 text-sm text-blue-400 mt-1">HSTU, Dinajpur, Bangladesh</p>
        <p className="relative z-10 text-xs text-[--text-3]">Computer Science & Engineering</p>
        <p className="relative z-10 text-xs text-[--text-3] mt-1">📍 Dinajpur, Bangladesh 🇧🇩</p>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {socials.map(s => (
            <a key={s.label} href={s.href} target={s.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="glass-card rounded-xl p-3 flex items-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all"
              style={{ borderColor: s.bg + '40' }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white shrink-0" style={{ background: s.bg }}>
                {s.icon}
              </div>
              <div className="min-w-0">
                <p className="text-xs text-[--text-3]">{s.label}</p>
                <p className="text-xs text-[--text-1] truncate font-medium">{s.handle}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="glass-card rounded-2xl p-6 text-center">
          <h3 className="font-heading font-bold text-[--text-1] mb-3">HSTU CSE Guide AI সম্পর্কে</h3>
          <p className="text-sm text-[--text-2] leading-relaxed">
            এই AI platform তৈরি করা হয়েছে HSTU CSE-এর শিক্ষার্থীদের ৪ বছরের একাডেমিক যাত্রাকে সহজ করতে।
            Curriculum থেকে Career — সব কিছু এক জায়গায়।
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'AI'].map(t => (
              <span key={t} className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-[10px] font-medium">{t}</span>
            ))}
          </div>
          <a href="https://github.com/Engr-Zihad" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-xl text-sm text-[--text-2] bg-white/5 hover:bg-white/10 transition-all">
            GitHub এ দেখো <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      <div className="text-center pb-8">
        <p className="text-xs text-[--text-3]">MD Mojahidul Islam Zihad • HSTU CSE • 2025</p>
      </div>
    </div>
  );
});
