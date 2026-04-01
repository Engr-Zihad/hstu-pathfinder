import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { GraduationCap, Github, Mail, Phone, Facebook, Send, MessageCircle, Sparkles, Heart } from 'lucide-react';

interface AboutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const socials = [
  {
    icon: Facebook,
    label: 'Facebook',
    value: 'Md Mojahidul Islam Zihad',
    href: 'https://www.facebook.com/md.mojahidul.islam.zihad.2024',
    color: 'bg-blue-500/10 group-hover:bg-blue-500/20',
    iconColor: 'text-blue-500',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'Engr-Zihad',
    href: 'https://github.com/Engr-Zihad',
    color: 'bg-gray-500/10 group-hover:bg-gray-500/20',
    iconColor: 'text-foreground',
  },
  {
    icon: Mail,
    label: 'Gmail',
    value: 'mojahidulislamzihad686@gmail.com',
    href: 'mailto:mojahidulislamzihad686@gmail.com',
    color: 'bg-red-500/10 group-hover:bg-red-500/20',
    iconColor: 'text-red-500',
  },
  {
    icon: Send,
    label: 'Telegram',
    value: '+880 1724999047',
    href: 'https://t.me/+8801724999047',
    color: 'bg-sky-500/10 group-hover:bg-sky-500/20',
    iconColor: 'text-sky-500',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+880 1724999047',
    href: 'https://wa.me/8801724999047',
    color: 'bg-green-500/10 group-hover:bg-green-500/20',
    iconColor: 'text-green-500',
  },
];

export default function AboutDialog({ open, onOpenChange }: AboutDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden rounded-2xl border-none">
        {/* Header banner */}
        <div className="chat-gradient px-6 pt-8 pb-10 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="relative w-20 h-20 rounded-full bg-primary-foreground/20 border-4 border-primary-foreground/30 flex items-center justify-center mb-3 shadow-xl">
            <GraduationCap className="w-10 h-10 text-primary-foreground" />
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-green-500 border-3 border-white/20 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
          </div>
          <DialogHeader>
            <DialogTitle className="text-primary-foreground text-xl font-bold flex items-center gap-1.5">
              HSTU CSE Buddy
              <Sparkles className="w-4 h-4 text-yellow-300" />
            </DialogTitle>
          </DialogHeader>
          <p className="text-primary-foreground/80 text-xs mt-1">
            AI-Powered Academic Assistant
          </p>
          <p className="text-primary-foreground/60 text-[10px] mt-1">v2.0.0 • Updated Curriculum</p>
        </div>

        {/* Developer info */}
        <div className="px-6 -mt-5">
          <div className="bg-card rounded-xl border border-border shadow-lg p-4">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2 flex items-center gap-1">
              <Heart className="w-3 h-3 text-red-400" /> Developer
            </p>
            <h3 className="text-foreground font-bold text-base leading-tight">
              MD Mojahidul Islam Zihad
            </h3>
            <p className="text-muted-foreground text-xs mt-0.5">
              Department of CSE, HSTU, Dinajpur
            </p>
            <p className="text-primary text-[10px] mt-1 font-medium">
              🎓 Hajee Mohammad Danesh Science & Technology University
            </p>
          </div>
        </div>

        {/* Social links */}
        <div className="px-6 pb-6 pt-3 space-y-1.5">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2">
            Connect With Me
          </p>
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all hover:bg-secondary group hover:shadow-sm"
            >
              <div className={`w-9 h-9 rounded-lg ${s.color} flex items-center justify-center shrink-0 transition-colors`}>
                <s.icon className={`w-4.5 h-4.5 ${s.iconColor}`} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-muted-foreground leading-none">{s.label}</p>
                <p className="text-sm text-foreground truncate font-medium">{s.value}</p>
              </div>
            </a>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
