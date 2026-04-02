import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

type StudyBlock = { id: string; subject: string; duration: number; color: string; day: number };

const COLORS = ['bg-blue-500/20 border-blue-500/40', 'bg-purple-500/20 border-purple-500/40', 'bg-emerald-500/20 border-emerald-500/40', 'bg-amber-500/20 border-amber-500/40', 'bg-cyan-500/20 border-cyan-500/40', 'bg-rose-500/20 border-rose-500/40'];
const DAYS = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

export default function PlannerPage() {
  const [blocks, setBlocks] = useState<StudyBlock[]>(() => {
    try { return JSON.parse(localStorage.getItem('studyBlocks') || '[]'); } catch { return []; }
  });
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [streak, setStreak] = useState(0);

  useEffect(() => { localStorage.setItem('studyBlocks', JSON.stringify(blocks)); }, [blocks]);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setPomodoroTime(t => {
        if (t <= 1) { setIsRunning(false); return 25 * 60; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const addBlock = (day: number) => {
    const id = Date.now().toString();
    setBlocks([...blocks, { id, subject: 'Study', duration: 60, color: COLORS[blocks.length % COLORS.length], day }]);
  };

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-heading font-bold gradient-text mb-1">📝 Study Planner</h1>
        <p className="text-muted-foreground text-sm mb-6">Plan your study schedule & stay focused</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pomodoro Timer */}
          <div className="glass-card rounded-2xl p-6 text-center glow-border">
            <h3 className="font-heading font-bold text-foreground mb-4">🍅 Pomodoro Timer</h3>
            <div className="text-5xl font-mono font-bold text-primary mb-6">{formatTime(pomodoroTime)}</div>
            <div className="flex justify-center gap-3">
              <Button onClick={() => setIsRunning(!isRunning)} size="sm" className="gap-1.5">
                {isRunning ? <><Pause className="w-4 h-4" /> Pause</> : <><Play className="w-4 h-4" /> Start</>}
              </Button>
              <Button onClick={() => { setIsRunning(false); setPomodoroTime(25 * 60); }} size="sm" variant="outline" className="gap-1.5">
                <RotateCcw className="w-4 h-4" /> Reset
              </Button>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">🔥 Streak: <span className="text-foreground font-bold">{streak} days</span></p>
            </div>
          </div>

          {/* Weekly Schedule */}
          <div className="lg:col-span-2 glass-card rounded-2xl p-4">
            <h3 className="font-heading font-bold text-foreground mb-4">📅 Weekly Schedule</h3>
            <div className="grid grid-cols-7 gap-2">
              {DAYS.map((day, di) => (
                <div key={day} className="text-center">
                  <p className="text-xs font-medium text-muted-foreground mb-2">{day}</p>
                  <div className="space-y-1 min-h-[120px]">
                    {blocks.filter(b => b.day === di).map(b => (
                      <div key={b.id} className={`${b.color} border rounded-lg px-1 py-2 text-[10px] text-foreground group relative`}>
                        <input value={b.subject} onChange={e => setBlocks(bs => bs.map(x => x.id === b.id ? { ...x, subject: e.target.value } : x))}
                          className="w-full bg-transparent outline-none text-center text-[10px]" />
                        <button onClick={() => setBlocks(bs => bs.filter(x => x.id !== b.id))}
                          className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full items-center justify-center text-destructive-foreground hidden group-hover:flex">
                          <Trash2 className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => addBlock(di)} className="w-full mt-1 py-1 rounded-lg border border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                    <Plus className="w-3 h-3 mx-auto" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
