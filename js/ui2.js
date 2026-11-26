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
const LVR=[[5,100],[10,250],[20,500],[30,750],[40,1000],[50,1500],[60,2000],[70,2500],[80,3000],[90,4000],[100,5000]];
function lvrClick(e){const b=e.target.closest('[data-lvr]');if(!b)return;const L=+b.dataset.lvr,pair=LVR.find(x=>x[0]===L);if(!pair)return;const R=pair[1];
 S.lvR=S.lvR||{};if(S.lvR[L])return;S.lvR[L]=1;S.coins=(S.coins|0)+R;sv();hud();cel('🎁 +'+R+' عملة',1600,1);rprog()}
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
 if(!a._lvr){a._lvr=1;a.addEventListener('click',lvrClick)}
 const tl=[...stats.children].map(c=>({i:c.children[0].textContent,v:c.children[1].textContent,l:c.children[2].textContent}));
 const nDone=items.filter(i=>i.done).length,tot=items.length,pc=Math.round(100*nDone/tot),nClaim=items.filter(i=>i.btn).length;
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


// ---------- kid-friendly home screen: colorful chunky cartoon SVG icons (replaces emoji icons) ----------
(function(){
const O='#1e1b4b';
const P={
 gem:'<path d="M14 6h20l9 12-19 24L5 18z" fill="#38bdf8" stroke="'+O+'" stroke-width="3" stroke-linejoin="round"/><path d="M5 18h38M19 6l-4 12 9 24 9-24-4-12" fill="none" stroke="#e0f2fe" stroke-width="2.5" stroke-linejoin="round"/><path d="M15 18l4-12h10l4 12z" fill="#7dd3fc"/>',
 star:'<path d="M24 4l5.8 12 13.2 1.8-9.6 9.2 2.4 13L24 33.8 12.2 40l2.4-13L5 17.8 18.2 16z" fill="#fbbf24" stroke="#b45309" stroke-width="3" stroke-linejoin="round"/><path d="M24 11l3 6.5M17 19l-5 .5" stroke="#fff7c2" stroke-width="3" stroke-linecap="round"/>',
 medal:'<path d="M14 24l-5 18 9-4 6 6 4-14zM34 24l5 18-9-4-6 6-4-14z" fill="#ef4444" stroke="'+O+'" stroke-width="2.5" stroke-linejoin="round"/><circle cx="24" cy="18" r="13" fill="#fbbf24" stroke="#b45309" stroke-width="3"/><circle cx="24" cy="18" r="7.5" fill="#fde68a" stroke="#f59e0b" stroke-width="2"/>',
 play:'<path d="M14 8c0-2.4 2.5-3.8 4.6-2.6l22 13.6c2 1.2 2 4 0 5.2L18.6 37.8C16.5 39 14 37.600 14 35.200z" fill="#fb923c" stroke="#c2410c" stroke-width="3" stroke-linejoin="round" transform="translate(-3 0)"/>',
 car:'<path d="M5 30v-6l5-11c.6-1.4 2-2.300 3.500-2.300h21c1.500 0 2.900.9 3.500 2.300l5 11v6c0 1.700-1.300 3-3 3H8c-1.700 0-3-1.300-3-3z" fill="#ef4444" stroke="'+O+'" stroke-width="3" stroke-linejoin="round"/><path d="M13 14h22l4 10H9z" fill="#bae6fd" stroke="'+O+'" stroke-width="2.500" stroke-linejoin="round"/><path d="M24 14v10" stroke="'+O+'" stroke-width="2.500"/><circle cx="13" cy="34" r="5.500" fill="#334155" stroke="'+O+'" stroke-width="3"/><circle cx="35" cy="34" r="5.500" fill="#334155" stroke="'+O+'" stroke-width="3"/><circle cx="13" cy="34" r="2" fill="#e2e8f0"/><circle cx="35" cy="34" r="2" fill="#e2e8f0"/><circle cx="8.500" cy="26" r="2.200" fill="#fde047"/><circle cx="39.500" cy="26" r="2.200" fill="#fde047"/>',
 road:'<path d="M18 5h12l13 38H5z" fill="#475569" stroke="'+O+'" stroke-width="3" stroke-linejoin="round"/><path d="M24 9v6M24 20v7M24 32v9" stroke="#fde047" stroke-width="3.500" stroke-linecap="round"/><path d="M15 43l5-34M33 43L28 9" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".7"/>',
 globe:'<circle cx="24" cy="24" r="19" fill="#38bdf8" stroke="'+O+'" stroke-width="3"/><path d="M12 14c4-3 9-2 10 2s-4 5-3 9-6 3-8 0-3-8 1-11zM28 27c4-2 9 0 9 5s-5 8-8 6-4-9-1-11zM30 9c3 0 6 2 7 4-3 1-6 0-7-1z" fill="#4ade80" stroke="#15803d" stroke-width="1.800" stroke-linejoin="round"/><path d="M13 9c3-2 6-3 9-3" stroke="#fff" stroke-width="2.500" stroke-linecap="round" opacity=".8"/>',
 pad:'<path d="M13 12h22c5 0 8.500 4 9.300 9.500l1.200 8.500c.5 4-2.500 7-6 6-1.800-.5-3-1.800-4.300-3.300L32 30H16l-2.200 2.700C12.500 34.200 11.300 35.500 9.500 36c-3.500 1-6.500-2-6-6l1.200-8.500C5.500 16 9 12 13 12z" fill="#8b5cf6" stroke="'+O+'" stroke-width="3" stroke-linejoin="round"/><path d="M15 17v8M11 21h8" stroke="#fde047" stroke-width="3.500" stroke-linecap="round"/><circle cx="31" cy="19" r="2.600" fill="#4ade80" stroke="'+O+'" stroke-width="1.500"/><circle cx="36.500" cy="23.500" r="2.600" fill="#f472b6" stroke="'+O+'" stroke-width="1.500"/>',
 gift:'<rect x="6" y="19" width="36" height="10" rx="3" fill="#f472b6" stroke="'+O+'" stroke-width="3"/><path d="M9 29h30v11c0 1.700-1.300 3-3 3H12c-1.700 0-3-1.300-3-3z" fill="#ef4444" stroke="'+O+'" stroke-width="3" stroke-linejoin="round"/><path d="M24 19v24" stroke="#fde047" stroke-width="5"/><path d="M24 19c-6 0-10-2-10-6a4.500 4.500 0 0 1 8-2.500c1.500 2 2 5 2 8.500zM24 19c6 0 10-2 10-6a4.500 4.500 0 0 0-8-2.500c-1.500 2-2 5-2 8.500z" fill="#fde047" stroke="#b45309" stroke-width="2.500" stroke-linejoin="round"/>',
 login:'<circle cx="24" cy="24" r="19" fill="#22c55e" stroke="'+O+'" stroke-width="3"/><path d="M12 24h19M23 15l9 9-9 9" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>',
 menu:'<rect x="6" y="9" width="36" height="8" rx="4" fill="#f472b6" stroke="'+O+'" stroke-width="2.500"/><rect x="6" y="20" width="36" height="8" rx="4" fill="#fbbf24" stroke="'+O+'" stroke-width="2.500"/><rect x="6" y="31" width="24" height="8" rx="4" fill="#2dd4bf" stroke="'+O+'" stroke-width="2.500"/>',
 user:'<circle cx="24" cy="24" r="19" fill="#fb923c" stroke="'+O+'" stroke-width="3"/><circle cx="24" cy="19" r="7" fill="#fff7ed" stroke="'+O+'" stroke-width="2.500"/><path d="M10.500 38c2-7 7-10 13.500-10s11.500 3 13.500 10" fill="#fff7ed" stroke="'+O+'" stroke-width="2.500" stroke-linejoin="round"/>',
 chev:'<path d="M30 8L14 24l16 16" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>'
};
const svg=(n,c)=>'<svg class="ic'+(c?' '+c:'')+'" viewBox="0 0 48 48" aria-hidden="true">'+P[n]+'</svg>';
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

