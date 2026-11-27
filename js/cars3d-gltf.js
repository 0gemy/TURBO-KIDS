/* TURBO KIDS - car set from ready-made CC0 models.
   A) Kenney "Car Kit" (CC0) B) Kenney "Toy Car Kit" (CC0) C) Quaternius "Cars" (CC0). Files bundled under models/. */
(function () {
  'use strict';
  var T = window.THREE; if (!T || typeof CARS === 'undefined') return;
  var MD = 'models/';

  var MODELS = [
    { n: 'توي ريسر',      p: 0,    t: 'b', tex: 1, f: 't/vehicle-racer',          w: 1.55, l: 2.9, cls: 'لعبة سباق' },
    { n: 'دراج ريسر',     p: 120,  t: 'b', tex: 1, f: 't/vehicle-drag-racer',     w: 1.55, l: 3.1, cls: 'دراج' },
    { n: 'سبيدستر',       p: 180,  t: 'b', tex: 1, f: 't/vehicle-speedster',      w: 1.55, l: 2.9, cls: 'سبيدستر' },
    { n: 'ريسر لو',       p: 220,  t: 'b', tex: 1, f: 't/vehicle-racer-low',      w: 1.55, l: 2.9, cls: 'منخفضة' },
    { n: 'فينتاج',        p: 280,  t: 'b', tex: 1, f: 't/vehicle-vintage-racer',  w: 1.55, l: 3.0, cls: 'كلاسيك' },
    { n: 'مونستر توي',    p: 340,  t: 'b', tex: 1, f: 't/vehicle-monster-truck',  w: 1.65, l: 3.1, cls: 'مونستر' },
    { n: 'توي SUV',       p: 400,  t: 'b', tex: 1, f: 't/vehicle-suv',            w: 1.60, l: 3.0, cls: 'دفع رباعي' },
    { n: 'توي تراك',      p: 460,  t: 'b', tex: 1, f: 't/vehicle-truck',          w: 1.62, l: 3.1, cls: 'شاحنة' },

    { n: 'كراون سيدان',   p: 700,  t: 'a', tex: 1, f: 'sedan',           w: 1.84, l: 4.0, cls: 'سيدان' },
    { n: 'كوميت GT',      p: 780,  t: 'a', tex: 1, f: 'sedan-sports',    w: 1.82, l: 4.0, cls: 'كوبيه سبورت' },
    { n: 'ميني زيبرا',    p: 840,  t: 'a', tex: 1, f: 'hatchback-sports',w: 1.78, l: 3.8, cls: 'هاتشباك' },
    { n: 'تيتان 4x4',     p: 900,  t: 'a', tex: 1, f: 'suv',             w: 1.96, l: 4.0, cls: 'دفع رباعي' },
    { n: 'رابتور SUV',    p: 960,  t: 'a', tex: 1, f: 'suv-luxury',      w: 1.98, l: 4.1, cls: 'SUV فاخرة' },
    { n: 'كومبي فان',     p: 1020, t: 'a', tex: 1, f: 'van',             w: 1.94, l: 4.2, cls: 'فان' },
    { n: 'كاب تاكسي',     p: 1080, t: 'a', tex: 1, f: 'taxi',            w: 1.86, l: 4.1, cls: 'تاكسي' },
    { n: 'باترول',        p: 1140, t: 'a', tex: 1, f: 'police',          w: 1.88, l: 4.1, cls: 'شرطة' },
    { n: 'رينجر بيك أب',  p: 1200, t: 'a', tex: 1, f: 'truck-flat',      w: 1.94, l: 4.3, cls: 'بيك أب' },
    { n: 'دليفري',        p: 1260, t: 'a', tex: 1, f: 'delivery-flat',   w: 1.94, l: 4.3, cls: 'توصيل' },

    { n: 'أوريون',        p: 1600, t: 'c', f: 'q/NormalCar1',    w: 1.86, l: 4.2, cls: 'سيدان بريميوم' },
    { n: 'نيو أوريون',    p: 1750, t: 'c', f: 'q/NormalCar2',    w: 1.88, l: 4.2, cls: 'سيدان بريميوم' },
    { n: 'فولكان',        p: 1950, t: 'c', f: 'q/SportsCar',     w: 1.90, l: 4.2, cls: 'رياضية' },
    { n: 'فولكان X',      p: 2250, t: 'c', f: 'q/SportsCar2',    w: 1.92, l: 4.3, cls: 'رياضية' },
    { n: 'أوريون SUV',    p: 2500, t: 'c', f: 'q/SUV',           w: 1.98, l: 4.3, cls: 'SUV' },
    { n: 'أوريون تاكسي',  p: 2700, t: 'c', f: 'q/Taxi',          w: 1.88, l: 4.2, cls: 'تاكسي' },
    { n: 'أوريون كوب',    p: 3000, t: 'c', f: 'q/Cop',           w: 1.92, l: 4.3, cls: 'كوبي' }
  ];

  /* prices brought down to what a kid actually earns in a couple of levels */
  var ADDONS = [
    { id: 'sp_a', slot: 'spoiler', n: 'سبويلر كلاسيك', p: 160, f: 'debris-spoiler-a' },
    { id: 'sp_b', slot: 'spoiler', n: 'سبويلر جناح',   p: 240, f: 'debris-spoiler-b' },
    { id: 'pl_a', slot: 'roof',    n: 'لوح سقف',       p: 120, f: 'debris-plate-a' },
    { id: 'pl_b', slot: 'roof',    n: 'لوح سقف كبير',  p: 180, f: 'debris-plate-b' },
    { id: 'bm_a', slot: 'front',   n: 'بامبر أمامي',   p: 150, f: 'debris-bumper' },
    { id: 'hl_w', slot: 'head', n: 'LED أبيض', p: 180, light: { e: 0xffffff, lens: 0xdfefff }, c: '#ffffff', g: '#eaf6ff' },
    { id: 'hl_h', slot: 'head', n: 'هالوجين', p: 150, light: { e: 0xffd79a, lens: 0xfff1d0 }, c: '#ffe0b0', g: '#ffd79a' },
    { id: 'hl_x', slot: 'head', n: 'زينون', p: 220, light: { e: 0xcfe6ff, lens: 0xe9f4ff }, c: '#cfe6ff', g: '#a8d8ff' },
    { id: 'tl_r', slot: 'tail', n: 'أحمر', p: 170, light: { e: 0xff2b2b, lens: 0xd81b26 }, c: '#ff3b3b', g: '#ff3b3b' },
    { id: 'tl_s', slot: 'tail', n: 'مدخّن', p: 200, light: { e: 0xff3a3a, lens: 0x3a1418 }, c: '#7f2530', g: '#a8323a' },
    { id: 'tl_a', slot: 'tail', n: 'كهرماني', p: 190, light: { e: 0xffa21a, lens: 0xd97706 }, c: '#ffa21a', g: '#ffa21a' },
    { id: 'dc_num',  slot: 'deco', n: 'رقم ٧',  p: 100, d: 'num',  e: 'pearl' },
    { id: 'dc_eg',   slot: 'deco', n: 'علم مصر', p: 120, d: 'eg',  e: 'flag' },
    { id: 'dc_star', slot: 'deco', n: 'نجمة',   p: 100, d: 'star', e: 'spark' },
    { id: 'dc_str',  slot: 'deco', n: 'خطوط سباق', p: 140, d: 'stripe', e: 'bolt' },
    { id: 'dc_turbo', slot: 'deco', n: 'شعار تيربو', p: 130, d: 'turbo', e: 'crown' }
  ];
  window.TKADDONS = ADDONS;
  window.TKSETS = [
    { id: 'set_sport', n: 'طقم رياضي', d: 'أنوار LED + فوانيس حمرا + سبويلر', items: ['hl_w', 'tl_r', 'sp_b'], p: 460 },
    { id: 'set_classic', n: 'طقم كلاسيك', d: 'هالوجين + كهرماني + سبويلر كلاسيك', items: ['hl_h', 'tl_a', 'sp_a'], p: 420 }
  ];

  var cache = {}, pend = {};
  function load(dir, file, cb) {
    var key = (dir ? dir + '/' : '') + file;
    if (cache[key]) { cb(cache[key]); return; }
    if (pend[key]) { pend[key].push(cb); return; }
    pend[key] = [cb];
    new T.GLTFLoader().load(MD + key + '.glb', function (g) {
      cache[key] = g.scene;
      var q = pend[key] || []; pend[key] = null;
      q.forEach(function (f) { try { f(g.scene); } catch (e) {} });
    }, undefined, function () { pend[key] = null; });
  }

  /* calm the baked toy textures: less saturated, a touch lighter (problem 7) */
  function calmTex(tex) {
    try {
      if (!tex || !tex.image || tex.__calm) return tex;
      var img = tex.image, c = document.createElement('canvas');
      c.width = img.width || 256; c.height = img.height || 256;
      var g = c.getContext('2d');
      try { g.filter = 'saturate(.55) brightness(1.05)'; } catch (e) {}
      g.drawImage(img, 0, 0, c.width, c.height);
      var t2 = new T.CanvasTexture(c);
      t2.flipY = tex.flipY; t2.wrapS = tex.wrapS; t2.wrapT = tex.wrapT;
      t2.encoding = T.sRGBEncoding; t2.needsUpdate = true; t2.__calm = 1;
      return t2;
    } catch (e) { return tex; }
  }

  function cloneMats(root, tex) {
    root.traverse(function (o) {
      if (!o.isMesh) return;
      var arr = Array.isArray(o.material) ? o.material : [o.material];
      o.material = Array.isArray(o.material) ? arr.map(function (m) { return m.clone(); }) : arr[0].clone();
      o.castShadow = true;
      (Array.isArray(o.material) ? o.material : [o.material]).forEach(function (m) {
        if (m.map) { m.map.encoding = T.sRGBEncoding; if (tex) m.map = calmTex(m.map); }
        m.metalness = .3; m.roughness = .5;
      });
      /* softer shading on the chunky toy cars */
      if (tex && o.geometry && o.geometry.attributes && o.geometry.attributes.position) {
        try { o.geometry = o.geometry.clone(); o.geometry.computeVertexNormals(); } catch (e) {}
      }
    });
  }

  function prep(src, cfg) {
    var root = src.clone(true);
    cloneMats(root, cfg.tex);
    root.updateMatrixWorld(true);
    var bb = new T.Box3().setFromObject(root), sz = bb.getSize(new T.Vector3());
    var s = cfg.l / sz.z;
    var holder = new T.Group();
    root.scale.setScalar(s);
    root.position.set(-(bb.min.x + sz.x / 2) * s, -bb.min.y * s, -(bb.min.z + sz.z / 2) * s);
    holder.add(root);
    holder.rotation.y = cfg.t === 'c' ? Math.PI : 0; /* front must face -z: the race camera sits behind the car at +z (Quaternius models face +z natively, Kenney -z) */
    holder.userData.wheels = [];
    holder.userData.bodyMats = [];
    root.traverse(function (o) {
      if (!o.isMesh) return;
      var nm = (o.name || '').toLowerCase();
      var mats = Array.isArray(o.material) ? o.material : [o.material];
      if (/wheel|tire|tyre/.test(nm)) holder.userData.wheels.push(o);
      else if (/glass|window|windshield/.test(nm)) { mats.forEach(function (m) { m.transparent = true; m.opacity = .55; }); }
      else mats.forEach(function (m) {
        var mn = (m.name || '').toLowerCase();
        if (/window|glass|black|grey|gray|light|lamp|tyre|tire|wheel|rubber|chrome|metal|plate/.test(mn)) return;
        holder.userData.bodyMats.push(m);
      });
    });
    return holder;
  }

  function toHex(c) {
    if (c == null) return 0xffffff;
    if (typeof c === 'number') return c;
    if (typeof c === 'string') {
      var t = c.trim().replace('#', '');
      if (t.length === 3) t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2];
      var n = parseInt(t, 16);
      return isNaN(n) ? 0xffffff : n;
    }
    return 0xffffff;
  }

  function finCode() { try { return (typeof S !== 'undefined' && S && S.fin) || 'g'; } catch (e) { return 'g'; } }

  function tint(holder, color) {
    var hex = toHex(color), f = finCode();
    holder.userData.bodyMats.forEach(function (m) {
      if (!m || !m.color || m.map) return;
      m.color.setHex(hex);
      if (m.metalness == null) return;
      if (f === 'm') { m.metalness = .05; m.roughness = .86; }
      else if (f === 's') { m.metalness = .12; m.roughness = .48; }
      else if (f === 'x') { m.metalness = .9; m.roughness = .18; }
      else if (f === 'p') { m.metalness = .2; m.roughness = .10; }
      else { m.metalness = .3; m.roughness = .28; }
      if ('clearcoat' in m) { m.clearcoat = (f === 'm' || f === 's') ? .15 : 1; m.clearcoatRoughness = (f === 'm') ? .5 : .08; }
      m.needsUpdate = true;
    });
  }

  function partOf(slot) {
    var st = null;
    try { if (typeof S !== 'undefined' && S) st = S; } catch (e) {}
    if (!st && window.S) st = window.S;
    var eq = (st && st.addon) || {};
    var id = eq[slot];
    if (!id) return null;
    for (var i = 0; i < ADDONS.length; i++) if (ADDONS[i].id === id) return ADDONS[i];
    return null;
  }

  function glowSprite(color, size, x, y, z) {
    if (!glowSprite.tex) {
      var c = document.createElement('canvas'); c.width = c.height = 64;
      var g2 = c.getContext('2d');
      var rg = g2.createRadialGradient(32, 32, 1, 32, 32, 32);
      rg.addColorStop(0, 'rgba(255,255,255,1)');
      rg.addColorStop(.35, 'rgba(255,255,255,.55)');
      rg.addColorStop(1, 'rgba(255,255,255,0)');
      g2.fillStyle = rg; g2.fillRect(0, 0, 64, 64);
      glowSprite.tex = new T.CanvasTexture(c);
    }
    var sp = new T.Sprite(new T.SpriteMaterial({
      map: glowSprite.tex, color: color, transparent: true, opacity: .85,
      blending: T.AdditiveBlending, depthWrite: false
    }));
    sp.scale.set(size, size, 1);
    sp.position.set(x, y, z);
    sp.userData.ex = 1;
    return sp;
  }

  function tintLamp(root, L) {
    root.traverse(function (o) {
      if (!o.isMesh) return;
      var arr = Array.isArray(o.material) ? o.material : [o.material];
      o.material = Array.isArray(o.material) ? arr.map(function (m) { return m.clone(); }) : arr[0].clone();
      (Array.isArray(o.material) ? o.material : [o.material]).forEach(function (m) {
        var n = ((o.name || '') + ' ' + (m.name || '')).toLowerCase();
        if (/glow|light/.test(n)) {
          if (m.emissive) { m.emissive = new T.Color(L.e); m.emissiveIntensity = 2.4; m.toneMapped = false; }
          m.color = new T.Color(L.e);
        } else if (/glass|lens/.test(n)) {
          m.color = new T.Color(L.lens); if (m.transparent) m.opacity = .9;
        }
      });
    });
  }

function fitLamp(grp,slot,fz,fr,useRay){
 grp.updateMatrixWorld(true);
 var inv=new T.Matrix4().copy(grp.matrixWorld).invert(),v=new T.Vector3(),P=[];
 grp.traverse(function(o){ if(!o.isMesh||o.userData.ex||(o.parent&&o.parent.userData&&o.parent.userData.ex))return;
  var q=o,sk=0;while(q&&q!==grp){if(q.userData&&q.userData.ex)sk=1;q=q.parent}if(sk)return;
  var nm=(o.name||"").toLowerCase();var pn=(o.parent&&o.parent.name||"").toLowerCase();
  if(/wheel|tire|tyre/.test(nm+" "+pn))return;
  var pos=o.geometry&&o.geometry.attributes.position;if(!pos)return;
  var m=new T.Matrix4().multiplyMatrices(inv,o.matrixWorld),st=Math.max(1,Math.floor(pos.count/30000));
  for(var i=0;i<pos.count;i+=st){v.fromBufferAttribute(pos,i).applyMatrix4(m);P.push(v.x,v.y,v.z)}});
 var n=P.length/3,mnY=1e9,mxY=-1e9,mnZ=1e9,mxZ=-1e9;
 for(var i=0;i<n;i++){var y=P[i*3+1],z=P[i*3+2];if(y<mnY)mnY=y;if(y>mxY)mxY=y;if(z<mnZ)mnZ=z;if(z>mxZ)mxZ=z}
 var H=mxY-mnY,Lz=mxZ-mnZ,yc=mnY+H*fr,band=H*.09;
 var endZ=fz>0?mxZ:mnZ,hw=0;
 for(i=0;i<n;i++){var y2=P[i*3+1];if(Math.abs(y2-yc)>band)continue;var z2=P[i*3+2];if(Math.abs(z2-endZ)>Lz*.22)continue;var ax=Math.abs(P[i*3]);if(ax>hw)hw=ax}
 if(!hw)hw=H;
 var lx=hw*.64,sz=endZ,yc2=yc;
 var meshes=[];grp.traverse(function(o){if(!o.isMesh)return;var q=o,sk=0;while(q&&q!==grp){if(q.userData&&q.userData.ex)sk=1;q=q.parent}if(sk)return;var nm=(o.name||"").toLowerCase()+" "+((o.parent&&o.parent.name)||"").toLowerCase();if(/wheel|tire|tyre/.test(nm))return;meshes.push(o)});
 var RC=new T.Raycaster(),runs=[],cur=null;
 for(var k=0;k<=36;k++){var yy=mnY+H*(.20+k*.014*1.0*(0.5/0.5)*1);if(yy>mnY+H*.70)break;
  var o3=new T.Vector3(useRay?hw*.35:lx,yy,endZ+fz*3).applyMatrix4(grp.matrixWorld),d3=new T.Vector3(0,0,-fz).transformDirection(grp.matrixWorld);
  RC.set(o3,d3);var hs=RC.intersectObjects(meshes,false),ok=0,hz=0;
  if(hs.length){var hp=grp.worldToLocal(hs[0].point.clone());var nn=hs[0].face.normal.clone().transformDirection(hs[0].object.matrixWorld).transformDirection(inv.clone().transpose().invert?new T.Matrix4():new T.Matrix4());
   var nl=hs[0].face.normal.clone().transformDirection(hs[0].object.matrixWorld);var nz=nl.clone().transformDirection(inv).z;
   hz=hp.z;ok=(fz*nz>.75)&&(fz*(hz-endZ)>-Lz*.16);}
  if(ok){if(!cur){cur={y0:yy,y1:yy,z:hz};runs.push(cur)}else{cur.y1=yy;cur.z=Math.max(cur.z*fz,hz*fz)*fz}}else cur=null;}
 if(runs.length&&useRay){var r=runs[runs.length-1];yc2=(r.y0+r.y1)/2+H*.045;sz=r.z;
  var best=0;for(var xs=.95;xs>=.3;xs-=.05){var oo=new T.Vector3(hw*xs,yc2,endZ+fz*3).applyMatrix4(grp.matrixWorld),dd=new T.Vector3(0,0,-fz).transformDirection(grp.matrixWorld);RC.set(oo,dd);var hh=RC.intersectObjects(meshes,false);
   if(hh.length){var pp=grp.worldToLocal(hh[0].point.clone());var nzz=hh[0].face.normal.clone().transformDirection(hh[0].object.matrixWorld).transformDirection(inv).z;
    if(fz*nzz>.6&&fz*(pp.z-endZ)>-Lz*.16){best=xs;sz=pp.z;break}}}
  lx=hw*(best||.45)*.78;
  var o4=new T.Vector3(lx,yc2,endZ+fz*3).applyMatrix4(grp.matrixWorld),d4=new T.Vector3(0,0,-fz).transformDirection(grp.matrixWorld);RC.set(o4,d4);var h4=RC.intersectObjects(meshes,false);if(h4.length){var p4=grp.worldToLocal(h4[0].point.clone());if(fz*(p4.z-endZ)>-Lz*.16)sz=p4.z}}
 else{sz=endZ-fz*Lz*.05;}
 yc=yc2;
 return {endZ:endZ,mnZ:mnZ,mxZ:mxZ,mnY:mnY,nrun:runs.length,x:lx,y:yc,z:sz,hw:hw,H:H,edge:(typeof best!=='undefined'&&best?hw*best:hw)};
}


var GT=null;
function glowTex(){if(GT)return GT;var c=document.createElement("canvas");c.width=c.height=64;var g=c.getContext("2d"),r=g.createRadialGradient(32,32,0,32,32,32);
 r.addColorStop(0,"rgba(255,255,255,1)");r.addColorStop(.25,"rgba(255,255,255,.45)");r.addColorStop(.6,"rgba(255,255,255,.1)");r.addColorStop(1,"rgba(255,255,255,0)");g.fillStyle=r;g.fillRect(0,0,64,64);GT=new T.CanvasTexture(c);return GT}
function addGlow(m,slot,fz,F,def){
 var col=new T.Color(def.e),head=slot==="head",ls=head?F.hw*.55:F.hw*.45;
 [-1,1].forEach(function(sx){
  var sp=new T.Sprite(new T.SpriteMaterial({map:glowTex(),color:col,transparent:true,opacity:head?.34:.4,blending:T.AdditiveBlending,depthWrite:false}));
  sp.scale.set(ls,ls*.7,1);sp.position.set(sx*F.x,F.y,F.z+fz*.1);sp.userData.ex=1;m.add(sp);
  var pl=new T.Mesh(new T.PlaneGeometry(1,1),new T.MeshBasicMaterial({map:glowTex(),color:col,transparent:true,opacity:head?.16:.13,blending:T.AdditiveBlending,depthWrite:false}));
  pl.rotation.x=-Math.PI/2;var len=head?F.hw*1.9:F.hw*1.0;pl.scale.set(F.hw*(head?.95:.7),len,1);pl.position.set(sx*F.x,.04,F.z+fz*len*.42);pl.userData.ex=1;m.add(pl);
 });
}

  function placeLights(group, cfg, a) {
    var L = a.light, slot = a.slot === 'head' ? 'head' : 'tail';
    var def = { e: L.e, lens: L.lens };
    load('lights', slot === 'head' ? 'headlight' : 'taillight', function (src) {
      if (!group.parent && !group.userData) return;
      var tc = cfg.t === 'c', fz = (slot === 'head' ? -1 : 1) * (tc ? -1 : 1);
      var F = fitLamp(group, slot, fz, tc ? (slot === 'head' ? .38 : .46) : (slot === 'head' ? (cfg.t === 'a' ? .40 : .47) : .50), !tc);
      window.__F = window.__F || {}; window.__F[slot] = F;
      [-1, 1].forEach(function (sx) {
        var c = src.clone(true);
        var b0 = new T.Box3().setFromObject(c), s0 = b0.getSize(new T.Vector3());
        var kk = tc ? 1.0 : .95;
        var s = Math.min((F.edge - F.x) * 1.7 * kk / Math.max(.001, s0.x), F.hw * (slot === 'head' ? .40 : .34) * kk / Math.max(.001, s0.x), F.H * (slot === 'head' ? .17 : .15) * kk / Math.max(.001, s0.y));
        c.scale.set(sx * s, s, s);
        c.rotation.y = tc ? 0 : Math.PI;
        var b1 = new T.Box3().setFromObject(c), dz = (b1.max.z - b1.min.z);
        var pz = F.z - fz * dz * (tc ? .30 : .12);
        c.position.set(sx * F.x - (b1.min.x + b1.max.x) / 2, F.y - (b1.min.y + b1.max.y) / 2, pz - (b1.min.z + b1.max.z) / 2);
        tintLamp(c, def); c.userData.ex = 1; group.add(c);
      });
      addGlow(group, slot, fz, F, { e: L.e });
    });
  }

  var DTEX = {};
  function decalTex(kind) {
    if (DTEX[kind]) return DTEX[kind];
    var c = document.createElement('canvas'); c.width = c.height = 256;
    var g = c.getContext('2d');
    g.clearRect(0, 0, 256, 256);
    if (kind === 'num') {
      g.fillStyle = '#f2f4f6'; g.beginPath(); g.arc(128, 128, 104, 0, 7); g.fill();
      g.strokeStyle = '#1b1e23'; g.lineWidth = 12; g.stroke();
      g.fillStyle = '#1b1e23'; g.font = 'bold 150px Cairo,system-ui,sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
      g.fillText('7', 128, 138);
    } else if (kind === 'eg') {
      g.fillStyle = '#ce1126'; g.fillRect(20, 70, 216, 38);
      g.fillStyle = '#ffffff'; g.fillRect(20, 108, 216, 38);
      g.fillStyle = '#111111'; g.fillRect(20, 146, 216, 38);
    } else if (kind === 'star') {
      g.fillStyle = '#f2a01f'; g.beginPath();
      for (var i = 0; i < 10; i++) {
        var r = i % 2 ? 46 : 108, a = -Math.PI / 2 + i * Math.PI / 5;
        var x = 128 + Math.cos(a) * r, y = 128 + Math.sin(a) * r;
        i ? g.lineTo(x, y) : g.moveTo(x, y);
      }
      g.closePath(); g.fill();
    } else if (kind === 'stripe') {
      g.fillStyle = '#1b1e23'; g.fillRect(0, 0, 256, 256);
    } else if (kind === 'turbo') {
      g.fillStyle = '#f2a01f'; g.font = 'bold 64px Cairo,system-ui,sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
      g.fillText('TURBO', 128, 128);
    }
    var t = new T.CanvasTexture(c); t.anisotropy = 4; t.encoding = T.sRGBEncoding;
    DTEX[kind] = t; return t;
  }

  function placeDecals(group, cfg, a) {
    var W = cfg.w || 1.8, L = cfg.l || 4, H = cfg.h || 1.1, kind = a.d || 'star';
    var mat = new T.MeshBasicMaterial({ map: decalTex(kind), transparent: true, depthWrite: false, side: T.DoubleSide });
    function top(w, h, x, z) {
      var m = new T.Mesh(new T.PlaneGeometry(w, h), mat);
      m.position.set(x, H * 1.012, z); m.rotation.x = -Math.PI / 2; m.userData.ex = 1; group.add(m);
    }
    function side(w, h, sx) {
      var m = new T.Mesh(new T.PlaneGeometry(w, h), mat);
      m.position.set(sx * (W * .5 + .008), H * .52, 0); m.rotation.y = sx * Math.PI / 2; m.userData.ex = 1; group.add(m);
    }
    if (kind === 'stripe') {
      [-.085, .085].forEach(function (dx) { top(W * .12, L * .62, dx * W, 0); });
      return;
    }
    top(W * .34, W * .34, 0, 0);
    if (kind !== 'turbo') { side(W * .34, W * .34, 1); side(W * .34, W * .34, -1); }
  }

  function placeAddons(group, cfg) {
    var deco = partOf('deco');
    if (deco) placeDecals(group, cfg, deco);
    ['head', 'tail'].forEach(function (slot) {
      var a = partOf(slot); if (!a || !a.light) return;
      placeLights(group, cfg, a);
    });
    ['spoiler', 'roof', 'front'].forEach(function (slot) {
      var a = partOf(slot); if (!a) return;
      load('', a.f, function (src) {
        var m = src.clone(true); cloneMats(m);
        var bb = new T.Box3().setFromObject(m), sz = bb.getSize(new T.Vector3());
        var W = cfg.w || 1.8, LEN = cfg.l || 4, H = cfg.h || 1.1;
        var target = slot === 'spoiler' ? W * .45 : slot === 'roof' ? W * .34 : W * .70;
        var s = target / Math.max(.01, sz.x);
        m.scale.setScalar(s);
        var y, z;
        var fl = cfg.t === 'c' ? -1 : 1;
        if (slot === 'spoiler') { y = H * .70; z = LEN * .30 * fl; }
        else if (slot === 'roof') { y = H * .97; z = 0; }
        else { y = H * .18; z = -LEN * .45 * fl; }
        if (fl < 0) m.rotation.y = Math.PI;
        m.position.set(0, y, z);
        m.userData.ex = 1;
        group.add(m);
      });
    });
  }

  CARS.length = 0;
  MODELS.forEach(function (m) {
    CARS.push({ n: m.n, p: m.p, k: 'model', w: m.w, l: m.l, cls: m.cls, tier: m.t, tex: m.tex ? 1 : 0 });
  });

  function placeholder(cfg) {
    var g = new T.Group();
    var b = new T.Mesh(new T.BoxGeometry(cfg.w * .9, .55, cfg.l), new T.MeshStandardMaterial({ color: 0x233247 }));
    b.position.y = .5; g.add(b);
    g.userData.wheels = []; g.userData.bodyMats = [];
    return g;
  }

  function build(idx, color) {
    var cfg = MODELS[idx] || MODELS[0];
    var g;
    if (cache[cfg.f]) {
      g = prep(cache[cfg.f], cfg);
      tint(g, color);
      if (!cfg.h) {
        var bb = new T.Box3().setFromObject(g), sz = bb.getSize(new T.Vector3());
        cfg.h = Math.max(.6, sz.y);
        if (!cfg.w) cfg.w = Math.max(.6, sz.x);
        if (!cfg.l) cfg.l = Math.max(1, sz.z);
      }
    } else {
      load('', cfg.f, function (src) {
        cache[cfg.f] = src;
        try {
          if (window.__carLoaded) window.__carLoaded(idx);
          if (typeof applyCar === 'function') applyCar();
        } catch (e) {}
      });
      g = placeholder(cfg);
    }
    placeAddons(g, cfg);
    return g;
  }

  var impl = function (idx, color) { return build(idx, color); };
  window.buildCarGroup = impl;
  [0, 200, 900, 2500].forEach(function (d) { setTimeout(function () { window.buildCarGroup = impl; }, d); });

  try {
    if (typeof S !== 'undefined' && S && S.carSetV !== 'v2') {
      S.cars = [0]; S.car = 0; S.carSetV = 'v2'; S.addon = S.addon || {}; S.eqG = ''; S.eqR = ''; S.eqA = []; S.addonsOwned = S.addonsOwned || [];
      if (typeof sv === 'function') sv();
    }
  } catch (e) {}

  window.addEventListener('load', function () {
    MODELS.forEach(function (m, i) {
      if (!cache[m.f]) load('', m.f, function (src) {
        cache[m.f] = src;
        try { if (typeof applyCar === 'function') applyCar(); } catch (e) {}
      });
    });
  });

  /* add-ons live in the garage now: drop the old shop add-on + underglow items */
  function stripShop() {
    try {
      document.querySelectorAll('[data-tab="c"]').forEach(function (b) { b.style.display = 'none'; });
      if (typeof CITEMS !== 'undefined' && CITEMS && CITEMS.length) {
        for (var i = CITEMS.length - 1; i >= 0; i--) {
          var it = CITEMS[i];
          if (it && (it.g === 'ac' || it.g === 'gl')) CITEMS.splice(i, 1);
        }
      }
      /* under-car glow is gone for good: no saved choice can bring it back */
      if (typeof S !== 'undefined' && S) { if (S.eqG) S.eqG = ''; if (S.eqR) S.eqR = ''; }
      if (typeof shopTab !== 'undefined' && shopTab === 'c') { try { shopTab = 't'; renderWorldShop && renderWorldShop(); } catch (e) {} }
    } catch (e) {}
  }
  setTimeout(stripShop, 600);
  setTimeout(stripShop, 1500);
  setInterval(stripShop, 4000);
})();
