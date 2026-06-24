const CACHE_NAME='prezen2-integrated-v1';
const LOCAL_ASSETS=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];
const REMOTE_ASSETS=["https://sumida-passion.github.io/game-assets/images/basket.jpg", "https://sumida-passion.github.io/game-assets/images/basketleague.jpg", "https://sumida-passion.github.io/game-assets/images/benkyo.jpg", "https://sumida-passion.github.io/game-assets/images/demae.jpg", "https://sumida-passion.github.io/game-assets/images/ensoku.jpg", "https://sumida-passion.github.io/game-assets/images/golf.jpg", "https://sumida-passion.github.io/game-assets/images/hpmain.jpg", "https://sumida-passion.github.io/game-assets/images/ichigo.jpg", "https://sumida-passion.github.io/game-assets/images/jouhou.png", "https://sumida-passion.github.io/game-assets/images/junkangoukaku.jpg", "https://sumida-passion.github.io/game-assets/images/kaibou.jpg", "https://sumida-passion.github.io/game-assets/images/kakinohazusi.jpg", "https://sumida-passion.github.io/game-assets/images/kanabo.PNG", "https://sumida-passion.github.io/game-assets/images/kanu.jpg", "https://sumida-passion.github.io/game-assets/images/kawasaki.PNG", "https://sumida-passion.github.io/game-assets/images/kensyuryokou2.jpg", "https://sumida-passion.github.io/game-assets/images/kokusaikouryu2.jpg", "https://sumida-passion.github.io/game-assets/images/mac", "https://sumida-passion.github.io/game-assets/images/masuda.PNG", "https://sumida-passion.github.io/game-assets/images/miso.jpg", "https://sumida-passion.github.io/game-assets/images/naramachi01.png", "https://sumida-passion.github.io/game-assets/images/naramachi02.png", "https://sumida-passion.github.io/game-assets/images/naramachi03.png", "https://sumida-passion.github.io/game-assets/images/naramachi04.png", "https://sumida-passion.github.io/game-assets/images/naramachi05.jpg", "https://sumida-passion.github.io/game-assets/images/naramachi06.jpg", "https://sumida-passion.github.io/game-assets/images/naramachi07.jpg", "https://sumida-passion.github.io/game-assets/images/naramarathon.jpg", "https://sumida-passion.github.io/game-assets/images/okamoto.PNG", "https://sumida-passion.github.io/game-assets/images/osakataidai.jpg", "https://sumida-passion.github.io/game-assets/images/rg2.jpg", "https://sumida-passion.github.io/game-assets/images/rounen.jpg", "https://sumida-passion.github.io/game-assets/images/science", "https://sumida-passion.github.io/game-assets/images/sdgs.jpg", "https://sumida-passion.github.io/game-assets/images/sefiroto.jpg", "https://sumida-passion.github.io/game-assets/images/senkouka.jpg", "https://sumida-passion.github.io/game-assets/images/snsboushi.jpg", "https://sumida-passion.github.io/game-assets/images/sumida.PNG", "https://sumida-passion.github.io/game-assets/images/support01.png", "https://sumida-passion.github.io/game-assets/images/support02.png", "https://sumida-passion.github.io/game-assets/images/support03.png", "https://sumida-passion.github.io/game-assets/images/support04.png", "https://sumida-passion.github.io/game-assets/images/support05.jpg", "https://sumida-passion.github.io/game-assets/images/syokubunka.jpg", "https://sumida-passion.github.io/game-assets/images/taibousiki.jpg", "https://sumida-passion.github.io/game-assets/images/takoage.jpg", "https://sumida-passion.github.io/game-assets/images/tsujii.PNG", "https://sumida-passion.github.io/game-assets/images/ume.jpg", "https://sumida-passion.github.io/game-assets/images/volley.jpg", "https://sumida-passion.github.io/game-assets/images/youtien.jpg", "https://sumida-passion.github.io/syokai/", "https://www.narabunka.ed.jp/"];
self.addEventListener('install',e=>{
  e.waitUntil((async()=>{
    const c=await caches.open(CACHE_NAME);
    await c.addAll(LOCAL_ASSETS);
    await Promise.allSettled(REMOTE_ASSETS.map(u=>c.add(new Request(u,{mode:'cors'}))));
    self.skipWaiting();
  })());
});
self.addEventListener('activate',e=>{
  e.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)));
    self.clients.claim();
  })());
});
self.addEventListener('fetch',e=>{
  e.respondWith((async()=>{
    const cached=await caches.match(e.request);
    if(cached) return cached;
    try{
      const r=await fetch(e.request);
      const c=await caches.open(CACHE_NAME);
      c.put(e.request,r.clone()).catch(()=>{});
      return r;
    }catch(err){
      if(e.request.mode==='navigate') return caches.match('./index.html');
      return cached;
    }
  })());
});
