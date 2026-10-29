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
 {n:'كهربائية E',p:700,w:1.86,l:3.8,h:.48,cb:.56,k:'electric',sp:1,cl:.36,cz:.04,wr:.4}
];
const COLS=['#38BDF8','#4ADE80','#FB923C','#A78BFA','#F43F5E','#FACC15'];
const H={'أَ':['أَرنب','🐰'],'أُ':['أُذُن','👂'],'إِ':['إِبرة','🪡'],'بَ':['بَطّة','🦆'],'بُ':['بُرتقال','🍊'],'بِ':['بِطّيخ','🍉'],'تَ':['تَمر','🌴'],'تُ':['تُفّاح','🍎'],'تِ':['تِمساح','🐊'],'مَا':['ماء','💧'],'مُو':['موز','🍌'],'مِي':['ميزان','⚖️'],'سَا':['ساعة','⏰'],'سُو':['سُوق','🛒'],'سِي':['سِيّارة','🚗']};
const PR=['أحسنت!','برافو عليك!','ممتاز يا بطل!','رائع جداً!','شاطر!','عمل جميل!','أنت نجم!'],EN=['حاول مرة ثانية، أنت تقدر!','لا بأس، نتعلم معاً!','قريب جداً، استمر!'],pk=a=>a[Math.floor(Math.random()*a.length)];
const aud=t=>'assets/audio/'+[...t].map(c=>c.codePointAt(0).toString(16)).join('-')+'.mp3';
function qs(l){const out=[];if(l.wd!=null){for(let k=0;k<5;k++){const i=l.wd,t=WD[(i+k)%28];out.push({id:l.id+'q'+k,t:t[1],sp:t[0],a:aud(t[0]),opts:[t[0],WD[(i+k+9)%28][0],WD[(i+k+18)%28][0]],ok:t[0]})}return out}for(let i=0;i<5;i++){const s=l.s[i%l.s.length],t=s[i%3],q={id:l.id+'q'+i,t,a:aud(t),opts:s.slice(),ok:t};
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
function hud(){const nm=$('nm');if(nm){nm.innerHTML=(S.avatarImage?'<img class="greeting-avatar" src="'+S.avatarImage+'" alt="صورة اللاعب">':'<span class="greeting-emoji">'+(S.avatar||'🦊')+'</span>')+' <span>'+(S.name||'')+'</span>';}document.querySelectorAll('.co').forEach(e=>e.textContent=S.coins);$('ts').textContent=tot();const ss=$('stageStat');if(ss)ss.textContent=Math.min(LV.length,Object.keys(S.claimed).length+1)+'/56';let chip=$('globalAvatar');if(!chip){chip=document.createElement('button');chip.id='globalAvatar';chip.className='global-avatar';chip.title='شخصيتي';chip.onclick=()=>go('profile');document.body.appendChild(chip)}chip.innerHTML=S.avatarImage?'<img src="'+S.avatarImage+'" alt="شخصيتي">':(S.avatar||'🦊');chip.style.display=(!['pre','home','hud','pz','res','gm','gp','garage'].includes(document.querySelector('.scr.on')?.id))?'grid':'none';}
// ===== audio =====
let AC,busy=false,cur0=null;
function ac(){if(S.set.B&&!mi)setTimeout(music,0);try{if(!ac.w&&window.speechSynthesis){ac.w=1;const u=new SpeechSynthesisUtterance(' ');u.volume=0;speechSynthesis.speak(u)}}catch(e){}if(!AC)try{AC=new(window.AudioContext||webkitAudioContext)()}catch(e){}if(AC&&AC.state=='suspended')AC.resume()}
function beep(f,d=.15,t=0){if(!S.set.S||!AC)return;const o=AC.createOscillator(),g=AC.createGain();o.frequency.value=f;g.gain.value=.12*Math.max(0,Math.min(1,Number(S.volume??.75)));o.connect(g);g.connect(AC.destination);o.start(AC.currentTime+t);o.stop(AC.currentTime+t+d)}
function tts(t){if(!('speechSynthesis' in window)){msg('⚠️ هذا المتصفح لا يدعم النطق');return}
 try{const s=speechSynthesis;s.cancel();s.resume();busy=true;setTimeout(()=>{const u=new SpeechSynthesisUtterance(t);u.lang='ar-SA';u.rate=.82;u.volume=Math.max(0,Math.min(1,Number(S.volume??.75)));const vs=s.getVoices(),v=vs.find(v=>v.lang&&v.lang.toLowerCase().startsWith('ar'));if(v)u.voice=v;else if(vs.length)msg('⚠️ لا يوجد صوت عربي على جهازك');u.onend=()=>{busy=false};u.onerror=e=>{busy=false;if(e.error!=='interrupted'&&e.error!=='canceled')msg('⚠️ تعذر النطق: '+(e.error||''))};s.speak(u)},150);setTimeout(()=>{busy=false},3500)}catch(e){busy=false}}
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
 if(ok){if(!miss[Q.id])right++;if(!miss[Q.id]){earned+=3;S.coins+=3}sv();hud();fx(LV[cur].w?4:2);beep(660,.12);beep(880,.2,.12);const p=pk(PR);msg('✅ '+p);tts(p);bump(true)}
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
 let col=COLS[0],d=0,k=0;const draw=()=>{g.globalCompositeOperation='source-over';g.clearRect(0,0,300,300);g.drawImage(ly,0,0);g.globalCompositeOperation='destination-in';g.drawImage(mk,0,0);g.globalCompositeOperation='destination-over';g.fillStyle='#e2e8f0';g.font=mg.font;g.textAlign='center';g.textBaseline='middle';g.fillText(ch,150,170);g.globalCompositeOperation='source-over'};draw();
 $('pl').innerHTML=COLS.map(x=>'<div class="dot" style="background:'+x+'" data-c="'+x+'"></div>').join('');$('pl').onclick=e=>{if(e.target.dataset.c)col=e.target.dataset.c};
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
 D=[['🏁','أول سباق','ابدأ أول مرحلة',S.races>0?1:0,1],['✅','خمس إجابات','5 إجابات صحيحة',Math.min(5,tc),5],['💯','جولة مثالية','احصل على 3 نجوم',Object.values(S.stars).includes(3)?1:0,1],['🎯','ثلاث مراحل','أنهِ 3 مراحل',Math.min(3,nc),3],['🔟','عشر مراحل','أنهِ 10 مراحل',Math.min(10,nc),10],['🔤','كل الحروف','أنهِ الحروف الـ 28',LET.filter((_,i)=>S.claimed['a'+i]).length,28],['🖼️','خبير الكلمات','أنهِ الكلمات الـ 28',WD.filter((_,i)=>S.claimed['w'+i]).length,28],['💎','ثري صغير','اجمع 200 عملة',Math.min(200,S.coins),200],['🚗','مالك سيارة','اشترِ سيارة جديدة',S.cars.length>1?1:0,1]],
 done=D.filter(d=>d[3]>=d[4]).length,
 tl=[['⭐',tot(),'نجوم'],['💎',S.coins,'عملات'],['🏁',nc+'/56','مراحل'],['🎯',(ta?Math.round(100*tc/ta):0)+'%','دقة'],['⏱️',Math.round((S.t||0)/60),'دقيقة']];
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
 T={pick:[[[.5,0],[.5,.5],[.45,.68],[.3,.8],[.2,.86],[.02,.86],[0,.7],[-.5,.7],[-.5,0]],[.22,.12,.02,.02]],jeep:[[[.5,0],[.5,.55],[.46,.8],[.2,.86],[-.5,.86],[-.5,0]],[.2,.15,-.32,-.34]],f1:[[[.5,0],[.5,.35],[.2,.6],[-.2,.8],[-.5,.8],[-.5,0]],[0,-.05,-.12,-.15]],van:[[[.5,0],[.5,.5],[.44,.74],[.3,.86],[-.5,.86],[-.5,0]],[.3,.26,-.45,-.46]]},
 t=T[c.k]||[[[.5,0],[.5,.5],[.45,.68],[.28,.8],[.14,.86],[-.3,.86],[-.43,.8],[-.5,.58],[-.5,0]],[.15,.05,-.2,-.3]],
 body=new THREE.MeshPhysicalMaterial({color:color,metalness:.25,roughness:.3,clearcoat:1,clearcoatRoughness:.08}),gl=new THREE.MeshStandardMaterial({color:0x223344,metalness:.6,roughness:.1}),dk=new THREE.MeshStandardMaterial({color:0x111827,roughness:.7}),ch=new THREE.MeshStandardMaterial({color:0xe5e7eb,metalness:.9,roughness:.2}),hl=new 
