/* TURBO KIDS - new car art system (preview build).
 * Original procedural "toy racer" cars: rounded chunky bodies, glossy paint,
 * big wheels with rims, fender flares, lights, wings. No external assets.
 */
(function () {
  'use strict';
  var T = window.THREE;
  if (!T) return;

  /* ---------------- shared environment map (glossy reflections) ---------------- */
  var ENV = null, ENVTRIED = false;
  function env() {
    if (ENVTRIED) return ENV;
    ENVTRIED = true;
    try {
      var c = document.createElement('canvas'); c.width = 256; c.height = 128;
      var g = c.getContext('2d');
      var gr = g.createLinearGradient(0, 0, 0, 128);
      gr.addColorStop(0, '#f2fbff'); gr.addColorStop(.40, '#9fd0ff');
      gr.addColorStop(.50, '#ffffff'); gr.addColorStop(.56, '#7f9dbb');
      gr.addColorStop(1, '#12283f');
      g.fillStyle = gr; g.fillRect(0, 0, 256, 128);
      g.fillStyle = 'rgba(255,255,255,.95)';
      g.beginPath(); g.arc(66, 26, 18, 0, 7); g.fill();
      g.fillStyle = 'rgba(255,244,214,.85)';
      g.beginPath(); g.arc(196, 22, 11, 0, 7); g.fill();
      g.fillStyle = 'rgba(255,255,255,.5)';
      g.fillRect(0, 60, 256, 3);
      var tex = new T.CanvasTexture(c);
      tex.mapping = T.EquirectangularReflectionMapping;
      var r = window.R;
      if (r && r.getRenderTarget) {
        var pm = new T.PMREMGenerator(r); pm.compileEquirectangularShader();
        ENV = pm.fromEquirectangular(tex).texture;
        pm.dispose();
      } else {
        ENV = tex;
      }
    } catch (e) { ENV = null; }
    return ENV;
  }

  function finish() { try { return (typeof S !== 'undefined' && S && S.fin) || 'g'; } catch (e) { return 'g'; } }

  /* ---------------- materials ---------------- */
  function paint(color) {
    var e = env();
    var o = { color: new T.Color(color), metalness: .30, roughness: .26, clearcoat: 1, clearcoatRoughness: .07 };
    if (e) { o.envMap = e; o.envMapIntensity = .85; }
    var f = finish();
    if (f === 'm') { o.metalness = 0; o.roughness = .86; o.clearcoat = .1; o.clearcoatRoughness = .5; }
    else if (f === 'x') { o.metalness = .92; o.roughness = .15; o.emissive = new T.Color(color); o.emissiveIntensity = .1; }
    else if (f === 'p') { o.metalness = .18; o.roughness = .07; o.emissive = new T.Color(0xffffff); o.emissiveIntensity = .12; }
    else if (f === 'n') { o.roughness = .38; o.emissive = new T.Color(color); o.emissiveIntensity = .5; }
    return new T.MeshPhysicalMaterial(o);
  }
  function mat(color, metal, rough, extra) {
    var e = env(), o = { color: color, metalness: metal, roughness: rough };
    if (e && metal > .3) { o.envMap = e; o.envMapIntensity = 1.1; }
    if (extra) for (var k in extra) o[k] = extra[k];
    return new T.MeshStandardMaterial(o);
  }
  function glass() {
    var e = env();
    return new T.MeshPhysicalMaterial({
      color: 0x0a1726, metalness: .25, roughness: .10, clearcoat: 1, clearcoatRoughness: .04,
      envMap: e || undefined, envMapIntensity: .85, transparent: true, opacity: .92
    });
  }
  function glowMat(color, op) {
    return new T.MeshBasicMaterial({ color: color, transparent: op != null, opacity: op == null ? 1 : op });
  }

  /* ---------------- geometry helpers ---------------- */
  function rrect(w, h, r) {
    var s = new T.Shape(), x = -w / 2, y = -h / 2;
    r = Math.min(r, Math.min(w, h) / 2);
    s.moveTo(x + r, y);
    s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
    s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
    s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
    return s;
  }
  // rounded box: w along X, h along Y, d along Z
  function rbox(w, h, d, r, material) {
    r = Math.min(r, Math.min(w, d) * .45, h * .45);
    var geo = new T.ExtrudeGeometry(rrect(w - r * 2, h - r * 2, Math.max(.005, r * .9)), {
      depth: Math.max(.01, d - r * 2), bevelEnabled: true, bevelSize: r, bevelThickness: r,
      bevelSegments: 3, curveSegments: 5, steps: 1
    });
    geo.translate(0, 0, -(d - r * 2) / 2);
    return new T.Mesh(geo, material);
  }
  // smooth closed silhouette from control points, extruded across the car width
  function shell(profile, L, h, W, bevel) {
    var pts = profile.map(function (p) { return new T.Vector3(p[0] * L, p[1] * h, 0); });
    var curve = new T.CatmullRomCurve3(pts, true, 'catmullrom', .32);
    var sp = curve.getPoints(Math.max(30, pts.length * 7));
    var shape = new T.Shape(sp.map(function (p) { return new T.Vector2(p.x, p.y); }));
    var depth = Math.max(.05, W - bevel * 2);
    var geo = new T.ExtrudeGeometry(shape, {
      depth: depth, bevelEnabled: true, bevelSize: bevel, bevelThickness: bevel,
      bevelSegments: 3, curveSegments: 6, steps: 1
    });
    geo.translate(0, 0, -(W / 2 - bevel));
    geo.rotateY(Math.PI / 2);
    return geo;
  }
  function tube(profile, W, bevel, y) {
    // open silhouette (cabin) - same projection as shell
    var geo = shell(profile, 1, 1, W, bevel);
    geo.scale(1, 1, 1);
    return geo;
  }
  function decal(number) {
    var c = document.createElement('canvas'); c.width = c.height = 128;
    var g = c.getContext('2d');
    g.fillStyle = 'rgba(255,255,255,.92)';
    g.beginPath(); g.arc(64, 64, 54, 0, 7); g.fill();
    g.strokeStyle = 'rgba(15,23,42,.55)'; g.lineWidth = 6;
    g.beginPath(); g.arc(64, 64, 50, 0, 7); g.stroke();
    g.fillStyle = '#0f172a'; g.font = '800 78px Poppins, Arial, sans-serif';
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(String(number), 64, 70);
    var tex = new T.CanvasTexture(c);
    return new T.MeshBasicMaterial({ map: tex, transparent: true });
  }

  /* ---------------- wheels ---------------- */
  function wheel(R, width, rimColor, opt) {
    opt = opt || {};
    var g = new T.Group();
    var tireMat = mat(0x0d1117, 0, .95);
    var rimMat = mat(rimColor || 0xd7dde6, .95, .16);
    var lipMat = mat(0xf2f5f9, .95, .12);
    // tire: lathe around Y, then turned so the axle is along X
    var w2 = width / 2, pts = [];
    pts.push(new T.Vector2(R * .52, -w2));
    pts.push(new T.Vector2(R * .93, -w2 * .98));
    pts.push(new T.Vector2(R * .995, -w2 * .72));
    pts.push(new T.Vector2(R, w2 * .72));
    pts.push(new T.Vector2(R * .93, w2 * .98));
    pts.push(new T.Vector2(R * .52, w2));
    var tire = new T.Mesh(new T.LatheGeometry(pts, opt.low ? 14 : 22), tireMat);
    tire.rotation.z = Math.PI / 2;
    g.add(tire);
    // rim barrel + lip
    var rim = new T.Mesh(new T.CylinderGeometry(R * .55, R * .55, width * .96, opt.low ? 12 : 20), rimMat);
    rim.rotation.z = Math.PI / 2;
    g.add(rim);
    var lip = new T.Mesh(new T.TorusGeometry(R * .55, R * .04, 5, opt.low ? 12 : 20), lipMat);
    lip.rotation.y = Math.PI / 2;
    lip.position.x = width * .48;
    g.add(lip);
    // spokes
    var n = opt.spokes || 5;
    for (var i = 0; i < n; i++) {
      var sp = new T.Mesh(new T.BoxGeometry(width * .1, R * 1.0, R * .15), rimMat);
      sp.rotation.x = i * Math.PI / n;
      sp.position.x = width * .30;
      g.add(sp);
    }
    var hub = new T.Mesh(new T.CylinderGeometry(R * .15, R * .15, width * .5, 10), lipMat);
    hub.rotation.z = Math.PI / 2; hub.position.x = width * .32;
    g.add(hub);
    if (opt.caliper) {
      var cal = new T.Mesh(new T.BoxGeometry(width * .18, R * .5, R * .2), glowMat(opt.caliper));
      cal.position.set(width * .05, R * .42, 0);
      g.add(cal);
    }
    if (opt.whitewall) {
      var ww = new T.Mesh(new T.TorusGeometry(R * .82, R * .05, 5, 18), mat(0xf8fafc, 0, .7));
      ww.rotation.y = Math.PI / 2; ww.position.x = -width * .5;
      g.add(ww);
    }
    g.userData.rim = rim;
    return g;
  }

  /* ---------------- glow sprite ---------------- */
  var GLOWTEX = null;
  function glowTex() {
    if (GLOWTEX) return GLOWTEX;
    var c = document.createElement('canvas'); c.width = c.height = 64;
    var g = c.getContext('2d');
    var gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, 'rgba(255,255,255,1)');
    gr.addColorStop(.35, 'rgba(255,255,255,.55)');
    gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
    GLOWTEX = new T.CanvasTexture(c);
    return GLOWTEX;
  }
  function sprite(color, size, x, y, z) {
    var s = new T.Sprite(new T.SpriteMaterial({
      map: glowTex(), color: color, transparent: true, blending: T.AdditiveBlending, depthWrite: false
    }));
    s.scale.set(size, size, 1); s.position.set(x, y, z);
    return s;
  }


  /* lofted body: stations of superellipse cross-sections along the length */
  function loft(stations, W, L, seg) {
    seg = seg || 28;
    var pos = [], idx = [], rings = [], i, j;
    for (i = 0; i < stations.length; i++) {
      var s = stations[i], a = Math.max(.001, s.w) * W / 2;
      var y0 = s.y0, y1 = s.y1, yc = (y0 + y1) / 2, b = Math.max(.001, (y1 - y0) / 2);
      var nt = s.nt || 2.5, nb = s.nb || 5;
      var ring = [];
      for (j = 0; j < seg; j++) {
        var t = j / seg * Math.PI * 2, cs = Math.cos(t), sn = Math.sin(t);
        var n = sn >= 0 ? nt : nb, e = 2 / n;
        ring.push([Math.sign(cs) * Math.pow(Math.abs(cs), e) * a,
                   Math.sign(sn) * Math.pow(Math.abs(sn), e) * b + yc,
                   s.z * L]);
      }
      rings.push(ring);
    }
    for (i = 0; i < rings.length; i++) for (j = 0; j < seg; j++) pos.push(rings[i][j][0], rings[i][j][1], rings[i][j][2]);
    for (i = 0; i < rings.length - 1; i++) {
      for (j = 0; j < seg; j++) {
        var a0 = i * seg + j, a1 = i * seg + (j + 1) % seg;
        var b0 = (i + 1) * seg + j, b1 = (i + 1) * seg + (j + 1) % seg;
        idx.push(a0, b0, b1, a0, b1, a1);
      }
    }
    var first = stations[0], last = stations[stations.length - 1];
    var cF = pos.length / 3; pos.push(0, (first.y0 + first.y1) / 2, first.z * L);
    var cR = pos.length / 3; pos.push(0, (last.y0 + last.y1) / 2, last.z * L);
    for (j = 0; j < seg; j++) {
      idx.push(cF, (j + 1) % seg, j);
      idx.push(cR, (rings.length - 1) * seg + j, (rings.length - 1) * seg + (j + 1) % seg);
    }
    var geo = new T.BufferGeometry();
    geo.setAttribute('position', new T.Float32BufferAttribute(pos, 3));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    return geo;
  }

  window.TKCARS = window.TKCARS || {};
  TKCARS.paint = paint; TKCARS.mat = mat; TKCARS.glass = glass; TKCARS.glowMat = glowMat;
  TKCARS.rbox = rbox; TKCARS.shell = shell; TKCARS.loft = loft; TKCARS.wheel = wheel; TKCARS.sprite = sprite;
  TKCARS.decal = decal; TKCARS.env = env;
})();
