import { useState } from 'react';
import { GRADE_POINTS } from '@/lib/curriculum';
import { Plus, Trash2, Calculator, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

type SubjectRow = { name: string; credits: number; grade: string };

export default function CGPAPage() {
  const [tab, setTab] = useState<'gpa' | 'cgpa' | 'target'>('gpa');
  const [rows, setRows] = useState<SubjectRow[]>([
    { name: '', credits: 3, grade: 'A+' },
    { name: '', credits: 3, grade: 'A' },
    { name: '', credits: 3, grade: 'A-' },
  ]);

  // CGPA tab
  const [semesters, setSemesters] = useState<{ gpa: number; credits: number }[]>([
    { gpa: 3.75, credits: 19 },
    { gpa: 3.50, credits: 20 },
  ]);

  // Target tab
  const [currentCGPA, setCurrentCGPA] = useState(3.50);
  const [completedCredits, setCompletedCredits] = useState(80);
  const [targetCGPA, setTargetCGPA] = useState(3.75);
  const [nextCredits, setNextCredits] = useState(20);

  const addRow = () => setRows([...rows, { name: '', credits: 3, grade: 'A+' }]);
  const removeRow = (i: number) => setRows(rows.filter((_, j) => j !== i));
  const updateRow = (i: number, field: keyof SubjectRow, value: string | number) =>
    setRows(rows.map((r, j) => j === i ? { ...r, [field]: value } : r));

  const calcGPA = () => {
    const total = rows.reduce((s, r) => s + r.credits, 0);
    if (total === 0) return 0;
    const points = rows.reduce((s, r) => s + (GRADE_POINTS[r.grade] || 0) * r.credits, 0);
    return points / total;
  };

  const calcCGPA = () => {
    const totalCredits = semesters.reduce((s, sem) => s + sem.credits, 0);
    if (totalCredits === 0) return 0;
    const totalPoints = semesters.reduce((s, sem) => s + sem.gpa * sem.credits, 0);
    return totalPoints / totalCredits;
  };

  const calcRequired = () => {
    const needed = (targetCGPA * (completedCredits + nextCredits) - currentCGPA * completedCredits) / nextCredits;
    return Math.min(4.0, Math.max(0, needed));
  };

  const gpa = calcGPA();
  const cgpa = calcCGPA();
  const required = calcRequired();

  const getColor = (val: number) =>
    val >= 3.5 ? 'text-green-400' : val >= 3.0 ? 'text-blue-400' : val >= 2.5 ? 'text-yellow-400' : 'text-red-400';

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-heading font-bold gradient-text mb-1">🧮 CGPA Calculator</h1>
        <p className="text-muted-foreground text-sm mb-6">Calculate your GPA, CGPA & target grades</p>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-secondary/50 rounded-xl mb-6">
          {[
            { id: 'gpa' as const, label: 'Semester GPA', icon: Calculator },
            { id: 'cgpa' as const, label: 'Cumulative CGPA', icon: TrendingUp },
            { id: 'target' as const, label: 'Target CGPA', icon: TrendingUp },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                ${tab === t.id ? 'bg-primary/20 text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
              <t.icon className="w-4 h-4" /> {t.label}
            </button>
          ))}
        </div>

        {tab === 'gpa' && (
          <div className="space-y-4">
            <div className="space-y-2">
              {rows.map((r, i) => (
                <div key={i} className="flex items-center gap-2 glass-card rounded-xl p-3">
                  <input value={r.name} onChange={e => updateRow(i, 'name', e.target.value)}
                    placeholder="Subject name" className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none min-w-0" />
                  <input type="number" value={r.credits} onChange={e => updateRow(i, 'credits', parseFloat(e.target.value) || 0)}
                    className="w-16 bg-secondary/50 rounded-lg px-2 py-1.5 text-sm text-center text-foreground outline-none" />
                  <select value={r.grade} onChange={e => updateRow(i, 'grade', e.target.value)}
                    className="bg-secondary/50 rounded-lg px-2 py-1.5 text-sm text-foreground outline-none">
                    {Object.keys(GRADE_POINTS).map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                  <button onClick={() => removeRow(i)} className="p-1.5 rounded-lg hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <Button onClick={addRow} variant="outline" size="sm" className="gap-1.5"><Plus className="w-4 h-4" /> Add Subject</Button>

            <div className="glass-card rounded-2xl p-6 text-center glow-border">
              <p className="text-sm text-muted-foreground mb-2">Your GPA</p>
              <p className={`text-5xl font-heading font-bold ${getColor(gpa)}`}>{gpa.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground mt-2">
                Total Credits: {rows.reduce((s, r) => s + r.credits, 0)}
              </p>
            </div>
          </div>
        )}

        {tab === 'cgpa' && (
          <div className="space-y-4">
            {semesters.map((sem, i) => (
              <div key={i} className="flex items-center gap-3 glass-card rounded-xl p-3">
                <span className="text-sm text-muted-foreground w-24 shrink-0">Semester {i + 1}</span>
                <div className="flex-1 flex gap-2">
                  <input type="number" step="0.01" value={sem.gpa} onChange={e => setSemesters(s => s.map((x, j) => j === i ? { ...x, gpa: parseFloat(e.target.value) || 0 } : x))}
                    placeholder="GPA" className="flex-1 bg-secondary/50 rounded-lg px-3 py-2 text-sm text-foreground outline-none" />
                  <input type="number" value={sem.credits} onChange={e => setSemesters(s => s.map((x, j) => j === i ? { ...x, credits: parseFloat(e.target.value) || 0 } : x))}
                    placeholder="Credits" className="w-20 bg-secondary/50 rounded-lg px-3 py-2 text-sm text-foreground outline-none" />
                </div>
                <button onClick={() => setSemesters(s => s.filter((_, j) => j !== i))} className="p-1.5 text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
            <Button onClick={() => setSemesters([...semesters, { gpa: 3.5, credits: 19 }])} variant="outline" size="sm" className="gap-1.5"><Plus className="w-4 h-4" /> Add Semester</Button>
            <div className="glass-card rounded-2xl p-6 text-center glow-border">
              <p className="text-sm text-muted-foreground mb-2">Your CGPA</p>
              <p className={`text-5xl font-heading font-bold ${getColor(cgpa)}`}>{cgpa.toFixed(2)}</p>
            </div>
          </div>
        )}

        {tab === 'target' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Current CGPA', value: currentCGPA, set: setCurrentCGPA },
                { label: 'Completed Credits', value: completedCredits, set: setCompletedCredits },
                { label: 'Target CGPA', value: targetCGPA, set: setTargetCGPA },
                { label: 'Next Semester Credits', value: nextCredits, set: setNextCredits },
              ].map(f => (
                <div key={f.label} className="glass-card rounded-xl p-4">
                  <label className="text-xs text-muted-foreground block mb-2">{f.label}</label>
                  <input type="number" step="0.01" value={f.value} onChange={e => f.set(parseFloat(e.target.value) || 0)}
                    className="w-full bg-secondary/50 rounded-lg px-3 py-2 text-foreground outline-none text-lg font-bold" />
                </div>
              ))}
            </div>
            <div className="glass-card rounded-2xl p-6 text-center glow-border">
              <p className="text-sm text-muted-foreground mb-2">Required GPA Next Semester</p>
              <p className={`text-5xl font-heading font-bold ${required > 4 ? 'text-red-400' : getColor(required)}`}>
                {required > 4 ? 'N/A' : required.toFixed(2)}
              </p>
              {required > 4 && <p className="text-xs text-red-400 mt-2">Target not achievable with given credits</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
