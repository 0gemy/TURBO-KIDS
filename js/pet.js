// Panda pet v2: levels 1-100, XP, growth, feeding, and a shop (food, glasses, hats, clothes, shoes, bags, rooms). Never sick, never dies.
(function(){
const E=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c]);
const MAXL=100,need=l=>24+5*l,scl=l=>.6+.5*Math.pow((l-1)/99,.75);
const RC=['#94a3b8','#38bdf8','#a78bfa','#facc15'],RN=['شائع','نادر','ملحمي','أسطوري'],rar=p=>p<150?0:p<500?1:p<1500?2:3;
const two=f=>f(-15)+f(15),T0='M-28 26Q0 36 28 26L28 52Q0 60-28 52Z';
const tee=c=>'<path d="'+T0+'" fill="'+c+'"/>',scarf=c=>'<path d="M-24 22Q0 34 24 22L22 32Q0 42-22 32Z" fill="'+c+'"/><rect x="12" y="30" width="8" height="18" rx="3" fill="'+c+'"/>';
const shoe=(c,x)=>'<ellipse cx="-16" cy="57" rx="12" ry="7" fill="'+c+'"/><ellipse cx="16" cy="57" rx="12" ry="7" fill="'+c+'"/><rect x="-28" y="61" width="24" height="3" rx="1.5" fill="#fff"/><rect x="4" y="61" width="24" height="3" rx="1.5" fill="#fff"/>'+(x||'');
const bag=c=>['<path d="M-14 24L-10 46M14 24L10 46" stroke="#1F2937" stroke-width="3" fill="none"/>','<rect x="-24" y="18" width="48" height="38" rx="10" fill="'+c+'"/>'];
const wing=(c,s)=>'<path d="M-26 20Q-62-4-56 40Q-42 34-26 46Z" fill="'+c+'" stroke="'+s+'" stroke-width="2"/><path d="M26 20Q62-4 56 40Q42 34 26 46Z" fill="'+c+'" stroke="'+s+'" stroke-width="2"/>';
const star=(x,y,c)=>'<polygon transform="translate('+x+','+y+')" points="0,-12 3.5,-4 12,-4 5,2 8,11 0,6 -8,11 -5,2 -12,-4 -3.5,-4" fill="'+c+'" stroke="#CA8A04" stroke-width="1.5"/>';
const H=[['bow','فيونكة',40,1,'<path d="M20-36l12-7v14zM44-36l-12-7v14z" fill="#EC4899"/><circle cx="32" cy="-36" r="4" fill="#BE185D"/>'],
['cap','قبعة حمراء',60,2,'<path d="M-30-30Q0-58 30-30Z" fill="#EF4444"/><rect x="-6" y="-34" width="42" height="6" rx="3" fill="#B91C1C"/>'],
['beanie','طاقية زرقاء',90,4,'<path d="M-30-30Q-28-54 0-54Q28-54 30-30Z" fill="#3B82F6"/><rect x="-31" y="-34" width="62" height="7" rx="3" fill="#1D4ED8"/><circle cx="0" cy="-55" r="5" fill="#fff"/>'],
['party','قبعة حفلة',120,6,'<path d="M-14-32L0-62L14-32Z" fill="#F472B6"/><circle cx="0" cy="-63" r="4" fill="#FACC15"/><path d="M-9-42l18-4M-11-36l22-3" stroke="#fff" stroke-width="2"/>'],
['flower','وردة',100,8,'<g transform="translate(26,-38)"><circle cy="-7" r="5" fill="#F9A8D4"/><circle cy="7" r="5" fill="#F9A8D4"/><circle cx="-7" r="5" fill="#F9A8D4"/><circle cx="7" r="5" fill="#F9A8D4"/><circle r="4" fill="#FACC15"/></g>'],
['chef','قبعة طباخ',200,11,'<rect x="-20" y="-42" width="40" height="12" rx="2" fill="#fff" stroke="#CBD5E1"/><circle cx="-13" cy="-47" r="10" fill="#fff" stroke="#CBD5E1"/><circle cx="0" cy="-52" r="11" fill="#fff" stroke="#CBD5E1"/><circle cx="13" cy="-47" r="10" fill="#fff" stroke="#CBD5E1"/>'],
['cowboy','قبعة كاوبوي',300,15,'<ellipse cx="0" cy="-32" rx="42" ry="6" fill="#92400E"/><path d="M-20-33Q-18-58 0-54Q18-58 20-33Z" fill="#B45309"/><rect x="-20" y="-41" width="40" height="5" fill="#78350F"/>'],
['wizard','قبعة ساحر',450,20,'<path d="M-24-32L4-74L26-32Z" fill="#6D28D9"/><ellipse cx="0" cy="-32" rx="34" ry="6" fill="#5B21B6"/><circle cx="6" cy="-52" r="3" fill="#FDE047"/>'],
['helm','خوذة سباق',600,27,'<path d="M-34-27Q-34-58 0-58Q34-58 34-27Z" fill="#EF4444"/><rect x="-34" y="-34" width="68" height="6" fill="#fff"/>'],
['crown','تاج ذهبي',1200,40,'<path d="M-14-30L-10-46L-4-36L0-48L4-36L10-46L14-30Z" fill="#FACC15" stroke="#CA8A04" stroke-width="2"/>'],
['halo','هالة',1800,55,'<ellipse cx="0" cy="-52" rx="17" ry="5" fill="none" stroke="#FDE047" stroke-width="4"/>'],
['rcrown','تاج ملكي',3000,75,'<path d="M-20-30L-18-54L-8-42L0-58L8-42L18-54L20-30Z" fill="#FACC15" stroke="#CA8A04" stroke-width="2"/><circle cx="0" cy="-36" r="3" fill="#EF4444"/><circle cx="-11" cy="-35" r="2" fill="#38BDF8"/><circle cx="11" cy="-35" r="2" fill="#22C55E"/>']];
const G=[['goggles','نظارة السباق',0,1,'<rect x="-40" y="-25" width="80" height="7" rx="3" fill="#1E3A8A"/><circle cx="-13" cy="-22" r="8" fill="#7DD3FC" stroke="#1E3A8A" stroke-width="3"/><circle cx="13" cy="-22" r="8" fill="#7DD3FC" stroke="#1E3A8A" stroke-width="3"/>'],
['round','نظارة دائرية',50,1,two(x=>'<circle cx="'+x+'" cy="3" r="11" fill="#BAE6FD66" stroke="#111827" stroke-width="3"/>')+'<path d="M-4 3h8" stroke="#111827" stroke-width="3"/>'],
['heart','نظارة قلب',100,3,two(x=>'<path transform="translate('+x+',1)" d="M0 12C-15 2-11-8 0-3C11-8 15 2 0 12Z" fill="#EC4899"/>')],
['starg','نظارة نجمة',150,7,two(x=>star(x,3,'#FACC15'))],
['sun','نظارة شمسية',200,10,'<rect x="-28" y="-5" width="25" height="17" rx="7" fill="#111827"/><rect x="3" y="-5" width="25" height="17" rx="7" fill="#111827"/><path d="M-4 3h8" stroke="#111827" stroke-width="3"/>'],
['retro','نظارة ريترو',260,14,two(x=>'<rect x="'+(x-11)+'" y="-5" width="22" height="16" rx="3" fill="#0EA5E966" stroke="#7C2D12" stroke-width="3"/>')+'<path d="M-4 3h8" stroke="#7C2D12" stroke-width="3"/>'],
['neon','نظارة نيون',400,22,'<circle cx="-15" cy="3" r="11" fill="none" stroke="#22D3EE" stroke-width="3.5"/><circle cx="15" cy="3" r="11" fill="none" stroke="#F0ABFC" stroke-width="3.5"/>'],
['gold','نظارة ذهبية',800,35,two(x=>'<circle cx="'+x+'" cy="3" r="11" fill="#FEF3C777" stroke="#FACC15" stroke-width="3.5"/>')+'<path d="M-4 3h8" stroke="#FACC15" stroke-width="3"/>'],
['rainbow','نظارة قوس قزح',1500,50,two(x=>'<circle cx="'+x+'" cy="3" r="11" fill="none" stroke="#EF4444" stroke-width="2.5"/><circle cx="'+x+'" cy="3" r="8" fill="none" stroke="#FACC15" stroke-width="2.5"/><circle cx="'+x+'" cy="3" r="5" fill="none" stroke="#22C55E" stroke-width="2.5"/>')],
['diamond','نظارة ألماس',2500,70,two(x=>'<path transform="translate('+x+',3)" d="M0-12L10 0L0 12L-10 0Z" fill="#A5F3FC" stroke="#0891B2" stroke-width="2"/>')]];
const C=[['scarf_r','وشاح أحمر',60,1,scarf('#EF4444')],['scarf_b','وشاح أزرق',60,2,scarf('#3B82F6')],['scarf_g','وشاح أخضر',60,3,scarf('#22C55E')],
['tee_r','تيشيرت أحمر',150,5,tee('#EF4444')],['tee_b','تيشيرت أزرق',150,7,tee('#3B82F6')],
['stripe','تيشيرت مخطط',180,9,tee('#fff')+'<path d="M-28 34Q0 44 28 34M-28 42Q0 52 28 42" stroke="#EF4444" stroke-width="4" fill="none"/>'],
['hood','هودي بنفسجي',300,13,tee('#8B5CF6')+'<path d="M-24 22Q0 34 24 22L20 28Q0 38-20 28Z" fill="#7C3AED"/><rect x="-12" y="42" width="24" height="9" rx="3" fill="#6D28D9"/>'],
['cape','عباءة بطل',450,18,'<path d="M-24 22Q0 34 24 22L22 28Q0 38-22 28Z" fill="#B91C1C"/><circle cx="0" cy="31" r="3" fill="#FACC15"/>','<path d="M-30 22Q-50 44-40 66L-22 54ZM30 22Q50 44 40 66L22 54Z" fill="#DC2626"/>'],
['suit','بدلة سباق',600,24,tee('#111827')+'<path d="M0 28V57" stroke="#FACC15" stroke-width="3"/><rect x="-28" y="40" width="56" height="4" fill="#EF4444"/>'],
['tux','بدلة رسمية',800,32,tee('#111827')+'<path d="M-9 28L0 52L9 28Z" fill="#fff"/><path d="M-7 29l7 4l7-4v8l-7-4l-7 4z" fill="#DC2626"/>'],
['vest','سترة خضراء',700,38,'<path d="M-26 26L-4 29L-4 55Q-18 57-28 51Z" fill="#16A34A"/><path d="M26 26L4 29L4 55Q18 57 28 51Z" fill="#16A34A"/>'],
['royal','رداء ملكي',2200,60,'<path d="M-32 24Q0 36 32 24L36 62Q0 68-36 62Z" fill="#7F1D1D"/><path d="M-30 24Q0 36 30 24L30 31Q0 43-30 31Z" fill="#fff"/><circle cx="-14" cy="33" r="1.8" fill="#111827"/><circle cx="0" cy="37" r="1.8" fill="#111827"/><circle cx="14" cy="33" r="1.8" fill="#111827"/>'],
['gold','درع ذهبي',4000,90,tee('#FACC15')+'<circle cx="0" cy="40" r="5" fill="#EF4444" stroke="#CA8A04" stroke-width="2"/>']];
const SH=[['sh_r','حذاء أحمر',60,2,shoe('#EF4444')],['sh_b','حذاء أزرق',60,3,shoe('#3B82F6')],['sh_g','حذاء أخضر',70,4,shoe('#22C55E')],['sh_y','حذاء أصفر',90,6,shoe('#FACC15')],['sh_p','حذاء وردي',90,9,shoe('#EC4899')],['sh_k','حذاء أسود',150,14,shoe('#374151')],
['sh_gold','حذاء ذهبي',900,38,shoe('#FACC15')],['sh_rk','حذاء صاروخي',1800,58,shoe('#94A3B8','<path d="M-16 64l-4 9 4-3 4 3zM16 64l-4 9 4-3 4 3z" fill="#F97316"/>')]];
const BG=[['bag_r','شنطة حمراء',70,1,bag('#EF4444')[0],bag('#EF4444')[1]],['bag_b','شنطة زرقاء',70,5,bag('#3B82F6')[0],bag('#3B82F6')[1]],
['balloon','بالونة',160,12,'<path d="M34 34Q40 8 36-26" stroke="#64748B" stroke-width="1.5" fill="none"/><ellipse cx="36" cy="-36" rx="10" ry="12" fill="#EF4444"/>'],
['wings','أجنحة',700,30,'',wing('#fff','#CBD5E1')],
['jet','جيت باك',1400,45,'','<rect x="-32" y="20" width="12" height="34" rx="6" fill="#94A3B8"/><rect x="20" y="20" width="12" height="34" rx="6" fill="#94A3B8"/><path d="M-26 54l-4 10 4-3 4 3zM26 54l-4 10 4-3 4 3z" fill="#F97316"/>'],
['wand','عصا نجمة',2000,60,'<path d="M34 44L52 22" stroke="#92400E" stroke-width="3" stroke-linecap="round"/>'+star(54,18,'#FDE047')],
['angel','أجنحة ملاك',3200,80,'<ellipse cx="0" cy="-52" rx="17" ry="5" fill="none" stroke="#FDE047" stroke-width="4"/>',wing('#fff','#FACC15')],
['dragon','أجنحة تنين',4500,95,'',wing('#16A34A','#14532D')]];
const RM=[['meadow','مرج أخضر',100,3,'linear-gradient(#7dd3fc,#86efac)'],['beach','شاطئ',200,8,'linear-gradient(#38bdf8 55%,#fde68a 56%)'],['night','ليل',350,15,'linear-gradient(#1e1b4b,#4c1d95)'],['snow','ثلج',600,28,'linear-gradient(#93c5fd,#fff)'],['candy','حلوى',1100,45,'repeating-linear-gradient(45deg,#f9a8d4 0 12px,#fbcfe8 12px 24px)'],['castle','قصر',2500,72,'linear-gradient(#6366f1,#a78bfa 60%,#fde68a)']];
const FOODS=[['bamboo','خيزران','🎋',0,25,20,1],['apple','تفاحة','🍎',20,20,20,1],['carrot','جزرة','🥕',20,20,20,1],['banana','موزة','🍌',25,22,24,3],['berry','فراولة','🍓',30,22,26,5],['cookie','بسكويت','🍪',40,28,30,8],['honey','عسل','🍯',60,35,40,12],['bao','باو','🥟',80,40,46,16],['pancake','بان كيك','🥞',100,45,52,20],['ice','آيس كريم','🍦',130,40,60,25],['cake','كيك','🍰',180,50,70,32],['pizza','بيتزا','🍕',250,55,84,40],['sushi','سوشي','🍣',350,60,100,50],['feast','وجبة كبيرة','🍱',500,80,140,65],['gbamboo','خيزران ذهبي','🎍',800,100,220,85]];
const SL={h:H,g:G,c:C,s:SH,b:BG},ALL={},FD={};
for(const k in SL)SL[k].forEach(a=>ALL[a[0]]={id:a[0],slot:k,n:a[1],p:a[2],lv:a[3],f:a[4],bk:a[5]||'',r:rar(a[2])});
RM.forEach(a=>ALL[a[0]]={id:a[0],slot:'r',n:a[1],p:a[2],lv:a[3],bg:a[4],r:rar(a[2])});
FOODS.forEach(a=>FD[a[0]]={id:a[0],n:a[1],e:a[2],p:a[3],sat:a[4],xp:a[5],lv:a[6],r:a[3]?rar(a[3]):0});
const TABS=[['f','🍽️','أكل'],['g','🕶️','نظارات'],['h','🎩','قبعات'],['c','👕','ملابس'],['s','👟','أحذية'],['b','🎒','شنط'],['r','🖼️','غرفة']];
function P(){const p=S.pet=S.pet&&typeof S.pet==='object'?S.pet:{};
 if(!p.mig){const old=p.a||[],ow=p.w||[];p.own=[];p.worn={g:'goggles'};
  if(old.includes('bow')){p.own.push('bow');if(ow.includes('bow'))p.worn.h='bow'}
  if(old.includes('crown')){p.own.push('crown');if(ow.includes('crown'))p.worn.h='crown'}
  if(old.includes('scarf')){p.own.push('scarf_r');if(ow.includes('scarf'))p.worn.c='scarf_r'}
  p.inv={bamboo:Math.max(0,+p.b||0)};p.lv=1;p.xp=0;p.mig=1;delete p.a;delete p.w;delete p.b}
 if(p.n==null)p.n='باندا';if(p.f==null)p.f=70;if(!p.t)p.t=Date.now();p.own=p.own||[];p.inv=p.inv||{};p.worn=p.worn||{g:'goggles'};p.lv=p.lv||1;p.xp=p.xp||0;return p}
const full=()=>{const p=P();return Math.round(Math.max(15,Math.min(100,p.f-(Date.now()-p.t)/72e4)))};
const night=()=>{const h=new Date().getHours();return h>=22||h<6};
const mood=()=>night()?'sleepy':full()<40?'hungry':'happy';
function svg(m,w,cls){const p=P(),L=p.lv,wr=(w&&!Array.isArray(w))?w:p.worn,s=scl(L),it=k=>wr[k]&&ALL[wr[k]]?ALL[wr[k]]:null,f=k=>it(k)?it(k).f:'',bk=k=>it(k)?it(k).bk:'',ln=L>=100?'#FACC15':'#1F2937';
 const EY={happy:'<circle cx="-15" cy="2" r="4.5" fill="#fff"/><circle cx="15" cy="2" r="4.5" fill="#fff"/><circle cx="-14.5" cy="2.5" r="2.4" fill="#1F2937"/><circle cx="15.5" cy="2.5" r="2.4" fill="#1F2937"/><path d="M-7 18Q0 25 7 18" fill="none" stroke="#1F2937" stroke-width="2" stroke-linecap="round"/>',
 hungry:'<circle cx="-15" cy="2" r="5.5" fill="#fff"/><circle cx="15" cy="2" r="5.5" fill="#fff"/><circle cx="-14.5" cy="3" r="3" fill="#1F2937"/><circle cx="15.5" cy="3" r="3" fill="#1F2937"/><ellipse cx="0" cy="22" rx="5" ry="4.5" fill="#7C2D12"/><rect x="42" y="-26" width="9" height="40" rx="3" fill="#4ADE80" stroke="#15803D" stroke-width="2"/>',
 sleepy:'<path d="M-21 3Q-15 9 -9 3M9 3Q15 9 21 3" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/><path d="M-4 19Q0 22 4 19" fill="none" stroke="#1F2937" stroke-width="2" stroke-linecap="round"/><text x="40" y="-30" font-size="16" font-weight="800" fill="#1E3A8A">Z</text>'}[m]||'';
 return '<svg class="pet-svg '+(cls||'')+'" viewBox="-58 -56 116 132" role="img" aria-label="باندا">'+(L>=50?'<ellipse cx="0" cy="12" rx="56" ry="60" fill="#FDE68A" opacity=".35"/>':'')+'<g transform="translate(0,62) scale('+s.toFixed(3)+') translate(0,-62)">'+bk('b')+bk('c')
 +'<ellipse cx="-30" cy="36" rx="9" ry="14" fill="#1F2937"/><ellipse cx="30" cy="36" rx="9" ry="14" fill="#1F2937"/><ellipse cx="-16" cy="56" rx="11" ry="7" fill="#1F2937"/><ellipse cx="16" cy="56" rx="11" ry="7" fill="#1F2937"/>'
 +'<ellipse cx="0" cy="38" rx="28" ry="22" fill="#fff" stroke="'+ln+'" stroke-width="2"/>'+f('s')+'<circle cx="-28" cy="-28" r="12" fill="#1F2937"/><circle cx="28" cy="-28" r="12" fill="#1F2937"/><ellipse cx="0" cy="0" rx="40" ry="34" fill="#fff" stroke="'+ln+'" stroke-width="'+(L>=100?3:2)+'"/>'+f('c')
 +'<ellipse cx="-15" cy="3" rx="10" ry="13" transform="rotate(20 -15 3)" fill="#1F2937"/><ellipse cx="15" cy="3" rx="10" ry="13" transform="rotate(-20 15 3)" fill="#1F2937"/>'+EY+'<circle cx="-27" cy="15" r="5" fill="#FBCFE8"/><circle cx="27" cy="15" r="5" fill="#FBCFE8"/><ellipse cx="0" cy="13" rx="5" ry="3.5" fill="#1F2937"/>'
 +f('g')+f('h')+f('b')+(L>=10?'<path d="M-48-6l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#FDE047"/>':'')+(L>=75?'<path d="M48 30l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#FDE047"/>':'')+'</g></svg>'}
const prev=x=>x.slot==='r'?'<span class="pc-room" style="background:'+x.bg+'"></span>':svg('happy',Object.assign({},P().worn,{[x.slot]:x.id}),'sm');
const nu=()=>{const p=P();let b=null;for(const x of Object.values(ALL).concat(Object.values(FD)))if(x.lv>p.lv&&(!b||x.lv<b.lv))b=x;return b?' · القادم: '+(b.e||'🎁')+' '+b.n+' (مستوى '+b.lv+')':''};
window.petXp=function(n){const p=P();if(p.lv>=MAXL)return 0;p.xp+=n;let up=0;while(p.lv<MAXL&&p.xp>=need(p.lv)){p.xp-=need(p.lv);p.lv++;up++}if(p.lv>=MAXL)p.xp=0;
 if(up){ck='';try{sv();cel('🎉 الباندا وصلت مستوى '+p.lv+'!'+nu(),3000,0)}catch(e){}}return up};
window.petFood=n=>{const p=P();p.inv.bamboo=Math.min(999,(p.inv.bamboo||0)+n);petXp(4)};
window.petLevel=()=>P().lv;
window.petPool=(a,b)=>{const p=P(),o=[];for(const x of Object.values(ALL))if(x.p>0&&x.lv<=p.lv&&x.r>=a&&x.r<=b&&!p.own.includes(x.id))o.push(x);for(const x of Object.values(FD))if(x.p>0&&x.lv<=p.lv&&x.r>=a&&x.r<=b)o.push(Object.assign({food:1},x));return o};
window.petGrant=(x,q)=>{const p=P();if(x.food){p.inv[x.id]=(p.inv[x.id]||0)+(q||1)}else{if(!p.own.includes(x.id))p.own.push(x.id);if(x.slot==='r'){if(!p.room)p.room=x.id}else if(!p.worn[x.slot])p.worn[x.slot]=x.id}ck=''};
window.petSvg=(m,w)=>svg(m,w);window.petMood=mood;window.PETCAT={all:ALL,foods:FD,rc:RC,rn:RN};
let ck='';
const say=m=>({happy:'يلا نتسابق! 🏁',hungry:'جعانة! أطعمني 🎋',sleepy:'زززز... نعسانة 😴'})[m];
function home(){const e=document.getElementById('petHome');if(!e)return;const p=P(),m=mood(),k=m+JSON.stringify(p.worn)+p.lv;if(k===ck)return;ck=k;e.innerHTML=svg(m)+'<div class="pet-bub">'+E(p.n)+' · مستوى '+p.lv+'<br>'+say(m)+'</div>'}
window.openPet=function(tab){const o=modal('<div id="pT" class="pet-tabs"></div><div id="pB"></div><div class="mdl-m" id="pM"></div><button class="btn s" data-x>إغلاق</button>'),T=o.querySelector('#pT'),B=o.querySelector('#pB'),M=o.querySelector('#pM');let view='m';
 const msg=t=>{M.textContent=t||''};
 const pct=()=>{const p=P();return p.lv>=MAXL?100:Math.round(p.xp/need(p.lv)*100)};
 function top(big){const p=P(),rm=p.room&&ALL[p.room]?ALL[p.room].bg:'linear-gradient(#bfdbfe,#e0f2fe)';return '<div class="pet-room" style="background:'+rm+'"><div class="'+(big?'pet-big':'pet-mini')+'">'+svg(mood())+'</div></div><b class="mdl-t">'+E(p.n)+' · مستوى '+p.lv+(p.lv>=MAXL?' 👑':'')+'</b><div class="pet-bar xp"><i style="width:'+pct()+'%"></i></div><small>XP '+(p.lv>=MAXL?'مكتمل':p.xp+'/'+need(p.lv))+' · الشبع '+full()+'% · 💎 '+S.coins+'</small><div class="pet-bar"><i style="width:'+full()+'%"></i></div>'}
 function main(){const p=P();return top(1)+'<div class="pet-row"><button class="btn g" data-t="f">🍽️ أطعم</button><button class="btn o" data-play>⚽ العب</button><button class="btn p" data-rn>✏️ الاسم</button></div><small>الخيزران 🎋 '+(p.inv.bamboo||0)+' (من الإجابات الصحيحة)'+nu()+'</small>'}
 function card(x,food){const p=P(),lock=x.lv>p.lv,own=food?0:p.own.includes(x.id),on=!food&&(x.slot==='r'?p.room===x.id:p.worn[x.slot]===x.id),n=food?(p.inv[x.id]||0):0;let b='';
  if(lock)b='<button class="btn s" disabled>🔒 مستوى '+x.lv+'</button>';
  else if(food){b=(x.p?'<button class="btn o" data-by="'+x.id+'">💎 '+x.p+'</button>':'<small>من الإجابات</small>')+(n?'<button class="btn g" data-fd="'+x.id+'">أطعم</button>':'')}
  else if(!own&&x.p>0)b='<button class="btn o" data-by="'+x.id+'">💎 '+x.p+'</button>';
  else b='<button class="btn '+(on?'p':'g')+'" data-wr="'+x.id+'">'+(on?'✓ لابسها':'إلباس')+'</button>';
  return '<div class="pet-card'+(on?' on':'')+'" style="border-color:'+RC[x.r||0]+'"><div class="pc-pv">'+(food?x.e:prev(x))+'</div><b>'+E(x.n)+'</b><small>'+(food?'شبع +'+x.sat+' · XP +'+x.xp+'<br>عندك: '+n:RN[x.r])+'</small>'+b+'</div>'}
 function shop(k){const list=k==='f'?Object.values(FD):Object.values(ALL).filter(x=>x.slot===k);return top(0)+'<div class="pet-grid">'+list.sort((a,b)=>a.lv-b.lv).map(x=>card(x,k==='f')).join('')+'</div>'}
 function render(v,hop){view=v||view;T.innerHTML=[['m','🐼','الباندا']].concat(TABS).map(t=>'<button data-t="'+t[0]+'" class="'+(t[0]===view?'on':'')+'"><span>'+t[1]+'</span>'+t[2]+'</button>').join('');B.innerHTML=view==='m'?main():shop(view);if(hop){const e=B.querySelector('.pet-big,.pet-mini');if(e){e.classList.add('pet-hop')}}home()}
 function fly(em){const e=B.querySelector('.pet-big,.pet-mini');if(!e)return;const s=document.createElement('span');s.className='pet-fl';s.textContent=em;e.appendChild(s);setTimeout(()=>s.remove(),1300)}
 function buy(id){const food=!!FD[id],x=food?FD[id]:ALL[id],p=P();askBuy({n:x.n,p:x.p,pv:food?x.e:prev(x)},()=>{S.coins-=x.p;if(food)p.inv[id]=(p.inv[id]||0)+1;else{p.own.push(id);if(x.slot==='r')p.room=id;else p.worn[x.slot]=id}sv();hud();ck='';render();msg('✅ تم شراء '+x.n)})}
 B.onclick=ev=>{const p=P(),g=a=>ev.target.closest('['+a+']');let e;
  if(e=g('data-t'))render(e.dataset.t);
  else if(e=g('data-by'))buy(e.dataset.by);
  else if(e=g('data-wr')){const x=ALL[e.dataset.wr];if(x.slot==='r')p.room=p.room===x.id?'':x.id;else if(p.worn[x.slot]===x.id){if(x.slot==='g')p.worn.g='goggles';else delete p.worn[x.slot]}else p.worn[x.slot]=x.id;sv();ck='';render()}
  else if(e=g('data-fd')){const x=FD[e.dataset.fd];if(full()>85){msg('شبعانة! جرّب بعد شوية 😋');return}if(!(p.inv[x.id]>0))return;p.inv[x.id]--;p.f=Math.min(100,full()+x.sat);p.t=Date.now();sv();render(view,1);fly(x.e);const up=petXp(x.xp);sv();setTimeout(()=>{if(up)render()},50);msg('😋 نمنم! XP +'+x.xp)}
  else if(g('data-play')){const w=(p.pl||0)+9e5-Date.now();if(w>0){msg('تعبانة شوية، تعالى بعد '+Math.ceil(w/6e4)+' دقيقة ⏳');return}p.pl=Date.now();petXp(10);sv();render('m',1);fly('⚽');msg('ممتع! XP +10')}
  else if(g('data-rn')){const n=prompt('اسم الباندا:',p.n);if(n&&n.trim()){p.n=n.trim().slice(0,12);sv();ck='';render()}}};
 T.onclick=ev=>{const b=ev.target.closest('[data-t]');if(b)render(b.dataset.t)};
 render(typeof tab==='string'&&tab?tab:'m')};
const _h=hud;hud=function(){_h();home()};
home();setInterval(home,6e4);
})();
