import { getSystemPrompt } from '@/constants/systemPrompt';
import { Message } from '@/types/chat';

interface ClaudeMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function sendToClaudeAPI(
  messages: Message[],
  userMessage: string,
  language: string = 'auto',
  responseLength: string = 'detailed'
): Promise<string> {
  const apiKey = localStorage.getItem('hstu_api_key');
  if (!apiKey) throw new Error('No API key found. Please set your API key in Settings.');

  const history: ClaudeMessage[] = messages.slice(-10).map(m => ({
    role: m.role,
    content: m.content,
  }));

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: getSystemPrompt(language, responseLength),
      messages: [...history, { role: 'user', content: userMessage }],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    if (response.status === 401) throw new Error('Invalid API key. Please check Settings.');
    if (response.status === 429) throw new Error('Rate limit reached. Please wait a moment.');
    throw new Error((err as Record<string, Record<string, string>>)?.error?.message || `API error (${response.status})`);
  }

  const data = await response.json();
  return data.content[0].text;
}

export async function testConnection(): Promise<boolean> {
  const apiKey = localStorage.getItem('hstu_api_key');
  if (!apiKey) return false;
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 10,
        messages: [{ role: 'user', content: 'Hi' }],
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
