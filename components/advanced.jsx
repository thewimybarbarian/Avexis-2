// Avexis — advanced motion primitives

const { useState: uSa, useEffect: uEa, useRef: uRa, useLayoutEffect: uLa } = React;

/* ---------- SplitText — per-character reveal w/ stagger ---------- */
function SplitText({ text, className = '', delay = 0, stagger = 28, as = 'span', once = true, mode = 'fade' }) {
  const Tag = as;
  const ref = uRa(null);
  const [seen, setSeen] = uSa(false);
  uEa(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); if (once) io.disconnect(); }
      else if (!once) { setSeen(false); }
    }, { threshold: 0.2 });
    io.observe(el); return () => io.disconnect();
  }, [once]);
  const words = text.split(' ');
  let charIdx = 0;
  return (
    <Tag ref={ref} className={`av-split av-split--${mode} ${className}`} aria-label={text}>
      {words.map((word, wi) => (
        <React.Fragment key={wi}>
          {wi > 0 && ' '}
          <span className="av-split__word">
            {Array.from(word).map((c, ci) => {
              const i = charIdx++;
              return (
                <span key={ci} className="av-split__ch" aria-hidden="true"
                  style={{ transitionDelay: `${delay + i * stagger}ms`, opacity: seen ? 1 : 0, transform: seen ? 'none' : (mode === 'rise' ? 'translateY(100%)' : 'translateY(20px)') }}>
                  <span className="av-split__inner">{c}</span>
                </span>
              );
            })}
          </span>
        </React.Fragment>
      ))}
    </Tag>
  );
}

/* ---------- ScrollProgress bar ---------- */
function ScrollProgress() {
  const ref = uRa(null);
  uEa(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        const p = h > 0 ? window.scrollY / h : 0;
        if (ref.current) ref.current.style.transform = `scaleX(${p})`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);
  return <div className="av-scroll-progress"><div ref={ref} className="av-scroll-progress__bar" /></div>;
}

/* ---------- DataStream — animated SVG lines in background ---------- */
function DataStream({ count = 14, color = 'rgba(0,212,255,0.15)' }) {
  const ref = uRa(null);
  uEa(() => {
    const svg = ref.current; if (!svg) return;
    const lines = svg.querySelectorAll('line');
    lines.forEach((ln, i) => {
      const delay = Math.random() * 4;
      const dur = 3 + Math.random() * 4;
      ln.style.animation = `streamDown ${dur}s linear ${delay}s infinite`;
    });
  }, []);
  const items = Array.from({ length: count });
  return (
    <svg ref={ref} className="av-stream" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">
      {items.map((_, i) => {
        const x = (i / (count - 1)) * 1000;
        return (
          <line key={i}
            x1={x} x2={x} y1={-100} y2={-20}
            stroke={color} strokeWidth="1" strokeLinecap="round"
            style={{ '--x': x }} />
        );
      })}
    </svg>
  );
}

/* ---------- ParallaxLayer — shifts based on cursor position ---------- */
function ParallaxLayer({ children, depth = 20, className = '' }) {
  const ref = uRa(null);
  uEa(() => {
    let tx = 0, ty = 0, sx = 0, sy = 0, raf = 0;
    const onMove = (e) => {
      tx = (e.clientX / innerWidth - 0.5) * 2;
      ty = (e.clientY / innerHeight - 0.5) * 2;
    };
    const tick = () => {
      sx += (tx - sx) * 0.06;
      sy += (ty - sy) * 0.06;
      if (ref.current) ref.current.style.transform = `translate3d(${sx * depth}px, ${sy * depth}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, [depth]);
  return <div ref={ref} className={className} style={{ willChange: 'transform' }}>{children}</div>;
}

/* ---------- InViewRing — animated stroke ring that draws on enter ---------- */
function InViewRing({ children, className = '' }) {
  const ref = uRa(null);
  const [seen, setSeen] = uSa(false);
  uEa(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect(); }
    }, { threshold: 0.4 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`av-ring ${seen ? 'is-in' : ''} ${className}`}>
      <svg className="av-ring__svg" viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="48" />
      </svg>
      {children}
    </div>
  );
}

/* ---------- MagCard — card-level magnetic content shift ---------- */
function MagCard({ children, className = '', strength = 8 }) {
  const ref = uRa(null);
  const inner = uRa(null);
  const onMove = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    if (inner.current) inner.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };
  const onLeave = () => { if (inner.current) inner.current.style.transform = ''; };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={className}>
      <div ref={inner} style={{ transition: 'transform .35s var(--ease)', willChange: 'transform' }}>
        {children}
      </div>
    </div>
  );
}

Object.assign(window, { SplitText, ScrollProgress, DataStream, ParallaxLayer, InViewRing, MagCard });
