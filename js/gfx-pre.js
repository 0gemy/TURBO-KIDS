/* TURBO KIDS 2: graphics pre-pass. Loaded right after Three.js, before the game.
 * Forces anti-aliasing (desktop only, phones skip it for speed) and filmic tone mapping on every renderer the game creates. */
(function(){
  if(!window.THREE)return;
  const WR=THREE.WebGLRenderer;
  // Quality tier. Rich graphics only on desktop ("high"). Every phone/tablet/weak device gets the light path,
  // which renders like the original game (no antialias, no tone mapping, pixel ratio capped).
  const weak=!!((navigator.deviceMemory&&navigator.deviceMemory<=4)||(navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=4));
  const touch=!!(window.matchMedia&&matchMedia('(pointer:coarse)').matches)||/Android|iPhone|iPad|Mobile/i.test(navigator.userAgent)||(navigator.maxTouchPoints>1&&/Mac/.test(navigator.platform));
  const qt=(location.search.match(/[?&]tier=(low|high)/)||[])[1];
  window.__gfxTier=qt||((weak||touch)?'low':'high');
  function Wrapped(p){
    p=Object.assign({},p||{});if(window.__gfxTier==='high')p.antialias=true;
    const r=new WR(p);
    if(window.__gfxTier==='high'){try{r.toneMapping=THREE.ACESFilmicToneMapping;r.toneMappingExposure=.95}catch(e){}}
    else{const spr=r.setPixelRatio.bind(r);r.setPixelRatio=function(v){return spr(Math.min(v,1.25))}}
    return r;
  }
  Wrapped.prototype=WR.prototype;
  THREE.WebGLRenderer=Wrapped;
})();
