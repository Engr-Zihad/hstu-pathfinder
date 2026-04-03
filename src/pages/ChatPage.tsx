import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, Copy, Check, ThumbsUp, ThumbsDown, RefreshCw, ArrowDown, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { Message, Chat } from '@/types/chat';
import { streamChat } from '@/lib/chat';

const quickActions = [
  { emoji: '📖', label: 'Curriculum Guide', msg: 'Tell me about the HSTU CSE curriculum — all 8 semesters in detail' },
  { emoji: '🧮', label: 'CGPA Calculator', msg: 'How does the CGPA calculation work at HSTU? Explain with examples' },
  { emoji: '🗺️', label: 'Career Roadmap', msg: 'Give me a complete 4-year career roadmap for a CSE student at HSTU' },
  { emoji: '💻', label: 'Start Coding', msg: 'I am a first-year HSTU CSE student. How do I start learning programming?' },
  { emoji: '🎓', label: 'MS/PhD Guide', msg: 'How can I apply for MS/PhD abroad after graduating from HSTU CSE?' },
  { emoji: '🏆', label: 'Competitive Prog', msg: 'How to start competitive programming as an HSTU CSE student?' },
  { emoji: '🎨', label: 'Learn UI/UX', msg: 'How to learn UI/UX design as a CSE student? Give me a complete roadmap' },
  { emoji: '🔗', label: 'Web3 Intro', msg: 'What is Web3 and blockchain? How can I start learning as a CSE student?' },
];

function generateId() { return Date.now().toString(36) + Math.random().toString(36).slice(2); }

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); toast.success('Copied!'); }}
      className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>(() => { try { return JSON.parse(localStorage.getItem('hstu_chats') || '[]'); } catch { return []; } });
  const [activeChatId, setActiveChatId] = useState<string>(() => localStorage.getItem('hstu_active_chat_id') || '');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const activeChat = chats.find(c => c.id === activeChatId);
  const messages = activeChat?.messages || [];

  const saveChats = useCallback((updatedChats: Chat[]) => {
    const trimmed = updatedChats.slice(0, 50);
    setChats(trimmed);
    localStorage.setItem('hstu_chats', JSON.stringify(trimmed));
  }, []);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => { scrollToBottom(); }, [messages.length]);

  useEffect(() => {
    const el = chatContainerRef.current;
    if (!el) return;
    const onScroll = () => setShowScrollBtn(el.scrollHeight - el.scrollTop - el.clientHeight > 200);
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    setInput('');
    let chatId = activeChatId;
    let currentChats = [...chats];
    if (!chatId || !currentChats.find(c => c.id === chatId)) {
      const newChat: Chat = { id: generateId(), title: text.slice(0, 40), messages: [], createdAt: Date.now(), updatedAt: Date.now() };
      currentChats = [newChat, ...currentChats];
      chatId = newChat.id;
      setActiveChatId(chatId);
      localStorage.setItem('hstu_active_chat_id', chatId);
    }
    const userMsg: Message = { id: generateId(), role: 'user', content: text, timestamp: Date.now() };
    const aiMsg: Message = { id: generateId(), role: 'assistant', content: '', timestamp: Date.now() };
    currentChats = currentChats.map(c => c.id === chatId ? { ...c, title: c.messages.length === 0 ? text.slice(0, 40) : c.title, messages: [...c.messages, userMsg, aiMsg], updatedAt: Date.now() } : c);
    saveChats(currentChats);
    setLoading(true);
    const historyMsgs = currentChats.find(c => c.id === chatId)!.messages.slice(0, -1).map(m => ({ role: m.role as 'user' | 'assistant', content: m.content }));
    streamChat({
      messages: historyMsgs,
      onDelta: (delta) => {
        currentChats = currentChats.map(c => { if (c.id !== chatId) return c; const msgs = [...c.messages]; const last = msgs[msgs.length - 1]; msgs[msgs.length - 1] = { ...last, content: last.content + delta }; return { ...c, messages: msgs }; });
        saveChats(currentChats);
      },
      onDone: () => setLoading(false),
      onError: (err) => {
        currentChats = currentChats.map(c => { if (c.id !== chatId) return c; const msgs = [...c.messages]; msgs[msgs.length - 1] = { ...msgs[msgs.length - 1], content: '❌ Error: ' + err }; return { ...c, messages: msgs }; });
        saveChats(currentChats); setLoading(false); toast.error(err);
      },
    });
  };

  const deleteChat = (id: string) => {
    const updated = chats.filter(c => c.id !== id); saveChats(updated);
    if (activeChatId === id) { setActiveChatId(updated[0]?.id || ''); localStorage.setItem('hstu_active_chat_id', updated[0]?.id || ''); }
    toast.success('Chat deleted');
  };

  const setFeedback = (msgId: string, feedback: 'up' | 'down') => {
    saveChats(chats.map(c => c.id !== activeChatId ? c : { ...c, messages: c.messages.map(m => m.id === msgId ? { ...m, feedback } : m) }));
  };

  const regenerate = () => {
    if (!activeChat || activeChat.messages.length < 2) return;
    const lastUserMsg = [...activeChat.messages].reverse().find(m => m.role === 'user');
    if (lastUserMsg) { saveChats(chats.map(c => c.id !== activeChatId ? c : { ...c, messages: c.messages.slice(0, -1) })); sendMessage(lastUserMsg.content); }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); } };

  useEffect(() => { if (textareaRef.current) { textareaRef.current.style.height = 'auto'; textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 150) + 'px'; } }, [input]);

  return (
    <div className="flex h-screen">
      <div className="hidden lg:flex flex-col w-64 border-r border-border bg-[hsl(var(--sidebar-background))]/50 shrink-0">
        <div className="p-3 border-b border-border">
          <button onClick={() => { const nc: Chat = { id: generateId(), title: 'New Chat', messages: [], createdAt: Date.now(), updatedAt: Date.now() }; saveChats([nc, ...chats]); setActiveChatId(nc.id); localStorage.setItem('hstu_active_chat_id', nc.id); }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-medium hover:opacity-90">+ New Chat</button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {chats.map(chat => (
            <div key={chat.id} className={`group flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm transition-colors ${chat.id === activeChatId ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`}
              onClick={() => { setActiveChatId(chat.id); localStorage.setItem('hstu_active_chat_id', chat.id); }}>
              <span className="truncate flex-1">{chat.title}</span>
              <button onClick={(e) => { e.stopPropagation(); deleteChat(chat.id); }} className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-destructive/20 text-destructive"><Trash2 className="w-3 h-3" /></button>
            </div>
          ))}
          {chats.length === 0 && <p className="text-xs text-muted-foreground text-center py-8">No chats yet</p>}
        </div>
      </div>
      <div className="flex-1 flex flex-col min-w-0 relative">
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 mx-auto glow-ring"><span className="text-3xl">🤖</span></div>
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">Hello! I'm HSTU CSE Guide AI 👋</h1>
                <p className="text-muted-foreground mb-8 max-w-md">Your 4-year academic partner at HSTU. Ask me anything about curriculum, career, coding, or higher study.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-w-2xl">
                  {quickActions.map((qa) => (
                    <button key={qa.label} onClick={() => sendMessage(qa.msg)} className="glass-card px-3 py-3 rounded-xl text-sm text-left hover:border-primary/50 hover:shadow-[0_0_24px_hsl(var(--primary)/0.15)] transition-all">
                      <span className="text-lg">{qa.emoji}</span><p className="text-foreground mt-1 text-xs font-medium">{qa.label}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          ) : (
            messages.map((msg, i) => (
              <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className="max-w-[85%] md:max-w-[75%]">
                  <div className={`px-4 py-3 rounded-2xl ${msg.role === 'user' ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-br-sm' : 'glass-card rounded-bl-sm'}`}>
                    {msg.role === 'assistant' ? (
                      <div className="prose prose-invert prose-sm max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
                          code({ className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '');
                            const code = String(children).replace(/\n$/, '');
                            if (match) return (<div className="relative group my-3"><div className="absolute top-2 right-2 z-10"><CopyButton text={code} /></div><SyntaxHighlighter style={oneDark} language={match[1]} PreTag="div" className="rounded-xl !bg-[hsl(var(--secondary))] text-sm">{code}</SyntaxHighlighter></div>);
                            return <code className="bg-secondary px-1.5 py-0.5 rounded text-accent text-sm font-mono" {...props}>{children}</code>;
                          },
                          a({ href, children }) { return <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent underline">{children}</a>; },
                        }}>{msg.content || ''}</ReactMarkdown>
                        {loading && i === messages.length - 1 && !msg.content && (
                          <div className="flex gap-1.5 py-2"><div className="w-2 h-2 rounded-full bg-primary typing-dot" /><div className="w-2 h-2 rounded-full bg-primary typing-dot" /><div className="w-2 h-2 rounded-full bg-primary typing-dot" /></div>
                        )}
                      </div>
                    ) : (<p className="text-sm whitespace-pre-wrap">{msg.content}</p>)}
                  </div>
                  {msg.role === 'assistant' && msg.content && (
                    <div className="flex items-center gap-1 mt-1.5 ml-1">
                      <CopyButton text={msg.content} />
                      <button onClick={() => setFeedback(msg.id, 'up')} className={`p-1.5 rounded-lg transition-colors ${msg.feedback === 'up' ? 'text-[hsl(var(--green))]' : 'text-muted-foreground hover:text-foreground'}`}><ThumbsUp className="w-3.5 h-3.5" /></button>
                      <button onClick={() => setFeedback(msg.id, 'down')} className={`p-1.5 rounded-lg transition-colors ${msg.feedback === 'down' ? 'text-destructive' : 'text-muted-foreground hover:text-foreground'}`}><ThumbsDown className="w-3.5 h-3.5" /></button>
                      {i === messages.length - 1 && <button onClick={regenerate} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground"><RefreshCw className="w-3.5 h-3.5" /></button>}
                      <span className="text-[10px] text-muted-foreground ml-2">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  )}
                  {msg.role === 'user' && <p className="text-[10px] text-muted-foreground mt-1 text-right mr-1">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>}
                </div>
              </motion.div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
        {showScrollBtn && <button onClick={scrollToBottom} className="absolute bottom-24 right-6 p-2 rounded-full bg-primary text-primary-foreground shadow-lg z-20"><ArrowDown className="w-4 h-4" /></button>}
        <div className="p-3 md:p-4 border-t border-border">
          <div className="glass-card rounded-2xl flex items-end gap-2 p-2">
            <textarea ref={textareaRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Ask me anything about HSTU CSE..." rows={1}
              className="flex-1 bg-transparent text-foreground text-sm resize-none outline-none px-3 py-2 max-h-[150px] placeholder:text-muted-foreground" />
            <button onClick={() => sendMessage(input)} disabled={!input.trim() || loading}
              className="p-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground disabled:opacity-40 hover:opacity-90 transition-all shrink-0"><Send className="w-4 h-4" /></button>
          </div>
          {input.length > 100 && <p className="text-[10px] text-muted-foreground mt-1 text-right">{input.length} characters</p>}
        </div>
      </div>
    </div>
  );
}
