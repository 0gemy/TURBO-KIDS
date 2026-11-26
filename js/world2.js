// World v3: full graphics replacement for roads, gates and themes (replaces the v2 polish layer).
// Richer procedural road surfaces, layered gradient skies, ground detail, upgraded gate glow, small decor touches.
// Textures and sprites only, no extra lights. Shared geometry/material caches. Light-tier safe: heavy extras skip on phones.
(function(){
const T=THREE,LOW=window.__gfxTier!=='high',mk=(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;return c},R=(a,b)=>a+Math.random()*(b-a),PI=Math.PI;
const rr=(x,a,b,w,h,r)=>{x.beginPath();x.roundRect?x.roundRect(a,b,w,h,r):x.rect(a,b,w,h)};

/* ---------- shared texture helpers ---------- */
function grain(x,w,h,n,a){for(let i=0;i<n;i++){x.fillStyle='rgba('+(Math.random()<.5?'255,255,255':'0,0,0')+','+(.03+Math.random()*a)+')';x.fillRect(Math.random()*w,Math.random()*h,1+Math.random()*2,1+Math.random()*2)}}
function blotch(x,w,h,n,a){for(let i=0;i<n;i++){const r=R(20,70),g=x.createRadialGradient(0,0,0,0,0,r);g.addColorStop(0,'rgba('+(Math.random()<.5?'0,0,0':'255,255,255')+','+a+')');g.addColorStop(1,'rgba(0,0,0,0)');x.save();x.translate(Math.random()*w,Math.random()*h);x.fillStyle=g;x.fillRect(-r,-r,r*2,r*2);x.restore()}}
function vShade(x,w,h,a){const g=x.createLinearGradient(0,0,w,0);g.addColorStop(0,'rgba(0,0,0,'+a+')');g.addColorStop(.14,'rgba(0,0,0,0)');g.addColorStop(.5,'rgba(255,255,255,'+(a*.4)+')');g.addColorStop(.86,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,'+a+')');x.fillStyle=g;x.fillRect(0,0,w,h)}
function kerb(x,w,h,col,glow){x.save();if(glow){x.shadowColor=col;x.shadowBlur=14}x.fillStyle=col;x.fillRect(4,0,8,h);x.fillRect(w-12,0,8,h);x.restore();x.fillStyle='rgba(255,255,255,.45)';x.fillRect(17,0,2,h);x.fillRect(w-19,0,2,h)}
function wear(x,w,h){for(const px of[w*.3,w*.7]){const g=x.createLinearGradient(px-34,0,px+34,0);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(.5,'rgba(0,0,0,.13)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(px-34,0,68,h)}}
function cracks(x,w,h,n,col,lw){x.strokeStyle=col||'rgba(0,0,0,.28)';x.lineWidth=lw||1.4;for(let i=0;i<n;i++){let px=R(20,w-20),py=R(0,h);x.beginPath();x.moveTo(px,py);for(let k=0;k<5;k++){px+=R(-26,26);py+=R(14,36);x.lineTo(px,py)}x.stroke()}}
let GT=null;function glowTex(){if(GT)return GT;const c=mk(128,128),x=c.getContext('2d'),g=x.createRadialGradient(64,64,0,64,64,64);g.addColorStop(0,'rgba(255,255,255,.95)');g.addColorStop(.3,'rgba(255,255,255,.4)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,128,128);return GT=new T.CanvasTexture(c)}

/* ---------- road surfaces (all 17 roads + lava get a full redraw) ---------- */
function asphalt(x,w,h,base){x.fillStyle=base;x.fillRect(0,0,w,h);blotch(x,w,h,14,.06);grain(x,w,h,1700,.14);cracks(x,w,h,4);wear(x,w,h);
 for(let i=0;i<3;i++){x.fillStyle='rgba(0,0,0,.13)';x.save();x.translate(R(30,w-30),R(0,h));x.rotate(R(-.2,.2));x.fillRect(-R(14,30),-R(20,42),R(28,60),R(40,84));x.restore()}}
function flecks(x,w,h,n,col,a){x.fillStyle=col;for(let i=0;i<n;i++){x.globalAlpha=R(.3,a||.9);const s=R(1,3);x.fillRect(R(14,w-14),R(0,h),s,s)}x.globalAlpha=1}
const GEN={
 classic(x,w,h,r){asphalt(x,w,h,r.road)},
 cyber(x,w,h,r){asphalt(x,w,h,r.road);x.fillStyle='rgba(34,211,238,.05)';x.fillRect(0,0,w,h);flecks(x,w,h,50,'#22d3ee',.7)},
 magenta(x,w,h,r){asphalt(x,w,h,r.road);x.fillStyle='rgba(244,114,182,.05)';x.fillRect(0,0,w,h);flecks(x,w,h,50,'#f472b6',.7)},
 lime(x,w,h,r){asphalt(x,w,h,r.road);x.fillStyle='rgba(163,230,53,.05)';x.fillRect(0,0,w,h);flecks(x,w,h,50,'#a3e635',.7)},
 gold(x,w,h,r){asphalt(x,w,h,r.road);flecks(x,w,h,110,'#fde68a',.95);flecks(x,w,h,40,'#fbbf24',.8)},
 rainbow(x,w,h,r){asphalt(x,w,h,r.road)},
 brick(x,w,h){x.fillStyle='#5e2318';x.fillRect(0,0,w,h);for(let r2=0;r2<10;r2++)for(let k=0;k<4;k++){const ox=(r2%2)*32,gx=ox+k*64-32,gy=r2*51.2;x.fillStyle='hsl('+R(6,14)+','+R(42,54)+'%,'+R(32,42)+'%)';rr(x,gx+3,gy+3,58,45,8);x.fill();x.fillStyle='rgba(255,255,255,.16)';x.fillRect(gx+6,gy+5,52,3);x.fillStyle='rgba(0,0,0,.3)';x.fillRect(gx+6,gy+42,52,4)}grain(x,w,h,900,.1)},
 sand(x,w,h){x.fillStyle='#c9a061';x.fillRect(0,0,w,h);for(let y=12;y<h;y+=R(22,34)){x.strokeStyle='rgba(120,72,20,'+R(.1,.22)+')';x.lineWidth=R(3,7);x.beginPath();for(let px=0;px<=w;px+=8)x.lineTo(px,y+Math.sin(px/14+y)*6);x.stroke()}for(let i=0;i<44;i++){x.fillStyle='rgba('+(Math.random()<.5?'90,60,25':'235,215,170')+','+R(.3,.7)+')';x.beginPath();x.ellipse(R(10,w-10),R(0,h),R(1.5,4),R(1,2.5),R(0,3),0,7);x.fill()}grain(x,w,h,1400,.1);blotch(x,w,h,8,.05)},
 ice(x,w,h){const g=x.createLinearGradient(0,0,w,h);g.addColorStop(0,'#8fc3e8');g.addColorStop(.5,'#b5dcf2');g.addColorStop(1,'#8fc3e8');x.fillStyle=g;x.fillRect(0,0,w,h);for(let i=0;i<7;i++){x.strokeStyle='rgba(255,255,255,'+R(.1,.2)+')';x.lineWidth=R(6,16);x.beginPath();x.moveTo(R(-20,w),R(0,h));x.lineTo(R(0,w+20),R(0,h));x.stroke()}cracks(x,w,h,6,'rgba(255,255,255,.5)',1);cracks(x,w,h,4,'rgba(60,130,180,.35)',2);flecks(x,w,h,60,'#ffffff',.8)},
 circuit(x,w,h){x.fillStyle='#0b3d2e';x.fillRect(0,0,w,h);x.fillStyle='rgba(134,239,172,.06)';for(let px=8;px<w;px+=16)for(let py=8;py<h;py+=16)x.fillRect(px,py,1.5,1.5);
  x.save();x.shadowColor='#34d399';x.shadowBlur=9;x.strokeStyle='#34d399';x.lineWidth=3;x.lineCap='round';for(let i=0;i<15;i++){let px=R(16,w-16),py=R(0,h);x.beginPath();x.moveTo(px,py);for(let k=0;k<3;k++){if(Math.random()<.5)px=Math.max(14,Math.min(w-14,px+R(-46,46)));else py+=R(-40,50);x.lineTo(px,py)}x.stroke();x.fillStyle='#86efac';x.beginPath();x.arc(px,py,4.5,0,7);x.fill();x.strokeStyle='#0b3d2e';x.lineWidth=1.5;x.beginPath();x.arc(px,py,2,0,7);x.stroke();x.strokeStyle='#34d399';x.lineWidth=3}x.restore();
  for(let i=0;i<3;i++){const cx2=R(40,w-40),cy=R(30,h-30);x.fillStyle='#08332555';x.fillRect(cx2-16,cy-12,32,24);x.strokeStyle='#34d39966';x.lineWidth=1.5;x.strokeRect(cx2-16,cy-12,32,24);for(let p=-12;p<=12;p+=6){x.fillStyle='#86efac88';x.fillRect(cx2+p-1,cy-16,2,4);x.fillRect(cx2+p-1,cy+12,2,4)}}},
 starry(x,w,h){const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#0b1030');g.addColorStop(.6,'#10173d');g.addColorStop(1,'#0b1030');x.fillStyle=g;x.fillRect(0,0,w,h);
  for(let i=0;i<5;i++){const r2=R(30,60),g2=x.createRadialGradient(0,0,0,0,0,r2);g2.addColorStop(0,'rgba(190,205,255,.07)');g2.addColorStop(1,'rgba(0,0,0,0)');x.save();x.translate(R(0,w),R(0,h));x.fillStyle=g2;x.fillRect(-r2,-r2,r2*2,r2*2);x.restore()}
  for(let i=0;i<80;i++){x.fillStyle=['#ffffff','#fde68a','#bfdbfe'][i%3];x.globalAlpha=R(.3,.95);x.beginPath();x.arc(R(0,w),R(0,h),R(.5,1.8),0,7);x.fill()}x.globalAlpha=1;
  for(let i=0;i<8;i++){const sx=R(10,w-10),sy=R(0,h);x.strokeStyle='rgba(255,255,255,.75)';x.lineWidth=1;x.beginPath();x.moveTo(sx-4,sy);x.lineTo(sx+4,sy);x.moveTo(sx,sy-4);x.lineTo(sx,sy+4);x.stroke()}},
 cobble(x,w,h){x.fillStyle='#43474d';x.fillRect(0,0,w,h);for(let r2=0;r2<8;r2++)for(let k=0;k<4;k++){const ox=(r2%2)*32,gx=ox+k*64-32,gy=r2*64,g=x.createRadialGradient(gx+24,gy+24,4,gx+32,gy+32,40);g.addColorStop(0,'hsl(220,'+R(5,9)+'%,'+R(58,68)+'%)');g.addColorStop(1,'hsl(220,6%,'+R(38,46)+'%)');x.fillStyle=g;rr(x,gx+3,gy+3,58,58,14);x.fill()}for(let i=0;i<26;i++){x.fillStyle='rgba(90,140,70,'+R(.15,.4)+')';x.fillRect(R(0,w),R(0,h),R(1,3),R(1,3))}grain(x,w,h,700,.08)},
 planks(x,w,h){for(let r2=0;r2<8;r2++){const y=r2*64;x.fillStyle='hsl('+R(24,32)+','+R(38,50)+'%,'+R(34,46)+'%)';x.fillRect(0,y,w,62);
  x.strokeStyle='rgba(70,40,12,.3)';x.lineWidth=1.2;for(let k=0;k<6;k++){x.beginPath();x.moveTo(0,y+R(5,58));x.bezierCurveTo(w*.3,y+R(5,58),w*.6,y+R(5,58),w,y+R(5,58));x.stroke()}
  for(let k=0;k<2;k++){const kx=R(20,w-20),ky=y+R(10,52);x.fillStyle='rgba(60,32,10,.5)';x.beginPath();x.ellipse(kx,ky,R(2.5,4.5),R(1.5,3),R(0,3),0,7);x.fill();x.strokeStyle='rgba(60,32,10,.35)';x.beginPath();x.ellipse(kx,ky,R(5,8),R(3,5.5),0,0,7);x.stroke()}
  for(const nx of[10,w-10]){x.fillStyle='#3a2a16';x.beginPath();x.arc(nx,y+31,3,0,7);x.fill();x.fillStyle='rgba(255,255,255,.35)';x.beginPath();x.arc(nx-1,y+30,1.2,0,7);x.fill()}
  x.fillStyle='rgba(255,255,255,.13)';x.fillRect(0,y,w,3);x.fillStyle='rgba(0,0,0,.4)';x.fillRect(0,y+60,w,4)}grain(x,w,h,800,.06)},
 waves(x,w,h){const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#0c5f92');g.addColorStop(.5,'#1490cf');g.addColorStop(1,'#0c5f92');x.fillStyle=g;x.fillRect(0,0,w,h);
  for(let y=14;y<h;y+=R(24,34)){x.strokeStyle='rgba(8,70,110,.4)';x.lineWidth=5;x.beginPath();for(let px=0;px<=w;px+=6)x.lineTo(px,y+Math.sin(px/11+y)*5);x.stroke();
   x.strokeStyle='rgba(255,255,255,'+R(.3,.5)+')';x.lineWidth=2.5;x.beginPath();for(let px=0;px<=w;px+=6)x.lineTo(px,y-3+Math.sin(px/11+y)*5);x.stroke()}
  for(let i=0;i<40;i++){x.fillStyle='rgba(255,255,255,'+R(.2,.6)+')';x.beginPath();x.arc(R(0,w),R(0,h),R(.6,1.6),0,7);x.fill()}},
 checker(x,w,h){for(let r2=0;r2<16;r2++)for(let k=0;k<8;k++){x.fillStyle=(r2+k)%2?'#242c38':'#525d6e';x.fillRect(k*32,r2*32,32,32);x.fillStyle='rgba(255,255,255,.07)';x.beginPath();x.moveTo(k*32,r2*32);x.lineTo(k*32+14,r2*32);x.lineTo(k*32,r2*32+14);x.fill()}grain(x,w,h,1500,.1);wear(x,w,h)},
 galaxy(x,w,h){const g=x.createLinearGradient(0,0,w,h);g.addColorStop(0,'#2e1065');g.addColorStop(.5,'#4c1d95');g.addColorStop(1,'#1e1b4b');x.fillStyle=g;x.fillRect(0,0,w,h);
  const neb=[['232,121,249',.13],['103,232,249',.09],['167,139,250',.15],['240,171,252',.08],['253,224,71',.05]];for(const[c,a]of neb){const r2=R(40,80),g2=x.createRadialGradient(0,0,0,0,0,r2);g2.addColorStop(0,'rgba('+c+','+a+')');g2.addColorStop(1,'rgba(0,0,0,0)');x.save();x.translate(R(0,w),R(0,h));x.fillStyle=g2;x.fillRect(-r2,-r2,r2*2,r2*2);x.restore()}
  for(let i=0;i<95;i++){x.fillStyle=['#f0abfc','#ffffff','#67e8f9','#fde68a'][i%4];x.globalAlpha=R(.3,1);x.beginPath();x.arc(R(0,w),R(0,h),R(.5,2),0,7);x.fill()}x.globalAlpha=1},
 crack(x,w,h){x.fillStyle='#160a08';x.fillRect(0,0,w,h);
  x.save();x.shadowColor='#f97316';x.shadowBlur=11;x.strokeStyle='#fb923c';x.lineWidth=4.5;x.lineCap='round';
  for(let i=0;i<14;i++){let px=R(0,w),py=R(0,h);x.beginPath();x.moveTo(px,py);for(let k=0;k<4;k++){px+=R(-40,40);py+=R(10,44);x.lineTo(px,py)}x.stroke()}
  x.strokeStyle='#fde68a';x.lineWidth=1.6;x.shadowBlur=6;for(let i=0;i<14;i++){let px=R(0,w),py=R(0,h);x.beginPath();x.moveTo(px,py);for(let k=0;k<4;k++){px+=R(-40,40);py+=R(10,44);x.lineTo(px,py)}x.stroke()}x.restore();
  for(let i=0;i<30;i++){x.fillStyle='rgba(60,26,18,'+R(.4,.8)+')';x.beginPath();x.ellipse(R(0,w),R(0,h),R(6,18),R(4,10),R(0,3),0,7);x.fill()}
  flecks(x,w,h,20,'#fdba74',.9)}
};
GEN.lava=GEN.crack;
const RC={};
function roadTexV3(r){if(RC[r.id])return RC[r.id];const c=mk(256,512),x=c.getContext('2d');(GEN[r.tex||r.id]||GEN.classic)(x,256,512,r);vShade(x,256,512,.3);kerb(x,256,512,r.edge,r.glow);
 const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(1,4);t.anisotropy=2;return RC[r.id]=t}
roadTex=function(id){const r=(typeof ROADS!=='undefined'?ROADS.find(v=>v.tex===id||v.id===id):null)||{id,tex:id,edge:'#fff'};return roadTexV3(r)};

/* ---------- ground detail (tinted per theme by the existing land colour) ---------- */
let GR=null;function grassTex(){if(GR)return GR;const c=mk(256,256),x=c.getContext('2d');x.fillStyle='#cfcfcf';x.fillRect(0,0,256,256);
 for(let y=0;y<256;y+=64){x.fillStyle='rgba(255,255,255,.05)';x.fillRect(0,y,256,32);x.fillStyle='rgba(0,0,0,.05)';x.fillRect(0,y+32,256,32)}
 blotch(x,256,256,14,.07);grain(x,256,256,2600,.18);
 for(let i=0;i<50;i++){x.fillStyle='rgba(0,0,0,'+R(.15,.35)+')';x.fillRect(R(0,256),R(0,256),R(1,3),R(1,2))}
 GR=new T.CanvasTexture(c);GR.wrapS=GR.wrapT=T.RepeatWrapping;GR.repeat.set(16,4);GR.anisotropy=2;return GR}

/* ---------- layered sky ---------- */
const SKC={};
function skyTex(t){if(SKC[t.id])return SKC[t.id];const c=mk(16,256),x=c.getContext('2d'),b=new T.Color(t.sky),lum=.3*b.r+.59*b.g+.11*b.b,night=lum<.22;
 const warm=['sunset','desert','egypt','beach'].includes(t.id),hor=b.clone().lerp(new T.Color(night?0x33477a:warm?0xffd9a8:0xeaf6ff),night?.35:.46),top=b.clone().multiplyScalar(night?.45:.66);
 const g=x.createLinearGradient(0,0,0,256);g.addColorStop(0,'#'+top.getHexString());g.addColorStop(.42,t.sky);g.addColorStop(.74,'#'+b.clone().lerp(hor,.55).getHexString());g.addColorStop(.92,'#'+hor.getHexString());g.addColorStop(1,'#'+hor.clone().lerp(new T.Color(0xffffff),.22).getHexString());
 x.fillStyle=g;x.fillRect(0,0,16,256);
 const g2=x.createLinearGradient(0,150,0,256);g2.addColorStop(0,'rgba(255,255,255,0)');g2.addColorStop(.8,'rgba('+(warm?'255,190,120':night?'90,120,200':'255,250,230')+','+(night?.14:.2)+')');g2.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g2;x.fillRect(0,150,16,106);
 return SKC[t.id]=new T.CanvasTexture(c)}
function skyTune(t){try{const u=skyG&&skyG.userData;if(!u||!u.sun)return;const b=new T.Color(t.sky),lum=.3*b.r+.59*b.g+.11*b.b,night=lum<.22;
 const tint={sunset:['#ffb14e','#ff9a3c'],desert:['#ffe08a','#ffcf6e'],egypt:['#ffe08a','#ffcf6e'],beach:['#fff6c8','#ffe98a'],day:['#fff2a8','#ffe9a0'],candy:['#fff0f8','#ffd1ec'],sakura:['#fff0f6','#ffd6e8'],castle:['#fff2a8','#ffe9a0'],mushroom:['#fdffe0','#eaffb0'],snow:['#eaf6ff','#d8ecff'],arctic:['#eaf6ff','#d8ecff'],rain:['#d3dde8','#bcc9d8']}[t.id];
 if(tint){u.sun.material.color.set(tint[0]);u.halo.material.color.set(tint[1]);if(u.halo2)u.halo2.material.color.set(tint[1])}
 if(u.mt2Mat)u.mt2Mat.color.copy(new T.Color(t.land).lerp(b,.72).multiplyScalar(night?.45:.95));
 if(u.stars2){u.stars2.visible=u.stars3.visible=night}
 if(u.clouds){const cl=night?0xffffff:{sunset:0xffd9b8,candy:0xffecf6,sakura:0xffeef5,rain:0xc3cedb}[t.id]||0xffffff;u.clouds.forEach(c=>c.children.forEach(s=>s.material.color.set(cl)))}
}catch(e){}}

/* ---------- buildSky: add a far mountain ridge, extra star layers, bigger sun halo ---------- */
const _bs=buildSky;
buildSky=function(){_bs();try{const u=skyG.userData;
 u.mt2Mat=new T.MeshBasicMaterial({color:0x9db6d4,fog:false});
 for(let i=0;i<8;i++){const h=22+Math.random()*16,m=new T.Mesh(new T.ConeGeometry(26+Math.random()*14,h,5),u.mt2Mat);m.position.set(-140+i*38,h/2-2,-186);skyG.add(m)}
 const lay=(n,size,col)=>{const p=new Float32Array(n*3);for(let i=0;i<n;i++){p[i*3]=(Math.random()-.5)*340;p[i*3+1]=8+Math.random()*34;p[i*3+2]=-178}const g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(p,3));const s=new T.Points(g,new T.PointsMaterial({color:col,size:size,sizeAttenuation:false,fog:false,map:dotTex(),transparent:true,depthWrite:false,opacity:.85}));s.frustumCulled=false;skyG.add(s);return s};
 u.stars2=lay(150,2,0xbfd4ff);u.stars3=lay(90,1.6,0xffe9b8);
 u.halo2=new T.Sprite(new T.SpriteMaterial({map:glowTex(),color:0xffe9a0,transparent:true,opacity:.22,blending:T.AdditiveBlending,depthWrite:false,fog:false}));u.halo2.position.copy(u.sun.position);u.halo2.scale.set(46,46,1);skyG.add(u.halo2);
}catch(e){}};

/* ---------- gates: replace pads, add plinths, energy beam, layered halos, style extras, gentle pulse ---------- */
padTex=function(col){const c=mk(128,128),g=c.getContext('2d'),h='#'+new T.Color(col).getHexString();
 const r=g.createRadialGradient(64,64,4,64,64,64);r.addColorStop(0,'rgba(255,255,255,.16)');r.addColorStop(.55,'rgba(255,255,255,.05)');r.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=r;g.fillRect(0,0,128,128);
 g.save();g.strokeStyle=h;g.shadowColor=h;g.shadowBlur=10;g.lineWidth=5;g.globalAlpha=.9;g.beginPath();g.arc(64,64,56,0,7);g.stroke();g.globalAlpha=.45;g.lineWidth=2;g.beginPath();g.arc(64,64,44,0,7);g.stroke();
 g.lineWidth=7;g.lineCap=g.lineJoin='round';for(let i=0;i<3;i++){const y=100-i*26;g.globalAlpha=1-i*.24;g.beginPath();g.moveTo(38,y);g.lineTo(64,y-20);g.lineTo(90,y);g.stroke()}g.restore();
 return new T.CanvasTexture(c)};
let BT=null;function beamTex(){if(BT)return BT;const c=mk(64,64),x=c.getContext('2d'),g=x.createLinearGradient(0,0,0,64);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.42,'rgba(255,255,255,.55)');g.addColorStop(.5,'rgba(255,255,255,.95)');g.addColorStop(.58,'rgba(255,255,255,.55)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,64,64);return BT=new T.CanvasTexture(c)}
let SW=null;function swirlTex(){if(SW)return SW;const c=mk(128,128),x=c.getContext('2d');x.translate(64,64);for(let i=0;i<3;i++){x.rotate(2.1);x.strokeStyle='rgba(255,255,255,.8)';x.lineWidth=5-i;x.lineCap='round';x.beginPath();for(let a=0;a<4.6;a+=.15){const r2=a*7;x.lineTo(Math.cos(a+i)*r2,Math.sin(a+i)*r2)}x.stroke()}
 const g=x.createRadialGradient(0,0,0,0,0,60);g.addColorStop(0,'rgba(255,255,255,.3)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(-64,-64,128,128);return SW=new T.CanvasTexture(c)}
const _geo={};const gz=(k,f)=>_geo[k]||(_geo[k]=f());const _mat={};const mz=(k,f)=>_mat[k]||(_mat[k]=f());
function enhanceGate(g,i){const col=new T.Color(g.userData.col||'#22d3ee'),P={pulse:[],spin:[]};g.userData.v3=P;
 const dk=mz('dk',()=>new T.MeshStandardMaterial({color:0x0b1630,metalness:.7,roughness:.3}));
 for(const x of[-1.45,1.45]){const p=new T.Mesh(gz('pl',()=>new T.BoxGeometry(1.08,.24,.98)),dk);p.position.set(x,.12,0);g.add(p);
  const tr=new T.Mesh(gz('plt',()=>new T.BoxGeometry(1.14,.05,1.04)),new T.MeshBasicMaterial({color:col}));tr.position.set(x,.27,0);g.add(tr)}
 const bm=new T.Mesh(gz('bm',()=>new T.PlaneGeometry(2.9,.55)),new T.MeshBasicMaterial({map:beamTex(),color:col,transparent:true,opacity:.38,blending:T.AdditiveBlending,depthWrite:false,side:T.DoubleSide}));bm.position.set(0,4.35,-.03);g.add(bm);P.pulse.push({m:bm.material,base:.34,amp:.16,spd:1,ph:0});
 const core=new T.Mesh(gz('hc',()=>new T.PlaneGeometry(3.2,3.2)),new T.MeshBasicMaterial({map:glowTex(),color:col,transparent:true,opacity:.5,blending:T.AdditiveBlending,depthWrite:false,side:T.DoubleSide}));core.position.set(0,2.9,-.06);g.add(core);P.pulse.push({m:core.material,base:.44,amp:.15,spd:1.3,ph:1});
 if(!LOW){const big=new T.Mesh(gz('hb',()=>new T.PlaneGeometry(6.4,6.4)),new T.MeshBasicMaterial({map:glowTex(),color:col,transparent:true,opacity:.26,blending:T.AdditiveBlending,depthWrite:false,side:T.DoubleSide}));big.position.set(0,2.9,-.09);g.add(big);P.pulse.push({m:big.material,base:.22,amp:.08,spd:.7,ph:2})}
 const fg=new T.Mesh(gz('fg',()=>new T.PlaneGeometry(6.4,2.6)),new T.MeshBasicMaterial({map:glowTex(),color:col,transparent:true,opacity:.5,blending:T.AdditiveBlending,depthWrite:false,side:T.DoubleSide}));fg.rotation.x=-PI/2;fg.position.y=.055;g.add(fg);
 const sty=(typeof S!=='undefined'&&S.gate)||'neon';
 if(sty==='portal'){const d=new T.Mesh(gz('sw',()=>new T.PlaneGeometry(2.3,2.3)),new T.MeshBasicMaterial({map:swirlTex(),color:col,transparent:true,opacity:.75,blending:T.AdditiveBlending,depthWrite:false,side:T.DoubleSide}));d.position.set(0,2.9,.02);g.add(d);P.spin.push(d)}
 if(sty==='fire'||sty==='gold'){const sp=new T.Sprite(new T.SpriteMaterial({map:glowTex(),color:sty==='fire'?0xffa53d:0xffe9a0,transparent:true,opacity:.6,blending:T.AdditiveBlending,depthWrite:false}));sp.position.set(0,sty==='fire'?4.9:5.15,0);sp.scale.set(1.6,1.6,1);g.add(sp);P.pulse.push({m:sp.material,base:.5,amp:.22,spd:1.6,ph:.5})}
}
const _rg=rebuildGates;
rebuildGates=function(){_rg();try{gates.forEach((g,i)=>enhanceGate(g,i))}catch(e){}};
const _fx=fxUpdate;
fxUpdate=function(dt,t){_fx(dt,t);try{for(let i=0;i<gates.length;i++){const P=gates[i].userData.v3;if(!P)continue;
 for(const q of P.pulse)q.m.opacity=q.base+q.amp*Math.sin(t*.004*q.spd+i*2.1+q.ph);
 for(const m of P.spin)m.rotation.z+=dt*.9}}catch(e){}};

/* ---------- decor finishing touches ---------- */
const _d1=decorOne;
decorOne=function(type,c1){const g=_d1(type,c1);try{const A=(geo,mat,x,y,z)=>{const m=new T.Mesh(geo,mat);m.position.set(x,y,z);g.add(m);return m};
 if(type==='pine'||type==='snowpine'){A(gz('star',()=>new T.OctahedronGeometry(.2)),mz('starm',()=>new T.MeshBasicMaterial({color:0xffd23f})),0,4.35,0)}
 else if(type==='tower'){const hb=g.children[0]&&g.children[0].geometry.parameters.height||10;A(gz('ant',()=>new T.CylinderGeometry(.04,.04,1.6,5)),mz('antm',()=>new T.MeshLambertMaterial({color:0x475569})),0,hb+.7,0);A(gz('bea',()=>new T.SphereGeometry(.14,8,6)),mz('beam',()=>new T.MeshBasicMaterial({color:0xff4545})),0,hb+1.5,0)}
 else if(type==='palm'){A(gz('co',()=>new T.SphereGeometry(.17,8,6)),mz('com',()=>new T.MeshLambertMaterial({color:0x6b4423})),.25,3.3,.1);A(gz('co',()=>new T.SphereGeometry(.17,8,6)),mz('com',()=>new T.MeshLambertMaterial({color:0x6b4423})),-.2,3.35,-.15)}
 else if(type==='cactus'){A(gz('fl',()=>new T.SphereGeometry(.16,8,6)),mz('flm',()=>new T.MeshBasicMaterial({color:0xf472b6})),0,2.75,0)}
}catch(e){}return g};

/* ---------- apply the look ---------- */
const _al=applyLook;
applyLook=function(){_al();try{const t=curTheme(),r=curRoad(),m=tiles[0].children[1].material;
 m.map=roadTexV3(r);m.color.set(0xffffff);m.userData.road=1;m.needsUpdate=true;
 if(!ground.map){ground.map=grassTex();ground.userData.gfx=1}
 ground.needsUpdate=true;
 sc.background=skyTex(t);sc.fog=new T.Fog(t.sky,48,118);
 skyTune(t);
}catch(e){}};
try{applyLook()}catch(e){}
})();
