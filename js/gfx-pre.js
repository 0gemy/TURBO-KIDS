/* TURBO KIDS 2: graphics pre-pass. Loaded right after Three.js, before the game.
 * Forces anti-aliasing (desktop only, phones skip it for speed) and filmic tone mapping on every renderer the game creates. */
(function(){
  if(!window.THREE)return;
  const WR=THREE.WebGLRenderer;
  // quality tier: low = weak phones, mid = any touch phone/tablet, high = desktop
  const weak=!!((navigator.deviceMemory&&navigator.deviceMemory<=2)||(navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=4));
  const touch=!!(window.matchMedia&&matchMedia('(pointer:coarse)').matches)||/Android|iPhone|iPad|Mobile/i.test(navigator.userAgent);
  let forced=null;try{const q=JSON.parse(localStorage.getItem('tk1')||'{}').lq;if(q===1)forced='low';else if(q===0)forced=touch?'mid':'high'}catch(e){}
  const qt=(location.search.match(/[?&]tier=(low|mid|high)/)||[])[1];window.__gfxTier=qt||forced||(weak?'low':touch?'mid':'high');
  function Wrapped(p){
    p=Object.assign({},p||{});p.antialias=(window.__gfxTier==='high');
    const r=new WR(p);
    try{r.toneMapping=THREE.ACESFilmicToneMapping;r.toneMappingExposure=.95}catch(e){}
    return r;
  }
  Wrapped.prototype=WR.prototype;
  THREE.WebGLRenderer=Wrapped;
})();
