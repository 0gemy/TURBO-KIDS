// One endpoint for accounts (username + password) on the Upstash Redis already linked to Vercel. No other backend.
const crypto = require('crypto');
const U = () => process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const T = () => process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
const R = async (...c) => { const r = await fetch(U(), { method: 'POST', headers: { Authorization: 'Bearer ' + T() }, body: JSON.stringify(c) }); const j = await r.json(); if (j.error) throw new Error(j.error); return j.result; };
const sha = s => crypto.createHash('sha256').update(s).digest('hex');
const rnd = n => crypto.randomBytes(n).toString('hex');
const eq = (a, b) => { const x = Buffer.from(a), y = Buffer.from(b); return x.length === y.length && crypto.timingSafeEqual(x, y); };
const pw = (p, salt) => crypto.scryptSync(p, salt, 32).toString('hex');
const NAME = /^[a-z0-9_\u0621-\u064A]{3,20}$/i;
const A = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const rcode = () => Array.from(crypto.randomBytes(10), x => A[x % 32]).join('');
const fail = (res, s, msg, code) => res.status(s).json({ ok: false, msg, code });
async function lim(k, max, ttl) { const n = await R('INCR', k); if (n === 1) await R('EXPIRE', k, ttl); return n <= max; }
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return fail(res, 405, 'طلب غير مسموح');
  if (!U() || !T()) return fail(res, 500, 'قاعدة البيانات غير مربوطة');
  const b = req.body || {}, a = String(b.a || ''), u = String(b.u || '').trim().toLowerCase();
  if (!NAME.test(u)) return fail(res, 400, 'اسم المستخدم 3-20 حرفًا (حروف وأرقام و _ فقط)', 'name');
  const key = 'acc:' + u, ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'x';
  try {
    if (!(await lim('rl:' + ip, 60, 600))) return fail(res, 429, 'محاولات كثيرة، انتظر قليلًا', 'limit');
    if (['register', 'login', 'reset'].includes(a) && !(await lim('rlu:' + a + ':' + u + ':' + ip, 8, 900))) return fail(res, 429, 'محاولات كثيرة، انتظر 15 دقيقة ثم جرّب مرة أخرى', 'limit');
    const p = String(b.p || '');
    if (a === 'register') {
      if (p.length < 4 || p.length > 64) return fail(res, 400, 'كلمة المرور من 4 إلى 64 حرفًا', 'pass');
      const salt = rnd(16), tok = rnd(32), rc = rcode();
      const o = { s: salt, h: pw(p, salt), r: sha(rc), k: [sha(tok)], d: b.d && typeof b.d === 'object' ? b.d : null, t: Date.now() };
      if (JSON.stringify(o).length > 45000) return fail(res, 413, 'البيانات كبيرة جدًا');
      if ((await R('SET', key, JSON.stringify(o), 'NX')) !== 'OK') return fail(res, 409, 'الاسم مستخدم، اختر اسمًا آخر', 'taken');
      return res.status(200).json({ ok: true, tok, rc });
    }
    const raw = await R('GET', key), o = raw ? JSON.parse(raw) : null;
    if (a === 'login') {
      if (!o) return fail(res, 404, 'الاسم غير مسجّل', 'nouser');
      if (!eq(pw(p, o.s), o.h)) return fail(res, 401, 'كلمة المرور غير صحيحة', 'badpass');
      const tok = rnd(32); o.k = [sha(tok)].concat(o.k || []).slice(0, 10); await R('SET', key, JSON.stringify(o));
      return res.status(200).json({ ok: true, tok, d: o.d, t: o.t });
    }
    if (a === 'reset') {
      if (!o) return fail(res, 404, 'الاسم غير مسجّل', 'nouser');
      if (!eq(sha(String(b.rc || '').trim().toUpperCase()), o.r)) return fail(res, 401, 'كود الاسترجاع غير صحيح', 'badrc');
      if (p.length < 4 || p.length > 64) return fail(res, 400, 'كلمة المرور من 4 إلى 64 حرفًا', 'pass');
      const salt = rnd(16), tok = rnd(32), rc = rcode();
      Object.assign(o, { s: salt, h: pw(p, salt), r: sha(rc), k: [sha(tok)] }); await R('SET', key, JSON.stringify(o));
      return res.status(200).json({ ok: true, tok, rc, d: o.d, t: o.t });
    }
    const th = sha(String(b.tok || ''));
    if (!o || !(o.k || []).some(k => eq(k, th))) return fail(res, 401, 'انتهت الجلسة، سجّل الدخول مرة أخرى', 401);
    if (a === 'load') return res.status(200).json({ ok: true, d: o.d, t: o.t });
    if (a === 'save') {
      if (!b.d || typeof b.d !== 'object' || Array.isArray(b.d)) return fail(res, 400, 'بيانات غير صالحة');
      o.d = b.d; o.t = Date.now();
      if (JSON.stringify(o).length > 45000) return fail(res, 413, 'البيانات كبيرة جدًا');
      await R('SET', key, JSON.stringify(o)); return res.status(200).json({ ok: true });
    }
    if (a === 'logout') { o.k = o.k.filter(k => !eq(k, th)); await R('SET', key, JSON.stringify(o)); return res.status(200).json({ ok: true }); }
    if (a === 'del') { await R('DEL', key); return res.status(200).json({ ok: true }); }
    return fail(res, 400, 'طلب غير معروف');
  } catch (e) { return fail(res, 500, 'تعذر الاتصال بقاعدة البيانات'); }
};
