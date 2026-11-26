// Settings cleanup + achievements redesign + home account chip. Additive: wraps tg() and rprog(), does not touch audio.
(function(){
const $$=id=>document.getElementById(id);
function applyRM(){document.documentElement.classList.toggle('rm',!!S.rm)}
try{applyRM()}catch(e){}
function mk(tag,cls,html){const e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e}
const E=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c]);
// ---------- settings ----------
const _tg=tg;
tg=function(){_tg();const set=$$('set');if(!set)return;
 ['s3','s4','s9','s8'].forEach(i=>{const e=$$(i);if(e)e.style.display='none'}); // mute-all (volume slider covers it), speech test (voices are recorded now), old duplicate quality button, play-time limit (removed by owner request)
 let up=$$('s14');if(!up){up=mk('button','btn');up.id='s14';up.textContent='🔄 تحديث اللعبة لآخر نسخة';up.onclick=async()=>{up.textContent='جاري التحديث...';try{const r=await navigator.serviceWorker?.getRegistrations();if(r)for(const x of r)await x.unregister();const k=await caches.keys();for(const n of k)await caches.delete(n)}catch(e){}location.reload()};}
 const mine=[...set.querySelectorAll('button')].find(b=>/openAccount/.test(b.getAttribute('onclick')||''));
 if(mine)mine.style.display='none'; // "حسابي وحفظ التقدم" removed; the account lives in the home-screen account chip now
 if(!set.querySelector('.st-sec')){
  const back=[...set.children].find(c=>c.classList&&c.classList.contains('s')&&c.tagName==='BUTTON');
  const tools=[...set.querySelectorAll('button')].filter(b=>/openReport|openCode/.test(b.getAttribute('onclick')||''));
  const anchor=back||null;const ins=(t,els)=>{const s=mk('div','st-sec','<h3>'+t+'</h3>');els.forEach(e=>e&&s.appendChild(e));set.insertBefore(s,anchor);};
  ins('🔊 الصوت',[$$('s5'),$$('s2'),$$('s1'),$$('volumeBox')]);
  ins('🎮 اللعب',[$$('s10'),$$('s11'),$$('s12')]);
  ins('👤 اللاعب',[$$('s6'),$$('s7')]);
  ins('🧰 أدوات',tools.concat([up]));
  if(back)back.classList.add('st-back');
 }
 const m=$$('s3');if(m&&m.parentNode===set)set.appendChild(m);
};
// ---------- home account chip + panel ----------
function accG(){try{return JSON.parse(localStorage.getItem('tk_g')||'null')}catch(e){return null}}
function accAv(cls){return S.avatarImage?'<img class="'+cls+'" src="'+S.avatarImage+'" alt="">':'<span class="'+cls+'">'+(S.avatar||S.av||'🦊')+'</span>'}
function paintAcc(){const top=document.querySelector('#home .hm-top');if(!top)return;
 let b=$$('hmAcc');if(!b){b=mk('button','hm-acc');b.id='hmAcc';b.type='button';b.setAttribute('aria-label','حسابي');b.title='حسابي';b.onclick=openAcc;top.appendChild(b)}
 b.innerHTML=accAv('hm-acc-av')+(accG()?'<i class="hm-acc-on"></i>':'');
}
const GICON='<svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.5-4.1 7-10.2 7-17.6z"/><path fill="#FBBC05" d="M10.5 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7l-7.9-6.1A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.8l7.9 6.1z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.3 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9-6.1C6.5 42.6 14.6 48 24 48z"/></svg>';
function openAcc(){
 const g=accG(),email=g&&g.email||'';
 const m=modal('<div class="acc-panel">'
  +'<div class="acc-av">'+accAv('acc-av-in')+'</div>'
  +'<b class="acc-name">'+E(S.name||'لاعب')+'</b>'
  +(email?'<div class="acc-mail">'+GICON+'<span dir="ltr">'+E(email)+'</span></div>'
    :'<div class="acc-mail guest"><span>ضيف — تقدّمك محفوظ على هذا الجهاز فقط</span></div>')
  +(email?'<button class="btn p" id="accOut">🚪 تسجيل الخروج</button>':'<button class="btn g" id="accIn">الدخول بحساب Google</button>')
  +'<button class="btn s" data-x>إغلاق</button></div>');
 const out=m.querySelector('#accOut');
 if(out)out.onclick=async()=>{out.disabled=true;out.textContent='جاري تسجيل الخروج...';
  try{await syncNow()}catch(e){}
  try{localStorage.removeItem('tk_g')}catch(e){}
  try{localStorage.removeItem('tk1');localStorage.removeItem('tk_sid')}catch(e){}
  try{document.cookie='tk_sid=; max-age=0; path=/'}catch(e){}
  try{await idbOp('w','')}catch(e){}
  location.reload()};
 const inn=m.querySelector('#accIn');if(inn)inn.onclick=()=>{try{window.tkGoogleLogin()}catch(e){}};
}
const _hud=hud;hud=function(){_hud();try{paintAcc()}catch(e){}};
try{paintAcc()}catch(e){}
// ---------- achievements ----------
const STR=[[10,100],[25,250],[50,500],[100,1000],[150,1500],[200,2000],[250,3000],[300,4000],[336,5000]];
function strClick(e){const b=e.target.closest('[data-str]');if(!b)return;const N=+b.dataset.str,pr=STR.find(x=>x[0]===N);if(!pr)return;const R=pr[1];S.stR=S.stR||{};if(S.stR[N]||Object.values(S.stars||{}).reduce((x,y)=>x+y,0)<N)return;S.stR[N]=1;S.coins=(S.coins|0)+R;sv();hud();cel('🎁 +'+R+' عملة',1600,1);rprog()}
const LVR=[[5,100],[10,250],[20,500],[30,750],[40,1000],[50,1500],[60,2000],[70,2500],[80,3000],[90,4000],[100,5000]];
function lvrClick(e){const b=e.target.closest('[data-lvr]');if(!b)return;const L=+b.dataset.lvr,pair=LVR.find(x=>x[0]===L);if(!pair)return;const R=pair[1];
 S.lvR=S.lvR||{};if(S.lvR[L])return;S.lvR[L]=1;S.coins=(S.coins|0)+R;sv();hud();cel('🎁 +'+R+' عملة',1600,1);rprog()}
const ALB=[[10,100],[20,250],[30,500],[40,1000],[50,2500],[56,10000]];
function albCount(){try{return LV.filter(l=>S.claimed&&S.claimed[l.id]).length}catch(e){return 0}}
function albClick(e){const b=e.target.closest('[data-albm]');if(!b)return;const N=+b.dataset.albm,pr=ALB.find(x=>x[0]===N);if(!pr)return;const R=pr[1];S.albR=S.albR||{};if(S.albR[N]||albCount()<N)return;S.albR[N]=1;S.coins=(S.coins|0)+R;sv();hud();cel('🎁 +'+R+' عملة',1600,1);rprog()}
let flt='all';
const _rp=rprog;
rprog=function(){_rp();try{rebuild()}catch(e){console.warn('ach ui',e)}};
function rebuild(){const a=$$('ach');if(!a||a.querySelector('.ac-hero'))return;
 const kids=[...a.children];const stats=kids[0];const bonus=a.querySelector('.ach-bonus');
 const rows=kids.filter(k=>k!==stats&&k!==bonus&&k.children.length===3&&k.children[1].querySelector('b'));
 if(!rows.length)return;
 const items=rows.map(r=>{const [ic,mid,end]=r.children,ds=mid.querySelectorAll('div');const bar=mid.querySelector(':scope > div > div');const p=bar?parseInt(bar.style.width)||0:0;
  const btn=end.querySelector('button'),sm=end.querySelector('small');const done=p>=100;
  return {ic:ic.textContent,t:mid.querySelector('b').textContent,d:ds[0]?ds[0].textContent:'',p,btn,sm:sm?sm.textContent:'',done,claimed:done&&!btn}});
 // account-level reward achievements (5,10,20..100), rewards grow 100 -> 5000 coins
 const lvl=(window.tkLevel?tkLevel().l:1);S.lvR=S.lvR||{};
 LVR.forEach(pair=>{const L=pair[0],R=pair[1];const done=lvl>=L,claimed=!!S.lvR[L];let btn=null;
  if(done&&!claimed){btn=mk('button','ach-claim','🎁 '+R);btn.setAttribute('data-lvr',L)}
  items.push({ic:'🏅',t:'مستوى '+L,d:'اوصل للمستوى '+L+' واستلم '+R+' عملة',p:Math.min(100,Math.round(100*lvl/L)),btn,sm:Math.min(lvl,L)+'/'+L,done,claimed:done&&claimed})});
 // star milestone achievements: total stars across all stages, coin prizes grow 100 -> 5000
 const stt=Object.values(S.stars||{}).reduce((x,y)=>x+y,0);S.stR=S.stR||{};
 STR.forEach(pair=>{const N=pair[0],R=pair[1];const done=stt>=N,claimed=!!S.stR[N];let btn=null;
  if(done&&!claimed){btn=mk('button','ach-claim','🎁 '+R);btn.setAttribute('data-str',N)}
  items.push({ic:'⭐',t:N+' نجمة',d:'اجمع '+N+' نجمة واستلم '+R+' عملة',p:Math.min(100,Math.round(100*stt/N)),btn,sm:Math.min(stt,N)+'/'+N,done,claimed:done&&claimed})});
 if(!a._str){a._str=1;a.addEventListener('click',strClick)}
 if(!a._lvr){a._lvr=1;a.addEventListener('click',lvrClick)}
 // album sticker milestones: one sticker per completed album stage (LV), prizes grow 100 -> 10000
 const alc=albCount();S.albR=S.albR||{};
 ALB.forEach(pair=>{const N=pair[0],R=pair[1];const done=alc>=N,claimed=!!S.albR[N];let btn=null;
  if(done&&!claimed){btn=mk('button','ach-claim','🎁 '+R);btn.setAttribute('data-albm',N)}
  const full=N===56;
  items.push({ic:'📒',t:full?'كل الألبوم':N+' ملصق',d:(full?'كمّل ألبوم الملصقات كله ('+N+' ملصق)':'اجمع '+N+' ملصق في الألبوم')+' واستلم '+R+' عملة',p:Math.min(100,Math.round(100*alc/N)),btn,sm:Math.min(alc,N)+'/'+N,done,claimed:done&&claimed})});
 if(!a._albm){a._albm=1;a.addEventListener('click',albClick)}
 if(!a._allb){a._allb=1;a.addEventListener('click',e=>{const b=e.target.closest('[data-allb]');if(!b)return;e.stopPropagation();e.preventDefault();if(S.achAll)return;S.achAll=1;S.coins=(S.coins|0)+15000;sv();hud();cel('🏆 مبروك! +15000 عملة',2200,1);rprog()},true)}
 const tl=[...stats.children].map(c=>({i:c.children[0].textContent,v:c.children[1].textContent,l:c.children[2].textContent}));
 const nDone=items.filter(i=>i.done).length,tot=items.length,pc=Math.round(100*nDone/tot),nClaim=items.filter(i=>i.btn).length;
 // all-achievements bonus: 15000 coins; counts base + level + star + album achievements
 if(bonus){const allDone=items.every(i=>i.done);
  bonus.innerHTML=S.achAll?'🏆 استلمت جائزة إنهاء كل الإنجازات (15000 💎)':allDone?'<button class="ach-claim big" data-allb="1">🏆 استلم 15000 💎 لإنهاء كل الإنجازات</button>':'🏆 أنهِ كل الإنجازات ('+nDone+'/'+tot+') واحصل على 15000 💎'}
 const hero=mk('div','ac-hero','<div class="ac-ring" style="--p:'+pc+'"><div>'+nDone+'/'+tot+'<small>إنجاز</small></div></div><div><h3>🏆 إنجازاتك</h3><p>'+(nClaim?'عندك '+nClaim+' جائزة تستنى تستلمها 🎁':nDone===tot?'خلّصت كل الإنجازات! 👑':'باقي '+(tot-nDone)+' إنجاز وتكمّل كلهم')+'</p></div>');
 const st=mk('div','ac-stats',tl.map(t=>'<div><i>'+t.i+'</i><b>'+t.v+'</b><span>'+t.l+'</span></div>').join(''));
 const tabs=mk('div','ac-tabs','<button data-f="all">الكل</button><button data-f="go">قيد التنفيذ</button><button data-f="ok">مكتملة</button>');
 const list=mk('div','ac-list');
 const ord=items.slice().sort((x,y)=>(y.btn?2:x.btn?-2:0)+((x.claimed?1:0)-(y.claimed?1:0))||(y.p-x.p));
 const draw=()=>{list.innerHTML='';tabs.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b.dataset.f===flt));
  const sh=ord.filter(i=>flt==='all'||(flt==='ok'?i.done:!i.done));
  if(!sh.length){list.appendChild(mk('div','ac-empty',flt==='ok'?'لسه مفيش إنجازات مكتملة. ابدأ العب! 🚀':'كل الإنجازات مكتملة! 🎉'));return}
  sh.forEach(i=>{const c=mk('div','ac-card'+(i.btn?' claim':i.done?' done':''));
   c.innerHTML='<div class="ac-ic">'+i.ic+'</div><div class="ac-mid"><b>'+i.t+'</b><em>'+i.d+'</em><div class="ac-bar"><i style="width:'+i.p+'%"></i></div></div>';
   const e=mk('div','ac-end');if(i.btn)e.appendChild(i.btn);else if(i.done)e.innerHTML='<span class="ok">✅</span>';else e.textContent=i.sm||(i.p+'%');c.appendChild(e);list.appendChild(c)})};
 tabs.onclick=e=>{const b=e.target.closest('button');if(b){flt=b.dataset.f;draw()}};
 draw();
 a.style.cssText='background:none;box-shadow:none;border:0;padding:0;width:100%;display:flex;flex-direction:column;align-items:center;gap:10px';
 [...a.children].forEach(k=>{if(k!==bonus)k.remove()});
 a.insertBefore(list,a.firstChild);a.insertBefore(tabs,list);a.insertBefore(st,tabs);a.insertBefore(hero,st);
 if(bonus)a.appendChild(bonus);
}
})();


// ---------- kid-friendly home screen: modern glossy app-icon tiles (SVG) (replaces emoji icons) ----------
(function(){
const W='#fff';
// modern app-icon tiles: rounded-square gradient, soft inner gloss, clean white geometric glyph, no outlines
const T=(c1,c2,g)=>({c1,c2,g});
const P={
 gem:T('#38bdf8','#2563eb','<path d="M16 13h16l7 9-15 17L9 22z" fill="#fff"/><path d="M9 22h30M16 13l4 9 4 17 4-17 4-9" fill="none" stroke="#2563eb" stroke-opacity=".35" stroke-width="2" stroke-linejoin="round"/>'),
 star:T('#fde047','#f59e0b','<path d="M24 9l4.4 9.2 10 1.300-7.300 7 1.800 10L24 31.600 15.100 36.500l1.800-10-7.300-7 10-1.300z" fill="#fff" stroke="#fff" stroke-width="2.500" stroke-linejoin="round"/>'),
 medal:T('#c084fc','#7c3aed','<path d="M15 8h6l3 9-3 3zM33 8h-6l-3 9 3 3z" fill="#fff" fill-opacity=".7"/><circle cx="24" cy="29" r="10.500" fill="#fff"/><path d="M24 23.500l1.900 3.900 4.300.6-3.100 3 .7 4.300-3.800-2-3.800 2 .7-4.300-3.100-3 4.300-.6z" fill="#7c3aed"/>'),
 play:T('#fb923c','#ea580c','<path d="M18 13.500c0-1.800 2-2.900 3.500-1.900l15 10.500c1.300.9 1.300 2.900 0 3.800l-15 10.500c-1.500 1-3.500-.1-3.500-1.900z" fill="#fff" transform="translate(-1 -1)"/>'),
 car:T('#f87171','#dc2626','<path d="M9 28v-4.500c0-.8.2-1.500.6-2.200l3-5.800c.6-1.200 1.800-1.900 3.100-1.900h14.600c1.300 0 2.500.7 3.100 1.900l3 5.800c.4.700.6 1.400.6 2.200V28c0 1.400-1.100 2.500-2.500 2.500h-1.500a3.500 3.500 0 0 1-7 0h-6a3.500 3.500 0 0 1-7 0H11.500C10.100 30.500 9 29.400 9 28z" fill="#fff"/><path d="M15 20.500l2-4h14l2 4z" fill="#dc2626" fill-opacity=".4"/><circle cx="16" cy="31" r="3" fill="#fff"/><circle cx="32" cy="31" r="3" fill="#fff"/><circle cx="16" cy="31" r="1.300" fill="#dc2626"/><circle cx="32" cy="31" r="1.300" fill="#dc2626"/>'),
 road:T('#818cf8','#4f46e5','<path d="M19 8h10l11 32H8z" fill="#fff"/><path d="M24 13v5M24 23v6M24 34v4" stroke="#4f46e5" stroke-width="3" stroke-linecap="round"/>'),
 globe:T('#2dd4bf','#0891b2','<circle cx="24" cy="24" r="14.500" fill="#fff"/><path d="M24 9.500c-4 4-6 9-6 14.500s2 10.500 6 14.500M24 9.500c4 4 6 9 6 14.500s-2 10.500-6 14.500M9.500 24h29M11.500 16.500h25M11.500 31.500h25" fill="none" stroke="#0891b2" stroke-opacity=".55" stroke-width="2" stroke-linecap="round"/>'),
 pad:T('#a78bfa','#6d28d9','<path d="M15 14h18c4.500 0 7.600 3.400 8.300 8l1 6.500c.5 3.200-2 5.700-5 5-1.500-.4-2.600-1.500-3.600-2.800L31 28H17l-2.700 2.700c-1 1.300-2.100 2.400-3.600 2.800-3 .7-5.500-1.800-5-5l1-6.500c.7-4.600 3.800-8 8.300-8z" fill="#fff"/><path d="M16 18v7M12.500 21.500h7" stroke="#6d28d9" stroke-width="3" stroke-linecap="round"/><circle cx="31.500" cy="20" r="2" fill="#6d28d9"/><circle cx="35.500" cy="24" r="2" fill="#6d28d9" fill-opacity=".6"/>'),
 gift:T('#fb7185','#e11d48','<rect x="10" y="19" width="28" height="8" rx="2.500" fill="#fff"/><path d="M12 27h24v9.500c0 1.400-1.100 2.500-2.500 2.500h-19c-1.400 0-2.500-1.100-2.500-2.500z" fill="#fff" fill-opacity=".88"/><path d="M24 19v20" stroke="#e11d48" stroke-opacity=".5" stroke-width="4"/><path d="M24 19c-5 0-8-1.500-8-4.500a3.200 3.200 0 0 1 5.800-1.800c1.500 1.800 2.200 4 2.200 6.300zM24 19c5 0 8-1.500 8-4.500a3.200 3.200 0 0 0-5.800-1.800c-1.500 1.800-2.200 4-2.200 6.300z" fill="#fff"/>'),
 login:T('#4ade80','#16a34a','<path d="M13 24h17M23.500 16.500L31 24l-7.500 7.500" fill="none" stroke="#fff" stroke-width="4.500" stroke-linecap="round" stroke-linejoin="round"/><path d="M34 12.500h1.500a2 2 0 0 1 2 2v19a2 2 0 0 1-2 2H34" fill="none" stroke="#fff" stroke-width="3.500" stroke-linecap="round"/>'),
 menu:T('#f472b6','#db2777','<rect x="11" y="13" width="26" height="4.500" rx="2.250" fill="#fff"/><rect x="11" y="21.800" width="26" height="4.500" rx="2.250" fill="#fff"/><rect x="11" y="30.500" width="17" height="4.500" rx="2.250" fill="#fff"/>'),
 user:T('#fdba74','#f97316','<circle cx="24" cy="18" r="7" fill="#fff"/><path d="M10.500 38c1.600-6.500 6.500-9.500 13.500-9.500S35.900 31.500 37.500 38z" fill="#fff"/>'),
 chev:{raw:'<path d="M30 8L14 24l16 16" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>'}
};
let uid=0;
const svg=(n,c)=>{const p=P[n];if(p.raw)return '<svg class="ic'+(c?' '+c:'')+'" viewBox="0 0 48 48" aria-hidden="true">'+p.raw+'</svg>';
 const i='tki'+(++uid);
 return '<svg class="ic'+(c?' '+c:'')+'" viewBox="0 0 48 48" aria-hidden="true"><defs><linearGradient id="'+i+'g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+p.c1+'"/><stop offset="1" stop-color="'+p.c2+'"/></linearGradient><linearGradient id="'+i+'h" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs><rect x="1.500" y="1.500" width="45" height="45" rx="14" fill="url(#'+i+'g)"/><path d="M1.500 16C1.500 8 8 1.500 16 1.500h16C40 1.500 46.500 8 46.500 16v6c-7 4-15 5.500-22.500 5.500S8.500 26 1.500 22z" fill="url(#'+i+'h)"/><g style="filter:drop-shadow(0 1.500px 1px rgba(0,0,0,.22))">'+p.g+'</g></svg>'};
window.tkIcon=svg;
function swap(el,name,cls){if(!el||el.dataset.ic)return;el.dataset.ic=name;el.innerHTML=svg(name,cls)}
function textIcon(el,name){ // replaces the leading emoji text node
 if(!el||el.dataset.ic)return;const t=[...el.childNodes].find(n=>n.nodeType===3&&n.textContent.trim());
 if(t)t.textContent=t.textContent.replace(/^[^\u0600-\u06FFA-Za-z0-9]+/,'');el.dataset.ic=name;const s=document.createElement('span');s.className='ic-w';s.innerHTML=svg(name);el.insertBefore(s,el.firstChild)}
function modern(){
 const h=document.getElementById('home');if(!h||h.dataset.modern)return;h.dataset.modern='1';
 const chips=h.querySelectorAll('.hm-chip');
 if(chips[0]){chips[0].classList.add('c-gem');textIcon(chips[0],'gem')}
 if(chips[1]){chips[1].classList.add('c-star');textIcon(chips[1],'star')}
 const lv=h.querySelector('.hm-lvl small');if(lv)textIcon(lv,'medal');
 const pp=h.querySelector('.primary-play>span:first-child');if(pp){pp.innerHTML=svg('play')}
 const pl=h.querySelector('.primary-play');if(pl&&!pl.querySelector('.pp-go')){const g=document.createElement('i');g.className='pp-go';g.innerHTML=svg('chev');pl.appendChild(g)}
 const acts=h.querySelectorAll('.home-actions .btn');
 [['car','a-car'],['road','a-road'],['globe','a-world']].forEach((x,i)=>{const b=acts[i];if(!b)return;b.classList.add(x[1]);const em=b.querySelector('em');if(em){em.className='ha-ic';em.innerHTML=svg(x[0])}});
 const nav=h.querySelectorAll('.hm-nav button');
 ['pad','gift','login','menu'].forEach((n,i)=>{const b=nav[i];if(b)swap(b.querySelector('span'),n)});
 h.querySelectorAll('.hm-nav span').forEach(s=>s.classList.add('nv-ic'));
}
function fixAcc(){const b=document.getElementById('accBtn');if(!b)return;const sp=b.querySelector('span');if(!sp||sp.querySelector('svg'))return;
 const on=sp.textContent.indexOf('\uD83D\uDD10')<0;sp.className='nv-ic';sp.innerHTML=svg(on?'user':'login')}
const ab=document.getElementById('accBtn');if(ab){try{new MutationObserver(()=>{try{fixAcc()}catch(e){}}).observe(ab,{childList:true})}catch(e){}}
try{modern()}catch(e){}
document.addEventListener('DOMContentLoaded',()=>{try{modern()}catch(e){}});
})();



// Shop previews: every purchasable item shows the real in-game look (not an emoji).
// One shared renderer (the game's own), snapshots are taken one at a time, cached as small JPEGs
// (memory + localStorage) so phones stay smooth. Prices and buy logic are untouched.
(function(){
if(typeof THREE==='undefined'||typeof renderWorldShop!=='function')return;
const PVW=320,PVH=192,VER='pv1';
const mem={},Q=[];let busy=0,pending={};
const LS=k=>{try{return localStorage.getItem('tk_'+VER+'_'+k)}catch(e){return null}};
const LSS=(k,v)=>{try{localStorage.setItem('tk_'+VER+'_'+k,v)}catch(e){try{Object.keys(localStorage).filter(x=>x.indexOf('tk_pv')===0&&x.indexOf('tk_'+VER)!==0).forEach(x=>localStorage.removeItem(x))}catch(_){}}};
const ready=()=>typeof R!=='undefined'&&R&&typeof sc!=='undefined'&&sc&&typeof cam!=='undefined'&&cam&&carObj&&tiles&&tiles.length;
const idle=()=>typeof mode==='undefined'||(mode!=='play'&&mode!=='free');

// small stylesheet for previews
const st=document.createElement('style');
st.textContent='.wk-pv{height:104px}.wk-pv img.pvi{width:100%;height:100%;object-fit:cover;display:block}.wk-pv.pvl{background:linear-gradient(110deg,#12304f 30%,#1b4670 50%,#12304f 70%);background-size:200% 100%;animation:pvsh 1.3s linear infinite}@keyframes pvsh{to{background-position:-200% 0}}.wk-pv.pvf{display:grid;place-items:center;background:radial-gradient(circle at 50% 40%,#1d4673,#0d2238)}.pvav{width:62px;height:62px;border-radius:50%;border:3px solid #fff;background:#fff3c4;display:grid;place-items:center;font-size:34px;overflow:hidden;box-sizing:border-box}.pvav img{width:100%;height:100%;object-fit:cover;border-radius:50%}';
document.head.appendChild(st);

// ---- take one snapshot in the real game scene, straight from the game renderer (same tone mapping, same lights) ----
function snap(spec){
 const pr=R.getPixelRatio(),sz=R.getSize(new THREE.Vector2()),vw=PVW/pr,vh=PVH/pr;
 if(vw>sz.x||vh>sz.y)return null;
 const cv=document.createElement('canvas');cv.width=PVW;cv.height=PVH;const g=cv.getContext('2d');
 // save
 const sv0={theme:S.theme,road:S.road,gate:S.gate,eqG:S.eqG,eqR:S.eqR,eqA:S.eqA,
  cp:cam.position.clone(),cq:cam.quaternion.clone(),fov:cam.fov,asp:cam.aspect,bg:sc.background,fog:sc.fog,
  cvis:carObj.visible,cpos:carObj.position.clone(),cry:carObj.rotation.y,skyV:skyG&&skyG.visible,skyZ:skyG&&skyG.position.z,
  shV:shadowM&&shadowM.visible,platV:plat&&plat.visible,fxV:fxP&&fxP.visible,
  tv:tiles.map(t=>t.visible),gv:gates.map(x=>[x.visible,x.position.clone()]),rd:rainDrops.map(d=>d.visible),
  vp:R.getViewport(new THREE.Vector4()),sc:R.getScissor(new THREE.Vector4()),sct:R.getScissorTest(),mp:cam.zoom};
 let ok=false;
 try{
  spec.apply();
  cam.aspect=PVW/PVH;cam.fov=spec.fov||62;cam.updateProjectionMatrix();
  spec.camera();cam.updateMatrixWorld();
  R.setScissorTest(true);R.setViewport(0,0,vw,vh);R.setScissor(0,0,vw,vh);
  R.render(sc,cam);
  const W=R.domElement.width,H=R.domElement.height;
  g.drawImage(R.domElement,0,H-PVH,PVW,PVH,0,0,PVW,PVH);ok=true;
 }catch(e){}
 // restore
 try{
  R.setScissorTest(sv0.sct);R.setViewport(sv0.vp);R.setScissor(sv0.sc);
  S.theme=sv0.theme;S.road=sv0.road;S.gate=sv0.gate;S.eqG=sv0.eqG;S.eqR=sv0.eqR;S.eqA=sv0.eqA;
  cam.position.copy(sv0.cp);cam.quaternion.copy(sv0.cq);cam.fov=sv0.fov;cam.aspect=sv0.asp;cam.updateProjectionMatrix();
  sc.background=sv0.bg;sc.fog=sv0.fog;carObj.visible=sv0.cvis;carObj.position.copy(sv0.cpos);carObj.rotation.y=sv0.cry;
  if(skyG){skyG.visible=sv0.skyV;skyG.position.z=sv0.skyZ}if(shadowM)shadowM.visible=sv0.shV;if(plat)plat.visible=sv0.platV;if(fxP)fxP.visible=sv0.fxV;
  tiles.forEach((t,i)=>t.visible=sv0.tv[i]);gates.forEach((x,i)=>{x.visible=sv0.gv[i][0];x.position.copy(sv0.gv[i][1])});rainDrops.forEach((d,i)=>d.visible=sv0.rd[i]);
  spec.restore&&spec.restore();
 }catch(e){}
 return ok?cv.toDataURL('image/jpeg',.82):null;
}

// ---- scene setups ----
const lookGame=()=>{cam.position.set(0,4.4,7);cam.lookAt(0,1.35,-4)};
function gameBase(){
 carObj.position.set(0,0,0);carObj.rotation.y=0;
 if(skyG){skyG.visible=true;skyG.position.z=0}
 if(shadowM){shadowM.visible=true;shadowM.position.set(0,.035,0);const M=carObj.userData.m;if(M)shadowM.scale.set(M.W*.58,M.L*.56,1)}
 if(plat)plat.visible=false;
 const t=curTheme();
 if(fxP)fxP.visible=!!t.fx2;
 rainDrops.forEach(d=>d.visible=t.fx==='rain');
}
function relook(){applyLook();}
const SPEC={
 t(x){return{key:'t_'+x.id+'_'+curRoad().id,apply(){S.theme=x.id;applyLook();gameBase()},camera:lookGame,restore:relook,fov:66}},
 r(x){return{key:'r_'+x.id+'_'+curTheme().id,apply(){S.road=x.id;applyLook();gameBase();carObj.position.set(0,0,-6);if(shadowM)shadowM.position.z=-6},camera:()=>{cam.position.set(0,2.9,4);cam.lookAt(0,.3,-8)},restore:relook,fov:66}},
 g(x){return{key:'g_'+x.id,apply(){
   S.gate=x.id;rebuildGates();gameBase();carObj.visible=false;
   const lt=['أ','ب','ج'];gates.forEach((q,i)=>{try{label(q,lt[i])}catch(e){}q.position.set((i-1)*3,0,-3);q.visible=true});
  },camera:()=>{cam.position.set(0,3.0,4);cam.lookAt(0,2.4,-6)},restore(){rebuildGates()},fov:60}},
 c(x){
  const sl=(x.desc||'');const front=/^الأمام/.test(sl),side=/^الجانب/.test(sl),rim=x.g==='rm',gl=x.g==='gl';
  return{key:'c_'+x.id+'_'+S.car+'_'+S.color,apply(){
   S.eqG='';S.eqR='';S.eqA=[];if(gl)S.eqG=x.id;else if(rim)S.eqR=x.id;else S.eqA=[x.id];
   const op=pv;pv=null;applyCar();pv=op;
   tiles.forEach(t=>t.visible=false);if(skyG)skyG.visible=false;if(shadowM)shadowM.visible=false;rainDrops.forEach(d=>d.visible=false);if(fxP)fxP.visible=false;
   if(plat)plat.visible=true;
   sc.background=new THREE.Color(0x12304f);sc.fog=null;
   carObj.position.set(0,0,0);carObj.rotation.y=front?Math.PI+.55:side?1.05:rim?1.25:.6;
  },camera:()=>{if(rim){cam.position.set(3.2,1.0,3.2);cam.lookAt(.2,.45,.9)}else if(gl){cam.position.set(0,2.0,5.6);cam.lookAt(0,.3,0)}else{cam.position.set(0,2.3,6.0);cam.lookAt(0,1.0,0)}},
  restore(){const op=pv;pv=null;applyCar();pv=op;applyLook()},fov:44}}
};
const KIND=()=>({t:'t',r:'r',g:'g',c:'c'})[shopTab];

// ---- queue ----
function pump(){
 if(busy||!Q.length)return;
 if(!ready()||!idle()||document.hidden){setTimeout(pump,600);return}
 const j=Q.shift();
 if(mem[j.key]){fin(j.key,mem[j.key]);return pumpSoon()}
 busy=1;
 requestAnimationFrame(()=>{let u=null;try{u=snap(j.spec)}catch(e){}
  busy=0;if(u){mem[j.key]=u;LSS(j.key,u);fin(j.key,u)}pumpSoon()});
}
function pumpSoon(){setTimeout(pump,45)}
function fin(key,url){const hs=pending[key];delete pending[key];if(hs)hs.forEach(el=>paint(el,url))}
function paint(el,url){if(!el.isConnected)return;el.classList.remove('pvl');el.innerHTML='<img class="pvi" alt="" src="'+url+'">'}
function want(el,spec,prio){
 const k=spec.key;let u=mem[k]||LS(k);
 if(u){mem[k]=u;paint(el,u);return}
 el.classList.add('pvl');el.innerHTML='';
 (pending[k]=pending[k]||[]).push(el);
 if(!Q.some(j=>j.key===k)){const j={key:k,spec};if(prio)Q.unshift(j);else Q.push(j)}
 pump();
}

// ---- decorate the shop ----
function frameMini(x){
 const av=(typeof S!=='undefined'&&S.avatarImage)?'<img src="'+S.avatarImage+'" alt="">':(S.avatar||'🦊');
 return '<div class="pvav" style="box-shadow:'+x.sh+'">'+av+'</div>';
}
function decorate(){
 const el=document.getElementById('worlditems');if(!el)return;
 const list=shopList(),cards=el.querySelectorAll('.wk-card'),tab=shopTab;
 cards.forEach((c,i)=>{const x=list[i],pv2=c.querySelector('.wk-pv');if(!x||!pv2)return;
  if(tab==='f'){pv2.className='wk-pv pvf';pv2.innerHTML=frameMini(x);return}
  const k=KIND();if(!k)return;
  pv2.className='wk-pv';pv2.innerHTML='';
  const isCur=tab==='t'?curTheme().id===x.id:tab==='r'?curRoad().id===x.id:tab==='g'?(S.gate||'neon')===x.id:false;
  // compute the key without touching the scene
  let spec;try{spec=SPEC[k](x)}catch(e){return}
  want(pv2,spec,isCur);
 });
}
const _rs=renderWorldShop;
renderWorldShop=function(){_rs.apply(this,arguments);try{decorate()}catch(e){}};

// ---- home-screen themes (lobby modal) + buy dialog: show the real thing ----
function homeMini(card){
 const pvEl=card.querySelector('.lb-pv');if(!pvEl||pvEl.dataset.m)return;pvEl.dataset.m='1';
 const bg=pvEl.style.background,home=document.getElementById('home');if(!home)return;
 const w=pvEl.clientWidth||150,sc0=w/390,hh=Math.round(700*sc0);
 pvEl.style.cssText='position:relative;width:100%;height:'+hh+'px;overflow:hidden;border-radius:12px;border:2px solid #fff;box-shadow:0 2px 6px #0003;background:'+bg;
 const inn=document.createElement('div');inn.className='hmini-in';inn.style.cssText='position:absolute;left:0;top:0;width:390px;height:700px;transform-origin:0 0;transform:scale('+sc0+');pointer-events:none';
 const c=home.cloneNode(true);c.querySelectorAll('[id]').forEach(e=>e.removeAttribute('id'));c.querySelectorAll('[onclick]').forEach(e=>e.removeAttribute('onclick'));
 c.removeAttribute('data-lb');c.id='home';c.className='scr on';c.style.cssText='position:absolute!important;inset:0!important;display:flex!important;opacity:1!important;transform:none!important;visibility:visible!important;background:'+bg+'!important;pointer-events:none';
 inn.appendChild(c);pvEl.innerHTML='';pvEl.appendChild(inn);
}
const mo=new MutationObserver(()=>{const g=document.getElementById('lbG');if(g&&!g.__pv){g.__pv=1}if(g)g.querySelectorAll('.lb-card').forEach(c=>{try{homeMini(c)}catch(e){}})});
mo.observe(document.body,{childList:true,subtree:true});
// when a lobby card is re-drawn the pv is new, observer handles it
const _ab=window.askBuy;
if(typeof _ab==='function')window.askBuy=function(x,ok){try{if(x&&!x.pv&&x.ico&&['🌦️','🛣️','🖼️','🚪'].indexOf(x.ico)>=0){const it=shopList().find(v=>v.n===x.n);if(it){if(shopTab==='f')x.pv='<div class="wk-pv pvf" style="border-radius:14px;height:96px;width:220px;margin:0 auto">'+frameMini(it)+'</div>';else{const k=KIND()&&SPEC[KIND()](it).key,u=k&&mem[k];if(u)x.pv='<img alt="" src="'+u+'" style="width:220px;max-width:100%;border-radius:14px;display:block;margin:0 auto">'}}}}catch(e){0}return _ab.call(this,x,ok)};
window.__shopPreview={mem,Q,snap:()=>decorate()};
})();

/* daily reward streak + WhatsApp share (additive) */
(function(){
const _st=document.createElement('style');_st.textContent="/* daily reward + share */\n.dr-st{font:800 17px Cairo;color:#c2410c}.dr-g{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}\n.dr-d{border-radius:14px;background:#f1f5f9;border:2px solid #e2e8f0;padding:6px 2px;display:flex;flex-direction:column;align-items:center;gap:2px;font:700 12px Cairo;color:#475569}\n.dr-d span{font-size:22px}.dr-d b{font:800 15px Cairo;color:#102744}.dr-d.dn{background:#dcfce7;border-color:#86efac}.dr-d.td{background:#fff7ed;border-color:#fb923c;box-shadow:0 0 0 3px #fdba7459;animation:drp 1.2s infinite alternate}\n.dr-d:nth-child(7){grid-column:span 2}@keyframes drp{to{transform:scale(1.06)}}.dr-m{min-height:22px;font:700 14px Cairo;color:#475569}\n.btn.wa{background:linear-gradient(#34d36b,#16a34a)!important;box-shadow:0 6px 0 #0f7a36,0 12px 18px rgba(0,0,0,.25)!important;color:#fff}\n.sheet .sh-wa{grid-column:1/-1;background:linear-gradient(145deg,#34d36b,#16a34a)}";document.head.appendChild(_st);
const RW=[50,70,90,120,160,220,350],$$=id=>document.getElementById(id);
const dk=d=>d.toDateString(),yest=()=>{const d=new Date();d.setDate(d.getDate()-1);return dk(d)};
const bonus=n=>Math.min(Math.floor(n/7),4)*50;
function st(){const t=dk(new Date()),claimed=S.day===t,y=S.day===yest(),s=S.streak|0;
 const done=claimed?((s-1)%7)+1:(y?s:0)%7,total=claimed?s:(y?s:0),start=total-done;
 return{claimed,done,total,b:bonus(start),next:claimed?null:done}}
function rw(i,b){return RW[i]+b}
function open(){try{ac()}catch(e){}
 const q=st(),days=RW.map((_,i)=>{const cls=i<q.done?'dr-d dn':(i===q.next?'dr-d td':'dr-d'),r=rw(i,q.b);
  return '<div class="'+cls+'"><small>يوم '+(i+1)+'</small><span>'+(i<q.done?'✅':i===6?'🎁':'💎')+'</span><b>'+r+'</b></div>'}).join('');
 const lost=!q.claimed&&!q.done&&(S.streak|0)>0;
 const o=modal('<b class="mdl-t">📅 مكافأة اليوم</b><div class="dr-st">🔥 أيام متتالية: <b id="drN">'+q.total+'</b></div><div class="dr-g">'+days+'</div><div class="dr-m" id="drM">'+(q.claimed?'استلمت مكافأة اليوم ✓ ارجع بكرة وكمّل السلسلة':lost?'السلسلة اتقطعت، ابدأ من جديد النهاردة 💪':'ادخل كل يوم والمكافأة بتكبر!')+'</div><button class="btn g" id="drC"'+(q.claimed?' disabled':'')+'>'+(q.claimed?'تم الاستلام ✓':'استلم +'+rw(q.next||0,q.b)+' 💎')+'</button><button class="btn p" id="drS">📲 شارك على واتساب</button><button class="btn s" data-x>إغلاق</button>');
 o.querySelector('#drS').onclick=()=>shareWA('daily');
 o.querySelector('#drC').onclick=()=>{if(S.day===dk(new Date()))return;const q2=st(),i=q2.next,r=rw(i,q2.b),y=S.day===yest();
  S.streak=y?(S.streak|0)+1:1;S.day=dk(new Date());S.coins=(S.coins|0)+r;sv();hud();
  cel('🎁 مكافأة اليوم +'+r+' 💎<br>🔥 أيام متتالية: '+S.streak,2600);o.remove();setTimeout(open,2700)}}
daily=open;
// ---------- WhatsApp share ----------
function lvl(){const e=$$('lvN');return e?e.textContent:'1'}
function stars(){const e=$$('ts');return e?e.textContent:'0'}
const URL_=location.origin+'/';
function shareWA(k){let t;
 if(k==='res'){let n=0;try{n=S.stars[LV[cur].id]|0}catch(e){}
  t='🚗 خلصت مرحلة في Turbo Kids وجبت '+'⭐'.repeat(n||1)+'! أنا في مستوى '+lvl()+' ومعايا '+stars()+' نجمة. تعالى العب معايا 👇\n'+URL_}
 else if(k==='daily'){t='🔥 أنا ماشي '+(S.streak|0)+' يوم ورا بعض في Turbo Kids وبآخد مكافأة كل يوم! 🎁 العب معايا 👇\n'+URL_}
 else{t='🏁 أنا في مستوى '+lvl()+' وجمعت '+stars()+' نجمة و'+((S.coins|0))+' عملة في Turbo Kids! 🚗 تعالى العب معايا 👇\n'+URL_}
 const u='https://wa.me/?text='+encodeURIComponent(t);const w=window.open(u,'_blank');if(!w)location.href=u}
window.shareWA=shareWA;
(function(){const r=$$('res');if(r&&!$$('shRes')){const b=document.createElement('button');b.id='shRes';b.className='btn wa';b.textContent='📲 شارك نتيجتك على واتساب';b.onclick=()=>shareWA('res');r.appendChild(b)}})();
const _om=window.openMore;
if(typeof _om==='function')window.openMore=function(){const r=_om.apply(this,arguments),sh=[...document.querySelectorAll('.mdl .sheet')].pop();
 if(sh){const b=document.createElement('button');b.className='sh-wa';b.innerHTML='<span>📲</span>شارك اللعبة على واتساب';b.onclick=e=>{e.stopPropagation();shareWA('home')};sh.appendChild(b)}return r};
// auto prompt once per session when the daily reward is waiting
setTimeout(()=>{try{const h=$$('home');if(h&&h.classList.contains('on')&&S.day!==dk(new Date())&&!document.querySelector('.dr-g')&&!window.__drShown){window.__drShown=1;open()}}catch(e){}},2200);
})();
