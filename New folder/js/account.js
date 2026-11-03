// Username + password account on top of the existing progress (S). Guests keep using the old save-code backup.
(function(){
const K='tk_acc';let A=null;try{A=JSON.parse(localStorage.getItem(K)||'null')}catch(e){}
const api=(a,b)=>fetch('/api/account',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.assign({a},b))}).then(r=>r.json()).catch(()=>({ok:false,msg:'تأكد من الاتصال بالإنترنت'}));
const setA=v=>{A=v;try{v?localStorage.setItem(K,JSON.stringify(v)):localStorage.removeItem(K)}catch(e){}label()};
function label(){const b=document.getElementById('accBtn');if(b)b.textContent=A?'👤 '+A.u:'🔐 حسابي'}
const score=o=>Object.values(o.stars||{}).reduce((a,b)=>a+(+b||0),0)*10+Object.keys(o.claimed||{}).length*10+(o.races||0);
function merge(l,r){if(!r)return l;const rb=score(r)>=score(l),b=rb?r:l,o=rb?l:r,m=Object.assign(def(),b);
 m.stars=Object.assign({},o.stars);for(const k in b.stars)m.stars[k]=Math.max(+b.stars[k]||0,+(o.stars||{})[k]||0);
 m.claimed=Object.assign({},o.claimed,b.claimed);m.ach=Object.assign({},o.ach,b.ach);m.cars=[...new Set([...(b.cars||[]),...(o.cars||[])])];delete m.sid;return m}
// Logged-in sync replaces the anonymous one; offline failures retry on the next change / when back online.
const _sn=syncNow;
syncNow=async function(){if(!A)return _sn();if(syncBusy||!navigator.onLine||!location.protocol.startsWith('http'))return;syncBusy=1;
 try{const j=await api('save',{u:A.u,tok:A.tok,d:slim()});if(j.ok){S.sync=Date.now();svLocal()}else if(j.code===401){setA(null)}}catch(e){}syncBusy=0};
function done(j,u){setA({u,tok:j.tok});S=Object.assign(def(),merge(S,j.d),{v:1});svLocal();location.reload()}
window.openAccount=function(){
 if(A){const o=modal('<b class="mdl-t">👤 '+A.u+'</b><small>'+(S.sync?'آخر حفظ: '+new Date(S.sync).toLocaleString('ar-EG'):'سيتم الحفظ تلقائيًا')+'</small><button class="btn g" id="aS">🔄 احفظ الآن</button><button class="btn p" id="aO">🚪 تسجيل الخروج</button><button class="btn s o" id="aC">🎟️ كود الحفظ القديم</button><button class="btn s" id="aD" style="background:#b91c1c">🗑️ حذف الحساب</button><div id="aM" class="mdl-m"></div><button class="btn s" data-x>إغلاق</button>'),m=o.querySelector('#aM');
  o.querySelector('#aS').onclick=async()=>{m.textContent='جاري الحفظ...';await syncNow();m.textContent=S.sync?'تم الحفظ ✓':'تعذر الحفظ الآن'};
  o.querySelector('#aO').onclick=async()=>{await api('logout',{u:A.u,tok:A.tok});setA(null);location.reload()};
  o.querySelector('#aC').onclick=()=>{o.remove();openSaveBox()};
  o.querySelector('#aD').onclick=async()=>{if(!confirm('سيتم حذف الحساب وتقدّمه المحفوظ على الإنترنت نهائيًا. متابعة؟'))return;const j=await api('del',{u:A.u,tok:A.tok});if(j.ok){setA(null);o.remove()}else m.textContent=j.msg||'تعذر الحذف'};return}
 const o=modal('<b class="mdl-t">🔐 حسابي</b><p>سجّل حسابًا لتحفظ تقدّمك وتلعب من أي جهاز.</p><input id="aU" dir="auto" autocomplete="username" placeholder="اسم المستخدم"><input id="aP" type="password" autocomplete="current-password" placeholder="كلمة المرور"><button class="btn g" id="aL">دخول</button><button class="btn p" id="aR">حساب جديد</button><button class="btn s o" id="aF">نسيت كلمة المرور؟</button><div id="aM" class="mdl-m"></div><button class="btn s" data-x>العب كضيف</button>'),m=o.querySelector('#aM'),v=i=>o.querySelector(i).value.trim();
 const run=async(a,x)=>{if(!navigator.onLine){m.textContent='تحتاج إنترنت لتسجيل الدخول';return}m.textContent='جاري التنفيذ...';return api(a,x)};
 o.querySelector('#aL').onclick=async()=>{const u=v('#aU').toLowerCase(),j=await run('login',{u,p:o.querySelector('#aP').value});if(!j)return;if(j.ok)done(j,u);else m.textContent=j.msg};
 o.querySelector('#aR').onclick=async()=>{const u=v('#aU').toLowerCase(),j=await run('register',{u,p:o.querySelector('#aP').value,d:slim()});if(!j)return;if(!j.ok){m.textContent=j.msg;return}
  setA({u,tok:j.tok});o.remove();modal('<b class="mdl-t">✅ تم إنشاء الحساب</b><p>اكتب كود الاسترجاع ده في مكان آمن. هتحتاجه لو نسيت كلمة المرور، ولن يظهر مرة أخرى.</p><div class="mdl-code" dir="ltr">'+j.rc+'</div><button class="btn g" data-x>حفظته</button>')};
 o.querySelector('#aF').onclick=()=>{const q=modal('<b class="mdl-t">استرجاع الحساب</b><input id="rU" dir="auto" placeholder="اسم المستخدم"><input id="rC" dir="ltr" placeholder="كود الاسترجاع"><input id="rP" type="password" placeholder="كلمة مرور جديدة"><button class="btn g" id="rG">تغيير كلمة المرور</button><div id="rM" class="mdl-m"></div><button class="btn s" data-x>إغلاق</button>');
  q.querySelector('#rG').onclick=async()=>{const u=q.querySelector('#rU').value.trim().toLowerCase(),j=await api('reset',{u,rc:q.querySelector('#rC').value,p:q.querySelector('#rP').value});if(j.ok){alert('كود الاسترجاع الجديد (احتفظ به): '+j.rc);done(j,u)}else q.querySelector('#rM').textContent=j.msg}}};
label();
})();
