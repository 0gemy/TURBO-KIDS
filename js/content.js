// New content: world themes, roads, gates, car glows/rims/accessories, frames, 6 new cars + 2 motorcycles, letter-tracing game.
(function(){
const add=(arr,list)=>list.forEach(x=>{if(!arr.some(y=>y.id===x.id))arr.push(x)});
add(THEMES,[
{id:'autumn',n:'خريف ذهبي',e:'🍂',sky:'#f6c48b',land:'#b45f2a',decor:'pine',c1:0xea580c,fx2:'petal',p:450,desc:'أوراق الخريف تتساقط'},
{id:'storm',n:'عاصفة رعدية',e:'⛈️',sky:'#475569',land:'#334155',decor:'tower',c1:0x94a3b8,fx:'rain',p:600,desc:'مطر وسحب داكنة'},
{id:'meadow',n:'مرج الأزهار',e:'🌼',sky:'#bfeaff',land:'#86e07a',decor:'cherry',c1:0xf472b6,fx2:'petal',p:500,desc:'أزهار وفراشات'},
{id:'icelake',n:'بحيرة متجمدة',e:'🧊',sky:'#d0f0ff',land:'#bfe3f5',decor:'iceberg',c1:0x7dd3fc,fx2:'snow',p:700,desc:'جليد لامع وثلج خفيف'},
{id:'toyland',n:'مدينة الألعاب',e:'🧸',sky:'#ffe0f0',land:'#ffd166',decor:'candy',c1:0xef4444,p:800,desc:'ألوان زاهية ولعب'},
{id:'nightcity',n:'مدينة الليل',e:'🌃',sky:'#0b1030',land:'#131a40',decor:'tower',c1:0xf472b6,moon:1,p:900,desc:'أضواء المدينة بالليل'},
{id:'goldsand',n:'الصحراء الذهبية',e:'🏜️',sky:'#ffd27a',land:'#f0b34a',decor:'pyramid',c1:0xfbbf24,fx2:'sparkle',p:1000,desc:'رمال تلمع كالذهب'},
{id:'emerald',n:'وادي الزمرد',e:'💚',sky:'#9be8c8',land:'#1f8a5b',decor:'crystal',c1:0x34d399,fx2:'sparkle',p:1100,desc:'بلورات خضراء ساحرة'},
{id:'firecave',n:'كهف النار',e:'🔥',sky:'#2a0a0a',land:'#5a1d0c',decor:'volcano',c1:0xf97316,fx2:'ember',p:1300,desc:'شرارات وحمم'},
{id:'dreamland',n:'أرض الأحلام',e:'☁️',sky:'#e9d5ff',land:'#c4b5fd',decor:'mushroom',c1:0xa78bfa,fx2:'sparkle',p:1500,desc:'عالم وردي حالم'}]);
add(ROADS,[
{id:'sunsetrd',n:'طريق الغروب',road:'#3b1d4a',dash:'#fb923c',edge:'#f472b6',glow:1,p:450,desc:'ألوان الغروب'},
{id:'emeraldrd',n:'زمرد لامع',road:'#052e1f',dash:'#34d399',edge:'#34d399',glow:1,p:500,desc:'خطوط خضراء مضيئة'},
{id:'obsidian',n:'سبج أسود',road:'#0a0a0f',dash:'#e5e7eb',edge:'#a3a3a3',p:550,desc:'أسود فاخر'},
{id:'pinkcloud',n:'سحابة وردية',road:'#7b4b8a',dash:'#fbcfe8',edge:'#f9a8d4',p:600,desc:'طريق وردي ناعم'},
{id:'minty',n:'نعناع',road:'#134e4a',dash:'#ccfbf1',edge:'#5eead4',p:650,desc:'أخضر منعش'},
{id:'aquaflow',n:'مجرى أزرق',road:'#083344',dash:'#67e8f9',edge:'#22d3ee',glow:1,p:700,desc:'أزرق مضيء'},
{id:'goldrush',n:'سباق الذهب',road:'#3a2a05',dash:'#facc15',edge:'#facc15',glow:1,p:800,desc:'ذهب لامع'},
{id:'midnight',n:'منتصف الليل',road:'#0b1030',dash:'#818cf8',edge:'#6366f1',glow:1,p:900,desc:'نيلي مضيء'},
{id:'firelane',n:'ممر اللهب',road:'#2a0a05',dash:'#fb923c',edge:'#ef4444',glow:1,p:1000,desc:'خطوط نارية'},
{id:'royalrd',n:'الطريق الملكي',road:'#2e1065',dash:'#fde68a',edge:'#fbbf24',glow:1,p:1300,desc:'بنفسجي وذهبي'},
{id:'rainbow2',n:'قوس قزح ملكي',road:'#1e293b',dash:'#ffffff',edge:'#ffffff',rainbow:1,p:1500,desc:'ألوان متحركة'}]);
add(GATES,[
{id:'gem',base:'hex',n:'بوابة الجوهرة',e:'💎',pal:[0xf9a8d4,0xffffff,0x67e8f9],p:400,desc:'ألوان جوهرة لامعة'},
{id:'laser',base:'neon',n:'بوابة الليزر',e:'🔦',pal:[0xef4444,0x22c55e,0x3b82f6],p:450,desc:'أشعة ملونة'},
{id:'dusk',base:'arch',n:'بوابة الغروب',e:'🌇',pal:[0xfb923c,0xf472b6,0xa78bfa],p:500,desc:'ألوان المغيب'},
{id:'magic',base:'wood',n:'الغابة السحرية',e:'🧚',pal:[0x4ade80,0xa3e635,0xfde047],p:600,desc:'أخضر مضيء'},
{id:'cryst',base:'hex',n:'بوابة الكريستال',e:'🔮',pal:[0x2dd4bf,0xa78bfa,0xbae6fd],p:700,desc:'بلورات مضيئة'},
{id:'bluefire',base:'fire',n:'النار الزرقاء',e:'🌀',pal:[0x38bdf8,0x818cf8,0xe0f2fe],p:800,desc:'لهب أزرق بارد'},
{id:'galaxy2',base:'space',n:'بوابة المجرة',e:'🌌',pal:[0xa855f7,0xfde047,0x22d3ee],p:900,desc:'نجوم وكواكب'},
{id:'goldstar',base:'gold',n:'النجمة الذهبية',e:'🌟',pal:[0xfde047,0xffffff,0xfb923c],p:1000,desc:'ذهب وضوء'},
{id:'royalg',base:'portal',n:'البوابة الملكية',e:'👑',pal:[0xfbbf24,0xef4444,0x3b82f6],p:1300,desc:'ألوان ملكية'},
{id:'prism',base:'rainbow',n:'بوابة المنشور',e:'🪩',pal:[0xf472b6,0x22d3ee,0xfde047],p:1500,desc:'ألوان ساطعة'}]);
add(FRAMES,[
{id:'fr_galaxy',n:'إطار مجرة',p:300,sh:'0 0 0 4px #4c1d95,0 0 0 8px #a78bfa,0 0 22px #7c3aed',desc:'بنفسجي مضيء'},
{id:'fr_lava',n:'إطار حمم',p:330,sh:'0 0 0 4px #7f1d1d,0 0 0 8px #f97316,0 0 24px #ef4444',desc:'برتقالي ناري'},
{id:'fr_mint',n:'إطار نعناع',p:300,sh:'0 0 0 4px #14b8a6,0 0 0 8px #ccfbf1,0 0 18px #5eead4',desc:'أخضر منعش'},
{id:'fr_gold2',n:'إطار ذهبي ملكي',p:400,sh:'0 0 0 4px #fde047,0 0 0 8px #ca8a04,0 0 0 12px #fde047,0 0 24px #fbbf24',desc:'ثلاث طبقات ذهب'}]);
add(CITEMS,[
{id:'gl_orange',g:'gl',n:'إضاءة برتقالية',e:'🟠',p:250,col:0xfb923c,desc:'وهج تحت السيارة'},
{id:'gl_aqua',g:'gl',n:'إضاءة تركواز',e:'🔵',p:250,col:0x2dd4bf,desc:'وهج تحت السيارة'},
{id:'gl_violet',g:'gl',n:'إضاءة بنفسجية',e:'🟣',p:250,col:0x8b5cf6,desc:'وهج تحت السيارة'},
{id:'gl_mint',g:'gl',n:'إضاءة نعناع',e:'🟢',p:250,col:0x86efac,desc:'وهج تحت السيارة'},
{id:'rm_orange',g:'rm',n:'عجلات برتقالية',e:'🟠',p:300,col:0xfb923c,desc:'عجلات لامعة'},
{id:'rm_sky',g:'rm',n:'عجلات سماوية',e:'🔵',p:300,col:0x7dd3fc,desc:'عجلات لامعة'},
{id:'rm_lime',g:'rm',n:'عجلات ليموني',e:'🟢',p:300,col:0xa3e635,desc:'عجلات لامعة'},
{id:'rm_violet',g:'rm',n:'عجلات بنفسجية',e:'🟣',p:300,col:0x8b5cf6,desc:'عجلات لامعة'},
{id:'ac_jet',g:'ac',n:'جت خلفي',e:'🚀',p:700,desc:'ثلاث محركات نفاثة'},
{id:'ac_rainbow',g:'ac',n:'ذيل قوس قزح',e:'🌈',p:600,desc:'ذيل ملون خلف السيارة'},
{id:'ac_ufo',g:'ac',n:'صحن طائر',e:'🛸',p:900,desc:'صحن بأضواء فوق السقف'},
{id:'ac_prop',g:'ac',n:'مروحة',e:'🚁',p:400,desc:'مروحة فوق السيارة'},
{id:'ac_orbit',g:'ac',n:'نجوم تدور',e:'💫',p:650,desc:'نجوم حول السيارة'},
{id:'ac_balloon',g:'ac',n:'بالونة قلب',e:'🎈',p:350,desc:'بالونة وردية'},
{id:'ac_trophy',g:'ac',n:'كأس البطل',e:'🏆',p:500,desc:'كأس ذهبي فوق السقف'},
{id:'ac_lantern',g:'ac',n:'فانوس',e:'🏮',p:450,desc:'فانوس أحمر مضيء'}]);
// ---- extra accessories ----
const _ae=addExtras;
addExtras=function(g){_ae(g);try{ex2(g)}catch(e){}};
function ex2(g){const M=g.userData.m;if(!M)return;const {ry,rz,L,W,bt,h}=M,A=S.eqA||[],T=THREE,bm=c=>new T.MeshBasicMaterial({color:c}),st=(c,e)=>new T.MeshStandardMaterial({color:c,roughness:.5,metalness:.3,emissive:e||0,emissiveIntensity:e?.6:0}),
 ad=(geo,mat,x,y,z,rx,ry2,rz2)=>{const q=new T.Mesh(geo,mat);q.position.set(x,y,z);q.rotation.set(rx||0,ry2||0,rz2||0);q.userData.ex=1;g.add(q);return q};
 if(A.includes('ac_jet'))for(const x of[-1,0,1]){ad(new T.CylinderGeometry(.24,.28,.5,12),st(0x475569),x*W*.28,bt+h*.5,L/2+.2,Math.PI/2);ad(new T.ConeGeometry(.3,1.7,12),bm(0xff7a1a),x*W*.28,bt+h*.5,L/2+1.1,Math.PI/2);ad(new T.ConeGeometry(.16,1.0,12),bm(0x38bdf8),x*W*.28,bt+h*.5,L/2+.8,Math.PI/2)}
 if(A.includes('ac_rainbow'))[0xef4444,0xfb923c,0xfacc15,0x22c55e,0x3b82f6,0xa855f7].forEach((c,i)=>ad(new T.BoxGeometry(.15,.04,3.2),bm(c),(i-2.5)*.17,bt+.14,L/2+1.8));
 if(A.includes('ac_ufo')){ad(new T.SphereGeometry(.7,18,10),st(0x94a3b8),0,ry+.5,rz).scale.set(1,.22,1);ad(new T.SphereGeometry(.3,14,10,0,Math.PI*2,0,Math.PI/2),new T.MeshBasicMaterial({color:0x67e8f9,transparent:true,opacity:.7}),0,ry+.55,rz);for(let k=0;k<6;k++){const a=k*Math.PI/3;ad(new T.SphereGeometry(.06,8,6),bm(k%2?0xfde047:0xf472b6),Math.cos(a)*.62,ry+.5,rz+Math.sin(a)*.62)}}
 if(A.includes('ac_prop')){ad(new T.CylinderGeometry(.04,.04,.4,6),st(0x111827),0,ry+.25,rz);ad(new T.BoxGeometry(1.5,.04,.16),bm(0xef4444),0,ry+.47,rz);ad(new T.BoxGeometry(1.5,.04,.16),bm(0x3b82f6),0,ry+.47,rz,0,Math.PI/2);ad(new T.SphereGeometry(.07,8,6),bm(0xfde047),0,ry+.5,rz)}
 if(A.includes('ac_orbit'))for(let k=0;k<6;k++){const a=k*Math.PI/3;ad(new T.OctahedronGeometry(.16),bm(k%2?0xfde047:0x67e8f9),Math.cos(a)*(W*.8),bt+h+.4,Math.sin(a)*(L*.35))}
 if(A.includes('ac_balloon')){const px=W/2-.2;ad(new T.CylinderGeometry(.012,.012,1.0,5),bm(0xe5e7eb),px,ry+.5,rz+.2);ad(new T.SphereGeometry(.3,14,12),bm(0xf472b6),px,ry+1.15,rz+.2).scale.set(1,1.15,1)}
 if(A.includes('ac_trophy')){const gd=st(0xfbbf24,0x8a5a00);ad(new T.CylinderGeometry(.3,.1,.4,12),gd,0,ry+.38,rz);ad(new T.CylinderGeometry(.05,.05,.2,8),gd,0,ry+.12,rz);ad(new T.BoxGeometry(.4,.08,.4),gd,0,ry+.04,rz);for(const x of[-1,1])ad(new T.TorusGeometry(.12,.025,6,12),gd,x*.34,ry+.42,rz)}
 if(A.includes('ac_lantern')){ad(new T.SphereGeometry(.3,14,12),st(0xef4444,0xb91c1c),0,ry+.55,rz).scale.set(1,1.15,1);for(const y of[.32,.78])ad(new T.CylinderGeometry(.14,.14,.06,10),st(0xfbbf24),0,ry+y,rz);ad(new T.CylinderGeometry(.015,.015,.3,5),bm(0xfbbf24),0,ry+.2,rz)}}
// ---- body profiles + decorations for new cars ----
window.__TP={
 wedge:[[[.5,0],[.5,.2],[.2,.46],[-.02,.86],[-.36,.86],[-.5,.5],[-.5,0]],[.14,0,-.24,-.34]],
 retro:[[[.5,0],[.5,.36],[.42,.58],[.28,.74],[.1,.86],[-.2,.86],[-.38,.72],[-.5,.46],[-.5,0]],[.22,.1,-.2,-.32]],
 tank:[[[.5,0],[.5,.6],[.46,.78],[.4,.86],[-.4,.86],[-.5,.78],[-.5,0]],[.3,.22,-.32,-.38]],
 bus:[[[.5,0],[.5,.62],[.46,.84],[.4,.86],[-.5,.86],[-.5,0]],[.4,.34,-.46,-.48]],
 monster:[[[.5,0],[.5,.58],[.45,.8],[.22,.86],[-.5,.86],[-.5,0]],[.2,.14,-.3,-.34]],
 rocket:[[[.5,0],[.5,.18],[.38,.36],[.2,.54],[-.02,.7],[-.28,.86],[-.5,.86],[-.5,0]],[.1,-.02,-.2,-.3]]};
function deco(g,c){const M=g.userData.m;if(!M)return;const {ry,rz,L,W,bt,h}=M,T=THREE,bm=x=>new T.MeshBasicMaterial({color:x}),st=(x,e)=>new T.MeshStandardMaterial({color:x,metalness:.5,roughness:.4,emissive:e||0,emissiveIntensity:e?.6:0}),
 ad=(geo,mat,x,y,z,rx,ry2,rz2)=>{const q=new T.Mesh(geo,mat);q.position.set(x,y,z);q.rotation.set(rx||0,ry2||0,rz2||0);g.add(q);return q},k=c.k,dk=st(0x111827),ch=st(0xe5e7eb);
 if(k==='tank'){ad(new T.CylinderGeometry(.6,.68,.3,18),st(0x4b5563),0,ry+.12,rz);ad(new T.CylinderGeometry(.08,.08,1.7,10),dk,0,ry+.16,rz-1.1,Math.PI/2);for(const s of[-1,1])ad(new T.BoxGeometry(.1,h*.5,L*.72),st(0x6b7280),s*(W/2+.05),bt+h*.5,0);ad(new T.BoxGeometry(.5,.05,.5),bm(0xfde047),0,ry+.3,rz+.2)}
 if(k==='bus'){for(const s of[-1,1]){for(let i=0;i<5;i++)ad(new T.BoxGeometry(.05,.34,.58),st(0x1e3a5f),s*(W/2+.03),bt+h*.78,-L*.3+i*.62);ad(new T.BoxGeometry(.05,.12,L*.9),bm(0xfacc15),s*(W/2+.03),bt+h*.4,0)}for(const x of[-1,1])ad(new T.BoxGeometry(.3,.1,.1),bm(0xfde047),x*W*.3,bt+h+.12,-L/2+.3);ad(new T.BoxGeometry(W*.9,.06,.06),bm(0xef4444),0,bt+h*.95,-L/2-.02)}
 if(k==='monster'){const y0=bt+h;for(const x of[-1,1])for(const z of[-.6,.6])ad(new T.CylinderGeometry(.05,.05,.7,8),dk,x*W*.38,y0+.3,rz+z);ad(new T.BoxGeometry(W*.8,.1,.12),bm(0xfff3b0),0,y0+.2,rz-.9);for(const s of[-1,1])for(let i=0;i<3;i++)ad(new T.ConeGeometry(.12-i*.02,.55,5),bm(i%2?0xfacc15:0xf97316),s*(W/2+.03),bt+h*.5,L*.1+i*.35,0,0,s*Math.PI/2);ad(new T.BoxGeometry(W*1.05,.14,.14),ch,0,bt+.1,-L/2-.05)}
 if(k==='retro'){const gd=st(0xfbbf24,0x7a4a00);for(const s of[-1,1]){ad(new T.SphereGeometry(.2,12,10),ch,s*W*.32,bt+h*.55,-L/2+.02);ad(new T.SphereGeometry(.12,10,8),bm(0xfff7cc),s*W*.32,bt+h*.55,-L/2-.1)}ad(new T.BoxGeometry(W*1.02,.1,.1),ch,0,bt+.12,-L/2-.06);ad(new T.BoxGeometry(W*1.02,.1,.1),ch,0,bt+.12,L/2+.06);ad(new T.BoxGeometry(W*.9,.05,.05),gd,0,bt+h*.46,-L/2-.05)}
 if(k==='wedge'){const cn=bm(0x22d3ee);ad(new T.BoxGeometry(W*1.05,.04,.5),dk,0,.12,-L/2-.1);for(const s of[-1,1]){ad(new T.BoxGeometry(.03,.05,L*.8),cn,s*(W/2+.02),bt+.08,0);ad(new T.BoxGeometry(.05,.3,.5),dk,s*W*.5,bt+h+.55,L/2-.1)}ad(new T.BoxGeometry(W*1.1,.06,.5),st(0x111827),0,bt+h+.7,L/2-.1)}
 if(k==='rocket'){const rd=bm(0xef4444);ad(new T.ConeGeometry(.5,1.2,12),rd,0,bt+h*.5,-L/2-.5,-Math.PI/2);ad(new T.BoxGeometry(.08,.8,1.1),rd,0,bt+h+.55,L*.3);for(const s of[-1,1])ad(new T.BoxGeometry(1.0,.06,.9),rd,s*(W/2+.4),bt+h*.4,L*.3,0,0,s*.25);ad(new T.ConeGeometry(.45,1.4,12),bm(0xff7a1a),0,bt+h*.5,L/2+.9,Math.PI/2);ad(new T.ConeGeometry(.25,.9,12),bm(0xffe066),0,bt+h*.5,L/2+.6,Math.PI/2)}}
// ---- motorcycle ----
function bike(c,color){const T=THREE,g=new T.Group(),body=bodyMat(color),dk=new T.MeshStandardMaterial({color:0x111827,roughness:.7}),ch=new T.MeshStandardMaterial({color:0xe5e7eb,metalness:.9,roughness:.2}),hl=new T.MeshBasicMaterial({color:0xfff7cc}),tl=new T.MeshBasicMaterial({color:0xff2d2d}),sh=new T.MeshStandardMaterial({color:0x1d4ed8,roughness:.6}),rr=.42,L=c.l,ws=[],
 RM=c.rim?new T.MeshStandardMaterial({color:c.rim,emissive:c.rim,emissiveIntensity:.5,metalness:.2,roughness:.4}):ch,
 ad=(geo,mat,x,y,z,rx,ry,rz)=>{const q=new T.Mesh(geo,mat);q.position.set(x,y,z);q.rotation.set(rx||0,ry||0,rz||0);g.add(q);return q};
 for(const z of[-1,1]){const w=new T.Mesh(new T.CylinderGeometry(rr,rr,.22,22),dk);w.add(new T.Mesh(new T.CylinderGeometry(rr*.6,rr*.6,.24,16),RM));w.rotation.z=Math.PI/2;w.position.set(0,rr,z*L*.36);g.add(w);ws.push(w)}
 ad(new T.BoxGeometry(.3,.12,L*.62),dk,0,rr+.12,0);ad(new T.BoxGeometry(.5,.38,.9),body,0,rr+.52,-.35);ad(new T.BoxGeometry(.42,.14,.8),dk,0,rr+.5,.5);ad(new T.BoxGeometry(.36,.3,.5),body,0,rr+.55,.95);ad(new T.BoxGeometry(.34,.34,.5),dk,0,rr+.22,.05);
 for(const s of[-1,1])ad(new T.CylinderGeometry(.04,.04,.95,8),ch,s*.14,rr+.5,-L*.36+.1,.3);
 ad(new T.CylinderGeometry(.035,.035,.9,8),ch,0,rr+.98,-L*.31,0,0,Math.PI/2);ad(new T.SphereGeometry(.16,10,8),hl,0,rr+.82,-L*.42);ad(new T.BoxGeometry(.22,.1,.05),tl,0,rr+.6,L*.5);ad(new T.CylinderGeometry(.07,.09,.9,10),ch,.26,rr+.18,.55,Math.PI/2);
 ad(new T.BoxGeometry(.4,.55,.28),sh,0,rr+1.05,.3,-.35);ad(new T.SphereGeometry(.27,14,12),body,0,rr+1.55,.05);ad(new T.BoxGeometry(.3,.12,.1),new T.MeshStandardMaterial({color:0x0b1630,metalness:.6,roughness:.1}),0,rr+1.55,-.17);
 for(const s of[-1,1]){ad(new T.BoxGeometry(.12,.12,.65),sh,s*.3,rr+.98,-.1);ad(new T.BoxGeometry(.14,.5,.16),dk,s*.26,rr+.42,.3,.2)}
 if(c.v==='fire'){for(let i=0;i<3;i++)ad(new T.ConeGeometry(.16-i*.03,.9-i*.2,8),new T.MeshBasicMaterial({color:i?0xffe066:0xff7a1a}),0,rr+.4,L*.5+.5+i*.05,Math.PI/2);for(const s of[-1,1])ad(new T.BoxGeometry(.03,.06,L*.55),new T.MeshBasicMaterial({color:0xf97316}),s*.22,rr+.12,0)}
 g.userData.wheels=ws;g.userData.m={ry:rr+1.9,rz:.1,L:L,W:c.w,bt:.3,h:.9};return g}
const _bcg=buildCarGroup;
buildCarGroup=function(idx,color){const c=CARS[idx]||CARS[0];if(c.k==='bike')return bike(c,color);const g=_bcg(idx,color);try{deco(g,c)}catch(e){}return g};
[
{n:'ويدج ستريم',p:5000,w:2.0,l:4.4,h:.4,cb:.36,k:'wedge',sp:1,wr:.42,cl:.28,cz:.02,rim:0x22d3ee},
{n:'دراجة سبرينت',p:5200,w:.9,l:2.6,h:.5,cb:.3,k:'bike',wr:.42,cl:.3,cz:.03,rim:0x22d3ee},
{n:'الكلاسيك الذهبي',p:5600,w:1.85,l:3.9,h:.58,cb:.55,k:'retro',wr:.4,cl:.36,cz:.04,rim:0xfbbf24},
{n:'المدرعة',p:6400,w:2.15,l:4.4,h:.8,cb:.62,k:'tank',wr:.55,y:.6,cl:.5,cz:.03,rim:0x64748b},
{n:'الحافلة السحرية',p:7000,w:2.1,l:5.2,h:1.0,cb:.9,k:'bus',wr:.46,cl:.7,cz:.05,rim:0xf472b6},
{n:'دراجة اللهب',p:7800,w:.9,l:2.7,h:.5,cb:.3,k:'bike',v:'fire',wr:.42,cl:.3,cz:.03,rim:0xf97316},
{n:'الوحش',p:8200,w:2.3,l:4.4,h:.8,cb:.62,k:'monster',wr:.78,y:1.0,cl:.8,cz:.03,rim:0x84cc16},
{n:'صاروخ نجمي',p:9500,w:1.8,l:5.4,h:.34,cb:.28,k:'rocket',sp:1,wr:.38,cl:.22,cz:.01,rim:0xff3b30}].forEach(x=>{if(!CARS.some(y=>y.n===x.n))CARS.push(x)});
// ---- letter tracing game ----
window.gTrace=function(){ac();show('gp');const A=$('ga'),H=$('gh'),ch=LET[Math.floor(Math.random()*LET.length)];A.onclick=null;
 H.innerHTML='تتبّع الحرف بإصبعك<div class="big">'+ch+'</div>';tts(ch);
 A.innerHTML='<canvas id="tc" width="300" height="300" style="position:static;width:300px;height:300px;background:#fff;border-radius:24px;touch-action:none"></canvas><div id="tm" style="min-height:24px;font:800 16px Cairo;color:#fff"></div><div class="row"><button class="btn s o" id="tr">🧽 امسح</button><button class="btn s g" id="td">✅ تم</button></div>';
 const cv=$('tc'),g=cv.getContext('2d'),mk=document.createElement('canvas'),ink=document.createElement('canvas');mk.width=mk.height=ink.width=ink.height=300;const mg=mk.getContext('2d'),ig=ink.getContext('2d');
 mg.font='800 240px Cairo,sans-serif';mg.textAlign='center';mg.textBaseline='middle';mg.fillText(ch,150,170);ig.lineWidth=24;ig.lineCap=ig.lineJoin='round';ig.strokeStyle='#22c55e';
 const draw=()=>{g.clearRect(0,0,300,300);g.globalAlpha=.22;g.drawImage(mk,0,0);g.globalAlpha=1;g.font=mg.font;g.textAlign='center';g.textBaseline='middle';g.setLineDash([8,8]);g.lineWidth=3;g.strokeStyle='#94a3b8';g.strokeText(ch,150,170);g.setLineDash([]);g.drawImage(ink,0,0)};
 let on=0,lx=0,ly=0;const pt=e=>{const r=cv.getBoundingClientRect();return[(e.clientX-r.left)*300/r.width,(e.clientY-r.top)*300/r.height]};
 cv.onpointerdown=e=>{on=1;[lx,ly]=pt(e);ig.beginPath();ig.moveTo(lx,ly);ig.lineTo(lx+.1,ly);ig.stroke();draw();try{cv.setPointerCapture(e.pointerId)}catch(x){}};
 cv.onpointermove=e=>{if(!on)return;const[x,y]=pt(e);ig.beginPath();ig.moveTo(lx,ly);ig.lineTo(x,y);ig.stroke();lx=x;ly=y;draw()};cv.onpointerup=cv.onpointercancel=()=>{on=0};
 $('tr').onclick=()=>{ig.clearRect(0,0,300,300);$('tm').textContent='';draw()};
 $('td').onclick=()=>{const a=mg.getImageData(0,0,300,300).data,b=ig.getImageData(0,0,300,300).data;let m=0,c=0,o=0,t=0;for(let i=3;i<a.length;i+=4){const mm=a[i]>40,ii=b[i]>40;if(mm){m++;if(ii)c++}if(ii){t++;if(!mm)o++}}
  const cov=m?c/m:0,out=t?o/t:1;if(cov>=.5&&out<=.45){gwin(3);fx(3);tts('ممتاز يا بطل');$('tm').textContent='🎉 ممتاز!';A.querySelector('.row').innerHTML='<button class="btn g" id="tn">حرف جديد</button>';$('tn').onclick=gTrace}else{beep(260,.2);$('tm').textContent=t<200?'ارسم فوق الحرف بإصبعك ✏️':cov<.5?'غطّي الحرف أكتر 👆':'حاول تفضل جوّه الحرف 🎯'}};
 draw()};
if(typeof GAMES_AR!=='undefined')GAMES_AR.push(['✏️','تتبّع الحروف','ارسم الحرف بإصبعك','gTrace','g']);
})();
