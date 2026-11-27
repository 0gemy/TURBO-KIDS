/* TURBO KIDS - garage 3.0: three tiers of ready-made cars + model add-ons, all inside the garage. */
(function () {
  'use strict';
  if (!window.THREE || typeof CARS === 'undefined') return;
  var T = THREE;
  var IC = {
    b: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.6 10.6l1.7-3.4A2.4 2.4 0 0 1 8.5 5.9h7a2.4 2.4 0 0 1 2.2 1.3l1.7 3.4H20a1.4 1.4 0 0 1 1.4 1.4v3.6A1.4 1.4 0 0 1 20 17h-1a2.6 2.6 0 0 1-5 0H10a2.6 2.6 0 0 1-5 0H4a1.4 1.4 0 0 1-1.4-1.4V12A1.4 1.4 0 0 1 4 10.6h.6zm2.5 0h9.8l-1.2-2.3H8.3L7.1 10.6z"/></svg>',
    a: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.2 3.2a1.2 1.2 0 0 1 1.2 1.2v.9h9.1a1.2 1.2 0 0 1 1 1.9L15.4 9.7l2.1 2.5a1.2 1.2 0 0 1-1 1.9H7.4V19a1.2 1.2 0 1 1-2.4 0V4.4a1.2 1.2 0 0 1 1.2-1.2zm1.2 3.3v4.9h6.5l-1.2-1.5 1.2-1.5H7.4z"/></svg>',
    c: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.2 7.6a1 1 0 0 1 1.5-.9l3.1 2 3.6-4.3a1 1 0 0 1 1.6 0l3.6 4.3 3.1-2a1 1 0 0 1 1.5.9l-1.5 8.9a1.2 1.2 0 0 1-1.2 1H5.9a1.2 1.2 0 0 1-1.2-1L3.2 7.6z"/></svg>'
  };
  var TIERS = [
    { id: 'b', n: 'توي', d: 'عربيات لعبة صغيرة' },
    { id: 'a', n: 'سبورت', d: 'عربيات سباق' },
    { id: 'c', n: 'بريميوم', d: 'أفخم عربيات' }
  ];
  var SLOTS = [
    { id: 'head', n: 'أنوار أمامية', e: '🔆' },
    { id: 'tail', n: 'فوانيس خلفية', e: '🔴' },
    { id: 'spoiler', n: 'سبويلر', e: '🏁' },
    { id: 'roof', n: 'سقف', e: '🧰' },
    { id: 'front', n: 'أمامي', e: '🛡️' }
  ];
  var R3 = null, SC = null, CAM = null, MDL = null, raf = 0, pv = 0, spin = 0, vel = 0, drag = false, lx = 0, moved = 0, tier = 'b', view = 'cars';
  var THR = null, TSC = null, TCAM = null, cache = {};

  function money(n) { return '💎 ' + n; }
  function tierOf(i) { return (CARS[i] && CARS[i].tier) || 'b'; }
  function owned(i) { return (S.cars || []).indexOf(i) >= 0; }

  function scene() {
    var s = new T.Scene();
    s.add(new T.HemisphereLight(0xffffff, 0x27435f, .70));
    var a = new T.DirectionalLight(0xffffff, 1.30); a.position.set(4, 8, -7); s.add(a);
    var b = new T.DirectionalLight(0x9bd8ff, .50); b.position.set(-7, 3.5, 5); s.add(b);
    var c = new T.DirectionalLight(0xffd9a0, .38); c.position.set(0, 2, 9); s.add(c);
    return s;
  }
  function fitCam(cam, model, asp, dir) {
    var b = new T.Box3();
    model.children.forEach(function (c) { if (!c.userData.ex) b.expandByObject(c); });
    var sz = b.getSize(new T.Vector3()), ctr = b.getCenter(new T.Vector3());
    var dist = (sz.length() / 2) / Math.sin(cam.fov * Math.PI / 360) / Math.min(1, asp) * 1.16;
    cam.aspect = asp; cam.updateProjectionMatrix();
    cam.position.copy(ctr).add(dir.clone().normalize().multiplyScalar(dist));
    cam.lookAt(ctr.x, ctr.y + .05, ctr.z);
  }
  function dispose(o) {
    o.traverse(function (x) { if (x.isMesh) { x.geometry.dispose(); } });
  }
  function buildModel(i) {
    if (MDL) { SC.remove(MDL); dispose(MDL); }
    MDL = buildCarGroup(i, S.color);
    try { addExtras(MDL); } catch (e) {}
    SC.add(MDL);
  }
  window.__carLoaded = function (i) {
    cache = {};
    if (i === pv) { buildModel(pv); }
    try { fill(); } catch (e) {}
  };

  function resize() {
    var cv = document.getElementById('g4cv'); if (!cv) return;
    var w = cv.clientWidth, h = cv.clientHeight;
    if (!w || !h) return;
    if (R3.domElement.width !== Math.floor(w * Math.min(devicePixelRatio || 1, 2))) {
      R3.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
      R3.setSize(w, h, false);
      fitCam(CAM, MDL, w / h, new T.Vector3(-.62, .30, -1));
    }
  }
  function loop(t) {
    raf = requestAnimationFrame(loop);
    if (!document.getElementById('garage').classList.contains('on')) { raf = 0; return; }
    resize();
    if (!drag) { if (Math.abs(vel) > .0009) { spin += vel; vel *= .94; } else { vel = 0; spin += .005; } }
    if (MDL) { MDL.rotation.y = spin; (MDL.userData.wheels || []).forEach(function (w) { w.rotation.x -= .03; }); }
    R3.render(SC, CAM);
  }

  function thumb(i) {
    var key = i + '|' + S.color;
    if (cache[key]) return cache[key];
    if (!THR) {
      THR = new T.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true });
      THR.setPixelRatio(2); THR.setSize(240, 140, false);
      TSC = scene(); TCAM = new T.PerspectiveCamera(30, 240 / 140, .1, 100);
    }
    var m = buildCarGroup(i, S.color);
    TSC.add(m);
    fitCam(TCAM, m, 240 / 140, new T.Vector3(-.8, .3, -1));
    THR.render(TSC, TCAM);
    cache[key] = THR.domElement.toDataURL('image/png');
    TSC.remove(m); dispose(m);
    return cache[key];
  }

  function cta() {
    var c = CARS[pv] || CARS[0], own = owned(pv), eq = S.car === pv;
    if (eq) return { cls: 'off', txt: '✔ السيارة الحالية', act: '' };
    if (own) return { cls: '', txt: '🚗 جهّز السيارة', act: 'eq' };
    if (S.coins >= c.p) return { cls: 'buy', txt: '🛒 اشترِ بـ ' + money(c.p), act: 'buy' };
    return { cls: 'off', txt: '🔒 تحتاج ' + money(c.p - S.coins), act: '' };
  }

  function carList() {
    var out = [];
    CARS.forEach(function (c, i) { if (tierOf(i) === tier) out.push(i); });
    return out;
  }

  function fill() {
    var c = CARS[pv] || CARS[0], own = owned(pv), eq = S.car === pv;
    document.getElementById('g4nm').textContent = c.n;
    document.getElementById('g4cl').textContent = c.cls || '';
    document.getElementById('g4coins').textContent = money(S.coins);
    document.getElementById('g4badge').innerHTML = eq ? '<span class="g4-pill ok">✔ مجهّزة</span>'
      : own ? '<span class="g4-pill ok">✅ مملوكة</span>' : '<span class="g4-pill gold">💎 ' + c.p + '</span>';
    var ct = cta(), btn = document.getElementById('g4cta');
    btn.className = 'g4-cta ' + ct.cls; btn.textContent = ct.txt; btn.dataset.act = ct.act;
    document.getElementById('g4tiers').innerHTML = TIERS.map(function (t) {
      var n = CARS.filter(function (c, i) { return tierOf(i) === t.id; }).length;
      return '<button class="g4-tier' + (t.id === tier ? ' on' : '') + '" data-t="' + t.id + '"><span class="g4-ic">' + (IC[t.id] || '') + '</span><b>' + t.n + '</b><small>' + n + ' عربية</small></button>';
    }).join('');
    document.getElementById('g4rail').innerHTML = carList().map(function (j) {
      var x = CARS[j], o = owned(j);
      return '<button class="g4-card' + (j === pv ? ' on' : '') + (o ? '' : ' lock') + '" data-i="' + j + '">' +
        (o ? '' : '<span class="lk">🔒</span>') +
        '<img alt="" src="' + thumb(j) + '"><b>' + x.n + '</b><small>' + (o ? (S.car === j ? '✔ مجهّزة' : 'مملوكة') : '💎 ' + x.p) + '</small></button>';
    }).join('');
    var textured = !!c.tex;
    document.getElementById('g4colors').style.display = textured ? 'none' : 'flex';
    document.getElementById('g4colors').innerHTML = textured ? '' : GC.map(function (x) {
      return '<button class="g4-dot' + (String(x).toLowerCase() === String(S.color).toLowerCase() ? ' sel' : '') + '" data-c="' + x + '" style="background:' + x + '"></button>';
    }).join('');
    document.getElementById('g4fins').style.display = textured ? 'none' : 'flex';
    document.getElementById('g4fins').innerHTML = textured ? '' : FINS.map(function (f) {
      return '<button class="g4-fin' + ((S.fin || 'g') === f[0] ? ' sel' : '') + '" data-f="' + f[0] + '">' + f[1] + '</button>';
    }).join('');
    document.getElementById('g4addbtn').textContent = '🧩 إضافات (' + ((S.addonsOwned || []).length) + ')';
    fillAddons();
    var on = document.querySelector('#g4rail .on');
    if (on && on.scrollIntoView) on.scrollIntoView({ block: 'nearest', inline: 'center' });
  }

  function fillAddons() {
    var box = document.getElementById('g4addlist'); if (!box) return;
    var own = S.addonsOwned || (S.addonsOwned = []), eq = S.addon || (S.addon = {});
    box.innerHTML = SLOTS.map(function (s) {
      var items = (window.TKADDONS || []).filter(function (a) { return a.slot === s.id; });
      var lamp = (s.id === 'head' || s.id === 'tail');
      var cls = s.id === 'head' ? 'h' : 't';
      var cards = '<button class="g4-adc' + (eq[s.id] ? '' : ' on') + '" data-off="' + s.id + '">' +
        '<i class="g4-lamp none"></i><b>بدون</b><small>مطفي</small></button>';
      cards += items.map(function (a) {
        var has = own.indexOf(a.id) >= 0, on = eq[s.id] === a.id;
        var art = lamp
          ? '<i class="g4-lamp ' + cls + '" style="--c:' + (a.c || '#9fc4dc') + ';--g:' + (a.g || '#22d3ee') + '"></i>'
          : '<i class="g4-lamp part">' + (s.e || '') + '</i>';
        return '<button class="g4-adc' + (on ? ' on' : '') + (has ? '' : ' buy') + '" data-add="' + a.id + '">' + art +
          '<b>' + a.n + '</b><small>' + (has ? (on ? 'مركّب' : 'مملوك') : money(a.p)) + '</small></button>';
      }).join('');
      return '<div class="g4-slot"><div class="g4-sloth"><b>' + s.e + ' ' + s.n + '</b></div><div class="g4-adrow">' + cards + '</div></div>';
    }).join('');
  }

  function pick(i) {
    pv = (i + CARS.length) % CARS.length;
    tier = tierOf(pv);
    buildModel(pv); fill();
  }

  window.__rgAng = function (a) { spin = a; };
  window.__rgEquip = function (o) {
    S.addonsOwned = (window.TKADDONS || []).map(function (a) { return a.id; });
    S.addon = o || {}; buildModel(pv); fill();
  };
  window.__rgPickTier = function (t) {
    var i = 0; for (var k = 0; k < CARS.length; k++) if (tierOf(k) === t) { i = k; break; }
    pv = i; tier = t; buildModel(pv); fill();
  };
  window.__rgDump = function () {
    var out = { addon: JSON.stringify(S.addon), kids: [] };
    if (!MDL) return out;
    out.n = MDL.children.length;
    if (window.__rgDeep) {
      MDL.traverse(function (o) {
        if (!o.isMesh && !o.isSprite) return;
        var m = o.material || {};
        out.kids.push((o.isSprite ? 'Sprite' : 'Mesh') + '|' + (o.name || '-') + '|em:' + (m.emissive ? m.emissive.getHexString() : '-') + '|col:' + (m.color ? m.color.getHexString() : '-') + '|pos:' + o.position.x.toFixed(2) + ',' + o.position.y.toFixed(2) + ',' + o.position.z.toFixed(2) + '|ex:' + (o.userData.ex || 0));
      });
      return out;
    }
    MDL.children.forEach(function (c) {
      var bb = new T.Box3().setFromObject(c), sz = bb.getSize(new T.Vector3());
      out.kids.push(c.type + '|' + (c.name || '-') + '|' + sz.x.toFixed(2) + ',' + sz.y.toFixed(2) + ',' + sz.z.toFixed(2) + '|' + bb.min.z.toFixed(2) + '..' + bb.max.z.toFixed(2));
    });
    return out;
  };
  window.__rgPanel = function () { document.getElementById('g4addbtn').click(); };
  window.rgar = function () {
    var G = document.getElementById('garage');
    pv = (pv >= 0 && pv < CARS.length) ? pv : (S.car || 0);
    tier = tierOf(pv);
    if (!document.getElementById('g4cv')) {
      G.innerHTML =
        '<div class="g4">' +
        '<div class="g4-head"><button class="g4-back" data-a="back" aria-label="رجوع">→</button><b>الكراج</b>' +
        '<span class="g4-coins" id="g4coins">💎 0</span></div>' +
        '<div class="g4-tiers" id="g4tiers"></div>' +
        '<div class="g4-stage"><canvas id="g4cv"></canvas>' +
        '<div class="g4-name"><b id="g4nm">—</b><small id="g4cl">—</small></div>' +
        '<button class="g4-nav r" data-n="1" aria-label="السابقة">‹</button>' +
        '<button class="g4-nav l" data-n="-1" aria-label="التالية">›</button>' +
        '<div class="g4-badge" id="g4badge"></div></div>' +
        '<div class="g4-sheet"><div class="g4-row" id="g4colors"></div><div class="g4-row" id="g4fins"></div>' +
        '<div class="g4-acts"><button class="g4-cta" id="g4cta"></button><button class="g4-addbtn" id="g4addbtn" data-a="addons">🧩 إضافات</button></div></div>' +
        '<div class="g4-rail" id="g4rail"></div>' +
        '<div class="g4-addpanel" id="g4addpanel"><div class="g4-addhead"><b>إضافات العربية</b><button class="g4-close" data-a="closeadd">✕</button></div>' +
        '<div class="g4-addlist" id="g4addlist"></div></div>' +
        '</div>';
      R3 = null;
    }
    if (!R3 && window.THREE) {
      R3 = new T.WebGLRenderer({ canvas: document.getElementById('g4cv'), alpha: true, antialias: true });
      SC = scene();
      var pl = new T.Mesh(new T.CylinderGeometry(2.6, 2.8, .12, 56), new T.MeshStandardMaterial({ color: 0x123a5c, metalness: .5, roughness: .35 }));
      pl.position.y = -.07; SC.add(pl);
      var rg = new T.Mesh(new T.TorusGeometry(2.65, .035, 8, 64), new T.MeshBasicMaterial({ color: 0x22d3ee }));
      rg.rotation.x = Math.PI / 2; SC.add(rg);
      CAM = new T.PerspectiveCamera(32, 1.5, .1, 100);
    }
    buildModel(pv);
    fill();
    var cv = document.getElementById('g4cv');
    if (cv) {
      cv.style.touchAction = 'none';
      cv.onpointerdown = function (e) { drag = true; lx = e.clientX; vel = 0; try { cv.setPointerCapture(e.pointerId); } catch (x) {} };
      cv.onpointermove = function (e) { if (!drag) return; var d = e.clientX - lx; lx = e.clientX; var dy = d * .011; spin += dy; vel = vel * .5 + dy * .5; };
      cv.onpointerup = function (e) { drag = false; try { cv.releasePointerCapture(e.pointerId); } catch (x) {} };
      cv.onpointercancel = function () { drag = false; };
    }
    if (!raf) raf = requestAnimationFrame(loop);
  };

  document.addEventListener('click', function (e) {
    var g = document.getElementById('garage');
    if (!g || !g.classList.contains('on')) return;
    var t = e.target.closest('[data-i],[data-c],[data-f],[data-a],[data-n],[data-act],[data-t],[data-add],[data-off]');
    if (!t) return;
    try { ac(); } catch (err) {}
    if (t.dataset.i != null) { pick(+t.dataset.i); return; }
    if (t.dataset.n) { var L = carList(), k = L.indexOf(pv); pick(L[(k + (+t.dataset.n) + L.length) % L.length]); return; }
    if (t.dataset.t) { tier = t.dataset.t; var l2 = carList(); if (l2.length) pick(l2[0]); else fill(); return; }
    if (t.dataset.c) { S.color = t.dataset.c; sv(); buildModel(pv); fill(); try { applyCar(); } catch (err) {} return; }
    if (t.dataset.f) { S.fin = t.dataset.f; sv(); buildModel(pv); fill(); try { applyCar(); } catch (err) {} return; }
    if (t.dataset.a === 'back') { go('home'); return; }
    if (t.dataset.a === 'addons') { document.getElementById('g4addpanel').classList.toggle('on'); return; }
    if (t.dataset.a === 'closeadd') { document.getElementById('g4addpanel').classList.remove('on'); return; }
    if (t.dataset.off) { S.addon[t.dataset.off] = ''; sv(); buildModel(pv); fill(); return; }
    if (t.dataset.add) {
      var a = (window.TKADDONS || []).filter(function (x) { return x.id === t.dataset.add; })[0];
      if (!a) return;
      S.addonsOwned = S.addonsOwned || [];
      if (S.addonsOwned.indexOf(a.id) < 0) {
        if (S.coins < a.p) { cel('تحتاج ' + (a.p - S.coins) + ' عملة إضافية 💎', 1500, 0); return; }
        askBuy({ n: a.n, p: a.p, ico: '🧩' }, function () {
          S.coins -= a.p; S.addonsOwned.push(a.id); S.addon[a.slot] = a.id; sv();
          try { beep(800, .15); fx(2); hud(); } catch (err) {}
          buildModel(pv); fill();
        });
        return;
      }
      S.addon[a.slot] = a.id; sv(); buildModel(pv); fill(); return;
    }
    var act = t.dataset.act;
    if (act === 'eq') { S.car = pv; sv(); try { applyCar(); } catch (err) {} try { beep(660, .12); } catch (err) {} fill(); return; }
    if (act === 'buy') {
      var c = CARS[pv];
      askBuy({ n: c.n, p: c.p, ico: '🚗' }, function () {
        S.coins -= c.p; S.cars.push(pv); S.car = pv; sv();
        try { applyCar(); beep(800, .15); fx(2); hud(); } catch (err) {}
        fill();
      });
    }
  });
})();
