import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search, ChevronDown, ChevronRight, ExternalLink, Check, Clock, Circle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { semesters, totalSubjects, totalCredits } from '@/data/curriculum';
import type { Subject } from '@/data/curriculum';

const yearColors: Record<number, string> = { 1: 'text-primary', 2: 'text-accent', 3: 'text-[hsl(var(--purple))]', 4: 'text-[hsl(var(--green))]' };
const yearBgs: Record<number, string> = { 1: 'bg-primary/10', 2: 'bg-accent/10', 3: 'bg-[hsl(var(--purple))]/10', 4: 'bg-[hsl(var(--green))]/10' };
type Status = 'not_started' | 'in_progress' | 'completed';

export default function CurriculumPage() {
  const navigate = useNavigate();
  const [expandedSem, setExpandedSem] = useState<number>(1);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [filterYear, setFilterYear] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [statuses, setStatuses] = useState<Record<string, Status>>(() => { try { return JSON.parse(localStorage.getItem('hstu_subject_status') || '{}'); } catch { return {}; } });

  const setStatus = (code: string, status: Status) => { const u = { ...statuses, [code]: status }; setStatuses(u); localStorage.setItem('hstu_subject_status', JSON.stringify(u)); };
  const filtered = semesters.filter(s => filterYear === 'all' || s.year === Number(filterYear));
  const completed = Object.values(statuses).filter(s => s === 'completed').length;
  const inProgress = Object.values(statuses).filter(s => s === 'in_progress').length;
  const statusIcon = (code: string) => { const s = statuses[code] || 'not_started'; if (s === 'completed') return <Check className="w-3.5 h-3.5 text-[hsl(var(--green))]" />; if (s === 'in_progress') return <Clock className="w-3.5 h-3.5 text-yellow-400" />; return <Circle className="w-3.5 h-3.5 text-muted-foreground" />; };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2 flex items-center gap-3"><BookOpen className="w-7 h-7 text-primary" /> Curriculum</h1>
        <p className="text-muted-foreground text-sm mb-6">HSTU CSE 4-Year B.Sc. Program — {totalSubjects} subjects, {totalCredits} credits</p>
        <div className="glass-card rounded-xl p-4 mb-6">
          <div className="flex justify-between text-sm mb-2"><span className="text-foreground font-medium">Progress</span><span className="text-muted-foreground">{completed}/{totalSubjects} completed</span></div>
          <div className="h-2 rounded-full bg-secondary flex overflow-hidden"><div className="bg-[hsl(var(--green))] transition-all" style={{ width: `${(completed / totalSubjects) * 100}%` }} /><div className="bg-yellow-400 transition-all" style={{ width: `${(inProgress / totalSubjects) * 100}%` }} /></div>
          <div className="flex gap-4 mt-2 text-xs text-muted-foreground"><span>✅ {completed}</span><span>⏳ {inProgress}</span><span>📋 {totalSubjects - completed - inProgress}</span></div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="relative flex-1 min-w-[200px]"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search subjects..." className="w-full pl-9 pr-4 py-2 rounded-xl bg-secondary text-foreground text-sm border border-border outline-none focus:border-primary" /></div>
          {['all','1','2','3','4'].map(y => (<button key={y} onClick={() => setFilterYear(y)} className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${filterYear === y ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}>{y === 'all' ? 'All' : `Year ${y}`}</button>))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {filtered.map(sem => {
              const semSubs = sem.subjects.filter(s => !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.code.toLowerCase().includes(search.toLowerCase()));
              if (search && semSubs.length === 0) return null;
              return (<div key={sem.id} className="glass-card rounded-xl overflow-hidden">
                <button onClick={() => setExpandedSem(expandedSem === sem.id ? 0 : sem.id)} className="w-full flex items-center justify-between px-4 py-3 text-left">
                  <div className="flex items-center gap-3"><span className={`text-sm font-bold ${yearColors[sem.year]}`}>{sem.label}</span><span className="text-xs text-muted-foreground">{sem.subjects.length} subjects</span></div>
                  {expandedSem === sem.id ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                </button>
                {expandedSem === sem.id && (<div className="px-4 pb-3 space-y-1.5">{semSubs.map(sub => (
                  <button key={sub.code} onClick={() => setSelectedSubject(sub)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm transition-all ${selectedSubject?.code === sub.code ? 'bg-primary/10 border border-primary/30' : 'hover:bg-secondary'}`}>
                    {statusIcon(sub.code)}<span className={`text-xs font-mono px-2 py-0.5 rounded ${yearBgs[sem.year]} ${yearColors[sem.year]}`}>{sub.code}</span><span className="text-foreground flex-1 truncate">{sub.name}</span><span className="text-xs text-muted-foreground">{sub.credits} cr</span>
                  </button>))}</div>)}
              </div>);
            })}
          </div>
          <div className="lg:col-span-1">
            {selectedSubject ? (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card rounded-xl p-5 sticky top-4">
                <span className="text-xs font-mono px-2 py-1 rounded bg-primary/10 text-primary">{selectedSubject.code}</span>
                <h2 className="text-lg font-heading font-bold text-foreground mt-2">{selectedSubject.name}</h2>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <span className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground">{selectedSubject.credits} Credits</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground capitalize">{selectedSubject.type}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${selectedSubject.difficulty === 'Beginner' ? 'bg-[hsl(var(--green))]/10 text-[hsl(var(--green))]' : selectedSubject.difficulty === 'Intermediate' ? 'bg-yellow-400/10 text-yellow-400' : 'bg-destructive/10 text-destructive'}`}>{selectedSubject.difficulty}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-3">{selectedSubject.description}</p>
                <div className="mt-4"><h3 className="text-sm font-semibold text-foreground mb-2">What you'll learn:</h3>
                  <ul className="space-y-1">{selectedSubject.whatYouLearn.map((item, i) => (<li key={i} className="text-sm text-muted-foreground flex items-start gap-2"><Check className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />{item}</li>))}</ul>
                </div>
                <div className="mt-4"><label className="text-xs text-muted-foreground">Status:</label>
                  <select value={statuses[selectedSubject.code] || 'not_started'} onChange={e => setStatus(selectedSubject.code, e.target.value as Status)} className="mt-1 w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm outline-none">
                    <option value="not_started">Not Started</option><option value="in_progress">In Progress</option><option value="completed">Completed</option>
                  </select>
                </div>
                <div className="mt-4 space-y-2">
                  <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(selectedSubject.name + ' bangla tutorial')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-destructive/10 text-destructive text-sm hover:bg-destructive/20 transition-colors w-full"><ExternalLink className="w-4 h-4" /> YouTube</a>
                  <button onClick={() => navigate('/chat')} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors w-full"><ExternalLink className="w-4 h-4" /> Ask AI</button>
                </div>
              </motion.div>
            ) : (<div className="glass-card rounded-xl p-8 text-center sticky top-4"><BookOpen className="w-10 h-10 text-muted-foreground mx-auto mb-3" /><p className="text-muted-foreground text-sm">Select a subject to view details</p></div>)}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
