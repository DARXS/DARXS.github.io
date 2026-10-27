/* DARXS · camada V5 — racing anos 2000 + eletrônica + telemetria
   Uso: <script src="racing-v5.js"></script> logo antes de </body> (depois do script principal). */
(function () {
'use strict';
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = s => document.querySelector(s);

/* ───────── CSS ───────── */
const css = `
body{background-color:#080b0f;
 background-image:radial-gradient(ellipse at 15% 0%,rgba(255,106,0,.16),transparent 55%),radial-gradient(ellipse at 100% 100%,rgba(0,200,255,.12),transparent 50%),
  linear-gradient(27deg,#0c1117 5px,transparent 5px),linear-gradient(207deg,#0c1117 5px,transparent 5px),linear-gradient(27deg,#111922 5px,transparent 5px),linear-gradient(207deg,#111922 5px,transparent 5px);
 background-size:100% 100%,100% 100%,20px 20px,20px 20px,20px 20px,20px 20px;
 background-position:0 0,0 0,0 5px,10px 0,0 10px,10px 5px;background-attachment:fixed,fixed,scroll,scroll,scroll,scroll}
#fx{position:fixed;inset:0;width:100%;height:100%;z-index:0;pointer-events:none}
.hero-name,.section-title{background:linear-gradient(180deg,#fff 0%,#e2e9f1 40%,#7d8da1 52%,#eef2f7 76%,#a9b6c5 100%);-webkit-background-clip:text;background-clip:text;color:transparent!important}
.hero-name .accent{background:linear-gradient(100deg,#ff6a00 0%,#ffc58a 22%,#ff6a00 40%,#fff 50%,#ff6a00 60%,#ff9a3c 100%);background-size:260% 100%;-webkit-background-clip:text;background-clip:text;color:transparent!important;-webkit-text-stroke:0;animation:chrome5 4.5s linear infinite}
@keyframes chrome5{to{background-position:-260% 0}}
.btn-primary{background:linear-gradient(180deg,#ffbd80 0%,#ff6a00 48%,#d54c00 52%,#ff7d22 100%)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.65),inset 0 -2px 0 rgba(0,0,0,.28)!important}
.btn-outline{background:linear-gradient(180deg,#1d2733,#10161e 48%,#0b1017 52%,#161e29)!important;box-shadow:inset 0 0 0 1px #2c3b4d,inset 0 1px 0 rgba(255,255,255,.14)!important}
.btn-outline:hover{box-shadow:inset 0 0 0 1px var(--cyan),inset 0 1px 0 rgba(255,255,255,.2)!important;color:var(--cyan)!important}
.btn{position:relative;overflow:hidden}
.btn::after{content:'';position:absolute;top:0;bottom:0;left:-60%;width:38%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.55),transparent);transform:skewX(-20deg);transition:left .55s}
.btn:hover::after{left:130%}
.exp-card,.cs-card,.rp,.proj-card,.cert-card,.edu-card,.skill-cat,.contact-item,.award-item,.stat-card,.result{
 background-image:linear-gradient(115deg,transparent 86%,rgba(255,106,0,.20) 86% 89%,transparent 89% 92%,rgba(0,200,255,.20) 92% 95%,transparent 95%)!important}
.exp-card:hover,.cs-card:hover,.rp:hover,.proj-card:hover{background-image:linear-gradient(115deg,transparent 80%,rgba(255,106,0,.30) 80% 84%,transparent 84% 88%,rgba(0,200,255,.30) 88% 92%,transparent 92%)!important}
.tab-btn:hover{color:#fff!important;text-shadow:0 0 8px var(--cyan)}
.tab-btn.active,.tab-btn[aria-current="page"]{text-shadow:0 0 10px rgba(255,106,0,.65)}
.section-label::after{content:'';width:7px;height:7px;border-radius:50%;background:var(--green);box-shadow:0 0 8px var(--green);animation:led5 1.4s steps(1) infinite}
@keyframes led5{50%{opacity:.15}}
.footer::before{content:'';display:block;height:12px;margin-bottom:16px;background:conic-gradient(#e8edf3 25%,#080b0f 0 50%,#e8edf3 0 75%,#080b0f 0) 0 0/12px 12px;opacity:.55}
/* ticker */
.ticker{display:flex;align-items:center;position:relative;z-index:1;border-block:1px solid var(--border);background:linear-gradient(90deg,rgba(255,106,0,.12),transparent 30%,transparent 70%,rgba(0,200,255,.1));font:500 11px var(--mono);color:var(--text-2);white-space:nowrap}
.tk-lbl{flex:none;background:var(--accent);color:#080b0f;font-weight:700;padding:7px 18px 7px 14px;clip-path:polygon(0 0,100% 0,calc(100% - 10px) 100%,0 100%);margin-right:10px;z-index:1}
.tk-win{flex:1;overflow:hidden}
#tk{display:inline-block;padding:7px 0;animation:tk5 46s linear infinite}
#tk span{margin-right:34px}#tk b{color:var(--cyan);font-weight:500}#tk i{color:var(--green);font-style:normal}
@keyframes tk5{to{transform:translateX(-50%)}}
/* cockpit */
#cockpit{position:fixed;right:24px;bottom:24px;z-index:998;width:216px;padding:12px 14px 10px;background:linear-gradient(180deg,rgba(26,34,45,.95),rgba(6,9,13,.97));border:1px solid #2d3d50;border-top-color:#4d647c;border-radius:12px 12px 4px 4px;box-shadow:0 8px 30px rgba(0,0,0,.6),inset 0 1px 0 rgba(255,255,255,.14);font-family:var(--mono);color:var(--text-3);cursor:pointer;user-select:none;-webkit-user-select:none}
#cockpit.lap{border-color:var(--green);box-shadow:0 0 24px rgba(0,214,143,.5)}
.ck-row{display:flex;align-items:baseline;gap:8px}
.ck-gear{font:700 24px var(--display);color:var(--accent);width:24px;text-align:center;text-shadow:0 0 10px rgba(255,106,0,.8)}
.ck-spd{flex:1;text-align:right;font:italic 700 40px/1 var(--mono);color:var(--green);text-shadow:0 0 14px rgba(0,214,143,.6);letter-spacing:-.03em}
.ck-nos{height:8px;margin:9px 0 3px;background:#090d12;border:1px solid #243242;transform:skewX(-20deg);overflow:hidden}
.ck-nos i{display:block;height:100%;width:100%;background:linear-gradient(90deg,#0066ff,#00c8ff,#fff);box-shadow:0 0 10px #00c8ff}
.ck-lbl,.ck-lap{display:flex;justify-content:space-between;font-size:10px}
.ck-lap{margin-top:8px;color:var(--text-2)}.ck-lap b{color:#fff;font-weight:500}
.ck-sec{display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin-top:6px}
.ck-sec i{height:4px;background:#1a2330;position:relative;overflow:hidden;transform:skewX(-20deg)}
.ck-sec i::after{content:'';position:absolute;inset:0;width:var(--p,0%);background:var(--accent)}
.ck-sec i.done::after{background:var(--green)}
#vig{position:fixed;inset:0;z-index:997;pointer-events:none;opacity:0;transition:opacity .3s;box-shadow:inset 0 0 150px 20px rgba(0,200,255,.5)}
body.nos #vig{opacity:1}
body.nos .main{animation:shake5 .09s linear infinite}
@keyframes shake5{25%{transform:translate(1.5px,-1px)}75%{transform:translate(-1.5px,1px)}}
/* bandeira quadriculada */
#flag{position:fixed;top:0;bottom:0;left:0;width:30vw;z-index:9999;pointer-events:none;transform:translateX(-130%) skewX(-14deg);
 background:linear-gradient(90deg,rgba(255,106,0,.55) 0 6px,transparent 6px),conic-gradient(#c3cfdc 25%,#1b2430 0 50%,#c3cfdc 0 75%,#1b2430 0) 0 0/40px 40px;box-shadow:0 0 36px rgba(255,106,0,.35);opacity:.85}
#flag.go{animation:fl5 1.5s cubic-bezier(.45,0,.25,1)}
@keyframes fl5{0%{transform:translateX(-130%) skewX(-14deg);opacity:0}20%,80%{opacity:.85}100%{transform:translateX(420%) skewX(-14deg);opacity:0}}
/* semáforo de largada */
#lights{display:none;position:fixed;inset:0;z-index:10001;background:rgba(5,7,9,.97);flex-direction:column;align-items:center;justify-content:center;gap:22px;cursor:pointer;transition:opacity .5s}
#lights.on{display:flex}#lights.out{opacity:0;pointer-events:none}
.lt-panel{display:flex;gap:16px;padding:18px 22px;background:linear-gradient(#242d38,#0d1218);border:1px solid #3d4e62;border-radius:14px;box-shadow:inset 0 1px 0 rgba(255,255,255,.2),0 0 40px rgba(0,0,0,.8)}
.lt-panel i{width:clamp(34px,9vw,58px);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 35% 30%,#4a2222,#1a0a0a 70%);box-shadow:inset 0 0 8px #000,0 0 0 3px #0a0d11;transition:.08s}
.lt-panel i.on{background:radial-gradient(circle at 35% 30%,#ffb0a0,#ff2a1a 45%,#a00 100%);box-shadow:0 0 28px 6px rgba(255,40,20,.7),inset 0 0 8px rgba(255,255,255,.3),0 0 0 3px #0a0d11}
.lt-txt{font:italic 700 clamp(24px,5vw,44px) var(--display);letter-spacing:.2em;color:var(--text-2)}
.lt-txt.go{color:var(--green);text-shadow:0 0 24px var(--green)}
.lt-skip{font:11px var(--mono);color:var(--text-3)}
@media(max-width:600px){#cockpit{right:10px;bottom:10px;transform:scale(.82);transform-origin:bottom right}.ck-lap,.ck-sec{display:none}}
@media(prefers-reduced-motion:reduce){#flag,#vig{display:none!important}#tk{animation:none}.hero-name .accent{animation:none}}
`;
const st = document.createElement('style'); st.id = 'v5'; st.textContent = css; document.head.appendChild(st);

/* ───────── DOM ───────── */
document.body.insertAdjacentHTML('beforeend',
 '<canvas id="fx" aria-hidden="true"></canvas><div id="vig" aria-hidden="true"></div><div id="flag" aria-hidden="true"></div>' +
 '<div id="cockpit" aria-hidden="true" title="Clique ou tecle N para NOS · demonstrativo"><div class="ck-row"><span class="ck-gear">N</span><span class="ck-spd">000</span><span>km/h</span></div>' +
 '<div class="ck-nos"><i></i></div><div class="ck-lbl"><span>NOS</span><span>[N] ou clique</span></div>' +
 '<div class="ck-lap"><span>LAP <b id="ck-t">0:00.0</b></span><span>BEST <b id="ck-b">--</b></span></div><div class="ck-sec"><i></i><i></i><i></i></div></div>' +
 '<div id="lights" aria-hidden="true"><div class="lt-panel"><i></i><i></i><i></i><i></i><i></i></div><div class="lt-txt">STAND BY</div><div class="lt-skip">clique ou tecle para pular</div></div>');
const home = $('#panel-home');
if (home) {
  home.insertAdjacentHTML('afterbegin', '<div class="ticker" aria-hidden="true"><span class="tk-lbl">FEED · DEMO</span><div class="tk-win"><div id="tk"></div></div></div>');
  const items = ['<b>0x7E0</b> 10 03 <i>→ 50 03</i> sessão estendida', '<b>DTC</b> U0100 · lost comm ECM', '<b>CAN</b> 500 kbps', '<b>LIN</b> 19.2 kbps', '<b>OTA</b> bootloader → reflash → <i>rollback armado</i>', '<b>HIL</b> bancada pronta', '<b>PPM</b> ↓ · <b>FTY</b> ↑', '<b>8D</b> D4 causa-raiz', '<b>ESP32</b> core0 SD 40 Hz · core1 MQTT 1 s', '<b>LoRa</b> CAN → base → SD'];
  const h = items.map(t => '<span>' + t + '</span>').join('');
  $('#tk').innerHTML = h + h;
}

/* ───────── estado ───────── */
const V = { kmh: 0, surge: 0, boosting: false, bs: 0, nos: 100 };
let mv = 0;
addEventListener('pointermove', e => { mv += Math.abs(e.movementX || 0) + Math.abs(e.movementY || 0); }, { passive: true });
function boost() {
  if (V.boosting || V.nos < 50) return;
  V.nos -= 50; V.boosting = true; document.body.classList.add('nos'); window.revUp && window.revUp();
  setTimeout(() => { document.body.classList.remove('nos'); V.boosting = false; }, 1600);
}
$('#cockpit').addEventListener('click', e => { e.stopPropagation(); boost(); });
addEventListener('keydown', e => {
  if (e.key.toLowerCase() === 'n' && !/INPUT|TEXTAREA/.test(document.activeElement.tagName) && !e.metaKey && !e.ctrlKey && !e.altKey) boost();
});

/* ───────── canvas: PCB + speed lines ───────── */
const fx = $('#fx'), x = fx.getContext('2d');
let W, H, S = [], T = [];
function at(t, d) {
  const p = t.pts, c = t.cum; let k = 1;
  while (k < c.length - 1 && c[k] < d) k++;
  const f = (d - c[k - 1]) / ((c[k] - c[k - 1]) || 1);
  return [p[k - 1][0] + (p[k][0] - p[k - 1][0]) * f, p[k - 1][1] + (p[k][1] - p[k - 1][1]) * f];
}
function build() {
  S = Array.from({ length: Math.round(W / 22) }, () => ({ x: Math.random() * W, y: Math.random() * H, l: 20 + Math.random() * 80, s: .4 + Math.random() * 1.2, c: Math.random() < .6 ? '255,106,0' : Math.random() < .5 ? '0,200,255' : '237,242,247' }));
  T = [];
  for (let i = 0; i < Math.round(W / 110); i++) {
    let px = Math.round(Math.random() * W / 20) * 20, py = Math.round(Math.random() * H / 20) * 20, dir = Math.random() < .5 ? 0 : 1;
    const pts = [[px, py]];
    for (let k = 0; k < 5; k++) {
      const L = (2 + Math.floor(Math.random() * 6)) * 20, sg = Math.random() < .5 ? 1 : -1;
      if (dir === 0) px += L * sg; else py += L * sg;
      pts.push([px, py]);
      if (Math.random() < .5) { const d = (1 + Math.floor(Math.random() * 2)) * 20; px += d * (Math.random() < .5 ? 1 : -1); py += d * (Math.random() < .5 ? 1 : -1); pts.push([px, py]); }
      dir = 1 - dir;
    }
    let len = 0; const cum = [0];
    for (let k = 1; k < pts.length; k++) { len += Math.hypot(pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1]); cum.push(len); }
    T.push({ pts, cum, len, t: Math.random() * len, v: .6 + Math.random() * 1.2, c: Math.random() < .5 ? '0,200,255' : '0,214,143' });
  }
}
function size() { const d = Math.min(devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight; fx.width = W * d; fx.height = H * d; x.setTransform(d, 0, 0, d, 0, 0); build(); }
size(); addEventListener('resize', size);
function paint() {
  x.clearRect(0, 0, W, H); x.lineWidth = 1.2; x.lineJoin = 'round';
  T.forEach(t => {
    x.strokeStyle = 'rgba(120,160,200,.07)'; x.beginPath();
    t.pts.forEach((p, i) => i ? x.lineTo(p[0], p[1]) : x.moveTo(p[0], p[1])); x.stroke();
    [t.pts[0], t.pts[t.pts.length - 1]].forEach(p => { x.beginPath(); x.arc(p[0], p[1], 3, 0, 6.283); x.stroke(); });
    if (!RM) {
      t.t = (t.t + t.v * (1 + V.kmh / 60)) % t.len;
      for (let i = 0; i < 6; i++) { const q = at(t, (t.t - i * 7 + t.len) % t.len); x.fillStyle = 'rgba(' + t.c + ',' + (.55 - i * .08) + ')'; x.beginPath(); x.arc(q[0], q[1], 2.4 - i * .25, 0, 6.283); x.fill(); }
    }
  });
  const sp = .5 + V.kmh / 14;
  S.forEach(s => {
    s.x -= s.s * sp * 2; const len = s.l * (1 + sp / 5);
    if (s.x + len < 0) { s.x = W + Math.random() * W * .2; s.y = Math.random() * H; }
    x.strokeStyle = 'rgba(' + s.c + ',' + (Math.min(.5, .06 + sp / 50) * s.s / 1.2) + ')'; x.lineWidth = 1;
    x.beginPath(); x.moveTo(s.x, s.y); x.lineTo(s.x + len, s.y); x.stroke();
  });
}

/* ───────── cockpit: velocidade, marcha, NOS, volta ───────── */
const el = { gear: $('.ck-gear'), spd: $('.ck-spd'), nos: $('.ck-nos i'), t: $('#ck-t'), b: $('#ck-b'), ck: $('#cockpit'), sec: [...document.querySelectorAll('.ck-sec i')] };
let lapStart = performance.now(), best = null, armed = true, lastLap = 0, lastY = scrollY, last = performance.now();
const fmt = ms => { const s = ms / 1000; return Math.floor(s / 60) + ':' + (s % 60).toFixed(1).padStart(4, '0'); };
window.v5ResetLap = () => { lapStart = performance.now(); armed = true; };
function hud(now) {
  const dt = Math.min(.1, (now - last) / 1000); last = now;
  const dy = Math.abs(scrollY - lastY); lastY = scrollY;
  V.bs += ((V.boosting ? 1 : 0) - V.bs) * .1;
  const target = Math.min(180, dy * 6) + Math.min(70, mv * .6) + V.surge * 90 + V.bs * 130; mv = 0;
  V.kmh += (target - V.kmh) * .12; V.surge *= .95;
  V.nos = Math.min(100, V.nos + 12 * dt);
  const k = Math.min(299, Math.round(V.kmh));
  el.spd.textContent = String(k).padStart(3, '0');
  el.gear.textContent = k < 4 ? 'N' : k < 45 ? 1 : k < 95 ? 2 : k < 145 ? 3 : k < 195 ? 4 : k < 245 ? 5 : 6;
  el.nos.style.width = V.nos + '%';
  const d = document.documentElement, sc = d.scrollHeight - d.clientHeight, scrolls = sc > 80;
  const p = scrolls ? d.scrollTop / sc : Math.min(1, (now - lapStart) / 24000);
  el.sec.forEach((s, i) => { const f = Math.max(0, Math.min(1, p * 3 - i)); s.style.setProperty('--p', f * 100 + '%'); s.classList.toggle('done', f >= 1); });
  if (p >= .985 && armed && now - lapStart > 1500) {
    lastLap = now - lapStart; best = best == null ? lastLap : Math.min(best, lastLap); armed = false;
    el.b.textContent = fmt(best); V.surge = 1; el.ck.classList.add('lap'); setTimeout(() => el.ck.classList.remove('lap'), 800);
    if (!scrolls) { lapStart = now; armed = true; }
  }
  if (!armed && scrolls && p < .5) { lapStart = now; armed = true; }
  el.t.textContent = fmt(armed ? now - lapStart : lastLap);
}
function loop(now) {
  if (!document.hidden) { hud(now); paint(); }
  requestAnimationFrame(loop);
}
if (RM) paint(); else requestAnimationFrame(loop);

/* ───────── troca de aba: bandeira + decodificação do título ───────── */
const flag = $('#flag');
function scramble(e) {
  if (RM || !e) return;
  const txt = e.dataset.t || (e.dataset.t = e.textContent), ch = '01ABCDEF<>/#$%', n = 18; let f = 0;
  clearInterval(e._i);
  e._i = setInterval(() => {
    f++; e.textContent = [...txt].map((c, i) => c === ' ' ? ' ' : (i < txt.length * f / n ? c : ch[Math.random() * ch.length | 0])).join('');
    if (f >= n) { clearInterval(e._i); e.textContent = txt; }
  }, 35);
}
const base = window.switchTab;
window.switchTab = function (id) {
  if (!RM) { flag.classList.remove('go'); void flag.offsetWidth; flag.classList.add('go'); }
  base(id); window.v5ResetLap(); V.surge = 1;
  scramble($('#panel-' + id + ' .section-title'));
};

/* ───────── semáforo de largada (uma vez por sessão) ───────── */
const L = $('#lights');
let seen = false; try { seen = sessionStorage.getItem('v5lights'); } catch (e) {}
if (L && !RM && !seen) {
  L.classList.add('on'); document.body.style.overflow = 'hidden';
  const lamps = [...L.querySelectorAll('.lt-panel i')], txt = L.querySelector('.lt-txt'), tm = []; let done = false;
  const T_ = (f, ms) => tm.push(setTimeout(f, ms));
  const end = go => {
    if (done) return; done = true; tm.forEach(clearTimeout);
    try { sessionStorage.setItem('v5lights', '1'); } catch (e) {}
    L.classList.add('out'); document.body.style.overflow = ''; setTimeout(() => L.classList.remove('on'), 500);
    if (go) { V.surge = 1.6; window.revUp && window.revUp(); }
  };
  lamps.forEach((l, i) => T_(() => l.classList.add('on'), 600 + i * 520));
  const goAt = 600 + 5 * 520 + 500 + Math.round(Math.random() * 700);
  T_(() => { lamps.forEach(l => l.classList.remove('on')); txt.textContent = 'GO!'; txt.classList.add('go'); V.surge = 1.6; window.revUp && window.revUp(); }, goAt);
  T_(() => end(true), goAt + 650);
  L.addEventListener('click', () => end(false)); addEventListener('keydown', () => end(false), { once: true });
}
})();