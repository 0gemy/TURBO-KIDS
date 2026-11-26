// UX layer: first-run tour, practice mode, hints, offline badge, offline audio.
(function(){
const $$=i=>document.getElementById(i);let wr=0;
const toast=h=>cel(h,2400,0);
// wrong answers: practice mode keeps hearts; two misses in a row replay the sound with an encouraging hint
function hint(){wr=0;setTimeout(()=>{try{replay()}catch(e){}},1600);toast('خد نفَس وركّز... اسمع تاني 🔊')}
const _lh=loseHeart;loseHeart=function(r){wr++;if(S.practice){msg('🔁 '+r+' — جرّب تاني');if(wr>=2)hint();return}_lh(r);if(wr>=2&&lives>0)hint()};
const _pf=window.petFood;window.petFood=function(n){_pf(n);wr=0};
// practice-mode switch in settings
const _tg=tg;tg=function(){_tg();const a=$$('s9');if(!a)return;let b=$$('s10');if(!b){b=document.createElement('button');b.id='s10';b.className='btn';a.after(b)}
 b.textContent='🧘 وضع التدريب (بدون فقدان قلوب): '+(S.practice?'يعمل':'متوقف');b.onclick=()=>{S.practice=S.practice?0:1;sv();tg()}};
// first-run tour (once)
const T=['أهلاً بك في TURBO KIDS! هنلعب ونتعلم مع بعض 🏎️','١) اسمع الحرف أو الكلمة 🔊','٢) وجّه السيارة بالأسهم ◀ ▶ نحو البوابة الصحيحة','٣) كل إجابة صح تجيب عملات ونقاط ترفع مستواك ⭐'];
function tour(){if(S.tour)return;let i=0;const o=modal('<div id="tB"></div>'),B=o.querySelector('#tB');
 const draw=()=>{B.innerHTML='<div style="font-size:64px">🏎️</div><p style="font-size:18px">'+T[i]+'</p><button class="btn g" id="tN">'+(i<T.length-1?'التالي':'يلا نبدأ!')+'</button><button class="btn s" id="tS">تخطّي</button>'};
 const end=()=>{S.tour=1;sv();o.remove()};
 B.onclick=e=>{if(e.target.closest('#tS'))end();else if(e.target.closest('#tN')){if(++i>=T.length)end();else draw()}};draw()}
S.seen=S.seen||1;setTimeout(tour,2200);
// offline badge
const ob=document.createElement('div');ob.id='offB';ob.textContent='📴 أوفلاين — بتلعب بآخر نسخة محمّلة';document.body.appendChild(ob);
const up=()=>{ob.style.display=navigator.onLine?'none':'block'};addEventListener('online',up);addEventListener('offline',up);up();
// download letter/word sounds in the background once so they also work offline (sounds themselves are unchanged)
async function pre(){try{if(!navigator.serviceWorker||!navigator.serviceWorker.controller||!navigator.onLine||(navigator.connection&&navigator.connection.saveData))return;
 const k=String(LV.length);if(localStorage.getItem('tk_aud')===k)return;const set=new Set();
 LV.forEach(l=>{try{qsAr(l).forEach(q=>{if(q.a&&q.lang!=='en')set.add(q.a)})}catch(e){}});
 for(const u of set){if(!navigator.onLine)return;try{await (await fetch(u)).arrayBuffer()}catch(e){}await new Promise(r=>setTimeout(r,40))}
 localStorage.setItem('tk_aud',k)}catch(e){}}
setTimeout(pre,15000);
})();
// ---- batch 2: hard letters on results, weekly mission, quality mode, font size ----
(function(){
const $$=i=>document.getElementById(i);let hard={};
const _sl=startLevel;startLevel=function(i){hard={};_sl(i)};
const _lh=loseHeart;loseHeart=function(r){try{if(Q&&Q.t)hard[Q.t]=1}catch(e){}_lh(r)};
const _sw=show;show=function(id){_sw(id);if(id!=='res')return;try{if(lives>0&&asked>0)petXp(30);const ks=Object.keys(hard),rb=$$('rb');
 if(rb&&ks.length&&lives>0)rb.insertAdjacentHTML('beforeend','<div class="res-hard"><p>🎯 الحروف اللي محتاجة تدريب:</p>'+ks.map(k=>'<span class="rp-chip" dir="auto">'+k.replace(/</g,'')+'</span>').join('')+'<button class="btn g" onclick="startLevel(cur)">🔁 تدرّب عليها</button></div>')}catch(e){}};
// quality mode (auto for weak devices) + font size
const low=()=>S.lq!==undefined?!!S.lq:!!((navigator.deviceMemory&&navigator.deviceMemory<=2)||(navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=4));
function applyQ(){try{const l=low();if(typeof R!=='undefined'&&R&&R.setPixelRatio)R.setPixelRatio(l?1:Math.min(devicePixelRatio,1.75));if(typeof garageRenderer!=='undefined'&&garageRenderer&&garageRenderer.setPixelRatio)garageRenderer.setPixelRatio(l?1:Math.min(devicePixelRatio||1,1.5));document.documentElement.classList.toggle('lq',l);dispatchEvent(new Event('resize'))}catch(e){}}
const FZ=[1,1.12,1.25],fz=()=>document.documentElement.style.setProperty('--fz',S.fz||1);
const _tg=tg;tg=function(){_tg();const a=$$('s10')||$$('s9');if(!a)return;let q=$$('s11'),f=$$('s12');
 if(!q){q=document.createElement('button');q.id='s11';q.className='btn';a.after(q);f=document.createElement('button');f.id='s12';f.className='btn';q.after(f)}
 q.textContent='⚡ الجودة: '+(S.lq===undefined?'تلقائي ('+(low()?'منخفضة':'عالية')+')':S.lq?'منخفضة':'عالية');q.onclick=()=>{S.lq=S.lq===undefined?1:S.lq?0:undefined;sv();applyQ();tg()};
 f.textContent='🔠 حجم الخط: '+Math.round((S.fz||1)*100)+'%';f.onclick=()=>{S.fz=FZ[(FZ.indexOf(S.fz||1)+1)%3];sv();fz();tg()}};
setTimeout(applyQ,1500);fz();
})();
