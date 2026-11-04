// Client error log (kept short in Redis, latest 200). View in Upstash Data Browser: key "errlog".
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).end();
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL, tok = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !tok) return res.status(204).end();
  let b = req.body; if (typeof b === 'string') { try { b = JSON.parse(b); } catch (e) { b = {}; } } b = b || {};
  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'x';
  const R = async (...c) => (await (await fetch(url, { method: 'POST', headers: { Authorization: 'Bearer ' + tok }, body: JSON.stringify(c) })).json()).result;
  try {
    const n = await R('INCR', 'rl:log:' + ip); if (n === 1) await R('EXPIRE', 'rl:log:' + ip, 600); if (n > 20) return res.status(204).end();
    await R('LPUSH', 'errlog', JSON.stringify({ t: Date.now(), m: String(b.m || '').slice(0, 300), ua: String(b.ua || '').slice(0, 120) })); await R('LTRIM', 'errlog', 0, 199);
  } catch (e) {}
  return res.status(204).end();
};
