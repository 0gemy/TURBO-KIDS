// ===== data (levels validated below; audio paths are slots, files must be supplied) =====
const W=[{n:'مراحل الحروف (28)',c:0x7ec850,sky:0x9be0ff,req:0},{n:'مراحل الكلمات (28)',c:0xf2c26b,sky:0xffe2b0,req:0}];
const LV0=[{id:'l1',w:0,n:'أَ أُ إِ',s:[['أَ','أُ','إِ']]},{id:'l2',w:0,n:'بَ بُ بِ',s:[['بَ','بُ','بِ']]},{id:'l3',w:0,n:'تَ تُ تِ',s:[['تَ','تُ','تِ'],['بَ','بُ','بِ']]},{id:'l4',w:1,n:'مَا مُو مِي',s:[['مَا','مُو','مِي']]},{id:'l5',w:1,n:'سَا سُو سِي',s:[['سَا','سُو','سِي'],['مَا','مُو','مِي']]}];
const LET=[...'أبتثجحخدذرزسشصضطظعغفقكلمنهوي'];
const WD=[['أسد','🦁'],['بطة','🦆'],['تفاح','🍎'],['ثعلب','🦊'],['جمل','🐪'],['حصان','🐴'],['خروف','🐑'],['دجاجة','🐔'],['ذرة','🌽'],['ريشة','🪶'],['زرافة','🦒'],['سمكة','🐟'],['شمس','☀️'],['صاروخ','🚀'],['ضفدع','🐸'],['طائرة','✈️'],['ظرف','✉️'],['عنب','🍇'],['غيمة','☁️'],['فيل','🐘'],['قمر','🌙'],['كتاب','📖'],['ليمون','🍋'],['موز','🍌'],['نحلة','🐝'],['هدية','🎁'],['وردة','🌹'],['يد','✋']];
const LV=LET.map((l,i)=>({id:'a'+i,w:0,n:l,s:[i?[l+'َ',l+'ُ',l+'ِ']:['أَ','أُ','إِ']]})).concat(WD.map((d,i)=>({id:'w'+i,w:1,n:d[1],wd:i})));
const CARS=[
 {n:'كوبيه GT',p:0,w:1.7,l:3.4,h:.6,cb:.6,k:'sport',sp:1,wr:.38,cl:.34,cz:.05},
 {n:'رالي X',p:60,w:1.9,l:3.5,h:.72,cb:.62,k:'rally',sp:1,wr:.43,cl:.32,cz:.03},
 {n:'هايبركار',p:120,w:1.8,l:3.9,h:.43,cb:.48,k:'hyper',sp:1,wr:.39,cl:.28,cz:.02},
 {n:'جيب 4x4',p:150,w:2,l:3.6,h:.85,cb:.75,k:'jeep',wr:.5,y:.65,cl:.4,cz:.04},
 {n:'بيك أب',p:200,w:1.9,l:4.2,h:.7,cb:.65,k:'pick',cl:.24,cz:-.14,wr:.44},
 {n:'فورمولا',p:260,w:1.5,l:3.8,h:.3,cb:.22,k:'f1',sp:1,ox:.35,wr:.38,cl:.2},
 {n:'فان عائلي',p:320,w:1.9,l:4,h:.95,cb:.9,k:'van',cl:.8,cz:.05,wr:.43},
 {n:'سيدان فاخرة',p:400,w:1.82,l:4,h:.48,cb:.57,k:'sedan',cl:.38,cz:.04,wr:.4},
 {n:'SUV رياضي',p:460,w:1.95,l:3.85,h:.82,cb:.7,k:'suv',cl:.42,cz:.03,wr:.48,y:.56},
 {n:'هاتشباك',p:520,w:1.72,l:3.35,h:.58,cb:.57,k:'hatch',cl:.34,cz:.08,wr:.38},
 {n:'ماسل كار',p:600,w:1.92,l:4.05,h:.54,cb:.5,k:'muscle',sp:1,cl:.32,cz:.02,wr:.43},
 {n:'كهربائية E',p:700,w:1.86,l:3.8,h:.48,cb:.56,k:'electric',sp:1,cl:.36,cz:.04,wr:.4},
 {n:'سوبر نوفا',p:1200,w:1.95,l:4.1,h:.4,cb:.38,k:'nova',sp:1,wr:.4,cl:.26,cz:.02,rim:0xff3b30},
 {n:'رويال ليموزين',p:1500,w:1.9,l:5.5,h:.6,cb:.6,k:'royal',wr:.42,cl:.4,cz:.04,rim:0xfbbf24},
 {n:'سايبر فولت',p:1800,w:2.05,l:4.3,h:.7,cb:.55,k:'volt',wr:.47,cl:.4,cz:.03,rim:0x22d3ee}
];
const COLS=['#38BDF8','#4ADE80','#FB923C','#A78BFA','#F43F5E','#FACC15'];
const H={'أَ':['أَرنب','🐰'],'أُ':['أُذُن','👂'],'إِ':['إِبرة','🪡'],'بَ':['بَطّة','🦆'],'بُ':['بُرتقال','🍊'],'بِ':['بِطّيخ','🍉'],'تَ':['تَمر','🌴'],'تُ':['تُفّاح','🍎'],'تِ':['تِمساح','🐊'],'مَا':['ماء','💧'],'مُو':['موز','🍌'],'مِي':['ميزان','⚖️'],'سَا':['ساعة','⏰'],'سُو':['سُوق','🛒'],'سِي':['سِيّارة','🚗']};
const PR=['أحسنت!','برافو عليك!','ممتاز يا بطل!','رائع جداً!','شاطر!','عمل جميل!','أنت نجم!'],EN=['حاول مرة ثانية، أنت تقدر!','لا بأس، نتعلم معاً!','قريب جداً، استمر!'],pk=a=>a[Math.floor(Math.random()*a.length)];
const aud=t=>'assets/audio/'+[...t].map(c=>c.codePointAt(0).toString(16)).join('-')+'.mp3';
function qsAr(l){const out=[];if(l.wd!=null){for(let k=0;k<5;k++){const i=l.wd,t=WD[(i+k)%28];out.push({id:l.id+'q'+k,t:t[1],sp:t[0],a:aud(t[0]),opts:[t[0],WD[(i+k+9)%28][0],WD[(i+k+18)%28][0]],ok:t[0]})}return out}for(let i=0;i<5;i++){const s=l.s[i%l.s.length],t=s[i%3],q={id:l.id+'q'+i,t,a:aud(t),opts:s.slice(),ok:t};
 if(q.opts.length==3&&new Set(q.opts).size==3&&q.opts.includes(q.ok))out.push(q)}return out}
// ===== save =====
const def=()=>({v:1,coins:0,stars:{},claimed:{},cars:[0],car:0,color:COLS[0],st:{},ach:{},races:0,volume:.75,name:'',avatar:'🦊',avatarImage:'',set:{L:1,S:1,M:0}});
let S;try{S=Object.assign(def(),JSON.parse(localStorage.getItem('tk1')||'{}'));if(S.v!=1||typeof S.coins!='number'||S.coins<0)S=def()}catch(e){S=def()}
// Keep older saved garages compatible with the 12-car local catalogue.
S.cars=(Array.isArray(S.cars)?S.cars:[]).filter(i=>Number.isInteger(i)&&i>=0&&i<CARS.length);if(!S.cars.includes(0))S.cars.unshift(0);if(!Number.isInteger(S.car)||S.car<0||S.car>=CARS.length||!S.cars.includes(S.car))S.car=0;
function sv(){try{localStorage.setItem('tk1',JSON.stringify(S))}catch(e){}}
const $=i=>document.getElementById(i);
const tot=()=>Object.values(S.stars).reduce((a,b)=>a+b,0);
const unlocked=i=>i>=0 && i<LV.length; // All letter and word levels are open.
function hud(){const nm=$('nm');if(nm){nm.innerHTML=(S.avatarImage?'<img class="greeting-avatar" src="'+S.avatarImage+'" alt="صورة اللاعب">':'<span class="greeting-emoji">'+(S.avatar||'🦊')+'</span>')+' <span>'+(S.name||'')+'</span>';}document.querySelectorAll('.co').forEach(e=>e.textContent=S.coins);$('ts').textContent=tot();const ss=$('stageStat');if(ss)ss.textContent=Math.min(LV.length,Object.keys(S.claimed).length+1)+'/'+LV.length;let chip=$('globalAvatar');if(!chip){chip=document.createElement('button');chip.id='globalAvatar';chip.className='global-avatar';chip.title='شخصيتي';chip.onclick=()=>go('profile');document.body.appendChild(chip)}chip.innerHTML=S.avatarImage?'<img src="'+S.avatarImage+'" alt="شخصيتي">':(S.avatar||'🦊');chip.style.display=(!['pre','home','hud','pz','res','gm','gp','garage'].includes(document.querySelector('.scr.on')?.id))?'grid':'none';}
// ===== audio =====
let AC,busy=false,cur0=null;
function ac(){if(S.set.B&&!mi)setTimeout(music,0);try{if(!ac.w&&window.speechSynthesis){ac.w=1;const u=new SpeechSynthesisUtterance(' ');u.volume=0;speechSynthesis.speak(u)}}catch(e){}if(!AC)try{AC=new(window.AudioContext||webkitAudioContext)()}catch(e){}if(AC&&AC.state=='suspended')AC.resume()}
function beep(f,d=.15,t=0){if(!S.set.S||!AC)return;const o=AC.createOscillator(),g=AC.createGain();o.frequency.value=f;g.gain.value=.12*Math.max(0,Math.min(1,Number(S.volume??.75)));o.connect(g);g.connect(AC.destination);o.start(AC.currentTime+t);o.stop(AC.currentTime+t+d)}
function tts(t,lg){if(!('speechSynthesis' in window)){msg('⚠️ هذا المتصفح لا يدعم النطق');return}
 try{const s=speechSynthesis;s.cancel();s.resume();busy=true;setTimeout(()=>{const en=lg==='en',u=new SpeechSynthesisUtterance(t);u.lang=en?'en-US':'ar-SA';u.rate=en?.85:.82;u.volume=Math.max(0,Math.min(1,Number(S.volume??.75)));const vs=s.getVoices(),v=vs.find(v=>v.lang&&v.lang.toLowerCase().startsWith(en?'en':'ar'));if(v)u.voice=v;else if(vs.length&&!en)msg('⚠️ لا يوجد صوت عربي على جهازك');u.onend=()=>{busy=false};u.onerror=e=>{busy=false;if(e.error!=='interrupted'&&e.error!=='canceled')msg('⚠️ تعذر النطق: '+(e.error||''))};s.speak(u)},150);setTimeout(()=>{busy=false},3500)}catch(e){busy=false}}
if('speechSynthesis' in window)speechSynthesis.onvoiceschanged=()=>{};
function say(q){if(cur0){cur0.pause();cur0=null}try{speechSynthesis.cancel()}catch(e){}busy=false;if(!S.set.L)return;let fb=false;const f=()=>{if(fb)return;fb=true;cur0=null;tts(q.sp||q.t+'، '+(H[q.t]?H[q.t][0]:''))};
 try{const a=new Audio(q.a);a.volume=Math.max(0,Math.min(1,Number(S.volume??.75)));cur0=a;busy=true;a.onended=()=>{busy=false};a.onerror=f;setTimeout(()=>{busy=false},4000);a.play().catch(f)}catch(e){f()}}
function replay(){ac();if(Q)say(Q)}
function msg(t){$('msg').textContent=t}
// ===== three =====
let R,sc,cam,carObj,wheels=[],tiles=[],coinsP=[],gates=[],ground,mode='menu',mode0,paused=false,lane=1,cx=0,cz=0,spd=0,last=0;
const LX=l=>(l-1)*3;
function init3(){R=new THREE.WebGLRenderer({antialias:false,alpha:false});R.setPixelRatio(Math.min(devicePixelRatio,1.75));document.body.prepend(R.domElement);
 sc=new THREE.Scene();cam=new THREE.PerspectiveCamera(60,1,.1,200);
 sc.add(new THREE.HemisphereLight(0xffffff,0x88aa77,.9));const d=new THREE.DirectionalLight(0xffffff,.6);d.position.set(5,10,5);sc.add(d);
 const gm=new THREE.PlaneGeometry(80,20),rm=new THREE.PlaneGeometry(9,20),rmat=new THREE.MeshLambertMaterial({color:0x475569}),dm=new THREE.BoxGeometry(.2,.02,2),dmat=new THREE.MeshBasicMaterial({color:0xffffff}),
 tg=new THREE.ConeGeometry(1.2,3.4,6),trg=new THREE.CylinderGeometry(.2,.2,1,6),tm=new THREE.MeshLambertMaterial({color:0x2f9e44}),trm=new THREE.MeshLambertMaterial({color:0x7c4a1e});
 ground=new THREE.MeshLambertMaterial({color:W[0].c});
 for(let i=0;i<8;i++){const g=new THREE.Group(),a=new THREE.Mesh(gm,ground),b=new THREE.Mesh(rm,rmat);a.rotation.x=b.rotation.x=-Math.PI/2;b.position.y=.01;g.add(a,b);
  for(const x of[-1.5,1.5])for(const z of[-5,5]){const m=new THREE.Mesh(dm,dmat);m.position.set(x,.03,z);g.add(m)}
  buildTileExtras(g);
  g.position.z=-i*20+20;sc.add(g);tiles.push(g)}
 const cg=new THREE.OctahedronGeometry(.48,0),cm=new THREE.MeshLambertMaterial({color:0xef4444,emissive:0x7f1d1d});
 for(let i=0;i<24;i++){const m=new THREE.Mesh(cg,cm.clone());m.rotation.x=Math.PI/2;m.visible=false;sc.add(m);coinsP.push(m)}
 const cols=[0x38bdf8,0xfb923c,0xa78bfa],pg=new THREE.CylinderGeometry(.28,.38,4.2,10);
 for(let i=0;i<3;i++){const g=new THREE.Group(),m=new THREE.MeshLambertMaterial({color:cols[i]});
  for(const x of[-1.3,1.3]){const p=new THREE.Mesh(pg,m);p.position.set(x,2.1,0);g.add(p)}
  const cv=document.createElement('canvas');cv.width=cv.height=256;const tx=new THREE.CanvasTexture(cv),
  pl=new THREE.Mesh(new THREE.PlaneGeometry(3,3),new THREE.MeshBasicMaterial({map:tx,transparent:true}));pl.position.y=5.9;const bm=new THREE.Mesh(new THREE.BoxGeometry(3.25,.55,.5),m);bm.position.y=4.3;const st=new THREE.Mesh(new THREE.PlaneGeometry(2.8,3),new THREE.MeshBasicMaterial({color:cols[i],transparent:true,opacity:.45}));st.rotation.x=-Math.PI/2;st.position.y=.05;g.add(bm,pl,st);g.userData={cv,tx};g.visible=false;sc.add(g);gates.push(g)}
 // Road hazards: large police-style reflective warning triangles (clearly unlike collectible crystals)
 const triShape=new THREE.Shape();triShape.moveTo(0,1.35);triShape.lineTo(-.92,-.55);triShape.lineTo(.92,-.55);triShape.closePath();
 const innerShape=new THREE.Shape();innerShape.moveTo(0,1.03);innerShape.lineTo(-.65,-.34);innerShape.lineTo(.65,-.34);innerShape.closePath();
 const triGeo=new THREE.ShapeGeometry(triShape),innerGeo=new THREE.ShapeGeometry(innerShape);
 const triRed=new THREE.MeshBasicMaterial({color:0xef3038,side:THREE.DoubleSide}),triWhite=new THREE.MeshBasicMaterial({color:0xffffff,side:THREE.DoubleSide});
 const stripeMat=new THREE.MeshBasicMaterial({color:0xef3038}),baseMat=new THREE.MeshLambertMaterial({color:0x263447});
 for(let i=0;i<8;i++){
  const ob=new THREE.Group(),base=new THREE.Mesh(new THREE.BoxGeometry(1.75,.18,.62),baseMat),outer=new THREE.Mesh(triGeo,triRed),inner=new THREE.Mesh(innerGeo,triWhite);
  base.position.set(0,.12,0);outer.position.set(0,1.05,.16);inner.position.set(0,1.05,.18);
  ob.add(base,outer,inner);
  for(let j=0;j<3;j++){const stripe=new THREE.Mesh(new THREE.BoxGeometry(.18,.72,.025),stripeMat);stripe.position.set((j-1)*.38,.88,.205);stripe.rotation.z=(j-1)*-.38;ob.add(stripe)}
  const beacon=new THREE.Mesh(new THREE.SphereGeometry(.12,10,8),new THREE.MeshBasicMaterial({color:0xffd84d}));beacon.position.set(0,1.82,.2);ob.add(beacon);
  ob.visible=false;sc.add(ob);obstacles.push(ob)
 }
 // Lightweight rain streaks; visible only in the rainy theme.
 const rainMat=new THREE.LineBasicMaterial({color:0xdbeafe,transparent:true,opacity:.55});
 for(let i=0;i<100;i++){const geo=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0,0,0),new THREE.Vector3(0,.55,0)]);const drop=new THREE.Line(geo,rainMat);drop.position.set((Math.random()-.5)*36,Math.random()*14,Math.random()*-90);drop.visible=false;sc.add(drop);rainDrops.push(drop)}
 addEventListener('resize',rs);rs();premiumInit();applyCar();requestAnimationFrame(loop)}
function rs(){R.setSize(innerWidth,innerHeight,false);cam.aspect=innerWidth/innerHeight;cam.fov=innerWidth<innerHeight?75:60;cam.updateProjectionMatrix()}
function label(g,t){const c=g.userData.cv.getContext('2d');c.clearRect(0,0,256,256);c.fillStyle='#fff';c.beginPath();c.roundRect?c.roundRect(8,8,240,240,40):c.rect(8,8,240,240);c.fill();c.fillStyle='#102744';c.font='800 '+(t.length<=3?110:t.length<=5?72:54)+'px Cairo,sans-serif';c.textAlign='center';c.textBaseline='middle';c.direction='rtl';c.fillText(t,128,140);g.userData.tx.needsUpdate=true}
function applyCar0(){if(carObj){sc.remove(carObj);carObj.traverse(o=>{if(o.isMesh){o.geometry.dispose();o.material.dispose()}})}
 const c=CARS[S.car],g=new THREE.Group(),col=new THREE.MeshLambertMaterial({color:S.color}),dk=new THREE.MeshLambertMaterial({color:0x1f2937});wheels=[];
 const b=new THREE.Mesh(new THREE.BoxGeometry(c.w,c.h,c.l),col);b.position.y=.55+c.h/2;g.add(b);
 const k=new THREE.Mesh(new THREE.BoxGeometry(c.w*.75,c.cb,c.l*.42),new THREE.MeshLambertMaterial({color:0xbfe9ff}));k.position.set(0,.55+c.h+c.cb/2,.2);g.add(k);
 if(c.sp){const s=new THREE.Mesh(new THREE.BoxGeometry(c.w,.08,.5),col);s.position.set(0,.55+c.h+.5,c.l/2-.1);g.add(s);for(const x of[-.5,.5]){const p=new THREE.Mesh(new THREE.BoxGeometry(.08,.5,.08),dk);p.position.set(x,.55+c.h+.25,c.l/2-.1);g.add(p)}}
 for(const x of[-1,1])for(const z of[-1,1]){const w=new THREE.Mesh(new THREE.CylinderGeometry(.42,.42,.3,12),dk);w.rotation.z=Math.PI/2;w.position.set(x*(c.w/2),.42,z*c.l*.32);g.add(w);wheels.push(w)}
 const hl=new THREE.MeshBasicMaterial({color:0xfff3b0}),tl=new THREE.MeshBasicMaterial({color:0xff4d4d});for(const x of[-.55,.55]){const a=new THREE.Mesh(new THREE.BoxGeometry(.3,.18,.08),hl);a.position.set(x*c.w/1.1,.55+c.h*.55,-c.l/2);const b2=new THREE.Mesh(new THREE.BoxGeometry(.3,.18,.08),tl);b2.position.set(x*c.w/1.1,.55+c.h*.55,c.l/2);g.add(a,b2)}const sp2=new THREE.Mesh(new THREE.BoxGeometry(.18,.02,c.l*.9),new THREE.MeshLambertMaterial({color:0xffffff}));sp2.position.set(0,.56+c.h,0);g.add(sp2);carObj=g;sc.add(g)}
function setWorld(w){const selected=WORLDS?.find(x=>x.id===S.world);if(selected){ground.color.set(selected.land);sc.background=new THREE.Color(selected.sky);sc.fog=new THREE.Fog(selected.sky,40,110);tiles.forEach(g=>{if(g.children[1]?.material?.color)g.children[1].material.color.set(selected.road)});return}ground.color.setHex(W[w].c);sc.background=new THREE.Color(W[w].sky);sc.fog=new THREE.Fog(W[w].sky,40,110)}
// ===== game =====
let Q,queue,asked,right,tries,state,timer,gz,gOK,cur,earned,fdc,miss;let lives=3,obstacles=[],crystalKinds=[],rainDrops=[];let adaptiveSpeed=14;
function startLevel(i){ac();if(!Number.isInteger(i)||i<0||i>=LV.length||!unlocked(i)){cel('🔒 أكمل المرحلة السابقة أولاً لفتح هذه المرحلة',2200,0);return}lives=3;updateHearts();cur=i;mode=mode0='play';const l=LV[i];queue=qs(l);asked=right=earned=0;miss={};thm(i);const completed=Object.keys(S.claimed).length;const accuracy=Object.values(S.st).reduce((a,v)=>a+v.c,0)/Math.max(1,Object.values(S.st).reduce((a,v)=>a+v.a,0));adaptiveSpeed=Math.max(11,Math.min(18,13+Math.min(4,completed*.12)+(accuracy>.82?1:accuracy<.5?-1:0)));reset();S.races++;sv();show('hud');Q=null;next()}
function startFree(){ac();lives=3;updateHearts();mode=mode0='free';cur=0;fdc=0;setWorld(0);reset();show('hud');$('tg').style.display=$('rp').style.display='none';$('tgBig')&&$('tgBig').classList.remove('on');msg('اجمع العملات!');$('qn').textContent='قيادة حرة'}
function reset(){lives=3;updateHearts();paused=false;lane=1;cx=0;cz=0;spd=adaptiveSpeed;state='';carObj.position.set(0,0,0);carObj.rotation.y=0;gates.forEach(g=>g.visible=false);coinsP.forEach(c=>c.visible=false);$('tg').style.display='inline-block';$('rp').style.display='';gates.forEach(g=>g.visible=false)}
function next(){if(!queue.length)return finish();Q=queue.shift();state='intro';timer=0;$('tg').textContent=(LV[cur].w?'الكلمة المطلوبة':'الحرف المطلوب')+'\n'+(LV[cur].w?(Q.sp||Q.t):Q.t);$('tg').classList.add('target-letter');$('qn').textContent=Math.min(right+1,5)+'/5 · '+(adaptiveSpeed<13?'تدريب هادئ':adaptiveSpeed>15?'تحدي أسرع':'مستوى متوازن');msg(H[Q.t]?H[Q.t][1]+' '+H[Q.t][0]:'اسمع واختر البوابة الصحيحة');say(Q);showTarget()}
function spawnGates(){const o=Q.opts.slice().sort(()=>Math.random()-.5);gOK=o.indexOf(Q.ok);gz=cz-56;obstacles.forEach(o=>{if(o.visible&&o.position.z<gz+32)o.visible=false});gates.forEach((g,i)=>{g.position.set(LX(i),0,gz);label(g,o[i]);g.visible=true});state='run'}
function updateHearts(){const el=$('hearts');if(el)el.innerHTML=[0,1,2].map(i=>'<span style="opacity:'+(i<lives?'1':'.22')+'">❤️</span>').join(' ')}
function loseHeart(reason){lives=Math.max(0,lives-1);updateHearts();msg('⚠️ '+reason);beep(240,.28);if(lives<=0){state='done';mode='menu';gates.forEach(g=>g.visible=false);cel('💗 انتهت القلوب! خذ نفساً وحاول من جديد',1800,0);setTimeout(()=>{if(mode==='menu'&&$('hud').classList.contains('on')){mode='menu';show('res');$('rb').innerHTML='انتهت القلوب الثلاثة. جرّب مرة أخرى يا بطل!';$('nx').style.display='none'}},900)}}
function answer(l){const ok=l==gOK;asked+=ok&&!miss[Q.id]?1:0;
 if(ok){if(!miss[Q.id])right++;if(!miss[Q.id]){earned+=3;S.coins+=3}sv();hud();fx(LV[cur].w?4:2);beep(660,.12);beep(880,.2,.12);const en=LV[cur].lang==='en',p=pk(en?PRE:PR);msg('✅ '+p);tts(p,en?'en':'');bump(true)}
 else{miss[Q.id]=1;asked++;loseHeart('إجابة غير صحيحة! حاول مرة أخرى');beep(300,.25);cel('<span style="color:#ef4444;font-size:90px">❌</span><br>😢 حاول مرة أخرى!',1400,0);msg('💪 '+pk(EN)+' الصحيح: '+Q.ok);queue.unshift(Object.assign({},Q));say(Q);const s=S.st[Q.t]=S.st[Q.t]||{a:0,c:0};}
 const s=S.st[Q.t]=S.st[Q.t]||{a:0,c:0};s.a++;if(ok)s.c++;sv();if(lives<=0){state='done';return}state='fb';timer=0}
function bump(){}
function finish(){state='done';mode='menu';const acc=right/5,st=acc>=.9?3:acc>=.6?2:1,id=LV[cur].id,first=!S.claimed[id];
 const pay=10;S.coins+=pay;S.claimed[id]=1;S.stars[id]=Math.max(S.stars[id]||0,st);sv();ach();
 $('rh').textContent='⭐'.repeat(st)+'☆'.repeat(3-st);$('nx').style.display=LV[cur+1]?'':'none';$('rb').innerHTML='🎉 أنهيت '+(LV[cur].w?'كلمات ':'حرف ')+LV[cur].n+'!<br>'+(st==3?'ممتاز يا بطل! أنت نجم السباق 🏆':st==2?'رائع! قريب من الثلاث نجوم 💪':'أحسنت! كل مرة تتعلم أكثر 🌟')+'<br>إجابات صحيحة من أول مرة: '+right+'/5<br>💎 +'+pay+(first?'':' (إعادة)');if(right>=4&&LV[cur+1]){cel('🎉 برافو! أنهيت '+(LV[cur].w?'كلمات ':'حرف ')+LV[cur].n+'<br>💎 +10 · هيا للتالي!',3200);tts(pk(PR));setTimeout(()=>{if(state=='done')startLevel(cur+1)},3400)}else{if(right==5)cel('🏆 ممتاز! 5/5<br>💎 +10',2800);tts(st==3?'ممتاز يا بطل':'أحسنت');show('res')}}
function steer(d){ac();if(paused||!(mode=='play'||mode=='free'))return;lane=Math.max(0,Math.min(2,lane+d))}
function pause(p){if(mode!='play'&&mode!='free'&&p)return;paused=!!p;if(p){try{speechSynthesis.cancel()}catch(e){}if(cur0)cur0.pause();busy=false}$('pz').classList.toggle('on',!!p);tg()}
function loop(t){requestAnimationFrame(loop);if(document.hidden){last=t;return}const dt=Math.min((t-last)/1000,.05);last=t;
 const play=mode=='play'||mode=='free';
 if(play&&!paused&&state!='done'){S.t=(S.t||0)+dt;sess+=dt;if(S.lim&&sess>S.lim*60&&!warned){warned=1;pause(1);cel('😴 وقت الاستراحة! خذ قسطاً من الراحة',4000,0)}cz-=spd*dt;specialT-=dt;cx+=(LX(lane)-cx)*Math.min(1,dt*10);carObj.position.set(cx,0,cz);carObj.rotation.y=(LX(lane)-cx)*-.12;wheels.forEach(w=>w.rotation.x-=spd*dt*2.4);
  if(state=='intro'){timer+=dt;if(timer>1.6&&(!busy||timer>4))spawnGates()}
  else if(state=='run'&&cz<gz+.5)answer(lane);
  else if(state=='fb'){timer+=dt;if(timer>1.5){gates.forEach(g=>g.visible=false);next()}}
  coinsP.forEach(c=>{c.rotation.z+=dt*4;if(c.visible&&(c.position.z>cz+5))c.visible=false;
   if(c.visible&&Math.abs(c.position.z-cz)<1&&Math.abs(c.position.x-cx)<1.4){c.visible=false;const val=c.userData.value||1;S.coins+=val;beep(1000,.08);if(val>=20){cel('💎 كريستالة مميزة! +20 عملة',1300,1);beep(1300,.2)}if(mode=='free'){if(fdc<1e9){fdc++;sv()}else msg('وصلت للحد الأقصى اليوم 🎉')}else{sv()}hud()}
   if(!c.visible&&Math.random()<dt*2.2&&!(state=='run'&&false)){const val=takeVal();c.userData.value=val;paintCrystal(c,val);c.position.set(LX(Math.floor(Math.random()*3)),.8,cz-40-Math.random()*60);c.visible=state!='run'||c.position.z>gz+8||c.position.z<gz-8?true:false}});
  obstacles.forEach(ob=>{if(ob.visible&&ob.position.z>cz+4)ob.visible=false;if(ob.visible&&Math.abs(ob.position.z-cz)<1.1&&Math.abs(ob.position.x-cx)<1.25){ob.visible=false;loseHeart('اصطدمت بعائق! انتبه للطريق');}if(!ob.visible&&Math.random()<dt*.07&&(state==='fb'||!state)&&obstacles.filter(o=>o.visible).length<2){ob.position.set(LX(Math.floor(Math.random()*3)),0,cz-35-Math.random()*45);ob.rotation.y=0;ob.visible=true}});
  cam.position.set(cx*.35,4.4,cz+7);cam.lookAt(cx*.35,1.35,cz-4)}
 else if(!play){carObj.rotation.y+=dt*.8;carObj.position.set(0,0,0);cz=0;cam.position.set(0,mode=='garage'?2.8:2.6,mode=='garage'?8.5:7);cam.lookAt(0,mode=='garage'?-.2:.8,0)}
 rainDrops.forEach(d=>{d.visible=(curTheme().fx==='rain'&&(mode==='play'||mode==='free'));if(d.visible){d.position.y-=dt*13;if(d.position.y<0){d.position.y=12;d.position.z=cz-20-Math.random()*70;d.position.x=(Math.random()-.5)*28}}});tiles.forEach(g=>{if(g.position.z>cz+30)g.position.z-=160;if(g.position.z<cz-130)g.position.z+=160});
 plat&&(plat.visible=mode=='garage');R.render(sc,cam)}
document.addEventListener('visibilitychange',()=>{if(document.hidden)pause(1)});
addEventListener('keydown',e=>{const k=e.key;if(k=='ArrowLeft'||k=='a')steer(-1);if(k=='ArrowRight'||k=='d')steer(1);if(k==' '||k=='Escape'){if(mode=='play'||mode=='free')pause(!paused)}});
let tx0=0;addEventListener('touchstart',e=>{tx0=e.touches[0].clientX},{passive:true});addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-tx0;if(Math.abs(d)>50)steer(d>0?1:-1)},{passive:true});
// ===== ui =====
function show(id){document.querySelectorAll('.scr').forEach(s=>s.classList.toggle('on',s.id==id));let nav=$('globalHomeBack');const inner=!['pre','home','hud','pz'].includes(id);if(inner){if(!nav){nav=document.createElement('button');nav.id='globalHomeBack';nav.className='global-home-back';nav.innerHTML='<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';nav.setAttribute('aria-label','العودة للرئيسية');nav.onclick=()=>go('home');document.body.appendChild(nav)}nav.style.display='flex'}else if(nav)nav.style.display='none';hud();if(id==='profile')renderProfile()}
const AVATARS=['🦊','🐼','🦁','🐯','🐸','🐵','🐰','🐻','🐨','🐱','🚗','🏎️'];
function renderProfile(){const n=$('playerName'),a=$('avatarPreview'),c=$('avatarChoices');if(!n||!a||!c)return;n.value=S.name||'';a.innerHTML=S.avatarImage?'<img src="'+S.avatarImage+'" alt="صورة اللاعب">':(S.avatar||'🦊');c.innerHTML=AVATARS.map(v=>'<button type="button" class="avatar-choice '+(v===S.avatar?'selected':'')+'" data-avatar="'+v+'" onclick="pickAvatar(this)">'+v+'</button>').join('')}
function pickAvatar(el){S.avatar=el.dataset.avatar||'🦊';S.avatarImage='';renderProfile()}
function saveProfile(){S.name=$('playerName').value.trim().slice(0,22);sv();hud();go('home');cel('تم حفظ الشخصية! 🎉',1800,1)}
$('avatarFile')?.addEventListener('change',e=>{const f=e.target.files&&e.target.files[0];if(!f)return;if(!f.type.startsWith('image/')){cel('اختار ملف صورة صالح',1800,0);return}if(f.size>2500000){cel('اختار صورة أقل من 2.5MB',1800,0);return}const r=new FileReader();r.onerror=()=>cel('تعذر قراءة الصورة، جرّب صورة أخرى',1800,0);r.onload=()=>{const im=new Image();im.onload=()=>{try{const cv=document.createElement('canvas'),max=420,scale=Math.min(1,max/Math.max(im.width,im.height));cv.width=Math.round(im.width*scale);cv.height=Math.round(im.height*scale);cv.getContext('2d').drawImage(im,0,0,cv.width,cv.height);S.avatarImage=cv.toDataURL('image/jpeg',.82);sv();renderProfile();hud();cel('تمت إضافة صورتك بنجاح 📸',1500,1)}catch(err){cel('تعذر تجهيز الصورة، جرّب صورة أصغر',1800,0)}};im.onerror=()=>cel('الصورة غير مدعومة',1800,0);im.src=r.result};r.readAsDataURL(f)});
const WORLDS=[
 {id:'day',n:'نهار مشمس',e:'☀️',sky:'#9be0ff',land:'#7ec850',road:'#475569',desc:'سماء زرقاء وشمس مشرقة'},
 {id:'sunset',n:'غروب دافئ',e:'🌇',sky:'#ffbd9a',land:'#d6b36b',road:'#745c70',desc:'ألوان الغروب البرتقالية'},
 {id:'night',n:'ليل النجوم',e:'🌙',sky:'#101a43',land:'#263d48',road:'#202a3c',desc:'سماء ليلية وأجواء هادئة'},
 {id:'rain',n:'جو ممطر',e:'🌧️',sky:'#8cabc3',land:'#627c73',road:'#3b4b5b',desc:'سماء غائمة وطريق بارد'},
 {id:'forest',n:'طريق الغابة',e:'🌲',sky:'#bde7d0',land:'#33845b',road:'#596b70',desc:'غابة خضراء مليئة بالأشجار'},
 {id:'desert',n:'طريق الصحراء',e:'🏜️',sky:'#ffe0a3',land:'#d8b36a',road:'#77716a',desc:'رمال وتلال صحراوية'},
 {id:'city',n:'طريق البيوت',e:'🏘️',sky:'#b8e4ff',land:'#80b7a0',road:'#515b6d',desc:'بيوت ملوّنة حول الطريق'},
 {id:'beach',n:'طريق البحر',e:'🌊',sky:'#8de2ff',land:'#36b9c7',road:'#596b78',desc:'بحر وشاطئ ونخيل حول الطريق'}
];
function applyWorld(id){const w=WORLDS.find(x=>x.id===id)||WORLDS[0];S.world=id;sv();if(ground)ground.color.set(w.land);if(sc){sc.background=new THREE.Color(w.sky);sc.fog=new THREE.Fog(w.sky,40,110)}if(tiles)tiles.forEach(g=>{if(g.children[1]?.material?.color)g.children[1].material.color.set(w.road)});hud();renderWorldShop()}
function renderWorldShop(){const el=$('worlditems');if(!el)return;const own=S.worlds||['day'];el.innerHTML=WORLDS.map(w=>{const active=(S.world||'day')===w.id;return '<div class="world-card '+(active?'selected':'')+'"><div class="world-preview" style="background:linear-gradient('+w.sky+' 0 48%,'+w.land+' 48%)"><span class="sun" style="display:'+(w.id==='night'||w.id==='rain'?'none':'block')+'"></span><span class="mount"></span><span class="mini-road" style="background:'+w.road+'"></span><span style="position:absolute;left:10px;top:6px;font-size:24px">'+w.e+'</span></div><b>'+w.n+'</b><small>'+w.desc+'</small><button data-id="'+w.id+'" onclick="chooseWorld(this.dataset.id)">'+(active?'✔ مُختار':'اختار مجانًا')+'</button></div>'}).join('')}
function chooseWorld(id){const w=WORLDS.find(x=>x.id===id);if(!w)return;S.world=id;S.worlds=S.worlds||['day'];if(!S.worlds.includes(id))S.worlds.push(id);applyWorld(id);sv();hud();renderWorldShop();cel('تم اختيار '+w.n+' مجانًا ✓',1200,1)}
function go(id){mode=id=='garage'?'garage':'menu';if(id!='garage'){pv=null;applyCar()}show(id);({map:rmap,garage:rgar,prog:rprog,set:tg,alb:ralb,worldshop:renderWorldShop})[id]?.()}
function rmap(){let h='';W.forEach((w,wi)=>{h+='<h2>'+w.n+(tot()<w.req?' 🔒 ('+w.req+'⭐)':'')+'</h2><div class="row">';LV.forEach((l,i)=>{if(l.w==wi)h+='<button class="lv" '+(unlocked(i)?'':'disabled')+' onclick="startLevel('+i+')">'+(unlocked(i)?l.n+'<br>'+'⭐'.repeat(S.stars[l.id]||0):'🔒')+'</button>'});h+='</div>'});$('lvs').innerHTML=h}
function rgar0(){const c=CARS[S.car];$('gi').textContent=c.n;
 $('gc').innerHTML=CARS.map((x,i)=>'<button class="btn s '+(i==S.car?'g':'')+'" onclick="pick('+i+')">'+x.n+(S.cars.includes(i)?'':' 💎'+x.p)+'</button>').join('');
 $('gd').innerHTML=COLS.map(c=>'<div class="dot'+(c==S.color?' sel':'')+'" style="background:'+c+'" onclick="S.color=\''+c+'\';sv();applyCar();rgar()"></div>').join('');
 const own=S.cars.includes(S.car),b=$('gb');b.textContent=own?'✔ مُجهّزة':'اشترِ 💎'+c.p;b.disabled=own;b.onclick=()=>{if(S.coins>=c.p&&!own){S.coins-=c.p;S.cars.push(S.car);sv();hud();rgar()}else msg0('لا تكفي العملات')}}
function msg0(t){$('gi').textContent=t}
function pick(i){S.car=i;applyCar();rgar();if(S.cars.includes(i))sv()}
function ach(){const n=Object.keys(S.claimed).length;Object.assign(S.ach,{'أول سباق':S.races>0,'خمس إجابات صحيحة':Object.values(S.st).reduce((a,b)=>a+b.c,0)>=5,'جولة مثالية':Object.values(S.stars).includes(3),'ثلاثة مستويات':n>=3});sv()}
function rprog0(){ach();$('ach').innerHTML=Object.entries(S.ach).map(([k,v])=>(v?'🏆 ':'🔒 ')+k).join('<br>');
 const w=Object.entries(S.st).filter(([k,v])=>v.c/v.a<.7).map(([k])=>k);$('rev').innerHTML='<b>تحتاج مراجعة:</b> '+(w.join(' ')||'لا شيء')+'<br>'+Object.entries(S.st).map(([k,v])=>k+' '+v.c+'/'+v.a).join(' · ')+'<hr><b>تقرير للأهل</b><br>وقت اللعب: '+Math.round((S.t||0)/60)+' دقيقة<br>الدقة: '+Math.round(100*Object.values(S.st).reduce((s,v)=>s+v.c,0)/Math.max(1,Object.values(S.st).reduce((s,v)=>s+v.a,0)))+'%<br>مراحل منجزة: '+Object.keys(S.claimed).length+'/56'}
function tg(){$('s5').textContent='🎵 الموسيقى'+(S.set.B?' ✅':' ❌');$('s5').onclick=()=>{S.set.B^=1;sv();music();tg()};$('s6').textContent='👤 الاسم: '+(S.name||'—');$('s6').onclick=()=>{const v=prompt('اسم الطفل؟',S.name||'');if(v!==null){S.name=v.slice(0,12);sv();tg();hud()}};$('s7').textContent='🦊 الشخصية: '+(S.av||'🦊');$('s7').onclick=()=>{const A=['🦊','🐼','🦁','🐯','🐸','🦄'];S.av=A[(A.indexOf(S.av||'🦊')+1)%6];sv();tg();hud()};$('s8').textContent='⏱️ حد اللعب: '+(S.lim?S.lim+' د':'بدون');$('s8').onclick=()=>{const L=[0,10,20,30];S.lim=L[(L.indexOf(S.lim||0)+1)%4];sess=0;warned=0;sv();tg()};$('s9').textContent='🖼️ الجودة: '+(S.set.Q?'منخفضة':'عالية');$('s9').onclick=()=>{S.set.Q^=1;R.setPixelRatio(S.set.Q?1:Math.min(devicePixelRatio,1.75));sv();tg()};$('s4').textContent='🔊 اختبار النطق';$('s4').onclick=()=>{ac();const vs=window.speechSynthesis?speechSynthesis.getVoices():[];const ar=vs.filter(v=>v.lang&&v.lang.toLowerCase().startsWith('ar')).length;$('s4').textContent='أصوات: '+vs.length+' · عربي: '+ar;tts('أَرنب')};const f=(k,n)=>{S.set[k]=S.set[k];return n+(S.set[k]?' ✅':' ❌')};$('s1').textContent=f('L','نطق الحروف');$('s2').textContent=f('S','المؤثرات');$('s3').textContent=S.set.M?'🔇 كتم الكل':'🔊 كتم الكل';
 $('s1').onclick=()=>{S.set.L^=1;sv();tg()};$('s2').onclick=()=>{S.set.S^=1;sv();tg()};$('s3').onclick=()=>{S.set.M^=1;if(S.set.M){S.set.L=S.set.S=0}else S.set.L=S.set.S=1;sv();tg()};
 const setBox=$('set');let volBox=$('volumeBox');if(!volBox){volBox=document.createElement('div');volBox.id='volumeBox';volBox.className='card volume-box';volBox.innerHTML='<label for="volumeRange">🔉 مستوى الصوت <b id="volumeValue">75%</b></label><input id="volumeRange" type="range" min="0" max="100" value="75" step="5" aria-label="مستوى الصوت"><small>يشمل النطق والمؤثرات والموسيقى</small>';const anchor=$('s4');anchor.insertAdjacentElement('afterend',volBox)}const vr=$('volumeRange');vr.value=Math.round(Math.max(0,Math.min(1,Number(S.volume??.75)))*100);$('volumeValue').textContent=vr.value+'%';vr.oninput=()=>{S.volume=Number(vr.value)/100;$('volumeValue').textContent=vr.value+'%';sv();if(AC&&S.set.B)music()};
 $('pls').textContent='الصوت: '+(S.set.S?'يعمل':'متوقف');$('pls').onclick=()=>{S.set.S^=1;S.set.L=S.set.S;sv();tg()}}
let gcap=0,bad=0;function gwin(n){if(gcap<30){gcap+=n;S.coins+=n;sv();hud()}}
function balloons(){ac();show('gp');let r=0,n=0;const A=$('ga'),cl=['#38BDF8','#4ADE80','#FB923C','#A78BFA','#F43F5E','#FACC15'];
 const round=()=>{if(r==8){$('gh').textContent='🎉 برافو! '+n+'/8';gwin(n>5?5:2);tts('ممتاز يا بطل');A.innerHTML='<button class="btn g" onclick="balloons()">العب مرة أخرى</button>';return}
  const t=LET[Math.floor(Math.random()*28)],o=[t];while(o.length<6){const x=LET[Math.floor(Math.random()*28)];if(!o.includes(x))o.push(x)}o.sort(()=>Math.random()-.5);bad=0;
  $('gh').textContent='اضغط على البالون: '+t+'  ('+(r+1)+'/8)';$('gh').innerHTML='<div class="big">'+t+'</div><small>'+$('gh').textContent+'</small>';tts(t);
  A.innerHTML=o.map((x,i)=>'<button class="lv" style="border-radius:50%;width:90px;height:110px;color:#fff;background:'+cl[i]+';animation:fl 1.6s ease-in-out '+i*.2+'s infinite alternate" data-x="'+x+'">'+x+'</button>').join('');
  A.onclick=e=>{const b=e.target.closest('button');if(!b||!b.dataset.x)return;if(b.dataset.x==t){if(!bad)n++;beep(800,.15);fx(2);tts(pk(PR));b.style.visibility='hidden';r++;A.onclick=null;setTimeout(round,1000)}else{bad=1;beep(300,.2);b.style.opacity=.3;$('gh').textContent='حاول مرة أخرى 💪 ابحث عن: '+t;$('gh').innerHTML='<div class="big">'+t+'</div><small>'+$('gh').textContent+'</small>'}}};
 round()}
function memory(){ac();show('gp');const P=[...Array(28).keys()].sort(()=>Math.random()-.5).slice(0,6),c=P.flatMap(i=>[{k:i,v:LET[i]},{k:i,v:WD[i][1]}]).sort(()=>Math.random()-.5),A=$('ga');let open=[],done=0;
 $('gh').textContent='طابق الحرف مع صورته';
 A.innerHTML=c.map((x,i)=>'<button class="lv" data-i="'+i+'" style="width:76px;height:90px;font-size:34px">❓</button>').join('');
 A.onclick=e=>{const b=e.target.closest('button');if(!b||!b.dataset.i||open.length>1||b.disabled)return;const x=c[b.dataset.i];b.textContent=x.v;b.disabled=true;b.style.opacity=1;open.push([b,x]);tts(x.v.length==1?x.v:WD[x.k][0]);
  if(open.length==2){const[[b1,x1],[b2,x2]]=open;if(x1.k==x2.k){beep(800,.15);fx(2);done++;open=[];if(done==6){$('gh').textContent='🎉 '+pk(PR);gwin(5);A.innerHTML+='<button class="btn g" onclick="memory()">مرة أخرى</button>'}}else setTimeout(()=>{b1.textContent=b2.textContent='❓';b1.disabled=b2.disabled=false;open=[]},900)}}}
let pts=[],fxr=0,mi=0;
function cel(h,ms,n){const e=$('cel');e.innerHTML=(n===0?'':'<div style="font-size:54px">'+(S.av||'🦊')+'</div>')+h;e.style.display='block';if(n!==0)fx(6);setTimeout(()=>e.style.display='none',ms)}
function fx(n){const c=$('fx');c.width=innerWidth;c.height=innerHeight;const C=['#38BDF8','#4ADE80','#FB923C','#A78BFA','#F43F5E','#FACC15'];for(let b=0;b<n;b++)setTimeout(()=>{const x=innerWidth*(.15+Math.random()*.7),y=innerHeight*(.15+Math.random()*.4);for(let i=0;i<40;i++){const a=Math.PI*2*i/40,v=2+Math.random()*3;pts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l:60,col:C[b%6]})}if(!fxr)fxl()},b*250)}
function fxl(){fxr=1;const c=$('fx'),g=c.getContext('2d');g.clearRect(0,0,c.width,c.height);pts=pts.filter(p=>p.l>0);for(const p of pts){p.x+=p.vx;p.y+=p.vy;p.vy+=.06;p.l--;g.globalAlpha=p.l/60;g.fillStyle=p.col;g.beginPath();g.arc(p.x,p.y,3,0,7);g.fill()}if(pts.length)requestAnimationFrame(fxl);else fxr=0}
function daily(){ac();const d=new Date().toDateString();if(S.day==d){cel('🎁 استلمت مكافأتك اليوم! ارجع غداً',2500);return}const y=new Date(Date.now()-864e5).toDateString();S.streak=S.day==y?(S.streak||0)+1:1;S.day=d;const r=10+Math.min(S.streak,7)*2;S.coins+=r;sv();hud();cel('🎁 مكافأة اليوم +'+r+' 💎<br>أيام متتالية: '+S.streak,3000)}
function music(){clearInterval(mi);mi=0;if(!S.set.B||S.set.M)return;let k=0;const n=[262,330,392,330,294,349,440,349];mi=setInterval(()=>{if(!AC||document.hidden)return;const o=AC.createOscillator(),g=AC.createGain();o.frequency.value=n[k++%8];g.gain.setValueAtTime(.03*Math.max(0,Math.min(1,Number(S.volume??.75))),AC.currentTime);g.gain.exponentialRampToValueAtTime(.001,AC.currentTime+.5);o.connect(g);g.connect(AC.destination);o.start();o.stop(AC.currentTime+.5)},550)}
function trace0(){ac();show('gp');const i=Math.floor(Math.random()*28),A=$('ga');A.onclick=null;$('gh').textContent='تتبّع الحرف بإصبعك: '+LET[i];tts(LET[i]);
 A.innerHTML='<canvas id="tc" width="300" height="300" style="position:static;width:300px;height:300px;background:#fff;border-radius:24px;touch-action:none"></canvas><div class="row"><button class="btn s g" id="td">تم ✔</button><button class="btn s" id="tx">مسح</button></div>';
 const c=$('tc'),g=c.getContext('2d'),base=()=>{g.clearRect(0,0,300,300);g.fillStyle='#cbd5e1';g.font='800 240px Cairo,sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText(LET[i],150,170)};base();let d=0,ink=0;
 c.onpointerdown=e=>{d=1;c.setPointerCapture(e.pointerId)};c.onpointerup=()=>{d=0;g.beginPath()};
 c.onpointermove=e=>{if(!d)return;const r=c.getBoundingClientRect(),x=(e.clientX-r.left)*300/r.width,y=(e.clientY-r.top)*300/r.height;g.lineWidth=16;g.lineCap='round';g.strokeStyle='#38BDF8';g.lineTo(x,y);g.stroke();g.beginPath();g.moveTo(x,y);ink++};
 $('tx').onclick=()=>{base();ink=0};$('td').onclick=()=>{if(ink<25){$('gh').textContent='ارسم الحرف بإصبعك أولاً ✍️';return}gwin(3);cel('🌟 '+pk(PR),1800);trace()}}
function applyCar1(){if(carObj){sc.remove(carObj);carObj.traverse(o=>{if(o.isMesh){o.geometry.dispose();o.material.dispose()}})}
 const c=CARS[S.car],g=new THREE.Group(),M=(col,o)=>new THREE.MeshStandardMaterial(Object.assign({color:col,roughness:.35,metalness:.5},o||{})),
 body=M(S.color),dk=M(0x111827,{roughness:.8,metalness:0}),gl=M(0x9fd8ff,{roughness:.05,metalness:.9}),ch=M(0xe5e7eb,{metalness:1,roughness:.2}),wh=M(0xffffff,{metalness:0}),hl=new THREE.MeshBasicMaterial({color:0xfff3b0}),tl=new THREE.MeshBasicMaterial({color:0xff3b3b}),
 B=(w,h,l,m,x,y,z)=>{const e=new THREE.Mesh(new THREE.BoxGeometry(w,h,l),m);e.position.set(x,y,z);g.add(e);return e};
 wheels=[];const W=c.w,L=c.l,y0=c.y||.5,H=c.h;
 B(W,H*.55,L,body,0,y0+H*.28,0);B(W*.96,H*.5,L*.38,body,0,y0+H*.7,-L*.3);B(W*.96,H*.45,L*.2,body,0,y0+H*.68,L*.4);
 const cab=new THREE.Mesh(new THREE.CylinderGeometry(.55,.8,c.cb,4,1),gl);cab.rotation.y=Math.PI/4;cab.scale.set(W*.7,1,L*(c.cl||.36));cab.position.set(0,y0+H*.85+c.cb/2-.02,L*(c.cz||.08));g.add(cab);
 B(W*.5,.05,L*.42*(c.cl||.36),body,0,y0+H*.85+c.cb,L*(c.cz||.08));B(.22,.02,L*.42,wh,0,y0+H*.96,-L*.3);
 B(W*1.02,.16,.14,dk,0,y0+.1,-L/2);B(W*1.02,.16,.14,dk,0,y0+.1,L/2);B(W*.5,.14,.05,dk,0,y0+H*.5,-L/2-.01);
 for(const x of[-1,1]){B(.32,.16,.08,hl,x*W*.36,y0+H*.55,-L/2);B(.32,.14,.08,tl,x*W*.36,y0+H*.55,L/2);B(.14,.1,.2,body,x*(W/2+.12),y0+H*.9,-L*.06)}
 if(c.sp){B(W,.06,.5,body,0,y0+H+.4,L/2-.1);for(const x of[-.5,.5])B(.08,.45,.08,dk,x,y0+H+.18,L/2-.1)}
 for(const x of[-1,1])for(const z of[-1,1]){const w=new THREE.Mesh(new THREE.CylinderGeometry(c.wr||.42,c.wr||.42,.32,16),dk),r=new THREE.Mesh(new THREE.CylinderGeometry((c.wr||.42)*.57,(c.wr||.42)*.57,.34,10),ch);w.add(r);w.rotation.z=Math.PI/2;w.position.set(x*(W/2+(c.ox||0)),c.wr||.42,z*L*.32);g.add(w);wheels.push(w)}
 if(c.k=='jeep'){const t=new THREE.Mesh(new THREE.CylinderGeometry(.45,.45,.25,14),dk);t.rotation.x=Math.PI/2;t.position.set(0,y0+H*.6,L/2+.15);g.add(t);B(W*.7,.08,L*.3,dk,0,y0+H*.85+c.cb+.1,L*.08)}
 if(c.k=='pick'){B(W*.95,.08,L*.38,dk,0,y0+H*.6,L*.28);for(const x of[-1,1])B(.06,.3,L*.38,body,x*W*.47,y0+H*.8,L*.28);B(W*.95,.3,.06,body,0,y0+H*.8,L*.47)}
 if(c.k=='f1'){B(W*1.5,.06,.4,body,0,y0+H*.3,-L/2-.1);B(W*1.2,.06,.4,body,0,y0+H+.35,L/2);for(const x of[-1,1])B(.06,.4,.4,dk,x*W*.6,y0+H+.15,L/2)}
 if(c.k=='van'){B(W*.9,.05,L*.7,wh,0,y0+H*.85+c.cb+.03,L*.05)}
 carObj=g;sc.add(g)}
function scramble(){ac();show('gp');const i=Math.floor(Math.random()*28),w=WD[i][0],A=$('ga');let k=0;const L=[...w],o=L.slice().sort(()=>Math.random()-.5);
 $('gh').innerHTML='<div class="pic">'+WD[i][1]+'</div>رتّب حروف الكلمة';tts(w);A.onclick=null;
 A.innerHTML='<div id="sl" style="font:800 44px Cairo;min-height:64px;width:100%;text-align:center;color:#102744"></div><div class="row" id="so"></div>';
 $('so').innerHTML=o.map(x=>'<button class="lv" data-x="'+x+'">'+x+'</button>').join('');
 $('so').onclick=e=>{const b=e.target.closest('button');if(!b||b.disabled)return;if(b.dataset.x==L[k]){b.disabled=true;b.style.visibility='hidden';$('sl').textContent+=L[k++];beep(700,.1);if(k==L.length){gwin(3);cel('🎉 '+pk(PR),1800);tts(w);setTimeout(scramble,2000)}}else{beep(300,.2);$('gh').innerHTML='<div class="pic">'+WD[i][1]+'</div>حاول مرة أخرى 💪'}}}
 function firstL(){ac();show('gp');const i=Math.floor(Math.random()*28),A=$('ga'),o=[i];while(o.length<3){const x=Math.floor(Math.random()*28);if(!o.includes(x))o.push(x)}o.sort(()=>Math.random()-.5);
 $('gh').innerHTML='<div class="pic">'+WD[i][1]+'</div>'+WD[i][0]+' — بأي حرف تبدأ؟';tts(WD[i][0]);
 A.innerHTML=o.map(x=>'<button class="lv" style="width:90px;height:90px;font-size:44px" data-x="'+x+'">'+LET[x]+'</button>').join('');
 A.onclick=e=>{const b=e.target.closest('button');if(!b||!b.dataset.x)return;if(+b.dataset.x==i){A.onclick=null;beep(800,.15);gwin(2);cel('🎉 '+pk(PR),1500);setTimeout(firstL,1800)}else{beep(300,.2);b.style.opacity=.3;$('gh').innerHTML='<div class="pic">'+WD[i][1]+'</div>حاول مرة أخرى 💪'}}}
function trace(){ac();show('gp');const i=Math.floor(Math.random()*28),A=$('ga'),ch=LET[i];A.onclick=null;$('gh').innerHTML='تتبّع الحرف بإصبعك:<div class="big">'+ch+'</div>';tts(ch);
 A.innerHTML='<canvas id="tc" width="300" height="300" style="position:static;width:300px;height:300px;background:#fff;border-radius:24px;touch-action:none"></canvas><div class="row"><button class="btn s g" id="td">تم ✔</button><button class="btn s" id="tx">مسح</button></div>';
 const c=$('tc'),g=c.getContext('2d'),mc=document.createElement('canvas');mc.width=mc.height=300;const mg=mc.getContext('2d'),dr=(x,col)=>{x.font='800 240px Cairo,sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillStyle=col;x.fillText(ch,150,170)};dr(mg,'#000');
 const md=mg.getImageData(0,0,300,300).data,on=(x,y)=>x>=0&&y>=0&&x<300&&y<300&&md[((y|0)*300+(x|0))*4+3]>128,base=()=>{g.clearRect(0,0,300,300);dr(g,'#cbd5e1')};base();let d=0,P=[];
 c.onpointerdown=e=>{d=1;P.push(null);c.setPointerCapture(e.pointerId)};c.onpointerup=()=>{d=0};
 c.onpointermove=e=>{if(!d)return;const r=c.getBoundingClientRect(),x=(e.clientX-r.left)*300/r.width,y=(e.clientY-r.top)*300/r.height,q=P[P.length-1];g.lineWidth=14;g.lineCap='round';g.strokeStyle='#38BDF8';g.beginPath();if(q){g.moveTo(q[0],q[1]);const n=Math.ceil(Math.hypot(x-q[0],y-q[1])/6);for(let s=1;s<n;s++)P.push([q[0]+(x-q[0])*s/n,q[1]+(y-q[1])*s/n])}else g.moveTo(x,y);g.lineTo(x,y);g.stroke();P.push([x,y])};
 $('tx').onclick=()=>{base();P=[]};
 $('td').onclick=()=>{const pts=P.filter(Boolean);if(pts.length<15){$('gh').innerHTML='ارسم الحرف بإصبعك أولاً ✍️<div class="big">'+ch+'</div>';return}
  let tot=0,hit=0,good=0;for(let y=0;y<300;y+=5)for(let x=0;x<300;x+=5)if(on(x,y)){tot++;if(pts.some(p=>(p[0]-x)**2+(p[1]-y)**2<576))hit++}
  for(const p of pts)if([[0,0],[12,0],[-12,0],[0,12],[0,-12]].some(o=>on(p[0]+o[0],p[1]+o[1])))good++;
  if(tot&&hit/tot>=.4&&good/pts.length>=.55){gwin(3);cel('🌟 '+pk(PR),1800);setTimeout(trace,2000)}else{beep(300,.25);$('gh').innerHTML='قريب! حاول مرة أخرى 💪<div class="big">'+ch+'</div>';base();P=[]}}}
let sess=0,warned=0;const THM=[[0x7ec850,0x9be0ff],[0xf2c26b,0xffe2b0],[0xe8f4ff,0xbfe3ff],[0x3b3b78,0x1a1a40]];
function thm(i){const selected=WORLDS?.find(x=>x.id===S.world);if(selected){ground.color.set(selected.land);sc.background=new THREE.Color(selected.sky);sc.fog=new THREE.Fog(selected.sky,40,110);tiles.forEach(g=>{if(g.children[1]?.material?.color)g.children[1].material.color.set(selected.road)});return}const t=THM[Math.floor(i/7)%4];ground.color.setHex(t[0]);sc.background=new THREE.Color(t[1]);sc.fog=new THREE.Fog(t[1],40,110)}
function ralb(){const n=Object.keys(S.claimed).length,all=LET.every((_,i)=>S.claimed['a'+i]);
 $('cert').innerHTML=all?'<div style="font:800 26px Cairo">🏅 شهادة تكريم 🏅</div>البطل <b>'+(S.av||'🦊')+' '+(S.name||'')+'</b><br>أتمّ جميع الحروف الـ 28!<br>(التقط لقطة شاشة لحفظها)':'أنجزت '+n+' / 56 مرحلة<br>أكمل الحروف الـ 28 لتحصل على شهادة 🏅';
 $('stk').innerHTML=LV.map(l=>'<div style="width:62px;height:62px;border-radius:16px;background:#fff;display:flex;align-items:center;justify-content:center;font-size:32px;opacity:'+(S.claimed[l.id]?1:.35)+'">'+(S.claimed[l.id]?(l.w?l.n:WD[+l.id.slice(1)][1]):'🔒')+'</div>').join('')}
function paint(){ac();show('gp');const i=Math.floor(Math.random()*28),ch=LET[i],A=$('ga');A.onclick=null;$('gh').innerHTML='لوّن الحرف<div class="big">'+ch+'</div>';tts(ch);
 A.innerHTML='<canvas id="pc" width="300" height="300" style="position:static;width:300px;height:300px;background:#fff;border-radius:24px;touch-action:none"></canvas><div class="row" id="pl"></div><button class="btn s g" id="pd">تم ✔</button>';
 const c=$('pc'),g=c.getContext('2d'),mk=document.createElement('canvas'),ly=document.createElement('canvas');mk.width=mk.height=ly.width=ly.height=300;const mg=mk.getContext('2d'),lg=ly.getContext('2d');
 mg.font='800 240px Cairo,sans-serif';mg.textAlign='center';mg.textBaseline='middle';mg.fillText(ch,150,170);
 let col=PCOLS[0],d=0,k=0;const draw=()=>{g.globalCompositeOperation='source-over';g.clearRect(0,0,300,300);g.drawImage(ly,0,0);g.globalCompositeOperation='destination-in';g.drawImage(mk,0,0);g.globalCompositeOperation='destination-over';g.fillStyle='#e2e8f0';g.font=mg.font;g.textAlign='center';g.textBaseline='middle';g.fillText(ch,150,170);g.globalCompositeOperation='source-over'};draw();
 $('pl').innerHTML='<button type="button" id="pkBtn" class="pk-btn" aria-label="اختر لونك">🎨</button><div id="pkPan" class="pk-pan"><canvas id="pkSV" width="220" height="130"></canvas><input id="pkH" type="range" min="0" max="360" value="0" class="pk-h" aria-label="درجة اللون"></div>';
 let hh=0,ss=1,vv=1;const hsv=(h,s,v)=>{const f=n=>{const k=(n+h/60)%6;return v-v*s*Math.max(0,Math.min(k,4-k,1))};return '#'+[f(5),f(3),f(1)].map(x=>Math.round(x*255).toString(16).padStart(2,'0')).join('')},sv0=$('pkSV'),sx=sv0.getContext('2d');
 const dsv=()=>{sx.fillStyle='hsl('+hh+',100%,50%)';sx.fillRect(0,0,220,130);let q=sx.createLinearGradient(0,0,220,0);q.addColorStop(0,'#fff');q.addColorStop(1,'rgba(255,255,255,0)');sx.fillStyle=q;sx.fillRect(0,0,220,130);q=sx.createLinearGradient(0,0,0,130);q.addColorStop(0,'rgba(0,0,0,0)');q.addColorStop(1,'#000');sx.fillStyle=q;sx.fillRect(0,0,220,130);sx.beginPath();sx.arc(ss*220,(1-vv)*130,9,0,7);sx.lineWidth=3;sx.strokeStyle='#fff';sx.stroke();sx.lineWidth=1;sx.strokeStyle='#000';sx.stroke()},setC=()=>{col=hsv(hh,ss,vv);$('pkBtn').style.background=col;dsv()};
 const pk=e=>{const r=sv0.getBoundingClientRect();ss=Math.max(0,Math.min(1,(e.clientX-r.left)/r.width));vv=1-Math.max(0,Math.min(1,(e.clientY-r.top)/r.height));setC()};let pd=0;sv0.onpointerdown=e=>{pd=1;sv0.setPointerCapture(e.pointerId);pk(e)};sv0.onpointermove=e=>{if(pd)pk(e)};sv0.onpointerup=()=>pd=0;
 $('pkH').oninput=e=>{hh=+e.target.value;setC()};$('pkBtn').onclick=()=>$('pkPan').classList.toggle('on');setC();
 c.onpointerdown=e=>{d=1;c.setPointerCapture(e.pointerId)};c.onpointerup=()=>d=0;
 c.onpointermove=e=>{if(!d)return;const r=c.getBoundingClientRect();lg.fillStyle=col;lg.beginPath();lg.arc((e.clientX-r.left)*300/r.width,(e.clientY-r.top)*300/r.height,18,0,7);lg.fill();k++;draw()};
 $('pd').onclick=()=>{if(k<20){$('gh').innerHTML='لوّن الحرف أولاً 🎨<div class="big">'+ch+'</div>';return}gwin(2);cel('🎨 '+pk(PR),1800);setTimeout(paint,2000)}}
function nums(){ac();show('gp');const n=1+Math.floor(Math.random()*10),A=$('ga'),AR=['١','٢','٣','٤','٥','٦','٧','٨','٩','١٠'],em=['🍎','⭐','🚗','🐟','🎈'][n%5],o=[n];while(o.length<3){const x=1+Math.floor(Math.random()*10);if(!o.includes(x))o.push(x)}o.sort(()=>Math.random()-.5);
 $('gh').innerHTML='كم عددهم؟<div style="font-size:34px;word-break:break-all">'+em.repeat(n)+'</div>';
 A.innerHTML=o.map(x=>'<button class="lv" style="width:90px;height:90px;font-size:44px" data-x="'+x+'">'+AR[x-1]+'</button>').join('');
 A.onclick=ev=>{const b=ev.target.closest('button');if(!b||!b.dataset.x)return;if(+b.dataset.x==n){A.onclick=null;beep(800,.15);gwin(2);cel('🎉 '+pk(PR),1500);tts(String(n));setTimeout(nums,1800)}else{beep(300,.2);b.style.opacity=.3}}}
function clr(){ac();show('gp');const C=[['أحمر','#ef4444'],['أزرق','#3b82f6'],['أخضر','#22c55e'],['أصفر','#facc15'],['برتقالي','#f97316'],['بنفسجي','#8b5cf6']],i=Math.floor(Math.random()*6),A=$('ga'),o=[i];while(o.length<3){const x=Math.floor(Math.random()*6);if(!o.includes(x))o.push(x)}o.sort(()=>Math.random()-.5);
 $('gh').innerHTML='ما اسم هذا اللون؟<div style="width:90px;height:90px;border-radius:50%;margin:8px auto;background:'+C[i][1]+';border:4px solid #fff"></div>';
 A.innerHTML=o.map(x=>'<button class="lv" style="width:100px;font-size:22px" data-x="'+x+'">'+C[x][0]+'</button>').join('');
 A.onclick=ev=>{const b=ev.target.closest('button');if(!b||!b.dataset.x)return;if(+b.dataset.x==i){A.onclick=null;beep(800,.15);gwin(2);cel('🎉 '+pk(PR),1500);tts(C[i][0]);setTimeout(clr,1800)}else{beep(300,.2);b.style.opacity=.3}}}
function rprog(){ach();const nc=Object.keys(S.claimed).length,T=Object.values(S.st),tc=T.reduce((s,v)=>s+v.c,0),ta=T.reduce((s,v)=>s+v.a,0),
 D=[['🏁','أول سباق','ابدأ أول مرحلة',S.races>0?1:0,1],['✅','خمس إجابات','5 إجابات صحيحة',Math.min(5,tc),5],['💯','جولة مثالية','احصل على 3 نجوم',Object.values(S.stars).includes(3)?1:0,1],['🎯','ثلاث مراحل','أنهِ 3 مراحل',Math.min(3,nc),3],['🔟','عشر مراحل','أنهِ 10 مراحل',Math.min(10,nc),10],['🔤','كل الحروف','أنهِ الحروف الـ 28',LET.filter((_,i)=>S.claimed['a'+i]).length,28],['🖼️','خبير الكلمات','أنهِ الكلمات الـ 28',WD.filter((_,i)=>S.claimed['w'+i]).length,28],['💎','ثري صغير','اجمع 200 عملة',Math.min(200,S.coins),200],['🚗','مالك سيارة','اشترِ سيارة جديدة',S.cars.length>1?1:0,1],['🔠','حروف إنجليزية','أنهِ الحروف A–Z',ENL.filter((_,i)=>S.claimed['e'+i]).length,26],['🇬🇧','كلمات إنجليزية','أنهِ كلمات الإنجليزي',ENW.filter((_,i)=>S.claimed['x'+i]).length,ENW.length]],
 done=D.filter(d=>d[3]>=d[4]).length,
 tl=[['⭐',tot(),'نجوم'],['💎',S.coins,'عملات'],['🏁',nc+'/'+LV.length,'مراحل'],['🎯',(ta?Math.round(100*tc/ta):0)+'%','دقة'],['⏱️',Math.round((S.t||0)/60),'دقيقة']];
 const a=$('ach');a.style.cssText='background:none;box-shadow:none;border:0;padding:0;width:min(100%,400px)';
 a.innerHTML='<div style="display:flex;gap:8px;overflow-x:auto;padding:4px">'+tl.map(t=>'<div style="flex:1;min-width:70px;background:#fff;border-radius:18px;padding:8px 4px;box-shadow:0 4px 0 #cbd5e1"><div style="font-size:24px">'+t[0]+'</div><b style="font-size:20px">'+t[1]+'</b><div style="font-size:13px;opacity:.7">'+t[2]+'</div></div>').join('')+'</div><div style="font:800 20px Cairo;margin:12px 4px 6px;text-align:right">🏆 الإنجازات '+done+'/'+D.length+'</div>'+
  D.map(d=>{const ok=d[3]>=d[4],p=Math.round(100*Math.min(1,d[3]/d[4]));return '<div style="display:flex;align-items:center;gap:12px;background:#fff;border-radius:20px;padding:10px 12px;margin-bottom:8px;box-shadow:0 4px 0 #cbd5e1;border:3px solid '+(ok?'#facc15':'transparent')+'"><div style="width:54px;height:54px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:28px;background:'+(ok?'linear-gradient(#fde68a,#f59e0b)':'#e2e8f0')+';filter:'+(ok?'none':'grayscale(1)')+'">'+d[0]+'</div><div style="flex:1;text-align:right"><b>'+d[1]+'</b><div style="font-size:13px;opacity:.7">'+d[2]+'</div><div style="height:8px;border-radius:4px;background:#e2e8f0;margin-top:4px;overflow:hidden"><div style="height:100%;width:'+p+'%;background:'+(ok?'#22c55e':'#38BDF8')+'"></div></div></div><div style="font-size:22px">'+(ok?(S.achR&&S.achR[d[1]]?'✅':'<button class=\"ach-claim\" data-ach=\"'+d[1]+'\">🎁 100</button>'):'<small>'+Math.min(d[3],d[4])+'/'+d[4]+'</small>')+'</div></div>'}).join('');
 achExtra(a,D,done);
 const w=Object.entries(S.st).filter(([k,v])=>v.a>=2&&v.c/v.a<.7).map(([k])=>'<span style="display:inline-block;background:#fee2e2;border-radius:12px;padding:2px 12px;margin:3px;font-size:22px">'+k+'</span>').join('');
 $('rev').innerHTML='<b>🔁 تحتاج مراجعة</b><br>'+(w||'لا شيء — ممتاز!')}
let plat,pv=null,gs=0;
function applyCar(){if(carObj){sc.remove(carObj);carObj.traverse(o=>{if(o.isMesh){o.geometry.dispose();o.material.dispose()}})}
 if(!plat){plat=new THREE.Mesh(new THREE.CylinderGeometry(2.8,2.8,.16,48),new THREE.MeshStandardMaterial({color:0x1e3a5f,roughness:.6}));plat.position.y=-.1;plat.visible=false;sc.add(plat);const d2=new THREE.DirectionalLight(0xffffff,.5);d2.position.set(-6,4,-6);sc.add(d2)}
 carObj=buildCarGroup(pv!=null?pv:S.car,S.color);wheels=carObj.userData.wheels;addExtras(carObj);sc.add(carObj)}
function buildCarGroup(idx,color){const _wh=wheels;
 const c=CARS[idx]||CARS[0],g=new THREE.Group(),W=c.w,L=c.l,bt=.3+((c.y||.5)-.5),h=c.h*.75+.3,cb=c.cb*.7,rr=c.wr||.42,
 T={pick:[[[.5,0],[.5,.5],[.45,.68],[.3,.8],[.2,.86],[.02,.86],[0,.7],[-.5,.7],[-.5,0]],[.22,.12,.02,.02]],jeep:[[[.5,0],[.5,.55],[.46,.8],[.2,.86],[-.5,.86],[-.5,0]],[.2,.15,-.32,-.34]],f1:[[[.5,0],[.5,.35],[.2,.6],[-.2,.8],[-.5,.8],[-.5,0]],[0,-.05,-.12,-.15]],van:[[[.5,0],[.5,.5],[.44,.74],[.3,.86],[-.5,.86],[-.5,0]],[.3,.26,-.45,-.46]],nova:[[[.5,0],[.5,.3],[.3,.44],[.1,.66],[-.1,.86],[-.5,.86],[-.5,0]],[.1,0,-.2,-.32]],royal:[[[.5,0],[.5,.5],[.44,.66],[.3,.78],[.2,.86],[-.38,.86],[-.46,.7],[-.5,.5],[-.5,0]],[.2,.12,-.32,-.42]],volt:[[[.5,0],[.5,.42],[.02,.86],[-.28,.86],[-.5,.5],[-.5,0]],[.08,-.02,-.2,-.34]]},
 t=T[c.k]||[[[.5,0],[.5,.5],[.45,.68],[.28,.8],[.14,.86],[-.3,.86],[-.43,.8],[-.5,.58],[-.5,0]],[.15,.05,-.2,-.3]],
 body=bodyMat(color),gl=new THREE.MeshStandardMaterial({color:0x223344,metalness:.6,roughness:.1}),dk=new THREE.MeshStandardMaterial({color:0x111827,roughness:.7}),ch=new THREE.MeshStandardMaterial({color:0xe5e7eb,metalness:.9,roughness:.2}),hl=new THREE.MeshBasicMaterial({color:0xfff7cc}),tl=new THREE.MeshBasicMaterial({color:0xff2d2d}),wt=new THREE.MeshBasicMaterial({color:0xffffff}),
 B=(w,hh,l,m,x,y,z)=>{const e=new THREE.Mesh(new THREE.BoxGeometry(w,hh,l),m);e.position.set(x,y,z);g.add(e);return e},
 ex=(pts,w,m,y)=>{const s=new THREE.Shape();pts.forEach((p,j)=>j?s.lineTo(p[0],p[1]):s.moveTo(p[0],p[1]));const gm=new THREE.ExtrudeGeometry(s,{depth:w,bevelEnabled:true,bevelSize:.07,bevelThickness:.07,bevelSegments:3});gm.translate(0,0,-w/2);gm.rotateY(Math.PI/2);const e=new THREE.Mesh(gm,m);e.position.y=y;g.add(e)};
 wheels=[];ex(t[0].map(p=>[p[0]*L,p[1]*h]),W-.14,body,bt);const cu=t[1],cy=bt+h*.86;
 ex([[cu[0]*L,0],[cu[1]*L,cb],[cu[2]*L,cb],[cu[3]*L,0]],W*.8-.14,gl,cy);B(W*.7,.05,Math.max(.3,Math.abs(cu[1]-cu[2])*L),body,0,cy+cb+.075,-((cu[1]+cu[2])/2)*L);
 for(const s of[-1,1]){const x=s*(W/2+.02);B(.03,h*.5,.03,dk,x,bt+h*.5,-(cu[0]*L-.1));B(.03,h*.5,.03,dk,x,bt+h*.5,-(cu[3]*L+.3));B(.06,.04,.2,ch,x,bt+h*.62,-(cu[0]*L*.3));B(.12,.1,.2,body,s*(W/2+.1),cy+.08,-(cu[0]*L-.15));B(.25,.12,.06,hl,s*W*.33,bt+h*.5,-L/2-.02);B(.08,.08,.35,hl,s*W*.33,bt+h*.7,-L/2+.1);const ex2=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,.25,10),ch);ex2.rotation.x=Math.PI/2;ex2.position.set(s*W*.3,bt+.08,L/2+.1);g.add(ex2)}
 B(W*.7,.1,.05,tl,0,bt+h*.65,L/2+.04);B(W*.4,.14,.06,dk,0,bt+h*.28,-L/2-.03);B(.35,.12,.03,wt,0,bt+h*.35,L/2+.05);B(W,.08,.3,dk,0,bt+.02,-L/2+.05);B(W,.08,.3,dk,0,bt+.02,L/2-.05);
 if(c.sp){B(W*.9,.05,.45,body,0,bt+h+.38,L/2-.15);for(const x of[-.5,.5])B(.06,.35,.06,dk,x,bt+h+.2,L/2-.15)}
 if(c.k=='f1'){B(W*1.3,.05,.4,body,0,.28,-L/2-.1)}
 if(c.k=='pick'){for(const x of[-1,1])B(.06,.35,L*.5,body,x*W*.46,bt+h*.7+.17,L*.25);B(W*.92,.35,.06,body,0,bt+h*.7+.17,L/2-.03)}
 if(c.k=='jeep'){const sw=new THREE.Mesh(new THREE.CylinderGeometry(.42,.42,.25,16),dk);sw.rotation.x=Math.PI/2;sw.position.set(0,bt+h*.6,L/2+.2);g.add(sw)}
 // Distinctive body details for the locally-built vehicle variants.
 if(['sport','hyper','muscle','electric','sedan','hatch','rally','suv'].includes(c.k)){
   B(W*.72,.045,.12,dk,0,bt+h*.43,-L*.18);
   B(W*.58,.035,.10,ch,0,bt+h*.31,-L*.28);
   for(const x of[-1,1]){B(.035,.16,.22,dk,x*W*.49,bt+h*.46,-L*.02);B(.035,.14,.22,dk,x*W*.49,bt+h*.46,L*.19)}
 }
 if(c.k=='rally'){B(W*.92,.06,.28,dk,0,bt+h+.18,L*.27);B(.08,.13,.08,hl,-W*.25,bt+h*.55,-L*.47);B(.08,.13,.08,hl,W*.25,bt+h*.55,-L*.47)}
 if(c.k=='suv'){B(W*.92,.07,L*.55,dk,0,bt+h*.95,L*.02);B(W*.84,.05,.08,ch,0,bt+h*.34,-L*.49)}
 if(c.k=='electric'){B(W*.7,.035,.035,hl,0,bt+h*.52,-L*.49);B(W*.72,.035,.035,tl,0,bt+h*.63,L*.49)}
 const RM=c.rim?new THREE.MeshStandardMaterial({color:c.rim,emissive:c.rim,emissiveIntensity:.5,metalness:.2,roughness:.4}):ch,zz=-((cu[1]+cu[2])/2)*L;
 if(c.k==='nova'){const nz=new THREE.MeshBasicMaterial({color:0xff3b30});for(const s of[-1,1]){B(.05,.05,L*.55,nz,s*(W/2+.03),bt+.1,0);B(.2,.1,.45,dk,s*W/2,bt+h*.5,-L*.08);B(.1,.1,.5,dk,s*W*.2,bt+h*.35,L/2+.02);B(.1,.012,L*.5,wt,s*.14,cy+cb+.105,zz)}B(W*.9,.045,.05,nz,0,bt+h*.5,-L/2-.03);B(W*.9,.04,.05,nz,0,bt+h*.78,L/2+.05)}
 if(c.k==='royal'){const gd=new THREE.MeshStandardMaterial({color:0xfbbf24,metalness:.3,roughness:.35,emissive:0x7a4a00,emissiveIntensity:.4});for(const s of[-1,1]){B(.03,.05,L*.78,gd,s*(W/2+.02),bt+h*.46,0);B(.05,.05,L*.45,gd,s*W*.38,cy+cb+.11,zz);const lp=new THREE.Mesh(new THREE.SphereGeometry(.1,10,8),hl);lp.position.set(s*(W/2-.1),bt+h*.72,-L/2+.15);g.add(lp)}B(W*.5,.22,.05,gd,0,bt+h*.32,-L/2-.04);B(.09,.14,.09,gd,0,bt+h*.9,-L/2+.25);B(W*.8,.05,.05,gd,0,bt+h*.5,L/2+.05)}
 if(c.k==='volt'){const cn=new THREE.MeshBasicMaterial({color:0x22d3ee});B(W*.95,.06,.06,cn,0,bt+h*.58,-L/2-.03);B(W*.95,.06,.06,tl,0,bt+h*.6,L/2+.05);B(W*.7,.05,.05,cn,0,cy+cb+.12,zz);for(const s of[-1,1]){B(.04,.05,L*.7,cn,s*(W/2+.03),bt+h*.52,0);B(.04,.04,L*.7,cn,s*(W/2+.03),bt+.12,0);const th=new THREE.Mesh(new THREE.CylinderGeometry(.14,.14,.2,14),cn);th.rotation.x=Math.PI/2;th.position.set(s*W*.28,bt+h*.4,L/2+.12);g.add(th)}}
 for(const x of[-1,1])for(const z of[-1,1]){const w=new THREE.Mesh(new THREE.CylinderGeometry(rr,rr,.34,20),dk),rm=new THREE.Mesh(new THREE.CylinderGeometry(rr*.62,rr*.62,.36,16),RM);w.add(rm);for(let k=0;k<5;k++){const sp=new THREE.Mesh(new THREE.BoxGeometry(rr*1.1,.38,.06),dk);sp.rotation.y=k*Math.PI/5;w.add(sp)}w.rotation.z=Math.PI/2;w.position.set(x*(W/2+(c.ox||0)-.02),rr,z*L*.32);g.add(w);wheels.push(w)}
 g.userData.wheels=wheels;g.userData.m={ry:cy+cb+.1,rz:-((cu[1]+cu[2])/2)*L,L:L,W:W,bt:bt,h:h};wheels=_wh;return g}
const GC=['#38BDF8','#4ADE80','#FB923C','#A78BFA','#F43F5E','#FACC15','#FFFFFF','#1F2937','#DC2626','#0EA5E9','#EC4899','#14B8A6','#84CC16','#F97316','#6366F1','#94A3B8','#78350F','#0F766E','#7C3AED','#BE123C','#FDE047','#22D3EE','#FB7185','#FFD700','#C0C0C0'],GI=['🏎️','🏁','🚘','🚙','🛻','🏎️','🚐','🚘','🚙','🚗','🏎️','⚡'];
function garageCarSvg(c,color,large=false){
 const roof=c.k==='van'||c.k==='suv'||c.k==='jeep'||c.k==='pick'?'M72 59 L86 31 Q91 23 105 23 L137 23 Q147 24 155 43 L169 59':'M70 59 L91 34 Q96 28 108 28 L132 28 Q142 29 153 59';
 const bed=c.k==='pick'?'<path d="M151 48 H183 V69 H151 Z" fill="'+color+'" stroke="#111827" stroke-width="2"/>':'';
 const spoiler=c.sp?'<path d="M42 42 H66 L70 47 H40 Z" fill="#111827"/>':'';
 return '<svg class="car-preview-svg '+(large?'large':'')+'" viewBox="0 0 220 105" role="img" aria-label="معاينة '+c.n+'"><defs><linearGradient id="paint'+(CARS.indexOf(c))+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".42"/><stop offset=".45" stop-color="'+color+'"/><stop offset="1" stop-color="#111827" stop-opacity=".24"/></linearGradient></defs><ellipse cx="111" cy="83" rx="82" ry="10" fill="#0f172a" opacity=".18"/><path d="'+roof+'" fill="#243247" stroke="#111827" stroke-width="2"/><path d="M95 36 L109 32 L130 32 Q138 34 145 49 H85 Z" fill="#a5e4ff" stroke="#dbeafe" stroke-width="2"/><path d="M25 60 Q29 53 48 53 H70 L88 43 H148 L169 57 L190 61 Q197 64 197 72 V77 H20 V68 Q20 63 25 60 Z" fill="url(#paint'+CARS.indexOf(c)+')" stroke="#111827" stroke-width="2.5"/><path d="M20 69 H197" stroke="#f8fafc" stroke-opacity=".65" stroke-width="2"/><path d="M34 62 H48 M170 62 H188" stroke="#fff7cc" stroke-width="5" stroke-linecap="round"/><path d="M27 72 H43 M178 72 H193" stroke="#ef4444" stroke-width="4" stroke-linecap="round"/>'+bed+spoiler+'<circle cx="59" cy="76" r="15" fill="#111827"/><circle cx="59" cy="76" r="8" fill="#94a3b8"/><circle cx="59" cy="76" r="3" fill="#e2e8f0"/><circle cx="160" cy="76" r="15" fill="#111827"/><circle cx="160" cy="76" r="8" fill="#94a3b8"/><circle cx="160" cy="76" r="3" fill="#e2e8f0"/><path d="M106 47 V57" stroke="#e2e8f0" stroke-width="1.5"/><path d="M83 59 H148" stroke="#111827" stroke-opacity=".5" stroke-width="1.5"/></svg>';
}
let garageRenderer=null,garageScene=null,garageCamera=null,garageModel=null;function renderGarageCar3D(){const cv=$('garageCar3D');if(!cv||!window.THREE||!R||!carObj)return;try{if(!garageRenderer){garageRenderer=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true});garageRenderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));garageScene=new THREE.Scene();garageScene.add(new THREE.HemisphereLight(0xffffff,0x8296a8,1.5));const dl=new THREE.DirectionalLight(0xffffff,2);dl.position.set(4,7,5);garageScene.add(dl);garageCamera=new THREE.PerspectiveCamera(38,1,.1,100)}if(garageModel)garageScene.remove(garageModel);garageModel=carObj.clone(true);garageModel.position.set(0,0,0);garageModel.rotation.set(0,.55,0);garageModel.scale.setScalar(.9);garageScene.add(garageModel);const w=cv.clientWidth||480,h=cv.clientHeight||210;garageRenderer.setSize(w,h,false);garageCamera.aspect=w/h;garageCamera.position.set(5,3.2,6.5);garageCamera.lookAt(0,.6,0);garageRenderer.render(garageScene,garageCamera)}catch(e){console.warn('Garage preview fallback',e)}}
function rgar(){const G=$('garage');if(pv==null)pv=S.car;const c=CARS[pv]||CARS[0],own=S.cars.includes(pv),eq=S.car==pv,gsEl=G.querySelector('#gcar');if(gsEl)gs=gsEl.scrollLeft;
 const act=eq?'<button class="btn g" disabled>✔ مجهّزة</button>':own?'<button class="btn g" data-a="eq">🚗 جهّز السيارة</button>':S.coins>=c.p?'<button class="btn o" data-a="buy">🛒 اشترِ بـ 💎'+c.p+'</button>':'<button class="btn" disabled>🔒 تحتاج '+(c.p-S.coins)+' عملة</button>';
 G.innerHTML='<div class="garage-head"><div class="card garage-coins">💎 <b>'+S.coins+'</b></div><b class="garage-title">الكراج</b></div><div class="garage-preview"><div class="preview-label">معاينة السيارة</div><canvas id="garageCar3D" class="garage-car-3d" aria-label="معاينة ثلاثية الأبعاد للسيارة"></canvas><div class="preview-name">'+c.n+'</div><div class="preview-status">'+(own?'✅ مملوكة':('💎 السعر: '+c.p+' عملة'))+'</div></div>'
 +'<div class="garage-picker" id="gcar">'+CARS.map((x,j)=>'<button type="button" class="gc '+(j==pv?'on':'')+'" data-i="'+j+'"><span class="gc-preview">'+garageCarSvg(x,S.color)+'</span><b>'+x.n+'</b><small>'+(S.cars.includes(j)?(S.car==j?'✔ مجهّزة':'مملوكة'):'💎 '+x.p)+'</small></button>').join('')+'</div>'
 +'<div class="garage-colors" aria-label="لون السيارة">'+GC.map(x=>'<button type="button" class="dot'+(x==S.color?' sel':'')+'" style="background:'+x+(x==S.color?'':';border-color:#cbd5e1')+'" data-c="'+x+'" aria-label="لون '+x+'"></button>').join('')+'</div><div class="garage-actions">'+act+'<button class="btn s" data-a="back">رجوع</button></div>';
 const picker=$('gcar');picker.scrollLeft=gs;renderGarageCar3D();
 G.onclick=e=>{const t=e.target.closest('[data-i],[data-c],[data-a]');if(!t)return;if(t.dataset.a==='back'){go('home');return}ac();if(t.dataset.i!=null){pv=+t.dataset.i;applyCar()}else if(t.dataset.c){S.color=t.dataset.c;sv();applyCar()}else if(t.dataset.a==='buy'&&S.coins>=c.p&&!own){S.coins-=c.p;S.cars.push(pv);S.car=pv;sv();beep(800,.15);fx(2)}else if(t.dataset.a==='eq'){S.car=pv;sv();beep(660,.12)}rgar()}}

// ===== PREMIUM: themes, roads, gates, crystals, obstacles, garage, target =====
const THEMES=[
{id:'day',n:'نهار مشمس',e:'☀️',sky:'#8fd8ff',land:'#6fcf5a',decor:'pine',c1:0x2f9e44,desc:'سماء صافية وأشجار خضراء',free:1},
{id:'sunset',n:'غروب ذهبي',e:'🌇',sky:'#ff9f7a',land:'#c98a4b',decor:'palm',c1:0xf59e0b,desc:'شمس الغروب ونخيل'},
{id:'neon',n:'مدينة نيون',e:'🌃',sky:'#120a3a',land:'#171a3d',decor:'tower',c1:0x22d3ee,desc:'ناطحات سحاب مضيئة'},
{id:'beach',n:'شاطئ استوائي',e:'🏖️',sky:'#7fe0ff',land:'#f3d58a',decor:'palm',c1:0x16a34a,desc:'رمال ونخيل على البحر'},
{id:'snow',n:'عالم الثلج',e:'❄️',sky:'#cfe8ff',land:'#f1f7ff',decor:'snowpine',c1:0xe0f2fe,desc:'صنوبر مثلّج وجو بارد'},
{id:'desert',n:'صحراء الكنوز',e:'🏜️',sky:'#ffe2a8',land:'#e0b56a',decor:'cactus',c1:0x65a30d,desc:'كثبان وصبار'},
{id:'candy',n:'أرض الحلوى',e:'🍭',sky:'#ffd1ec',land:'#ffb3da',decor:'candy',c1:0xec4899,desc:'مصاصات وألوان حلوة'},
{id:'space',n:'محطة الفضاء',e:'🪐',sky:'#050816',land:'#1e1b4b',decor:'planet',c1:0xa78bfa,desc:'كواكب وحلقات مضيئة'},
{id:'rain',n:'مدينة ممطرة',e:'🌧️',sky:'#7c93aa',land:'#4d6b62',decor:'tower',c1:0x94a3b8,fx:'rain',desc:'مطر وأضواء المدينة'}];
const ROADS=[
{id:'classic',n:'أسفلت كلاسيك',road:'#475569',dash:'#ffffff',edge:'#fbbf24',free:1,desc:'الطريق المعتاد'},
{id:'cyber',n:'سايبر نيون',road:'#0b1226',dash:'#22d3ee',edge:'#22d3ee',glow:1,desc:'خطوط زرقاء مضيئة'},
{id:'magenta',n:'ماجنتا فيوتشر',road:'#1a0b2e',dash:'#f472b6',edge:'#f472b6',glow:1,desc:'طريق بنفسجي لامع'},
{id:'lime',n:'لايم تيربو',road:'#10231a',dash:'#a3e635',edge:'#a3e635',glow:1,desc:'أخضر مضيء'},
{id:'gold',n:'الطريق الذهبي',road:'#6b4f12',dash:'#fde68a',edge:'#fbbf24',desc:'ذهب فاخر'},
{id:'brick',n:'طوب أحمر',road:'#9a3f2f',dash:'#fde7d6',edge:'#ffffff',desc:'طريق قديم جميل'},
{id:'sand',n:'مسار رملي',road:'#b9985b',dash:'#fff7e0',edge:'#92400e',desc:'ترابي للمغامرات'},
{id:'ice',n:'جليد لامع',road:'#9ccbe8',dash:'#ffffff',edge:'#38bdf8',desc:'طريق جليدي'},
{id:'rainbow',n:'قوس قزح',road:'#334155',dash:'#ffffff',edge:'#ffffff',rainbow:1,desc:'حارات ملوّنة'}];
const curTheme=()=>THEMES.find(t=>t.id===S.theme)||THEMES[0],curRoad=()=>ROADS.find(t=>t.id===S.road)||ROADS[0];
const DC={},dg=(k,f)=>DC[k]||(DC[k]=f()),lam=c=>dg('L'+c,()=>new THREE.MeshLambertMaterial({color:c})),bas=c=>dg('B'+c,()=>new THREE.MeshBasicMaterial({color:c}));
let edgeMat,laneMats,specialT=18;
function decorOne(type,c1){const T=THREE,g=new T.Group(),A=(geo,mat,x,y,z,sx,sy,sz)=>{const m=new T.Mesh(geo,mat);m.position.set(x,y,z);if(sx)m.scale.set(sx,sy,sz);g.add(m);return m},cyl=(a,b,h,s)=>dg('c'+a+b+h+s,()=>new T.CylinderGeometry(a,b,h,s)),sph=r=>dg('s'+r,()=>new T.SphereGeometry(r,14,10));
if(type==='pine'||type==='snowpine'){const sn=type==='snowpine',cone=dg('cone',()=>new T.ConeGeometry(1.3,2,7));A(cyl(.2,.25,1.2,6),lam(0x7c4a1e),0,.6,0);A(cone,lam(sn?0xdff1ff:0x2f9e44),0,2.2,0);A(cone,lam(sn?0xffffff:0x38b255),0,3.4,0,.7,.8,.7)}
else if(type==='palm'){A(cyl(.14,.22,3.6,6),lam(0x9a6b3a),0,1.8,0);for(let i=0;i<6;i++){const pp=new T.Group();pp.position.y=3.6;pp.rotation.y=i*1.047;const l=new T.Mesh(dg('leaf',()=>new T.ConeGeometry(.35,2.2,4)),lam(0x22a55b));l.position.x=.9;l.rotation.z=-1.3;pp.add(l);g.add(pp)}}
else if(type==='tower'){const h=7+Math.random()*9;A(new T.BoxGeometry(2.6,h,2.6),lam(0x1b2447),0,h/2,0);const rg=dg('row',()=>new T.BoxGeometry(2.72,.14,2.72));for(let y=1.2,i=0;y<h;y+=1.6,i++)A(rg,bas(i%2?c1:0xf472b6),0,y,0)}
else if(type==='cactus'){A(cyl(.35,.4,2.6,8),lam(c1),0,1.3,0);A(cyl(.2,.2,1,6),lam(c1),-.7,1.7,0);A(cyl(.18,.18,.5,6),lam(c1),-.38,1.15,0).rotation.z=1.57;A(cyl(.2,.2,.9,6),lam(c1),.7,1.9,0);A(cyl(.18,.18,.5,6),lam(c1),.38,1.3,0).rotation.z=1.57}
else if(type==='candy'){const pal=[0xec4899,0xfacc15,0x22d3ee,0xa78bfa,0x4ade80];A(cyl(.1,.1,3,6),lam(0xffffff),0,1.5,0);A(sph(1),lam(pal[Math.floor(Math.random()*5)]),0,3.4,0);A(dg('tor',()=>new T.TorusGeometry(.95,.13,6,18)),lam(0xffffff),0,3.4,0)}
else{const pal=[0xa78bfa,0xf472b6,0x38bdf8,0xfbbf24],y=4+Math.random()*5;A(sph(1.4),lam(pal[Math.floor(Math.random()*4)]),0,y,0);const r=A(dg('ring',()=>new T.TorusGeometry(2.3,.08,6,30)),bas(c1),0,y,0);r.rotation.x=1.2;const k=A(dg('oct',()=>new T.OctahedronGeometry(.6)),bas(c1),0,.9,0,1,2.2,1)}
return g}
function buildTileExtras(g){const T=THREE;if(!edgeMat){edgeMat=new T.MeshBasicMaterial({color:0xfbbf24});laneMats=[0,1,2].map(()=>new T.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:0,depthWrite:false}))}
const e=new T.Group(),d=new T.Group();for(const x of[-4.5,4.5]){const m=new T.Mesh(dg('edge',()=>new T.BoxGeometry(.28,.07,20)),edgeMat);m.position.set(x,.05,0);e.add(m)}
[-3,0,3].forEach((x,i)=>{const m=new T.Mesh(dg('lane',()=>new T.PlaneGeometry(2.6,20)),laneMats[i]);m.rotation.x=-Math.PI/2;m.position.set(x,.025,0);e.add(m)});g.add(e,d);g.userData.decor=d}
function applyLook(){if(!sc||!ground||!tiles.length)return;const t=curTheme(),r=curRoad();ground.color.set(t.land);sc.background=new THREE.Color(t.sky);sc.fog=new THREE.Fog(t.sky,40,110);
tiles[0].children[1].material.color.set(r.road);tiles[0].children[2].material.color.set(r.dash);edgeMat.color.set(r.edge);
laneMats.forEach((m,i)=>{m.color.set(r.rainbow?['#ef4444','#facc15','#22c55e'][i]:r.edge);m.opacity=r.rainbow?.42:r.glow?.13:0});
const xs=t.decor==='planet'?[-12,12,-20,20]:t.decor==='tower'?[-10,10,-17,17]:[-9,9,-14,14];
tiles.forEach(g=>{const d=g.userData.decor;if(!d||g.userData.dk===t.id)return;g.userData.dk=t.id;d.clear();xs.forEach(x=>{const o=decorOne(t.decor,t.c1);o.position.set(x,0,Math.random()*16-8);o.rotation.y=Math.random()*6;d.add(o)})})}
function setWorld(){applyLook()}function thm(){applyLook()}
function dispose3(m){m.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material)o.material.dispose&&o.material.dispose()})}
// --- gates ---
const GC3=[0x22d3ee,0xf472b6,0xa3e635];
function padTex(col){const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d'),h='#'+new THREE.Color(col).getHexString();g.strokeStyle=h;g.lineWidth=7;g.lineCap=g.lineJoin='round';g.shadowColor=h;g.shadowBlur=10;for(let i=0;i<3;i++){const y=100-i*30;g.globalAlpha=1-i*.25;g.beginPath();g.moveTo(34,y);g.lineTo(64,y-24);g.lineTo(94,y);g.stroke()}g.globalAlpha=.6;g.strokeRect(4,4,120,120);return new THREE.CanvasTexture(c)}
function rebuildGates(){const M=THREE;gates.forEach((g,i)=>{g.clear();const col=GC3[i];g.userData.col='#'+new M.Color(col).getHexString();const dark=new M.MeshStandardMaterial({color:0x0b1630,metalness:.7,roughness:.3}),glow=new M.MeshBasicMaterial({color:col});
for(const x of[-1.45,1.45]){const p=new M.Mesh(new M.CylinderGeometry(.14,.2,4.3,6),dark);p.position.set(x,2.15,0);g.add(p);for(const y of[.5,1.8,3.1]){const r=new M.Mesh(new M.CylinderGeometry(.23,.23,.07,6),glow);r.position.set(x,y,0);g.add(r)}const cap=new M.Mesh(new M.SphereGeometry(.22,10,8),glow);cap.position.set(x,4.45,0);g.add(cap)}
const bm=new M.Mesh(new M.BoxGeometry(3.3,.22,.28),dark),bl=new M.Mesh(new M.BoxGeometry(3.1,.07,.3),glow);bm.position.y=bl.position.y=4.35;
const pl=new M.Mesh(new M.PlaneGeometry(2.6,2.6),new M.MeshBasicMaterial({map:g.userData.tx,transparent:true,side:M.DoubleSide,depthWrite:false}));pl.position.y=2.9;
const pad=new M.Mesh(new M.PlaneGeometry(3,3.4),new M.MeshBasicMaterial({map:padTex(col),transparent:true,blending:M.AdditiveBlending,depthWrite:false}));pad.rotation.x=-Math.PI/2;pad.position.y=.04;g.add(bm,bl,pl,pad)})}
function label(g,t){const c=g.userData.cv.getContext('2d'),col=g.userData.col||'#22d3ee';c.clearRect(0,0,256,256);const gr=c.createLinearGradient(0,0,0,256);gr.addColorStop(0,'rgba(8,20,48,.93)');gr.addColorStop(1,'rgba(12,34,78,.85)');c.fillStyle=gr;c.beginPath();c.roundRect?c.roundRect(10,10,236,236,34):c.rect(10,10,236,236);c.fill();c.save();c.shadowColor=col;c.shadowBlur=18;c.strokeStyle=col;c.lineWidth=6;c.stroke();c.restore();
for(let y=24;y<236;y+=8){c.fillStyle='rgba(255,255,255,.04)';c.fillRect(18,y,220,2)}
c.save();c.fillStyle='#fff';c.shadowColor=col;c.shadowBlur=24;c.font='800 '+(t.length<=3?120:t.length<=5?76:56)+'px Cairo,sans-serif';c.textAlign='center';c.textBaseline='middle';c.direction='rtl';c.fillText(t,128,136);c.restore();g.userData.tx.needsUpdate=true}
// --- crystals (1 coin = green, rare gold = 20) ---
function rebuildCrystals(){const M=THREE;coinsP.forEach(m=>sc.remove(m));coinsP.length=0;const geo=new M.OctahedronGeometry(.42,0);geo.scale(.8,.8,1.6);const eg=new M.EdgesGeometry(geo),hg=new M.SphereGeometry(.5,12,10);
for(let i=0;i<24;i++){const m=new M.Mesh(geo,new M.MeshStandardMaterial({color:0x22e07a,emissive:0x0b8f4d,emissiveIntensity:.9,metalness:.35,roughness:.2,flatShading:true})),ln=new M.LineSegments(eg,new M.LineBasicMaterial({color:0xffffff,transparent:true,opacity:.75})),h=new M.Mesh(hg,new M.MeshBasicMaterial({color:0x22e07a,transparent:true,opacity:.1,blending:M.AdditiveBlending,depthWrite:false}));m.rotation.x=Math.PI/2;m.userData.halo=h;m.add(ln,h);m.visible=false;sc.add(m);coinsP.push(m)}}
function takeVal(){if(specialT<=0){specialT=30+Math.random()*25;return 20}return 1}
function paintCrystal(c,v){const s=v>=20;c.material.color.set(s?0xffc83d:0x22e07a);c.material.emissive.set(s?0xb45309:0x0b8f4d);c.userData.halo.material.color.set(s?0xffb020:0x22e07a);c.userData.halo.material.opacity=s?.2:.1;c.scale.setScalar(s?1.55:1)}
// --- obstacles ---
function rebuildObstacles(){const M=THREE;obstacles.forEach(o=>sc.remove(o));obstacles.length=0;const cv=document.createElement('canvas');cv.width=256;cv.height=64;const x=cv.getContext('2d');x.fillStyle='#facc15';x.fillRect(0,0,256,64);x.fillStyle='#111827';for(let i=-2;i<10;i++){x.beginPath();x.moveTo(i*34,64);x.lineTo(i*34+20,64);x.lineTo(i*34+52,0);x.lineTo(i*34+32,0);x.fill()}
const tex=new M.CanvasTexture(cv),dark=new M.MeshStandardMaterial({color:0x1f2937,metalness:.5,roughness:.4}),sm=new M.MeshBasicMaterial({map:tex}),red=new M.MeshBasicMaterial({color:0xff3b30}),org=new M.MeshLambertMaterial({color:0xff7a1a}),wh=new M.MeshLambertMaterial({color:0xffffff}),cg=new M.ConeGeometry(.34,1,12),rg=new M.CylinderGeometry(.24,.27,.14,12),bg=new M.BoxGeometry(.9,.06,.9);
for(let i=0;i<8;i++){const ob=new M.Group(),A=(geo,mat,px,py,pz)=>{const m=new M.Mesh(geo,mat);m.position.set(px,py,pz);ob.add(m);return m};
if(i%2){for(const px of[-.55,0,.55]){A(bg,dark,px,.03,0);A(cg,org,px,.56,0);A(rg,wh,px,.6,0)}}
else{for(const px of[-.75,.75])A(new M.BoxGeometry(.14,1,.5),dark,px,.5,0);A(new M.BoxGeometry(1.95,.6,.14),sm,0,.85,0);for(const px of[-.62,.62])A(new M.BoxGeometry(.34,.16,.2),red,px,1.3,0)}
ob.visible=false;sc.add(ob);obstacles.push(ob)}}
function premiumInit(){applyFrame();rebuildGates();rebuildCrystals();rebuildObstacles();applyLook()}
// --- big target letter / word ---
function showTarget(){const b=$('tgBig');if(!b||!Q)return;const w=LV[cur]&&LV[cur].w,t=w?(Q.sp||Q.t):Q.t,h=H[Q.t];
b.innerHTML='<div class="tgb-l"><small>'+(w?'الكلمة المطلوبة':'الحرف المطلوب')+'</small><div class="tgb-t'+(t.length>3?' long':'')+'">'+t+'</div>'+(!w&&h?'<div class="tgb-h">'+h[1]+' '+h[0]+'</div>':'')+'</div><button class="tgb-s" onclick="replay()" aria-label="أعد الصوت">🔊</button>';b.classList.add('on')}
setInterval(()=>{const b=$('tgBig');if(b)b.classList.toggle('speaking',!!busy)},250);
// --- world shop: themes and roads, 200 coins each ---
let shopTab='t';
function roadSvg(r){const P=['46,0 53,0 40,70 10,70','53,0 67,0 80,70 40,70','67,0 74,0 110,70 80,70'],C=['#ef4444','#facc15','#22c55e'];return '<svg viewBox="0 0 120 70" preserveAspectRatio="none"><rect width="120" height="70" fill="#0f2740"/><polygon points="44,0 76,0 116,70 4,70" fill="'+r.road+'"/>'+(r.rainbow?P.map((p,i)=>'<polygon points="'+p+'" fill="'+C[i]+'" opacity=".5"/>').join(''):'')+'<line x1="44" y1="0" x2="4" y2="70" stroke="'+r.edge+'" stroke-width="3"/><line x1="76" y1="0" x2="116" y2="70" stroke="'+r.edge+'" stroke-width="3"/><line x1="60" y1="2" x2="60" y2="68" stroke="'+r.dash+'" stroke-width="3" stroke-dasharray="8 8"/></svg>'}
const DE={pine:'🌲',snowpine:'🌲',palm:'🌴',tower:'🏙️',cactus:'🌵',candy:'🍭',planet:'🪐'};
function renderWorldShop(){const el=$('worlditems');if(!el)return;S.ownT=S.ownT||['day'];S.ownR=S.ownR||['classic'];const T=shopTab==='t',list=T?THEMES:ROADS,own=T?S.ownT:S.ownR,cur=T?curTheme().id:curRoad().id;
$('shopInfo').innerHTML='💎 <b>'+S.coins+'</b> · كل '+(T?'ثيم':'طريق')+' بـ 200 عملة';
$('shopTabs').innerHTML='<button data-tab="t" class="'+(T?'on':'')+'">🌍 الثيمات</button><button data-tab="r" class="'+(!T?'on':'')+'">🛣️ الطرق</button>';
el.innerHTML=list.map(x=>{const o=x.free||own.includes(x.id),a=cur===x.id,pv2=T?'<div class="wk-pv" style="background:linear-gradient('+x.sky+' 0 55%,'+x.land+' 55%)"><span class="wk-d">'+DE[x.decor]+DE[x.decor]+DE[x.decor]+'</span><span class="wk-e">'+x.e+'</span><i style="background:'+curRoad().road+'"></i></div>':'<div class="wk-pv">'+roadSvg(x)+'</div>';
return '<div class="wk-card'+(a?' sel':'')+'">'+pv2+'<b>'+x.n+'</b><small>'+x.desc+'</small><button data-id="'+x.id+'"'+(a?' disabled':'')+'>'+(a?'✔ مُختار':o?'اختيار':'🔒 200 💎 شراء')+'</button></div>'}).join('');
el.onclick=ev=>{const b=ev.target.closest('button[data-id]');if(b)shopAct(b.dataset.id)};$('shopTabs').onclick=ev=>{const b=ev.target.closest('[data-tab]');if(b){shopTab=b.dataset.tab;renderWorldShop()}}}
function shopAct(id){const T=shopTab==='t',list=T?THEMES:ROADS,x=list.find(v=>v.id===id);if(!x)return;ac();const k=T?'ownT':'ownR';S[k]=S[k]||[T?'day':'classic'];
if(!x.free&&!S[k].includes(id)){if(S.coins<200){cel('تحتاج '+(200-S.coins)+' عملة إضافية 💎',1500,0);return}S.coins-=200;S[k].push(id);beep(800,.15);fx(2);cel('تم الشراء ✓ '+x.n,1200,1)}
S[T?'theme':'road']=id;sv();applyLook();hud();renderWorldShop()}
function applyWorld(id){applyLook()}function chooseWorld(id){shopAct(id)}
// --- garage: preview uses the exact in-game car builder ---
let gxR,gxS,gxC,gxM,gxRaf=0,gxTR,gxTS,gxTC,gxW=0,gxH=0,gxTh={};
function gxScene(){const s=new THREE.Scene();s.add(new THREE.HemisphereLight(0xffffff,0x6b7f95,1.25));const a=new THREE.DirectionalLight(0xffffff,1.6);a.position.set(4,8,-5);s.add(a);const b=new THREE.DirectionalLight(0x9bd8ff,.7);b.position.set(-6,3,6);s.add(b);return s}
function gxFit(cam,m,asp,dir){const b=new THREE.Box3();m.children.forEach(c=>{if(!c.userData.ex)b.expandByObject(c)});const s=b.getSize(new THREE.Vector3()),c=b.getCenter(new THREE.Vector3()),R=s.length()/2,d=R/Math.sin(cam.fov*Math.PI/360)/Math.min(1,asp)*1.12;cam.aspect=asp;cam.updateProjectionMatrix();cam.position.copy(c).add(dir.clone().normalize().multiplyScalar(d));cam.lookAt(c.x,c.y-.1,c.z)}
function gxModel(){if(!gxS)return;if(gxM){gxS.remove(gxM);dispose3(gxM)}gxM=buildCarGroup(pv,S.color);addExtras(gxM);gxS.add(gxM);gxFit(gxC,gxM,Math.max(.5,gxW/Math.max(1,gxH)),new THREE.Vector3(.85,.42,-1.1))}
function gxLoop(t){if(!$('garage').classList.contains('on')){gxRaf=0;return}gxRaf=requestAnimationFrame(gxLoop);const cv=$('gxCv');if(!cv||!gxM)return;const w=cv.clientWidth,h=cv.clientHeight;if(w&&h&&(w!==gxW||h!==gxH)){gxW=w;gxH=h;gxR.setSize(w,h,false);gxFit(gxC,gxM,w/h,new THREE.Vector3(.85,.42,-1.1))}gxM.rotation.y=t/1700;(gxM.userData.wheels||[]).forEach(x=>x.rotation.x-=.06);gxR.render(gxS,gxC)}
function gxThumbs(){if(!window.THREE)return;const key=S.color+'|'+(S.fin||'g');if(!gxTR){gxTR=new THREE.WebGLRenderer({alpha:true,antialias:true,preserveDrawingBuffer:true});gxTR.setSize(300,170,false);gxTS=gxScene();gxTC=new THREE.PerspectiveCamera(36,300/170,.1,100)}let j=0;const step=()=>{if(key!==S.color+'|'+(S.fin||'g')||j>=CARS.length||!$('garage').classList.contains('on'))return;const i=j++,k=i+'|'+key;if(!gxTh[k]){const m=buildCarGroup(i,S.color);gxTS.add(m);gxFit(gxTC,m,300/170,new THREE.Vector3(-.85,.4,-1.1));gxTR.render(gxTS,gxTC);gxTh[k]=gxTR.domElement.toDataURL('image/png');gxTS.remove(m);dispose3(m)}const im=document.querySelector('#gcar img[data-t="'+i+'"]');if(im)im.src=gxTh[k];setTimeout(step,12)};step()}
function gxFill(){const c=CARS[pv]||CARS[0],own=S.cars.includes(pv),eq=S.car==pv,gs=($('gcar')||{}).scrollLeft||0;
$('gxCoins').textContent=S.coins;$('gxInfo').innerHTML='<b>'+c.n+'</b>'+(eq?'<span class="gx-b ok">✔ مجهّزة</span>':own?'<span class="gx-b ok">✅ مملوكة</span>':'<span class="gx-b">💎 '+c.p+'</span>');
$('gcar').innerHTML=CARS.map((x,j)=>'<button type="button" class="gx-card'+(j==pv?' on':'')+'" data-i="'+j+'"><img alt="" data-t="'+j+'" src="'+(gxTh[j+'|'+S.color+'|'+(S.fin||'g')]||'')+'"><b>'+x.n+'</b><small>'+(S.cars.includes(j)?(S.car==j?'✔ مجهّزة':'مملوكة'):'💎 '+x.p)+'</small></button>').join('');$('gcar').scrollLeft=gs;
const on=document.querySelector('#gcar .on');if(on&&on.scrollIntoView)on.scrollIntoView({block:'nearest',inline:'nearest'});
$('gxCol').innerHTML=GC.map(x=>'<button type="button" class="gx-dot'+(x==S.color?' sel':'')+'" style="background:'+x+'" data-c="'+x+'" aria-label="لون"></button>').join('');
$('gxFin').innerHTML=FINS.map(f=>'<button type="button" class="gx-fin'+((S.fin||'g')==f[0]?' sel':'')+'" data-f="'+f[0]+'">'+f[1]+'</button>').join('');
$('gxAct').innerHTML=eq?'<button class="gx-cta" disabled>✔ السيارة الحالية</button>':own?'<button class="gx-cta go" data-a="eq">🚗 جهّز السيارة</button>':S.coins>=c.p?'<button class="gx-cta buy" data-a="buy">🛒 اشترِ بـ 💎 '+c.p+'</button>':'<button class="gx-cta" disabled>🔒 تحتاج '+(c.p-S.coins)+' عملة</button>'}
function rgar(){const G=$('garage');if(pv==null)pv=S.car;
if(!$('gxCv')){G.innerHTML='<div class="gx"><div class="gx-top"><span class="gx-coins">💎 <b id="gxCoins"></b></span><b class="gx-title">الكراج</b></div><div class="gx-stage"><canvas id="gxCv"></canvas><button class="gx-nav l" data-n="1" aria-label="التالية"><svg viewBox="0 0 24 24" width="26" height="26"><path d="M15 5l-7 7 7 7" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg></button><button class="gx-nav r" data-n="-1" aria-label="السابقة"><svg viewBox="0 0 24 24" width="26" height="26"><path d="M9 5l7 7-7 7" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg></button><div class="gx-info" id="gxInfo"></div></div><div class="gx-side"><div class="gx-list" id="gcar"></div><div class="gx-colors" id="gxCol"></div><div class="gx-fins" id="gxFin"></div><div id="gxAct"></div></div></div>';gxR=null}
if(!gxR&&window.THREE){gxR=new THREE.WebGLRenderer({canvas:$('gxCv'),alpha:true,antialias:true});gxR.setPixelRatio(Math.min(devicePixelRatio||1,2));gxS=gxScene();gxC=new THREE.PerspectiveCamera(36,1.6,.1,100);const pl=new THREE.Mesh(new THREE.CylinderGeometry(2.9,3,.12,56),new THREE.MeshStandardMaterial({color:0x14315a,metalness:.5,roughness:.4}));pl.position.y=-.07;const rg=new THREE.Mesh(new THREE.TorusGeometry(2.9,.05,8,64),new THREE.MeshBasicMaterial({color:0x22d3ee}));rg.rotation.x=Math.PI/2;rg.position.y=.0;gxS.add(pl,rg)}
gxFill();gxModel();gxW=gxH=0;if(!gxRaf)gxRaf=requestAnimationFrame(gxLoop);gxThumbs();
G.onclick=e=>{const t=e.target.closest('[data-i],[data-c],[data-a],[data-n],[data-f]');if(!t)return;ac();const c=CARS[pv];
if(t.dataset.n){pv=(pv+ +t.dataset.n+CARS.length)%CARS.length;gxModel()}else if(t.dataset.i!=null){pv=+t.dataset.i;gxModel()}else if(t.dataset.c){S.color=t.dataset.c;sv();gxModel();gxThumbs()}else if(t.dataset.f){S.fin=t.dataset.f;sv();gxModel();gxThumbs()}
else if(t.dataset.a==='buy'&&S.coins>=c.p&&!S.cars.includes(pv)){S.coins-=c.p;S.cars.push(pv);S.car=pv;sv();applyCar();beep(800,.15);fx(2);hud()}else if(t.dataset.a==='eq'){S.car=pv;sv();applyCar();beep(660,.12)}gxFill()}}

// ===== v4: more themes/roads, car items, avatar frames, achievement rewards =====
THEMES.push({id:'volcano',n:'بركان ناري',e:'🌋',sky:'#3b1d1d',land:'#5a2a1f',decor:'tower',c1:0xff5a1f,desc:'أبراج حمم متوهجة'},
{id:'aurora',n:'الشفق القطبي',e:'🌌',sky:'#0b1f3a',land:'#d9f0ff',decor:'snowpine',c1:0x34d399,desc:'ليل ثلجي وأضواء'},
{id:'jungle',n:'الغابة الاستوائية',e:'🌴',sky:'#a7f3d0',land:'#15803d',decor:'palm',c1:0x22a55b,desc:'نخيل وغابة كثيفة'},
{id:'oasis',n:'واحة الصحراء',e:'🏝️',sky:'#fde7b0',land:'#e6c27a',decor:'palm',c1:0xf59e0b,desc:'نخيل وسط الرمال'},
{id:'cloud',n:'مدينة الغيوم',e:'☁️',sky:'#dbeafe',land:'#ffffff',decor:'candy',c1:0x60a5fa,desc:'سحاب أبيض ومصاصات'});
ROADS.push({id:'lava',n:'طريق الحمم',road:'#2a0d0a',dash:'#fb923c',edge:'#ef4444',glow:1,desc:'أحمر متوهج'},
{id:'chrome',n:'كروم لامع',road:'#94a3b8',dash:'#0f172a',edge:'#e2e8f0',desc:'معدن فضي'},
{id:'candyrd',n:'طريق الحلوى',road:'#f9a8d4',dash:'#ffffff',edge:'#ec4899',desc:'وردي حلو'},
{id:'ocean',n:'طريق المحيط',road:'#0e4a6e',dash:'#67e8f9',edge:'#22d3ee',glow:1,desc:'أزرق عميق'},
{id:'violet',n:'بنفسجي ملكي',road:'#2e1065',dash:'#c4b5fd',edge:'#a78bfa',glow:1,desc:'وهج بنفسجي'});
const CITEMS=[
{id:'gl_cyan',g:'gl',n:'إضاءة سيانية',e:'🔵',p:150,col:0x22d3ee,desc:'نيون تحت السيارة'},
{id:'gl_pink',g:'gl',n:'إضاءة وردية',e:'🩷',p:150,col:0xf472b6,desc:'نيون تحت السيارة'},
{id:'gl_lime',g:'gl',n:'إضاءة خضراء',e:'🟢',p:150,col:0xa3e635,desc:'نيون تحت السيارة'},
{id:'gl_gold',g:'gl',n:'إضاءة ذهبية',e:'🟡',p:150,col:0xfbbf24,desc:'نيون تحت السيارة'},
{id:'rm_gold',g:'rm',n:'جنوط ذهبية',e:'⚙️',p:200,col:0xfbbf24,desc:'عجلات لامعة'},
{id:'rm_red',g:'rm',n:'جنوط حمراء',e:'🔴',p:200,col:0xef4444,desc:'عجلات رياضية'},
{id:'rm_cyan',g:'rm',n:'جنوط زرقاء',e:'🔷',p:200,col:0x22d3ee,desc:'عجلات مستقبلية'},
{id:'ac_siren',g:'ac',n:'ضوء الشرطة',e:'🚨',p:180,desc:'أحمر وأزرق فوق السيارة'},
{id:'ac_flag',g:'ac',n:'علم صغير',e:'🚩',p:120,desc:'علم يرفرف خلف السيارة'},
{id:'ac_wing',g:'ac',n:'جناح كبير',e:'🪽',p:220,desc:'جناح سباق خلفي'},
{id:'ac_beams',g:'ac',n:'أنوار أمامية',e:'💡',p:160,desc:'أشعة مضيئة للأمام'},
{id:'ac_star',g:'ac',n:'نجمة ذهبية',e:'⭐',p:140,desc:'نجمة فوق السيارة'}];
const FRAMES=[
{id:'fr_gold',n:'إطار ذهبي',p:150,sh:'0 0 0 4px #fbbf24,0 0 16px #fbbf24',desc:'إطار لامع للشخصية'},
{id:'fr_neon',n:'إطار نيون',p:180,sh:'0 0 0 3px #22d3ee,0 0 18px #22d3ee,0 0 30px #22d3ee',desc:'توهج أزرق'},
{id:'fr_rainbow',n:'قوس قزح',p:200,sh:'0 0 0 3px #ef4444,0 0 0 6px #facc15,0 0 0 9px #22c55e,0 0 0 12px #3b82f6',desc:'ألوان متعددة'},
{id:'fr_fire',n:'إطار ناري',p:220,sh:'0 0 0 4px #f97316,0 0 18px #ef4444,0 0 28px #facc15',desc:'لهب متوهج'},
{id:'fr_royal',n:'إطار ملكي',p:250,sh:'0 0 0 4px #7c3aed,0 0 0 8px #fbbf24,0 0 16px #7c3aed',desc:'بنفسجي وذهبي'}];
function applyFrame(){const f=FRAMES.find(x=>x.id===S.fr);document.body.style.setProperty('--frs',f?f.sh:'none');document.body.classList.toggle('has-fr',!!f)}
function addExtras(g){const T=THREE,M=g.userData.m;if(!M)return;const {ry,rz,L,W,bt,h}=M,A=S.eqA||[],bm=c=>new T.MeshBasicMaterial({color:c}),st=c=>new T.MeshStandardMaterial({color:c,roughness:.5}),add=(geo,mat,x,y,z)=>{const q=new T.Mesh(geo,mat);q.position.set(x,y,z);q.userData.ex=1;g.add(q);return q};
const gl=CITEMS.find(x=>x.id===S.eqG);if(gl){const q=add(new T.PlaneGeometry(W+1.4,L+1.4),new T.MeshBasicMaterial({color:gl.col,transparent:true,opacity:.7,blending:T.AdditiveBlending,depthWrite:false}),0,.05,0);q.rotation.x=-Math.PI/2}
const rm=CITEMS.find(x=>x.id===S.eqR);if(rm)(g.userData.wheels||[]).forEach(w=>{const mt=new T.MeshStandardMaterial({color:rm.col,metalness:.2,roughness:.35,emissive:rm.col,emissiveIntensity:.45});w.children.forEach(c=>{c.material=mt})});
if(A.includes('ac_siren')){add(new T.BoxGeometry(.95,.1,.34),st(0x111827),0,ry+.05,rz);add(new T.BoxGeometry(.42,.16,.3),bm(0xff2a2a),-.24,ry+.18,rz);add(new T.BoxGeometry(.42,.16,.3),bm(0x2a6bff),.24,ry+.18,rz)}
if(A.includes('ac_flag')){const px=W/2-.15,pz=L/2-.25,y0=bt+h*.7;add(new T.CylinderGeometry(.03,.03,1.3,6),bm(0xe5e7eb),px,y0+.65,pz);add(new T.PlaneGeometry(.6,.36),new T.MeshBasicMaterial({color:0xef4444,side:T.DoubleSide}),px-.3,y0+1.1,pz)}
if(A.includes('ac_wing')){const wy=bt+h+.35,wz=L/2-.2;add(new T.BoxGeometry(W*1.05,.08,.55),new T.MeshStandardMaterial({color:S.color,metalness:.3,roughness:.4}),0,wy,wz);add(new T.BoxGeometry(W*1.05,.2,.06),st(0x111827),0,wy+.08,wz+.26);for(const x of[-1,1])add(new T.BoxGeometry(.08,wy-bt-h*.6,.1),st(0x111827),x*W*.33,(wy+bt+h*.6)/2,wz)}
if(A.includes('ac_beams'))for(const x of[-1,1]){const q=add(new T.ConeGeometry(.45,2.6,16,1,true),new T.MeshBasicMaterial({color:0xfff3b0,transparent:true,opacity:.16,blending:T.AdditiveBlending,depthWrite:false,side:T.DoubleSide}),x*W*.33,bt+h*.5,-L/2-1.3);q.rotation.x=Math.PI/2}
if(A.includes('ac_star'))add(new T.OctahedronGeometry(.32),bm(0xffd23f),0,ry+.85,rz)}
const shopList=()=>shopTab==='t'?THEMES:shopTab==='r'?ROADS:shopTab==='c'?CITEMS:FRAMES,price=x=>x.p||200;
function isOwned(x){S.ownT=S.ownT||['day'];S.ownR=S.ownR||['classic'];S.own=S.own||[];return !!x.free||(shopTab==='t'?S.ownT:shopTab==='r'?S.ownR:S.own).includes(x.id)}
function isOn(x){return shopTab==='t'?curTheme().id===x.id:shopTab==='r'?curRoad().id===x.id:shopTab==='f'?S.fr===x.id:x.g==='gl'?S.eqG===x.id:x.g==='rm'?S.eqR===x.id:(S.eqA||[]).includes(x.id)}
function renderWorldShop(){const el=$('worlditems');if(!el)return;const T=shopTab==='t',R=shopTab==='r',tog=!T&&!R;
$('shopInfo').innerHTML='💎 <b>'+S.coins+'</b> · الثيم أو الطريق بـ 200 عملة';
$('shopTabs').innerHTML=[['t','🌍 الثيمات'],['r','🛣️ الطرق'],['c','🚗 السيارة'],['f','🖼️ إطارات']].map(a=>'<button data-tab="'+a[0]+'" class="'+(shopTab===a[0]?'on':'')+'">'+a[1]+'</button>').join('');
el.innerHTML=shopList().map(x=>{const o=isOwned(x),a=isOn(x),pv2=T?'<div class="wk-pv" style="background:linear-gradient('+x.sky+' 0 55%,'+x.land+' 55%)"><span class="wk-d">'+DE[x.decor]+DE[x.decor]+DE[x.decor]+'</span><span class="wk-e">'+x.e+'</span><i style="background:'+curRoad().road+'"></i></div>':R?'<div class="wk-pv">'+roadSvg(x)+'</div>':'<div class="wk-pv wk-em">'+(shopTab==='f'?'<span class="wk-fr" style="box-shadow:'+x.sh+'">🦊</span>':x.e)+'</div>';
return '<div class="wk-card'+(a?' sel':'')+'">'+pv2+'<b>'+x.n+'</b><small>'+x.desc+'</small><button data-id="'+x.id+'"'+(a&&!tog?' disabled':'')+'>'+(a?(tog?'✔ مركّب · إزالة':'✔ مُختار'):o?(tog?'تركيب':'اختيار'):'🔒 '+price(x)+' 💎 شراء')+'</button></div>'}).join('');
el.onclick=ev=>{const b=ev.target.closest('button[data-id]');if(b)shopAct(b.dataset.id)};$('shopTabs').onclick=ev=>{const b=ev.target.closest('[data-tab]');if(b){shopTab=b.dataset.tab;renderWorldShop()}}}
function shopAct(id){const x=shopList().find(v=>v.id===id);if(!x)return;ac();
if(!isOwned(x)){const p=price(x);if(S.coins<p){cel('تحتاج '+(p-S.coins)+' عملة إضافية 💎',1500,0);return}S.coins-=p;(shopTab==='t'?S.ownT:shopTab==='r'?S.ownR:S.own).push(x.id);beep(800,.15);fx(2);cel('تم الشراء ✓ '+x.n,1200,1)}
const on=isOn(x);if(shopTab==='t')S.theme=id;else if(shopTab==='r')S.road=id;else if(shopTab==='f')S.fr=on?'':id;else if(x.g==='gl')S.eqG=on?'':id;else if(x.g==='rm')S.eqR=on?'':id;else{const A=S.eqA=S.eqA||[],i=A.indexOf(id);if(i>=0&&on)A.splice(i,1);else if(i<0)A.push(id)}
sv();applyLook();applyFrame();if(shopTab==='c')applyCar();hud();renderWorldShop()}
function chooseWorld(id){shopAct(id)}
function achExtra(a,D,done){S.achR=S.achR||{};const all=done===D.length;a.insertAdjacentHTML('beforeend','<div class="ach-bonus">'+(S.achAll?'🏆 استلمت جائزة إنهاء كل الإنجازات (1000 💎)':all?'<button class="ach-claim big" data-ach="__all">🏆 استلم 1000 💎 لإنهاء كل الإنجازات</button>':'🏆 أنهِ كل الإنجازات واحصل على 1000 💎')+'</div>');
a.onclick=e=>{const b=e.target.closest('[data-ach]');if(!b)return;const k=b.dataset.ach;if(k==='__all'){if(S.achAll||!all)return;S.achAll=1;S.coins+=1000;cel('🏆 مبروك! +1000 عملة',2200,1)}else{if(S.achR[k])return;S.achR[k]=1;S.coins+=100;cel('🎁 +100 عملة',1200,1)}sv();hud();rprog()}}

// ===== owner shortcut: tap the logo 7 times, enter PIN =====
(function(){let n=0,t=0;document.addEventListener('click',e=>{if(!e.target.closest('.hero-mark'))return;const now=Date.now();n=now-t<1500?n+1:1;t=now;if(n>=7){n=0;adm()}});
async function adm(){const p=prompt('رمز المسؤول:');if(!p)return;try{const h=[...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(p)))].map(b=>b.toString(16).padStart(2,'0')).join('');if(h==='d104bb72efb6da9f1b0b685d829b7566fec41cfd9fb432fb066ff381f5529383'){S.coins=100000;sv();hud();cel('تم ✅ 100000 عملة',1500,0)}else alert('رمز خاطئ')}catch(e){alert('غير متاح')}}})();
// ===== redeem code box =====
function openCode(){const o=document.createElement('div');o.style.cssText='position:fixed;inset:0;z-index:90;background:rgba(16,39,68,.88);display:flex;align-items:center;justify-content:center;padding:16px';
o.innerHTML='<div style="background:#fff;border-radius:24px;padding:18px;max-width:380px;width:100%;text-align:center"><b style="font:800 22px Cairo;color:#102744">🎟️ كود الاسترداد</b><input id="cdIn" autocomplete="off" autocapitalize="characters" dir="ltr" placeholder="CODE" style="width:100%;margin:12px 0 6px;padding:12px;font:800 20px Poppins,Cairo;text-align:center;border:3px solid #cbd5e1;border-radius:14px;box-sizing:border-box"><div id="cdMsg" style="min-height:24px;font:700 15px Cairo;color:#475569"></div><button id="cdGo" class="btn g" style="width:100%;margin-top:8px">تفعيل</button><button id="cdX" class="btn s" style="margin-top:8px">إغلاق</button></div>';
document.body.appendChild(o);const i=o.querySelector('#cdIn'),m=o.querySelector('#cdMsg'),go=o.querySelector('#cdGo');o.querySelector('#cdX').onclick=()=>o.remove();
go.onclick=async()=>{const c=i.value.trim();if(!c)return;go.disabled=true;m.style.color='#475569';m.textContent='جاري التحقق...';
try{const r=await fetch('/api/redeem',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({code:c})}),j=await r.json().catch(()=>({}));
if(r.ok&&j.ok){S.coins+=j.amount;sv();hud();m.style.color='#16a34a';m.textContent='🎉 تمت إضافة '+j.amount+' عملة!';i.value='';setTimeout(()=>o.remove(),1600)}else{m.style.color='#dc2626';m.textContent=j.msg||'تعذر التفعيل'}}catch(e){m.style.color='#dc2626';m.textContent='تأكد من الاتصال بالإنترنت'}go.disabled=false}}
// ===== English letters & words =====
const ENL=[...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'],ENH={A:['Apple','🍎','تفاحة'],B:['Ball','⚽','كرة'],C:['Cat','🐱','قطة'],D:['Dog','🐶','كلب'],E:['Egg','🥚','بيضة'],F:['Fish','🐟','سمكة'],G:['Goat','🐐','ماعز'],H:['Hat','🎩','قبعة'],I:['Ice cream','🍦','آيس كريم'],J:['Juice','🧃','عصير'],K:['Kite','🪁','طائرة ورقية'],L:['Lion','🦁','أسد'],M:['Moon','🌙','قمر'],N:['Nose','👃','أنف'],O:['Orange','🍊','برتقالة'],P:['Pig','🐷','خنزير'],Q:['Queen','👸','ملكة'],R:['Rabbit','🐰','أرنب'],S:['Sun','☀️','شمس'],T:['Tree','🌳','شجرة'],U:['Umbrella','☂️','مظلة'],V:['Van','🚐','سيارة نقل'],W:['Water','💧','ماء'],X:['Xylophone','🎶','إكسيليفون'],Y:['Yellow','🟡','أصفر'],Z:['Zebra','🦓','حمار وحشي']};
const ENW=[['cat','🐱','قطة'],['dog','🐶','كلب'],['sun','☀️','شمس'],['hat','🎩','قبعة'],['bus','🚌','حافلة'],['car','🚗','سيارة'],['pen','🖊️','قلم'],['cup','☕','كوب'],['bed','🛏️','سرير'],['egg','🥚','بيضة'],['pig','🐷','خنزير'],['cow','🐮','بقرة'],['bee','🐝','نحلة'],['red','🔴','أحمر'],['eye','👁️','عين'],['fish','🐟','سمكة'],['milk','🥛','حليب'],['book','📖','كتاب'],['star','⭐','نجمة'],['tree','🌳','شجرة'],['bird','🐦','طائر'],['duck','🦆','بطة'],['frog','🐸','ضفدع'],['cake','🎂','كعكة'],['ball','⚽','كرة'],['door','🚪','باب'],['moon','🌙','قمر'],['rain','🌧️','مطر'],['nose','👃','أنف'],['hand','✋','يد']];
const PRE=['Great job!','Well done!','Awesome!','Super!','Good!'];
ENL.forEach(L=>{H[L]=ENH[L]});ENW.forEach(d=>{H[d[0]]=d});
W.push({n:'حروف إنجليزية A–Z (26)',c:0x7ec850,sky:0x9be0ff,req:0,lang:'en'},{n:'كلمات إنجليزية (30)',c:0xf2c26b,sky:0xffe2b0,req:0,lang:'en'});
{const gl=W.length-2,gw=W.length-1;ENL.forEach((L,i)=>LV.push({id:'e'+i,w:0,g:gl,lang:'en',en:i,n:L}));ENW.forEach((d,i)=>LV.push({id:'x'+i,w:1,g:gw,lang:'en',ex:i,n:d[1]}))}
function qs(l){return l.lang==='en'?qsEn(l):qsAr(l)}
function qsEn(l){const out=[];if(l.ex!=null){const N=ENW.length;for(let k=0;k<5;k++){const t=ENW[(l.ex+k)%N][0],a=ENW[(l.ex+k+7)%N][0],b=ENW[(l.ex+k+15)%N][0];out.push({id:l.id+'q'+k,t,sp:t,a:'',lang:'en',opts:[t,a,b],ok:t})}return out}
const i=l.en,P=j=>ENL[j%26],t=P(i);for(let k=0;k<5;k++){const o=[t,P(i+3+k*5),P(i+11+k*7)];out.push({id:l.id+'q'+k,t,sp:ENL[i]+'. '+ENL[i]+' for '+ENH[ENL[i]][0],a:'',lang:'en',opts:o,ok:t})}return out}
function showTarget(){const b=$('tgBig');if(!b||!Q)return;const lv=LV[cur],en=lv&&lv.lang==='en',w=lv&&lv.w,h=H[Q.t],t=w?(Q.sp||Q.t):Q.t;let hint='';
if(en&&h)hint='<div class="tgb-h"><span dir="ltr">'+h[1]+' '+(w?'':h[0])+'</span> · '+h[2]+'</div>';else if(!en&&!w&&h)hint='<div class="tgb-h">'+h[1]+' '+h[0]+'</div>';
b.innerHTML='<div class="tgb-l"><small>'+(w?'الكلمة المطلوبة':'الحرف المطلوب')+'</small><div class="tgb-t'+(t.length>3?' long':'')+(en?' en':'')+'"'+(en?' dir="ltr"':'')+'>'+t+'</div>'+hint+'</div><button class="tgb-s" onclick="replay()" aria-label="أعد الصوت">🔊</button>';b.classList.add('on')}
function label(g,t){const c=g.userData.cv.getContext('2d'),col=g.userData.col||'#22d3ee',ltr=/[A-Za-z]/.test(t);c.clearRect(0,0,256,256);const gr=c.createLinearGradient(0,0,0,256);gr.addColorStop(0,'rgba(8,20,48,.93)');gr.addColorStop(1,'rgba(12,34,78,.85)');c.fillStyle=gr;c.beginPath();c.roundRect?c.roundRect(10,10,236,236,34):c.rect(10,10,236,236);c.fill();c.save();c.shadowColor=col;c.shadowBlur=18;c.strokeStyle=col;c.lineWidth=6;c.stroke();c.restore();
for(let y=24;y<236;y+=8){c.fillStyle='rgba(255,255,255,.04)';c.fillRect(18,y,220,2)}
c.save();c.fillStyle='#fff';c.shadowColor=col;c.shadowBlur=24;let fs=t.length<=3?120:t.length<=5?84:64;const fn=s=>'800 '+s+'px '+(ltr?'Poppins,Cairo':'Cairo')+',sans-serif';c.font=fn(fs);while(c.measureText(t).width>190&&fs>24){fs-=4;c.font=fn(fs)}c.textAlign='center';c.textBaseline='middle';c.direction=ltr?'ltr':'rtl';c.fillText(t,128,136);c.restore();g.userData.tx.needsUpdate=true}
function rmap(){S.mapTab=S.mapTab||'ar';const tab=S.mapTab;let h='<div class="mtabs"><button data-m="ar" class="'+(tab==='ar'?'on':'')+'">🇪🇬 عربي</button><button data-m="en" class="'+(tab==='en'?'on':'')+'">🇬🇧 English</button></div>';
W.forEach((w,wi)=>{if((w.lang||'ar')!==tab)return;h+='<h2>'+w.n+'</h2><div class="row"'+(tab==='en'?' dir="ltr"':'')+'>';LV.forEach((l,i)=>{if((l.g!=null?l.g:l.w)==wi)h+='<button class="lv'+(l.lang==='en'&&!l.w?' en':'')+'" onclick="startLevel('+i+')">'+l.n+'<br>'+'⭐'.repeat(S.stars[l.id]||0)+'</button>'});h+='</div>'});
$('lvs').innerHTML=h;$('lvs').onclick=ev=>{const b=ev.target.closest('[data-m]');if(b){S.mapTab=b.dataset.m;sv();rmap()}}}

// ===== finishes + paint colors =====
const FINS=[['g','✨ لامع'],['m','🎨 مطفي'],['x','🔩 معدني'],['p','🤍 لؤلؤي'],['n','💡 نيون']],PCOLS=['#ef4444','#f97316','#facc15','#4ade80','#22c55e','#14b8a6','#38bdf8','#3b82f6','#6366f1','#a78bfa','#ec4899','#f43f5e','#92400e','#111827','#9ca3af','#ffffff','#fde68a','#7dd3fc'];
function bodyMat(color){const f=S.fin||'g',o={color:color,metalness:.25,roughness:.3,clearcoat:1,clearcoatRoughness:.08};
if(f==='m'){o.metalness=0;o.roughness=.9;o.clearcoat=0}else if(f==='x'){o.metalness=.6;o.roughness=.28;o.clearcoat=.8;o.emissive=new THREE.Color(color);o.emissiveIntensity=.14}else if(f==='p'){o.metalness=.1;o.roughness=.12;o.emissive=new THREE.Color(0xffffff);o.emissiveIntensity=.18}else if(f==='n'){o.roughness=.4;o.clearcoat=0;o.emissive=new THREE.Color(color);o.emissiveIntensity=.6}
return new THREE.MeshPhysicalMaterial(o)}
// ===== boot with real tracked tasks =====
(async()=>{const tasks=[['المحرك 3D',async()=>{if(typeof THREE=='undefined')throw 0;init3()}],['الخطوط',()=>document.fonts.ready],['بيانات المستويات',async()=>{if(!LV.every(l=>qs(l).length==5))throw 0}],['الحفظ',async()=>{ach();hud()}]];
 let d=0;try{for(const[n,f]of tasks){$('pt').textContent=n;await Promise.race([f(),new Promise((_,r)=>setTimeout(r,8000))]);$('pb').style.width=++d/tasks.length*100+'%';$('pp').textContent=Math.round(d/tasks.length*100)+'%'}
 $('pre').style.opacity=0;setTimeout(()=>{$('pre').classList.remove('on');go('home')},400)}catch(e){$('pt').textContent='تعذر التحميل: '+tasks[d][0];$('rt').style.display=''}})();
