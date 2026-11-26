// World v2: nicer road surfaces, smooth sky gradient, glowing gates. Texture/sprite only, no extra lights (light-mode safe).
(function(){
const T=THREE,mk=(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;return c};
// 1) road textures: lane shading, gloss streaks, kerb lines, fine grain on every road
function polish(c,col){const x=c.getContext('2d'),w=c.width,h=c.height;
 let g=x.createLinearGradient(0,0,w,0);g.addColorStop(0,'rgba(0,0,0,.34)');g.addColorStop(.14,'rgba(0,0,0,.06)');g.addColorStop(.5,'rgba(255,255,255,.10)');g.addColorStop(.86,'rgba(0,0,0,.06)');g.addColorStop(1,'rgba(0,0,0,.34)');x.fillStyle=g;x.fillRect(0,0,w,h);
 g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'rgba(255,255,255,.07)');g.addColorStop(.5,'rgba(0,0,0,.05)');g.addColorStop(1,'rgba(255,255,255,.07)');x.fillStyle=g;x.fillRect(0,0,w,h);
 for(let i=0;i<260;i++){x.fillStyle='rgba('+(Math.random()<.5?'255,255,255':'0,0,0')+','+(.03+Math.random()*.05)+')';x.fillRect(Math.random()*w,Math.random()*h,1+Math.random()*2,1+Math.random()*2)}
 x.fillStyle='rgba(255,255,255,.55)';x.fillRect(3,0,2,h);x.fillRect(w-5,0,2,h);
 x.fillStyle=col||'rgba(255,255,255,.0)';}
const _rt=roadTex,DONE=new Set();
roadTex=function(id){const t=_rt(id);if(!DONE.has(id)){DONE.add(id);try{polish(t.image,null);t.anisotropy=2;t.needsUpdate=true}catch(e){}}return t};
const AS={};function asphalt(col){if(AS[col])return AS[col];const c=mk(128,256),x=c.getContext('2d');x.fillStyle=col;x.fillRect(0,0,128,256);polish(c);const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(1,4);return AS[col]=t}
// 2) look: asphalt for plain roads + gradient sky
const SK={};function skyTex(col){if(SK[col])return SK[col];const c=mk(4,128),x=c.getContext('2d'),b=new T.Color(col),top=b.clone().multiplyScalar(.72),hor=b.clone().lerp(new T.Color(0xffffff),.38);
 const g=x.createLinearGradient(0,0,0,128);g.addColorStop(0,'#'+top.getHexString());g.addColorStop(.55,col);g.addColorStop(1,'#'+hor.getHexString());x.fillStyle=g;x.fillRect(0,0,4,128);return SK[col]=new T.CanvasTexture(c)}
const _al=applyLook;
applyLook=function(){_al();try{const t=curTheme(),r=curRoad(),m=tiles[0].children[1].material;
 if(!r.tex){m.map=asphalt(r.road);m.color.set(0xffffff);m.needsUpdate=true}
 sc.background=skyTex(t.sky);sc.fog=new T.Fog(t.sky,48,118)}catch(e){}};
// 3) gates: soft glow halo + light beam on every gate
let GT=null;function glowTex(){if(GT)return GT;const c=mk(128,128),x=c.getContext('2d'),g=x.createRadialGradient(64,64,0,64,64,64);g.addColorStop(0,'rgba(255,255,255,.9)');g.addColorStop(.35,'rgba(255,255,255,.35)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,128,128);return GT=new T.CanvasTexture(c)}
const _rg=rebuildGates;
rebuildGates=function(){_rg();try{gates.forEach(g=>{const col=new T.Color(g.userData.col||'#ffffff');
 const mat=()=>new T.MeshBasicMaterial({map:glowTex(),color:col,transparent:true,opacity:.55,blending:T.AdditiveBlending,depthWrite:false,side:T.DoubleSide});
 const h=new T.Mesh(new T.PlaneGeometry(5.4,5.4),mat());h.position.set(0,2.9,-.05);
 const f=new T.Mesh(new T.PlaneGeometry(6,2.2),mat());f.rotation.x=-Math.PI/2;f.position.y=.06;
 g.add(h,f)})}catch(e){}};
try{applyLook()}catch(e){}
})();
