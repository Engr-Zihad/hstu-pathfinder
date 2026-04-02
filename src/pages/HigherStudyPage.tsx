import { ExternalLink } from 'lucide-react';

const STEPS = [
  { num: 1, title: 'IELTS Preparation', desc: 'Target 7.0+ overall score', time: 'Year 3, Sem 1' },
  { num: 2, title: 'GRE Preparation', desc: 'Target 320+ (Quant: 165+)', time: 'Year 3, Sem 2' },
  { num: 3, title: 'Research Experience', desc: 'Work on thesis & publish papers', time: 'Year 3-4' },
  { num: 4, title: 'SOP & LOR', desc: 'Write Statement of Purpose, get 3 recommendation letters', time: 'Year 4, Sem 1' },
  { num: 5, title: 'Apply', desc: 'Apply to 10-15 universities', time: 'Year 4, Oct-Dec' },
];

const RESOURCES = [
  { title: 'IELTS Prep', links: [
    { name: 'British Council BD', url: 'https://www.britishcouncil.org.bd/en/exam/ielts' },
    { name: 'IELTS Liz', url: 'https://ieltsliz.com' },
  ]},
  { title: 'GRE Prep', links: [
    { name: 'ETS Official', url: 'https://www.ets.org/gre' },
    { name: 'GregMat', url: 'https://www.gregmat.com' },
  ]},
  { title: 'Scholarships', links: [
    { name: 'Fulbright', url: 'https://bd.usembassy.gov/education-culture/fulbright-program/' },
    { name: 'DAAD', url: 'https://www.daad.de/en/' },
    { name: 'Commonwealth', url: 'https://cscuk.fcdo.gov.uk/scholarships/' },
  ]},
  { title: 'University Rankings', links: [
    { name: 'CSRankings', url: 'http://csrankings.org' },
    { name: 'GradCafe', url: 'https://www.thegradcafe.com' },
  ]},
];

const EMAIL_TEMPLATE = `Subject: Prospective MS/PhD Student — [Your Research Area]

Dear Professor [Name],

I am [Your Name], a final-year CSE student at HSTU, Bangladesh. I am interested in your research on [specific area]. 

My relevant experience includes [thesis/project details]. I have [GPA/publications if any].

Would you be accepting students for Fall [Year]? I would love to discuss potential research opportunities.

Best regards,
[Your Name]`;

export default function HigherStudyPage() {
  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-heading font-bold gradient-text mb-1">🌐 Higher Study Abroad</h1>
        <p className="text-muted-foreground text-sm mb-6">Your complete guide to MS/PhD abroad from HSTU</p>

        {/* Steps */}
        <div className="relative mb-10">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-accent" />
          <div className="space-y-6">
            {STEPS.map(s => (
              <div key={s.num} className="relative pl-16">
                <div className="absolute left-3 w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-primary-foreground z-10">
                  {s.num}
                </div>
                <div className="glass-card rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-foreground text-sm">{s.title}</h3>
                    <span className="text-[10px] text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded-full">{s.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {RESOURCES.map(r => (
            <div key={r.title} className="glass-card rounded-2xl p-5">
              <h3 className="font-heading font-bold text-foreground text-sm mb-3">{r.title}</h3>
              <div className="space-y-2">
                {r.links.map(l => (
                  <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-between text-sm text-muted-foreground hover:text-primary transition-colors">
                    {l.name} <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Email Template */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-heading font-bold text-foreground mb-3">📧 Professor Email Template</h3>
          <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-mono bg-secondary/30 rounded-xl p-4 leading-relaxed">{EMAIL_TEMPLATE}</pre>
        </div>
      </div>
    </div>
  );
}
