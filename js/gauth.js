// Google sign-in via Supabase. The only login method.
(function(){
const U='https://xeaaupzfmpydcdsepneq.supabase.co',KEY='sb_publishable_5aEyfa5IylaUxdnp62OD_w_UGasTs9P',K='tk_g';
const E=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c]);
let G=null;try{G=JSON.parse(localStorage.getItem(K)||'null')}catch(e){}
const setG=v=>{G=v;try{v?localStorage.setItem(K,JSON.stringify(v)):localStorage.removeItem(K)}catch(e){}lab()};
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
syncNow=async function(){if(!G)return _s();if(syncBusy||!navigator.onLine||!location.protocol.startsWith('http'))return;syncBusy=1;
 try{if(await push(slim())){S.sync=Date.now();svLocal()}}catch(e){}syncBusy=0};
const GL='<svg width="22" height="22" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.5-4.1 7-10.2 7-17.6z"/><path fill="#FBBC05" d="M10.5 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7l-7.9-6.1A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.8l7.9-6.1z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.3 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"/></svg>';
const gbtn=()=>'<button class="g-btn" id="gGo" type="button">'+GL+'<span>الدخول بحساب Google</span></button>';
function lab(){const b=document.getElementById('accBtn');if(b)b.innerHTML=G?'<span>👤</span><small>'+E((G.email||'حسابي').split('@')[0].slice(0,10))+'</small>':'<span>🔐</span><small>دخول</small>'}
function gacct(){const m=modal('<div class="g-ic">👤</div><b class="mdl-t">'+E(G.email||'Google')+'</b><small>تقدّمك بيتحفظ تلقائيًا على حسابك.</small><button class="btn g" id="gS">🔄 احفظ الآن</button><button class="btn p" id="gO">🚪 تسجيل الخروج</button><div id="gM" class="mdl-m"></div><button class="btn s" data-x>إغلاق</button>'),t=m.querySelector('#gM');
 m.querySelector('#gS').onclick=async()=>{t.textContent='جاري الحفظ...';await syncNow();t.textContent=S.sync?'تم الحفظ ✓':'تعذر الحفظ الآن'};
 m.querySelector('#gO').onclick=()=>{setG(null);location.reload()}}
function glogin(why){const m=modal('<div class="g-ic">🏎️</div><b class="mdl-t">'+(why==='nudge'?'برافو! احفظ تقدّمك ⭐':'سجّل دخولك')+'</b><p>سجّل بحساب Google علشان نجومك وعملاتك وسياراتك تفضل محفوظة وتلعب من أي جهاز.</p>'+gbtn()+'<button class="btn s" data-x>لاحقًا</button>');
 m.querySelector('#gGo').onclick=window.tkGoogleLogin}
window.openAccount=function(){if(G)gacct();else glogin()};
// guests play first; after the first finished level (and every 2 days after) we offer Google sign-in
function nudge(){if(G||(S.accAsk&&Date.now()-S.accAsk<2*864e5)||typeof tot!=='function'||tot()<1||document.querySelector('.mdl'))return;S.accAsk=Date.now();sv();glogin('nudge')}
const _sw=show;show=function(id){_sw(id);if(id==='res')setTimeout(nudge,1500)};
back();lab();setTimeout(lab,1500);
})();
