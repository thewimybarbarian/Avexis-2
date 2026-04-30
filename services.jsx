// Avexis — Intro, Navbar, Hero

const { useState: useStateH, useEffect: useEffectH } = React;

function Intro({ onComplete }) {
  const [out, setOut] = useStateH(false);
  const [pct, setPct] = useStateH(0);
  const [typed, setTyped] = useStateH('');
  const videoRef = React.useRef(null);
  const finish = React.useCallback(() => {
    setOut(true);
    setTimeout(onComplete, 800);
  }, [onComplete]);
  useEffectH(() => {
    const v = videoRef.current;
    if (!v) return;
    const fallback = setTimeout(finish, 6000);
    const onLoaded = () => clearTimeout(fallback);
    v.addEventListener('loadeddata', onLoaded, { once: true });
    v.play?.().catch(() => {});
    return () => { clearTimeout(fallback); v.removeEventListener('loadeddata', onLoaded); };
  }, [finish]);
  // Fake loading percentage
  useEffectH(() => {
    let p = 0;
    const iv = setInterval(() => {
      p += 1 + Math.random() * 4;
      if (p >= 100) { p = 100; clearInterval(iv); }
      setPct(Math.round(p));
    }, 60);
    return () => clearInterval(iv);
  }, []);
  // Typing effect
  useEffectH(() => {
    const str = 'a new era of design ...';
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setTyped(str.slice(0, i));
      if (i >= str.length) clearInterval(iv);
    }, 70);
    return () => clearInterval(iv);
  }, []);
  return (
    <div className={`av-intro av-intro--video ${out ? 'is-out' : ''}`}>
      <div className="av-intro__stack">
        <video
          ref={videoRef}
          className="av-intro__video"
          src="assets/intro.mp4"
          autoPlay
          muted
          playsInline
          onEnded={finish}
        />
        <div className="av-intro__caption">
          <span className="av-intro__typed">{typed}<span className="av-intro__caret" /></span>
          <span className="av-intro__pct">{String(pct).padStart(3, '0')}%</span>
        </div>
      </div>
      <div className="av-intro__video-vignette" />
      <button className="av-intro__skip" onClick={finish}>Skip →</button>
    </div>
  );
}

function Nav() {
  const links = [
    ['Services', '#services'],
    ['Work', '#work'],
    ['Agents', '#agents'],
    ['Estimator', '#estimator'],
    ['Contact', '#contact'],
  ];
  const [t, setT] = useStateH('');
  useEffectH(() => {
    const tick = () => {
      const d = new Date();
      setT(d.toLocaleTimeString('en-US', { hour12: false, timeZone: 'America/New_York' }) + ' EST');
    };
    tick(); const iv = setInterval(tick, 1000); return () => clearInterval(iv);
  }, []);
  return (
    <nav className="av-nav">
      <a href="#" className="av-nav__brand" data-magnetic>
        <video className="av-nav__mark av-nav__mark--video" src="assets/intro.mp4" autoPlay muted loop playsInline />
        <span className="av-nav__word">Avexis</span>
      </a>
      <div className="av-nav__pill">
        {links.map(([l, h]) => <a key={l} href={h}>{l}</a>)}
        <a className="is-cta" href="#contact" data-magnetic>Get Started</a>
      </div>
      <div className="av-nav__right">
        <span className="av-nav__clock">
          <span className="av-dot av-dot--pulse" />
          <span className="av-mono-label">LIVE · {t}</span>
        </span>
      </div>
    </nav>
  );
}

function Hero({ variant = 'engineered', accent = '#00D4FF' }) {
  const isDecl = variant === 'declarative';
  return (
    <section className="av-hero" id="top">
      <div className="av-hero__shader">
        <AuroraShader accent={accent} />
      </div>
      <div className="av-hero__grid" />
      <div className="av-hero__vignette" />

      <div className="av-hero__inner">
        <div className="av-hero__badge" data-magnetic>
          <span className="av-dot av-dot--pulse" />
          <span className="av-mono-label" style={{ letterSpacing: '.2em' }}>
            <DecryptText text="AI-Powered Design & Development" delay={200} />
          </span>
        </div>

        <ParallaxLayer depth={14}>
        {isDecl ? (
          <h1 className="av-hero__title">
            <span className="glow"><DecryptText text="We build" delay={500} /></span><br />
            <ShinyText>machines that ship.</ShinyText>
          </h1>
        ) : (
          <h1 className="av-hero__title">
            <span className="glow"><DecryptText text="Intelligence" delay={500} scrambleDuration={4} /></span><br />
            <ShinyText>Engineered.</ShinyText>
          </h1>
        )}
        </ParallaxLayer>

        <p className="av-hero__sub">
          We build websites, automate workflows, and deploy AI agents that run your operation.
          One team. No hand-offs. Shipped in days, not months.
        </p>

        <div className="av-hero__cta">
          <a className="av-btn av-btn--primary" href="#contact" data-magnetic>
            Start a Project <Icon.ArrowRight width={16} height={16} />
          </a>
          <a className="av-btn av-btn--ghost" href="#services" data-magnetic>
            Explore Services
          </a>
        </div>

        <div className="av-hero__stats" style={{ position: 'relative' }}>
          <DataStream count={10} />
          <StatCard icon={<Icon.Clock />} label="48h average launch" meta="from brief → live deploy" />
          <StatCard icon={<Icon.Bot />} label="Agents on shift" meta="24/7 · self-directing" />
          <StatCard icon={<Icon.Zap />} label="Workflows wired" meta="12+ integrations / build" />
        </div>
      </div>

      <div className="av-hero__scroll">Scroll</div>
    </section>
  );
}

function StatCard({ icon, label, meta }) {
  return (
    <div className="av-stat-card" data-hoverable>
      <div className="av-stat-card__icon">{icon}</div>
      <div>
        <div className="av-stat-card__label">{label}</div>
        <div className="av-stat-card__meta">{meta}</div>
      </div>
    </div>
  );
}

function Marquee() {
  const items = ['48-Hour Websites', 'AI Automations', 'Brand + Media', 'Agent Systems', 'Ongoing Support', 'Intelligence · Engineered'];
  const row = (
    <span className="av-marquee__item">
      {items.map((it, i) => <React.Fragment key={i}>
        <span>{it}</span>
        <span className="av-marquee__sep">◆</span>
      </React.Fragment>)}
    </span>
  );
  return (
    <div className="av-marquee-wrap">
      <div className="av-marquee">
        <div className="av-marquee__row">{row}{row}{row}{row}</div>
      </div>
    </div>
  );
}

Object.assign(window, { Intro, Nav, Hero, Marquee });
