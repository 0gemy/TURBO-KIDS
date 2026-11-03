// Vercel serverless function: one-time redeem codes.
// Codes live in the GAME_CODES env variable (JSON), used codes are stored in Upstash Redis.
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ ok: false, msg: 'طلب غير مسموح' });
  const raw = (req.body && req.body.code) || '';
  const code = String(raw).trim().toUpperCase().replace(/\s+/g, '');
  if (!code || code.length > 40) return res.status(400).json({ ok: false, msg: 'اكتب الكود' });
  let codes;
  try { codes = JSON.parse(process.env.GAME_CODES || '{}'); }
  catch (e) { return res.status(500).json({ ok: false, msg: 'إعداد الأكواد غير صحيح' }); }
  const map = {};
  for (const k in codes) map[String(k).trim().toUpperCase()] = Number(codes[k]);
  const amount = map[code];
  if (!amount || amount <= 0) return res.status(404).json({ ok: false, msg: 'كود غير صحيح' });
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const tok = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !tok) return res.status(500).json({ ok: false, msg: 'قاعدة البيانات غير مربوطة' });
  try {
    const r = await fetch(url, { method: 'POST', headers: { Authorization: 'Bearer ' + tok }, body: JSON.stringify(['SET', 'code:' + code, '1', 'NX']) });
    const j = await r.json();
    if (j.result !== 'OK') return res.status(409).json({ ok: false, msg: 'الكود ده اتستخدم قبل كده' });
    return res.status(200).json({ ok: true, amount });
  } catch (e) { return res.status(500).json({ ok: false, msg: 'تعذر الاتصال بقاعدة البيانات' }); }
};
