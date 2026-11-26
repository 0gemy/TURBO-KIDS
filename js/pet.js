// Account level + XP (replaces the old companion). XP comes from correct answers, finishing levels, the lucky wheel and loot boxes.
(function(){
const lvOf=x=>Math.floor((1+Math.sqrt(1+x/12.5))/2),base=l=>50*l*(l-1);
window.tkLevel=()=>{const x=S.xp|0,l=lvOf(x),a=base(l),b=base(l+1);return{l,p:Math.max(0,Math.min(1,(x-a)/(b-a))),x,need:b-x}};
window.petXp=function(n){n=+n||0;if(n<=0)return 0;const b=lvOf(S.xp|0);S.xp=(S.xp|0)+n;const a=lvOf(S.xp);
 if(a>b){const g=20*a;S.coins=(S.coins|0)+g;setTimeout(()=>{try{sv();hud();cel('⬆️ مستوى جديد: '+a+'<br>+'+g+' 💎',2600,0)}catch(e){}},500)}return a>b};
window.petFood=function(){petXp(2)};
const $$=i=>document.getElementById(i);
function paint(){const t=tkLevel(),n=$$('lvN'),b=$$('lvB'),s=$$('lvS');if(n)n.textContent=t.l;if(b)b.style.width=Math.round(t.p*100)+'%';if(s)s.textContent=t.need+' XP للمستوى التالي'}
const _h=hud;hud=function(){_h();paint()};paint();
})();
