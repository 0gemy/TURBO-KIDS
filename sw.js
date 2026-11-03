// Version is replaced with the Git commit SHA at deploy time (see vercel.json) so every push updates players.
const V='__V__',C='tk-'+V;
const A=['./','index.html','css/style.css','css/premium.css','css/pet.css','css/polish.css','js/main.js','js/car-loader.js','js/extras.js','js/account.js','js/pet.js','js/polish.js','manifest.json','icon.svg'];
const X=['https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js','https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js','https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/DRACOLoader.js','https://fonts.googleapis.com/css2?family=Cairo:wght@600;800&family=Poppins:wght@800&display=swap'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>Promise.allSettled([...A.map(u=>c.add(u)),...X.map(u=>c.add(new Request(u,{mode:'no-cors'})))])).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==C).map(n=>caches.delete(n)))).then(()=>self.clients.claim())));
// Network first (always the newest version when online); after 4s or when offline, use the last downloaded copy.
async function nf(r){
  const c=await caches.open(C);
  const p=fetch(r).then(res=>{if(res&&res.status!==206&&(res.ok||res.type==='opaque'))c.put(r,res.clone()).catch(()=>{});return res});
  p.catch(()=>{});
  try{return await Promise.race([p,new Promise((_,j)=>setTimeout(j,4000))])}
  catch(e){
    const m=await c.match(r,{ignoreSearch:r.mode==='navigate'})||(r.mode==='navigate'?await c.match('index.html'):null);
    return m||p;
  }
}
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).pathname.startsWith('/api/'))return;e.respondWith(nf(r))});
