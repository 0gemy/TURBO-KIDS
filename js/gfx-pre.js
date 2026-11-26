/* TURBO KIDS 2: graphics pre-pass. Loaded right after Three.js, before the game.
 * Forces anti-aliasing and filmic tone mapping on every renderer the game creates. */
(function(){
  if(!window.THREE)return;
  const WR=THREE.WebGLRenderer;
  function Wrapped(p){
    p=Object.assign({},p||{});p.antialias=true;
    const r=new WR(p);
    try{r.toneMapping=THREE.ACESFilmicToneMapping;r.toneMappingExposure=.95}catch(e){}
    return r;
  }
  Wrapped.prototype=WR.prototype;
  THREE.WebGLRenderer=Wrapped;
})();
