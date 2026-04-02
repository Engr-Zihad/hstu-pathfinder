import { useState } from 'react';
import { SEMESTERS, YEAR_COLORS, YEAR_ACCENT } from '@/lib/curriculum';
import { ChevronDown, ChevronRight, BookOpen, Beaker, Filter } from 'lucide-react';

export default function CurriculumPage() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ '1-1': true });
  const [filter, setFilter] = useState<'all' | 'theory' | 'lab'>('all');
  const [yearFilter, setYearFilter] = useState<number | null>(null);

  const toggle = (key: string) => setExpanded(prev => ({ ...prev, [key]: !prev[key] }));

  const filtered = SEMESTERS
    .filter(s => !yearFilter || s.year === yearFilter)
    .map(s => ({
      ...s,
      courses: s.courses.filter(c => filter === 'all' || c.type === filter),
    }));

  const totalCredits = SEMESTERS.reduce((sum, s) => sum + s.courses.reduce((cs, c) => cs + c.credits, 0), 0);

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-heading font-bold gradient-text mb-1">📚 HSTU CSE Curriculum</h1>
          <p className="text-muted-foreground text-sm">4-Year B.Sc. Engineering in CSE • Total: {totalCredits} credits</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="flex items-center gap-1 text-xs text-muted-foreground mr-2"><Filter className="w-3.5 h-3.5" /> Filter:</div>
          {[null, 1, 2, 3, 4].map(y => (
            <button key={String(y)} onClick={() => setYearFilter(y)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${yearFilter === y ? 'bg-primary/20 text-primary' : 'bg-secondary/50 text-muted-foreground hover:text-foreground'}`}>
              {y ? `Year ${y}` : 'All Years'}
            </button>
          ))}
          <div className="w-px h-6 bg-border mx-1" />
          {(['all', 'theory', 'lab'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === f ? 'bg-accent/20 text-accent' : 'bg-secondary/50 text-muted-foreground hover:text-foreground'}`}>
              {f === 'all' ? 'All' : f === 'theory' ? '📖 Theory' : '🔬 Lab'}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="space-y-4">
          {filtered.map(sem => {
            const key = `${sem.year}-${sem.semester}`;
            const isOpen = expanded[key];
            const semCredits = sem.courses.reduce((s, c) => s + c.credits, 0);
            return (
              <div key={key} className={`glass-card rounded-2xl overflow-hidden border-l-4 ${YEAR_COLORS[sem.year]}`}>
                <button onClick={() => toggle(key)} className="w-full flex items-center justify-between p-4 hover:bg-secondary/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${YEAR_COLORS[sem.year]} flex items-center justify-center`}>
                      <span className="text-lg font-bold">{sem.year}</span>
                    </div>
                    <div className="text-left">
                      <h3 className={`font-heading font-bold text-sm ${YEAR_ACCENT[sem.year]}`}>{sem.label}</h3>
                      <p className="text-xs text-muted-foreground">{sem.courses.length} courses • {semCredits} credits</p>
                    </div>
                  </div>
                  {isOpen ? <ChevronDown className="w-5 h-5 text-muted-foreground" /> : <ChevronRight className="w-5 h-5 text-muted-foreground" />}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 space-y-2 animate-fade-in">
                    {sem.courses.map((c, i) => (
                      <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${c.type === 'theory' ? 'bg-primary/15 text-primary' : 'bg-accent/15 text-accent'}`}>
                          {c.type === 'theory' ? <BookOpen className="w-4 h-4" /> : <Beaker className="w-4 h-4" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-muted-foreground">{c.code}</span>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                              c.difficulty === 'Easy' ? 'bg-green-500/15 text-green-400' :
                              c.difficulty === 'Hard' ? 'bg-red-500/15 text-red-400' : 'bg-yellow-500/15 text-yellow-400'
                            }`}>{c.difficulty}</span>
                          </div>
                          <p className="text-sm text-foreground truncate">{c.name}</p>
                        </div>
                        <span className="text-xs text-muted-foreground shrink-0">{c.credits} cr</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
