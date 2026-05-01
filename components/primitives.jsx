// Avexis primitives — cursor, aurora shader, decrypt & shiny text, count-up, tilt, reveal

const { useEffect, useRef, useState, useLayoutEffect } = React;

/* ---------- Magnetic cursor ---------- */
function MagneticCursor() {
  const [touch, setTouch] = useState(false);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  useEffect(() => {
    if ('ontouchstart' in window) { setTouch(true); return; }
    let tx = -100, ty = -100, rx = -100, ry = -100;
    let raf = 0;
    const onMove = (e) => {
      tx = e.clientX; ty = e.clientY;
      const mags = document.querySelectorAll('[data-magnetic]');
      mags.forEach(el => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width/2, cy = r.top + r.height/2;
        const d = Math.hypot(e.clientX - cx, e.clientY - cy);
        const th = 110;
        if (d < th) {
          const s = 1 - d/th;
          el.style.transform = `translate(${(e.clientX-cx)*s*0.3}px, ${(e.clientY-cy)*s*0.3}px)`;
          el.style.transition = 'transform .2s ease-out';
        } else {
          el.style.transform = '';
          el.style.transition = 'transform .4s ease-out';
        }
      });
    };
    const render = () => {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      if (dotRef.current) { dotRef.current.style.transform = `translate(${tx-4}px, ${ty-4}px)`; }
      if (ringRef.current) { ringRef.current.style.transform = `translate(${rx-18}px, ${ry-18}px)`; }
      raf = requestAnimationFrame(render);
    };
    const onEnter = (e) => {
      if (e.target.closest?.('[data-magnetic], a, button, input, textarea, [data-hoverable]')) {
        ringRef.current?.setAttribute('data-hover','on');
      }
    };
    const onLeaveEl = (e) => {
      if (e.target.closest?.('[data-magnetic], a, button, input, textarea, [data-hoverable]')) {
        ringRef.current?.setAttribute('data-hover','off');
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeaveEl);
    raf = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeaveEl);
    };
  }, []);
  if (touch) return null;
  return (
    <>
      <div ref={dotRef} className="av-cursor-dot" />
      <div ref={ringRef} className="av-cursor-ring" data-hover="off" />
    </>
  );
}

/* ---------- Aurora shader ---------- */
const AURORA_VS = `
attribute vec2 position; varying vec2 vUv;
void main(){ vUv = position*0.5+0.5; gl_Position = vec4(position,0.,1.); }`;

const AURORA_FS = `
precision highp float;
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform vec3 uAccent;
varying vec2 vUv;
vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1./6.,1./3.); const vec4 D=vec4(0.,.5,1.,2.);
  vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.-g;
  vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
  float n_=.142857142857; vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.*floor(p*ns.z*ns.z); vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.*x_);
  vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.+1.; vec4 s1=floor(b1)*2.+1.;
  vec4 sh=-step(h,vec4(0.));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.); m=m*m;
  return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
void main(){
  vec2 uv=vUv; float aspect=uResolution.x/uResolution.y;
  vec2 p=(uv-.5)*vec2(aspect,1.);
  vec2 mouse=(uMouse-.5)*vec2(aspect,1.);
  float md=length(p-mouse); float mi=smoothstep(.8,0.,md)*.3;
  float t=uTime*.12;
  float n1=snoise(vec3(p*1.3+mi,t));
  float n2=snoise(vec3(p*2.6-mi,t*1.2+10.));
  float n3=snoise(vec3(p*4.8,t*.8+20.));
  float noise=n1*.5+n2*.3+n3*.2;
  vec3 black=vec3(0.);
  vec3 a=uAccent;
  vec3 deep=a*0.45;
  vec3 purple=vec3(.2,.05,.4);
  vec3 hot=mix(vec3(1.), a, .3);
  vec3 col=black;
  col=mix(col,deep*.4,smoothstep(-.2,.3,noise));
  col=mix(col,a*.55,smoothstep(.1,.6,noise));
  col=mix(col,purple*.4,smoothstep(.2,.7,n2));
  col=mix(col,hot*.35,smoothstep(.5,.9,noise));
  float glow=exp(-md*md*7.)*.18;
  col+=a*glow;
  float vg=1.-smoothstep(.3,1.2,length(p));
  col*=vg; col*=.5;
  gl_FragColor=vec4(col,1.);
}`;

function hexToRgb(h) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
  return m ? [parseInt(m[1],16)/255, parseInt(m[2],16)/255, parseInt(m[3],16)/255] : [0, 0.83, 1];
}

function AuroraShader({ accent = '#00D4FF' }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
    if (!gl) return;
    const compile = (type, src) => {
      const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, AURORA_VS));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, AURORA_FS));
    gl.linkProgram(prog); gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(prog, 'position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
    const uTime = gl.getUniformLocation(prog, 'uTime');
    const uMouse = gl.getUniformLocation(prog, 'uMouse');
    const uRes = gl.getUniformLocation(prog, 'uResolution');
    const uAccent = gl.getUniformLocation(prog, 'uAccent');
    const rgb = hexToRgb(accent);
    let mx = 0.5, my = 0.5, sx = 0.5, sy = 0.5, raf = 0;
    const start = performance.now();
    const resize = () => {
      const dpr = Math.min(devicePixelRatio, 1.5);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0,0,canvas.width,canvas.height);
    };
    const render = () => {
      const t = (performance.now() - start) / 1000;
      sx += (mx - sx) * 0.05; sy += (my - sy) * 0.05;
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, sx, sy);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform3f(uAccent, rgb[0], rgb[1], rgb[2]);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(render);
    };
    const onMove = (e) => { mx = e.clientX / innerWidth; my = 1 - e.clientY / innerHeight; };
    resize();
    addEventListener('resize', resize);
    addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('resize', resize);
      removeEventListener('mousemove', onMove);
    };
  }, [accent]);
  return <canvas ref={ref} className="av-hero__shader" />;
}

/* ---------- Decrypt text ---------- */
const DECRYPT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?<>{}[]';
function DecryptText({ text, className = '', delay = 0, speed = 40, scrambleDuration = 5, trigger = true }) {
  const [out, setOut] = useState('');
  useEffect(() => {
    if (!trigger) { setOut(''); return; }
    let revealIndex = 0, sf = 0, started = false, raf = 0;
    const to = setTimeout(() => { started = true; }, delay);
    const tick = () => {
      if (!started) { raf = requestAnimationFrame(tick); return; }
      sf++;
      if (sf >= scrambleDuration) { sf = 0; revealIndex++; }
      let r = '';
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') r += ' ';
        else if (i < revealIndex) r += text[i];
        else if (i < revealIndex + 3) r += DECRYPT_CHARS[Math.floor(Math.random() * DECRYPT_CHARS.length)];
        else r += ' ';
      }
      setOut(r);
      if (revealIndex <= text.length) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { clearTimeout(to); cancelAnimationFrame(raf); };
  }, [text, delay, speed, scrambleDuration, trigger]);
  return <span className={className} aria-label={text}>{out || (trigger ? '' : text)}</span>;
}

/* ---------- Shiny text ---------- */
function ShinyText({ children, className = '' }) {
  return <span className={`av-shiny ${className}`}>{children}</span>;
}

/* ---------- Count up ---------- */
function CountUp({ target, suffix = '', cls = '' }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect(); }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!seen) return;
    let frame = 0; const total = 42;
    const step = () => {
      frame++;
      const p = frame / total;
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * target));
      if (frame < total) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [seen, target]);
  return <span ref={ref} className={cls}>{n}<span className="av-count__suffix">{suffix}</span></span>;
}

/* ---------- Tilt card ---------- */
function TiltCard({ children, className = '', ...rest }) {
  const ref = useRef(null);
  const glareRef = useRef(null);
  const onMove = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const rx = (y - .5) * -8;
    const ry = (x - .5) * 8;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
    if (glareRef.current) {
      glareRef.current.style.opacity = '1';
      glareRef.current.style.background = `radial-gradient(400px circle at ${x*100}% ${y*100}%, rgba(0,212,255,0.15), transparent 60%)`;
    }
  };
  const onLeave = () => {
    const el = ref.current; if (el) el.style.transform = '';
    if (glareRef.current) glareRef.current.style.opacity = '0';
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`av-tilt ${className}`} style={{ transformStyle: 'preserve-3d', transition: 'transform .25s ease-out' }} {...rest}>
      {children}
      <div ref={glareRef} className="av-tilt__glare" />
    </div>
  );
}

/* ---------- Reveal on scroll ---------- */
function Reveal({ children, as = 'div', delay = 0, className = '' }) {
  const Tag = as;
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => el.classList.add('is-in'), delay); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return <Tag ref={ref} data-reveal className={className}>{children}</Tag>;
}

/* ---------- Icons (inline SVG — lucide-ish) ---------- */
const Icon = {
  ArrowRight: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14M13 5l7 7-7 7"/></svg>,
  ChevronDown: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 9l6 6 6-6"/></svg>,
  Globe: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20"/></svg>,
  Zap: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
  Palette: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.4-.3-.4-.5-.9-.5-1.4 0-1.1.9-2 2-2h2.3c3.1 0 5.7-2.6 5.7-5.7C23 6.5 18 2 12 2z"/></svg>,
  Bot: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 8V4H8"/><rect x="4" y="8" width="16" height="12" rx="2"/><path d="M2 14h2M20 14h2M9 13v2M15 13v2"/></svg>,
  Wrench: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94L6.51 19.5a2.12 2.12 0 11-3-3L10.52 10a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>,
  Clock: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  Check: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6L9 17l-5-5"/></svg>,
  Send: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>,
};

/* ---------- NeuralNet — sparse node network with periodic signal pulses ---------- */
function NeuralNet() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const isMobile = window.innerWidth < 768;
    const NODE_COUNT = isMobile ? 45 : 95;
    const MAX_NEIGHBORS = 3;
    const CONN_DIST = isMobile ? 130 : 170;
    const SPAWN_INTERVAL = 0.65;
    const TRAIL_LEN = 0.4;
    const BRANCH_PROB = 0.2;
    const MAX_DEPTH = 2;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let nodes = [], edges = [], pulses = [], adj = [];
    let raf = 0, lastT = 0, accum = 0;

    const build = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.06,
        vy: (Math.random() - 0.5) * 0.06,
      }));
      edges = [];
      const seen = new Set();
      for (let i = 0; i < nodes.length; i++) {
        const cands = [];
        for (let j = 0; j < nodes.length; j++) {
          if (i === j) continue;
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d <= CONN_DIST) cands.push({ j, d });
        }
        cands.sort((a, b) => a.d - b.d);
        for (let k = 0; k < Math.min(MAX_NEIGHBORS, cands.length); k++) {
          const j = cands[k].j;
          const key = i < j ? i + '-' + j : j + '-' + i;
          if (!seen.has(key)) { seen.add(key); edges.push({ a: i, b: j }); }
        }
      }
      // Build adjacency: for each node, list edge indices that touch it
      adj = nodes.map(() => []);
      for (let ei = 0; ei < edges.length; ei++) {
        adj[edges[ei].a].push(ei);
        adj[edges[ei].b].push(ei);
      }
    };

    const spawn = (edgeIdx, fromNode, color, depth) => {
      if (!edges.length) return;
      if (edgeIdx == null) edgeIdx = Math.floor(Math.random() * edges.length);
      const e = edges[edgeIdx];
      if (color == null) {
        const r = Math.random();
        color = r < 0.10 ? '#F5D300' : r < 0.22 ? '#FFB020' : '#00D4FF';
      }
      // Direction: fromNode is where the pulse starts; if not set, randomize
      const reversed = fromNode != null ? (e.b === fromNode) : (Math.random() < 0.5);
      pulses.push({
        edgeIdx, reversed,
        t: 0,
        speed: 0.7 + Math.random() * 0.7,
        color,
        depth: depth || 0,
        phase: Math.random() * Math.PI * 2,
      });
    };

    const render = (now) => {
      raf = requestAnimationFrame(render);
      const dt = lastT ? Math.min((now - lastT) / 1000, 0.05) : 0;
      lastT = now;
      const cw = canvas.clientWidth, ch = canvas.clientHeight;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > cw) n.vx *= -1;
        if (n.y < 0 || n.y > ch) n.vy *= -1;
      }

      ctx.strokeStyle = 'rgba(0, 212, 255, 0.06)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (const e of edges) {
        const a = nodes[e.a], b = nodes[e.b];
        ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
      }
      ctx.stroke();

      ctx.fillStyle = 'rgba(0, 212, 255, 0.3)';
      for (const n of nodes) {
        ctx.beginPath(); ctx.arc(n.x, n.y, 1.2, 0, Math.PI * 2); ctx.fill();
      }

      ctx.globalCompositeOperation = 'lighter';
      ctx.lineCap = 'round';
      const next = [];
      for (const p of pulses) {
        p.t += p.speed * dt;
        const e = edges[p.edgeIdx];
        const start = nodes[p.reversed ? e.b : e.a];
        const end   = nodes[p.reversed ? e.a : e.b];
        if (p.t >= 1) {
          // Pulse reached the end node — branch with probability
          const endIdx = p.reversed ? e.a : e.b;
          if (p.depth < MAX_DEPTH && Math.random() < BRANCH_PROB) {
            const candidates = adj[endIdx].filter(ei => ei !== p.edgeIdx);
            if (candidates.length) {
              const childCount = Math.random() < 0.25 ? 2 : 1;
              for (let c = 0; c < Math.min(childCount, candidates.length); c++) {
                const ci = candidates[Math.floor(Math.random() * candidates.length)];
                spawn(ci, endIdx, p.color, p.depth + 1);
              }
            }
          }
          continue;
        }
        const x = start.x + (end.x - start.x) * p.t;
        const y = start.y + (end.y - start.y) * p.t;
        // Trail: fading line from t-TRAIL_LEN to t
        const tStart = Math.max(0, p.t - TRAIL_LEN);
        const tx = start.x + (end.x - start.x) * tStart;
        const ty = start.y + (end.y - start.y) * tStart;
        const trail = ctx.createLinearGradient(tx, ty, x, y);
        trail.addColorStop(0,   p.color + '00');
        trail.addColorStop(0.6, p.color + '55');
        trail.addColorStop(1,   p.color);
        ctx.strokeStyle = trail;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.stroke();
        // Per-pulse breathing — each has its own phase so they oscillate
        // out of sync, which reads as organic flowing energy
        const breath = 0.7 + 0.3 * Math.sin(now * 0.006 + p.phase);
        const haloR  = 28 * (0.85 + 0.15 * Math.sin(now * 0.005 + p.phase));
        const coreR  = 0.7 * breath;
        // Wider, softer radial glow — gentler stops for diffuse falloff
        const glow = ctx.createRadialGradient(x, y, 0, x, y, haloR);
        glow.addColorStop(0,    p.color + 'CC');
        glow.addColorStop(0.15, p.color + '80');
        glow.addColorStop(0.45, p.color + '30');
        glow.addColorStop(0.75, p.color + '14');
        glow.addColorStop(1,    p.color + '00');
        ctx.fillStyle = glow;
        ctx.beginPath(); ctx.arc(x, y, haloR, 0, Math.PI * 2); ctx.fill();
        // Subtle breathing core (no longer hard white)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath(); ctx.arc(x, y, coreR, 0, Math.PI * 2); ctx.fill();
        next.push(p);
      }
      pulses = next;
      ctx.globalCompositeOperation = 'source-over';

      accum += dt;
      while (accum >= SPAWN_INTERVAL) { spawn(); accum -= SPAWN_INTERVAL; }
    };

    let resizeT = 0;
    const onResize = () => {
      clearTimeout(resizeT);
      resizeT = setTimeout(build, 200);
    };
    const onVis = () => {
      if (document.hidden) { cancelAnimationFrame(raf); raf = 0; }
      else if (!raf) { lastT = 0; raf = requestAnimationFrame(render); }
    };

    build();
    raf = requestAnimationFrame(render);
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVis);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeT);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return <canvas ref={ref} className="av-neural-net" />;
}

Object.assign(window, {
  MagneticCursor, AuroraShader, DecryptText, ShinyText, CountUp, TiltCard, Reveal, Icon, NeuralNet
});
