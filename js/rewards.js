// Purchase confirmation, daily lucky wheel, loot boxes, lobby (home screen) themes, extra mini-games.
(function(){
const E=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c]),$$=i=>document.getElementById(i);
const today=()=>new Date().toLocaleDateString('en-CA'),clockOk=t=>Date.now()>=(+t||0)-6e4,ri=a=>a[0]+Math.floor(Math.random()*(a[1]-a[0]+1));
const closeAll=()=>document.querySelectorAll('.mdl').forEach(m=>m.parentNode&&m.parentNode.remove());
// ---------- unified purchase confirmation ----------
let lk=0;
window.askBuy=function(x,ok){if(!(x.p>0))return ok();if(lk)return;lk=1;setTimeout(()=>lk=0,500);
 const bal=S.coins|0,left=bal-x.p,can=left>=0;
 const o=modal('<div class="cf-pv">'+(x.pv||x.ico||'🛍️')+'</div><b class="mdl-t">تأكيد الشراء</b><p class="cf-q">هل أنت متأكد إنك هتشتري <b>'+E(x.n)+'</b> بـ <b>'+x.p+' 💎</b>؟</p><div class="cf-bal"><span>رصيدك<b>'+bal+' 💎</b></span><span>هيتبقى لك<b class="'+(can?'':'neg')+'">'+(can?left+' 💎':'ناقصك '+(-left)+' 💎')+'</b></span></div>'+(can?'<button class="btn g" data-ok>✅ تأكيد الشراء</button>':'<button class="btn" disabled>💎 رصيدك مش كفاية</button><button class="btn p" data-earn>🏁 اكسب عملات</button>')+'<button class="btn s" data-x>إلغاء</button>');
 o.style.zIndex=100;
 o.addEventListener('click',e=>{if(e.target.closest('[data-ok]')){o.remove();if(S.coins>=x.p)ok()}else if(e.target.closest('[data-earn]')){closeAll();go('map')}})};
// ---------- lobby themes ----------
const LB=[['space','فضاء',800,'radial-gradient(1.5px 1.5px at 15% 20%,#fff,transparent),radial-gradient(1.5px 1.5px at 70% 35%,#fff,transparent),radial-gradient(2px 2px at 40% 70%,#fde68a,transparent),radial-gradient(1px 1px at 85% 80%,#fff,transparent),linear-gradient(160deg,#0b0b2e,#2a1457)'],
['forest','غابة',900,'radial-gradient(ellipse at 50% 100%,#14532d,transparent 60%),linear-gradient(180deg,#134e4a,#166534)'],
['beach','شاطئ',1000,'linear-gradient(180deg,#0369a1,#0ea5e9 55%,#d6a64a 56%,#a16207)'],
['city','مدينة ليلية',1200,'repeating-linear-gradient(90deg,#0f172a 0 18px,#1e293b 18px 34px) bottom/100% 20% no-repeat,linear-gradient(180deg,#1e1b4b,#4c1d95 60%,#be185d)'],
['snow','ثلج',1500,'radial-gradient(3px 3px at 20% 25%,#fff,transparent),radial-gradient(3px 3px at 60% 15%,#fff,transparent),radial-gradient(2px 2px at 80% 60%,#fff,transparent),linear-gradient(180deg,#1e3a8a,#3b82f6 60%,#93c5fd)'],
['candy','حلوى',1800,'linear-gradient(rgba(60,0,60,.45),rgba(60,0,60,.45)),repeating-linear-gradient(45deg,#ec4899 0 24px,#f472b6 24px 48px)'],
['desert','صحراء',2200,'radial-gradient(circle at 75% 20%,#fde047 0 8%,transparent 9%),linear-gradient(180deg,#7c2d12,#c2410c 55%,#d97706)'],
['ocean','تحت الماء',2600,'radial-gradient(circle at 20% 30%,#ffffff22 0 3%,transparent 4%),radial-gradient(circle at 65% 55%,#ffffff22 0 2%,transparent 3%),linear-gradient(180deg,#0c4a6e,#0e7490 60%,#064e3b)'],
['neon','نيون',3000,'linear-gradient(rgba(34,211,238,.18) 1px,transparent 1px) 0 0/100% 32px,linear-gradient(90deg,rgba(236,72,153,.18) 1px,transparent 1px) 0 0/32px 100%,linear-gradient(160deg,#050014,#1e0a3c)'],
['rainbow','قوس قزح',3500,'linear-gradient(rgba(10,20,50,.55),rgba(10,20,50,.55)),linear-gradient(160deg,#ef4444,#f59e0b,#eab308,#22c55e,#3b82f6,#8b5cf6)'],
['castle','قصر ملكي',4200,'radial-gradient(ellipse at 50% 0,#fde68a55,transparent 55%),linear-gradient(180deg,#312e81,#4c1d95 60%,#7f1d1d)'],
['galaxy','مجرة ذهبية',5000,'radial-gradient(2px 2px at 20% 20%,#fde047,transparent),radial-gradient(2px 2px at 75% 30%,#fff,transparent),radial-gradient(1.5px 1.5px at 50% 65%,#fde047,transparent),radial-gradient(ellipse at 50% 50%,#facc1544,transparent 60%),linear-gradient(160deg,#020617,#3b0764 55%,#713f12)'],
['autumn','خريف',1100,'radial-gradient(circle at 80% 15%,#fbbf2455 0 10%,transparent 11%),linear-gradient(180deg,#5b2a0b,#9a3412 60%,#78350f)'],
['sunset2','غروب',1000,'linear-gradient(180deg,#312e81,#be185d 50%,#f97316 85%)'],
['storm','عاصفة',1400,'repeating-linear-gradient(105deg,rgba(255,255,255,.07) 0 2px,transparent 2px 22px),linear-gradient(180deg,#0f172a,#334155 55%,#1e293b)'],
['toy','غرفة الألعاب',2000,'radial-gradient(circle,#ffffff33 0 3px,transparent 4px) 0 0/36px 36px,linear-gradient(160deg,#1d4ed8,#7c3aed)'],
['lava','بركان',2400,'radial-gradient(ellipse at 50% 110%,#f97316,transparent 55%),linear-gradient(180deg,#1c0a05,#7f1d1d)'],
['aurora','شفق قطبي',2800,'linear-gradient(120deg,transparent 20%,rgba(52,211,153,.35) 40%,rgba(129,140,248,.35) 60%,transparent 80%),linear-gradient(180deg,#020617,#0f172a 60%,#0c4a6e)'],
['pyramids','أهرامات',3800,'linear-gradient(135deg,transparent 60%,#a16207 60.5% 100%) 20% 100%/40% 35% no-repeat,linear-gradient(225deg,transparent 60%,#ca8a04 60.5% 100%) 70% 100%/50% 45% no-repeat,linear-gradient(180deg,#7c2d12,#ea580c 60%,#fde68a)'],
['dream','أحلام',4500,'radial-gradient(circle at 30% 20%,#f0abfc66 0 12%,transparent 13%),radial-gradient(circle at 75% 70%,#67e8f966 0 14%,transparent 15%),linear-gradient(160deg,#4c1d95,#be185d)'],
['platinum','بلاتيني',5000,'linear-gradient(135deg,#0f172a,#475569 30%,#e2e8f0 50%,#475569 70%,#0f172a)']];
const st=document.createElement('style');st.textContent=LB.map(l=>'#home.on[data-lb="'+l[0]+'"]{background:'+l[3]+'!important}').join('');document.head.appendChild(st);
const applyLb=()=>{const h=$$('home');if(h)h.dataset.lb=S.lb||''};
function lobby(){const o=modal('<b class="mdl-t">🏠 ثيمات الصفحة الرئيسية</b><div id="lbG" class="lb-grid"></div><div class="mdl-m" id="lbM"></div><button class="btn s" data-x>إغلاق</button>'),G=o.querySelector('#lbG');
 const draw=()=>{S.ownL=S.ownL||[];G.innerHTML=[['',' الأصلي',0,'linear-gradient(160deg,#05122488,#0c2744)']].concat(LB).map(l=>{const own=!l[2]||S.ownL.includes(l[0]),on=(S.lb||'')===l[0];return '<div class="lb-card'+(on?' on':'')+'"><div class="lb-pv" style="background:'+l[3]+'"></div><b>'+l[1].trim()+'</b>'+(own?'<button class="btn '+(on?'p':'g')+'" data-u="'+l[0]+'">'+(on?'✓ مفعّل':'تفعيل')+'</button>':'<button class="btn o" data-b="'+l[0]+'">💎 '+l[2]+'</button>')+'</div>'}).join('')};
 G.onclick=e=>{const u=e.target.closest('[data-u]'),b=e.target.closest('[data-b]');if(u){S.lb=u.dataset.u;sv();applyLb();draw()}
  else if(b){const l=LB.find(x=>x[0]===b.dataset.b);askBuy({n:'ثيم '+l[1],p:l[2],pv:'<div class="lb-pv big" style="background:'+l[3]+'"></div>'},()=>{S.coins-=l[2];S.ownL.push(l[0]);S.lb=l[0];sv();hud();applyLb();draw()})}};draw()}
// ---------- daily lucky wheel ----------
const WP=[['50💎','c',50,30],['100💎','c',100,25],['200💎','c',200,15],['500💎','c',500,5],['1000💎','c',1000,2],['10000💎','c',1e4,.2],['40 XP','x',40,12],['100 XP','x',100,6],['🍯 عسل','f','honey',4.8]],WC=['#38bdf8','#34d399','#fbbf24','#fb923c','#a78bfa','#facc15','#60a5fa','#f472b6','#f87171'];
const wOk=()=>{const w=S.wheel||{};return w.d!==today()&&clockOk(w.ts)},bOk=()=>{const b=S.bx||{};return b.d!==today()&&clockOk(b.ts)};
function wheel(){const n=WP.length,a=360/n,pt=d=>[(100*Math.sin(d*Math.PI/180)).toFixed(1),(-100*Math.cos(d*Math.PI/180)).toFixed(1)];
 const w=WP.map((p,i)=>{const [x1,y1]=pt(i*a),[x2,y2]=pt((i+1)*a);return '<path d="M0 0L'+x1+' '+y1+'A100 100 0 0 1 '+x2+' '+y2+'Z" fill="'+WC[i]+'" stroke="#fff" stroke-width="2"/><text transform="rotate('+((i+.5)*a)+') translate(0,-64)" text-anchor="middle" font-size="13" font-weight="800" fill="#0c2748">'+p[0]+'</text>'}).join('');
 const o=modal('<b class="mdl-t">🎡 عجلة الحظ اليومية</b><div class="wh"><div class="wh-p">▼</div><svg viewBox="-104 -104 208 208"><g id="wG">'+w+'</g><circle r="13" fill="#fff" stroke="#0c2748" stroke-width="3"/></svg></div><small>أعلى جائزة: 10000 💎 (نادرة جدًا!)</small><div id="wM" class="mdl-m"></div><button class="btn g" id="wS">'+(wOk()?'🎡 لفّ العجلة':'تعالى بكرة 🌙')+'</button><button class="btn s" data-x>إغلاق</button>'),M=o.querySelector('#wM'),B=o.querySelector('#wS');
 B.onclick=()=>{if(!wOk()){M.textContent=clockOk((S.wheel||{}).ts)?'استخدمت لفتك النهاردة، تعالى بكرة 🌙':'ساعة الجهاز غير صحيحة';return}
  let r=Math.random()*100,i=0;for(;i<n-1;i++){r-=WP[i][3];if(r<0)break}const p=WP[i];
  S.wheel={d:today(),ts:Date.now()};B.disabled=true;B.textContent='...';
  if(p[1]==='c')S.coins+=p[2];else if(p[1]==='x')petXp(p[2]);else petGrant(PETCAT.foods[p[2]],1);sv();hud();dots();
  const g=o.querySelector('#wG');g.style.transition='transform 4s cubic-bezier(.12,.7,.1,1)';void g.getBoundingClientRect();g.style.transform='rotate('+(360*5+360-(i+.5)*a)+'deg)';
  setTimeout(()=>{M.innerHTML='🎉 كسبت <b>'+p[0]+'</b>!';B.textContent='تعالى بكرة 🌙'},4200)}}
// ---------- loot boxes ----------
const BX=[{id:'b',n:'برونزي',ico:'🥉',p:100,c:[20,150],x:[20,80],ic:.35,a:0,z:1},{id:'s',n:'فضي',ico:'🥈',p:300,c:[80,420],x:[80,240],ic:.5,a:0,z:2},{id:'g',n:'ذهبي',ico:'🥇',p:800,c:[250,1200],x:[200,600],ic:1,a:1,z:3},{id:'d',n:'ماسي',ico:'💎',p:2000,c:[600,3000],x:[600,1600],ic:1,a:2,z:3}],RT=['شائع','نادر','ملحمي','أسطوري'];
function boxes(){const o=modal('<b class="mdl-t">🎁 الصناديق</b><div id="bxG" class="bx-grid"></div><div class="mdl-m" id="bxM"></div><button class="btn s" data-x>إغلاق</button>'),G=o.querySelector('#bxG');
 const draw=()=>{G.innerHTML=BX.map(b=>{const free=b.id==='b'&&bOk();return '<div class="bx-card"><div class="bx-i">'+b.ico+'</div><b>صندوق '+b.n+'</b><small>🪙 '+b.c[0]+'–'+b.c[1]+' · ⭐ '+b.x[0]+'–'+b.x[1]+' XP<br>🎁 عنصر للباندا: '+Math.round(b.ic*100)+'% ('+RT[b.a]+'–'+RT[b.z]+')</small><button class="btn '+(free?'g':'o')+'" data-o="'+b.id+'">'+(free?'🎁 أول فتح مجاني':'💎 '+b.p)+'</button></div>'}).join('')};
 function open(b){const p=petPool(b.a,b.z);let it=null,q=1,coins=ri(b.c);const xp=ri(b.x);if(Math.random()<b.ic){if(p.length){it=p[Math.floor(Math.random()*p.length)];if(it.food)q=ri([1,3])}else coins=Math.round(coins*1.5)}
  S.coins+=coins;petXp(xp);if(it)petGrant(it,q);sv();hud();dots();
  o.querySelector('.mdl').innerHTML='<div class="bx-i big shake2">'+b.ico+'</div><b class="mdl-t">بيفتح...</b>';
  setTimeout(()=>{o.querySelector('.mdl').innerHTML='<b class="mdl-t">🎉 صندوق '+b.n+'</b><div class="bx-rw"><div>🪙 +'+coins+' عملة</div><div>⭐ +'+xp+' XP</div>'+(it?'<div style="color:'+PETCAT.rc[it.r||0]+'">'+(it.food?it.e+' '+it.n+' ×'+q:'🎁 '+it.n+' ('+RT[it.r]+')')+'</div>':'')+'</div><button class="btn g" id="bxA">فتح صندوق تاني</button><button class="btn s" data-x>تمام</button>';o.querySelector('#bxA').onclick=()=>{closeAll();boxes()}},1100)}
 G.onclick=e=>{const k=e.target.closest('[data-o]');if(!k)return;const b=BX.find(x=>x.id===k.dataset.o);
  if(b.id==='b'&&bOk()){S.bx={d:today(),ts:Date.now()};return open(b)}
  askBuy({n:'صندوق '+b.n,p:b.p,pv:'<span class="bx-i">'+b.ico+'</span>'},()=>{S.coins-=b.p;open(b)})};draw()}
// ---------- home row + shop button + indicators ----------
function dots(){const r=$$('rwRow');if(!r)return;const d=(k,v)=>{const e=r.querySelector('[data-r="'+k+'"] i');if(e)e.style.display=v?'block':'none'};d('w',wOk());d('b',bOk())}
(function init(){const h=$$('home'),st=h&&h.querySelector('.home-stats');if(st){const r=document.createElement('div');r.id='rwRow';r.className='row rw-row';r.innerHTML='<button class="btn s p" data-r="w">🎡 العجلة<i></i></button><button class="btn s o" data-r="b">🎁 الصناديق<i></i></button><button class="btn s p" data-r="s">🛍️ شوب الباندا</button><button class="btn s o" data-r="l">🏠 الثيمات</button>';st.before(r);
 r.onclick=e=>{const b=e.target.closest('[data-r]');if(!b)return;({w:wheel,b:boxes,s:()=>openPet('f'),l:lobby})[b.dataset.r]()}}
 const si=$$('shopInfo');if(si){const b=document.createElement('button');b.className='btn p';b.textContent='🏠 ثيمات الصفحة الرئيسية';b.onclick=lobby;si.after(b)}
 const _h=hud;hud=function(){_h();dots()};applyLb();dots()})();
// ---------- extra mini-games ----------
const sh=a=>typeof shuf==='function'?shuf(a):a.sort(()=>Math.random()-.5),rn2=n=>Math.floor(Math.random()*n);
const opt3=(arr,a,g)=>{const o=[a];while(o.length<3){const x=arr[rn2(arr.length)];if(!o.includes(x))o.push(x)}const s=sh(o);return[s.map(g),s.indexOf(a)]};
const ANI=[['🐘','فيل'],['🦁','أسد'],['🐒','قرد'],['🐢','سلحفاة'],['🐪','جمل'],['🐑','خروف'],['🐔','دجاجة'],['🐴','حصان'],['🐟','سمكة'],['🦒','زرافة'],['🐯','نمر'],['🐰','أرنب']],
CL=[['أحمر','#ef4444'],['أزرق','#3b82f6'],['أخضر','#22c55e'],['أصفر','#facc15'],['برتقالي','#fb923c'],['بنفسجي','#8b5cf6'],['وردي','#ec4899'],['أسود','#111827'],['بني','#92400e']],
SP=[['⚫','دائرة'],['🟦','مربع'],['🔺','مثلث'],['⭐','نجمة'],['❤️','قلب'],['🔶','معين']],EM=['🍎','⭐','🚗','🐟','🎈','🍌'];
window.gAnimal=()=>quiz({lang:'ar',again:gAnimal,gen:()=>{const a=ANI[rn2(ANI.length)],[o,ok]=opt3(ANI,a,x=>x[1]);return{head:'<div class="big">'+a[0]+'</div><small>إيه اسم الحيوان ده؟</small>',say:a[1],opts:o,ok}}});
window.gColor=()=>quiz({lang:'ar',again:gColor,gen:()=>{const a=CL[rn2(CL.length)],[o,ok]=opt3(CL,a,x=>x[0]);return{head:'<div class="swatch" style="background:'+a[1]+'"></div><small>إيه اسم اللون ده؟</small>',opts:o,ok}}});
window.gShape=()=>quiz({lang:'ar',again:gShape,gen:()=>{const a=SP[rn2(SP.length)],[o,ok]=opt3(SP,a,x=>x[1]);return{head:'<div class="big">'+a[0]+'</div><small>إيه اسم الشكل ده؟</small>',say:a[1],opts:o,ok}}});
window.gCount=()=>quiz({lang:'ar',again:gCount,gen:()=>{const n=1+rn2(9),e=EM[rn2(EM.length)],s=new Set([n]);while(s.size<3)s.add(1+rn2(9));const o=sh([...s]);return{head:'<div class="cnt">'+e.repeat(n)+'</div><small>كم عددهم؟</small>',opts:o.map(String),ok:o.indexOf(n),cls:'letters'}}});
if(typeof GAMES_AR!=='undefined')GAMES_AR.push(['🍎','عدّ الأشياء','كم عددهم؟','gCount','o'],['🎨','تعرّف على اللون','اختر اسم اللون','gColor','g'],['🐘','حيوانات','اختر اسم الحيوان','gAnimal','p'],['🔺','الأشكال','اختر اسم الشكل','gShape','o']);
})();
