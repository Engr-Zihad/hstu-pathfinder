import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Plus, Trash2, Save, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const grades = [
  { label: 'A+ (4.00)', value: 4.0 }, { label: 'A (3.75)', value: 3.75 }, { label: 'A- (3.50)', value: 3.5 },
  { label: 'B+ (3.25)', value: 3.25 }, { label: 'B (3.00)', value: 3.0 }, { label: 'B- (2.75)', value: 2.75 },
  { label: 'C+ (2.50)', value: 2.5 }, { label: 'C (2.25)', value: 2.25 }, { label: 'D (2.00)', value: 2.0 }, { label: 'F (0.00)', value: 0.0 },
];
interface Row { id: string; name: string; credits: number; grade: number }
interface SavedSemester { name: string; gpa: number; credits: number }
function genId() { return Math.random().toString(36).slice(2); }
function gpaColor(gpa: number) { if (gpa >= 3.75) return 'text-[hsl(var(--green))]'; if (gpa >= 3.5) return 'text-primary'; if (gpa >= 3.0) return 'text-yellow-400'; return 'text-destructive'; }

export default function CGPAPage() {
  const [tab, setTab] = useState<'gpa'|'cgpa'|'target'>('gpa');
  const [rows, setRows] = useState<Row[]>([{ id: genId(), name: '', credits: 3, grade: 4.0 }]);
  const [semName, setSemName] = useState('');
  const [saved, setSaved] = useState<SavedSemester[]>(() => { try { return JSON.parse(localStorage.getItem('hstu_semester_gpas') || '[]'); } catch { return []; } });
  const [tc, setTc] = useState(3.0); const [tcomp, setTcomp] = useState(60); const [tg, setTg] = useState(3.5); const [tr, setTr] = useState(60);

  const gpa = useMemo(() => { const tot = rows.reduce((a, r) => a + r.credits, 0); return tot === 0 ? 0 : rows.reduce((a, r) => a + r.grade * r.credits, 0) / tot; }, [rows]);
  const cgpa = useMemo(() => { const tot = saved.reduce((a, s) => a + s.credits, 0); return tot === 0 ? 0 : saved.reduce((a, s) => a + s.gpa * s.credits, 0) / tot; }, [saved]);
  const reqGPA = ((tg * (tcomp + tr)) - (tc * tcomp)) / tr;

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2 flex items-center gap-3"><Calculator className="w-7 h-7 text-primary" /> CGPA Calculator</h1>
        <p className="text-muted-foreground text-sm mb-6">Calculate your GPA, track CGPA, and set targets</p>
        <div className="flex gap-1 mb-6 p-1 rounded-xl bg-secondary w-fit">
          {([['gpa','Semester GPA'],['cgpa','Cumulative CGPA'],['target','Target CGPA']] as const).map(([k,l]) => (
            <button key={k} onClick={() => setTab(k)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === k ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>{l}</button>
          ))}
        </div>
        {tab === 'gpa' && (<div className="space-y-4">
          {rows.map(row => (<div key={row.id} className="glass-card rounded-xl p-3 flex flex-wrap gap-2 items-center">
            <input value={row.name} onChange={e => setRows(rows.map(r => r.id === row.id ? {...r, name: e.target.value} : r))} placeholder="Subject" className="flex-1 min-w-[120px] px-3 py-2 rounded-lg bg-secondary text-foreground text-sm border border-border outline-none" />
            <input type="number" value={row.credits} onChange={e => setRows(rows.map(r => r.id === row.id ? {...r, credits: Number(e.target.value)} : r))} min={1} max={6} className="w-20 px-3 py-2 rounded-lg bg-secondary text-foreground text-sm border border-border outline-none" />
            <select value={row.grade} onChange={e => setRows(rows.map(r => r.id === row.id ? {...r, grade: Number(e.target.value)} : r))} className="px-3 py-2 rounded-lg bg-secondary text-foreground text-sm border border-border outline-none">{grades.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}</select>
            <button onClick={() => rows.length > 1 && setRows(rows.filter(r => r.id !== row.id))} className="p-2 rounded-lg hover:bg-destructive/10 text-destructive"><Trash2 className="w-4 h-4" /></button>
          </div>))}
          <button onClick={() => setRows([...rows, { id: genId(), name: '', credits: 3, grade: 4.0 }])} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary text-muted-foreground hover:text-foreground text-sm"><Plus className="w-4 h-4" /> Add Subject</button>
          <div className="glass-card rounded-xl p-6 text-center"><p className="text-sm text-muted-foreground mb-1">Your GPA</p><p className={`text-5xl font-heading font-bold ${gpaColor(gpa)}`}>{gpa.toFixed(2)}</p></div>
          <div className="flex gap-2"><input value={semName} onChange={e => setSemName(e.target.value)} placeholder="e.g. Semester 1" className="flex-1 px-3 py-2 rounded-xl bg-secondary text-foreground text-sm border border-border outline-none" />
            <button onClick={() => { if(!semName.trim()){toast.error('Enter name');return;} const u=[...saved,{name:semName,gpa,credits:rows.reduce((a,r)=>a+r.credits,0)}]; setSaved(u); localStorage.setItem('hstu_semester_gpas',JSON.stringify(u)); setSemName(''); toast.success('Saved!'); }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm"><Save className="w-4 h-4" /> Save</button>
          </div>
        </div>)}
        {tab === 'cgpa' && (<div className="space-y-4">
          {saved.length === 0 ? <div className="glass-card rounded-xl p-8 text-center"><TrendingUp className="w-10 h-10 text-muted-foreground mx-auto mb-3" /><p className="text-muted-foreground">No semesters saved yet.</p></div> : <>
            <div className="glass-card rounded-xl p-6 text-center"><p className="text-sm text-muted-foreground mb-1">Cumulative CGPA</p><p className={`text-5xl font-heading font-bold ${gpaColor(cgpa)}`}>{cgpa.toFixed(2)}</p></div>
            <div className="glass-card rounded-xl p-4"><ResponsiveContainer width="100%" height={250}><LineChart data={saved.map(s => ({ name: s.name, gpa: s.gpa }))}><CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" /><XAxis dataKey="name" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} /><YAxis domain={[0, 4]} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} /><Tooltip /><Line type="monotone" dataKey="gpa" stroke="hsl(var(--primary))" strokeWidth={2} /></LineChart></ResponsiveContainer></div>
            {saved.map((s, i) => (<div key={i} className="glass-card rounded-xl px-4 py-3 flex justify-between items-center"><span className="text-sm text-foreground">{s.name}</span><div className="flex items-center gap-4"><span className={`text-sm font-bold ${gpaColor(s.gpa)}`}>{s.gpa.toFixed(2)}</span><button onClick={() => { const u = saved.filter((_,j) => j !== i); setSaved(u); localStorage.setItem('hstu_semester_gpas', JSON.stringify(u)); }} className="p-1 rounded hover:bg-destructive/10 text-destructive"><Trash2 className="w-3.5 h-3.5" /></button></div></div>))}
          </>}
        </div>)}
        {tab === 'target' && (<div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[['Current CGPA',tc,setTc],['Completed Credits',tcomp,setTcomp],['Target CGPA',tg,setTg],['Remaining Credits',tr,setTr]].map(([l,v,s]: any) => (
              <div key={l} className="glass-card rounded-xl p-4"><label className="text-xs text-muted-foreground">{l}</label><input type="number" value={v} onChange={e => s(Number(e.target.value))} step={0.01} className="w-full mt-1 px-3 py-2 rounded-lg bg-secondary text-foreground text-sm border border-border outline-none" /></div>
            ))}
          </div>
          <div className="glass-card rounded-xl p-6 text-center"><p className="text-sm text-muted-foreground mb-1">Required GPA</p>
            {reqGPA > 4.0 ? <p className="text-3xl font-heading font-bold text-destructive">Not Achievable</p> : reqGPA < 0 ? <p className="text-3xl font-heading font-bold text-[hsl(var(--green))]">Already Achieved! 🎉</p> : <p className={`text-5xl font-heading font-bold ${gpaColor(reqGPA)}`}>{reqGPA.toFixed(2)}</p>}
          </div>
        </div>)}
      </motion.div>
    </div>
  );
}
