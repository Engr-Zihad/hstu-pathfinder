import { ExternalLink, Briefcase, Code2, FileText, User } from 'lucide-react';

const COMPANIES = [
  'Brain Station 23', 'Kaz Software', 'Enosis Solutions', 'Therap BD',
  'Chaldal', 'Shohoz', 'bKash Tech', 'Pathao', 'BJIT', 'TigerIT',
];

const JOB_PORTALS = [
  { name: 'LinkedIn Jobs', url: 'https://www.linkedin.com/jobs' },
  { name: 'BdJobs', url: 'https://www.bdjobs.com' },
  { name: 'Glassdoor', url: 'https://www.glassdoor.com' },
  { name: 'Indeed', url: 'https://bd.indeed.com' },
];

const TIPS = [
  { icon: Code2, title: 'Technical Skills', items: ['DSA (LeetCode 150+ problems)', 'System Design basics', 'At least one framework (React/Django/Spring)', 'Git & Linux proficiency'] },
  { icon: FileText, title: 'Resume Tips', items: ['One page, clean format', 'GitHub projects with README', 'Quantify achievements', 'Tailor for each application'] },
  { icon: User, title: 'Interview Prep', items: ['Practice mock interviews', 'Study common DSA patterns', 'Prepare STAR method answers', 'Research the company'] },
];

export default function InternshipPage() {
  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-heading font-bold gradient-text mb-1">🎯 Internship & Job Guide</h1>
        <p className="text-muted-foreground text-sm mb-6">Your guide to landing tech jobs in Bangladesh & beyond</p>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {TIPS.map(t => (
            <div key={t.title} className="glass-card rounded-2xl p-5">
              <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center mb-3">
                <t.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-foreground text-sm mb-3">{t.title}</h3>
              <ul className="space-y-1.5">
                {t.items.map((item, i) => (
                  <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                    <span className="text-primary mt-0.5">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Companies */}
        <div className="glass-card rounded-2xl p-6 mb-6">
          <h3 className="font-heading font-bold text-foreground mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-primary" /> Top BD Tech Companies
          </h3>
          <div className="flex flex-wrap gap-2">
            {COMPANIES.map(c => (
              <span key={c} className="px-3 py-1.5 rounded-lg bg-secondary/50 text-sm text-foreground">{c}</span>
            ))}
          </div>
        </div>

        {/* Job Portals */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-heading font-bold text-foreground mb-4">🔗 Job Portals</h3>
          <div className="grid grid-cols-2 gap-3">
            {JOB_PORTALS.map(p => (
              <a key={p.url} href={p.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-between px-4 py-3 rounded-xl bg-secondary/30 hover:bg-primary/10 transition-colors group">
                <span className="text-sm font-medium text-foreground group-hover:text-primary">{p.name}</span>
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
