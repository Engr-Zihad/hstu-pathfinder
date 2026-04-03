import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { semesters } from '@/data/curriculum';
import { tracks } from '@/data/tracks';
import { platforms } from '@/data/platforms';
export default function SearchPage() {
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  const ql = q.toLowerCase();
  const subjects = ql ? semesters.flatMap(s => s.subjects).filter(s => s.name.toLowerCase().includes(ql) || s.code.toLowerCase().includes(ql)).slice(0,10) : [];
  const trackResults = ql ? Object.values(tracks).filter(t => t.name.toLowerCase().includes(ql)).slice(0,5) : [];
  const platResults = ql ? Object.values(platforms).filter(p => p.name.toLowerCase().includes(ql)).slice(0,5) : [];
  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-heading font-bold text-foreground mb-4 flex items-center gap-3"><Search className="w-7 h-7 text-primary" /> Smart Search</h1>
        <div className="relative mb-6"><Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" /><input value={q} onChange={e => setQ(e.target.value)} autoFocus placeholder="Search subjects, tracks, platforms..." className="w-full pl-12 pr-4 py-3 rounded-2xl bg-secondary text-foreground border border-border outline-none focus:border-primary text-lg" /></div>
        {subjects.length > 0 && <div className="mb-6"><h2 className="text-sm font-semibold text-muted-foreground mb-2">SUBJECTS</h2>{subjects.map(s => (<button key={s.code} onClick={() => navigate('/curriculum')} className="w-full text-left glass-card rounded-xl px-4 py-3 mb-1 flex items-center gap-3 hover:border-primary/30 transition-colors"><span className="text-xs font-mono text-primary">{s.code}</span><span className="text-sm text-foreground">{s.name}</span></button>))}</div>}
        {trackResults.length > 0 && <div className="mb-6"><h2 className="text-sm font-semibold text-muted-foreground mb-2">LEARNING TRACKS</h2>{trackResults.map(t => (<button key={t.id} onClick={() => navigate(`/track/${t.id}`)} className="w-full text-left glass-card rounded-xl px-4 py-3 mb-1 hover:border-primary/30 transition-colors"><span className="text-sm text-foreground">{t.name}</span><span className="text-xs text-muted-foreground ml-2">{t.tagline}</span></button>))}</div>}
        {platResults.length > 0 && <div><h2 className="text-sm font-semibold text-muted-foreground mb-2">PLATFORMS</h2>{platResults.map(p => (<button key={p.id} onClick={() => navigate(`/platform/${p.id}`)} className="w-full text-left glass-card rounded-xl px-4 py-3 mb-1 hover:border-primary/30 transition-colors"><span className="text-sm text-foreground">{p.name}</span></button>))}</div>}
        {q && !subjects.length && !trackResults.length && !platResults.length && <p className="text-center text-muted-foreground py-12">No results found for "{q}"</p>}
      </motion.div>
    </div>
  );
}
