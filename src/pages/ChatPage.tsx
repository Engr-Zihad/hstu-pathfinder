import { useState, useRef, useEffect } from 'react';
import { Send, GraduationCap, BookOpen, Code, Lightbulb, MoreVertical, Trash2, Info, Moon, Sun } from 'lucide-react';
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
  { icon: BookOpen, text: "Level 1 Semester I এ কি কি কোর্স আছে?", label: "Curriculum" },
  { icon: Code, text: "C programming এ pointer কিভাবে কাজ করে explain করো", label: "Programming" },
  { icon: Lightbulb, text: "Project II এর জন্য ভালো কিছু topic suggest করো", label: "Projects" },
  { icon: GraduationCap, text: "Data Structures course এর জন্য best preparation plan কি?", label: "Study Plan" },
];

const TypingIndicator = () => (
  <div className="flex items-center gap-1 px-4 py-3">
    <div className="w-2 h-2 rounded-full bg-primary/60 typing-dot" />
    <div className="w-2 h-2 rounded-full bg-primary/60 typing-dot" />
    <div className="w-2 h-2 rounded-full bg-primary/60 typing-dot" />
  </div>
);

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
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

  const showWelcome = messages.length === 0;

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="chat-gradient px-4 py-3 flex items-center gap-3 shadow-lg">
        <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
          <GraduationCap className="w-6 h-6 text-primary-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-primary-foreground font-bold text-lg leading-tight">HSTU CSE Buddy</h1>
          <p className="text-primary-foreground/70 text-xs">Your 4-Year Academic AI Assistant</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-primary-foreground/10 transition-colors">
              <MoreVertical className="w-5 h-5 text-primary-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 rounded-xl">
            <DropdownMenuItem onClick={() => setDarkMode(d => !d)} className="gap-2 cursor-pointer">
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => { setMessages([]); toast({ title: 'Chat cleared' }); }}
              className="gap-2 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              Clear Chat
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setAboutOpen(true)} className="gap-2 cursor-pointer">
              <Info className="w-4 h-4" />
              About
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <AboutDialog open={aboutOpen} onOpenChange={setAboutOpen} />

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {showWelcome && (
          <div className="flex flex-col items-center justify-center h-full gap-6 max-w-lg mx-auto text-center">
            <div className="w-20 h-20 rounded-2xl chat-gradient flex items-center justify-center shadow-xl">
              <GraduationCap className="w-10 h-10 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Welcome to HSTU CSE Buddy! 🎓</h2>
              <p className="text-muted-foreground text-sm">
                আমি তোমার ৪ বছরের CSE জার্নিতে সাহায্য করতে এসেছি। Curriculum, programming, projects — যেকোনো প্রশ্ন করো!
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 w-full">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s.label}
                  onClick={() => send(s.text)}
                  className="glass-card rounded-xl p-3 text-left hover:shadow-md transition-all group"
                >
                  <s.icon className="w-5 h-5 text-primary mb-1.5 group-hover:scale-110 transition-transform" />
                  <p className="text-xs font-medium text-foreground">{s.label}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{s.text}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                m.role === 'user'
                  ? 'bg-chat-user text-primary-foreground rounded-br-md'
                  : 'bg-chat-ai text-foreground rounded-bl-md'
              }`}
            >
              {m.role === 'assistant' ? (
                <div className="prose prose-sm max-w-none dark:prose-invert prose-p:my-1 prose-pre:bg-foreground/5 prose-pre:rounded-lg prose-code:text-primary prose-headings:text-foreground">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                </div>
              ) : (
                <p className="whitespace-pre-wrap">{m.content}</p>
              )}
            </div>
          </div>
        ))}

        {isLoading && messages[messages.length - 1]?.role === 'user' && <TypingIndicator />}
      </div>

      {/* Input */}
      <div className="border-t bg-card p-3">
        <form
          onSubmit={(e) => { e.preventDefault(); send(input); }}
          className="flex items-end gap-2 max-w-3xl mx-auto"
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); } }}
            placeholder="তোমার প্রশ্ন লেখো..."
            rows={1}
            className="flex-1 resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isLoading}
            className="rounded-xl h-11 w-11 shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
