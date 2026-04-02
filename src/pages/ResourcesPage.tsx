import { ExternalLink } from 'lucide-react';

const SECTIONS = [
  {
    title: '📺 YouTube Channels (Bangla)',
    links: [
      { name: 'Anisul Islam', url: 'https://www.youtube.com/@anisulislamrubel', desc: 'C, C++, Python, Web Dev' },
      { name: 'Stack Learner', url: 'https://www.youtube.com/@StackLearner', desc: 'Full-stack development' },
      { name: 'Learn with Sumit', url: 'https://www.youtube.com/@LearnwithSumit', desc: 'JavaScript, React, Node.js' },
      { name: 'Tamim Shahriar Subeen', url: 'https://www.youtube.com/@subeen', desc: 'Programming fundamentals' },
    ],
  },
  {
    title: '📚 Learning Platforms',
    links: [
      { name: 'freeCodeCamp', url: 'https://www.freecodecamp.org', desc: 'Free coding curriculum' },
      { name: 'CS50 Harvard', url: 'https://cs50.harvard.edu/x', desc: 'Best intro to CS course' },
      { name: 'MIT OpenCourseWare', url: 'https://ocw.mit.edu', desc: 'MIT courses for free' },
      { name: 'Coursera', url: 'https://www.coursera.org', desc: 'University courses online' },
    ],
  },
  {
    title: '💻 Practice Platforms',
    links: [
      { name: 'Codeforces', url: 'https://codeforces.com', desc: 'Competitive programming' },
      { name: 'LeetCode', url: 'https://leetcode.com', desc: 'Interview preparation' },
      { name: 'HackerRank', url: 'https://www.hackerrank.com', desc: 'Coding challenges' },
      { name: 'CSES Problem Set', url: 'https://cses.fi/problemset', desc: 'Classic CP problems' },
    ],
  },
  {
    title: '📖 Reference Sites',
    links: [
      { name: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org', desc: 'CS theory & practice' },
      { name: 'W3Schools', url: 'https://www.w3schools.com', desc: 'Web technologies' },
      { name: 'MDN Web Docs', url: 'https://developer.mozilla.org', desc: 'Web standards reference' },
      { name: 'VisuAlgo', url: 'https://visualgo.net', desc: 'Algorithm visualization' },
      { name: 'CP-Algorithms', url: 'https://cp-algorithms.com', desc: 'Advanced algorithms' },
    ],
  },
  {
    title: '🎓 Higher Study Resources',
    links: [
      { name: 'GRE Prep (ETS)', url: 'https://www.ets.org/gre', desc: 'Official GRE resources' },
      { name: 'IELTS (British Council)', url: 'https://www.britishcouncil.org.bd/en/exam/ielts', desc: 'IELTS info for BD' },
      { name: 'CSRankings', url: 'http://csrankings.org', desc: 'CS university rankings' },
      { name: 'GradCafe', url: 'https://www.thegradcafe.com', desc: 'Admission results tracker' },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-heading font-bold gradient-text mb-1">🔗 Resources Hub</h1>
        <p className="text-muted-foreground text-sm mb-6">Curated learning resources for HSTU CSE students</p>

        <div className="space-y-8">
          {SECTIONS.map(section => (
            <div key={section.title}>
              <h2 className="font-heading font-bold text-lg text-foreground mb-3">{section.title}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {section.links.map(link => (
                  <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer"
                    className="glass-card rounded-xl p-4 hover:bg-primary/5 hover:border-primary/20 transition-all group">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{link.name}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{link.desc}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5 group-hover:text-primary transition-colors" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
