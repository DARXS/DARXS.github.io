/* DARXS · camada V6 — carregue DEPOIS do racing-v5.js */
(function () {
'use strict';
const V = window.V5; if (!V) return;
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE = matchMedia('(hover:hover) and (pointer:fine)').matches;
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];

const st = document.createElement('style'); st.id = 'v6';
st.textContent = `
.tab-btn::after{opacity:0!important}
#tabInd{position:absolute;bottom:0;left:0;width:0;height:3px;background:var(--accent);box-shadow:0 0 10px var(--accent);transform:skewX(-20deg);transition:left .35s cubic-bezier(.3,.8,.2,1),width .35s cubic-bezier(.3,.8,.2,1);z-index:2;pointer-events:none}
.shift i.lit{background:var(--lc,var(--green))!important;box-shadow:0 0 8px var(--lc,var(--green))!important}
.timeline{--lx:15px}
.tl-fill{position:absolute;left:var(--lx);top:0;width:2px;height:0;background:linear-gradient(var(--accent),var(--cyan));box-shadow:0 0 8px var(--accent);z-index:0;pointer-events:none}
.tl-car{position:absolute;left:calc(var(--lx) - 7px);top:0;width:15px;height:22px;z-index:2;filter:drop-shadow(0 0 6px var(--accent));transition:transform .15s linear;pointer-events:none}
.tl-car i{display:block;width:100%;height:100%;background:linear-gradient(#fff,#ff6a00 40%,#d54c00);clip-path:polygon(50% 100%,100% 30%,80% 0,20% 0,0 30%)}
.tl-dot.passed{background:var(--accent)!important;border-color:var(--accent)!important}
#mini{position:fixed;left:24px;bottom:72px;width:112px;z-index:996;pointer-events:none;opacity:.9}
#mt,#mp{fill:none;stroke-width:5;stroke-linecap:round;stroke-linejoin:round}
#mt{stroke:#2a3a4d}#mp{stroke:var(--accent);filter:drop-shadow(0 0 4px var(--accent))}
#md{fill:#fff;stroke:var(--green);stroke-width:2}
#snd{position:fixed;top:114px;right:14px;z-index:996;font:600 10px var(--mono);letter-spacing:.08em;color:var(--text-2);background:rgba(8,11,15,.88);border:1px solid #2c3b4d;padding:9px 14px;min-height:36px;cursor:pointer;clip-path:polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%)}
#snd[aria-pressed=true]{color:#080b0f;background:var(--green);border-color:var(--green)}
#toast{position:fixed;top:116px;left:50%;transform:translate(-50%,-20px);opacity:0;z-index:997;font:600 12px var(--mono);letter-spacing:.06em;color:#fff;background:linear-gradient(180deg,#1d2733,#0b1017);border:1px solid var(--green);padding:9px 22px;clip-path:polygon(10px 0,100% 0,calc(100% - 10px) 100%,0 100%);transition:.3s;pointer-events:none;white-space:nowrap}
#toast.on{opacity:1;transform:translate(-50%,0)}#toast b{color:var(--green)}#toast i{color:var(--accent);font-style:normal}
.profile-img-wrap{transition:transform .2s ease-out}
@media(hover:hover){.exp-title:hover,.rp-title:hover,.cs-card h4:hover{animation:gl6 .35s steps(2) 1}}
@keyframes gl6{0%{text-shadow:2px 0 var(--cyan),-2px 0 var(--accent)}50%{text-shadow:-2px 0 var(--cyan),2px 0 var(--accent);transform:translateX(1px)}100%{text-shadow:none}}
@media(max-width:700px){.timeline{--lx:7px}#snd{right:8px;top:112px}}
@media(max-width:900px),(pointer:coarse){#mini{display:none}}
`;
document.head.appendChild(st);

document.body.insertAdjacentHTML('beforeend',
 '<div id="toast" aria-live="polite"></div><button id="snd" type="button" aria-pressed="false" title="Som do motor (tecla M)">SOM · OFF</button>' +
 '<svg id="mini" viewBox="0 0 126 78" aria-hidden="true"><path id="mt"/><path id="mp"/><circle id="md" r="4"/></svg>');

/* indicador deslizante das abas */
const nav = $('#tab-nav'), ind = document.createElement('i'); ind.id = 'tabInd'; nav.appendChild(ind);
function place() {
  const b = $('.tab-btn.active'); if (!b) return;
  ind.style.left = b.offsetLeft + 'px'; ind.style.width = b.offsetWidth + 'px';
  if (nav.scrollWidth > nav.clientWidth) nav.scrollTo({ left: b.offsetLeft - (nav.clientWidth - b.offsetWidth) / 2, behavior: 'smooth' });
}
const base = window.switchTab;
window.switchTab = function (id) { base(id); place(); };
place(); addEventListener('resize', place); document.fonts && document.fonts.ready.then(place);

/* shift lights ligadas à velocidade */
const lights = $$('.shift i'); let lightsFree = false, ln = -1;
if (!RM) setTimeout(() => { lights.forEach(i => i.style.animation = 'none'); lightsFree = true; }, 1900);

/* carro descendo a timeline */
const tl = $('.timeline'), dots = $$('.tl-dot'); let fill, car, ty = -1;
if (tl) { tl.insertAdjacentHTML('afterbegin', '<i class="tl-fill"></i><span class="tl-car"><i></i></span>'); fill = tl.querySelector('.tl-fill'); car = tl.querySelector('.tl-car'); }

/* minimapa do circuito */
const MT = $('#mt'), MP = $('#mp'), MD = $('#md');
const D = 'M12 50 C10 30 24 16 44 18 L70 20 C86 22 90 10 104 14 C116 18 114 36 100 40 L84 44 C70 48 74 62 58 64 L30 66 C16 66 13 60 12 50 Z';
MT.setAttribute('d', D); MP.setAttribute('d', D);
const mlen = MT.getTotalLength(); let pl = -1;

/* toast de volta */
const tt = $('#toast'); let tto, laps = 0;
const fmt = ms => { const s = ms / 1000; return Math.floor(s / 60) + ':' + (s % 60).toFixed(1).padStart(4, '0'); };
function toast(h) { tt.innerHTML = h; tt.classList.add('on'); clearTimeout(tto); tto = setTimeout(() => tt.classList.remove('on'), 2600); }

/* som do motor (opt-in) */
let ac, o1, o2, fl, gn, snd = false, la = 0;
const sb = $('#snd');
function audioOn() {
  const A = window.AudioContext || window.webkitAudioContext; if (!A) return false;
  if (!ac) {
    ac = new A(); o1 = ac.createOscillator(); o2 = ac.createOscillator(); fl = ac.createBiquadFilter(); gn = ac.createGain();
    o1.type = 'sawtooth'; o2.type = 'square'; o2.detune.value = -1200; fl.type = 'lowpass'; gn.gain.value = 0;
    o1.connect(fl); o2.connect(fl); fl.connect(gn); gn.connect(ac.destination); o1.start(); o2.start();
  }
  ac.resume(); return true;
}
function toggleSnd() {
  if (!snd && !audioOn()) return;
  snd = !snd; sb.setAttribute('aria-pressed', snd); sb.textContent = 'SOM · ' + (snd ? 'ON' : 'OFF');
  if (!snd && gn) { gn.gain.setTargetAtTime(0, ac.currentTime, .05); setTimeout(() => { if (!snd) ac.suspend(); }, 400); }
}
sb.addEventListener('click', toggleSnd);
addEventListener('keydown', e => { if (!e.repeat && String(e.key || '').toLowerCase() === 'm' && !/INPUT|TEXTAREA/.test(document.activeElement.tagName) && !e.metaKey && !e.ctrlKey && !e.altKey) toggleSnd(); });

/* loop */
(function frame(now) {
  try {
    if (!document.hidden) {
      if (lightsFree) { const n = Math.min(14, Math.round(V.kmh / 18)); if (n !== ln) { ln = n; lights.forEach((l, i) => l.classList.toggle('lit', i < n)); } }
      const p = V.p || 0;
      if (Math.abs(p - pl) > .002) { pl = p; const pt = MT.getPointAtLength(p * mlen); MD.setAttribute('cx', pt.x); MD.setAttribute('cy', pt.y); MP.style.strokeDasharray = (p * mlen) + ' ' + mlen; }
      if (tl && tl.offsetParent) {
        const r = tl.getBoundingClientRect(), y = Math.max(0, Math.min(r.height, innerHeight * .55 - r.top));
        if (Math.abs(y - ty) > .5) { ty = y; fill.style.height = y + 'px'; car.style.transform = 'translateY(' + (y - 11) + 'px)'; dots.forEach(d => d.classList.toggle('passed', d.getBoundingClientRect().top - r.top < y)); }
      }
      if (V.laps !== laps) { laps = V.laps; toast('🏁 VOLTA <b>' + fmt(V.last) + '</b>' + (V.isBest ? ' · <i>MELHOR</i>' : '')); }
      if (snd && gn && now - la > 60) {
        la = now; const t = ac.currentTime, f = 45 + V.kmh * 1.5;
        o1.frequency.setTargetAtTime(f, t, .05); o2.frequency.setTargetAtTime(f, t, .05);
        fl.frequency.setTargetAtTime(260 + V.kmh * 7, t, .08);
        gn.gain.setTargetAtTime(.02 + Math.min(1, V.kmh / 250) * .04, t, .08);
      }
    }
  } catch (err) { console.error('v6', err); }
  requestAnimationFrame(frame);
})(0);

/* contagem nos resultados */
if (!RM) {
  const io = new IntersectionObserver(es => es.forEach(en => {
    if (!en.isIntersecting) return; io.unobserve(en.target);
    const t = en.target, m = t.textContent.match(/^(\D*)(\d+)(.*)$/); if (!m) return;
    const n = +m[2], fin = t.textContent; let t0 = null;
    const done = () => { t.textContent = fin; };
    setTimeout(done, 1400);
    requestAnimationFrame(function s(now) {
      if (t0 === null) t0 = now;
      const k = Math.max(0, Math.min(1, (now - t0) / 1000)), e = 1 - Math.pow(1 - k, 3);
      if (k < 1) { t.textContent = m[1] + Math.round(n * e) + m[3]; requestAnimationFrame(s); } else done();
    });
  }), { threshold: .6 });
  $$('.result-num').forEach(n => io.observe(n));
}

/* desktop: botões magnéticos e paralaxe do hero */
if (FINE && !RM) {
  $$('.btn').forEach(b => {
    b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); b.style.translate = ((e.clientX - r.left - r.width / 2) * .18) + 'px ' + ((e.clientY - r.top - r.height / 2) * .28) + 'px'; });
    b.addEventListener('pointerleave', () => { b.style.translate = ''; });
  });
  const hv = $('.profile-img-wrap'), hn = $('.hero-name'), hp = $('#panel-home');
  hp.addEventListener('pointermove', e => {
    const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
    if (hv) hv.style.transform = 'perspective(800px) rotateY(' + x * 10 + 'deg) rotateX(' + (-y * 8) + 'deg)';
    if (hn) hn.style.translate = (-x * 10) + 'px ' + (-y * 5) + 'px';
  });
}
})();