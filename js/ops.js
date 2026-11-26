// Applies changes made by the owner from the admin dashboard (additive). Ops are queued server-side per player.
(function(){
const U='https://xeaaupzfmpydcdsepneq.supabase.co',KEY='sb_publishable_5aEyfa5IylaUxdnp62OD_w_UGasTs9P';
let busy=0;
const ids=a=>(typeof a!=='undefined'&&Array.isArray(a)?a.map(x=>x.id):[]);
const T=n=>{try{return eval(n)}catch(e){return undefined}};
const uniq=a=>[...new Set(a)];
function lvIds(){const o=[];try{LV.forEach(l=>o.push(l.id))}catch(e){}try{ENL.forEach((_,i)=>o.push('e'+i))}catch(e){}try{ENW.forEach((_,i)=>o.push('x'+i))}catch(e){}return uniq(o)}
function lvAll(){S.claimed=S.claimed||{};S.stars=S.stars||{};lvIds().forEach(i=>{S.claimed[i]=1;S.stars[i]=3})}
function starsAdd(n){S.claimed=S.claimed||{};S.stars=S.stars||{};for(const i of lvIds()){if(n<=0)break;const c=S.stars[i]|0;if(c>=3)continue;const g=Math.min(3-c,n);S.stars[i]=c+g;S.claimed[i]=1;n-=g}}
function ach(){lvAll();S.races=Math.max(S.races|0,1);S.st=S.st||{};if(Object.values(S.st).reduce((a,b)=>a+((b&&b.c)|0),0)<5)S.st['★']={c:5,a:5};
 const C=T('CARS');if(C&&(!Array.isArray(S.cars)||S.cars.length<2))S.cars=[0,1];S.coins=Math.max(S.coins|0,200);S.ach=S.ach||{};['أول سباق','خمس إجابات صحيحة','جولة مثالية','ثلاثة مستويات'].forEach(k=>S.ach[k]=true)}
async function lbIds(){try{const t=await (await fetch('/js/rewards.js')).text();const a=t.indexOf('const LB=['),b=t.indexOf('const WP=[');return[...t.slice(a,b).matchAll(/\['([a-z0-9_]+)','[^']*',\d+,/g)].map(m=>m[1])}catch(e){return[]}}
async function act(a,n){
 const own=(k,f)=>{S[k]=uniq((S[k]||[]).concat(f))};
 switch(a){
 case 'stars_all':case 'levels_unlock':lvAll();break;
 case 'stars_add':starsAdd(Math.max(0,Math.min(1000,n|0)));break;
 case 'stars_zero':S.stars={};break;
 case 'levels_lock':S.claimed={};S.stars={};break;
 case 'ach_unlock':ach();break;
 case 'cars_all':{const C=T('CARS');if(C)S.cars=C.map((_,i)=>i);break}
 case 'cars_reset':S.cars=[0];S.car=0;break;
 case 'themes_all':own('ownT',ids(T('THEMES')));break;
 case 'themes_reset':S.ownT=['day'];S.theme='day';break;
 case 'roads_all':own('ownR',ids(T('ROADS')));break;
 case 'roads_reset':S.ownR=['classic'];S.road='classic';break;
 case 'gates_all':own('ownG',ids(T('GATES')));break;
 case 'gates_reset':S.ownG=['neon'];S.gate='neon';break;
 case 'worlds_all':own('worlds',ids(T('WORLDS')));break;
 case 'worlds_reset':S.worlds=['day'];S.world='day';break;
 case 'items_all':own('own',ids(T('CITEMS')).concat(ids(T('FRAMES'))));break;
 case 'items_reset':S.own=[];S.eqA=[];S.eqG='';S.eqR='';S.fr='';break;
 case 'lobby_all':own('ownL',await lbIds());break;
 case 'lobby_reset':S.ownL=[];S.lb='';break;
 case 'unlock_all':for(const x of['levels_unlock','ach_unlock','cars_all','themes_all','roads_all','gates_all','worlds_all','items_all','lobby_all'])await act(x);break;
 case 'reset_all':{const k={owner:S.owner,name:S.name,avatar:S.avatar,av:S.av,avatarImage:S.avatarImage,sid:S.sid};const d=typeof def==='function'?def():{v:1,coins:0,stars:{},claimed:{},cars:[0],car:0,st:{},ach:{},races:0,set:{L:1,S:1,M:0}};S=Object.assign(d,k);break}
 }}
async function apply(a){for(const o of a){try{
 if(o.t==='add'||o.t==='set'){if(o.k!=='coins'&&o.k!=='xp')continue;const n=+o.n||0;S[o.k]=Math.max(0,o.t==='add'?(S[o.k]|0)+n:n)}
 else if(o.t==='do')await act(String(o.a||''),+o.n||0)}catch(e){}}}
async function claim(){let g=null;try{g=JSON.parse(localStorage.getItem('tk_g')||'null')}catch(e){}
 if(!g||!g.at||g.exp-Date.now()<1e4||!navigator.onLine)return;
 try{const r=await fetch(U+'/rest/v1/rpc/claim_ops',{method:'POST',headers:{apikey:KEY,Authorization:'Bearer '+g.at,'Content-Type':'application/json'},body:'{}'});
  if(!r.ok)return;const a=await r.json();if(!Array.isArray(a)||!a.length)return;
  await apply(a);
  try{sv()}catch(e){}try{hud()}catch(e){}try{applyCar()}catch(e){}return 1}catch(e){}}
if(typeof syncNow==='function'){const p=syncNow;syncNow=async function(){await p();if(busy)return;busy=1;try{if(await claim())await p()}catch(e){}busy=0}}
setTimeout(()=>{try{syncNow()}catch(e){}},4000);
})();
