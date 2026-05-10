// Calls the Lovable AI edge function (server-side key, no browser secrets).
// Streams tokens, accumulates them, returns the full text — keeps the existing
// typing animation in ChatPage working without changes.

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/hstu-chat`;
const AUTH = `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`;

type HistoryMsg = { role: string; content: string };

export async function callGemini(
  history: HistoryMsg[],
  userMessage: string,
  imageBase64?: string,
  imageMimeType?: string
): Promise<string> {
  // Build OpenAI-compatible messages. Drop the latest user message from history
  // (ChatPage already appended it before calling), then add the new turn —
  // multimodal if an image is attached.
  const trimmed = history.slice(-12);
  while (trimmed.length && trimmed[trimmed.length - 1].role === 'user') trimmed.pop();

  const userText = userMessage || (imageBase64 ? 'এই ছবিটি দেখে বিস্তারিত বুঝিয়ে বলো।' : '');

  const userMsg: any = imageBase64 && imageMimeType
    ? {
        role: 'user',
        content: [
          { type: 'text', text: userText },
          { type: 'image_url', image_url: { url: `data:${imageMimeType};base64,${imageBase64}` } },
        ],
      }
    : { role: 'user', content: userText };

  const messages = [
    ...trimmed.map((m) => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: m.content,
    })),
    userMsg,
  ];

  let resp: Response;
  try {
    resp = await fetch(CHAT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: AUTH },
      body: JSON.stringify({ messages }),
    });
  } catch {
    throw new Error('API_ERROR');
  }

  if (!resp.ok) {
    let serverMsg = '';
    try {
      const data = await resp.json();
      serverMsg = data?.error || data?.detail || '';
    } catch {}
    if (resp.status === 429) throw new Error(serverMsg || 'একটু পরে আবার চেষ্টা করুন (rate limit)।');
    if (resp.status === 402) throw new Error(serverMsg || 'AI credits শেষ। Workspace → Usage থেকে credit যোগ করুন।');
    if (resp.status === 400) throw new Error(serverMsg || 'Bad request — input ঠিক নয়।');
    throw new Error(serverMsg || `AI service error (${resp.status})`);
  }
  if (!resp.body) throw new Error('সার্ভার থেকে কোনো response পাওয়া যায়নি।');

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let full = '';
  let done = false;

  while (!done) {
    const { done: rDone, value } = await reader.read();
    if (rDone) break;
    buffer += decoder.decode(value, { stream: true });

    let idx: number;
    while ((idx = buffer.indexOf('\n')) !== -1) {
      let line = buffer.slice(0, idx);
      buffer = buffer.slice(idx + 1);
      if (line.endsWith('\r')) line = line.slice(0, -1);
      if (!line || line.startsWith(':')) continue;
      if (!line.startsWith('data: ')) continue;
      const json = line.slice(6).trim();
      if (json === '[DONE]') { done = true; break; }
      try {
        const parsed = JSON.parse(json);
        const delta = parsed.choices?.[0]?.delta?.content;
        if (delta) full += delta;
      } catch {
        buffer = line + '\n' + buffer;
        break;
      }
    }
  }

  if (!full.trim()) throw new Error('NO_RESPONSE');
  return full;
}
