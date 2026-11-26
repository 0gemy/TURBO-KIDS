/* TURBO KIDS 2: audio layer. Preloaded, pre-decoded voice clips (no network or decode at speech time),
 * softer synthesized effects, and graceful fallback to the old speech code when a clip is missing. */
(function(){
  'use strict';
  const BASE='assets/audio/';
  const bufs=Object.create(null);let list=[],loading=false,src=null,srcGain=null,gen=0;
  const vol=()=>{try{return Math.max(0,Math.min(1,Number(S.volume!=null?S.volume:.75)))}catch(e){return .75}};
  const sOn=()=>{try{return !!S.set.S}catch(e){return true}};
  const key=u=>{const m=/([0-9a-f-]+)\.mp3$/.exec(u||'');return m?m[1]+'.mp3':null};

  // manifest of clips that really exist, so we never request a missing file
  fetch(BASE+'manifest.json',{cache:'force-cache'}).then(r=>r.ok?r.json():[]).then(j=>{list=Array.isArray(j)?j:[];kick()}).catch(()=>{});

  // decode a few clips at a time while the browser is idle, only after the audio context exists
  function kick(){
    if(loading||!list.length)return;
    if(typeof AC==='undefined'||!AC){setTimeout(kick,800);return}
    loading=true;
    const todo=list.filter(f=>!bufs[f]);
    let i=0;
    const next=()=>{
      if(i>=todo.length){loading=false;return}
      const f=todo[i++];
      fetch(BASE+f).then(r=>r.arrayBuffer()).then(ab=>new Promise((ok,no)=>AC.decodeAudioData(ab,ok,no))).then(b=>{bufs[f]=b}).catch(()=>{}).then(()=>{
        (window.requestIdleCallback||setTimeout)(next,{timeout:200})
      });
    };
    next();
  }
  addEventListener('pointerdown',()=>setTimeout(kick,300),{once:true,passive:true});
  addEventListener('keydown',()=>setTimeout(kick,300),{once:true});

  function stopVoice(){try{if(src){src.onended=null;src.stop()}}catch(e){}src=null}
  function playBuf(b,done){
    stopVoice();
    const s=AC.createBufferSource(),g=AC.createGain();
    s.buffer=b;g.gain.value=Math.min(1,vol()*1.15);s.connect(g);g.connect(AC.destination);
    s.onended=()=>{if(src===s){src=null;done&&done()}};
    src=s;s.start();return s;
  }

  const prevSay=window.say||say;
  window.say=say=function(q){
    try{
      const f=q&&key(q.a);
      if(f&&bufs[f]&&AC&&S.set.L){
        if(AC.state==='suspended')AC.resume();
        try{speechSynthesis.cancel()}catch(e){}
        if(typeof cur0!=='undefined'&&cur0){try{cur0.pause()}catch(e){}cur0=null}
        const my=++gen;busy=true;
        const b=bufs[f];
        playBuf(b,()=>{if(my!==gen)return;
          // one gentle repeat, like the old behaviour, unless something newer started
          setTimeout(()=>{if(my!==gen||(typeof paused!=='undefined'&&paused)){busy=false;return}
            playBuf(b,()=>{if(my===gen)busy=false})},650)});
        setTimeout(()=>{if(my===gen)busy=false},9000);
        return;
      }
    }catch(e){}
    return prevSay.apply(this,arguments);
  };

  // ---- sound effects (synthesized, small, no files) ----
  function env(o,g,t,a,d,pk){g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(Math.max(.0002,pk),t+a);g.gain.exponentialRampToValueAtTime(.0001,t+d)}
  function tone(f,t0,d,o){
    o=o||{};const t=AC.currentTime+t0,v=vol()*(o.v==null?.2:o.v);
    const os=AC.createOscillator(),g=AC.createGain();
    os.type=o.type||'triangle';os.frequency.setValueAtTime(f,t);
    if(o.to)os.frequency.exponentialRampToValueAtTime(o.to,t+d);
    env(os,g,t,.012,d,v);os.connect(g);g.connect(AC.destination);os.start(t);os.stop(t+d+.03);
    if(o.h){const o2=AC.createOscillator(),g2=AC.createGain();o2.type='sine';o2.frequency.setValueAtTime(f*o.h,t);env(o2,g2,t,.01,d*.7,v*.4);o2.connect(g2);g2.connect(AC.destination);o2.start(t);o2.stop(t+d+.03)}
  }
  const FX={
    good(){tone(784,0,.16,{h:2});tone(988,.09,.16,{h:2});tone(1319,.18,.3,{h:2})},
    wrong(){tone(330,0,.2,{type:'sine',to:220,v:.22});tone(247,.16,.28,{type:'sine',to:165,v:.2})},
    coin(){tone(1318,0,.07,{h:2,v:.14});tone(1760,.06,.16,{h:2,v:.14})},
    hit(){tone(150,0,.25,{type:'sawtooth',to:60,v:.18})},
    tick(){tone(900,0,.07,{type:'sine',v:.1})},
    race(){tone(220,0,.5,{type:'sawtooth',to:660,v:.07});tone(440,.05,.45,{type:'triangle',to:1320,v:.07})},
    win(){[523,659,784,1047].forEach((f,i)=>tone(f,i*.11,.22,{h:2,v:.18}));tone(1319,.5,.5,{h:2,v:.18})}
  };
  window.TKfx=FX;window.TKaudio={bufs:bufs,playing:()=>!!src};
  const prevBeep=window.beep||beep;
  window.beep=beep=function(f,d,t){
    try{
      if(!sOn()||!AC)return;
      if(AC.state==='suspended')AC.resume();
      if(t)return;                       // second note of an old two-note chime: covered by FX.good
      if(f>=1000)return FX.coin();
      if(f===660)return FX.good();
      if(f===880){return}                // part of the old chime
      if(f===800)return FX.good();
      if(f>=700)return FX.tick();        // mini-game tap
      if(f===240)return FX.hit();
      if(f<=320)return FX.wrong();
    }catch(e){}
    return prevBeep.apply(this,arguments);
  };
  // race start whoosh
  try{if(typeof startLevel==='function'){const sl=startLevel;window.startLevel=startLevel=function(){try{if(sOn()&&AC)FX.race()}catch(e){}return sl.apply(this,arguments)}}}catch(e){}
})();
