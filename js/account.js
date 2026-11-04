// Account system (username + password) on top of S. Separate login / register screens, clear inline errors, gentle sign-up nudge.
(function(){
const K='tk_acc',NAME=/^[a-z0-9_\u0621-\u064A]{3,20}$/i;
const E=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c]);
let A=null;try{A=JSON.parse(localStorage.getItem(K)||'null')}catch(e){}
const api=(a,b)=>!navigator.onLine?Promise.resolve({ok:false,code:'offline',msg:'مفيش اتصال بالإنترنت. اتأكد من النت وجرّب تاني.'}):
 fetch('/api/account',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.assign({a},b))}).then(r=>r.json()).catch(()=>({ok:false,code:'net',msg:'حصلت مشكلة في الاتصال بالخادم. جرّب بعد قليل.'}));
const setA=v=>{A=v;try{v?localStorage.setItem(K,JSON.stringify(v)):localStorage.removeItem(K)}catch(e){}label()};
function label(){const b=document.getElementById('accBtn');if(b)b.textContent=A?'👤 '+A.u:'🔐 حسابي'}
const score=o=>Object.values(o.stars||{}).reduce((a,b)=>a+(+b||0),0)*10+Object.keys(o.claimed||{}).length*10+(o.races||0);
function merge(l,r){if(!r)return l;const rb=score(r)>=score(l),b=rb?r:l,o=rb?l:r,m=Object.assign(def(),b);
 m.stars=Object.assign({},o.stars);for(const k in b.stars)m.stars[k]=Math.max(+b.stars[k]||0,+(o.stars||{})[k]||0);
 m.claimed=Object.assign({},o.claimed,b.claimed);m.ach=Object.assign({},o.ach,b.ach);m.cars=[...new Set([...(b.cars||[]),...(o.cars||[])])];m.ownL=[...new Set([...(b.ownL||[]),...(o.ownL||[])])];m.lb=b.lb||o.lb;
 m.wheel=((b.wheel||{}).ts||0)>=((o.wheel||{}).ts||0)?b.wheel:o.wheel;m.bx=((b.bx||{}).ts||0)>=((o.bx||{}).ts||0)?b.bx:o.bx;m.pet=mp(b.pet,o.pet);delete m.sid;return m}
function mp(a,b){if(!a||!b)return a||b;const sc=x=>(x.lv||1)*1e6+(x.xp||0),x=sc(a)>=sc(b)?a:b,y=x===a?b:a,m=Object.assign({},x);
 m.own=[...new Set([...(a.own||[]),...(b.own||[])])];m.inv=Object.assign({},y.inv);for(const k in x.inv)m.inv[k]=Math.max(+x.inv[k]||0,+(y.inv||{})[k]||0);return m}
const _sn=syncNow;
syncNow=async function(){if(!A)return _sn();if(syncBusy||!navigator.onLine||!location.protocol.startsWith('http'))return;syncBusy=1;
 try{const j=await api('save',{u:A.u,tok:A.tok,d:slim()});if(j.ok){S.sync=Date.now();svLocal()}else if(j.code===401){setA(null)}}catch(e){}syncBusy=0};
function apply(j){S=Object.assign(def(),merge(S,j.d),{v:1});svLocal()}
// ---------- UI ----------
let o,V,cur;
const fld=(id,l,t,ph,at,hint)=>'<label class="acc-f"><span>'+l+'</span><div class="acc-i"><input id="'+id+'" type="'+t+'" dir="auto" placeholder="'+ph+'" '+(at||'')+'>'+(t==='password'?'<button type="button" class="acc-eye" data-eye="'+id+'" aria-label="إظهار أو إخفاء كلمة المرور">👁</button>':'')+'</div>'+(hint?'<small class="acc-h">'+hint+'</small>':'')+'<small class="acc-e" id="'+id+'E" role="alert"></small></label>';
const back='<button class="acc-back" data-go="home">→ رجوع</button>';
function show(v,pre){cur=v;pre=pre||{};const pet=window.petSvg?'<div class="acc-pet">'+petSvg('happy',(S.pet&&S.pet.w)||[])+'</div>':'';let h='';
 if(v==='home')h=pet+'<b class="mdl-t">أهلًا بك! 👋</b><p>سجّل حسابك لتحفظ نجومك وتلعب من أي جهاز.</p><div class="acc-choice"><button class="btn g" data-go="login">🔑 تسجيل الدخول</button><button class="btn p" data-go="reg">✨ إنشاء حساب جديد</button><button class="btn s" data-x>العب كضيف</button></div>';
 else if(v==='login')h=back+'<b class="mdl-t">🔑 تسجيل الدخول</b>'+fld('aU','اسم المستخدم','text','اكتب اسم المستخدم','autocomplete="username"')+fld('aP','كلمة المرور','password','اكتب كلمة المرور','autocomplete="current-password"')+'<div id="aG"></div><button class="btn g" data-do="login">دخول</button><div class="acc-sw">مفيش عندك حساب؟ <button data-go="reg">أنشئ حساب جديد</button></div><div class="acc-sw"><button data-go="forgot">نسيت كلمة المرور؟</button></div>';
 else if(v==='reg')h=back+'<b class="mdl-t">✨ إنشاء حساب جديد</b>'+fld('aU','اختر اسم مستخدم','text','مثال: بطل_السباق','autocomplete="username"','3 إلى 20 حرفًا: حروف وأرقام و _ (بدون مسافات)')+fld('aP','اختر كلمة مرور','password','4 حروف أو أرقام على الأقل','autocomplete="new-password"')+'<div id="aG"></div><button class="btn g" data-do="reg">إنشاء الحساب</button><div class="acc-sw">عندك حساب؟ <button data-go="login">سجّل دخول</button></div>';
 else if(v==='forgot')h='<button class="acc-back" data-go="login">→ رجوع</button><b class="mdl-t">استرجاع الحساب</b>'+fld('aU','اسم المستخدم','text','اسم المستخدم')+fld('rC','كود الاسترجاع','text','الكود اللي ظهر وقت إنشاء الحساب','dir="ltr" autocapitalize="characters"')+fld('aP','كلمة المرور الجديدة','password','4 حروف أو أرقام على الأقل','autocomplete="new-password"')+'<div id="aG"></div><button class="btn g" data-do="forgot">تغيير كلمة المرور</button>';
 V.innerHTML=h;if(pre.u&&V.querySelector('#aU'))V.querySelector('#aU').value=pre.u;
 const i=[...V.querySelectorAll('input')].find(x=>!x.value);if(i&&v!=='home')setTimeout(()=>i.focus(),50)}
const clr=()=>{V.querySelectorAll('.acc-e').forEach(x=>x.textContent='');V.querySelectorAll('.acc-f').forEach(x=>x.classList.remove('bad'));const g=V.querySelector('#aG');if(g)g.innerHTML=''};
const fe=(id,m)=>{const i=V.querySelector('#'+id);i.closest('.acc-f').classList.add('bad');V.querySelector('#'+id+'E').textContent=m;i.focus();return 0};
const ge=(h,k)=>{V.querySelector('#aG').innerHTML='<div class="acc-g '+(k||'err')+'" role="alert">'+h+'</div>'};
const busy=on=>{const b=V.querySelector('[data-do]');if(!b)return;if(on){b.dataset.t=b.textContent;b.textContent='جاري التنفيذ...';b.disabled=true}else{b.textContent=b.dataset.t||b.textContent;b.disabled=false}};
function check(){const u=V.querySelector('#aU').value.trim().toLowerCase(),p=V.querySelector('#aP').value;
 if(!u)return fe('aU','اكتب اسم المستخدم');if(!NAME.test(u))return fe('aU','الاسم لازم يكون من 3 إلى 20 حرفًا: حروف وأرقام و _ فقط، من غير مسافات');
 if(!p)return fe('aP','اكتب كلمة المرور');if(cur!=='login'&&p.length<4)return fe('aP','كلمة المرور لازم تكون 4 حروف أو أرقام على الأقل');return{u,p}}
function recovery(rc,reload){V.innerHTML='<b class="mdl-t">✅ تم بنجاح</b><p>اكتب كود الاسترجاع ده في مكان آمن. هتحتاجه لو نسيت كلمة المرور، ولن يظهر مرة أخرى.</p><div class="mdl-code" dir="ltr">'+rc+'</div><button class="btn s o" data-copy="'+rc+'">📋 انسخ الكود</button><button class="btn g" '+(reload?'data-reload':'data-x')+'>حفظته، يلا نلعب</button>'}
async function run(k){clr();const c=check();if(!c)return;const{u,p}=c;
 if(k==='login'){busy(1);const j=await api('login',{u,p});busy(0);
  if(j.ok){setA({u,tok:j.tok});apply(j);ge('تم تسجيل الدخول ✓ جاري تحميل تقدمك...','ok');return setTimeout(()=>location.reload(),600)}
  if(j.code==='nouser')return ge('الاسم <b>'+E(u)+'</b> مش مسجّل عندنا. اتأكد من كتابته، أو أنشئ حسابًا جديدًا. <button class="btn s o" data-go="reg" data-name="'+E(u)+'">أنشئ حساب بهذا الاسم</button>');
  if(j.code==='badpass')return fe('aP','كلمة المرور غير صحيحة. جرّب مرة أخرى، أو اضغط «نسيت كلمة المرور».');
  return ge(E(j.msg||'حصل خطأ، جرّب مرة أخرى'))}
 if(k==='reg'){busy(1);const j=await api('register',{u,p,d:slim()});busy(0);
  if(j.ok){setA({u,tok:j.tok});return recovery(j.rc)}
  if(j.code==='taken'){const n=()=>10+Math.floor(Math.random()*90);fe('aU','الاسم ده مستخدم قبل كده، اختر اسمًا آخر.');return ge('جرّب واحد من دول: <div class="acc-chips">'+[u+n(),u+'_'+(1+Math.floor(Math.random()*9)),n()+u].map(x=>'<button type="button" data-sug="'+E(x)+'">'+E(x)+'</button>').join('')+'</div>')}
  return ge(E(j.msg||'حصل خطأ، جرّب مرة أخرى'))}
 if(k==='forgot'){const rc=V.querySelector('#rC').value.trim();if(!rc)return fe('rC','اكتب كود الاسترجاع');busy(1);const j=await api('reset',{u,rc,p});busy(0);
  if(j.ok){setA({u,tok:j.tok});apply(j);return recovery(j.rc,1)}
  if(j.code==='nouser')return fe('aU','الاسم ده مش مسجّل عندنا.');if(j.code==='badrc')return fe('rC','كود الاسترجاع غير صحيح.');return ge(E(j.msg||'حصل خطأ، جرّب مرة أخرى'))}}
function acct(){const m=modal('<b class="mdl-t">👤 '+E(A.u)+'</b><small>'+(S.sync?'آخر حفظ: '+new Date(S.sync).toLocaleString('ar-EG'):'سيتم الحفظ تلقائيًا')+'</small><button class="btn g" id="aS">🔄 احفظ الآن</button><button class="btn p" id="aO">🚪 تسجيل الخروج</button><button class="btn s o" id="aC">🎟️ كود الحفظ القديم</button><button class="btn s" id="aD" style="background:#b91c1c">🗑️ حذف الحساب</button><div id="aM" class="mdl-m"></div><button class="btn s" data-x>إغلاق</button>'),t=m.querySelector('#aM');
 m.querySelector('#aS').onclick=async()=>{t.textContent='جاري الحفظ...';await syncNow();t.textContent=S.sync?'تم الحفظ ✓':'تعذر الحفظ الآن، هيتحفظ تلقائيًا لما النت يرجع'};
 m.querySelector('#aO').onclick=async()=>{await api('logout',{u:A.u,tok:A.tok});setA(null);location.reload()};
 m.querySelector('#aC').onclick=()=>{m.remove();openSaveBox()};
 m.querySelector('#aD').onclick=async()=>{if(!confirm('سيتم حذف الحساب وتقدّمه المحفوظ على الإنترنت نهائيًا. متابعة؟'))return;const j=await api('del',{u:A.u,tok:A.tok});if(j.ok){setA(null);m.remove()}else t.textContent=j.msg||'تعذر الحذف'}}
window.openAccount=function(v,pre){if(A)return acct();o=modal('<div id="aV"></div>');V=o.querySelector('#aV');
 V.onclick=ev=>{const t=ev.target,g=t.closest('[data-go]'),d=t.closest('[data-do]'),e=t.closest('[data-eye]'),s=t.closest('[data-sug]'),c=t.closest('[data-copy]');
  if(g)show(g.dataset.go,{u:g.dataset.name});else if(d)run(d.dataset.do);else if(e){const i=V.querySelector('#'+e.dataset.eye);i.type=i.type==='password'?'text':'password'}
  else if(s){V.querySelector('#aU').value=s.dataset.sug;clr()}else if(c){try{navigator.clipboard.writeText(c.dataset.copy);c.textContent='تم النسخ ✓'}catch(x){}}else if(t.closest('[data-reload]'))location.reload()};
 V.onkeydown=ev=>{if(ev.key==='Enter'&&ev.target.tagName==='INPUT'){const b=V.querySelector('[data-do]');b&&b.click()}};
 show(typeof v==='string'?v:'home',pre)};
// ---------- sign-up nudge after the first star ----------
function nudge(){if(A||(S.accAsk&&Date.now()-S.accAsk<2*864e5)||typeof tot!=='function'||tot()<1||document.querySelector('.mdl'))return;
 const m=modal((window.petSvg?'<div class="acc-pet">'+petSvg('happy',(S.pet&&S.pet.w)||[])+'</div>':'')+'<b class="mdl-t">برافو! كسبت نجومك ⭐</b><p>سجّل حسابك عشان ما يضيعش تقدّمك وتلعب من أي جهاز.</p><div class="acc-choice"><button class="btn g" id="nL">🔑 تسجيل الدخول</button><button class="btn p" id="nR">✨ إنشاء حساب جديد</button><button class="btn s" data-x>لاحقًا</button></div>');
 S.accAsk=Date.now();sv();m.querySelector('#nL').onclick=()=>{m.remove();openAccount('login')};m.querySelector('#nR').onclick=()=>{m.remove();openAccount('reg')}}
const _sw=show;show=function(id){_sw(id);if(id==='res')setTimeout(nudge,1500)};
label();
})();
