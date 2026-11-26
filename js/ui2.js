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


// ---------- modern home screen: one consistent SVG icon set (replaces emoji icons) ----------
(function(){
const P={
 gem:'<path d="M6 3h12l4 6-10 12L2 9z"/><path d="M2 9h20M9 3l-2 6 5 12 5-12-2-6"/>',
 star:'<path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z"/>',
 medal:'<circle cx="12" cy="9" r="6"/><path d="M8.5 14L7 22l5-3 5 3-1.5-8"/>',
 play:'<path d="M7 4.5v15l13-7.5z" fill="currentColor"/>',
 car:'<path d="M5 17H3v-5l2-5.5A2 2 0 0 1 6.9 5h10.2a2 2 0 0 1 1.9 1.5L21 12v5h-2"/><path d="M3 12h18"/><circle cx="7.5" cy="17" r="2"/><circle cx="16.5" cy="17" r="2"/><path d="M9.5 17h5"/>',
 road:'<path d="M8 3L4 21M16 3l4 18M12 4v3M12 10.5v3M12 17v3"/>',
 globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18"/>',
 pad:'<path d="M6 8h12a4 4 0 0 1 3.9 4.9l-.8 3.6a2.3 2.3 0 0 1-4 1L15 15H9l-2.1 2.5a2.3 2.3 0 0 1-4-1l-.8-3.6A4 4 0 0 1 6 8z"/><path d="M8 10.5v3M6.5 12h3"/><circle cx="15.5" cy="11" r=".7" fill="currentColor"/><circle cx="17.5" cy="13" r=".7" fill="currentColor"/>',
 gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M5 12v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8"/><path d="M12 8C9 8 7 6.8 7 5.3A2.3 2.3 0 0 1 9.3 3C11 3 12 5 12 8zM12 8c3 0 5-1.2 5-2.7A2.3 2.3 0 0 0 14.7 3C13 3 12 5 12 8z"/>',
 login:'<path d="M15 3h3a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3h-3"/><path d="M10 17l5-5-5-5M15 12H3"/>',
 menu:'<path d="M4 7h16M4 12h16M4 17h10"/>',
 user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
 chev:'<path d="M15 5l-7 7 7 7"/>'
};
const svg=(n,c)=>'<svg class="ic'+(c?' '+c:'')+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+P[n]+'</svg>';
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
