import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Trash2, Download } from 'lucide-react';
import { toast } from 'sonner';
export default function SettingsPage() {
  const [fontSize, setFontSize] = useState(() => localStorage.getItem('hstu_fontsize') || 'medium');
  const [lang, setLang] = useState(() => localStorage.getItem('hstu_lang') || 'auto');
  const [length, setLength] = useState(() => localStorage.getItem('hstu_length') || 'detailed');
  const saveSetting = (key: string, value: string, setter: (v: string) => void) => { localStorage.setItem(key, value); setter(value); toast.success('Setting saved'); };
  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6 flex items-center gap-3"><Settings className="w-7 h-7 text-primary" /> Settings</h1>
        <div className="space-y-6">
          <section className="glass-card rounded-xl p-5">
            <h2 className="text-sm font-semibold text-foreground mb-3">Appearance</h2>
            <div className="space-y-3">
              <div><label className="text-xs text-muted-foreground">Font Size</label><select value={fontSize} onChange={e => saveSetting('hstu_fontsize', e.target.value, setFontSize)} className="w-full mt-1 px-3 py-2 rounded-lg bg-secondary text-foreground text-sm border border-border outline-none"><option value="small">Small</option><option value="medium">Medium</option><option value="large">Large</option></select></div>
            </div>
          </section>
          <section className="glass-card rounded-xl p-5">
            <h2 className="text-sm font-semibold text-foreground mb-3">AI Preferences</h2>
            <div className="space-y-3">
              <div><label className="text-xs text-muted-foreground">Response Language</label><select value={lang} onChange={e => saveSetting('hstu_lang', e.target.value, setLang)} className="w-full mt-1 px-3 py-2 rounded-lg bg-secondary text-foreground text-sm border border-border outline-none"><option value="auto">Auto-detect</option><option value="bn">Bengali</option><option value="en">English</option></select></div>
              <div><label className="text-xs text-muted-foreground">Response Length</label><select value={length} onChange={e => saveSetting('hstu_length', e.target.value, setLength)} className="w-full mt-1 px-3 py-2 rounded-lg bg-secondary text-foreground text-sm border border-border outline-none"><option value="detailed">Detailed</option><option value="balanced">Balanced</option><option value="concise">Concise</option></select></div>
            </div>
          </section>
          <section className="glass-card rounded-xl p-5">
            <h2 className="text-sm font-semibold text-foreground mb-3">Data Management</h2>
            <div className="space-y-2">
              <button onClick={() => { const d = localStorage.getItem('hstu_chats') || '[]'; const b = new Blob([d], {type:'application/json'}); const u = URL.createObjectURL(b); const a = document.createElement('a'); a.href = u; a.download = 'hstu_chats_export.json'; a.click(); toast.success('Exported!'); }}
                className="w-full flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-foreground text-sm hover:bg-secondary/80"><Download className="w-4 h-4" /> Export All Chats</button>
              <button onClick={() => { if(confirm('Clear all chats?')) { localStorage.removeItem('hstu_chats'); localStorage.removeItem('hstu_active_chat_id'); toast.success('Chats cleared'); } }}
                className="w-full flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive/10 text-destructive text-sm hover:bg-destructive/20"><Trash2 className="w-4 h-4" /> Clear All Chats</button>
            </div>
          </section>
          <section className="glass-card rounded-xl p-5">
            <h2 className="text-sm font-semibold text-foreground mb-3">Keyboard Shortcuts</h2>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p><kbd className="px-1.5 py-0.5 rounded bg-secondary text-foreground text-xs">Ctrl+K</kbd> — Search</p>
              <p><kbd className="px-1.5 py-0.5 rounded bg-secondary text-foreground text-xs">Ctrl+N</kbd> — New Chat</p>
              <p><kbd className="px-1.5 py-0.5 rounded bg-secondary text-foreground text-xs">Esc</kbd> — Close modals</p>
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
