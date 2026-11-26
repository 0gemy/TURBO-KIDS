/* TURBO KIDS 2: graphics upgrade (loaded last).
 * 1. Glossy reflections (generated environment map), richer light, textured road and ground, vignette.
 * 2. Rebuilt car look: smooth curvy bodies, tinted glass, real tires and spoked rims,
 *    mirrors, grilles, glowing lights, under-glow.
 * 3. New vehicles: police, ambulance, fire truck, taxi, ice cream van, lunar rover, dune buggy, cyber truck.
 * Everything is generated locally with Three.js. No downloads, no API. */
(function(){
'use strict';
const T=THREE;
const LIGHT=window.__gfxTier!=='high'; // phones: keep the original look and cost, only add the new cars cheaply

/* ---------- helpers ---------- */
function chaikin(pts,n){for(let k=0;k<n;k++){const o=[];for(let i=0;i<pts.length;i++){const a=pts[i],b=pts[(i+1)%pts.length];o.push(new T.Vector2(a.x*.75+b.x*.25,a.y*.75+b.y*.25),new T.Vector2(a.x*.25+b.x*.75,a.y*.25+b.y*.75))}pts=o}return pts}
function smoothShape(s){let p=s.getPoints();if(p.length>2&&p[0].distanceTo(p[p.length-1])<1e-6)p.pop();p=chaikin(p,2);const n=new T.Shape();p.forEach((q,i)=>i?n.lineTo(q.x,q.y):n.moveTo(q.x,q.y));return n}
function canvasTex(w,h,draw,rep){const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;if(rep)t.repeat.set(rep[0],rep[1]);t.anisotropy=4;return t}
let glowTex;function glow(){if(glowTex)return glowTex;glowTex=canvasTex(64,64,(g)=>{const r=g.createRadialGradient(32,32,0,32,32,32);r.addColorStop(0,'rgba(255,255,255,1)');r.addColorStop(.35,'rgba(255,255,255,.45)');r.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=r;g.fillRect(0,0,64,64)});glowTex.wrapS=glowTex.wrapT=T.ClampToEdgeWrapping;return glowTex}

/* ---------- environment map (studio sky) ---------- */
const ENVS=new WeakMap();
function makeEnv(renderer){
  if(!renderer||!T.PMREMGenerator)return null;
  if(ENVS.has(renderer))return ENVS.get(renderer);
  let ENV=null;
  try{
    const s=new T.Scene();
    const sg=new T.SphereGeometry(50,32,16),cols=[];const top=new T.Color(.35,.62,1),hor=new T.Color(1,.95,.88),bot=new T.Color(.18,.22,.2),pos=sg.attributes.position;
    for(let i=0;i<pos.count;i++){const y=pos.getY(i)/50,c=y>0?hor.clone().lerp(top,Math.pow(y,.55)):hor.clone().lerp(bot,Math.pow(-y,.45));cols.push(c.r,c.g,c.b)}
    sg.setAttribute('color',new T.Float32BufferAttribute(cols,3));
    const sky=new T.Mesh(sg,new T.MeshBasicMaterial({vertexColors:true,side:T.BackSide}));
    s.add(sky);
    const panel=(w,h,x,y,z,i)=>{const m=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({color:new T.Color(i,i,i),side:T.DoubleSide}));m.position.set(x,y,z);m.lookAt(0,0,0);s.add(m)};
    panel(18,5,0,22,10,6);panel(6,14,-30,8,0,3.5);panel(6,14,30,8,0,3.5);panel(24,3,0,10,-32,4);
    const pm=new T.PMREMGenerator(renderer);ENV=pm.fromScene(s,0.02).texture;pm.dispose();
  }catch(e){console.warn('env map skipped',e)}
  ENVS.set(renderer,ENV);return ENV;
}

/* ---------- road / ground textures ---------- */
function roadTexture(){return canvasTex(256,512,(g,w,h)=>{
  g.fillStyle='#6f7889';g.fillRect(0,0,w,h);
  for(let i=0;i<9000;i++){const v=140+Math.random()*70|0;g.fillStyle='rgba('+v+','+v+','+(v+8)+','+(.18+Math.random()*.25)+')';g.fillRect(Math.random()*w,Math.random()*h,1+Math.random()*2,1+Math.random()*2)}
  g.fillStyle='rgba(255,255,255,.75)';g.fillRect(6,0,5,h);g.fillRect(w-11,0,5,h);
  g.fillStyle='rgba(0,0,0,.14)';g.fillRect(0,0,6,h);g.fillRect(w-6,0,6,h);
  const grd=g.createLinearGradient(0,0,w,0);grd.addColorStop(0,'rgba(0,0,0,.18)');grd.addColorStop(.18,'rgba(0,0,0,0)');grd.addColorStop(.82,'rgba(0,0,0,0)');grd.addColorStop(1,'rgba(0,0,0,.18)');g.fillStyle=grd;g.fillRect(0,0,w,h)})}
function grassTexture(){return canvasTex(256,256,(g,w,h)=>{
  g.fillStyle='#bdbdbd';g.fillRect(0,0,w,h);
  for(let i=0;i<5000;i++){const v=170+Math.random()*85|0;g.fillStyle='rgba('+v+','+v+','+v+','+(.25+Math.random()*.4)+')';g.fillRect(Math.random()*w,Math.random()*h,1+Math.random()*2,2+Math.random()*4)}
  for(let i=0;i<40;i++){g.fillStyle='rgba(255,255,255,.18)';g.beginPath();g.arc(Math.random()*w,Math.random()*h,6+Math.random()*16,0,7);g.fill()}},[10,3])}

/* ---------- scene upgrade (runs once the game scene exists) ---------- */
let sceneDone=false;
function upgradeScene(){
  if(sceneDone||typeof sc==='undefined'||!sc||typeof R==='undefined'||!R||!tiles||!tiles.length)return;
  sceneDone=true;
  try{R.toneMapping=T.ACESFilmicToneMapping;R.toneMappingExposure=.95}catch(e){}
  const env=makeEnv(R);if(env){sc.environment=env;if('environmentIntensity' in sc)sc.environmentIntensity=.6}
  // light: warm sun key + cool sky fill
  sc.traverse(o=>{
    if(o.isHemisphereLight){o.intensity=.55;o.color.set(0xeaf4ff);o.groundColor.set(0x6b8f5a)}
    if(o.isDirectionalLight){o.intensity=.95;o.color.set(0xfff1d6)}
  });
  const rim=new T.DirectionalLight(0x9ec9ff,.35);rim.position.set(-6,4,-8);sc.add(rim);
  // road + ground textures
  const rt=(upgradeScene.rt=upgradeScene.rt||roadTexture()),gt=(upgradeScene.gt=upgradeScene.gt||grassTexture());
  rt.repeat.set(1,1);
  tiles.forEach(g=>{
    const a=g.children[0],b=g.children[1];
    if(a&&a.material&&!a.material.userData.gfx){a.material.map=gt;a.material.userData.gfx=1;a.material.needsUpdate=true}
    if(b&&b.material&&!b.material.userData.road){b.material.map=rt;b.material.userData.road=1;b.material.needsUpdate=true}
  });
  // vignette + soft light
  if(!document.getElementById('gfx-vig')){
    const d=document.createElement('div');d.id='gfx-vig';
    d.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:3;background:radial-gradient(ellipse at 50% 55%,rgba(0,0,0,0) 58%,rgba(8,12,30,.38) 100%),linear-gradient(180deg,rgba(255,236,190,.10),rgba(255,236,190,0) 35%)';
    document.body.appendChild(d);
  }
}
function garageEnv(){
  try{
    [[typeof gxR!=='undefined'&&gxR,typeof gxS!=='undefined'&&gxS],[typeof gxTR!=='undefined'&&gxTR,typeof gxTS!=='undefined'&&gxTS],[typeof garageRenderer!=='undefined'&&garageRenderer,typeof garageScene!=='undefined'&&garageScene]].forEach(([r,sn])=>{
      if(!r||!sn||sn.userData.gfxEnv)return;sn.userData.gfxEnv=1;
      const e=makeEnv(r);if(e)sn.environment=e;
      sn.traverse(o=>{if(o.isHemisphereLight)o.intensity*=.5;if(o.isDirectionalLight)o.intensity*=.65});
      r.toneMapping=T.ACESFilmicToneMapping;r.toneMappingExposure=.95;
    });
  }catch(e){}
}
if(!LIGHT){setInterval(upgradeScene,400);setInterval(garageEnv,300);}
// themes can swap materials: re-apply road/grass maps if needed
if(!LIGHT)setInterval(()=>{if(!sceneDone)return;try{
  const rt=tiles[0]&&tiles[0].children[1]&&tiles[0].children[1].material.map;
  if(!rt&&tiles.length){sceneDone=false;upgradeScene()}
}catch(e){}},2500);

/* ---------- vehicle upgrade ---------- */
const GLASS=0x223344;
function mat(c,o){return new T.MeshStandardMaterial(Object.assign({color:c,roughness:.5,metalness:.2},o||{}))}
const TIRE=new T.MeshStandardMaterial({color:0x14161b,roughness:.85,metalness:0});
const CHROME=new T.MeshStandardMaterial({color:0xf2f4f8,roughness:.12,metalness:1,envMapIntensity:1.4});
const DARKM=new T.MeshStandardMaterial({color:0x1b1f27,roughness:.55,metalness:.4});
const GLASSM=()=>window.__gfxTier==='low'?new T.MeshStandardMaterial({color:0x0b1a2e,roughness:.2,metalness:.8}):new T.MeshPhysicalMaterial({color:0x0b1a2e,roughness:.04,metalness:.9,clearcoat:1,clearcoatRoughness:.03,envMapIntensity:1.8});
const HEADM=new T.MeshStandardMaterial({color:0xfff6d0,emissive:0xffe8a0,emissiveIntensity:2.2,roughness:.2});
const TAILM=new T.MeshStandardMaterial({color:0xff2020,emissive:0xff1010,emissiveIntensity:2,roughness:.3});
function tireGeo(rr){
  const pts=[],r0=rr*.58,hw=.17,N=6;
  pts.push(new T.Vector2(r0,-hw*.9));
  for(let i=0;i<=N;i++){const a=-Math.PI/2+i*Math.PI/N;pts.push(new T.Vector2(rr*.9+Math.cos(a)*rr*.1,Math.sin(a)*hw*.9))}
  pts.push(new T.Vector2(r0,hw*.9));
  return new T.LatheGeometry(pts,28);
}
function upgradeWheel(w,rr,rimColor){
  // wheel mesh: cylinder with local Y as the axle
  w.geometry.dispose();w.geometry=tireGeo(rr);w.material=TIRE;
  while(w.children.length){const ch=w.children.pop();if(ch.geometry)ch.geometry.dispose()}
  const rc=rimColor!=null?new T.MeshStandardMaterial({color:rimColor,emissive:rimColor,emissiveIntensity:.35,metalness:.85,roughness:.22,envMapIntensity:1.4}):CHROME;
  const base=new T.Mesh(new T.CylinderGeometry(rr*.66,rr*.66,.3,28),DARKM);w.add(base);
  for(const sy of[-1,1]){
    const lip=new T.Mesh(new T.TorusGeometry(rr*.62,rr*.05,8,32),CHROME);lip.rotation.x=Math.PI/2;lip.position.y=sy*.15;w.add(lip);
    for(let k=0;k<6;k++){const sp=new T.Mesh(new T.BoxGeometry(rr*.13,.04,rr*.58),rc);sp.position.set(Math.sin(k*Math.PI/3)*rr*.31,sy*.155,Math.cos(k*Math.PI/3)*rr*.31);sp.rotation.y=k*Math.PI/3;w.add(sp)}
    const hub=new T.Mesh(new T.CylinderGeometry(rr*.16,rr*.16,.05,16),CHROME);hub.position.y=sy*.17;w.add(hub);
  }
  const disc=new T.Mesh(new T.CylinderGeometry(rr*.5,rr*.5,.2,20),new T.MeshStandardMaterial({color:0x8a8f99,metalness:.9,roughness:.35}));w.add(disc);
}
function boxM(g,w,h,l,m,x,y,z){const e=new T.Mesh(new T.BoxGeometry(w,h,l),m);e.position.set(x,y,z);g.add(e);return e}
function cylM(g,rt,rb,h,m,x,y,z,rx,ry,rz){const e=new T.Mesh(new T.CylinderGeometry(rt,rb,h,16),m);e.position.set(x,y,z);e.rotation.set(rx||0,ry||0,rz||0);g.add(e);return e}
function sprite(g,color,x,y,z,s,op){if(window.__gfxTier==='low')return {position:{set(){}},scale:{set(){}},material:{}};const m=new T.Sprite(new T.SpriteMaterial({map:glow(),color:color,transparent:true,opacity:op,blending:T.AdditiveBlending,depthWrite:false}));m.position.set(x,y,z);m.scale.set(s,s,1);g.add(m);return m}

function decorate(g,c){
  const M=g.userData.m;if(!M)return;const {L,W,bt,h}=M;
  // find glass bbox
  let gb=null;g.traverse(o=>{if(o.isMesh&&o.material&&o.material.color&&o.material.color.getHex()===GLASS&&!gb){o.geometry.computeBoundingBox();gb=o.geometry.boundingBox.clone();gb.translate(o.position)}});
  if(!gb)return;
  const gy0=gb.min.y,gy1=gb.max.y,gz0=gb.min.z,gz1=gb.max.z;
  // glass material swap
  g.traverse(o=>{if(o.isMesh&&o.material&&o.material.color&&o.material.color.getHex()===GLASS){o.material=GLASSM()}});
  const flat=['bus','tank','monster'].includes(c.k);
  for(const s of[-1,1]){
    // side mirror
    boxM(g,.05,.04,.14,DARKM,s*(W/2+.08),gy0+.12,gz0+.18).rotation.y=s*.2;
    const mir=boxM(g,.1,.1,.16,DARKM,s*(W/2+.15),gy0+.17,gz0+.2);
    // door seams and handle
    boxM(g,.012,Math.max(.1,gy0-bt-.02),.014,DARKM,s*(W/2+.012),(gy0+bt)/2,gz0+.05);
    boxM(g,.012,Math.max(.1,gy0-bt-.02),.014,DARKM,s*(W/2+.012),(gy0+bt)/2,(gz0+gz1)/2+.15);
    boxM(g,.02,.025,.12,CHROME,s*(W/2+.02),gy0-.06,(gz0+gz1)/2-.05);
    // headlight glow + lens
    const hz=-L/2-.05,hy=bt+h*.5;
    const lens=new T.Mesh(new T.SphereGeometry(.13,12,10),HEADM);lens.scale.set(1.5,.7,.6);lens.position.set(s*W*.33,hy,hz);g.add(lens);
    sprite(g,0xfff1b8,s*W*.33,hy,hz-.12,.7,.4);
    // tail glow
    sprite(g,0xff3030,s*W*.3,bt+h*.65,L/2+.1,.9,.5);
  }
  // grille bars
  if(!flat)for(let i=0;i<3;i++)boxM(g,W*.38,.018,.02,CHROME,0,bt+h*.2+i*.045,-L/2-.075);
  // bumper trim and plates
  boxM(g,W*.22,.07,.012,mat(0xffffff,{roughness:.4}),0,bt+h*.3,L/2+.065);
  // tail bar
  boxM(g,W*.78,.045,.025,TAILM,0,bt+h*.65,L/2+.075);
  // wheels
  const rr=c.wr||.42;
  (g.userData.wheels||[]).forEach(w=>upgradeWheel(w,rr,c.rim));
  // under glow
  if(c.rim!=null){const ug=new T.Mesh(new T.PlaneGeometry(W*1.9,L*1.35),new T.MeshBasicMaterial({map:glow(),color:c.rim,transparent:true,opacity:.5,blending:T.AdditiveBlending,depthWrite:false}));ug.rotation.x=-Math.PI/2;ug.position.y=.06;g.add(ug)}
  // env intensity on paint
  g.traverse(o=>{if(o.isMesh&&o.material&&o.material.isMeshPhysicalMaterial&&o.material.clearcoat>0){o.material.envMapIntensity=.6}});
}

/* ---------- new vehicle profiles + decorations ---------- */
window.__TP=Object.assign(window.__TP||{},{
  police:[[[.5,0],[.5,.46],[.44,.62],[.3,.74],[.2,.86],[-.28,.86],[-.4,.78],[-.5,.5],[-.5,0]],[.2,.1,-.28,-.38]],
  ambu:[[[.5,0],[.5,.5],[.44,.7],[.34,.86],[-.5,.86],[-.5,0]],[.32,.28,.2,.16]],
  fire:[[[.5,0],[.5,.6],[.46,.82],[.4,.86],[-.5,.86],[-.5,0]],[.42,.36,.1,.04]],
  taxi:[[[.5,0],[.5,.44],[.44,.6],[.3,.72],[.2,.86],[-.3,.86],[-.42,.78],[-.5,.5],[-.5,0]],[.2,.08,-.3,-.4]],
  icecream:[[[.5,0],[.5,.5],[.44,.7],[.34,.86],[-.5,.86],[-.5,0]],[.3,.26,-.46,-.48]],
  rover:[[[.5,0],[.5,.4],[.44,.5],[.3,.56],[-.4,.56],[-.5,.4],[-.5,0]],[.2,.1,-.1,-.2]],
  buggy:[[[.5,0],[.5,.3],[.3,.42],[-.3,.42],[-.5,.3],[-.5,0]],[.0,-.02,-.1,-.12]],
  cyber:[[[.5,0],[.5,.3],[-.5,.86],[-.5,0]],[.14,-.08,-.3,-.44]]
});
const NEW=[
 {n:'سيارة الشرطة',p:850,w:1.85,l:4.1,h:.52,cb:.58,k:'police',sp:0,cl:.36,cz:.04,wr:.4,rim:0x3b82f6},
 {n:'الإسعاف السريع',p:950,w:1.95,l:4.3,h:.95,cb:.9,k:'ambu',cl:.8,cz:.05,wr:.43,rim:0xef4444},
 {n:'عربية الإطفاء',p:1400,w:2.1,l:5.4,h:.95,cb:.78,k:'fire',cl:.7,cz:.05,wr:.48,rim:0xfacc15},
 {n:'التاكسي الأصفر',p:650,w:1.82,l:4,h:.5,cb:.58,k:'taxi',cl:.38,cz:.04,wr:.4},
 {n:'عربة الآيس كريم',p:2200,w:1.95,l:4.2,h:1,cb:.88,k:'icecream',cl:.8,cz:.05,wr:.44,rim:0xf472b6},
 {n:'مركبة القمر',p:6000,w:2.2,l:4,h:.5,cb:.7,k:'rover',cl:.5,cz:.03,wr:.62,y:.9,rim:0xe2e8f0},
 {n:'بجي الصحراء',p:3600,w:2,l:3.4,h:.45,cb:.5,k:'buggy',cl:.3,cz:.02,wr:.56,y:.8,rim:0xf97316},
 {n:'سايبر تراك',p:8800,w:2.15,l:4.7,h:.6,cb:.5,k:'cyber',wr:.5,cl:.4,cz:.03,y:.7,rim:0x22d3ee}];
NEW.forEach(x=>{if(!CARS.some(y=>y.n===x.n))CARS.push(x)});

function newDeco(g,c){
  const M=g.userData.m;if(!M)return;const {ry,rz,L,W,bt,h}=M;const k=c.k;
  const red=mat(0xef4444,{roughness:.4}),white=mat(0xffffff,{roughness:.35,metalness:.1}),blue=mat(0x2563eb,{roughness:.4});
  const emi=(col,i)=>new T.MeshStandardMaterial({color:col,emissive:col,emissiveIntensity:i||2,roughness:.3});
  const roofY=ry-.02;
  if(k==='police'){
    boxM(g,W*.5,.1,.3,DARKM,0,roofY+.06,rz);
    boxM(g,W*.22,.1,.28,emi(0xff1a1a,2.4),-W*.12,roofY+.15,rz);boxM(g,W*.22,.1,.28,emi(0x2a5bff,2.4),W*.12,roofY+.15,rz);
    sprite(g,0xff2020,-W*.12,roofY+.3,rz,1.1,.7);sprite(g,0x3060ff,W*.12,roofY+.3,rz,1.1,.7);
    for(const s of[-1,1]){boxM(g,.015,.2,L*.55,white,s*(W/2+.01),bt+h*.5,rz+.1)}
    boxM(g,W*.8,.12,.02,white,0,bt+h*.55,-L/2-.02);
  }
  if(k==='ambu'){
    for(const s of[-1,1]){boxM(g,.015,.12,L*.9,red,s*(W/2+.01),bt+h*.38,0);boxM(g,.015,.5,.14,red,s*(W/2+.012),bt+h*.65,L*.2);boxM(g,.015,.14,.5,red,s*(W/2+.012),bt+h*.65,L*.2)}
    boxM(g,W*.7,.1,.22,emi(0xff1a1a,2.4),0,roofY+.1,-rz*.3+rz);sprite(g,0xff3030,0,roofY+.28,rz,1.3,.7);
  }
  if(k==='fire'){
    boxM(g,.14,.1,L*.8,mat(0xe5e7eb,{metalness:.9,roughness:.2}),.4,roofY+.12,.35).rotation.x=0;
    for(let i=0;i<9;i++)boxM(g,.5,.03,.04,mat(0xe5e7eb,{metalness:.9,roughness:.2}),.4,roofY+.14,-L*.35+i*.28);
    boxM(g,W*.7,.1,.2,emi(0xff1a1a,2.4),0,roofY+.1,-L*.3);sprite(g,0xff3030,0,roofY+.3,-L*.3,1.3,.7);
    cylM(g,.28,.28,.5,mat(0xdc2626),-W*.3,roofY+.25,L*.25,Math.PI/2);
    for(const s of[-1,1])boxM(g,.015,.1,L*.9,mat(0xfacc15),s*(W/2+.012),bt+h*.4,0);
  }
  if(k==='taxi'){
    boxM(g,.5,.14,.22,mat(0xfff7a8,{emissive:0xffe27a,emissiveIntensity:.8}),0,roofY+.1,rz);
    for(let i=0;i<8;i++)for(const s of[-1,1])boxM(g,.015,.08,.08,i%2?DARKM:white,s*(W/2+.012),bt+h*.5,-L*.32+i*.18);
  }
  if(k==='icecream'){
    cylM(g,.34,.34,.08,white,0,roofY+.04,rz);
    cylM(g,.3,0,.6,mat(0xd9a05b,{roughness:.8}),0,roofY+.4,rz,Math.PI,0,0);
    const s1=new T.Mesh(new T.SphereGeometry(.3,16,12),mat(0xf9a8d4,{roughness:.5}));s1.position.set(0,roofY+.78,rz);g.add(s1);
    const s2=new T.Mesh(new T.SphereGeometry(.22,16,12),mat(0xfef3c7,{roughness:.5}));s2.position.set(0,roofY+1.05,rz);g.add(s2);
    const ch=new T.Mesh(new T.SphereGeometry(.07,10,8),mat(0xdc2626));ch.position.set(0,roofY+1.27,rz);g.add(ch);
    for(const s of[-1,1]){boxM(g,.015,.3,L*.5,white,s*(W/2+.012),bt+h*.7,.2);for(let i=0;i<4;i++)boxM(g,.016,.12,.1,mat(i%2?0xf472b6:0x38bdf8),s*(W/2+.014),bt+h*.7,-.2+i*.2)}
  }
  if(k==='rover'){
    cylM(g,.04,.04,1.0,DARKM,.5,roofY+.5,rz+.3);
    const dish=new T.Mesh(new T.SphereGeometry(.4,16,10,0,Math.PI*2,0,Math.PI/2),CHROME);dish.position.set(.5,roofY+1.05,rz+.3);dish.rotation.x=-.5;g.add(dish);
    const cap=new T.Mesh(new T.SphereGeometry(.55,18,12,0,Math.PI*2,0,Math.PI/2),new T.MeshPhysicalMaterial({color:0x9bd6ff,transparent:true,opacity:.35,roughness:.05,metalness:.2,clearcoat:1}));cap.position.set(0,roofY-.05,rz);cap.scale.set(1.1,.9,1.2);g.add(cap);
    for(const s of[-1,1]){boxM(g,.9,.04,1.4,mat(0x1e3a8a,{metalness:.7,roughness:.3}),s*(W/2+.75),roofY-.25,.2);boxM(g,.04,.04,1.4,CHROME,s*(W/2+.3),roofY-.28,.2)}
  }
  if(k==='buggy'){
    const bar=mat(0x1f2937,{metalness:.6,roughness:.4});
    for(const s of[-1,1]){cylM(g,.04,.04,.9,bar,s*W*.38,bt+h+.4,-L*.1);cylM(g,.04,.04,.9,bar,s*W*.38,bt+h+.4,L*.22)}
    cylM(g,.04,.04,W*.76,bar,0,bt+h+.86,-L*.1,0,0,Math.PI/2);cylM(g,.04,.04,W*.76,bar,0,bt+h+.86,L*.22,0,0,Math.PI/2);
    for(const s of[-1,1])cylM(g,.04,.04,L*.32+.02,bar,s*W*.38,bt+h+.86,L*.06,Math.PI/2);
    boxM(g,.5,.12,.5,mat(0x111827),0,bt+h+.05,L*.12);boxM(g,.5,.5,.1,mat(0x111827),0,bt+h+.3,L*.3);
    for(const s of[-1,1])cylM(g,.1,.1,.3,CHROME,s*W*.25,bt+h*.6,L/2+.1,Math.PI/2);
    cylM(g,.4,.4,.14,mat(0x111827),0,bt+h+.4,L/2+.1,Math.PI/2);
    for(const x of[-.35,0,.35])sprite(g,0xfff1b8,x*W,bt+h+.9,-L*.1,.5,.6);
  }
  if(k==='cyber'){
    const steel=mat(0xb6bcc6,{metalness:1,roughness:.25,envMapIntensity:1.5});
    boxM(g,W*.96,.05,.06,emi(0xaef3ff,2.6),0,bt+h*.52,-L/2-.02);boxM(g,W*.96,.05,.06,TAILM,0,bt+h*.62,L/2+.02);
    sprite(g,0x9ef0ff,0,bt+h*.52,-L/2-.2,3,.5);
    for(const s of[-1,1]){boxM(g,.03,.5,L*.6,steel,s*(W/2+.02),bt+h*.35,L*.05)}
    boxM(g,W*.9,.06,L*.38,DARKM,0,bt+h*.5,L*.28);
  }
}

/* ---------- hook into the existing builder ---------- */
const prevBuild=buildCarGroup;
buildCarGroup=function(idx,color){
  const c=CARS[idx]||CARS[0];
  if(LIGHT){const g=prevBuild(idx,color);try{if(idx>=27)newDeco(g,c)}catch(e){}return g}
  if(c.k==='bike'){const g=prevBuild(idx,color);try{(g.userData.wheels||[]).forEach(w=>upgradeWheel(w,.42,c.rim))}catch(e){console.warn(e)}return g}
  // smooth curvy bodies: round the profile and use a softer bevel while the base builder runs
  const OE=T.ExtrudeGeometry;
  T.ExtrudeGeometry=function(s,o){
    o=Object.assign({},o||{},{bevelSize:.11,bevelThickness:.09,bevelSegments:(window.__gfxTier==='high'?6:window.__gfxTier==='mid'?3:2),curveSegments:(window.__gfxTier==='high'?10:6)});
    return new OE(smoothShape(s),o);
  };
  let g;try{g=prevBuild(idx,color)}finally{T.ExtrudeGeometry=OE}
  try{const LIV={police:0xf5f7fa,ambu:0xffffff,fire:0xdc2626,taxi:0xfacc15,icecream:0xfbcfe8};if(LIV[c.k]!=null)g.traverse(o=>{if(o.isMesh&&o.material&&o.material.isMeshPhysicalMaterial&&o.material.color.getHex()!==GLASS)o.material.color.setHex(LIV[c.k])})}catch(e){}
  try{decorate(g,c);newDeco(g,c)}catch(e){console.warn('car upgrade failed',e)}
  return g;
};
})();
