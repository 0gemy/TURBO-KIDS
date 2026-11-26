// Progress merge helper used by Google sign-in. The old username/password login was removed.
(function(){
const score=o=>Object.values(o.stars||{}).reduce((a,b)=>a+(+b||0),0)*10+Object.keys(o.claimed||{}).length*10+(o.races||0)+((o.xp|0)/10);
function merge(l,r){if(!r)return l;const rb=score(r)>=score(l),b=rb?r:l,o=rb?l:r,m=Object.assign(def(),b);
 m.stars=Object.assign({},o.stars);for(const k in b.stars)m.stars[k]=Math.max(+b.stars[k]||0,+(o.stars||{})[k]||0);
 m.claimed=Object.assign({},o.claimed,b.claimed);m.ach=Object.assign({},o.ach,b.ach);m.cars=[...new Set([...(b.cars||[]),...(o.cars||[])])];m.ownL=[...new Set([...(b.ownL||[]),...(o.ownL||[])])];m.lb=b.lb||o.lb;
 m.wheel=((b.wheel||{}).ts||0)>=((o.wheel||{}).ts||0)?b.wheel:o.wheel;m.bx=((b.bx||{}).ts||0)>=((o.bx||{}).ts||0)?b.bx:o.bx;m.xp=Math.max(b.xp|0,o.xp|0);delete m.pet;delete m.dm;delete m.wk;delete m.sid;return m}
window._tkMerge=merge;
})();
