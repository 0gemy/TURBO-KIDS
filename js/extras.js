// Dust puffs behind the car, first-run tips, service worker registration.
(function(){
const gm=new THREE.SphereGeometry(.18,6,6),mt=new THREE.MeshLambertMaterial({color:0xe5e7eb}),P=[];let t0=0,ready=false;
function tick(t){requestAnimationFrame(tick);if(typeof sc==='undefined'||!sc||!carObj)return;
 if(!ready){ready=true;for(let i=0;i<14;i++){const m=new THREE.Mesh(gm,mt);m.visible=false;sc.add(m);P.push({m,l:0})}}
 const dt=Math.min((t-t0)/1000,.05);t0=t;const play=(mode=='play'||mode=='free')&&!paused&&state!='done';
 for(const p of P){if(p.l>0){p.l-=dt;p.m.position.y+=dt*.6;p.m.scale.setScalar(Math.max(.01,p.l/.6*1.2));if(p.l<=0)p.m.visible=false}
  else if(play&&Math.random()<dt*6){p.l=.6;p.m.visible=true;p.m.position.set(carObj.position.x+(Math.random()-.5)*1.2,.25,carObj.position.z+2.4)}}}
requestAnimationFrame(tick);
setTimeout(()=>{if(!S.seen){S.seen=1;sv();cel('👋 أهلاً بك!<br><small style="font-size:18px">١) اضغط «العب» ٢) اسمع الحرف ٣) وجّه السيارة نحو البوابة الصحيحة</small>',7000)}},2500);
if('serviceWorker' in navigator&&location.protocol.startsWith('http'))addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
})();

// Question audio repeats 3 times automatically.
(function(){let st=0,useT=false;
say=function(q){const tok=++st;try{speechSynthesis.cancel()}catch(e){}if(cur0){cur0.pause();cur0=null}busy=false;if(!S.set.L)return;
 let k=0;busy=true;
 const done=()=>{if(tok!==st)return;if(paused){busy=false;return}k++;if(k<3)setTimeout(()=>{if(tok===st)play()},700);else busy=false};
 const viaTTS=()=>{if(!window.speechSynthesis){done();return}try{const u=new SpeechSynthesisUtterance(q.sp||q.t+'\u060c '+(H[q.t]?H[q.t][0]:''));const en=q.lang==='en';u.lang=en?'en-US':'ar-SA';u.rate=en?.7:.6;const v=speechSynthesis.getVoices().find(v=>v.lang&&v.lang.toLowerCase().startsWith(en?'en':'ar'));if(v)u.voice=v;u.onend=u.onerror=done;speechSynthesis.speak(u)}catch(e){done()}};
 const play=()=>{if(useT||q.lang==='en')return viaTTS();let f=false;const a=new Audio(q.a);cur0=a;a.onended=done;const bad=()=>{if(f)return;f=true;useT=true;viaTTS()};a.onerror=bad;a.play().catch(bad)};
 play();setTimeout(()=>{if(tok===st)busy=false},12000)};
})();
// Avatar picker.
(function(){const AV=['\u{1F98A}','\u{1F43C}','\u{1F981}','\u{1F42F}','\u{1F438}','\u{1F984}','\u{1F436}','\u{1F431}','\u{1F430}','\u{1F43B}','\u{1F428}','\u{1F435}','\u{1F427}','\u{1F425}','\u{1F989}','\u{1F422}','\u{1F419}','\u{1F98B}','\u{1F42C}','\u{1F996}','\u{1F680}','\u2B50','\u{1F916}','\u{1F478}','\u{1F9B8}'];
function openAv(){const o=document.createElement('div');o.style.cssText='position:fixed;inset:0;z-index:20;background:rgba(16,39,68,.85);display:flex;align-items:center;justify-content:center;padding:16px';
 o.innerHTML='<div style="background:#fff;border-radius:24px;padding:16px;max-width:380px;width:100%;text-align:center"><b style="font:800 22px Cairo;color:#102744">\u0627\u062e\u062a\u0631 \u0634\u062e\u0635\u064a\u062a\u0643</b><div style="display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin-top:12px">'+AV.map(a=>'<button data-a="'+a+'" style="font-size:32px;border:3px solid '+(a==(S.av||AV[0])?'#FB923C':'transparent')+';background:#f1f5f9;border-radius:16px;padding:6px">'+a+'</button>').join('')+'</div></div>';
 o.onclick=ev=>{const b=ev.target.closest('button');if(b){S.av=b.dataset.a;sv();hud();tg()}if(b||ev.target===o)o.remove()};document.body.appendChild(o)}
const _tg=tg;tg=function(){_tg();$('s7').onclick=openAv};
})();
