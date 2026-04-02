import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, GraduationCap, Copy, Check, RotateCcw, ThumbsUp, ThumbsDown, ArrowDown, Sparkles, Trash2, Download, Plus } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Message, streamChat } from '@/lib/chat';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const SUGGESTIONS = [
  { text: "📖 HSTU CSE Curriculum — সব semester এর course details দাও", label: "📖 Curriculum Guide" },
  { text: "🧮 আমার CGPA কিভাবে calculate করবো? Formula সহ বলো", label: "🧮 CGPA Calculator" },
  { text: "🗺️ CSE 4-Year Career Roadmap তৈরি করো", label: "🗺️ Career Roadmap" },
  { text: "💻 Competitive Programming শুরু করবো কিভাবে?", label: "💻 Start CP" },
  { text: "🎓 MS Abroad এ apply করবো কিভাবে? Step by step guide", label: "🎓 MS Abroad" },
  { text: "📅 Study Schedule বানাও আমার জন্য", label: "📅 Study Schedule" },
  { text: "💼 Internship পেতে কি কি skill দরকার?", label: "💼 Internship Tips" },
  { text: "🔍 Data Structures (CSE 203) explain করো details সহ", label: "🔍 Explain Subject" },
];

type ChatHistory = { id: string; title: string; messages: Message[]; date: string };

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="p-1.5 rounded-lg hover:bg-secondary/80 transition-colors" title="Copy">
      {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-muted-foreground" />}
    </button>
  );
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>(() => {
    try { return JSON.parse(localStorage.getItem('chatHistory') || '[]'); } catch { return []; }
  });
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (messages.length > 0 && currentChatId) {
      const updated = chatHistory.map(c => c.id === currentChatId ? { ...c, messages } : c);
      setChatHistory(updated);
      localStorage.setItem('chatHistory', JSON.stringify(updated));
    }
  }, [messages]);

  const scrollToBottom = useCallback(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, isLoading]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    setShowScrollBtn(scrollHeight - scrollTop - clientHeight > 100);
  };

  const newChat = () => {
    setMessages([]);
    setCurrentChatId(null);
  };

  const loadChat = (chat: ChatHistory) => {
    setMessages(chat.messages);
    setCurrentChatId(chat.id);
  };

  const deleteChat = (id: string) => {
    const updated = chatHistory.filter(c => c.id !== id);
    setChatHistory(updated);
    localStorage.setItem('chatHistory', JSON.stringify(updated));
    if (currentChatId === id) newChat();
    toast.success('Chat deleted');
  };

  const send = async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMsg: Message = { role: 'user', content: text.trim() };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setInput('');

    // Create chat if new
    if (!currentChatId) {
      const id = Date.now().toString();
      const title = text.trim().slice(0, 40);
      const chat: ChatHistory = { id, title, messages: newMsgs, date: new Date().toLocaleDateString() };
      const updated = [chat, ...chatHistory];
      setChatHistory(updated);
      localStorage.setItem('chatHistory', JSON.stringify(updated));
      setCurrentChatId(id);
    }

    setIsLoading(true);
    let soFar = '';
    await streamChat({
      messages: newMsgs,
      onDelta: (chunk) => {
        soFar += chunk;
        setMessages(prev => {
          const last = prev[prev.length - 1];
          if (last?.role === 'assistant') return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: soFar } : m);
          return [...prev, { role: 'assistant', content: soFar }];
        });
      },
      onDone: () => setIsLoading(false),
      onError: (err) => { setIsLoading(false); toast.error(err); },
    });
  };

  const regenerate = () => {
    if (messages.length < 2) return;
    const withoutLast = messages.slice(0, -1);
    const lastUser = withoutLast[withoutLast.length - 1];
    if (lastUser?.role === 'user') {
      setMessages(withoutLast);
      setTimeout(() => send(lastUser.content), 100);
    }
  };

  const exportChat = () => {
    const text = messages.map(m => `${m.role === 'user' ? '🧑 You' : '🤖 AI'}:\n${m.content}\n`).join('\n---\n\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'hstu-chat.txt'; a.click();
    toast.success('Chat exported!');
  };

  const autoResize = (el: HTMLTextAreaElement) => {
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 150) + 'px';
  };

  return (
    <div className="flex flex-1 h-full overflow-hidden">
      {/* Chat history sidebar - desktop only */}
      <div className="hidden xl:flex flex-col w-[240px] border-r border-border bg-card/30 shrink-0">
        <div className="p-3 border-b border-border">
          <button onClick={newChat} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium transition-colors">
            <Plus className="w-4 h-4" /> New Chat
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {chatHistory.map(c => (
            <div key={c.id} className={`group flex items-center gap-2 px-3 py-2 rounded-lg text-xs cursor-pointer transition-colors
              ${currentChatId === c.id ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary/50'}`}>
              <span className="flex-1 truncate" onClick={() => loadChat(c)}>{c.title}</span>
              <button onClick={() => deleteChat(c.id)} className="opacity-0 group-hover:opacity-100 p-0.5 hover:text-destructive transition-all">
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Chat main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-14 border-b border-border bg-card/30 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-border">
              <GraduationCap className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-sm font-heading font-bold text-foreground">HSTU CSE Guide AI</h2>
              <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" /> Online • Powered by AI
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {messages.length > 0 && (
              <button onClick={exportChat} className="p-2 rounded-lg hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors" title="Export">
                <Download className="w-4 h-4" />
              </button>
            )}
            <button onClick={newChat} className="p-2 rounded-lg hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors" title="New Chat">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} onScroll={handleScroll} className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full gap-6 max-w-2xl mx-auto text-center animate-fade-in">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary via-accent to-purple flex items-center justify-center shadow-2xl glow-ring">
                  <GraduationCap className="w-10 h-10 text-primary-foreground" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold gradient-text mb-2">HSTU CSE Guide AI</h2>
                <p className="text-muted-foreground text-sm max-w-md mx-auto">
                  তোমার ৪ বছরের CSE জার্নিতে AI-powered guide। সঠিক curriculum, programming help, career guidance — সবকিছু এখানে! 🚀
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full max-w-2xl">
                {SUGGESTIONS.map((s, i) => (
                  <button key={i} onClick={() => send(s.text)}
                    className="glass-card rounded-xl p-3 text-left hover:bg-primary/5 hover:border-primary/20 transition-all text-xs">
                    <span className="font-semibold text-foreground">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 animate-fade-in ${m.role === 'user' ? 'justify-end' : ''}`}>
              {m.role === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0 mt-1 glow-border">
                  <GraduationCap className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
              <div className={`max-w-[80%] ${m.role === 'user' ? 'order-first' : ''}`}>
                <div className={`rounded-2xl px-4 py-3 ${
                  m.role === 'user'
                    ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-br-md ml-auto'
                    : 'glass-card text-foreground rounded-tl-md'
                }`}>
                  {m.role === 'assistant' ? (
                    <div className="prose prose-sm max-w-none prose-invert
                      prose-p:my-2 prose-p:leading-relaxed
                      prose-headings:font-heading prose-headings:text-foreground
                      prose-h2:text-lg prose-h2:mt-4 prose-h2:mb-2
                      prose-h3:text-base prose-h3:mt-3
                      prose-code:text-accent prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
                      prose-pre:bg-transparent prose-pre:p-0
                      prose-a:text-primary prose-a:underline-offset-2
                      prose-strong:text-foreground
                      prose-th:bg-secondary/50 prose-th:p-2 prose-td:p-2
                      prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:rounded-r-lg
                      prose-ul:my-2 prose-ol:my-2 prose-li:my-0.5
                    ">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}
                        components={{
                          code({ className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '');
                            const code = String(children).replace(/\n$/, '');
                            return match ? (
                              <div className="relative group/code rounded-xl overflow-hidden border border-border my-3">
                                <div className="flex items-center justify-between bg-secondary/50 px-4 py-1.5 text-xs text-muted-foreground">
                                  <span>{match[1]}</span>
                                  <CopyBtn text={code} />
                                </div>
                                <SyntaxHighlighter style={oneDark} language={match[1]} PreTag="div"
                                  customStyle={{ margin: 0, borderRadius: 0, background: 'hsl(225 25% 7%)' }}>
                                  {code}
                                </SyntaxHighlighter>
                              </div>
                            ) : <code className={className} {...props}>{children}</code>;
                          },
                          a({ href, children }) {
                            return <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{children}</a>;
                          }
                        }}
                      >{m.content}</ReactMarkdown>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{m.content}</p>
                  )}
                </div>
                {m.role === 'assistant' && (
                  <div className="flex items-center gap-1 mt-1.5 ml-1">
                    <CopyBtn text={m.content} />
                    {i === messages.length - 1 && !isLoading && (
                      <button onClick={regenerate} className="p-1.5 rounded-lg hover:bg-secondary/80 transition-colors" title="Regenerate">
                        <RotateCcw className="w-3.5 h-3.5 text-muted-foreground" />
                      </button>
                    )}
                    <button className="p-1.5 rounded-lg hover:bg-secondary/80 transition-colors"><ThumbsUp className="w-3.5 h-3.5 text-muted-foreground" /></button>
                    <button className="p-1.5 rounded-lg hover:bg-secondary/80 transition-colors"><ThumbsDown className="w-3.5 h-3.5 text-muted-foreground" /></button>
                  </div>
                )}
              </div>
              {m.role === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/50 to-primary flex items-center justify-center shrink-0 mt-1 text-primary-foreground text-xs font-bold">
                  You
                </div>
              )}
            </div>
          ))}

          {isLoading && messages[messages.length - 1]?.role === 'user' && (
            <div className="flex gap-3 animate-fade-in">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0 glow-border">
                <GraduationCap className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="glass-card rounded-2xl rounded-tl-md px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-primary typing-dot" />
                  <div className="w-2 h-2 rounded-full bg-primary typing-dot" />
                  <div className="w-2 h-2 rounded-full bg-primary typing-dot" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Scroll to bottom */}
        {showScrollBtn && (
          <button onClick={scrollToBottom}
            className="absolute bottom-24 right-6 w-10 h-10 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/30 transition-colors z-10">
            <ArrowDown className="w-4 h-4" />
          </button>
        )}

        {/* Input */}
        <div className="border-t border-border bg-card/30 backdrop-blur-sm p-3">
          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex items-end gap-2 max-w-3xl mx-auto">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef} value={input}
                onChange={(e) => { setInput(e.target.value); autoResize(e.target); }}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); } }}
                placeholder="তোমার প্রশ্ন লেখো... 💬"
                rows={1}
                className="w-full resize-none rounded-xl border border-input bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
              />
              {input.length > 200 && (
                <span className="absolute bottom-1 right-3 text-[10px] text-muted-foreground">{input.length}</span>
              )}
            </div>
            <Button type="submit" size="icon" disabled={!input.trim() || isLoading}
              className="rounded-xl h-11 w-11 shrink-0 bg-gradient-to-r from-primary to-accent hover:opacity-90">
              <Send className="w-4 h-4" />
            </Button>
          </form>
          <p className="text-center text-[10px] text-muted-foreground/40 mt-2">
            HSTU CSE Guide AI • Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}
