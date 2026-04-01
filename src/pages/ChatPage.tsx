import { useState, useRef, useEffect } from 'react';
import { Send, GraduationCap, BookOpen, Code, Lightbulb, MoreVertical, Trash2, Info, Moon, Sun, Sparkles, Copy, Check, Share2, Download } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Message, streamChat } from '@/lib/chat';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AboutDialog from '@/components/AboutDialog';

const SUGGESTIONS = [
  { icon: BookOpen, text: "Level 1 Semester I তে কি কি কোর্স আছে? সব course code সহ details দাও", label: "📚 Curriculum", color: "from-blue-500/20 to-cyan-500/20" },
  { icon: Code, text: "C programming এ pointer কিভাবে কাজ করে? Code example সহ বিস্তারিত explain করো", label: "💻 Programming", color: "from-purple-500/20 to-pink-500/20" },
  { icon: Lightbulb, text: "CSE 402/452 Project and Thesis এর জন্য ভালো কিছু topic suggest করো যেগুলো industry relevant", label: "🚀 Projects", color: "from-amber-500/20 to-orange-500/20" },
  { icon: Sparkles, text: "Data Structures (CSE 203) course এর জন্য best preparation plan কি? Resources সহ বলো", label: "📝 Study Plan", color: "from-green-500/20 to-emerald-500/20" },
];

const TypingIndicator = () => (
  <div className="flex items-start gap-3 max-w-[85%]">
    <div className="w-8 h-8 rounded-full chat-gradient flex items-center justify-center shrink-0 mt-1">
      <GraduationCap className="w-4 h-4 text-primary-foreground" />
    </div>
    <div className="bg-chat-ai rounded-2xl rounded-tl-md px-4 py-3">
      <div className="flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-primary/60 typing-dot" />
        <div className="w-2 h-2 rounded-full bg-primary/60 typing-dot" />
        <div className="w-2 h-2 rounded-full bg-primary/60 typing-dot" />
      </div>
    </div>
  </div>
);

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-secondary"
      title="Copy message"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5 text-muted-foreground" />}
    </button>
  );
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true' || window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isLoading]);

  const send = async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMsg: Message = { role: 'user', content: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    let soFar = '';
    const upsert = (chunk: string) => {
      soFar += chunk;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === 'assistant') {
          return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: soFar } : m);
        }
        return [...prev, { role: 'assistant', content: soFar }];
      });
    };

    await streamChat({
      messages: [...messages, userMsg],
      onDelta: upsert,
      onDone: () => setIsLoading(false),
      onError: (err) => {
        setIsLoading(false);
        toast({ title: 'Error', description: err, variant: 'destructive' });
      },
    });
  };

  const exportChat = () => {
    if (messages.length === 0) return;
    const text = messages.map(m => `${m.role === 'user' ? '🧑 You' : '🤖 HSTU CSE Buddy'}:\n${m.content}\n`).join('\n---\n\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'hstu-cse-chat.txt'; a.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Chat exported! 📥' });
  };

  const shareChat = async () => {
    if (messages.length === 0) return;
    const text = messages.map(m => `${m.role === 'user' ? 'Q' : 'A'}: ${m.content}`).join('\n\n');
    if (navigator.share) {
      await navigator.share({ title: 'HSTU CSE Buddy Chat', text });
    } else {
      navigator.clipboard.writeText(text);
      toast({ title: 'Chat copied to clipboard! 📋' });
    }
  };

  const showWelcome = messages.length === 0;

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="chat-gradient px-4 py-3 flex items-center gap-3 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="w-10 h-10 rounded-full bg-primary-foreground/20 border-2 border-primary-foreground/30 flex items-center justify-center relative z-10">
          <GraduationCap className="w-6 h-6 text-primary-foreground" />
        </div>
        <div className="flex-1 min-w-0 relative z-10">
          <h1 className="text-primary-foreground font-bold text-lg leading-tight flex items-center gap-1.5">
            HSTU CSE Buddy
            <Sparkles className="w-4 h-4 text-yellow-300" />
          </h1>
          <p className="text-primary-foreground/70 text-xs flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
            AI-Powered Academic Assistant
          </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-primary-foreground/10 transition-colors relative z-10">
              <MoreVertical className="w-5 h-5 text-primary-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52 rounded-xl">
            <DropdownMenuItem onClick={() => setDarkMode(d => !d)} className="gap-2 cursor-pointer">
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={exportChat} className="gap-2 cursor-pointer" disabled={messages.length === 0}>
              <Download className="w-4 h-4" />
              Export Chat
            </DropdownMenuItem>
            <DropdownMenuItem onClick={shareChat} className="gap-2 cursor-pointer" disabled={messages.length === 0}>
              <Share2 className="w-4 h-4" />
              Share Chat
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => { setMessages([]); toast({ title: '🗑️ Chat cleared' }); }}
              className="gap-2 cursor-pointer text-destructive"
            >
              <Trash2 className="w-4 h-4" />
              Clear Chat
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setAboutOpen(true)} className="gap-2 cursor-pointer">
              <Info className="w-4 h-4" />
              About Developer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <AboutDialog open={aboutOpen} onOpenChange={setAboutOpen} />

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 sm:px-4 py-4 space-y-5">
        {showWelcome && (
          <div className="flex flex-col items-center justify-center h-full gap-6 max-w-lg mx-auto text-center px-2">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl chat-gradient flex items-center justify-center shadow-xl">
                <GraduationCap className="w-12 h-12 text-primary-foreground" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-green-500 border-4 border-background flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Welcome to HSTU CSE Buddy! 🎓✨
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                আমি তোমার ৪ বছরের CSE জার্নিতে সাহায্য করতে এসেছি। সঠিক course code, curriculum, programming, projects — যেকোনো প্রশ্ন করো!
              </p>
              <p className="text-primary/70 text-xs mt-2 font-medium">
                📖 Based on Official HSTU CSE Syllabus (Effective Jan-Jun 2017)
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 w-full">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s.label}
                  onClick={() => send(s.text)}
                  className={`bg-gradient-to-br ${s.color} backdrop-blur-sm border border-border/50 rounded-xl p-3.5 text-left hover:shadow-lg hover:scale-[1.02] transition-all duration-200 group`}
                >
                  <p className="text-sm font-semibold text-foreground mb-1">{s.label}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{s.text}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full chat-gradient flex items-center justify-center shrink-0 mt-1 mr-2">
                <GraduationCap className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
            <div className={`group relative max-w-[85%] ${m.role === 'user' ? '' : ''}`}>
              <div
                className={`rounded-2xl px-4 py-3 text-sm ${
                  m.role === 'user'
                    ? 'bg-chat-user text-primary-foreground rounded-br-md shadow-md'
                    : 'bg-chat-ai text-foreground rounded-tl-md shadow-sm border border-border/30'
                }`}
              >
                {m.role === 'assistant' ? (
                  <div className="prose prose-sm sm:prose-base max-w-none dark:prose-invert 
                    prose-p:my-2 prose-p:leading-relaxed
                    prose-pre:bg-foreground/5 prose-pre:rounded-xl prose-pre:border prose-pre:border-border/50
                    prose-code:text-primary prose-code:font-semibold prose-code:before:content-none prose-code:after:content-none
                    prose-headings:text-foreground prose-headings:font-bold prose-headings:mt-4 prose-headings:mb-2
                    prose-h1:text-xl prose-h2:text-lg prose-h3:text-base
                    prose-ul:my-2 prose-ol:my-2 prose-li:my-0.5
                    prose-strong:text-foreground prose-strong:font-bold
                    prose-table:text-sm prose-th:bg-secondary/50 prose-th:p-2 prose-td:p-2 prose-table:border prose-table:rounded-lg
                    prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:rounded-r-lg prose-blockquote:py-1 prose-blockquote:px-4
                    prose-a:text-primary prose-a:underline-offset-2
                    prose-img:rounded-xl
                  ">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap leading-relaxed">{m.content}</p>
                )}
              </div>
              {m.role === 'assistant' && (
                <div className="flex items-center gap-1 mt-1 ml-1">
                  <CopyButton text={m.content} />
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && messages[messages.length - 1]?.role === 'user' && <TypingIndicator />}
      </div>

      {/* Input */}
      <div className="border-t bg-card/80 backdrop-blur-sm p-3">
        <form
          onSubmit={(e) => { e.preventDefault(); send(input); }}
          className="flex items-end gap-2 max-w-3xl mx-auto"
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); } }}
            placeholder="তোমার প্রশ্ন লেখো... 💬"
            rows={1}
            className="flex-1 resize-none rounded-2xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isLoading}
            className="rounded-2xl h-11 w-11 shrink-0 shadow-md"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
        <p className="text-center text-[10px] text-muted-foreground/50 mt-2">
          HSTU CSE Buddy • Powered by AI • Curriculum Data: Official HSTU Syllabus 2017
        </p>
      </div>
    </div>
  );
}
