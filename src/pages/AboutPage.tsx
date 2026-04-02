import { Github, Mail, MessageCircle, Send, Facebook, Heart, MapPin, GraduationCap, Code2 } from 'lucide-react';

const socials = [
  { icon: Facebook, label: 'Facebook', value: 'Md Mojahidul Islam Zihad', href: 'https://www.facebook.com/md.mojahidul.islam.zihad.2024', bg: 'bg-blue-500/15 hover:bg-blue-500/25', iconColor: 'text-blue-400' },
  { icon: Github, label: 'GitHub', value: 'Engr-Zihad', href: 'https://github.com/Engr-Zihad', bg: 'bg-secondary/50 hover:bg-secondary/70', iconColor: 'text-foreground' },
  { icon: Mail, label: 'Gmail', value: 'mojahidulislamzihad686@gmail.com', href: 'mailto:mojahidulislamzihad686@gmail.com', bg: 'bg-red-500/15 hover:bg-red-500/25', iconColor: 'text-red-400' },
  { icon: MessageCircle, label: 'WhatsApp', value: '+880 1724999047', href: 'https://wa.me/8801724999047', bg: 'bg-emerald-500/15 hover:bg-emerald-500/25', iconColor: 'text-emerald-400' },
  { icon: Send, label: 'Telegram', value: '+880 1724999047', href: 'https://t.me/+8801724999047', bg: 'bg-sky-500/15 hover:bg-sky-500/25', iconColor: 'text-sky-400' },
];

export default function AboutPage() {
  return (
    <div className="flex-1 overflow-y-auto">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-primary/20 via-accent/10 to-purple/20 px-4 py-16 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--purple)/0.1),transparent_50%)]" />

        {/* Avatar */}
        <div className="relative z-10 mb-6">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary via-accent to-purple p-[3px] glow-ring">
            <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
              <GraduationCap className="w-14 h-14 text-primary" />
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-heading font-bold gradient-text mb-2 relative z-10">
          MD Mojahidul Islam Zihad
        </h1>
        <p className="text-muted-foreground text-sm flex items-center gap-2 relative z-10">
          <Code2 className="w-4 h-4 text-accent" /> CSE Student & Developer
        </p>
        <p className="text-muted-foreground/70 text-xs flex items-center gap-1.5 mt-2 relative z-10">
          <GraduationCap className="w-3.5 h-3.5" /> Hajee Mohammad Danesh Science & Technology University
        </p>
        <p className="text-muted-foreground/50 text-xs flex items-center gap-1 mt-1 relative z-10">
          <MapPin className="w-3 h-3" /> Dinajpur, Bangladesh 🇧🇩
        </p>
      </div>

      {/* Social Links */}
      <div className="max-w-md mx-auto px-4 -mt-6 relative z-10">
        <div className="glass-card rounded-2xl p-5 space-y-2">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-3">Connect With Me</p>
          {socials.map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${s.bg}`}>
              <div className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center shrink-0">
                <s.icon className={`w-5 h-5 ${s.iconColor}`} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-muted-foreground">{s.label}</p>
                <p className="text-sm text-foreground truncate font-medium">{s.value}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* About Project */}
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="glass-card rounded-2xl p-6 text-center">
          <h3 className="font-heading font-bold text-foreground mb-3">About This Project</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            HSTU CSE Guide AI was built to help CSE students at HSTU navigate their 4-year academic journey with AI-powered guidance, 
            accurate curriculum data, career roadmaps, and essential resources — all in one place.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pb-8">
        <p className="text-xs text-muted-foreground/50 flex items-center justify-center gap-1">
          Built with <Heart className="w-3 h-3 text-red-400" /> by Zihad for HSTU CSE Students • 2025
        </p>
      </div>
    </div>
  );
}
