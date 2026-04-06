import { SYSTEM_PROMPT } from '../constants/systemPrompt';

const GEMINI_KEY = import.meta.env.VITE_GEMINI_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`;

export async function callGemini(
  history: { role: string; content: string }[],
  userMessage: string,
  imageBase64?: string,
  imageMimeType?: string
): Promise<string> {
  const userParts: any[] = [{ text: userMessage || 'এই ছবিটি দেখো এবং বিস্তারিত বলো।' }];

  if (imageBase64 && imageMimeType) {
    userParts.push({
      inline_data: { mime_type: imageMimeType, data: imageBase64 },
    });
  }

  const contents = [
    ...history.slice(-12).map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    })),
    { role: 'user', parts: userParts },
  ];

  const response = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents,
      generationConfig: { maxOutputTokens: 4096, temperature: 0.7 },
    }),
  });

  if (!response.ok) {
    if (response.status === 429) throw new Error('RATE_LIMIT');
    if (response.status === 403) throw new Error('KEY_INVALID');
    if (response.status === 400) throw new Error('BAD_REQUEST');
    throw new Error('API_ERROR');
  }

  const data = await response.json();
  if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
    throw new Error('NO_RESPONSE');
  }
  return data.candidates[0].content.parts[0].text;
}
