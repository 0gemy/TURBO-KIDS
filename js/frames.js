// New avatar frames (image rings), shop list, equipped-frame overlay.
(function(){
const META=[{"id": "fr_phoenix", "n": "إطار العنقاء", "desc": "نار وريش ذهبي", "p": 400}, {"id": "fr_icedragon", "n": "إطار التنين الجليدي", "desc": "جليد وبلور أزرق", "p": 500}, {"id": "fr_forest", "n": "إطار الغابة", "desc": "زمرد وأوراق ذهبية", "p": 600}, {"id": "fr_king", "n": "إطار الملك", "desc": "تاج وألماس", "p": 700}, {"id": "fr_galaxy2", "n": "إطار المجرة", "desc": "نجوم وكواكب", "p": 850}, {"id": "fr_thunder", "n": "إطار الرعد", "desc": "برق ونسر ذهبي", "p": 1000}];
const IMG=()=>window.TKFR_IMG||{};
function setup(){
 if(typeof FRAMES==='undefined')return;
 FRAMES.length=0;
 META.forEach((m,i)=>FRAMES.push({id:m.id,n:m.n,p:m.p,desc:m.desc,sh:'0 0 0 0 #01000'+(i+1)}));
 const st=document.createElement('style');
 let c='.pvav{position:relative;overflow:visible!important}.pvav img{border-radius:50%}.pvav[style*="#01000"]::after{content:"";position:absolute;left:50%;top:50%;width:145%;height:145%;transform:translate(-50%,-52.5%);background:center/100% 100% no-repeat;pointer-events:none}.tkr{position:fixed;left:0;top:0;pointer-events:none;z-index:46;background:center/100% 100% no-repeat;display:none}';
 META.forEach((m,i)=>{c+='.pvav[style*="#01000'+(i+1)+'"]::after{background-image:url('+IMG()[m.id]+')}'});
 st.textContent=c;document.head.appendChild(st);
 try{applyFrame()}catch(e){}
}
function owner(){try{const g=JSON.parse(localStorage.getItem('tk_g')||'null');return !!(g&&g.email&&String(g.email).toLowerCase()==='gemy1gg@gmail.com')}catch(e){return false}}
const pool=[];
function vis(el){if(!el.getClientRects().length)return false;const cs=getComputedStyle(el);return cs.display!=='none'&&cs.visibility!=='hidden'}
function tick(){
 let i=0;
 try{
  if(typeof S!=='undefined'&&S.fr&&!IMG()[S.fr]){S.fr='';try{applyFrame();sv()}catch(e){}}
  const f=(typeof S!=='undefined'&&S.fr)||'';
  if(f&&IMG()[f]&&!owner()){
   document.querySelectorAll('#globalAvatar,#hmAcc,.acc-av,#avatarPreview,.greeting-avatar,.greeting-emoji').forEach(el=>{
    if(!vis(el))return;const r=el.getBoundingClientRect();if(r.width<12)return;
    const d=Math.min(r.width,r.height),cx=r.left+r.width/2,cy=r.top+r.height/2,vw=document.documentElement.clientWidth;
    let s=d/0.67*0.97;s=Math.min(s,2*cx-4,2*(vw-cx)-4,(cy-2)/0.555);if(s<d)s=d;
    if(!pool[i]){const e=document.createElement('div');e.className='tkr';document.body.appendChild(e);pool[i]=e}
    const g=pool[i++];g.style.display='block';g.style.width=g.style.height=s+'px';g.style.backgroundImage='url('+IMG()[f]+')';
    g.style.transform='translate('+(cx-s/2)+'px,'+(cy-s/2-s*0.025)+'px)'})
  }
 }catch(e){}
 for(;i<pool.length;i++)pool[i].style.display='none';
 requestAnimationFrame(tick)
}
setup();tick();
})();
