// Saves a child's progress under a random save code (GEMY-XXXX-XXXX) in Upstash Redis.
const RE = /^GEMY-[A-Z2-9]{4}-[A-Z2-9]{4}$/;
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ ok: false, msg: 'طلب غير مسموح' });
  const b = req.body || {};
  const code = String(b.code || '').trim().toUpperCase();
  if (!RE.test(code)) return res.status(400).json({ ok: false, msg: 'كود غير صالح' });
  const d = b.data;
  if (!d || typeof d !== 'object' || Array.isArray(d)) return res.status(400).json({ ok: false, msg: 'بيانات غير صالحة' });
  const val = JSON.stringify({ t: Date.now(), d });
  if (val.length > 40000) return res.status(413).json({ ok: false, msg: 'البيانات كبيرة جدًا' });
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const tok = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !tok) return res.status(500).json({ ok: false, msg: 'قاعدة البيانات غير مربوطة' });
  try {
    const r = await fetch(url, { method: 'POST', headers: { Authorization: 'Bearer ' + tok }, body: JSON.stringify(['SET', 'save:' + code, val]) });
    const j = await r.json();
    if (j.result !== 'OK') return res.status(500).json({ ok: false, msg: 'تعذر الحفظ' });
    return res.status(200).json({ ok: true });
  } catch (e) { return res.status(500).json({ ok: false, msg: 'تعذر الاتصال بقاعدة البيانات' }); }
};
