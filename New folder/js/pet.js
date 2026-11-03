// Panda pet: gentle care loop tied to learning. State lives in S.pet and syncs with the account. Never sick, never dies.
(function(){
const ACC={bow:['فيونكة',80,0],scarf:['وشاح',120,0],crown:['تاج',250,3]};
function P(){const p=S.pet=Object.assign({n:'باندا',f:70,t:Date.now(),b:2,a:[],w:[]},S.pet);return p}
const full=()=>{const p=P();return Math.round(Math.max(15,Math.min(100,p.f-(Date.now()-p.t)/18e5)))};
const stage=()=>{const t=typeof tot==='function'?tot():0;return t<20?1:t<60?2:3};
const night=()=>{const h=new Date().getHours();return h>=22||h<6};
const mood=()=>night()?'sleepy':full()<40?'hungry':'happy';
function svg(m,w){const E={happy:'<circle cx="-15" cy="2" r="4.5" fill="#fff"/><circle cx="15" cy="2" r="4.5" fill="#fff"/><circle cx="-14.5" cy="2.5" r="2.4" fill="#1F2937"/><circle cx="15.5" cy="2.5" r="2.4" fill="#1F2937"/><path d="M-7 18Q0 25 7 18" fill="none" stroke="#1F2937" stroke-width="2" stroke-linecap="round"/>',
 hungry:'<circle cx="-15" cy="2" r="5.5" fill="#fff"/><circle cx="15" cy="2" r="5.5" fill="#fff"/><circle cx="-14.5" cy="3" r="3" fill="#1F2937"/><circle cx="15.5" cy="3" r="3" fill="#1F2937"/><ellipse cx="0" cy="22" rx="5" ry="4.5" fill="#7C2D12"/><rect x="42" y="-26" width="9" height="40" rx="3" fill="#4ADE80" stroke="#15803D" stroke-width="2"/>',
 sleepy:'<path d="M-21 3Q-15 9 -9 3M9 3Q15 9 21 3" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/><path d="M-4 19Q0 22 4 19" fill="none" stroke="#1F2937" stroke-width="2" stroke-linecap="round"/><text x="40" y="-30" font-size="16" font-weight="800" fill="#1E3A8A">Z</text>'}[m],
 a=(w||[]).map(k=>({bow:'<path d="M20-34l12-7v14zM44-34l-12-7v14z" fill="#EC4899"/><circle cx="32" cy="-34" r="4" fill="#BE185D"/>',scarf:'<path d="M-24 22Q0 34 24 22L22 32Q0 42 -22 32Z" fill="#EF4444"/>',crown:'<path d="M-14-30L-10-46L-4-36L0-48L4-36L10-46L14-30Z" fill="#FACC15" stroke="#CA8A04" stroke-width="2"/>'})[k]).join('');
 return '<svg class="pet-svg" viewBox="-58 -54 116 126" role="img" aria-label="باندا"><ellipse cx="-30" cy="36" rx="9" ry="14" fill="#1F2937"/><ellipse cx="30" cy="36" rx="9" ry="14" fill="#1F2937"/><ellipse cx="-16" cy="56" rx="11" ry="7" fill="#1F2937"/><ellipse cx="16" cy="56" rx="11" ry="7" fill="#1F2937"/><ellipse cx="0" cy="38" rx="28" ry="22" fill="#fff" stroke="#1F2937" stroke-width="2"/><circle cx="-28" cy="-28" r="12" fill="#1F2937"/><circle cx="28" cy="-28" r="12" fill="#1F2937"/><ellipse cx="0" cy="0" rx="40" ry="34" fill="#fff" stroke="#1F2937" stroke-width="2"/><ellipse cx="-15" cy="3" rx="10" ry="13" transform="rotate(20 -15 3)" fill="#1F2937"/><ellipse cx="15" cy="3" rx="10" ry="13" transform="rotate(-20 15 3)" fill="#1F2937"/>'+E+'<circle cx="-27" cy="15" r="5" fill="#FBCFE8"/><circle cx="27" cy="15" r="5" fill="#FBCFE8"/><ellipse cx="0" cy="13" rx="5" ry="3.5" fill="#1F2937"/><rect x="-40" y="-25" width="80" height="7" rx="3" fill="#1E3A8A"/><circle cx="-13" cy="-22" r="8" fill="#7DD3FC" stroke="#1E3A8A" stroke-width="3"/><circle cx="13" cy="-22" r="8" fill="#7DD3FC" stroke="#1E3A8A" stroke-width="3"/>'+a+'</svg>'}
const say=m=>({happy:'يلا نتسابق! 🏁',hungry:'جعانة! أجاوب صح عشان آكل 🎋',sleepy:'زززز... نعسانة 😴'})[m];
let ck='';function home(){const e=document.getElementById('petHome');if(!e)return;const p=P(),m=mood(),k=m+p.w+p.b;if(k===ck)return;ck=k;e.innerHTML=svg(m,p.w)+'<div class="pet-bub">'+p.n+': '+say(m)+'</div>'}
window.petFood=n=>{const p=P();p.b=Math.min(99,p.b+n)};
window.openPet=function(){const o=modal('<div id="pB"></div><button class="btn s" data-x>إغلاق</button>'),B=o.querySelector('#pB');
 function draw(hop){const p=P(),m=mood(),s=stage();B.innerHTML='<div class="pet-big'+(hop?' pet-hop':'')+'">'+svg(m,p.w)+'</div><b class="mdl-t">'+p.n+' · المرحلة '+s+'</b><div class="pet-bar"><i style="width:'+full()+'%"></i></div><small>الشبع '+full()+'% · الخيزران 🎋 '+p.b+' (تكسبه من الإجابات الصحيحة)</small><div class="pet-row"><button class="btn g" data-f>🎋 أطعمها</button><button class="btn p" data-r>✏️ غيّر الاسم</button></div><p>الإكسسوارات:</p><div class="pet-row">'+Object.entries(ACC).map(([k,v])=>{const own=p.a.includes(k),on=p.w.includes(k);return '<button class="btn s pet-acc'+(on?' on':'')+'" data-a="'+k+'">'+v[0]+(own?(on?' ✓':''):' · '+v[1]+'💎'+(v[2]>s?' 🔒':''))+'</button>'}).join('')+'</div><div class="mdl-m" id="pM"></div>';home()}
 B.onclick=e=>{const p=P(),m=B.querySelector('#pM'),f=e.target.closest('[data-f]'),r=e.target.closest('[data-r]'),a=e.target.closest('[data-a]');
  if(f){if(p.b<1){m.textContent='مفيش خيزران! جاوب أسئلة صح في السباق 🏁';return}p.b--;p.f=Math.min(100,full()+25);p.t=Date.now();sv();ck='';draw(1)}
  else if(r){const n=prompt('اسم الباندا:',p.n);if(n&&n.trim()){p.n=n.trim().slice(0,12);sv();ck='';draw()}}
  else if(a){const k=a.dataset.a,v=ACC[k];if(!p.a.includes(k)){if(v[2]>stage()){m.textContent='يفتح في المرحلة '+v[2]+' (اجمع نجوم أكثر)';return}if(S.coins<v[1]){m.textContent='العملات مش كفاية';return}S.coins-=v[1];p.a.push(k);p.w.push(k);if(typeof hud==='function')hud()}else p.w=p.w.includes(k)?p.w.filter(x=>x!==k):p.w.concat(k);sv();ck='';draw()}};
 draw()};
window.petSvg=svg;window.petMood=mood;
const _h=hud;hud=function(){_h();home()};
home();setInterval(home,6e4);
})();
