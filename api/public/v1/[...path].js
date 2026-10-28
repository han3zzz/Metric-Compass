// Vercel Edge Function: proxy /api/public/v1/* -> https://api.metric.xyz/public/v1/*

export const config = { runtime: 'edge' };

const UPSTREAM = 'https://api.metric.xyz';

export default async function handler(request) {
  const url = new URL(request.url);
  const path = url.pathname.replace(/^\/api/, ''); // /api/public/v1/chains -> /public/v1/chains

  const upstream = await fetch(UPSTREAM + path + url.search, {
    method: request.method,
    headers: { 'Content-Type': request.headers.get('Content-Type') || 'application/json' },
    body: request.method === 'POST' ? await request.text() : undefined,
  });

  return new Response(upstream.body, {
    status: upstream.status,
    headers: { 'Content-Type': upstream.headers.get('Content-Type') || 'application/json' },
  });
}
