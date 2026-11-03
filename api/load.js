// Loads progress saved by api/save.js.
const RE = /^GEMY-[A-Z2-9]{4}-[A-Z2-9]{4}$/;
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  const code = String((req.query && req.query.code) || (req.body && req.body.code) || '').trim().toUpperCase();
  if (!RE.test(code)) return res.status(400).json({ ok: false, msg: 'كود غير صالح' });
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const tok = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !tok) return res.status(500).json({ ok: false, msg: 'قاعدة البيانات غير مربوطة' });
  try {
    const r = await fetch(url, { method: 'POST', headers: { Authorization: 'Bearer ' + tok }, body: JSON.stringify(['GET', 'save:' + code]) });
    const j = await r.json();
    if (!j.result) return res.status(404).json({ ok: false, msg: 'لا يوجد تقدم محفوظ بهذا الكود' });
    const o = JSON.parse(j.result);
    return res.status(200).json({ ok: true, data: o.d, t: o.t });
  } catch (e) { return res.status(500).json({ ok: false, msg: 'تعذر الاتصال بقاعدة البيانات' }); }
};
