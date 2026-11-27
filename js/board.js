// Leaderboard screen: shows other players' name, emoji avatar and frame (nothing else).
(function(){
const U='https://xeaaupzfmpydcdsepneq.supabase.co',KEY='sb_publishable_5aEyfa5IylaUxdnp62OD_w_UGasTs9P';
const E=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
const IMG=()=>window.TKFR_IMG||{};
function av(emoji,fr,s){const im=fr&&IMG()[fr];
 return '<span class="bd-av" style="width:'+s+'px;height:'+s+'px;font-size:'+Math.round(s*.55)+'px"><b>'+E(emoji||'🦊')+'</b>'+(im?'<u style="width:'+(s/0.67*0.97)+'px;height:'+(s/0.67*0.97)+'px;background-image:url('+im+')"></u>':'')+'</span>'}
const st=document.createElement('style');
st.textContent='#board{justify-content:flex-start}#board h2{margin:6px 0 2px}.bd-list{width:min(100%,520px);display:flex;flex-direction:column;gap:12px;padding:6px 0 30px}.bd-row{display:flex;align-items:center;gap:16px;background:#ffffff1c;border-radius:20px;padding:14px 16px;font:800 17px Cairo,sans-serif}.bd-row.me{outline:3px solid #fbbf24}.bd-rk{width:34px;text-align:center;font-size:22px;flex:none}.bd-nm{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.bd-av{position:relative;flex:none;margin:8px 10px}.bd-av b{position:absolute;inset:0;border-radius:50%;background:linear-gradient(135deg,#e0f2fe,#99f6e4);display:grid;place-items:center;font-weight:400;line-height:1}.bd-av u{position:absolute;left:50%;top:50%;transform:translate(-50%,-52.5%);background:center/100% 100% no-repeat;pointer-events:none}.bd-msg{text-align:center;opacity:.85;font:700 16px Cairo,sans-serif;padding:30px 10px}#bdBtn{width:52px;height:52px;border-radius:50%;border:2px solid #ffffff55;background:linear-gradient(135deg,#fbbf24,#f97316);font-size:26px;display:grid;place-items:center;padding:0;box-shadow:0 8px 22px #02102255;cursor:pointer;order:3}';
document.head.appendChild(st);
function mount(){
 if(!document.getElementById('board')){const d=document.createElement('div');d.id='board';d.className='scr solid';d.innerHTML='<h2>🏆 المتصدرين</h2><div class="bd-list" id="bdList"></div><button class="btn s" onclick="go(\'home\')">رجوع</button>';document.body.appendChild(d)}
 const top=document.querySelector('#home .hm-top');
 if(top&&!document.getElementById('bdBtn')){const b=document.createElement('button');b.id='bdBtn';b.type='button';b.title='المتصدرين';b.setAttribute('aria-label','المتصدرين');b.textContent='🏆';b.onclick=()=>window.openBoard();top.appendChild(b)}
}
function medal(i){return i==0?'🥇':i==1?'🥈':i==2?'🥉':(i+1)}
async function load(){
 const L=document.getElementById('bdList');if(!L)return;L.innerHTML='<div class="bd-msg">جاري التحميل...</div>';
 try{
  const r=await fetch(U+'/rest/v1/rpc/leaderboard',{method:'POST',headers:{apikey:KEY,Authorization:'Bearer '+KEY,'Content-Type':'application/json'},body:'{}'});
  if(!r.ok)throw 0;const a=await r.json();
  if(!a.length){L.innerHTML='<div class="bd-msg">لسه مفيش لاعبين. كن أول واحد! 🏎️</div>';return}
  const me=(typeof S!=='undefined'&&S.name)||'';
  L.innerHTML=a.map((p,i)=>'<div class="bd-row'+(me&&p.name===me?' me':'')+'"><span class="bd-rk">'+medal(i)+'</span>'+av(p.avatar,p.fr,52)+'<span class="bd-nm">'+E(p.name)+'</span></div>').join('')
 }catch(e){L.innerHTML='<div class="bd-msg">تعذر تحميل القائمة. تأكد من الإنترنت وجرّب تاني.</div>'}
}
window.openBoard=function(){mount();go('board');load()};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
setTimeout(mount,1500);
})();
