/* SECURITY HELPERS */
function sanitizeText(str) { const d = document.createElement('div'); d.textContent = str; return d.textContent; }
function isValidEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email); }
function isValidPhone(phone) { return /^[0-9+\-() ]{7,20}$/.test(phone); }
function setFieldError(el, msg) {
  el.classList.add('field-error');
  let m = el.parentElement.querySelector('.field-error-msg');
  if (!m) { m = document.createElement('span'); m.className = 'field-error-msg'; el.parentElement.appendChild(m); }
  m.textContent = msg;
}
function clearAllErrors(container) {
  container.querySelectorAll('.field-error').forEach(e => e.classList.remove('field-error'));
  container.querySelectorAll('.field-error-msg').forEach(e => e.remove());
}

/* ================================================================
   PORTFOLIO DATA — YOUR ONLY EDIT POINT FOR PORTFOLIO SLIDES
   ================================================================
   HOW TO ADD A NEW SLIDE (3 steps):
     1. Copy one { } block below
     2. Paste it after the last entry, before the closing ]
     3. Update src, eventType, title, and bg
     Save. The carousel builds automatically — no other changes needed.

   HOW TO REMOVE: delete the { } block.
   HOW TO REORDER: cut and paste blocks into any order.

   IMAGE SIZING: all slides use a 4:3 frame with object-fit:cover.
   Your photo always fills the frame at the same size regardless of
   its original dimensions. No stretching, no gaps.
   ================================================================ */

/* Builds all slides from PORTFOLIO_DATA and wires up the carousel.
   Called once on page load — do not call manually. */
function renderPortfolio() {
  const track    = document.getElementById('portfolioTrack');
  const dotsWrap = document.getElementById('portfolioDots');
  track.innerHTML = '';
  dotsWrap.innerHTML = '';

  if (!PORTFOLIO_DATA.length) {
    track.innerHTML = '<div class="portfolio-slide is-placeholder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg><span>Portfolio Photos Coming Soon</span></div>';
    return;
  }

  let current = 0;

  PORTFOLIO_DATA.forEach(function(item, i) {
    var slide = document.createElement('div');
    slide.className = 'portfolio-slide';
    if (item.bg) slide.style.background = item.bg;

    var img = document.createElement('img');
    img.src = item.src;
    img.alt = (item.eventType || '') + ' — ' + (item.title || '');
    slide.appendChild(img);

    // Caption always rendered — position:relative on .portfolio-slide
    // is the CSS fix that makes it anchor correctly.
    var cap = document.createElement('div');
    cap.className = 'portfolio-caption';
    cap.innerHTML = '<span>' + sanitizeText(item.eventType || '') + '</span><p>' + sanitizeText(item.title || '') + '</p>';
    slide.appendChild(cap);

    track.appendChild(slide);

    var dot = document.createElement('button');
    dot.className = 'portfolio-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Slide ' + (i + 1));
    dot.addEventListener('click', function() { goTo(i); });
    dotsWrap.appendChild(dot);
  });

  var slides = track.querySelectorAll('.portfolio-slide');

  function goTo(idx) {
    current = (idx + slides.length) % slides.length;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    dotsWrap.querySelectorAll('button').forEach(function(d, i) { d.classList.toggle('active', i === current); });
  }

  document.getElementById('portfolioPrevBtn').addEventListener('click', function() { goTo(current - 1); });
  document.getElementById('portfolioNextBtn').addEventListener('click', function() { goTo(current + 1); });
}

/* ================================================================
   SERVICE DATA — SINGLE SOURCE OF TRUTH FOR ALL SERVICE CONTENT
   ================================================================
   WHAT THIS CONTROLS (auto-updates everywhere on change):
     Service name   → modal header, card h3, booking form chip
     Event type     → modal page label, image badge, footer pill
     Title          → modal page title, booking form chip
     Price          → card price badge, modal price block, booking form
     Desc/includes  → modal info panel only

   HOW TO RENAME:
     Change  name: 'Hosting'  to  name: 'Professional Hosting'
     Done. Card badge, modal header, booking form — all update.

   HOW TO RENAME AN EVENT / CHANGE A TITLE:
     Find the page inside pages:[] and change eventType or title.
     Example:  title: '360 Slow-Mo Video Booth'  -> any new name
     Updates: modal title, image badge, pill, and booking chip.

   HOW TO CHANGE A PRICE:
     Change  price: '$300'  inside the page object.
     Card badge shows first page price automatically.
   ================================================================ */
const SERVICE_DATA = {

  /* HOSTING — change name here to rename the service everywhere */
 hosting: {
    name: 'Event Hosting',
    pages: [
      { eventType: 'Premium', title: 'Premium Hosting', price: '$500', priceLabel: 'Starting at', desc: 'Full-service hosting featuring audience engagement, interactive games, and professional program direction.', 
      includes: ['Professional Event Emcee','Basic Script Writing','Key Announcements','Microphone Handling','Full Script & Speech Writing','Interactive Games & Engagement','Comprehensive Program Management','VIP Guest Handling'], image: 'assets/Services/s-fullevent-setup-1.jpg' },

      { eventType: 'Custom', title: 'Custom Hosting Package', price: 'Custom Quote', priceLabel: 'Pricing', desc: 'Tailored hosting for unique events, brand launches, or specific events or ceremonies. Define your dream, and allow us to handle the details.', 
      includes: ['Tailored Event Script','Dedicated Event Emcee','Special Segment Hosting','Panel & Program Management','Custom Flow Design'], image: 'assets/Services/s-fullevent-setup-4.jpg' }
    ]
  },

  /* DECORATIONS — change name here to rename everywhere */
  decorations: {
    name: 'Decorations / Backdrop',
    pages: [
      { eventType: 'Basic', title: 'Basic Décor Package', price: '$250', priceLabel: 'Starting at', desc: 'Simple, elegant backdrop setup with essential table styling and accent lighting.', 
      includes: ['Single Backdrop Setup', 'Personalized Design'], image: 'assets/Services/s-backdrop-5.jpg' },

      { eventType: 'Standard', title: 'Standard Décor Package', price: '$400', priceLabel: 'Starting at', desc: 'Themed decor, balloon or floral installations, and a cohesive design that brings a specific vision to life.', 
      includes: ['Themed Backdrop Design','Balloon or Floral Installations', 'Personalized Design'], image: 'assets/Services/s-backdrop-2.jpg' },

      { eventType: 'Premium', title: 'Premium Décor Package', price: '$600', priceLabel: 'Starting at', desc: 'Full-room transformation including 3D backdrops, premium linens, custom structural pieces', 
      includes: ['Full Room Transformation','Custom 3D Backdrop Setup','Premium Linens & Draping','Floral Centerpiece Clusters'], image: 'assets/Services/s-backdrop-3.jpg' },

      { eventType: 'Custom', title: 'Custom Decoration Package', price: 'Custom Quote', priceLabel: 'Pricing', desc: 'Environment creation, including unique structural installations, specialty prop sourcing, and personalized theme development. Define your dream, and allow us to handle the details.', 
      includes: ['Backdrop Design','Unique Structural Installations','Specialty Prop Sourcing','Personalized Theme Development','Professional Installation Team'], image: 'assets/Services/s-backdrop-4.jpg' }
    ]
  },

  /* PHOTO BOOTH — change name here to rename everywhere */
  photobooth: {
    name: 'Photo / Studio Booth',
    pages: [
      { eventType: 'Basic', title: 'Basic Booth', price: '$300', priceLabel: 'Starting at', desc: 'Digital-only photo capture, social media sharing station, and a digital gallery.', 
      includes: ['Standard Backdrop','Personalized Photo Booth Design'], image: 'assets/Services/s-photobooth-1.jpg' },

      { eventType: 'Standard', title: 'Standard Booth', price: '$450', priceLabel: 'Starting at', desc: 'Unlimited high-quality physical prints, themed props, and a professional on-site attendant.', 
      includes: ['Themed Prop Collection','Digital Sharing Station','Professional On-Site Attendant','Personalized Photo Booth Design'], image: 'assets/Services/s-backdrop-6.jpg' },

      { eventType: 'Premium', title: 'Premium Booth', price: '$650', priceLabel: 'Starting at', desc: 'Studio-grade lighting, high-resolution DSLR quality, custom branding/overlays, and live retouching.', 
      includes: ['Studio-Grade Lighting','Professional DSLR Quality','High-Res Print Station','Custom Photo Border/Branding','Personalized Photo Booth Design'], image: 'assets/Services/s-fullevent-setup-closeup-4.jpg' },

      { eventType: 'Custom', title: 'Custom Booth Package', price: 'Custom Quote', priceLabel: 'Pricing', desc: 'fully branded interfaces, or custom green-screen effects. Define your dream, and allow us to handle the details.', 
      includes: ['Video/Photo Overlays','Fully Branded Interface','Custom Backdrop/Props','On-Site Technical Support'], image: 'assets/Services/s-stage-setup-4.jpg' }
    ]
  },

  /* REFRESHMENTS — change name here to rename everywhere */
  refreshments: {
    name: 'Refreshments',
    pages: [
      { eventType: 'Custom', title: 'Custom Refreshment Package', price: 'Custom Quote', priceLabel: 'Pricing', desc: 'A fully personalized menu, including specialty cuisines, specific dietary accommodations, and chef-led service. Define your dream, and allow us to handle the details.', 
      includes: ['Menu Planning','Customized Beverage Service'], image: 'assets/Services/s-refreshment-1.jpg' }
    ]
  },

  /* PROGRAM MANAGEMENT — change name here to rename everywhere */
  program: {
    name: 'Program Management',
    pages: [
      { eventType: 'Custom', title: 'Custom Program Management', price: 'Custom Quote', priceLabel: 'Pricing', desc: 'Specialized management for multi-day events, gala productions, or unique performances requiring production support. Define your dream, and allow us to handle the details.', 
      includes: ['Program Design','Multi-Stage Management','Staff Support'], image: 'assets/Services/s-fullevent-setup-4.jpg' }
    ]
  },

  /* EVENT COORDINATION — change name here to rename everywhere */
  coordination: {
    name: 'Custom Event',
    pages: [
      { eventType: 'Custom', title: 'Custom Event Package', price: 'Custom Quote', priceLabel: 'Pricing', desc: 'A completely personalized event solution built from scratch to meet specific, non-standard event requirements. Define your dream, and allow us to handle the details.', 
      includes: ['Personalized Event','Personalized Designs','Flexible Budget Planning'], image: 'assets/Services/s-fullevent-setup-4.jpg' }
    ]
  }

}; // end SERVICE_DATA

/* Reads SERVICE_DATA and updates each service card's price badge and
   h3 title so they always match the data above. Runs once on load. */
function initServiceCards() {
  document.querySelectorAll('.service-card[data-service-key]').forEach(function(card) {
    var key = card.getAttribute('data-service-key');
    var svc = SERVICE_DATA[key];
    if (!svc || !svc.pages.length) return;
    var badge = card.querySelector('.svc-price-badge');
    if (badge) {
      var fp = svc.pages[0].price;
      badge.textContent = (fp === 'Custom Quote') ? 'Custom Quote' : 'From ' + fp;
    }
    var h3 = card.querySelector('.svc-content h3');
    if (h3) h3.textContent = svc.name;
  });
}

/* SERVICE DETAIL MODAL */
var sdm = { serviceKey: null, pages: [], current: 0 };

function openDetailModal(serviceKey) {
  var data = SERVICE_DATA[serviceKey];
  if (!data) return;
  sdm.serviceKey = serviceKey;
  sdm.pages = data.pages;
  sdm.current = 0;
  document.getElementById('sdmServiceName').textContent = sanitizeText(data.name);

  var infoTrack = document.getElementById('sdmInfoTrack');
  infoTrack.innerHTML = '';
  data.pages.forEach(function(p) {
    var page = document.createElement('div');
    page.className = 'sdm-info-page';
    var isCustom = p.price === 'Custom Quote';
    var priceHTML = isCustom
      ? '<span class="sdm-price-from">' + sanitizeText(p.priceLabel) + '</span><span class="sdm-price-amount" style="font-size:1.35rem">Custom</span>'
      : '<span class="sdm-price-from">' + sanitizeText(p.priceLabel) + '</span><span class="sdm-price-amount">' + sanitizeText(p.price) + '</span><span class="sdm-price-unit">/ event</span>';
    var items = p.includes.map(function(i) { var li = document.createElement('li'); li.textContent = sanitizeText(i); return li.outerHTML; }).join('');
    page.innerHTML = '<span class="sdm-event-type-label">' + sanitizeText(p.eventType) + '</span><h3 class="sdm-event-title">' + sanitizeText(p.title) + '</h3><div class="sdm-price-block">' + priceHTML + '</div><p class="sdm-desc">' + sanitizeText(p.desc) + '</p><span class="sdm-includes-label">What\'s Included</span><ul class="sdm-includes-list">' + items + '</ul><p class="sdm-avail-note">Availability varies by date. Our team will confirm within 24 hours.</p>';
    infoTrack.appendChild(page);
  });

  var imgTrack = document.getElementById('sdmImgTrack');
  imgTrack.innerHTML = '';
  data.pages.forEach(function(p) {
    var page = document.createElement('div');
    if (p.image) {
      page.className = 'sdm-img-page';
      var img = document.createElement('img'); img.src = p.image; img.alt = sanitizeText(p.eventType); page.appendChild(img);
      var badge = document.createElement('div'); badge.className = 'sdm-img-badge'; badge.textContent = sanitizeText(p.eventType); page.appendChild(badge);
    } else {
      page.className = 'sdm-img-page no-img';
      page.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg><span>Photos coming soon</span>';
    }
    imgTrack.appendChild(page);
  });

  var dotsWrap = document.getElementById('sdmDots');
  dotsWrap.innerHTML = '';
  data.pages.forEach(function(_, i) {
    var d = document.createElement('button');
    d.className = 'sdm-dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', 'Go to page ' + (i + 1));
    d.addEventListener('click', function() { sdmGoTo(i); });
    dotsWrap.appendChild(d);
  });

  sdmGoTo(0);
  document.getElementById('svcDetailOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function sdmGoTo(idx) {
  var total = sdm.pages.length;
  sdm.current = (idx + total) % total;
  var p = sdm.pages[sdm.current];
  document.getElementById('sdmInfoTrack').style.transform = 'translateX(-' + (sdm.current * 100) + '%)';
  document.getElementById('sdmImgTrack').style.transform  = 'translateX(-' + (sdm.current * 100) + '%)';
  document.querySelectorAll('.sdm-dot').forEach(function(d, i) { d.classList.toggle('active', i === sdm.current); });
  document.getElementById('sdmPageCounter').textContent = (sdm.current + 1) + ' / ' + total;
  var svcName = SERVICE_DATA[sdm.serviceKey].name;
  document.getElementById('sdmSelectionPill').innerHTML = '<span class="pill-svc">' + sanitizeText(svcName) + '</span><span class="pill-sep">·</span><span class="pill-event">' + sanitizeText(p.eventType) + '</span><span class="pill-sep">·</span><span class="pill-price">' + sanitizeText(p.price) + '</span>';
}

function closeDetailModal() {
  document.getElementById('svcDetailOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

document.getElementById('sdmPrevBtn').addEventListener('click', function() { sdmGoTo(sdm.current - 1); });
document.getElementById('sdmNextBtn').addEventListener('click', function() { sdmGoTo(sdm.current + 1); });
document.getElementById('sdmCloseBtn').addEventListener('click', closeDetailModal);
document.getElementById('sdmBackBtn').addEventListener('click', closeDetailModal);

/* ================================================================
   FIX: Modal closes when user selects/drags text inside it
   ================================================================
   Root cause: when you click inside the modal and drag text to
   select it, mouseup lands on the overlay, firing a 'click' event
   with e.target === overlay — which triggered closeDetailModal().

   Fix: track where mousedown started. Only close if BOTH mousedown
   AND click landed on the backdrop itself, never on a child element.
   ================================================================ */
var _svcMdownOnBackdrop  = false;
var _bookMdownOnBackdrop = false;

var svcOverlay = document.getElementById('svcDetailOverlay');
svcOverlay.addEventListener('mousedown', function(e) { _svcMdownOnBackdrop = (e.target === svcOverlay); });
svcOverlay.addEventListener('click', function(e) {
  if (e.target === svcOverlay && _svcMdownOnBackdrop) closeDetailModal();
  _svcMdownOnBackdrop = false;
});

document.getElementById('sdmProceedBtn').addEventListener('click', function() {
  var p = sdm.pages[sdm.current];
  goToBookingFrom(SERVICE_DATA[sdm.serviceKey].name, p.eventType, p.title, p.price);
});

/* BOOKING MODAL */
function goToBookingFrom(serviceName, eventType, eventTitle, price) {
  closeDetailModal();
  setTimeout(function() {
    document.getElementById('bmChipService').textContent  = sanitizeText(serviceName);
    document.getElementById('bmChipEvent').textContent    = sanitizeText(eventTitle);
    document.getElementById('bmChipPrice').textContent    = sanitizeText(price);
    document.getElementById('bf-selected-service').value = sanitizeText(serviceName);
    document.getElementById('bf-selected-event').value   = sanitizeText(eventTitle);
    document.getElementById('bf-selected-price').value   = sanitizeText(price);
    document.getElementById('bf-service-name').value     = sanitizeText(serviceName);
    document.getElementById('bf-event-name').value       = sanitizeText(eventTitle);
    document.getElementById('bf-price').value            = sanitizeText(price);
    ['bf-fname','bf-lname','bf-email','bf-phone','bf-date','bf-notes','bf-location'].forEach(function(id) { var el = document.getElementById(id); if (el) el.value = ''; });
    var gc = document.getElementById('bf-guest-count'); if (gc) gc.value = '';
    clearAllErrors(document.getElementById('bookFormWrap'));
    var btn = document.getElementById('bookSubmitBtn'); btn.disabled = false; btn.textContent = 'Book Consultation';
    document.getElementById('bookFormWrap').style.display = 'block';
    document.getElementById('bookSuccess').classList.remove('show');
    document.getElementById('bookOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
  }, 260);
}

function closeBookModal() {
  document.getElementById('bookOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

document.getElementById('bookCloseBtn').addEventListener('click', closeBookModal);
document.getElementById('bookBackBtn').addEventListener('click', function() {
  closeBookModal();
  setTimeout(function() { document.getElementById('svcDetailOverlay').classList.add('active'); document.body.style.overflow = 'hidden'; }, 260);
});

/* Same mousedown-tracking fix for booking modal */
var bookOverlay = document.getElementById('bookOverlay');
bookOverlay.addEventListener('mousedown', function(e) { _bookMdownOnBackdrop = (e.target === bookOverlay); });
bookOverlay.addEventListener('click', function(e) {
  if (e.target === bookOverlay && _bookMdownOnBackdrop) closeBookModal();
  _bookMdownOnBackdrop = false;
});

/* BOOKING SUBMISSION */
function submitBooking() {
  var btn = document.getElementById('bookSubmitBtn');
  if (btn.disabled) return;
  var wrap = document.getElementById('bookFormWrap');
  clearAllErrors(wrap);
  var fname = document.getElementById('bf-fname').value.trim();
  var lname = document.getElementById('bf-lname').value.trim();
  var email = document.getElementById('bf-email').value.trim();
  var phone = document.getElementById('bf-phone').value.trim();
  var location = document.getElementById('bf-location').value.trim();
  var date  = document.getElementById('bf-date').value;
  var notes = document.getElementById('bf-notes').value.trim();
  var gRaw  = document.getElementById('bf-guest-count').value.trim();
  var guestCount = gRaw !== '' ? parseInt(gRaw, 10) : null;
  var hasError = false;
  if (fname.length < 1) { setFieldError(document.getElementById('bf-fname'), 'First name is required.'); hasError = true; }
  if (lname.length < 1) { setFieldError(document.getElementById('bf-lname'), 'Last name is required.'); hasError = true; }
  if (!email) { setFieldError(document.getElementById('bf-email'), 'Email is required.'); hasError = true; }
  else if (!isValidEmail(email)) { setFieldError(document.getElementById('bf-email'), 'Enter a valid email address.'); hasError = true; }
  if (!phone) { setFieldError(document.getElementById('bf-phone'), 'Contact number is required.'); hasError = true; }
  else if (!isValidPhone(phone)) { setFieldError(document.getElementById('bf-phone'), 'Enter a valid phone number.'); hasError = true; }
  if (!date) { setFieldError(document.getElementById('bf-date'), 'Please select a preferred date.'); hasError = true; }
  else { var sel = new Date(date); var today = new Date(); today.setHours(0,0,0,0); if (sel < today) { setFieldError(document.getElementById('bf-date'), 'Please select a future date.'); hasError = true; } }
  if (guestCount !== null && (isNaN(guestCount) || guestCount < 1 || guestCount > 9999)) { setFieldError(document.getElementById('bf-guest-count'), 'Enter a realistic guest count (1-9999).'); hasError = true; }
  if (hasError) return;
  btn.disabled = true; btn.textContent = 'Submitting...';
  var payload = { service: sanitizeText(document.getElementById('bf-service-name').value), eventType: sanitizeText(document.getElementById('bf-event-name').value), price: sanitizeText(document.getElementById('bf-price').value), firstName: sanitizeText(fname), lastName: sanitizeText(lname), email: sanitizeText(email), phone: sanitizeText(phone), guestCount: guestCount, location: sanitizeText(location), date: date, notes: sanitizeText(notes) };
  console.log('Booking payload (ready for n8n):', payload);
  /* Replace setTimeout with fetch() to your n8n webhook:
  fetch('https://YOUR_N8N_WEBHOOK_URL', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload) })
  .then(function(r){ if(!r.ok) throw new Error(); showSuccess(); })
  .catch(function(){ btn.disabled=false; btn.textContent='Book Consultation'; alert('Something went wrong.'); }); */
  setTimeout(function() {
    document.getElementById('bookFormWrap').style.display = 'none';
    document.getElementById('successSvcName').textContent = payload.service + ' — ' + payload.eventType;
    document.getElementById('bookSuccess').classList.add('show');
  }, 1000);
}

/* CONTACT FORM */
function submitContactForm() {
  var btn = document.getElementById('contactSubmitBtn');
  var fname = document.getElementById('fname').value.trim();
  var lname = document.getElementById('lname').value.trim();
  var email = document.getElementById('email').value.trim();
  var phone = document.getElementById('phone').value.trim();
  if (fname.length < 1) { alert('Please enter a valid first name.'); return; }
  if (lname.length < 1) { alert('Please enter a valid last name.'); return; }
  if (!isValidEmail(email)) { alert('Please enter a valid email address.'); return; }
  if (!isValidPhone(phone)) { alert('Please enter a valid phone number.'); return; }
  btn.disabled = true; btn.textContent = 'Sending...';
  setTimeout(function() { alert("Thank you! We'll be in touch soon."); btn.disabled = false; btn.textContent = 'Send Message'; }, 1000);
}

/* NAV */
var nav = document.getElementById('main-nav');
var navBrand = document.getElementById('navBrand');
var homeSection = document.getElementById('home');
function checkNav() {
  navBrand.classList.toggle('visible', window.scrollY >= homeSection.offsetHeight * 0.8);
  nav.classList.toggle('scrolled', window.scrollY > 30);
}
window.addEventListener('scroll', checkNav);
checkNav();
document.getElementById('hamburger').addEventListener('click', function() { document.getElementById('mobile-menu').classList.toggle('open'); });
function closeMobile() { document.getElementById('mobile-menu').classList.remove('open'); }

/* SCROLL REVEAL */
var revealObs = new IntersectionObserver(function(entries) { entries.forEach(function(e) { if (e.isIntersecting) e.target.classList.add('visible'); }); }, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(function(el) { revealObs.observe(el); });

/* TESTIMONIALS CAROUSEL (auto-play) */
(function() {
  var track = document.getElementById('testiTrack');
  var slides = track.querySelectorAll('.testi-slide');
  var dotsWrap = document.getElementById('testiDots');
  var current = 0, timer;
  slides.forEach(function(_, i) {
    var d = document.createElement('button');
    d.className = 'testi-dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', 'Slide ' + (i + 1));
    d.addEventListener('click', function() { go(i); });
    dotsWrap.appendChild(d);
  });
  function go(idx) {
    current = (idx + slides.length) % slides.length;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    dotsWrap.querySelectorAll('button').forEach(function(d, i) { d.classList.toggle('active', i === current); });
    clearInterval(timer); timer = setInterval(function() { go(current + 1); }, 5000);
  }
  document.getElementById('testiPrevBtn').addEventListener('click', function() { go(current - 1); });
  document.getElementById('testiNextBtn').addEventListener('click', function() { go(current + 1); });
  timer = setInterval(function() { go(current + 1); }, 5000);
})();

/* ESC TO CLOSE */
document.addEventListener('keydown', function(e) { if (e.key === 'Escape') { closeDetailModal(); closeBookModal(); } });

/* INITIALISE ON LOAD */
renderPortfolio();   // builds portfolio slides from PORTFOLIO_DATA
initServiceCards();  // syncs card price badges + titles from SERVICE_DATA
