const VERSION='prezen2-noiframe-20260624-2';
self.addEventListener('install',event=>{self.skipWaiting();});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{try{const keys=await caches.keys();await Promise.all(keys.map(k=>caches.delete(k)));}catch(e){} await self.clients.claim();})());});
self.addEventListener('message',event=>{if(event.data&&event.data.type==='SKIP_WAITING') self.skipWaiting();});
function isTankyu(path){path=path.toLowerCase();return path.endsWith('/tankyu2.html')||path.endsWith('/tankyu2/index.html')||path.endsWith('/tankyu-2.html')||path.endsWith('/tankyu2_fixed_start.html')||path.endsWith('/tankyu%202.html')||path.endsWith('/tankyu 2.html');}
function inject(html){
  if(html.includes('PREZEN2_NOIFRAME_BRIDGE')) return html;
  const bridge=`\n<script id="PREZEN2_NOIFRAME_BRIDGE">\n(function(){\n  const SYOKAI='./syokai2.html';\n  function goSyokai(){ document.body.classList.add('prezen2-going-syokai'); setTimeout(function(){ location.href=SYOKAI; },120); }\n  const css='.prezen2-bridge-btn{position:fixed;right:22px;bottom:20px;z-index:2147483647;border:0;border-radius:999px;background:rgba(8,51,111,.94);color:#fff8ea;padding:14px 22px;font-weight:950;font-size:16px;box-shadow:0 12px 28px rgba(0,0,0,.32);opacity:0;pointer-events:none;transform:translateY(10px);transition:.25s ease}.prezen2-bridge-btn.show{opacity:1;pointer-events:auto;transform:translateY(0)}.prezen2-going-syokai{animation:prezen2White .55s ease both}@keyframes prezen2White{to{filter:brightness(1.35) blur(4px);opacity:.18}}';\n  const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);\n  const btn=document.createElement('button');btn.className='prezen2-bridge-btn';btn.textContent='学校紹介へ';btn.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();goSyokai();},true);document.addEventListener('DOMContentLoaded',function(){document.body.appendChild(btn);update();});\n  function slides(){return Array.from(document.querySelectorAll('.slide'));}\n  function activeSlide(){const s=slides();return document.querySelector('.slide.active')||s.find(x=>getComputedStyle(x).display!=='none')||null;}\n  function isLast(){const s=slides();if(!s.length)return false;const a=activeSlide();return !!a&&(a===s[s.length-1]||a.id==='finalSlide');}\n  function update(){btn.classList.toggle('show',isLast());}\n  document.addEventListener('click',function(e){\n    const a=e.target.closest&&e.target.closest('a[href],#prezen2NextSyokai,#finalHpCard,.final-card');\n    if(a){const h=(a.getAttribute&&a.getAttribute('href')||'').toLowerCase(); if(h.includes('narabunka.ed.jp')||h.includes('syokai')||h.includes('syoukai')||h.includes('hpmain')||a.id==='prezen2NextSyokai'||a.id==='finalHpCard'||(a.classList&&a.classList.contains('final-card'))){e.preventDefault();e.stopPropagation();goSyokai();return;}}\n    setTimeout(update,80);\n  },true);\n  document.addEventListener('keydown',function(e){if((e.key==='ArrowRight'||e.key===' '||e.key==='Enter')&&isLast()){e.preventDefault();goSyokai();}else setTimeout(update,80);},true);\n  const mo=new MutationObserver(update);\n  document.addEventListener('DOMContentLoaded',function(){mo.observe(document.body,{subtree:true,attributes:true,attributeFilter:['class','style']});update();});\n  setInterval(update,500);\n})();\n<\/script>\n`;
  if(html.includes('</body>')) return html.replace('</body>', bridge+'</body>');
  return html+bridge;
}
self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.method!=='GET') return;
  const url=new URL(req.url);
  if(!isTankyu(url.pathname)) return;
  event.respondWith((async()=>{
    const res=await fetch(req,{cache:'no-store'});
    const ct=res.headers.get('content-type')||'';
    const text=await res.text();
    return new Response(inject(text),{status:res.status,statusText:res.statusText,headers:{'content-type':ct.includes('text/html')?ct:'text/html; charset=UTF-8','cache-control':'no-store'}});
  })());
});