// UX layer: first-run tour, practice mode, hints, daily mission, panda in race, offline badge, offline audio.
(function(){
const $$=i=>document.getElementById(i);let wr=0;
const toast=h=>cel(h,2400,0);
// panda companion inside the race HUD
const pr=document.createElement('div');pr.id='petRace';$$('hud').appendChild(pr);let rk='';
function race(hop){if(!window.petSvg)return;const w=(S.pet&&S.pet.w)||[],k=w.join();if(k!==rk){rk=k;pr.innerHTML=petSvg('happy',w)}if(hop){pr.classList.remove('pet-hop');void pr.offsetWidth;pr.classList.add('pet-hop')}}
// wrong answers: practice mode keeps hearts; two misses in a row replay the sound with an encouraging hint
function hint(){wr=0;setTimeout(()=>{try{replay()}catch(e){}},1600);toast('🐼 خد نفَس وركّز... اسمع تاني 🔊')}
const _lh=loseHeart;loseHeart=function(r){wr++;if(S.practice){msg('🔁 '+r+' — جرّب تاني');if(wr>=2)hint();return}_lh(r);if(wr>=2&&lives>0)hint()};
// correct answers: panda cheers + daily mission counter
const _pf=window.petFood;window.petFood=function(n){_pf(n);wr=0;dm().n++;race(1)};
function dm(){const d=new Date().toDateString();if(!S.dm||S.dm.d!==d)S.dm={d,n:0,c:0};return S.dm}
function chip(){let e=$$('dmChip');if(!e){const a=$$('petHome');if(!a)return;e=document.createElement('div');e.id='dmChip';a.after(e);
 e.onclick=()=>{const m=dm();if(m.n>=10&&!m.c){m.c=1;S.coins+=25;sv();hud();toast('🎉 أنجزت مهمة اليوم! +25 عملة')}}}
 const m=dm();e.className='dm-chip'+(m.n>=10&&!m.c?' rdy':'');e.textContent=m.c?'✅ مهمة اليوم تمّت':m.n>=10?'🎁 استلم مكافأة المهمة (+25)':'🎯 مهمة اليوم: '+Math.min(m.n,10)+'/10 إجابات صحيحة'}
function lvl(){let e=$$('lvChip');if(!e){const a=$$('dmChip');if(!a)return;e=document.createElement('div');e.id='lvChip';e.className='dm-chip';a.after(e)}
 const t=typeof tot==='function'?tot():0,L=1+Math.floor(t/8);e.textContent='🏅 المستوى '+L+' · '+(t%8)+'/8 نجوم للمستوى التالي'}
const _h=hud;hud=function(){_h();chip();lvl();race()};chip();lvl();race();
// practice-mode switch in settings
const _tg=tg;tg=function(){_tg();const a=$$('s9');if(!a)return;let b=$$('s10');if(!b){b=document.createElement('button');b.id='s10';b.className='btn';a.after(b)}
 b.textContent='🧘 وضع التدريب (بدون فقدان قلوب): '+(S.practice?'يعمل':'متوقف');b.onclick=()=>{S.practice=S.practice?0:1;sv();tg()}};
// first-run tour (once)
const T=['أهلاً! أنا باندا 🐼 هنلعب ونتعلم مع بعض.','١) اسمع الحرف أو الكلمة 🔊','٢) وجّه السيارة بالأسهم ◀ ▶ نحو البوابة الصحيحة','٣) كل إجابة صح تجيب عملات وخيزران أطعمني بيه 🎋'];
function tour(){if(S.tour)return;let i=0;const o=modal('<div id="tB"></div>'),B=o.querySelector('#tB');
 const draw=()=>{B.innerHTML='<div class="pet-big">'+(window.petSvg?petSvg('happy',[]):'')+'</div><p style="font-size:18px">'+T[i]+'</p><button class="btn g" id="tN">'+(i<T.length-1?'التالي':'يلا نبدأ!')+'</button><button class="btn s" id="tS">تخطّي</button>'};
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
