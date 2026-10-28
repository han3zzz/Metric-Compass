// Vercel Edge Function: POST /api/ai/chat
// Key Groq lấy từ Environment Variable GROQ_API_KEY trên Vercel, KHÔNG viết trong code.

export const config = { runtime: 'edge' };

const GROQ_MODEL = 'openai/gpt-oss-120b';
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MAX_MESSAGES = 12;
const MAX_CHARS = 40000;

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export default async function handler(request) {
  if (request.method !== 'POST') {
    return json({ error: { message: 'Use POST' } }, 405);
  }

  const key = process.env.GROQ_API_KEY;
  if (!key) {
    return json({ error: { message: 'GROQ_API_KEY is not set in Vercel Environment Variables' } }, 500);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: { message: 'Invalid JSON' } }, 400);
  }

  const messages = (Array.isArray(body.messages) ? body.messages : [])
    .filter((m) => m && ['system', 'user', 'assistant'].includes(m.role) && typeof m.content === 'string')
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content }));

  if (!messages.length) return json({ error: { message: 'No messages' } }, 400);
  if (messages.reduce((n, m) => n + m.content.length, 0) > MAX_CHARS) {
    return json({ error: { message: 'Message too long' } }, 413);
  }

  const upstream = await fetch(GROQ_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + key },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL || GROQ_MODEL,
      messages,
      stream: true,
      temperature: 0.3,
      max_tokens: 1400,
    }),
  });

  if (!upstream.ok) {
    const t = await upstream.text();
    let msg = t.slice(0, 200);
    try { msg = JSON.parse(t).error.message; } catch {}
    return json({ error: { message: msg } }, upstream.status);
  }

  return new Response(upstream.body, {
    status: 200,
    headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-store' },
  });
}