// Shop v2: one add-on per slot, redone under-lights / head-lights / rims, add-ons always applied on the car.
(function(){
const T=THREE;
const SL={roof:['ac_siren','ac_star','ac_ufo','ac_prop','ac_orbit','ac_trophy','ac_lantern','ac_crown','ac_halo','ac_horns','ac_party','ac_fin'],rear:['ac_wing','ac_rocket','ac_jet','ac_rainbow','ac_turbo'],side:['ac_flag','ac_balloon','ac_angel'],front:['ac_beams']};
const SN={roof:'فوق السقف',rear:'الخلف',side:'الجانب',front:'الأمام'};
const slotOf=id=>{for(const k in SL)if(SL[k].includes(id))return k;return id};
function fix(){const A=S.eqA;if(!A||!A.length)return;const seen={},out=[];for(let i=A.length-1;i>=0;i--){const s=slotOf(A[i]);if(seen[s])continue;seen[s]=1;out.unshift(A[i])}if(out.length!==A.length)S.eqA=out}
try{CITEMS.forEach(x=>{if(x.g==='ac'&&!x._s){x._s=1;x.desc=SN[slotOf(x.id)]+' · '+x.desc}})}catch(e){}
fix();
const _sa=shopAct;
shopAct=function(id){try{const x=shopList().find(v=>v.id===id);
 if(x&&shopTab==='c'&&x.g==='ac'&&isOwned(x)&&!isOn(x)){const s=slotOf(id),A=S.eqA=S.eqA||[],old=A.filter(k=>k!==id&&slotOf(k)===s);if(old.length){S.eqA=A.filter(k=>!old.includes(k));cel('تم استبدال القديم ✓',1100,0)}}}catch(e){}
 _sa(id)};
// textures
const mk=(w,h,f)=>{const c=document.createElement('canvas');c.width=w;c.height=h;f(c.getContext('2d'),w,h);const t=new T.CanvasTexture(c);return t};
let GT,BT;
const glowTex=()=>GT||(GT=mk(64,64,(c)=>{const r=c.createRadialGradient(32,32,2,32,32,32);r.addColorStop(0,'rgba(255,255,255,1)');r.addColorStop(.5,'rgba(255,255,255,.5)');r.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=r;c.fillRect(0,0,64,64)}));
const beamTex=()=>BT||(BT=mk(32,128,(c,w,h)=>{const g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(1,'rgba(255,255,255,.95)');c.fillStyle=g;c.fillRect(0,0,w,h);c.globalCompositeOperation='destination-in';const k=c.createLinearGradient(0,0,w,0);k.addColorStop(0,'rgba(0,0,0,0)');k.addColorStop(.5,'rgba(0,0,0,1)');k.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=k;c.fillRect(0,0,w,h)}));
const ADD=T.AdditiveBlending;
function put(g,m){m.userData.ex=1;g.add(m);return m}
function underLight(g,M,col){
 // remove the car's built-in flat glow so only the chosen colour shows
 g.children.slice().forEach(m=>{if(m.isMesh&&m.geometry&&m.geometry.type==='PlaneGeometry'&&m.material&&m.material.blending===ADD&&!m.userData.ex)g.remove(m)});
 const {L,W}=M,p=new T.Mesh(new T.PlaneGeometry(W*2.5,L*1.55),new T.MeshBasicMaterial({map:glowTex(),color:col,transparent:true,opacity:.9,blending:ADD,depthWrite:false}));p.rotation.x=-Math.PI/2;p.position.y=.05;put(g,p);
 const bm=new T.MeshBasicMaterial({color:col});
 for(const s of[-1,1]){const b=new T.Mesh(new T.BoxGeometry(.07,.05,L*.78),bm);b.position.set(s*(W/2-.05),.13,0);put(g,b)}
 for(const z of[-1,1]){const b=new T.Mesh(new T.BoxGeometry(W*.7,.05,.07),bm);b.position.set(0,.13,z*(L/2-.25));put(g,b)}}
function headBeams(g,M){const {L,W}=M,mat=new T.MeshBasicMaterial({map:beamTex(),color:0xfff3b0,transparent:true,opacity:.85,blending:ADD,depthWrite:false,side:T.DoubleSide});
 for(const s of[-1,1]){const p=new T.Mesh(new T.PlaneGeometry(W*.62,5.5),mat);p.rotation.x=-Math.PI/2;p.position.set(s*W*.3,.07,-L/2-2.9);put(g,p)}}
function rims(g,col){const mat=new T.MeshStandardMaterial({color:col,emissive:col,emissiveIntensity:.5,metalness:.6,roughness:.3});
 (g.userData.wheels||[]).forEach(w=>{
  if(w.children.length){w.children.forEach(c=>{const t=c.geometry&&c.geometry.type;if(t==='BoxGeometry'||t==='TorusGeometry')c.material=mat})}
  else{const pr=(w.geometry&&w.geometry.parameters)||{},r=pr.radiusTop||.42,d=new T.Mesh(new T.CylinderGeometry(r*.62,r*.62,(pr.height||.3)+.03,16),mat);d.userData.ex=1;w.add(d)}})}
const _ae=addExtras;
addExtras=function(g){fix();const gid=S.eqG,rid=S.eqR,A=S.eqA,hasB=(A||[]).includes('ac_beams');
 S.eqG='';S.eqR='';S.eqA=(A||[]).filter(k=>k!=='ac_beams');
 try{_ae(g)}finally{S.eqG=gid;S.eqR=rid;S.eqA=A}
 const M=g.userData.m;if(!M)return;
 try{const gl=CITEMS.find(x=>x.id===gid);if(gl)underLight(g,M,gl.col)}catch(e){}
 try{const rm=CITEMS.find(x=>x.id===rid);if(rm)rims(g,rm.col)}catch(e){}
 try{if(hasB)headBeams(g,M)}catch(e){}};
const _rs=renderWorldShop;
renderWorldShop=function(){_rs();if(shopTab==='c'){const si=document.getElementById('shopInfo');if(si&&!si.querySelector('.cn'))si.insertAdjacentHTML('beforeend','<div class="cn">لكل فئة تركيب واحد فقط، واختيار جديد يستبدل القديم.<button class="btn s p" onclick="go(\'garage\')">🚗 شوف سيارتك</button></div>')}};
})();
