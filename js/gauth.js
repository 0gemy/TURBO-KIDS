// Google sign-in via Supabase (additive). Old username/password accounts keep working untouched.
(function(){
const U='https://xeaaupzfmpydcdsepneq.supabase.co',KEY='sb_publishable_5aEyfa5IylaUxdnp62OD_w_UGasTs9P',K='tk_g';
const E=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c]);
let G=null;try{G=JSON.parse(localStorage.getItem(K)||'null')}catch(e){}
const setG=v=>{G=v;try{v?localStorage.setItem(K,JSON.stringify(v)):localStorage.removeItem(K)}catch(e){}lab()};
const hasA=()=>{try{return!!JSON.parse(localStorage.getItem('tk_acc')||'null')}catch(e){return 0}};
function lab(){const b=document.getElementById('accBtn');if(b&&G&&!hasA())b.textContent='👤 '+(G.email||'Google').split('@')[0]}
const hd=t=>({apikey:KEY,Authorization:'Bearer '+(t||KEY),'Content-Type':'application/json'});
async function fresh(){if(!G)return null;if(G.exp-Date.now()>6e4)return G.at;
 try{const r=await fetch(U+'/auth/v1/token?grant_type=refresh_token',{method:'POST',headers:hd(),body:JSON.stringify({refresh_token:G.rt})});const j=await r.json();
  if(j.access_token){setG(Object.assign({},G,{at:j.access_token,rt:j.refresh_token||G.rt,exp:Date.now()+(j.expires_in||3600)*1e3}));return G.at}
  if(r.status===400||r.status===401)setG(null)}catch(e){}return null}
async function pull(){const t=await fresh();if(!t)return null;
 try{const r=await fetch(U+'/rest/v1/players?select=data&id=eq.'+G.id,{headers:hd(t)});if(!r.ok)return null;const a=await r.json();return a[0]?a[0].data||{}:{}}catch(e){return null}}
async function push(d){const t=await fresh();if(!t)return false;
 try{const r=await fetch(U+'/rest/v1/players?on_conflict=id',{method:'POST',headers:Object.assign(hd(t),{Prefer:'resolution=merge-duplicates,return=minimal'}),body:JSON.stringify({id:G.id,email:G.email,data:d,updated_at:new Date().toISOString()})});return r.ok}catch(e){return false}}
const mg=(l,r)=>window._tkMerge?window._tkMerge(l,r):l;
// finish a Google redirect (tokens arrive in the URL hash)
async function back(){const h=location.hash;if(h.indexOf('access_token=')<0)return;
 const p=new URLSearchParams(h.slice(1));history.replaceState(null,'',location.pathname+location.search);
 const at=p.get('access_token');if(!at)return;
 try{const r=await fetch(U+'/auth/v1/user',{headers:hd(at)});const u=await r.json();if(!u.id)return;
  setG({id:u.id,email:u.email,at,rt:p.get('refresh_token'),exp:Date.now()+(+p.get('expires_in')||3600)*1e3});
  const d=await pull();if(d&&Object.keys(d).length){S=Object.assign(def(),mg(S,d),{v:1});svLocal()}
  await push(slim());location.reload()}catch(e){}}
window.tkGoogleLogin=()=>{location.href=U+'/auth/v1/authorize?provider=google&redirect_to='+encodeURIComponent(location.origin+'/')};
const _s=syncNow;
syncNow=async function(){if(!G||hasA())return _s();if(syncBusy||!navigator.onLine||!location.protocol.startsWith('http'))return;syncBusy=1;
 try{if(await push(slim())){S.sync=Date.now();svLocal()}}catch(e){}syncBusy=0};
const gbtn=()=>{const b=document.createElement('button');b.className='btn s';b.id='gBtn';b.type='button';b.style.cssText='background:#fff;color:#222;margin:6px 0;width:100%';b.textContent='🔵 الدخول بحساب Google';b.onclick=window.tkGoogleLogin;return b};
function gacct(){const m=modal('<b class="mdl-t">👤 '+E(G.email||'Google')+'</b><small>حسابك على Google. بيتحفظ تقدّمك تلقائيًا.</small><button class="btn g" id="gS">🔄 احفظ الآن</button><button class="btn s o" id="gL">🔗 اربط حسابي القديم (اسم مستخدم)</button><button class="btn p" id="gO">🚪 تسجيل الخروج</button><div id="gM" class="mdl-m"></div><button class="btn s" data-x>إغلاق</button>'),t=m.querySelector('#gM');
 m.querySelector('#gS').onclick=async()=>{t.textContent='جاري الحفظ...';await syncNow();t.textContent=S.sync?'تم الحفظ ✓':'تعذر الحفظ الآن'};
 m.querySelector('#gO').onclick=()=>{setG(null);location.reload()};
 m.querySelector('#gL').onclick=()=>{m.querySelector('.mdl').innerHTML='<b class="mdl-t">🔗 ربط الحساب القديم</b><p>اكتب اسم المستخدم وكلمة المرور القديمين. هننسخ تقدّمك لحساب Google، والحساب القديم يفضل زي ما هو.</p><label class="acc-f"><div class="acc-i"><input id="lU" dir="auto" placeholder="اسم المستخدم" autocomplete="username"></div></label><label class="acc-f"><div class="acc-i"><input id="lP" type="password" placeholder="كلمة المرور" autocomplete="current-password"></div></label><div id="lM" class="mdl-m"></div><button class="btn g" id="lD">ربط</button><button class="btn s" data-x>إلغاء</button>';
  const q=x=>m.querySelector(x);q('#lD').onclick=async()=>{const u=q('#lU').value.trim().toLowerCase(),p=q('#lP').value,o=q('#lM');if(!u||!p){o.textContent='اكتب الاسم وكلمة المرور';return}
   o.textContent='جاري الربط...';try{const r=await fetch('/api/account',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({a:'login',u,p})}),j=await r.json();
    if(!j.ok){o.textContent=j.code==='badpass'?'كلمة المرور غير صحيحة':j.code==='nouser'?'الاسم ده مش مسجّل':(j.msg||'تعذر الربط');return}
    S=Object.assign(def(),mg(S,j.d),{v:1});svLocal();if(await push(slim())){o.textContent='تم الربط ✓ جاري التحميل...';setTimeout(()=>location.reload(),700)}else o.textContent='تعذر الحفظ على Google، جرّب تاني'}catch(e){o.textContent='مشكلة اتصال'}}}}
const _o=window.openAccount;
window.openAccount=function(v,pre){if(G&&!hasA())return gacct();_o(v,pre);if(hasA())return;
 const V=document.getElementById('aV');if(!V)return;const add=()=>{if(V.querySelector('#gBtn'))return;const c=V.querySelector('.acc-choice')||V.querySelector('[data-do]');if(c&&c.parentNode)c.parentNode.insertBefore(gbtn(),c.tagName==='DIV'?c.nextSibling:c)};
 add();new MutationObserver(add).observe(V,{childList:true})};
back();lab();setTimeout(lab,1500);
})();
