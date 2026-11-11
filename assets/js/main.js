(function(){
'use strict';
const cfg=window.BARICA_CONFIG||{};
const qs=(s,root=document)=>root.querySelector(s),qsa=(s,root=document)=>Array.from(root.querySelectorAll(s));
const safeStore={get(key){try{return localStorage.getItem(key)}catch{return null}},set(key,val){try{localStorage.setItem(key,val)}catch{}}};
const safeSession={get(key){try{return sessionStorage.getItem(key)}catch{return null}},set(key,val){try{sessionStorage.setItem(key,val)}catch{}}};
// Accessibility-friendly intro — 2.6 seconds only on first visit in a tab.
const intro=qs('.intro');
if(intro){
  let timer;
  const hideIntro=()=>{clearTimeout(timer);intro.classList.add('is-hidden');intro.setAttribute('aria-hidden','true');setTimeout(()=>{intro.hidden=true},470)};
  if(safeSession.get('baricaIntroSeen')==='1'||window.matchMedia('(prefers-reduced-motion: reduce)').matches){intro.hidden=true}
  else{safeSession.set('baricaIntroSeen','1');timer=setTimeout(hideIntro,2550);qs('.intro__skip')?.addEventListener('click',hideIntro)}
}
const header=qs('.site-header');const menuToggle=qs('.menu-toggle');const nav=qs('.main-nav');
const setNav=(open)=>{if(!menuToggle||!nav)return;menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Zatvori izbornik':'Otvori izbornik');nav.classList.toggle('is-open',open);document.body.classList.toggle('nav-open',open)};
menuToggle?.addEventListener('click',()=>setNav(menuToggle.getAttribute('aria-expanded')!=='true'));
qsa('.main-nav a').forEach(a=>a.addEventListener('click',()=>setNav(false)));
document.addEventListener('keydown',e=>{if(e.key==='Escape')setNav(false)});
document.addEventListener('click',e=>{if(nav?.classList.contains('is-open')&&!nav.contains(e.target)&&!menuToggle?.contains(e.target))setNav(false)});
const onScroll=()=>header?.classList.toggle('is-scrolled',window.scrollY>12);
addEventListener('scroll',onScroll,{passive:true});onScroll();
// Section reveal; all content remains visible with JS disabled and reduced motion.
const els=qsa('.reveal');if('IntersectionObserver'in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){let obs=new IntersectionObserver((entries)=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('is-visible');obs.unobserve(entry.target)}}},{threshold:.09,rootMargin:'0px 0px -15px 0px'});els.forEach(el=>obs.observe(el));setTimeout(()=>els.forEach(e=>e.classList.add('is-visible')),2700)}else els.forEach(el=>el.classList.add('is-visible'));
// Footer year
qsa('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
// Cookie preference management — nonessential scripts never load without acceptance.
const CONSENT_KEY='baricaCookieConsentV1';const cookieBanner=qs('.cookie-banner'),cookieModal=qs('.cookie-modal');const analyticsInput=qs('#cookie-analytics');
let prefs=null;try{const val=safeStore.get(CONSENT_KEY);if(val){const obj=JSON.parse(val);if(typeof obj.analytics==='boolean')prefs=obj}}catch{}
function initAnalytics(){if(!prefs?.analytics||!cfg.gaMeasurementId||!/^G-[A-Z0-9]+$/.test(cfg.gaMeasurementId)||window.baricaAnalyticsLoaded)return;
  window.baricaAnalyticsLoaded=true;window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments)};
  window.gtag('js',new Date());window.gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'granted'});
  window.gtag('config',cfg.gaMeasurementId,{anonymize_ip:true});
  const s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(cfg.gaMeasurementId);document.head.append(s);
}
function persistConsent(analytics){prefs={necessary:true,analytics,updatedAt:new Date().toISOString()};safeStore.set(CONSENT_KEY,JSON.stringify(prefs));cookieBanner&&(cookieBanner.hidden=true);cookieModal&&(cookieModal.hidden=true);document.body.style.overflow='';if(analytics)initAnalytics();else if(window.gtag)window.gtag('consent','update',{analytics_storage:'denied'});}
if(cookieBanner)cookieBanner.hidden=!!prefs;
if(prefs?.analytics)initAnalytics();
qsa('[data-cookie-accept]').forEach(b=>b.addEventListener('click',()=>persistConsent(true)));
qsa('[data-cookie-reject]').forEach(b=>b.addEventListener('click',()=>persistConsent(false)));
const openSettings=()=>{if(!cookieModal)return;cookieModal.hidden=false;analyticsInput&&(analyticsInput.checked=!!prefs?.analytics);qs('.cookie-modal__panel')?.focus();};
qsa('[data-cookie-settings]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();openSettings()}));
qsa('[data-cookie-close]').forEach(el=>el.addEventListener('click',()=>{cookieModal.hidden=true}));
qs('[data-cookie-save]')?.addEventListener('click',()=>persistConsent(!!analyticsInput?.checked));
cookieModal?.addEventListener('click',e=>{if(e.target===cookieModal)cookieModal.hidden=true});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&cookieModal&&!cookieModal.hidden)cookieModal.hidden=true});
// Accessible gallery filters and lightbox.
const gallery=qsa('[data-gallery-photo]'),lightbox=qs('.lightbox');let galleryIndex=0;let focusBefore=null;
qsa('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{let f=btn.dataset.filter;qsa('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===btn)));gallery.forEach(item=>item.hidden=f!=='all'&&item.dataset.category!==f)}));
const visiblePhotos=()=>gallery.filter(x=>!x.hidden);
function showPhoto(i){let items=visiblePhotos();if(!items.length)return;galleryIndex=(i+items.length)%items.length;let item=items[galleryIndex];const img=qs('.lightbox__image'),caption=qs('.lightbox__caption');if(img){img.src=item.dataset.image;img.alt=item.dataset.alt||''}if(caption)caption.textContent=item.dataset.caption||'';}
function openPhoto(item){if(!lightbox)return;focusBefore=document.activeElement;const items=visiblePhotos();showPhoto(items.indexOf(item));lightbox.hidden=false;document.body.style.overflow='hidden';qs('.lightbox__close')?.focus();}
function closePhoto(){if(!lightbox)return;lightbox.hidden=true;document.body.style.overflow='';qs('.lightbox__image')?.removeAttribute('src');focusBefore?.focus?.();}
gallery.forEach(item=>item.addEventListener('click',()=>openPhoto(item)));
qs('.lightbox__close')?.addEventListener('click',closePhoto);
qs('.lightbox__prev')?.addEventListener('click',()=>showPhoto(galleryIndex-1));
qs('.lightbox__next')?.addEventListener('click',()=>showPhoto(galleryIndex+1));
lightbox?.addEventListener('click',e=>{if(e.target===lightbox)closePhoto()});
document.addEventListener('keydown',e=>{if(!lightbox||lightbox.hidden)return;if(e.key==='Escape')closePhoto();if(e.key==='ArrowLeft')showPhoto(galleryIndex-1);if(e.key==='ArrowRight')showPhoto(galleryIndex+1);if(e.key==='Tab'){const focusables=qsa('button:not([disabled])',lightbox);let i=focusables.indexOf(document.activeElement);if(e.shiftKey&&i===0){focusables.at(-1).focus();e.preventDefault()}else if(!e.shiftKey&&i===focusables.length-1){focusables[0].focus();e.preventDefault()}}});
// Contact form: use Web3Forms only after real key is configured. Otherwise open mail client; never fake success.
const form=qs('#contactForm');if(form){const submit=qs('[type=submit]',form),status=qs('.form-status',form);const hasKey=!!cfg.web3formsAccessKey;
  if(!hasKey&&submit)submit.textContent='Pripremi e-mail';
  form.addEventListener('submit',async e=>{e.preventDefault();status.textContent='';status.className='form-status';if(!form.reportValidity())return;
    const fd=new FormData(form);const name=String(fd.get('name')||'').trim(),email=String(fd.get('email')||'').trim(),phone=String(fd.get('phone')||'').trim(),message=String(fd.get('message')||'').trim();
    if(!name||!email||!message)return;
    if(!hasKey){const subject=encodeURIComponent('Upit s web stranice BARICA — '+name);const body=encodeURIComponent('Ime i prezime: '+name+'\nE-mail: '+email+'\nTelefon: '+(phone||'nije naveden')+'\n\nPoruka:\n'+message);status.textContent='Otvara se vaša e-mail aplikacija. Provjerite poruku i pošaljite je iz aplikacije.';status.classList.add('is-success');window.location.href='mailto:'+(cfg.email||'fsbarica@gmail.com')+'?subject='+subject+'&body='+body;return;}
    fd.set('access_key',cfg.web3formsAccessKey);fd.set('subject','Novi upit — Barica');fd.set('from_name','Web stranica Barica');submit.disabled=true;submit.textContent='Slanje poruke…';
    try{let response=await fetch('https://api.web3forms.com/submit',{method:'POST',body:fd});let data=await response.json();if(!response.ok||!data.success)throw new Error('Slanje nije uspjelo');status.textContent='Hvala vam. Vaša poruka uspješno je poslana.';status.classList.add('is-success');form.reset()}
    catch{status.textContent='Poruka nije poslana. Pokušajte ponovno ili nazovite salon.';status.classList.add('is-error')}
    finally{submit.disabled=false;submit.textContent='Pošalji upit'}
  });}
})();
