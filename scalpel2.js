(function () {
  'use strict';

  /* ═══════════════════════════════════════════
     THE SCALPEL DISPATCH — Interactive Engine
     GSAP · ScrollTrigger · Native Scroll Performance
     ═══════════════════════════════════════════ */

  /* ── Detect touch device ── */
  var isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  /* ══════════════════════════════
     1. NATIVE SMOOTH SCROLL (Performance optimized)
     ══════════════════════════════ */
     
  /* Smooth nav links */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 30,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ══════════════════════════════
     2. SCROLL PROGRESS & GRAIN OPACITY 
     ══════════════════════════════ */

  var progressBar = document.querySelector('.scroll-progress');
  var grainEl = document.querySelector('.grain-overlay');
  var lastScrollY = window.scrollY;

  window.addEventListener('scroll', function () {
    /* Progress bar */
    var h = document.documentElement;
    var pct = (window.scrollY / (h.scrollHeight - h.clientHeight)) * 100;
    if (progressBar) progressBar.style.height = pct + '%';

    /* Velocity grain (Native check instead of Lenis velocity) */
    if (grainEl && !isTouch) {
      var currentScrollY = window.scrollY;
      var velocity = Math.abs(currentScrollY - lastScrollY);
      // More visible grain based on native scroll speed
      var targetOpacity = Math.min(0.12, 0.035 + velocity * 0.001);
      gsap.to(grainEl, { opacity: targetOpacity, duration: 0.2, overwrite: 'auto' });
      lastScrollY = currentScrollY;
    }
  }, { passive: true });

  /* ══════════════════════════════
     3. CUSTOM CURSOR
     ══════════════════════════════ */

  var isFinePointer = window.matchMedia('(pointer: fine)').matches;
  if (!isTouch && isFinePointer) {
    document.body.style.cursor = 'none';
    var dot = document.querySelector('.cursor-dot');
    var ring = document.querySelector('.cursor-ring');
    var mouseX = 0, mouseY = 0;
    var ringX = 0, ringY = 0;

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.set(dot, { x: mouseX, y: mouseY });
    });

    /* Ring follows with lag */
    gsap.ticker.add(function () {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      gsap.set(ring, { x: ringX, y: ringY });
    });

    /* Hover detection for interactive elements */
    var hoverTargets = 'a, nav a, .telegram-box, .wf-step, .rid, .step-num, .wax-seal, .problem, button';
    document.querySelectorAll(hoverTargets).forEach(function (el) {
      el.addEventListener('mouseenter', function () { document.body.classList.add('cursor-hover'); });
      el.addEventListener('mouseleave', function () { document.body.classList.remove('cursor-hover'); });
    });

    /* Click feedback */
    document.addEventListener('mousedown', function () { document.body.classList.add('cursor-click'); });
    document.addEventListener('mouseup', function () { document.body.classList.remove('cursor-click'); });
  }

  /* ══════════════════════════════
     4. TEXT SPLITTING (Safely Excludes Main Title)
     ══════════════════════════════ */

  function splitChars(el) {
    if (!el) return [];
    var text = el.textContent;
    el.textContent = '';
    el.setAttribute('aria-label', text);
    for (var i = 0; i < text.length; i++) {
      var span = document.createElement('span');
      span.className = 'char';
      span.textContent = text[i] === ' ' ? '\u00A0' : text[i];
      span.setAttribute('aria-hidden', 'true');
      el.appendChild(span);
    }
    return el.querySelectorAll('.char');
  }

  function splitWords(el) {
    // Preserve stamp if exists
    var stamp = el.querySelector('.stamp');
    var stampHTML = stamp ? stamp.outerHTML : '';
    
    // Safely extract text nodes
    var textNodes = Array.from(el.childNodes).filter(function(node) {
      return node.nodeType === 3 && node.textContent.trim().length > 0;
    });
    
    var textOnly = textNodes.map(function(node) { return node.textContent; }).join(' ').trim();
    var words = textOnly.split(/\s+/);
    
    el.innerHTML = '';
    words.forEach(function (w) {
      var outer = document.createElement('span');
      outer.className = 'word';
      var inner = document.createElement('span');
      inner.className = 'word-inner';
      inner.textContent = w;
      outer.appendChild(inner);
      el.appendChild(outer);
      el.appendChild(document.createTextNode(' '));
    });
    
    if (stampHTML) {
      el.innerHTML += stampHTML;
    }
    
    return el.querySelectorAll('.word-inner');
  }

  /* ══════════════════════════════
     5. GSAP — Intro Timeline
     ══════════════════════════════ */

  gsap.registerPlugin(ScrollTrigger);

  var intro = gsap.timeline({ defaults: { ease: 'power3.out' } });

  /* Split broadside title into characters */
  var brdTitle = document.querySelector('.brd-title');
  var titleChars = splitChars(brdTitle);

  intro
    .to('.masthead', { opacity: 1, duration: 0.4, delay: 0.1 })
    .from('.mast-publication', { opacity: 0, y: 10, duration: 0.4 }, '-=0.2')
    .from('.mast-subline', { opacity: 0, duration: 0.3 }, '-=0.2')
    .from('nav a', { opacity: 0, y: 4, stagger: 0.03, duration: 0.25 }, '-=0.15')
    .to('.broadside', { opacity: 1, duration: 0.4 }, '-=0.1')
    .from('.brd-ornament', { opacity: 0, duration: 0.2 }, '-=0.2')
    .from('.brd-announce', { opacity: 0, duration: 0.2 }, '-=0.1')
    .from(titleChars, {
      opacity: 0,
      y: 30,
      rotationX: -45,
      stagger: 0.02,
      duration: 0.4,
      ease: 'back.out(1.4)'
    }, '-=0.2')
    .from('.brd-rule', { scaleX: 0, duration: 0.3, ease: 'power2.inOut' }, '-=0.2')
    .from('.brd-desc', { opacity: 0, y: 8, duration: 0.3 }, '-=0.2')
    .from('.brd-link', { opacity: 0, duration: 0.25 }, '-=0.15');

  /* ══════════════════════════════
     6. PREAMBLE
     ══════════════════════════════ */

  gsap.to('.preamble', {
    opacity: 1,
    duration: 0.8,
    scrollTrigger: { trigger: '.preamble', start: 'top 85%' }
  });

  /* ══════════════════════════════
     7. SECTION HEADING REVEALS
     ══════════════════════════════ */

  /* IMPORTANT: Exclude .brd-title so it doesn't overwrite the characters split above */
  document.querySelectorAll('h2:not(.brd-title)').forEach(function (h2) {
    var wordInners = splitWords(h2);
    gsap.from(wordInners, {
      y: '100%',
      stagger: 0.04,
      duration: 0.55,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: h2,
        start: 'top 86%',
        toggleActions: 'play none none none'
      }
    });
  });

  /* ══════════════════════════════
     8. GENERIC REVEALS
     ══════════════════════════════ */

  document.querySelectorAll('.reveal').forEach(function (el) {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.55,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none'
      }
    });
  });

  document.querySelectorAll('.reveal-fade').forEach(function (el) {
    gsap.to(el, {
      opacity: 1,
      duration: 0.6,
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none'
      }
    });
  });

  /* ══════════════════════════════
     9. STAGGERED GROUP REVEALS
     ══════════════════════════════ */

  function staggerReveal(triggerSel, childSel, opts) {
    ScrollTrigger.create({
      trigger: triggerSel,
      start: opts.start || 'top 82%',
      once: true,
      onEnter: function () {
        gsap.to(childSel, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: opts.duration || 0.45,
          stagger: opts.stagger || 0.08,
          ease: opts.ease || 'power2.out'
        });
      }
    });
  }

  gsap.set('.problem, .wf-step, .principle, .rules .rule, .telegram-box, .steps .step', { opacity: 0, y: 15 });
  
  staggerReveal('.problems', '.problem', { stagger: 0.1 });
  staggerReveal('.workflow-steps', '.wf-step', { stagger: 0.09 });
  staggerReveal('.principles', '.principle', { stagger: 0.06 });
  staggerReveal('.rules', '.rules .rule', { stagger: 0.05, duration: 0.35 });
  staggerReveal('.telegram-row', '.telegram-box', { stagger: 0.15, duration: 0.5 });
  staggerReveal('.steps', '.steps .step', { stagger: 0.12, duration: 0.45 });

  /* ══════════════════════════════
     10. RUBBER STAMP SLAM & SHAKE
     ══════════════════════════════ */

  var stamp = document.querySelector('.stamp');
  if (stamp) {
    ScrollTrigger.create({
      trigger: stamp.closest('h2'), // Trigger on the heading, not the giant stamp bounding box
      start: 'top 60%', // Trigger higher so user sees it drop
      once: true,
      onEnter: function () {
        if (window.innerWidth <= 620) return; // Skip stamp and shake on mobile
        
        // Fade in quickly while massive
        gsap.to(stamp, { opacity: 0.85, duration: 0.15 });
        gsap.to(stamp, {
          scale: 1,
          rotation: -10,
          duration: 0.6,
          ease: 'expo.in', // Accelerates into a violent slam
          onComplete: function() {
            /* Intense screen shake on stamp impact applied to wrapper */
            gsap.to('#page-wrapper', { x: 8, y: -4, duration: 0.05, yoyo: true, repeat: 5, onComplete: function() { gsap.set('#page-wrapper', {x: 0, y: 0}); } });
          }
        });
      }
    });
  }

  /* ══════════════════════════════
     11. TABLE ROWS
     ══════════════════════════════ */

  ScrollTrigger.create({
    trigger: '.ledger',
    start: 'top 84%',
    once: true,
    onEnter: function () {
      gsap.from('.ledger tbody tr', {
        opacity: 0, x: -10,
        duration: 0.35,
        stagger: 0.07,
        ease: 'power2.out'
      });
    }
  });


  /* ══════════════════════════════
     12. WAX SEAL — back to top
     ══════════════════════════════ */

  var seal = document.querySelector('.wax-seal');
  if (seal) {
    ScrollTrigger.create({
      trigger: seal,
      start: 'top 92%',
      once: true,
      onEnter: function () {
        gsap.from(seal, {
          scale: 0,
          rotation: -200,
          opacity: 0,
          duration: 0.7,
          ease: 'back.out(1.8)'
        });
      }
    });

    seal.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    seal.setAttribute('title', 'Back to top');
  }

  /* ══════════════════════════════
     13. PAGE AGING ON SCROLL
     ══════════════════════════════ */

  gsap.to('body', {
    backgroundColor: '#e8d4a0',
    scrollTrigger: {
      trigger: 'footer',
      start: 'top bottom',
      end: 'bottom bottom',
      scrub: 2
    }
  });

  /* ══════════════════════════════
     14. FLOATING DUST PARTICLES (Optimized for performance)
     ══════════════════════════════ */

  var dustCanvas = document.querySelector('.dust-canvas');
  if (dustCanvas && !isTouch) {
    var ctx = dustCanvas.getContext('2d', { alpha: true });
    var particles = [];
    var particleCount = 70;

    function resizeCanvas() {
      dustCanvas.width = window.innerWidth;
      dustCanvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    /* Create particles */
    for (var i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: -Math.random() * 0.3 - 0.1, 
        opacity: Math.random() * 0.4 + 0.1, 
        flickerSpeed: Math.random() * 0.03 + 0.01
      });
    }

    var frameCount = 0;

    function drawDust() {
      ctx.clearRect(0, 0, dustCanvas.width, dustCanvas.height);
      frameCount++;

      for (var j = 0; j < particles.length; j++) {
        var p = particles[j];
        p.x += p.speedX;
        p.y += p.speedY;

        var flicker = Math.sin(frameCount * p.flickerSpeed) * 0.2;
        var alpha = Math.max(0, p.opacity + flicker);

        if (p.x < -20) p.x = dustCanvas.width + 20;
        if (p.x > dustCanvas.width + 20) p.x = -20;
        if (p.y < -20) p.y = dustCanvas.height + 20;
        if (p.y > dustCanvas.height + 20) p.y = -20;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        /* Removed shadowBlur as it causes extreme rendering lag during scroll */
        ctx.fillStyle = 'rgba(230, 190, 120, ' + alpha + ')';
        ctx.fill();
      }

      requestAnimationFrame(drawDust);
    }
    drawDust();
  }

  /* ══════════════════════════════
     15. MAGNETIC HOVER PULL
     ══════════════════════════════ */

  if (!isTouch) {
    document.querySelectorAll('.rid, .step-num, .wf-num, .pnum-col, .wax-seal').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var rect = el.getBoundingClientRect();
        var dx = e.clientX - rect.left - rect.width / 2;
        var dy = e.clientY - rect.top - rect.height / 2;
        gsap.to(el, { x: dx * 0.35, y: dy * 0.35, duration: 0.2, ease: 'power2.out', overwrite: 'auto' });
      });
      el.addEventListener('mouseleave', function () {
        gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1.2, 0.4)', overwrite: 'auto' });
      });
    });
  }

  /* ══════════════════════════════
     16. DRIPPING INK SPLATTER ON CLICK
     ══════════════════════════════ */

  if (!isTouch) {
    document.addEventListener('click', function (e) {
      if (e.target.closest('a, button, .wax-seal, nav')) return;

      var count = 3 + Math.floor(Math.random() * 5);
      for (var k = 0; k < count; k++) {
        var splat = document.createElement('div');
        splat.className = 'ink-splat';
        splat.style.left = (e.pageX + (Math.random() - 0.5) * 40) + 'px';
        splat.style.top = (e.pageY + (Math.random() - 0.5) * 40) + 'px';
        var size = 4 + Math.random() * 10;
        splat.style.width = size + 'px';
        splat.style.height = size + 'px';
        document.body.appendChild(splat);

        gsap.to(splat, {
          scale: 1,
          duration: 0.1,
          ease: 'power2.out'
        });
        gsap.to(splat, {
          x: "+=" + ((Math.random() - 0.5) * 20), // Organic wobble
          height: size + 20 + Math.random() * 40,
          y: 15 + Math.random() * 35,
          duration: 1.5 + Math.random() * 2,
          ease: 'power1.inOut'
        });
        gsap.to(splat, {
          opacity: 0,
          duration: 2,
          delay: 1.5,
          onComplete: function () { if (splat.parentNode) splat.parentNode.removeChild(splat); }
        });
      }
    });
  }

  /* ══════════════════════════════
     17. COUNTER ANIMATIONS
     ══════════════════════════════ */

  document.querySelectorAll('.counter').forEach(function (counter) {
    var target = parseInt(counter.getAttribute('data-target'), 10);
    var obj = { val: 0 };

    ScrollTrigger.create({
      trigger: counter,
      start: 'top bottom',
      once: true,
      onEnter: function () {
        gsap.to(obj, {
          val: target,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate: function () {
            counter.textContent = Math.round(obj.val);
          }
        });
      }
    });
  });

  /* ══════════════════════════════
     18. LIVE COFFEE SPLASH ON SCROLL
     ══════════════════════════════ */

  var splashTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.live-coffee-splash',
      start: 'top 60%',
      once: true
    }
  });

  splashTl
    .to('.coffee-drop', { opacity: 1, duration: 0.05 })
    .to('.coffee-drop', { y: 650, scaleY: 2, duration: 0.25, ease: 'power2.in' }) 
    .to('.coffee-drop', { opacity: 0, duration: 0.01 })
    .call(function() {
      gsap.to('#page-wrapper', { x: 8, y: -5, duration: 0.05, yoyo: true, repeat: 5, onComplete: function() { gsap.set('#page-wrapper', {x: 0, y: 0}); } });
    })
    .to('.coffee-splatter-svg', { scale: 1, opacity: 1, duration: 0.15, ease: 'back.out(1.5)' }, "-=0.01")
    .to('.coffee-splatter-svg', { scale: 1.15, opacity: 0.8, duration: 3, ease: 'power2.out' }, "+=0") 
    .to('.coffee-drip', { opacity: 1, duration: 0.1 }, "-=2.8")
    // Organic, wavy liquid paths
    .to('.drip-1', { height: 120, y: 40, x: -8, duration: 4, ease: 'sine.inOut' }, "-=2.8")
    .to('.drip-2', { height: 80, y: 25, x: 5, duration: 3, ease: 'sine.inOut' }, "-=2.8")
    .to('.drip-3', { height: 160, y: 60, x: -12, duration: 5, ease: 'sine.inOut' }, "-=2.8")
    .to('.live-coffee-splash', { opacity: 0.65, duration: 5, ease: 'power1.out' }, "-=2");

  /* ══════════════════════════════
     19. PARALLAX on decoratives
     ══════════════════════════════ */

  var foldMark = document.querySelector('.fold-mark');
  if (foldMark) {
    gsap.to(foldMark, {
      opacity: 0.5,
      scrollTrigger: {
        trigger: foldMark,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1
      }
    });
  }

  /* ══════════════════════════════
     20. BROADSIDE SCRUB — title (Removed)
     ══════════════════════════════ */

  /* ══════════════════════════════
     21. ORNAMENT ROTATION ON SCROLL
     ══════════════════════════════ */

  document.querySelectorAll('.divider').forEach(function (div) {
    gsap.from(div, {
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      ease: 'back.out(2)',
      scrollTrigger: {
        trigger: div,
        start: 'top 90%'
      }
    });
  });

})();
