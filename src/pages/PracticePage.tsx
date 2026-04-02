import { ExternalLink, CheckCircle2, Circle } from 'lucide-react';
import { useState } from 'react';

const TOPICS = [
  { name: 'Arrays & Strings', done: false },
  { name: 'Math & Number Theory', done: false },
  { name: 'Sorting & Searching', done: false },
  { name: 'Greedy Algorithms', done: false },
  { name: 'Dynamic Programming', done: false },
  { name: 'Graph Theory', done: false },
  { name: 'Trees & BST', done: false },
  { name: 'Segment Trees', done: false },
];

const RESOURCES = [
  { name: 'CP Handbook (PDF)', url: 'https://cses.fi/book/book.pdf', desc: 'Free competitive programming book' },
  { name: 'USACO Guide', url: 'https://usaco.guide', desc: 'Structured CP learning path' },
  { name: 'Codeforces', url: 'https://codeforces.com', desc: 'Practice & compete' },
  { name: 'AtCoder', url: 'https://atcoder.jp', desc: 'Clean problems, great for beginners' },
  { name: 'CSES Problem Set', url: 'https://cses.fi/problemset', desc: '300 classic CP problems' },
];

export default function PracticePage() {
  const [topics, setTopics] = useState(TOPICS);
  const toggleTopic = (i: number) => setTopics(t => t.map((x, j) => j === i ? { ...x, done: !x.done } : x));
  const progress = Math.round((topics.filter(t => t.done).length / topics.length) * 100);

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-heading font-bold gradient-text mb-1">🏆 Competitive Programming</h1>
        <p className="text-muted-foreground text-sm mb-6">Master CP step by step</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Progress */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-heading font-bold text-foreground mb-4">📋 Topic Checklist</h3>
            <div className="w-full bg-secondary/50 rounded-full h-2 mb-4">
              <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-xs text-muted-foreground mb-4">{progress}% completed</p>
            <div className="space-y-2">
              {topics.map((t, i) => (
                <button key={i} onClick={() => toggleTopic(i)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                    t.done ? 'bg-primary/10 text-primary' : 'hover:bg-secondary/50 text-foreground'
                  }`}>
                  {t.done ? <CheckCircle2 className="w-5 h-5 text-primary shrink-0" /> : <Circle className="w-5 h-5 text-muted-foreground shrink-0" />}
                  <span className={t.done ? 'line-through opacity-70' : ''}>{t.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Resources & Roadmap */}
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-heading font-bold text-foreground mb-4">🚀 Beginner Roadmap</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>1️⃣ Learn C++ with STL thoroughly</p>
                <p>2️⃣ Solve 100 easy problems on Codeforces</p>
                <p>3️⃣ Start Codeforces Div.3 contests</p>
                <p>4️⃣ Study algorithms from CP Handbook</p>
                <p>5️⃣ Move to Div.2 after rating 1200+</p>
                <p>6️⃣ Practice DP & Graph problems daily</p>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-heading font-bold text-foreground mb-4">🔗 Essential Resources</h3>
              <div className="space-y-2">
                {RESOURCES.map(r => (
                  <a key={r.url} href={r.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-secondary/50 transition-colors group">
                    <div>
                      <p className="text-sm font-medium text-foreground group-hover:text-primary">{r.name}</p>
                      <p className="text-xs text-muted-foreground">{r.desc}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
