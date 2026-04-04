import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { Send, Copy, ThumbsUp, ThumbsDown, ArrowDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Message, Chat } from '@/types/chat';
import { sendToClaudeAPI } from '@/utils/claudeApi';
import { parseMarkdown } from '@/utils/markdownParser';
import { typeText } from '@/utils/typeAnimation';
import AIAvatar from '@/components/ui/AIAvatar';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const MAX_VISIBLE = 30;
const quickChips = [
  '📖 Curriculum Guide', '🧮 CGPA Calculator', '🗺️ Career Roadmap', '💻 Coding Help',
  '🎓 Study Abroad', '🏆 Competitive Programming', '🎨 UI/UX Design', '👨‍🏫 Teachers Info',
];

export default function ChatPage() {
  const navigate = useNavigate();
  const [chats, setChats] = useLocalStorage<Chat[]>('hstu_chats', []);
  const [activeChatId, setActiveChatId] = useLocalStorage<string>('hstu_active_chat', '');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const cancelTypingRef = useRef<(() => void) | null>(null);

  const activeChat = useMemo(() => chats.find(c => c.id === activeChatId), [chats, activeChatId]);
  const visibleMessages = useMemo(() => {
    if (!activeChat) return [];
    const msgs = activeChat.messages;
    return msgs.length > MAX_VISIBLE ? msgs.slice(msgs.length - MAX_VISIBLE) : msgs;
  }, [activeChat]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => { scrollToBottom(); }, [visibleMessages.length, scrollToBottom]);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    setShowScrollBtn(scrollHeight - scrollTop - clientHeight > 200);
  }, []);

  const createNewChat = useCallback(() => {
    const newChat: Chat = {
      id: Date.now().toString(), title: 'New Chat', messages: [],
      createdAt: Date.now(), updatedAt: Date.now(),
    };
    setChats(prev => [newChat, ...prev].slice(0, 50));
    setActiveChatId(newChat.id);
    return newChat.id;
  }, [setChats, setActiveChatId]);

  useEffect(() => {
    if (!activeChatId || !chats.find(c => c.id === activeChatId)) {
      if (chats.length > 0) setActiveChatId(chats[0].id);
      else createNewChat();
    }
  }, [activeChatId, chats, setActiveChatId, createNewChat]);

  const handleSend = useCallback(async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;
    const apiKey = localStorage.getItem('hstu_api_key');
    if (!apiKey) { toast.error('Set your API key in Settings first.'); navigate('/settings'); return; }

    let chatId = activeChatId;
    if (!chatId || !chats.find(c => c.id === chatId)) chatId = createNewChat();
    setInput('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: msg, displayContent: msg, timestamp: Date.now() };
    setChats(prev => prev.map(c => c.id === chatId ? {
      ...c, messages: [...c.messages, userMsg],
      title: c.messages.length === 0 ? msg.slice(0, 40) : c.title, updatedAt: Date.now(),
    } : c));

    setLoading(true);
    try {
      const currentMsgs = chats.find(c => c.id === chatId)?.messages || [];
      const response = await sendToClaudeAPI(currentMsgs, msg,
        localStorage.getItem('hstu_language') || 'auto',
        localStorage.getItem('hstu_response_length') || 'detailed');

      const aiId = (Date.now() + 1).toString();
      const aiMsg: Message = { id: aiId, role: 'assistant', content: response, displayContent: '', timestamp: Date.now(), isTyping: true };
      setChats(prev => prev.map(c => c.id === chatId ? { ...c, messages: [...c.messages, aiMsg], updatedAt: Date.now() } : c));

      cancelTypingRef.current = typeText(response, (partial) => {
        setChats(prev => prev.map(c => c.id === chatId ? {
          ...c, messages: c.messages.map(m => m.id === aiId ? { ...m, displayContent: partial } : m),
        } : c));
      }, () => {
        setChats(prev => prev.map(c => c.id === chatId ? {
          ...c, messages: c.messages.map(m => m.id === aiId ? { ...m, displayContent: response, isTyping: false } : m),
        } : c));
      });
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : 'Unknown error';
      toast.error(errMsg);
      const errorAiMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: `❌ ${errMsg}`, displayContent: `❌ ${errMsg}`, timestamp: Date.now() };
      setChats(prev => prev.map(c => c.id === chatId ? { ...c, messages: [...c.messages, errorAiMsg] } : c));
    } finally { setLoading(false); }
  }, [input, loading, activeChatId, chats, setChats, createNewChat, navigate]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  }, [handleSend]);

  const handleTextareaChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 150) + 'px';
  }, []);

  const copyMessage = useCallback((content: string) => { navigator.clipboard.writeText(content); toast.success('Copied!'); }, []);
  const setFeedback = useCallback((msgId: string, fb: 'up' | 'down') => {
    setChats(prev => prev.map(c => c.id === activeChatId ? { ...c, messages: c.messages.map(m => m.id === msgId ? { ...m, feedback: fb } : m) } : c));
  }, [activeChatId, setChats]);

  const deleteChat = useCallback((chatId: string) => {
    setChats(prev => prev.filter(c => c.id !== chatId));
    if (activeChatId === chatId) { const r = chats.filter(c => c.id !== chatId); r.length > 0 ? setActiveChatId(r[0].id) : createNewChat(); }
  }, [chats, activeChatId, setChats, setActiveChatId, createNewChat]);

  const formatTime = (ts: number) => new Date(ts).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  const formatRelative = (ts: number) => { const d = Date.now() - ts; if (d < 60000) return 'now'; if (d < 3600000) return `${Math.floor(d/60000)}m`; if (d < 86400000) return `${Math.floor(d/3600000)}h`; return `${Math.floor(d/86400000)}d`; };

  return (
    <div className="flex flex-1 h-[calc(100vh-3.5rem)] md:h-screen overflow-hidden">
      <div className="hidden lg:flex flex-col w-[260px] border-r border-[--border]" style={{ background: 'rgba(13,17,23,0.5)' }}>
        <div className="p-3">
          <button onClick={createNewChat} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-white" style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)' }}>＋ New Chat</button>
        </div>
        <div className="flex-1 overflow-y-auto px-2 space-y-0.5">
          {chats.map(chat => (
            <div key={chat.id} onClick={() => setActiveChatId(chat.id)}
              className={`group flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer text-sm transition-all ${chat.id === activeChatId ? 'bg-blue-500/10 text-blue-400' : 'text-[--text-2] hover:bg-white/5'}`}>
              <span className="flex-1 truncate">{chat.title}</span>
              <span className="text-[10px] text-[--text-3] shrink-0">{formatRelative(chat.updatedAt)}</span>
              <button onClick={(e) => { e.stopPropagation(); deleteChat(chat.id); }} className="opacity-0 group-hover:opacity-100 text-red-400 text-xs shrink-0">✕</button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0 relative">
        <div ref={containerRef} onScroll={handleScroll} className="flex-1 overflow-y-auto px-4 py-4">
          {!activeChat || activeChat.messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
              <AIAvatar size={56} />
              <h2 className="font-heading font-bold text-2xl mt-4" style={{ color: 'var(--text-1)' }}>আমি Ovik 👋</h2>
              <p className="text-sm mt-1" style={{ color: 'var(--text-2)' }}>HSTU CSE-এর তোমার AI সাথী 🎓</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-8 max-w-xl">
                {quickChips.map(chip => (
                  <button key={chip} onClick={() => handleSend(chip)} className="glass-card px-3 py-2.5 rounded-xl text-xs hover:bg-white/[0.07] transition-all text-left" style={{ color: 'var(--text-2)' }}>{chip}</button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-4">
              {visibleMessages.map(msg => (
                <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                  {msg.role === 'assistant' && <AIAvatar size={36} spinning={msg.isTyping} />}
                  <div className={msg.role === 'user' ? 'max-w-[72%]' : 'max-w-[88%]'}>
                    {msg.role === 'assistant' && (
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-sm font-semibold" style={{ color: 'var(--text-1)' }}>Ovik</span>
                        <span className="text-[10px]" style={{ color: 'var(--text-3)' }}>{formatTime(msg.timestamp)}</span>
                      </div>
                    )}
                    <div className={`px-4 py-3 rounded-2xl ${msg.role === 'user' ? 'rounded-br-sm text-white' : 'glass-card rounded-bl-sm'}`}
                      style={msg.role === 'user' ? { background: 'linear-gradient(135deg, #2563eb, #1d4ed8)' } : undefined}>
                      {msg.role === 'assistant' ? (
                        <div className="markdown-body text-sm leading-relaxed" style={{ color: 'var(--text-1)' }}
                          dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.displayContent || msg.content) + (msg.isTyping ? '<span class="typing-cursor">▌</span>' : '') }} />
                      ) : <p className="text-sm whitespace-pre-wrap">{msg.content}</p>}
                    </div>
                    {msg.role === 'user' && <p className="text-[10px] text-right mt-1" style={{ color: 'var(--text-3)' }}>{formatTime(msg.timestamp)}</p>}
                    {msg.role === 'assistant' && !msg.isTyping && (
                      <div className="flex items-center gap-1 mt-1.5">
                        <button onClick={() => copyMessage(msg.content)} className="p-1.5 rounded-lg hover:bg-white/10" style={{ color: 'var(--text-3)' }} title="Copy"><Copy className="w-3.5 h-3.5" /></button>
                        <button onClick={() => setFeedback(msg.id, 'up')} className={`p-1.5 rounded-lg hover:bg-white/10 ${msg.feedback === 'up' ? 'text-green-400' : ''}`} style={msg.feedback !== 'up' ? { color: 'var(--text-3)' } : undefined}><ThumbsUp className="w-3.5 h-3.5" /></button>
                        <button onClick={() => setFeedback(msg.id, 'down')} className={`p-1.5 rounded-lg hover:bg-white/10 ${msg.feedback === 'down' ? 'text-red-400' : ''}`} style={msg.feedback !== 'down' ? { color: 'var(--text-3)' } : undefined}><ThumbsDown className="w-3.5 h-3.5" /></button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-3">
                  <AIAvatar size={36} spinning />
                  <div className="glass-card rounded-2xl rounded-bl-sm px-4 py-3">
                    <div className="flex gap-1"><span className="w-2 h-2 rounded-full bg-blue-400 typing-dot" /><span className="w-2 h-2 rounded-full bg-blue-400 typing-dot" /><span className="w-2 h-2 rounded-full bg-blue-400 typing-dot" /></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        {showScrollBtn && (
          <button onClick={scrollToBottom} className="absolute bottom-24 right-6 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg z-20"><ArrowDown className="w-5 h-5" /></button>
        )}
        <div className="px-4 pb-4 pt-2">
          <div className="max-w-3xl mx-auto glass-card rounded-2xl flex items-end gap-2 p-3">
            <textarea ref={textareaRef} value={input} onChange={handleTextareaChange} onKeyDown={handleKeyDown}
              placeholder="Ask me anything about HSTU CSE..." rows={1}
              className="flex-1 bg-transparent text-sm resize-none outline-none min-h-[36px] max-h-[150px]" style={{ color: 'var(--text-1)' }} />
            {input.length > 100 && <span className="text-[10px] shrink-0 self-end pb-1" style={{ color: 'var(--text-3)' }}>{input.length}</span>}
            <button onClick={() => handleSend()} disabled={!input.trim() || loading}
              className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-white disabled:opacity-40 transition-opacity"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)' }}><Send className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
