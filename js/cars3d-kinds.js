/* TURBO KIDS - new car catalogue + per-model detail work (preview build). */
(function () {
  'use strict';
  var T = window.THREE; if (!T || !window.TKCARS) return;
  var K = window.TKCARS;

  /* ---------------- silhouettes (x: +front / -rear, y: 0..1 of belt height) ---------------- */
  var P = {
    gt:      [[.50, .18], [.505, .44], [.48, .66], [.42, .82], [.26, .90], [.06, .96], [-.18, 1], [-.36, .97], [-.46, .88], [-.50, .62], [-.50, .28], [-.38, .13], [0, .11], [.38, .13]],
    rally:   [[.50, .20], [.50, .52], [.47, .74], [.40, .88], [.18, .94], [-.10, .97], [-.36, .95], [-.47, .86], [-.50, .54], [-.50, .22], [-.34, .10], [0, .08], [.34, .10]],
    hyper:   [[.50, .12], [.505, .34], [.47, .52], [.38, .66], [.16, .74], [-.06, .80], [-.30, .85], [-.44, .80], [-.50, .60], [-.50, .26], [-.34, .08], [0, .06], [.34, .08]],
    jeep:    [[.50, .22], [.505, .78], [.46, .93], [.34, 1], [-.34, 1], [-.46, .93], [-.50, .72], [-.50, .22], [-.40, .08], [0, .06], [.40, .08]],
    pickup:  [[.50, .22], [.505, .68], [.46, .85], [.34, .93], [.14, .95], [.02, .90], [-.04, .72], [-.06, .58], [-.46, .58], [-.50, .50], [-.50, .22], [-.36, .08], [.36, .08]],
    f1:      [[.50, .30], [.505, .48], [.44, .60], [.24, .66], [.02, .70], [-.20, .68], [-.36, .62], [-.46, .50], [-.50, .36], [-.46, .26], [-.20, .18], [.20, .18], [.44, .22]],
    van:     [[.50, .16], [.505, .64], [.46, .85], [.34, .94], [-.34, .96], [-.46, .91], [-.50, .64], [-.50, .16], [-.36, .06], [0, .04], [.36, .06]],
    sedan:   [[.50, .18], [.505, .54], [.47, .72], [.40, .85], [.18, .91], [-.10, .95], [-.34, .93], [-.45, .83], [-.50, .54], [-.50, .20], [-.34, .09], [0, .07], [.34, .09]],
    suv:     [[.50, .20], [.505, .66], [.46, .85], [.34, .93], [-.34, .95], [-.46, .89], [-.50, .64], [-.50, .20], [-.36, .07], [0, .05], [.36, .07]],
    hatch:   [[.50, .18], [.505, .54], [.46, .74], [.38, .87], [.14, .93], [-.16, .97], [-.40, .93], [-.49, .76], [-.50, .48], [-.50, .20], [-.34, .09], [0, .07], [.34, .09]],
    muscle:  [[.50, .18], [.505, .48], [.47, .66], [.36, .74], [.10, .78], [-.16, .80], [-.36, .76], [-.46, .68], [-.50, .46], [-.50, .20], [-.34, .09], [0, .07], [.34, .09]],
    ev:      [[.50, .16], [.505, .48], [.47, .68], [.36, .78], [.12, .84], [-.14, .86], [-.36, .82], [-.47, .72], [-.50, .48], [-.50, .16], [-.34, .06], [0, .04], [.34, .06]],
    monster: [[.50, .36], [.505, .76], [.46, .91], [.34, 1], [-.34, 1], [-.46, .91], [-.50, .72], [-.50, .36], [-.36, .22], [0, .20], [.36, .22]],
    retro:   [[.50, .26], [.505, .54], [.47, .72], [.38, .82], [.14, .88], [-.16, .90], [-.38, .86], [-.48, .74], [-.50, .50], [-.50, .26], [-.34, .12], [0, .10], [.34, .12]]
  };
  var C = {
    gt:      [[.20, 0], [.06, .70], [-.10, .98], [-.26, .90], [-.42, 0]],
    rally:   [[.22, 0], [.10, .64], [-.02, .96], [-.30, .98], [-.46, 0]],
    hyper:   [[.12, 0], [0, .58], [-.14, .90], [-.30, .84], [-.44, 0]],
    jeep:    [[.24, 0], [.20, .56], [-.10, .62], [-.42, .62], [-.46, 0]],
    pickup:  [[.18, 0], [.04, .66], [-.10, .96], [-.24, .92], [-.34, 0]],
    f1:      null,
    van:     [[.32, 0], [.26, .60], [-.02, .70], [-.44, .70], [-.48, 0]],
    sedan:   [[.22, 0], [.10, .60], [-.06, .92], [-.24, .92], [-.40, 0]],
    suv:     [[.22, 0], [.16, .60], [-.12, .68], [-.44, .68], [-.48, 0]],
    hatch:   [[.22, 0], [.08, .64], [-.08, .94], [-.34, .94], [-.46, 0]],
    muscle:  [[.12, 0], [0, .56], [-.14, .84], [-.30, .84], [-.42, 0]],
    ev:      [[.16, 0], [.04, .56], [-.12, .90], [-.30, .86], [-.44, 0]],
    monster: [[.22, 0], [.18, .56], [-.14, .64], [-.44, .64], [-.46, 0]],
    retro:   [[.20, 0], [.08, .58], [-.08, .86], [-.28, .84], [-.42, 0]]
  };


  /* body cross-sections: [z, width(0..1 of half body), bottomY, topY] in units of body height */
  function S(a){ return a.map(function(r){ return {z:r[0],w:r[1],y0:r[2],y1:r[3],nt:1.75,nb:4.5}; }); }
  var ST = {
    gt: S([[-.50,.70,.18,.34],[-.47,.82,.12,.44],[-.40,.90,.08,.58],[-.28,.95,.05,.70],[-.12,.99,.04,.80],[.02,1,.04,.82],[.20,.99,.05,.78],[.34,.96,.06,.70],[.44,.88,.10,.56],[.50,.76,.20,.40]]),
    rally: S([[-.50,.74,.16,.34],[-.46,.86,.10,.46],[-.38,.93,.06,.62],[-.24,.97,.04,.74],[-.10,1,.03,.82],[.06,1,.03,.84],[.24,1,.04,.82],[.38,.98,.05,.78],[.46,.92,.08,.64],[.50,.80,.18,.44]]),
    hyper: S([[-.50,.66,.10,.24],[-.46,.80,.06,.32],[-.38,.90,.04,.44],[-.24,.96,.03,.58],[-.08,.99,.03,.70],[.06,1,.03,.74],[.24,1,.04,.70],[.36,.94,.06,.60],[.46,.84,.10,.44],[.50,.70,.14,.30]]),
    jeep: S([[-.50,.78,.14,.50],[-.48,.88,.10,.62],[-.42,.94,.08,.72],[-.30,.97,.06,.80],[0,1,.06,.82],[.28,.99,.06,.82],[.42,.94,.08,.78],[.48,.86,.12,.66],[.50,.80,.16,.54]]),
    pickup: S([[-.50,.76,.16,.46],[-.46,.88,.10,.60],[-.36,.94,.06,.72],[-.20,.98,.05,.80],[-.06,1,.04,.84],[.06,1,.04,.86],[.14,.99,.05,.80],[.20,.98,.05,.68],[.26,.96,.06,.62],[.44,.94,.06,.60],[.50,.86,.14,.54]]),
    f1: S([[-.50,.56,.20,.34],[-.46,.70,.14,.44],[-.38,.80,.10,.56],[-.26,.88,.08,.66],[-.10,.92,.06,.74],[.08,.94,.06,.76],[.24,.92,.06,.72],[.36,.86,.08,.64],[.46,.72,.12,.50],[.50,.56,.18,.38]]),
    van: S([[-.50,.80,.14,.44],[-.46,.90,.08,.60],[-.34,.96,.06,.74],[-.10,1,.05,.82],[.20,1,.05,.84],[.40,.98,.06,.82],[.48,.90,.10,.68],[.50,.84,.16,.50]]),
    sedan: S([[-.50,.72,.16,.36],[-.46,.84,.10,.48],[-.36,.92,.06,.62],[-.22,.97,.04,.72],[-.06,1,.03,.80],[.10,1,.03,.82],[.26,1,.04,.78],[.40,.96,.06,.66],[.48,.86,.12,.50],[.50,.76,.18,.40]]),
    suv: S([[-.50,.78,.16,.48],[-.46,.88,.10,.62],[-.36,.95,.06,.74],[-.14,.99,.05,.82],[.14,1,.05,.84],[.34,.99,.06,.82],[.44,.94,.08,.74],[.50,.84,.14,.56]]),
    hatch: S([[-.50,.74,.16,.34],[-.46,.86,.10,.48],[-.36,.93,.06,.64],[-.20,.98,.04,.76],[-.04,1,.03,.84],[.12,1,.03,.86],[.28,1,.04,.82],[.42,.96,.06,.72],[.50,.84,.14,.50]]),
    muscle: S([[-.50,.76,.16,.40],[-.46,.88,.10,.52],[-.34,.94,.06,.62],[-.18,.98,.04,.70],[-.02,1,.03,.76],[.14,1,.03,.78],[.30,1,.04,.76],[.42,.96,.06,.68],[.50,.84,.16,.50]]),
    ev: S([[-.50,.72,.14,.32],[-.46,.86,.08,.46],[-.34,.94,.05,.62],[-.16,.99,.04,.74],[.02,1,.03,.80],[.20,1,.04,.80],[.34,.98,.05,.74],[.44,.92,.08,.62],[.50,.80,.14,.44]]),
    monster: S([[-.50,.80,.20,.56],[-.46,.90,.14,.66],[-.34,.96,.10,.76],[-.10,1,.08,.84],[.18,1,.08,.86],[.36,.98,.10,.82],[.46,.92,.14,.72],[.50,.84,.20,.58]]),
    retro: S([[-.50,.74,.20,.40],[-.46,.86,.14,.52],[-.36,.93,.08,.64],[-.20,.98,.05,.74],[-.02,1,.04,.82],[.16,1,.04,.82],[.30,.99,.05,.78],[.42,.94,.08,.68],[.50,.82,.18,.50]])
  };
  /* cabin: [windshield base, roof front, roof rear, rear window base, width factor] */
  var CAB = {
    gt: [-.12, .02, .22, .38, .74], rally: [-.14, 0, .26, .44, .76], hyper: [-.06, .06, .20, .36, .70],
    jeep: [-.16, -.10, .30, .46, .78], pickup: [-.14, -.02, .16, .30, .76], f1: null,
    van: [-.24, -.16, .36, .48, .84], sedan: [-.14, -.02, .20, .36, .76], suv: [-.16, -.08, .30, .46, .80],
    hatch: [-.14, -.04, .24, .42, .76], muscle: [-.06, .06, .16, .30, .72], ev: [-.08, .04, .20, .36, .74],
    monster: [-.14, -.08, .28, .44, .80], retro: [-.12, 0, .18, .34, .74]
  };
  function cabinStations(cp) {
    var a = cp[0], b = cp[1], c = cp[2], d = cp[3], w = (cp[4] || .76) + .10;
    return [
      { z: a, w: w * .92, y0: .02, y1: .16 },
      { z: a + (b - a) * .45, w: w * .98, y0: .04, y1: .62 },
      { z: b, w: w, y0: .05, y1: .99 },
      { z: (b + c) / 2, w: w, y0: .05, y1: 1 },
      { z: c, w: w * .99, y0: .05, y1: .96 },
      { z: c + (d - c) * .5, w: w * .95, y0: .04, y1: .52 },
      { z: d, w: w * .88, y0: .02, y1: .10 }
    ];
  }

  /* ---------------- catalogue ---------------- */
  var LIST = [
    { n: 'كوميت GT', p: 0, k: 'gt', w: 1.74, l: 3.6, h: .40, cb: .30, gc: .16, wr: .27, acc: 0xffffff, num: 1 },
    { n: 'زيبرا رالي', p: 60, k: 'rally', w: 1.82, l: 3.7, h: .46, cb: .30, gc: .20, wr: .29, acc: 0xffffff, num: 7 },
    { n: 'فولكان X', p: 140, k: 'hyper', w: 1.88, l: 4.0, h: .34, cb: .24, gc: .13, wr: .26, acc: 0xf59e0b, num: 9, rim: 0xfbbf24 },
    { n: 'تيتان 4x4', p: 190, k: 'jeep', w: 1.98, l: 3.8, h: .52, cb: .34, gc: .28, wr: .34, acc: 0x111827, num: 4 },
    { n: 'رينجر بيك أب', p: 240, k: 'pickup', w: 1.90, l: 4.2, h: .46, cb: .30, gc: .24, wr: .32, acc: 0x111827, num: 5 },
    { n: 'أبيكس فورمولا', p: 300, k: 'f1', w: 1.62, l: 4.0, h: .30, cb: .12, gc: .10, wr: .26, acc: 0xffffff, num: 3, rim: 0xf59e0b },
    { n: 'كومبي فان', p: 360, k: 'van', w: 1.94, l: 4.1, h: .56, cb: .40, gc: .20, wr: .29, acc: 0xffffff, num: 2 },
    { n: 'كراون سيدان', p: 430, k: 'sedan', w: 1.82, l: 4.0, h: .42, cb: .28, gc: .18, wr: .27, acc: 0x111827, num: 8 },
    { n: 'رابتور SUV', p: 500, k: 'suv', w: 1.96, l: 3.9, h: .48, cb: .32, gc: .24, wr: .32, acc: 0x111827, num: 6 },
    { n: 'ميني زيبرا', p: 560, k: 'hatch', w: 1.70, l: 3.4, h: .40, cb: .30, gc: .18, wr: .27, acc: 0xffffff, num: 11 },
    { n: 'تورك ماسل', p: 640, k: 'muscle', w: 1.94, l: 4.05, h: .40, cb: .26, gc: .18, wr: .29, acc: 0x111827, num: 12 },
    { n: 'سبارك EV', p: 740, k: 'ev', w: 1.86, l: 3.9, h: .40, cb: .28, gc: .16, wr: .27, acc: 0x0ea5e9, num: 10 },
    { n: 'مونستر', p: 1600, k: 'monster', w: 2.10, l: 4.3, h: .46, cb: .30, gc: .50, wr: .44, acc: 0x111827, num: 13, rim: 0x84cc16 },
    { n: 'ريترو كلاسيك', p: 2000, k: 'retro', w: 1.80, l: 3.9, h: .42, cb: .30, gc: .20, wr: .27, acc: 0xffffff, num: 14, rim: 0xe2e8f0 }
  ];

  /* ---------------- build one car ---------------- */
  function build(idx, color) {
    var c = LIST[idx] || LIST[0];
    var W = c.w, L = c.l * .93, bh = c.h * 1.34, cb = c.cb * 1.34, wr = c.wr * 1.52, k = c.k;
    var gc = Math.max(c.gc, wr * .66);
    var Wb = W - .30, Wc = Wb, bevel = Math.min(.085, Wb * .05);
    var g = new T.Group();
    var bodyM = K.paint(color);
    var darkM = K.mat(0x141a23, .25, .55);
    var trimM = K.mat(0x0b0f16, .35, .35);
    var chrome = K.mat(0xe3eaf2, .96, .12);
    var accM = K.mat(c.acc != null ? c.acc : 0xffffff, .32, .30);
    var glassM = K.glass();
    var headM = K.glowMat(0xfff8dc);
    var tailM = K.glowMat(0xff2d3d);
    var belt = gc + bh * .84;
    var put = function (m, x, y, z) { m.position.set(x, y, z); g.add(m); return m; };
    var noseZ = -L / 2, tailZ = L / 2;

    /* body shell (lofted cross-sections) */
    var bodyGeo = K.loft(ST[k], Wb, L);
    bodyGeo.scale(1, bh, 1);
    var body = new T.Mesh(bodyGeo, bodyM);
    body.position.y = gc; g.add(body);

    /* side skirts + bumpers in the accent tone */
    [-1, 1].forEach(function (s) {
      put(K.rbox(.07, .06, L * .52, .025, trimM), s * (Wb / 2 + .015), gc + .05, 0);
    });
    put(K.rbox(Wb * .90, .09, .10, .03, trimM), 0, gc + bh * .20, -L / 2 + .01);
    put(K.rbox(Wb * .90, .09, .10, .03, trimM), 0, gc + bh * .20, L / 2 - .01);

    /* cabin + roof */
    var cp = CAB[k];
    if (cp) {
      var cabGeo = K.loft(cabinStations(cp), Wc, L, 24);
      cabGeo.scale(1, cb, 1);
      var cab = new T.Mesh(cabGeo, glassM);
      cab.position.y = belt; g.add(cab);
      var rz0 = cp[1], rz1 = cp[2];
      put(K.rbox(Wc * (cp[4] + .10) * .78, .05, Math.abs(rz1 - rz0) * L * .88, .025, bodyM), 0, belt + cb * .93, (rz0 + rz1) / 2 * L);
      put(K.rbox(Wc * (cp[4] + .10) * .22, .018, Math.abs(rz1 - rz0) * L * .84, .009, accM), 0, belt + cb * .955, (rz0 + rz1) / 2 * L);
    }

    /* wheels + arches */
    var wb = L * .335, wheels = [];
    var fw = .25, rw = k === 'muscle' ? .33 : .27;
    var rims = c.rim || 0xd7dde6;
    [[-1, -wb, fw], [1, -wb, fw], [-1, wb, rw], [1, wb, rw]].forEach(function (p) {
      var wh = K.wheel(wr, p[2], rims, { caliper: 0xff3b30, whitewall: k === 'retro' });
      wh.position.set(p[0] * (W / 2 - p[2] / 2 - .01), wr, p[1]);
      g.add(wh); wheels.push(wh);
      var fl = new T.Mesh(new T.TorusGeometry(wr * 1.10, wr * .13, 6, 16, Math.PI * 1.02), bodyM);
      fl.rotation.y = Math.PI / 2;
      fl.position.set(p[0] * (Wb / 2 + .01), wr, p[1]);
      g.add(fl);
    });

    /* lights, grille, splitter, diffuser, exhausts */
    put(K.rbox(Wb * .58, .13, .07, .045, darkM), 0, gc + bh * .30, noseZ + .03);
    put(K.rbox(Wb * .98, .055, .18, .025, trimM), 0, gc + .045, noseZ + .07);
    var hx = Wb * .30, hy = gc + bh * .56;
    [-1, 1].forEach(function (s) {
      put(K.rbox(Wb * .30, .17, .10, .06, headM), s * hx, hy, noseZ + .02);
      g.add(K.sprite(0xfff3c4, .26, s * hx, hy, noseZ - .01));
      put(K.rbox(Wb * .20, .035, .07, .015, headM), s * hx, hy - .115, noseZ + .015);
    });
    put(K.rbox(Wb * .74, .10, .08, .04, tailM), 0, gc + bh * .66, tailZ - .02);
    put(K.rbox(Wb * .90, .13, .18, .03, darkM), 0, gc + .09, tailZ - .07);
    for (var i = -1; i <= 1; i++) put(K.rbox(.045, .17, .16, .015, trimM), i * Wb * .2, gc + .10, tailZ - .06);
    var exY = gc + .13;
    [-1, 1].forEach(function (s) {
      var ex = new T.Mesh(new T.CylinderGeometry(.055, .062, .18, 10), chrome);
      ex.rotation.x = Math.PI / 2; put(ex, s * Wb * .23, exY, tailZ + .02);
      var fl2 = new T.Mesh(new T.ConeGeometry(.062, .22, 8), K.glowMat(0xffa53c, .85));
      fl2.rotation.x = Math.PI / 2; put(fl2, s * Wb * .23, exY, tailZ + .13);
    });

    /* mirrors */
    [-1, 1].forEach(function (s) {
      put(K.rbox(.09, .05, .13, .022, bodyM), s * (Wb / 2 - .01), belt + cb * .06, -L * .12);
      put(K.rbox(.035, .035, .07, .012, darkM), s * (Wb / 2 - .05), belt + cb * .02, -L * .12);
    });

    /* door roundel */
    if (c.num) {
      var dm = K.decal(c.num);
      [-1, 1].forEach(function (s) {
        var d = new T.Mesh(new T.PlaneGeometry(.34, .34), dm);
        d.rotation.y = s * Math.PI / 2;
        put(d, s * (Wb / 2 + .014), gc + bh * .52, -L * .02);
      });
    }

    /* ------- per model extras ------- */
    var wing = function (span, chord, y, z, thick, colorM) {
      put(K.rbox(span, thick || .055, chord, .02, colorM || bodyM), 0, y, z);
      [-1, 1].forEach(function (s) {
        put(K.rbox(.045, .17, chord * 1.02, .015, darkM), s * span / 2, y, z);
        put(K.rbox(.05, Math.max(.06, y - belt), .09, .015, darkM), s * span * .34, y - Math.max(.06, y - belt) / 2, z + .04);
      });
    };

    if (k === 'gt') {
      put(K.rbox(Wb * .50, .03, .34, .014, accM), 0, gc + bh * .90, -L * .22);
      put(K.rbox(.05, .03, L * .26, .012, accM), 0, gc + bh * .995, L * .10);
      wing(Wb * .70, .16, belt + cb * .40, L / 2 - .10, .04);
    }
    if (k === 'rally') {
      wing(Wb * .92, .28, belt + cb * 1.05, L / 2 - .12, .06);
      put(K.rbox(Wb * .52, .09, .09, .03, darkM), 0, belt + cb * 1.0, -L * .14);
      [-1, -.34, .34, 1].forEach(function (s) {
        var lamp = new T.Mesh(new T.CylinderGeometry(.055, .055, .06, 12), headM);
        lamp.rotation.x = Math.PI / 2; put(lamp, s * Wb * .17, belt + cb * 1.01, -L * .14);
        g.add(K.sprite(0xfff3c4, .30, s * Wb * .17, belt + cb * 1.01, -L * .16));
      });
      [-1, 1].forEach(function (s) { put(K.rbox(.03, .12, .02, .01, accM), s * Wb * .42, gc + bh * .55, -L * .10); });
    }
    if (k === 'hyper') {
      wing(Wb * 1.0, .30, belt + cb * .95, L / 2 - .06, .05);
      put(K.rbox(Wb * .34, .03, .26, .012, darkM), 0, gc + bh * .93, -L * .28);
      [-1, 1].forEach(function (s) { put(K.rbox(.05, .04, L * .52, .014, accM), s * Wb * .30, gc + bh * .995, -L * .05); });
      put(K.rbox(Wb * .30, .04, .5, .02, darkM), 0, gc + bh * .99, -L * .05);
    }
    if (k === 'jeep') {
      var spare = new T.Mesh(new T.CylinderGeometry(wr * .82, wr * .82, .22, 18), K.mat(0x0d1117, 0, .95));
      spare.rotation.x = Math.PI / 2; put(spare, 0, gc + bh * .52, L / 2 + .10);
      put(K.rbox(Wb * .78, .05, .16, .02, chrome), 0, gc + bh * .30, -L / 2 - .05);
      [-1, 1].forEach(function (s) { put(K.rbox(.06, .18, .16, .02, chrome), s * Wb * .33, gc + bh * .30, -L / 2 - .04); });
      put(K.rbox(Wb * .66, .05, .05, .02, darkM), 0, belt + cb * 1.02, -L * .12);
      [-1, 1].forEach(function (s) { put(K.rbox(.04, .04, L * .55, .015, darkM), s * Wb * .32, belt + cb * 1.02, -L * .06); });
      put(K.rbox(.09, cb * .8, .12, .03, darkM), Wb * .46, belt + cb * .35, -L * .18);
    }
    if (k === 'pickup') {
      put(K.rbox(Wb * .92, .20, .07, .02, bodyM), 0, gc + bh * .68, L / 2 - .04);
      [-1, 1].forEach(function (s) { put(K.rbox(.06, .22, L * .40, .02, bodyM), s * Wb * .45, gc + bh * .68, L * .24); });
      put(K.rbox(Wb * .60, .05, .05, .02, chrome), 0, belt + cb * .60, L * .10);
      [-1, 1].forEach(function (s) { put(K.rbox(.05, cb * .55, .05, .02, chrome), s * Wb * .29, belt + cb * .30, L * .10); });
      put(K.rbox(Wb * .68, .04, .05, .02, darkM), 0, belt + cb * .99, -L * .18);
    }
    if (k === 'f1') {
      put(K.rbox(Wb * 1.04, .04, .28, .015, bodyM), 0, gc + bh * .40, -L / 2 + .14);
      [-1, 1].forEach(function (s) { put(K.rbox(.04, .17, .30, .015, darkM), s * Wb * .50, gc + bh * .40, -L / 2 + .14); });
      put(K.rbox(Wb * .76, .05, .30, .02, bodyM), 0, belt + cb * 1.6, L / 2 - .10);
      [-1, 1].forEach(function (s) { put(K.rbox(.04, cb * 1.6, .26, .015, bodyM), s * Wb * .36, belt + cb * .8, L / 2 - .10); });
      put(K.rbox(Wb * .30, cb * .9, L * .24, .03, bodyM), 0, belt + cb * .5, L * .14);
      var halo = new T.Mesh(new T.TorusGeometry(Wc * .22, .035, 5, 16, Math.PI), chrome);
      halo.rotation.y = Math.PI / 2; put(halo, 0, belt + cb * .95, -L * .04);
      put(K.rbox(Wc * .18, .055, .52, .02, trimM), 0, belt + cb * 1.02, -L * .04);
      var helmet = new T.Mesh(new T.SphereGeometry(.15, 12, 10), K.mat(0xef4444, .2, .35));
      put(helmet, 0, belt + cb * .50, -L * .02);
      put(K.rbox(.19, .07, .06, .02, glassM), 0, belt + cb * .52, -L * .15);
      [-1, 1].forEach(function (s) { put(K.rbox(.16, cb * .8, L * .30, .04, bodyM), s * Wb * .36, belt + cb * .28, L * .04); });
    }
    if (k === 'van') {
      put(K.rbox(Wb * .94, .05, .05, .02, darkM), 0, belt + cb * 1.0, -L * .10);
      [-1, 1].forEach(function (s) { put(K.rbox(.04, .04, L * .70, .015, darkM), s * Wb * .36, belt + cb * 1.0, 0); });
      put(K.rbox(Wb * .94, .08, .05, .02, accM), 0, gc + bh * .52, L / 2 - .04);
      put(K.rbox(Wb * .94, .08, .05, .02, accM), 0, gc + bh * .52, -L / 2 + .04);
    }
    if (k === 'sedan') {
      put(K.rbox(Wb * .62, .10, .06, .03, chrome), 0, gc + bh * .60, noseZ + .02);
      for (var q = -2; q <= 2; q++) put(K.rbox(.03, .075, .05, .01, trimM), q * Wb * .06, gc + bh * .60, noseZ + .01);
      put(K.rbox(Wc * .55, .03, L * .14, .012, glassM), 0, belt + cb * .99, L * .02);
      [-1, 1].forEach(function (s) { put(K.rbox(.04, .04, L * .58, .015, chrome), s * Wb * .49, gc + bh * .40, 0); });
    }
    if (k === 'suv') {
      put(K.rbox(Wb * .68, .05, .05, .02, darkM), 0, belt + cb * 1.0, -L * .10);
      [-1, 1].forEach(function (s) { put(K.rbox(.04, .04, L * .60, .015, darkM), s * Wb * .34, belt + cb * 1.0, -L * .04); });
      put(K.rbox(Wb * .48, .07, .08, .025, headM), 0, belt + cb * .99, -L * .20);
      g.add(K.sprite(0xfff3c4, .34, 0, belt + cb * .99, -L * .22));
      put(K.rbox(Wb * .84, .06, .14, .02, chrome), 0, gc + bh * .26, L / 2 - .05);
    }
    if (k === 'hatch') {
      put(K.rbox(Wb * .78, .05, .16, .02, bodyM), 0, belt + cb * 1.0, L / 2 - .16);
      put(K.rbox(Wb * .44, .03, L * .28, .012, accM), 0, gc + bh * .95, -L * .20);
    }
    if (k === 'muscle') {
      put(K.rbox(Wb * .44, .11, .32, .04, bodyM), 0, gc + bh * .90, -L * .20);
      put(K.rbox(Wb * .40, .04, .24, .015, trimM), 0, gc + bh * .96, -L * .20);
      [-1, 1].forEach(function (s) {
        var pipe = new T.Mesh(new T.CylinderGeometry(.045, .045, L * .40, 10), chrome);
        pipe.rotation.x = Math.PI / 2; put(pipe, s * (Wb / 2 + .07), gc + .16, L * .12);
      });
      put(K.rbox(Wb * .88, .06, .12, .02, accM), 0, gc + bh * .28, noseZ + .03);
    }
    if (k === 'ev') {
      put(K.rbox(Wb * .76, .045, .07, .02, K.glowMat(0x67e8f9)), 0, gc + bh * .68, noseZ + .02);
      put(K.rbox(Wb * .76, .045, .07, .02, K.glowMat(0x67e8f9)), 0, gc + bh * .70, tailZ - .02);
      g.add(K.sprite(0x67e8f9, .40, 0, gc + bh * .68, noseZ - .01));
      put(K.rbox(Wb * .28, .03, L * .40, .012, K.glowMat(0x67e8f9, .8)), 0, gc + bh * .99, -L * .02);
      [-1, 1].forEach(function (s) { put(K.rbox(.06, .06, .10, .02, trimM), s * Wb * .33, gc + bh * .55, noseZ + .04); });
    }
    if (k === 'monster') {
      [-1, 1].forEach(function (s) {
        [-1, 1].forEach(function (z) {
          var arm = new T.Mesh(new T.CylinderGeometry(.05, .05, gc * .85, 8), chrome);
          arm.position.set(s * Wb * .32, gc * .55, z * wb); arm.rotation.z = s * .35; g.add(arm);
        });
      });
      var cage = new T.Mesh(new T.TorusGeometry(cb * .95, .04, 5, 14, Math.PI), chrome);
      cage.rotation.y = Math.PI / 2; put(cage, 0, belt + cb * .5, L * .02);
      put(K.rbox(Wb * .88, .06, .20, .02, accM), 0, gc + bh * .74, -L / 2 + .05);
      put(K.rbox(Wb * .48, .10, .10, .03, darkM), 0, belt + cb * .99, -L * .14);
    }
    if (k === 'retro') {
      put(K.rbox(Wb * .98, .11, .11, .045, chrome), 0, gc + bh * .30, noseZ + .01);
      put(K.rbox(Wb * .98, .11, .11, .045, chrome), 0, gc + bh * .30, tailZ - .01);
      [-1, 1].forEach(function (s) {
        var lamp = new T.Mesh(new T.CylinderGeometry(.10, .10, .07, 14), headM);
        lamp.rotation.x = Math.PI / 2; put(lamp, s * Wb * .30, gc + bh * .62, noseZ + .01);
        g.add(K.sprite(0xfff3c4, .24, s * Wb * .30, gc + bh * .62, noseZ - .02));
        put(K.rbox(.06, .06, .06, .02, chrome), s * Wb * .30, gc + bh * .80, -L * .28);
      });
      put(K.rbox(Wb * .32, .03, L * .48, .012, accM), 0, gc + bh * .99, 0);
    }

    g.userData.wheels = wheels;
    g.userData.m = { ry: belt + cb * .55, rz: 0, L: L, W: W, bt: gc, h: bh };
    return g;
  }

  /* ---------------- install into the game ---------------- */
  window.TKCARS.list = LIST;
  window.TKCARS.build = build;
  if (typeof CARS !== 'undefined' && CARS && CARS.length) {
    try {
      CARS.length = 0;
      LIST.forEach(function (x) { CARS.push(x); });
      if (typeof S !== 'undefined' && S) {
        S.cars = (Array.isArray(S.cars) ? S.cars : []).filter(function (i) {
          return Number.isInteger(i) && i >= 0 && i < LIST.length;
        });
        if (!S.cars.length) S.cars = [0];
        if (!Number.isInteger(S.car) || S.car < 0 || S.car >= LIST.length || S.cars.indexOf(S.car) < 0) S.car = 0;
        if (typeof svLocal === 'function') svLocal();
      }
      window.buildCarGroup = function (idx, color) { return build(idx, color); };
    } catch (e) { console.warn('TKCARS install failed', e); }
  }
})();
