import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowLeft, Briefcase, BookOpen, Rocket, Star } from 'lucide-react';
import { tracks } from '@/data/tracks';

export default function TrackPage() {
  const { trackId } = useParams();
  const navigate = useNavigate();
  const track = tracks[trackId || ''];

  if (!track) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">Track not found</p>
        <button onClick={() => navigate('/chat')} className="mt-4 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm">Go to Chat</button>
      </div>
    );
  }

  const typeIcon = (type: string) => type === 'video' ? '📺' : type === 'practice' ? '🎯' : '📖';

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        {/* Hero */}
        <div className="glass-card rounded-2xl p-6 md:p-8 mb-6" style={{ borderColor: `${track.color}30` }}>
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${track.color}20` }}>
              <Rocket className="w-7 h-7" style={{ color: track.color }} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">{track.name}</h1>
              <p className="text-muted-foreground mt-1">{track.tagline}</p>
              <span className="inline-block mt-2 text-xs px-3 py-1 rounded-full" style={{ background: `${track.color}20`, color: track.color }}>{track.difficulty}</span>
            </div>
          </div>
        </div>

        {/* What you'll learn */}
        <section className="mb-6">
          <h2 className="text-lg font-heading font-bold text-foreground mb-3 flex items-center gap-2"><BookOpen className="w-5 h-5 text-primary" /> What You'll Learn</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {track.whatYouLearn.map((skill, i) => (
              <div key={i} className="glass-card rounded-xl px-3 py-2.5 text-sm text-foreground flex items-center gap-2">
                <Star className="w-3.5 h-3.5 shrink-0" style={{ color: track.color }} /> {skill}
              </div>
            ))}
          </div>
        </section>

        {/* Roadmap */}
        <section className="mb-6">
          <h2 className="text-lg font-heading font-bold text-foreground mb-3">🗺️ Learning Roadmap</h2>
          <div className="space-y-2">
            {track.roadmap.map((step, i) => (
              <div key={i} className="glass-card rounded-xl px-4 py-3 flex items-start gap-3">
                <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold" style={{ background: `${track.color}20`, color: track.color }}>
                  {i + 1}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{step.step}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Resources */}
        <section className="mb-6">
          <h2 className="text-lg font-heading font-bold text-foreground mb-3">🔗 Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {track.resources.map((res, i) => (
              <a key={i} href={res.url} target="_blank" rel="noopener noreferrer" className="glass-card rounded-xl px-4 py-3 flex items-center gap-3 hover:border-primary/30 transition-colors">
                <span className="text-lg">{typeIcon(res.type)}</span>
                <span className="text-sm text-foreground flex-1">{res.title}</span>
                <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" />
              </a>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="mb-6">
          <h2 className="text-lg font-heading font-bold text-foreground mb-3">🚀 Practice Projects</h2>
          <div className="space-y-2">
            {track.projects.map((proj, i) => (
              <div key={i} className="glass-card rounded-xl px-4 py-3 flex items-center justify-between">
                <span className="text-sm text-foreground">{i + 1}. {proj.name}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  proj.difficulty === 'Beginner' ? 'bg-[hsl(var(--green))]/10 text-[hsl(var(--green))]' :
                  proj.difficulty === 'Intermediate' ? 'bg-yellow-400/10 text-yellow-400' :
                  'bg-destructive/10 text-destructive'
                }`}>{proj.difficulty}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Jobs */}
        <section className="mb-6">
          <h2 className="text-lg font-heading font-bold text-foreground mb-3 flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary" /> Career Opportunities</h2>
          <div className="glass-card rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border">
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Role</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">BD Salary</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">International</th>
              </tr></thead>
              <tbody>
                {track.jobs.map((job, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 text-foreground">{job.role}</td>
                    <td className="px-4 py-3 text-muted-foreground">{job.bdSalary}</td>
                    <td className="px-4 py-3 text-[hsl(var(--green))]">{job.intSalary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <button onClick={() => navigate('/chat')} className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium hover:opacity-90 transition-opacity">
          🚀 Start Learning — Ask AI for a Personalized Plan
        </button>
      </motion.div>
    </div>
  );
}
