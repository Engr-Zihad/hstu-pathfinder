import { useState } from 'react';
import { Map, ChevronRight } from 'lucide-react';

const PATHS = [
  { id: 'swe', label: '💻 Software Engineer', color: 'from-blue-500 to-blue-600' },
  { id: 'ds', label: '📊 Data Scientist', color: 'from-purple-500 to-purple-600' },
  { id: 'cyber', label: '🔒 Cybersecurity', color: 'from-red-500 to-red-600' },
  { id: 'ml', label: '🤖 ML Engineer', color: 'from-emerald-500 to-emerald-600' },
  { id: 'phd', label: '🎓 Researcher/PhD', color: 'from-amber-500 to-amber-600' },
];

const YEARS = [
  {
    year: 1, label: 'Foundations', icon: '🏗️',
    items: ['Learn C programming deeply', 'Master Mathematics fundamentals', 'Start problem solving on Codeforces', 'Build your first projects', 'Create GitHub account & start contributing'],
    highlight: { swe: [0, 2, 3, 4], ds: [0, 1, 2], cyber: [0, 1], ml: [0, 1, 2], phd: [0, 1, 2] },
  },
  {
    year: 2, label: 'Core CS', icon: '⚡',
    items: ['Master Data Structures & Algorithms', 'Learn OOP (C++/Java)', 'Start competitive programming seriously', 'Learn Git & version control', 'Build 3-5 portfolio projects'],
    highlight: { swe: [0, 1, 3, 4], ds: [0, 1, 4], cyber: [0, 3], ml: [0, 1, 4], phd: [0, 1, 2] },
  },
  {
    year: 3, label: 'Systems & Specialization', icon: '🔧',
    items: ['Deep dive into OS, Networks, DBMS', 'Learn web development (React/Node)', 'Start applying for internships', 'Contribute to open source', 'Prepare for technical interviews'],
    highlight: { swe: [0, 1, 2, 4], ds: [0, 3], cyber: [0, 2, 3], ml: [0, 1, 3], phd: [0, 3, 4] },
  },
  {
    year: 4, label: 'Advanced & Career', icon: '🚀',
    items: ['Complete a strong thesis/project', 'Apply for jobs/MS programs', 'Learn AI/ML fundamentals', 'Build professional network', 'Prepare GRE/IELTS if going abroad'],
    highlight: { swe: [0, 1, 3], ds: [0, 1, 2, 3], cyber: [0, 1, 3], ml: [0, 1, 2], phd: [0, 1, 2, 4] },
  },
];

export default function RoadmapPage() {
  const [path, setPath] = useState('swe');

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-heading font-bold gradient-text mb-1">🗺️ 4-Year Career Roadmap</h1>
        <p className="text-muted-foreground text-sm mb-6">Choose your career path & follow the roadmap</p>

        {/* Path selector */}
        <div className="flex flex-wrap gap-2 mb-8">
          {PATHS.map(p => (
            <button key={p.id} onClick={() => setPath(p.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                path === p.id ? `bg-gradient-to-r ${p.color} text-white shadow-lg` : 'glass-card text-muted-foreground hover:text-foreground'
              }`}>{p.label}</button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-purple" />
          <div className="space-y-8">
            {YEARS.map(y => (
              <div key={y.year} className="relative pl-16">
                <div className="absolute left-3 w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-primary-foreground z-10">
                  {y.year}
                </div>
                <div className="glass-card rounded-2xl p-5">
                  <h3 className="font-heading font-bold text-lg text-foreground mb-1">
                    {y.icon} Year {y.year}: {y.label}
                  </h3>
                  <div className="space-y-2 mt-3">
                    {y.items.map((item, i) => {
                      const highlighted = y.highlight[path as keyof typeof y.highlight]?.includes(i);
                      return (
                        <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                          highlighted ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground'
                        }`}>
                          <ChevronRight className={`w-4 h-4 shrink-0 ${highlighted ? 'text-primary' : 'text-muted-foreground/50'}`} />
                          {item}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
