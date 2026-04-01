import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { GraduationCap, Github, Mail, Phone, Facebook, Send } from 'lucide-react';

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
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'Engr-Zihad',
    href: 'https://github.com/Engr-Zihad',
  },
  {
    icon: Mail,
    label: 'Gmail',
    value: 'mojahidulislamzihad686@gmail.com',
    href: 'mailto:mojahidulislamzihad686@gmail.com',
  },
  {
    icon: Send,
    label: 'Telegram',
    value: '+880 1724999047',
    href: 'https://t.me/+8801724999047',
  },
  {
    icon: Phone,
    label: 'WhatsApp',
    value: '+880 1724999047',
    href: 'https://wa.me/8801724999047',
  },
];

export default function AboutDialog({ open, onOpenChange }: AboutDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden rounded-2xl border-none">
        {/* Header banner */}
        <div className="chat-gradient px-6 pt-8 pb-10 flex flex-col items-center text-center relative">
          <div className="w-20 h-20 rounded-full bg-primary-foreground/20 border-4 border-primary-foreground/30 flex items-center justify-center mb-3 shadow-xl">
            <GraduationCap className="w-10 h-10 text-primary-foreground" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-primary-foreground text-xl font-bold">
              HSTU CSE Buddy
            </DialogTitle>
          </DialogHeader>
          <p className="text-primary-foreground/80 text-xs mt-1">
            Your 4-Year Academic AI Assistant
          </p>
          <p className="text-primary-foreground/60 text-[10px] mt-1">v1.0.0</p>
        </div>

        {/* Developer info */}
        <div className="px-6 -mt-5">
          <div className="bg-card rounded-xl border border-border shadow-lg p-4">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2">
              Developer
            </p>
            <h3 className="text-foreground font-bold text-base leading-tight">
              MD Mojahidul Islam Zihad
            </h3>
            <p className="text-muted-foreground text-xs mt-0.5">
              Department of CSE, HSTU
            </p>
          </div>
        </div>

        {/* Social links */}
        <div className="px-6 pb-6 pt-3 space-y-2">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">
            Connect
          </p>
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-secondary group"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <s.icon className="w-4 h-4 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-muted-foreground leading-none">{s.label}</p>
                <p className="text-sm text-foreground truncate">{s.value}</p>
              </div>
            </a>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
