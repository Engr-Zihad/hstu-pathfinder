import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowLeft, Star, Lightbulb, Save } from 'lucide-react';
import { toast } from 'sonner';
import { platforms } from '@/data/platforms';

export default function PlatformPage() {
  const { platformId } = useParams();
  const navigate = useNavigate();
  const platform = platforms[platformId || ''];
  const [username, setUsername] = useState(() => localStorage.getItem(`hstu_platform_${platformId}_username`) || '');
  const [notes, setNotes] = useState(() => localStorage.getItem(`hstu_platform_${platformId}_notes`) || '');

  if (!platform) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">Platform not found</p>
        <button onClick={() => navigate('/chat')} className="mt-4 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm">Go to Chat</button>
      </div>
    );
  }

  const saveTracker = () => {
    localStorage.setItem(`hstu_platform_${platformId}_username`, username);
    localStorage.setItem(`hstu_platform_${platformId}_notes`, notes);
    toast.success('Saved!');
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        {/* Header */}
        <div className="glass-card rounded-2xl p-6 mb-6" style={{ borderColor: `${platform.color}30` }}>
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">{platform.name}</h1>
              <p className="text-muted-foreground mt-1">{platform.tagline}</p>
              <span className="inline-block mt-2 text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">{platform.difficulty}</span>
            </div>
            <a href={platform.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
              style={{ background: platform.color }}>
              Open Platform <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-6">{platform.description}</p>

        {/* Best For */}
        <section className="mb-6">
          <h2 className="text-lg font-heading font-bold text-foreground mb-3 flex items-center gap-2"><Star className="w-5 h-5 text-primary" /> Best For</h2>
          <div className="flex flex-wrap gap-2">
            {platform.bestFor.map((tag, i) => (
              <span key={i} className="text-xs px-3 py-1.5 rounded-full glass-card text-foreground">{tag}</span>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mb-6">
          <h2 className="text-lg font-heading font-bold text-foreground mb-3">⚡ Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {platform.features.map((f, i) => (
              <div key={i} className="glass-card rounded-xl px-4 py-3 text-sm text-foreground flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" /> {f}
              </div>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section className="mb-6">
          <h2 className="text-lg font-heading font-bold text-foreground mb-3 flex items-center gap-2"><Lightbulb className="w-5 h-5 text-yellow-400" /> Student Tips</h2>
          <div className="space-y-2">
            {platform.tips.map((tip, i) => (
              <div key={i} className="glass-card rounded-xl px-4 py-3 text-sm text-muted-foreground">
                💡 {tip}
              </div>
            ))}
          </div>
        </section>

        {/* Tracker */}
        <section className="mb-6">
          <h2 className="text-lg font-heading font-bold text-foreground mb-3">📊 Personal Tracker</h2>
          <div className="glass-card rounded-xl p-4 space-y-3">
            <div>
              <label className="text-xs text-muted-foreground">Your Username</label>
              <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter your username" className="w-full mt-1 px-3 py-2 rounded-lg bg-secondary text-foreground text-sm border border-border outline-none" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Notes</label>
              <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Track your progress..." rows={3} className="w-full mt-1 px-3 py-2 rounded-lg bg-secondary text-foreground text-sm border border-border outline-none resize-none" />
            </div>
            <button onClick={saveTracker} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm hover:opacity-90">
              <Save className="w-4 h-4" /> Save Progress
            </button>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
