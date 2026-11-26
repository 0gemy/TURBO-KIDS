// Applies coin/XP changes made by the owner from the admin dashboard (additive).
(function(){
const U='https://xeaaupzfmpydcdsepneq.supabase.co',KEY='sb_publishable_5aEyfa5IylaUxdnp62OD_w_UGasTs9P';
let busy=0;
async function claim(){let g=null;try{g=JSON.parse(localStorage.getItem('tk_g')||'null')}catch(e){}
 if(!g||!g.at||g.exp-Date.now()<1e4||!navigator.onLine)return;
 try{const r=await fetch(U+'/rest/v1/rpc/claim_ops',{method:'POST',headers:{apikey:KEY,Authorization:'Bearer '+g.at,'Content-Type':'application/json'},body:'{}'});
  if(!r.ok)return;const a=await r.json();if(!Array.isArray(a)||!a.length)return;
  a.forEach(o=>{if(o.k!=='coins'&&o.k!=='xp')return;const n=+o.n||0;S[o.k]=Math.max(0,o.t==='add'?(S[o.k]|0)+n:n)});
  try{sv()}catch(e){}try{hud()}catch(e){}return 1}catch(e){}}
if(typeof syncNow==='function'){const p=syncNow;syncNow=async function(){await p();if(busy)return;busy=1;try{if(await claim())await p()}catch(e){}busy=0}}
setTimeout(()=>{try{syncNow()}catch(e){}},4000);
})();
