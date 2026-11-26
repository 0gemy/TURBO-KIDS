/* TURBO KIDS 2: audio layer. Preloaded, pre-decoded voice clips (no network or decode at speech time),
 * softer synthesized effects, and graceful fallback to the old speech code when a clip is missing. */
(function(){
  'use strict';
  const BASE='assets/audio/';
  const bufs=Object.create(null);let list=[],loading=false,src=null,srcGain=null,gen=0;
  const vol=()=>{try{return Math.max(0,Math.min(1,Number(S.volume!=null?S.volume:.75)))}catch(e){return .75}};
  const sOn=()=>{try{return !!S.set.S}catch(e){return true}};
  const key=u=>{const m=/([0-9a-f-]+)\.mp3$/.exec(u||'');return m?m[1]+'.mp3':null};

  // Voice clips ship as base64 packs (js/apackN.js), requested in parallel shortly after load.
  // Clips are decoded one at a time in idle time, or on demand (off the main thread) when a clip is needed first.
  const NPACK=18;let packsStarted=false,packsDone=0;const raw=Object.create(null),pend=Object.create(null);
  function pack(o){for(const k in o){if(!bufs[k])raw[k]=o[k]}kick()}
  function loadPacks(){
    if(packsStarted)return;packsStarted=true;
    for(let i=1;i<=NPACK;i++){const s=document.createElement('script');s.src='js/apack'+i+'.js';s.async=true;s.onload=s.onerror=()=>{packsDone++};document.head.appendChild(s)}
  }
  const b64=s=>{const bin=atob(s),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);return u.buffer};
  function ensure(f){
    if(bufs[f])return Promise.resolve(bufs[f]);
    if(pend[f])return pend[f];
    const d=raw[f];if(!d||typeof AC==='undefined'||!AC)return Promise.resolve(null);
    delete raw[f];
    return pend[f]=new Promise((ok,no)=>AC.decodeAudioData(b64(d),ok,no)).then(b=>{bufs[f]=b;delete pend[f];return b}).catch(()=>{delete pend[f];return null});
  }
  function kick(){
    if(loading||!Object.keys(raw).length)return;
    if(typeof AC==='undefined'||!AC){setTimeout(kick,800);return}
    loading=true;
    const next=()=>{const f=Object.keys(raw)[0];if(!f){loading=false;return}ensure(f).then(()=>(window.requestIdleCallback||setTimeout)(next,{timeout:300}))};
    next();
  }
  // wait (briefly) for a clip that is still arriving/decoding, instead of falling back to the slow phone voice
  function getClip(f,ms){
    return new Promise(res=>{
      const t0=performance.now();
      const step=()=>{
        if(bufs[f])return res(bufs[f]);
        if(raw[f]||pend[f])return ensure(f).then(res);
        if(packsDone>=NPACK||performance.now()-t0>ms)return res(null);
        setTimeout(step,80);
      };
      step();
    });
  }
  try{ac.w=1}catch(e){}   // skip the silent speechSynthesis warm-up utterance (it initialises the phone TTS engine and stalls)
  setTimeout(loadPacks,1500);
  addEventListener('pointerdown',()=>{loadPacks();setTimeout(kick,300)},{once:true,passive:true});
  addEventListener('keydown',()=>{loadPacks();setTimeout(kick,300)},{once:true});

  function stopVoice(){try{if(src){src.onended=null;src.stop()}}catch(e){}src=null}
  function playBuf(b,done){
    stopVoice();
    const s=AC.createBufferSource(),g=AC.createGain();
    s.buffer=b;g.gain.value=Math.min(1,vol()*1.15);s.connect(g);g.connect(AC.destination);
    s.onended=()=>{if(src===s){src=null;done&&done()}};
    src=s;s.start();return s;
  }

  const hxs=t=>[...String(t)].map(c=>c.codePointAt(0).toString(16)).join('-');
  const prevSay=window.say||say;
  const prevTts=(typeof tts==='function')?tts:null;
  function speakClip(f,my,onFail){
    getClip(f,1800).then(b=>{
      if(my!==gen)return;
      if(!b||!AC){onFail&&onFail();return}
      if(AC.state==='suspended')AC.resume();
      busy=true;
      playBuf(b,()=>{if(my!==gen)return;
        setTimeout(()=>{if(my!==gen||(typeof paused!=='undefined'&&paused)){busy=false;return}
          playBuf(b,()=>{if(my===gen)busy=false})},650)});
      setTimeout(()=>{if(my===gen)busy=false},9000);
    });
  }
  function stopOld(){
    try{const ss=window.speechSynthesis;if(ss&&(ss.speaking||ss.pending))ss.cancel()}catch(e){}
    try{if(typeof cur0!=='undefined'&&cur0){cur0.pause();cur0=null}}catch(e){}
  }
  window.say=say=function(q){
    try{
      const f=q&&(q.lang==='en'&&q.sp?'en-'+hxs(q.sp)+'.mp3':key(q.a));
      if(f&&AC&&S.set.L){
        if(praiseOn){pending=null;const qq=q;const w=setInterval(()=>{if(!praiseOn){clearInterval(w);window.say(qq)}},60);setTimeout(()=>clearInterval(w),6500);return}
        const my=++gen;stopOld();stopVoice();busy=true;
        speakClip(f,my,()=>{if(my===gen){gen++;prevSay.call(null,q)}});
        return;
      }
    }catch(e){}
    return prevSay.apply(this,arguments);
  };
  // All other spoken text (mini-games, praise, retries): recorded clip when available, otherwise the old phone voice.
  // Mini-game clips (js/apack19+) are fetched lazily: when the games list opens, or the first time one is needed.
  const NMG=12;let mgStarted=false,mgDone=0;
  function loadMg(){
    if(mgStarted||!NMG)return;mgStarted=true;
    for(let i=0;i<NMG;i++){const s=document.createElement('script');s.src='js/apack'+(19+i)+'.js';s.async=true;s.onload=s.onerror=()=>{mgDone++};document.head.appendChild(s)}
  }
  const AR_NUM={'1':'واحد','2':'اثنان','3':'ثلاثة','4':'أربعة','5':'خمسة','6':'ستة','7':'سبعة','8':'ثمانية','9':'تسعة','10':'عشرة'};
  const EN_NUM={'1':'one','2':'two','3':'three','4':'four','5':'five','6':'six','7':'seven','8':'eight','9':'nine','10':'ten'};
  function cands(t,lg){
    const s=String(t==null?'':t).trim(),en=lg==='en'||/^[\x00-\x7f]+$/.test(s),o=[];
    if(!s)return o;
    o.push('p-'+hxs(s)+'.mp3');
    const bare=s.replace(/[!.\u061f?\u060c,]+$/,'');
    if(bare!==s){o.push('p-'+hxs(bare)+'.mp3')}
    o.push('p-'+hxs(bare+'!')+'.mp3');
    if(en){
      const l=bare.toLowerCase();
      if(/^[a-z]$/i.test(bare))o.push('enl-'+hxs(bare.toUpperCase())+'.mp3');
      const w=EN_NUM[bare]||l;
      o.push('en-'+hxs(w)+'.mp3');
    }else{
      const w=AR_NUM[bare]||bare;
      if(w!==bare)o.push('p-'+hxs(w)+'.mp3');
      o.push(hxs(w)+'.mp3');
      if([...bare].length===1)o.push(hxs(bare+'\u064e')+'.mp3');
    }
    return o;
  }
  const have=f=>bufs[f]||raw[f]||pend[f];
  function findClip(cs,ms){
    return new Promise(res=>{
      const t0=performance.now();
      const step=()=>{
        const f=cs.find(have);
        if(f)return ensure(f).then(b=>res(b));
        const done=packsDone>=NPACK&&(!NMG||(mgStarted&&mgDone>=NMG));
        if(done||performance.now()-t0>ms)return res(null);
        setTimeout(step,80);
      };
      step();
    });
  }
  // Praise ("ممتاز", "شاطر", "Great job!") must finish before the next prompt: a call made while praise is
  // still playing is queued (latest wins) and runs when the praise ends, instead of cutting it off.
  let praiseOn=false,pending=null,praiseTimer=0;
  const FIXED_PRAISE=['ممتاز يا بطل','Great job!'];
  function isPraise(t){
    const s=String(t==null?'':t).trim();if(!s)return false;
    try{if(typeof PR!=='undefined'&&PR.indexOf(t)>=0)return true}catch(e){}
    try{if(typeof PRE!=='undefined'&&PRE.indexOf(t)>=0)return true}catch(e){}
    return FIXED_PRAISE.some(p=>s.indexOf(p)===0);
  }
  function praiseDone(){
    clearTimeout(praiseTimer);if(!praiseOn)return;praiseOn=false;
    const p=pending;pending=null;
    if(p&&!(typeof paused!=='undefined'&&paused))window.tts(p[0],p[1]);
  }
  if(prevTts){window.tts=tts=function(t,lg){
    try{
      if(AC&&S.set.L){
        if(praiseOn){pending=[t,lg];return}
        const cs=cands(t,lg);
        if(cs.length){
          if(!cs.some(have))loadMg();
          const pr=isPraise(t);
          const my=++gen;stopOld();stopVoice();
          if(pr){praiseOn=true;pending=null;clearTimeout(praiseTimer);praiseTimer=setTimeout(praiseDone,6000)}
          findClip(cs,2200).then(b=>{
            if(my!==gen){if(pr)praiseDone();return}
            if(b){if(AC.state==='suspended')AC.resume();
              if(pr){playBuf(b,praiseDone);const s0=src;if(s0)clearTimeout(praiseTimer),praiseTimer=setTimeout(praiseDone,Math.ceil(b.duration*1000)+800)}
              else playBuf(b)}
            else{if(pr)praiseDone();prevTts(t,lg)}});
          return;
        }
      }
    }catch(e){}
    return prevTts.apply(this,arguments)}}
  try{const r0=window.rgm;if(typeof r0==='function'){window.rgm=rgm=function(){try{loadMg()}catch(e){}return r0.apply(this,arguments)}}}catch(e){}

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
  window.TKfx=FX;window.TKaudio={pack:pack,bufs:bufs,playing:()=>!!src};
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
