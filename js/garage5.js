/* TURBO KIDS - garage 5.0 (kid redesign): three tiers of ready-made cars + model add-ons, all inside the garage. */
(function () {
  'use strict';
  if (!window.THREE || typeof CARS === 'undefined') return;
  var T = THREE;
  var TIERS = [
    { id: 'b', n: 'لعبة', e: 'car', g: 'go' },
    { id: 'a', n: 'سباق', e: 'flag', g: 'gc' },
    { id: 'c', n: 'فخمة', e: 'crown', g: 'gp' }
  ];
  var SLOTS = [
    { id: 'head', n: 'أنوار أمامية', e: '🔆' },
    { id: 'tail', n: 'فوانيس خلفية', e: '🔴' },
    { id: 'spoiler', n: 'سبويلر', e: '🏁' },
    { id: 'roof', n: 'سقف', e: '🧰' },
    { id: 'front', n: 'أمامي', e: '🛡️' }
  ];
  var PRE = {}, cat = 'head', PL = null, RG = null, OUT = null, tw = 1, twd = 1, R3 = null, SC = null, CAM = null, MDL = null, raf = 0, pv = 0, spin = 0, vel = 0, drag = false, lx = 0, moved = 0, tier = 'b', view = 'cars';
  var THR = null, TSC = null, TCAM = null, cache = {};


  var SYM = '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>' +
    '<linearGradient id="gp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9edf2"/><stop offset="1" stop-color="#a9b3bf"/></linearGradient>' +
    '<linearGradient id="go" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd27a"/><stop offset="1" stop-color="#f2a01f"/></linearGradient>' +
    '<linearGradient id="gc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9edf2"/><stop offset="1" stop-color="#a9b3bf"/></linearGradient>' +
    '<linearGradient id="gg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9be0ad"/><stop offset="1" stop-color="#3fae60"/></linearGradient>' +
    '<linearGradient id="gv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9edf2"/><stop offset="1" stop-color="#a9b3bf"/></linearGradient>' +
    '<linearGradient id="gw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#d5dbe3"/></linearGradient>' +
    '<symbol id="i-home" viewBox="0 0 24 24"><path d="M3.4 11.4 12 4l8.6 7.4a1 1 0 0 1-.7 1.7H19V19a2 2 0 0 1-2 2h-3.2v-5.2h-3.6V21H7a2 2 0 0 1-2-2v-5.9h-.9a1 1 0 0 1-.7-1.7z"/></symbol>' +
    '<symbol id="i-gem" viewBox="0 0 24 24"><path d="M7.2 4h9.6l4.2 5.2L12 20.5 3 9.2z"/><path d="M3 9.2h18M9 9.2 12 4l3 5.2M9 9.2l3 11.3 3-11.3" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="1.1" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-palette" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2.8a9.2 9.2 0 1 0 0 18.4c1.5 0 2.2-1 2.2-2 0-1.2-.9-1.7-.9-2.7 0-1.1.9-1.9 2-1.9h2.1a4.4 4.4 0 0 0 4.4-4.4C21.8 6.6 17.5 2.8 12 2.8zM7.4 11.2a1.5 1.5 0 1 1 0-.01zm3-3.9a1.5 1.5 0 1 1 0-.01zm4.6 0a1.5 1.5 0 1 1 0-.01zm3.2 3.5a1.5 1.5 0 1 1 0-.01z"/></symbol>' +
    '<symbol id="i-puzzle" viewBox="0 0 24 24"><path d="M9.8 4.6a2.2 2.2 0 1 1 4.4 0V6H18a1.2 1.2 0 0 1 1.2 1.2V11h-1.4a2.2 2.2 0 1 0 0 4.4h1.4v3.4A1.2 1.2 0 0 1 18 20h-3.6v-1.4a2.2 2.2 0 1 0-4.4 0V20H6.2A1.2 1.2 0 0 1 5 18.8v-3.6h1.4a2.2 2.2 0 1 0 0-4.4H5V7.2A1.2 1.2 0 0 1 6.2 6h3.6z"/></symbol>' +
    '<symbol id="i-cart" viewBox="0 0 24 24"><path d="M2.8 3.8h2.5l.6 2.2h13.9a1.1 1.1 0 0 1 1.1 1.4l-1.6 6a1.8 1.8 0 0 1-1.7 1.3H8.4l.4 1.6h9.1v2H7.3L4.2 5.8H2.8z"/><circle cx="9.3" cy="20.2" r="1.7"/><circle cx="17" cy="20.2" r="1.7"/></symbol>' +
    '<symbol id="i-car" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M5.2 10.2 6.6 7A2.4 2.4 0 0 1 8.8 5.6h6.4A2.4 2.4 0 0 1 17.4 7l1.4 3.2A2 2 0 0 1 21 12.1V16a1.4 1.4 0 0 1-1.4 1.4h-.7a2.6 2.6 0 0 1-5.2 0h-3.4a2.6 2.6 0 0 1-5.2 0h-.7A1.4 1.4 0 0 1 3 16v-3.9a2 2 0 0 1 2.2-1.9zM8.8 7.6l-1 2.6h8.4l-1-2.6z"/></symbol>' +
    '<symbol id="i-flag" viewBox="0 0 24 24"><path d="M5.4 3h1.9v18H5.4z"/><path d="M8.4 4.4h10.6l-2.2 4.2 2.2 4.2H8.4z"/></symbol>' +
    '<symbol id="i-crown" viewBox="0 0 24 24"><path d="M3.2 8.2l4.5 3.7L12 4.6l4.3 7.3 4.5-3.7-1.7 10.4H4.9z"/><rect x="5" y="19.4" width="14" height="2" rx="1"/></symbol>' +
    '<symbol id="i-lock" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M7 10.2V8a5 5 0 0 1 10 0v2.2h.5A1.5 1.5 0 0 1 19 11.7v7.8a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 19.5v-7.8a1.5 1.5 0 0 1 1.5-1.5zm2.1 0h5.8V8a2.9 2.9 0 0 0-5.8 0z"/></symbol>' +
    '<symbol id="i-check" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2.8a9.2 9.2 0 1 0 0 18.4 9.2 9.2 0 0 0 0-18.4zm-1.3 12.6-3.5-3.5 1.5-1.5 2 2 4.1-4.1 1.5 1.5z"/></symbol>' +
    '<symbol id="i-back" viewBox="0 0 24 24"><path d="M13 5l7 7-7 7-1.9-1.9 3.8-3.8H4v-2.6h10.9l-3.8-3.8z"/></symbol>' +
    '<symbol id="i-lamp" viewBox="0 0 24 24"><path d="M3 12c0-3.9 3.4-7 7.6-7H13v14h-2.4C6.4 19 3 15.9 3 12z"/><rect x="15" y="5" width="2" height="14" rx="1"/><rect x="19" y="6.5" width="2.4" height="2" rx="1"/><rect x="19" y="11" width="2.4" height="2" rx="1"/><rect x="19" y="15.5" width="2.4" height="2" rx="1"/></symbol>' +
    '<symbol id="i-tail" viewBox="0 0 24 24"><path d="M3.5 8.4A2.4 2.4 0 0 1 5.9 6h12.2a2.4 2.4 0 0 1 2.4 2.4v7.2a2.4 2.4 0 0 1-2.4 2.4H5.9a2.4 2.4 0 0 1-2.4-2.4z"/><path d="M7 9.5h10M7 12h10M7 14.5h10" stroke="#fff" stroke-opacity=".55" stroke-width="1.2" stroke-linecap="round"/></symbol>' +
    '<symbol id="i-spoiler" viewBox="0 0 24 24"><path d="M2.6 8.4a1 1 0 0 1 1-1h16.8a1 1 0 0 1 .9 1.4L20 11.2h-3v6.4h-2.2v-6.4H9.2v6.4H7v-6.4H3.8z"/></symbol>' +
    '<symbol id="i-roof" viewBox="0 0 24 24"><path d="M4 7.5h16a1.2 1.2 0 0 1 1.2 1.2v4a1.2 1.2 0 0 1-1.2 1.2H4a1.2 1.2 0 0 1-1.2-1.2v-4A1.2 1.2 0 0 1 4 7.5z"/><rect x="5.5" y="15.8" width="13" height="2.2" rx="1.1"/></symbol>' +
    '<symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 2.8l7.8 2.8v6c0 4.6-3.2 8.2-7.8 9.6-4.6-1.4-7.8-5-7.8-9.6v-6z"/></symbol>' +
    '<symbol id="i-spark" viewBox="0 0 24 24"><path d="M11 2.5l2.2 6.1 6.1 2.2-6.1 2.2L11 19.1l-2.2-6.1-6.1-2.2 6.1-2.2z"/><path d="M19 15l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z"/></symbol>' +
    '<symbol id="i-drop" viewBox="0 0 24 24"><path d="M12 3s6.2 6.1 6.2 10.6a6.2 6.2 0 0 1-12.4 0C5.8 9.1 12 3 12 3z"/></symbol>' +
    '<symbol id="i-bolt" viewBox="0 0 24 24"><path d="M13.5 2 5 13.6h5.6L9.4 22l9.2-12.2h-5.7z"/></symbol>' +
    '<symbol id="i-pearl" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.2"/><ellipse cx="8.8" cy="8.6" rx="2.6" ry="1.7" fill="#fff" fill-opacity=".75" transform="rotate(-35 8.8 8.6)"/></symbol>' +
    '<symbol id="i-eye" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 5c-5 0-8.7 4.1-10 7 1.3 2.9 5 7 10 7s8.7-4.1 10-7c-1.3-2.9-5-7-10-7zm0 11.4a4.4 4.4 0 1 1 0-8.8 4.4 4.4 0 0 1 0 8.8zm0-2.3a2.1 2.1 0 1 0 0-4.2 2.1 2.1 0 0 0 0 4.2z"/></symbol>' +
    '<symbol id="i-bulb" viewBox="0 0 24 24"><path d="M12 2.2a6.6 6.6 0 0 0-3.9 11.9c.5.4.8 1 .8 1.6V17h6.2v-1.3c0-.6.3-1.2.8-1.6A6.6 6.6 0 0 0 12 2.2z"/><rect x="9.2" y="18.4" width="5.6" height="3" rx="1.5"/></symbol>' +
    '</defs></svg>';
  var FIC = { g: 'spark', m: 'drop', x: 'bolt', p: 'pearl', n: 'bulb' };
  var SLIC = { head: ['lamp', 'go'], tail: ['tail', 'gp'], spoiler: ['spoiler', 'gc'], roof: ['roof', 'gv'], front: ['shield', 'gg'] };
  function ic(n, g) { return '<svg class="ic"><use href="#i-' + n + '" fill="' + (g ? 'url(#' + g + ')' : 'currentColor') + '"/></svg>'; }
  function fixModal() {
    setTimeout(function () {
      document.querySelectorAll('.cf-q,.cf-bal span,.cf-bal b,.cf-pv,[data-ok],[data-earn],.btn[disabled]').forEach(function (e) {
        if (/[💎✅🏁]/.test(e.innerHTML)) e.innerHTML = e.innerHTML.replace(/💎/g, ic('gem', 'gc')).replace(/✅/g, ic('check', 'gg')).replace(/🏁/g, ic('flag', 'gw'));
      });
    }, 30);
  }
  function money(n) { return ic('gem', 'gc') + ' ' + n; }
  function tierOf(i) { return (CARS[i] && CARS[i].tier) || 'b'; }
  function owned(i) { return (S.cars || []).indexOf(i) >= 0; }

  function scene() {
    var s = new T.Scene();
    s.add(new T.HemisphereLight(0xffffff, 0x9ec5e8, .95));
    var a = new T.DirectionalLight(0xffffff, 1.30); a.position.set(4, 8, -7); s.add(a);
    var b = new T.DirectionalLight(0x9bd8ff, .50); b.position.set(-7, 3.5, 5); s.add(b);
    var c = new T.DirectionalLight(0xffd9a0, .38); c.position.set(0, 2, 9); s.add(c);
    return s;
  }
  function fitCam(cam, model, asp, dir) {
    var b = new T.Box3();
    model.children.forEach(function (c) { if (!c.userData.ex) b.expandByObject(c); });
    var sz = b.getSize(new T.Vector3()), ctr = b.getCenter(new T.Vector3());
    var dist = (sz.length() / 2) / Math.sin(cam.fov * Math.PI / 360) / Math.min(1, asp) * (cam === CAM ? .80 : 1.16);
    cam.aspect = asp; cam.updateProjectionMatrix();
    cam.position.copy(ctr).add(dir.clone().normalize().multiplyScalar(dist));
    cam.lookAt(ctr.x, ctr.y + .05, ctr.z);
  }
  function dispose(o) {
    o.traverse(function (x) { if (x.isMesh) { x.geometry.dispose(); } });
  }

  function sweep() {
    if (!SC) return;
    SC.children.slice().forEach(function (c) { if (c.userData && c.userData.isCar && c !== MDL && c !== OUT) { SC.remove(c); dispose(c); } });
  }
  function buildModel(i, dir) {
    var m = buildCarGroup(i, S.color);
    var real = S.addon; S.addon = Object.assign({}, real || {}, PRE);
    try { addExtras(m); } catch (e) {}
    S.addon = real;
    if (OUT) { SC.remove(OUT); dispose(OUT); OUT = null; }
    if (MDL && dir) { OUT = MDL; } else if (MDL) { SC.remove(MDL); dispose(MDL); }
    m.userData.isCar = 1; MDL = m; SC.add(MDL); sweep();
    if (dir) { tw = 0; twd = dir; MDL.position.x = 6 * dir; } else { tw = 1; }
    if (R3) { var cv = document.getElementById('g4cv'); if (cv && cv.clientWidth) fitCam(CAM, MDL, cv.clientWidth / cv.clientHeight, new T.Vector3(-.62, .30, -1)); }
  }
  window.__carLoaded = function (i) { if (i === pv) buildModel(pv); try { fill(); } catch (e) {} };
  function ease(t) { return 1 - Math.pow(1 - t, 3); }
  function resize() {
    var cv = document.getElementById('g4cv'); if (!cv) return;
    var w = cv.clientWidth, h = cv.clientHeight;
    if (!w || !h) return;
    if (R3.domElement.width !== Math.floor(w * Math.min(devicePixelRatio || 1, 2)) || R3.__h !== h) {
      R3.__h = h;
      R3.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
      R3.setSize(w, h, false);
      fitCam(CAM, MDL, w / h, new T.Vector3(-.62, .30, -1));
    }
  }
  function loop() {
    raf = requestAnimationFrame(loop);
    if (!document.getElementById('garage').classList.contains('on')) { raf = 0; return; }
    resize();
    if (!drag) { if (Math.abs(vel) > .0009) { spin += vel; vel *= .94; } else { vel = 0; spin += .006; } }
    if (tw < 1) {
      tw = Math.min(1, tw + .055); var e = ease(tw);
      if (MDL) MDL.position.x = 6 * twd * (1 - e);
      if (OUT) { OUT.position.x = -6 * twd * e; OUT.rotation.y += .05; }
      if (tw >= 1) { if (OUT) { SC.remove(OUT); dispose(OUT); OUT = null; } sweep(); }
    }
    if (MDL) { MDL.rotation.y = spin + Math.PI; (MDL.userData.wheels || []).forEach(function (w) { w.rotation.x -= .03; }); }
    R3.render(SC, CAM);
  }

  function cta() {
    var c = CARS[pv] || CARS[0], own = owned(pv), eq = S.car === pv;
    if (eq) return { cls: 'off', txt: ic('check', 'gg') + ' هي عربيتك', act: '' };
    if (own) return { cls: 'go', txt: ic('car', 'gw') + ' استخدمها', act: 'eq' };
    if (S.coins >= c.p) return { cls: 'buy', txt: ic('cart', 'gw') + ' اشتريها ' + ic('gem', 'gw') + ' ' + c.p, act: 'buy' };
    return { cls: 'off', txt: ic('lock', 'gw') + ' محتاج ' + ic('gem', 'gw') + ' ' + (c.p - S.coins) + ' كمان', act: '' };
  }
  function carList() { var out = []; CARS.forEach(function (c, i) { if (tierOf(i) === tier) out.push(i); }); return out; }

  function fill() {
    var c = CARS[pv] || CARS[0], own = owned(pv), eq = S.car === pv, L = carList();
    document.getElementById('g4nm').textContent = c.n;
    document.getElementById('g4cl').textContent = (L.indexOf(pv) + 1) + ' / ' + L.length;
    document.getElementById('g4coins').innerHTML = money(S.coins);
    document.getElementById('g4badge').innerHTML = eq ? '<span class="g4-pill ok">' + ic('check', 'gg') + ' عربيتك</span>' : own ? '<span class="g4-pill ok">' + ic('check', 'gg') + ' بتاعتك</span>' : '<span class="g4-pill gold">' + ic('gem', 'gc') + ' ' + c.p + '</span>';
    var ct = cta(), btn = document.getElementById('g4cta');
    btn.className = 'g4-cta ' + ct.cls; btn.innerHTML = ct.txt; btn.dataset.act = ct.act;
    document.getElementById('g4tiers').innerHTML = TIERS.map(function (t) {
      return '<button class="g4-tier' + (t.id === tier ? ' on' : '') + '" data-t="' + t.id + '">' + ic(t.e, t.g) + '<b>' + t.n + '</b></button>';
    }).join('');
    document.getElementById('g4dots').innerHTML = L.map(function (j) { return '<i class="' + (j === pv ? 'on' : '') + '"></i>'; }).join('');
    var textured = !!c.tex;
    document.getElementById('g4paint').style.display = textured ? 'none' : '';
    document.getElementById('g4colors').innerHTML = GC.map(function (x) {
      return '<button class="g4-dot' + (String(x).toLowerCase() === String(S.color).toLowerCase() ? ' sel' : '') + '" data-c="' + x + '" style="background:' + x + '"></button>';
    }).join('');
    document.getElementById('g4fins').innerHTML = FINS.map(function (f) {
      return '<button class="g4-fin' + ((S.fin || 'g') === f[0] ? ' sel' : '') + '" data-f="' + f[0] + '">' + ic(FIC[f[0]] || 'spark', 'go') + ' ' + f[1].replace(/^\S+\s*/, '') + '</button>';
    }).join('');
    fillAddons();
  }

  function addonById(id) { return (window.TKADDONS || []).filter(function (x) { return x.id === id; })[0]; }
  function fillAddons() {
    var box = document.getElementById('g4addlist'); if (!box) return;
    var own = S.addonsOwned || (S.addonsOwned = []), eq = S.addon || (S.addon = {});
    var s = SLOTS.filter(function (x) { return x.id === cat; })[0] || SLOTS[0];
    var items = (window.TKADDONS || []).filter(function (a) { return a.slot === s.id; });
    var lamp = (s.id === 'head' || s.id === 'tail'), cls = s.id === 'head' ? 'h' : 't';
    var pre = PRE[s.id];
    var tabs = SLOTS.map(function (x) {
      var dot = PRE[x.id] ? '<i class="g4-pvdot"></i>' : '';
      return '<button class="g4-cat' + (x.id === cat ? ' on' : '') + '" data-cat="' + x.id + '">' + ic(SLIC[x.id][0], x.id === cat ? 'go' : 'gw') + '<b>' + x.n + '</b>' + dot + '</button>';
    }).join('');
    var cards = '<button class="g4-adc' + ((!eq[s.id] && pre === undefined) || pre === '' ? ' pv' : '') + (!eq[s.id] ? ' on' : '') + '" data-off="' + s.id + '"><i class="g4-lamp none"></i><b>بدون</b><small>مطفي</small></button>';
    cards += items.map(function (a) {
      var has = own.indexOf(a.id) >= 0, on = eq[s.id] === a.id, pv2 = pre === a.id;
      var art = lamp ? '<i class="g4-lamp ' + cls + '" style="--c:' + (a.c || '#9fc4dc') + ';--g:' + (a.g || '#22d3ee') + '"></i>' : '<i class="g4-lamp part">' + ic(SLIC[s.id][0], SLIC[s.id][1]) + '</i>';
      return '<button class="g4-adc' + (on ? ' on' : '') + (pv2 ? ' pv' : '') + (has ? '' : ' buy') + '" data-add="' + a.id + '">' + art + '<b>' + a.n + '</b><small>' + (pv2 ? ic('eye', 'gw') + ' معاينة' : has ? (on ? 'مركّب' : 'عندك') : money(a.p)) + '</small></button>';
    }).join('');
    var sel = pre ? addonById(pre) : null;
    var bar;
    if (sel && own.indexOf(sel.id) < 0) bar = '<button class="g4-addbuy buy" data-a="buyadd">' + ic('cart', 'gw') + ' اشترِ ' + sel.n + ' ' + ic('gem', 'gw') + ' ' + sel.p + '</button>';
    else bar = '<div class="g4-addhint">' + ic('eye', 'gw') + ' اضغط على أي إضافة تشوفها على العربية</div>';
    box.innerHTML = '<div class="g4-cats">' + tabs + '</div><div class="g4-adrow">' + cards + '</div>' + bar;
    var pp = document.getElementById('g4prev');
    var any = Object.keys(PRE).filter(function (k) { return PRE[k]; });
    if (pp) { pp.innerHTML = any.length ? ic('eye', 'gw') + ' معاينة: ' + any.map(function (k) { return addonById(PRE[k]).n; }).join(' + ') : ''; pp.classList.toggle('on', any.length > 0); }
  }
  function clearPre() { var had = Object.keys(PRE).length; PRE = {}; var pp = document.getElementById('g4prev'); if (pp) { pp.innerHTML = ''; pp.classList.remove('on'); } if (had) buildModel(pv); }

  function pick(i, dir) {
    var old = pv; PRE = {};
    pv = (i + CARS.length) % CARS.length;
    tier = tierOf(pv);
    buildModel(pv, dir || (pv === old ? 0 : (pv > old ? 1 : -1)));
    spin = 3.55; vel = 0; fill();
  }
  function sheet(id) {
    ['g4paintsheet', 'g4addpanel'].forEach(function (x) { var e = document.getElementById(x); if (e) e.classList.toggle('on', x === id); });
    var sc = document.getElementById('g4scrim'); if (sc) sc.classList.toggle('on', id === 'g4paintsheet');
    var g = document.querySelector('.g4'); if (g) g.classList.toggle('addon-open', id === 'g4addpanel');
    if (id !== 'g4addpanel') clearPre(); else fillAddons();
  }
  function warm() {
    var L = carList().concat(CARS.map(function (c, i) { return i; })), k = 0;
    (function step() { if (k >= L.length) return; try { var m = buildCarGroup(L[k++], S.color); dispose(m); } catch (e) {} setTimeout(step, 90); })();
  }

  var TH = { a: [0xffffff, 0xffb703], b: [0x23262c, 0x6b7380], c: [0xfff1f2, 0xff5d8f], d: [0x2b2f36, 0xffc400] };
  window.__rgTheme = function (t) {
    var g = document.querySelector('.g4'); if (g) g.setAttribute('data-th', t);
    var c = TH[t] || TH.a; if (PL) PL.material.color.setHex(c[0]); if (RG) RG.material.color.setHex(c[1]);
  };
  window.__rgAng = function (a) { spin = a; };
  window.__rgEquip = function (o) { S.addonsOwned = (window.TKADDONS || []).map(function (a) { return a.id; }); S.addon = o || {}; buildModel(pv); fill(); };
  window.__rgPickTier = function (t) { var i = 0; for (var k = 0; k < CARS.length; k++) if (tierOf(k) === t) { i = k; break; } pv = i; tier = t; buildModel(pv); fill(); };
  window.__rgSheet = sheet; window.__rgPre = function (id) { var a = addonById(id); PRE[a.slot] = id; cat = a.slot; buildModel(pv); fill(); };
  window.rgar = function () {
    var G = document.getElementById('garage');
    pv = (pv >= 0 && pv < CARS.length) ? pv : (S.car || 0);
    pv = S.car || 0; tier = tierOf(pv);
    if (!document.getElementById('g4cv')) {
      G.innerHTML =
        '<div class="g4" data-th="b">' + SYM +
        '<div class="g4-head"><button class="g4-back" data-a="back" aria-label="رجوع">' + ic("back") + '</button><b>' + ic("home", "go") + ' الكراج</b><span class="g4-coins" id="g4coins"></span></div>' +
        '<div class="g4-tiers" id="g4tiers"></div>' +
        '<div class="g4-stage"><canvas id="g4cv"></canvas>' +
        '<div class="g4-name"><b id="g4nm">—</b><small id="g4cl">—</small></div>' +
        '<button class="g4-nav r" data-n="1" aria-label="السابقة">‹</button>' +
        '<button class="g4-nav l" data-n="-1" aria-label="التالية">›</button>' +
        '<div class="g4-prev" id="g4prev"></div><div class="g4-dots" id="g4dots"></div><div class="g4-badge" id="g4badge"></div></div>' +
        '<div class="g4-bar"><button class="g4-cta" id="g4cta"></button>' +
        '<div class="g4-tools"><button class="g4-tool" id="g4paint" data-a="paint"><span>' + ic('palette', 'gp') + '</span><b>لوّن</b></button>' +
        '<button class="g4-tool" data-a="addons"><span>' + ic('puzzle', 'gc') + '</span><b>إضافات</b></button></div></div>' +
        '<div class="g4-scrim" id="g4scrim" data-a="close"></div>' +
        '<div class="g4-sh" id="g4paintsheet"><div class="g4-addhead"><b>' + ic('palette', 'gp') + ' اختار اللون</b><button class="g4-close" data-a="close">' + ic('check') + ' تمّ</button></div>' +
        '<div class="g4-row" id="g4colors"></div><div class="g4-subt">شكل الطلاء</div><div class="g4-row" id="g4fins"></div></div>' +
        '<div class="g4-sh add" id="g4addpanel"><div class="g4-addhead"><b>' + ic('puzzle', 'gc') + ' إضافات العربية</b><button class="g4-close" data-a="close">' + ic('check') + ' تمّ</button></div>' +
        '<div class="g4-addlist" id="g4addlist"></div></div>' +
        '</div>';
      R3 = null;
    }
    if (!R3 && window.THREE) {
      R3 = new T.WebGLRenderer({ canvas: document.getElementById('g4cv'), alpha: true, antialias: true });
      SC = scene();
      var pl = new T.Mesh(new T.CylinderGeometry(2.6, 2.8, .12, 56), new T.MeshStandardMaterial({ color: 0xffffff, metalness: .1, roughness: .6 }));
      pl.position.y = -.07; SC.add(pl); PL = pl;
      var rg = new T.Mesh(new T.TorusGeometry(2.62, .018, 8, 96), new T.MeshBasicMaterial({ color: 0xffb703 }));
      rg.rotation.x = Math.PI / 2; SC.add(rg); RG = rg;
      var cs = document.createElement('canvas'); cs.width = cs.height = 128; var cx = cs.getContext('2d');
      var gr = cx.createRadialGradient(64, 64, 6, 64, 64, 62); gr.addColorStop(0, 'rgba(0,0,0,.65)'); gr.addColorStop(.6, 'rgba(0,0,0,.28)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
      cx.fillStyle = gr; cx.fillRect(0, 0, 128, 128);
      var sh = new T.Mesh(new T.PlaneGeometry(5.4, 3.2), new T.MeshBasicMaterial({ map: new T.CanvasTexture(cs), transparent: true, depthWrite: false }));
      sh.rotation.x = -Math.PI / 2; sh.position.y = .008; SC.add(sh);
      CAM = new T.PerspectiveCamera(32, 1.5, .1, 100);
    }
    if (SC) { if (MDL) SC.remove(MDL); if (OUT) SC.remove(OUT); }
    MDL = null; OUT = null; tw = 1; sweep(); buildModel(pv); spin = 3.55; sheet(null); window.__rgTheme('b');
    fill();
    var cv = document.getElementById('g4cv'), sx = 0, sy = 0;
    if (cv) {
      cv.style.touchAction = 'none';
      cv.onpointerdown = function (e) { drag = true; lx = e.clientX; vel = 0; try { cv.setPointerCapture(e.pointerId); } catch (x) {} };
      cv.onpointermove = function (e) { if (!drag) return; var d = e.clientX - lx; lx = e.clientX; var dy = d * .011; spin += dy; vel = vel * .5 + dy * .5; };
      cv.onpointerup = function (e) { drag = false; try { cv.releasePointerCapture(e.pointerId); } catch (x) {} };
      cv.onpointercancel = function () { drag = false; };
    }
    if (!raf) raf = requestAnimationFrame(loop);
    setTimeout(warm, 600);
  };

  function buyAddon(a) {
    if (S.coins < a.p) { cel('تحتاج ' + (a.p - S.coins) + ' عملة إضافية', 1500, 0); return; }
    fixModal(); askBuy({ n: a.n, p: a.p, ico: ic('puzzle', 'gc') }, function () {
      S.coins -= a.p; S.addonsOwned.push(a.id); S.addon[a.slot] = a.id; delete PRE[a.slot]; sv();
      try { beep(800, .15); hud(); } catch (err) {}
      buildModel(pv); fill();
    });
  }
  document.addEventListener('click', function (e) {
    var g = document.getElementById('garage');
    if (!g || !g.classList.contains('on')) return;
    var t = e.target.closest('[data-c],[data-f],[data-cat],[data-a],[data-n],[data-act],[data-t],[data-add],[data-off]');
    if (!t) return;
    try { ac(); } catch (err) {}
    
    if (t.dataset.n) { var L = carList(), k = L.indexOf(pv); pick(L[(k + (+t.dataset.n) + L.length) % L.length], +t.dataset.n > 0 ? -1 : 1); return; }
    if (t.dataset.t) { tier = t.dataset.t; var l2 = carList(); if (l2.length) pick(l2[0]); else fill(); return; }
    if (t.dataset.c) { S.color = t.dataset.c; sv(); buildModel(pv); fill(); try { applyCar(); } catch (err) {} return; }
    if (t.dataset.f) { S.fin = t.dataset.f; sv(); buildModel(pv); fill(); try { applyCar(); } catch (err) {} return; }
    if (t.dataset.a === 'back') { go('home'); return; }
    if (t.dataset.a === 'addons') { sheet('g4addpanel'); return; }
    if (t.dataset.a === 'paint') { sheet('g4paintsheet'); return; }
    if (t.dataset.a === 'close') { sheet(null); return; }
    if (t.dataset.cat) { cat = t.dataset.cat; fillAddons(); return; }
    if (t.dataset.off) { S.addon[t.dataset.off] = ''; delete PRE[t.dataset.off]; sv(); buildModel(pv); fill(); return; }
    if (t.dataset.a === 'buyadd') { var pa = addonById(PRE[cat]); if (pa) buyAddon(pa); return; }
    if (t.dataset.add) {
      var a = addonById(t.dataset.add);
      if (!a) return;
      S.addonsOwned = S.addonsOwned || [];
      if (S.addonsOwned.indexOf(a.id) < 0) { PRE[a.slot] = a.id; cat = a.slot; buildModel(pv); fill(); return; }
      delete PRE[a.slot]; S.addon[a.slot] = a.id; sv(); buildModel(pv); fill(); return;
    }
    var act = t.dataset.act;
    if (act === 'eq') { S.car = pv; sv(); try { applyCar(); } catch (err) {} try { beep(660, .12); } catch (err) {} fill(); return; }
    if (act === 'buy') {
      var c = CARS[pv];
      fixModal(); askBuy({ n: c.n, p: c.p, ico: ic('car', 'go') }, function () {
        S.coins -= c.p; S.cars.push(pv); S.car = pv; sv();
        try { applyCar(); beep(800, .15); hud(); } catch (err) {}
        fill();
      });
    }
  });
})();
