import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Plus, Trash2, Search } from 'lucide-react';
import { toast } from 'sonner';
interface Note { id: string; title: string; content: string; createdAt: number; updatedAt: number }
function genId() { return Date.now().toString(36) + Math.random().toString(36).slice(2); }
export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>(() => { try { return JSON.parse(localStorage.getItem('hstu_notes') || '[]'); } catch { return []; } });
  const [activeId, setActiveId] = useState('');
  const [search, setSearch] = useState('');
  const active = notes.find(n => n.id === activeId);
  const save = (u: Note[]) => { setNotes(u); localStorage.setItem('hstu_notes', JSON.stringify(u)); };
  const create = () => { const n: Note = { id: genId(), title: 'Untitled Note', content: '', createdAt: Date.now(), updatedAt: Date.now() }; save([n, ...notes]); setActiveId(n.id); };
  const update = (field: keyof Note, value: string) => { save(notes.map(n => n.id === activeId ? { ...n, [field]: value, updatedAt: Date.now() } : n)); };
  const filtered = notes.filter(n => !search || n.title.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="flex h-screen">
      <div className="w-72 border-r border-border flex flex-col shrink-0 hidden md:flex">
        <div className="p-3 space-y-2 border-b border-border">
          <button onClick={create} className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-medium"><Plus className="w-4 h-4" /> New Note</button>
          <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="w-full pl-9 pr-3 py-2 rounded-lg bg-secondary text-foreground text-sm border border-border outline-none" /></div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filtered.map(n => (<div key={n.id} onClick={() => setActiveId(n.id)} className={`group px-3 py-2 rounded-lg cursor-pointer text-sm ${n.id === activeId ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary'}`}>
            <p className="truncate font-medium">{n.title}</p><p className="text-xs truncate mt-0.5">{n.content.slice(0, 60) || 'Empty note'}</p>
            <div className="flex justify-between items-center mt-1"><span className="text-[10px]">{new Date(n.updatedAt).toLocaleDateString()}</span>
              <button onClick={e => { e.stopPropagation(); save(notes.filter(x => x.id !== n.id)); if(activeId===n.id) setActiveId(''); toast.success('Deleted'); }} className="opacity-0 group-hover:opacity-100 text-destructive"><Trash2 className="w-3 h-3" /></button>
            </div>
          </div>))}
        </div>
      </div>
      <div className="flex-1 flex flex-col p-4 md:p-6">
        {active ? (<>
          <input value={active.title} onChange={e => update('title', e.target.value)} className="text-2xl font-heading font-bold bg-transparent text-foreground outline-none mb-4" />
          <textarea value={active.content} onChange={e => update('content', e.target.value)} className="flex-1 bg-transparent text-foreground text-sm outline-none resize-none" placeholder="Start writing..." />
          <p className="text-xs text-muted-foreground mt-2">{active.content.split(/\s+/).filter(Boolean).length} words</p>
        </>) : (<div className="flex-1 flex items-center justify-center"><div className="text-center"><FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" /><p className="text-muted-foreground">Select or create a note</p><button onClick={create} className="mt-3 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm">Create Note</button></div></div>)}
      </div>
    </div>
  );
}
