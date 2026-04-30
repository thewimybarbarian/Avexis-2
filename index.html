// Avexis — Estimator, Pricing, FAQ, Contact, Footer, Tweaks

const serviceTypes = [
  { id: 'website', icon: 'Globe', label: '48-Hour Website', base: 2500, perPage: 300 },
  { id: 'automation', icon: 'Zap', label: 'AI Automation', base: 3500, perPage: 0 },
  { id: 'brand', icon: 'Palette', label: 'Brand + Media', base: 2000, perPage: 0 },
  { id: 'agent', icon: 'Bot', label: 'Agent System', base: 5000, perPage: 0 },
];
const addOns = [
  { id: 'cms', label: 'CMS Integration', price: 500 },
  { id: 'seo', label: 'SEO Optimization', price: 400 },
  { id: 'analytics', label: 'Analytics Dashboard', price: 350 },
  { id: 'copywriting', label: 'AI Copywriting', price: 600 },
  { id: 'hosting', label: 'Managed Hosting (yr)', price: 480 },
  { id: 'support', label: 'Priority Support (mo)', price: 250 },
];
const timelines = [
  { id: 'rush', label: 'Rush (48hr)', mult: 1.5 },
  { id: 'standard', label: 'Standard (1-2 wk)', mult: 1.0 },
  { id: 'flexible', label: 'Flexible (3-4 wk)', mult: 0.85 },
];

const fmt = n => '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });

function Estimator() {
  const { useState: uS, useMemo: uM } = React;
  const [svc, setSvc] = uS('website');
  const [pages, setPages] = uS(5);
  const [ao, setAo] = uS(['seo']);
  const [tl, setTl] = uS('standard');
  const s = serviceTypes.find(x => x.id === svc);
  const t = timelines.find(x => x.id === tl);
  const total = uM(() => {
    const base = s.base;
    const pg = s.perPage * Math.max(0, pages - 1);
    const extras = addOns.filter(x => ao.includes(x.id)).reduce((a, b) => a + b.price, 0);
    return Math.round((base + pg + extras) * t.mult);
  }, [svc, pages, ao, tl]);
  const agency = Math.round(total * 3.2);
  const freelancer = Math.round(total * 1.6);
  const toggle = (id) => setAo(a => a.includes(id) ? a.filter(x => x !== id) : [...a, id]);

  return (
    <section id="estimator" className="av-section">
      <Reveal className="av-section-head">
        <div className="av-section-head__meta">
          <span className="av-section-head__line" />
          <span className="av-section-head__num">// Estimate Your Build</span>
        </div>
        <h2 className="av-h2"><SplitText text="Know the cost before the call." stagger={26} /></h2>
        <p className="av-section-head__sub">Configure your project and see a real-time estimate. No surprises, no anchor pricing games.</p>
      </Reveal>

      <Reveal>
        <div className="av-estimator__frame">
          <div className="av-estimator__controls">
            <div className="av-field">
              <span className="av-mono-label" style={{ color: '#fff' }}>01 &nbsp;<span style={{ color: 'var(--gray-dim)' }}>Service</span></span>
              <div className="av-chips">
                {serviceTypes.map(x => {
                  const I = Icon[x.icon];
                  return (
                    <button key={x.id} className={`av-chip ${svc === x.id ? 'is-on' : ''}`} onClick={() => setSvc(x.id)} data-hoverable>
                      <I width={12} height={12} style={{ marginRight: 6, verticalAlign: '-2px' }} />
                      {x.label} · from {fmt(x.base)}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="av-field" data-disabled={svc !== 'website'}>
              <span className="av-mono-label" style={{ color: '#fff' }}>02 &nbsp;<span style={{ color: 'var(--gray-dim)' }}>Pages</span></span>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ color: 'var(--gray-light)', fontSize: 13 }}>Number of pages</span>
                <span style={{ fontFamily: 'var(--display)', fontWeight: 900, fontSize: 26, color: '#fff' }}>
                  {pages}<span style={{ color: 'var(--cyan)', fontSize: 16, marginLeft: 4 }}>pg</span>
                </span>
              </div>
              <input type="range" min="1" max="20" value={pages} onChange={e => setPages(+e.target.value)} className="av-range" />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--gray-dim)', marginTop: -2 }}>
                <span>1</span><span>5</span><span>10</span><span>15</span><span>20</span>
              </div>
            </div>

            <div className="av-field">
              <span className="av-mono-label" style={{ color: '#fff' }}>03 &nbsp;<span style={{ color: 'var(--gray-dim)' }}>Add-ons</span></span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {addOns.map(a => (
                  <label key={a.id} className="av-check" data-hoverable style={{ padding: '10px 12px', border: '1px solid var(--dark-border)', borderRadius: 12, background: 'rgba(0,0,0,.25)', justifyContent: 'space-between' }}>
                    <span style={{ display: 'inline-flex', gap: 10, alignItems: 'center' }}>
                      <input type="checkbox" checked={ao.includes(a.id)} onChange={() => toggle(a.id)} />
                      <span className="av-check__box" />
                      {a.label}
                    </span>
                    <span style={{ color: 'var(--cyan)', fontFamily: 'var(--mono)', fontSize: 12 }}>+{fmt(a.price)}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="av-field">
              <span className="av-mono-label" style={{ color: '#fff' }}>04 &nbsp;<span style={{ color: 'var(--gray-dim)' }}>Timeline</span></span>
              <div className="av-chips">
                {timelines.map(x => (
                  <button key={x.id} className={`av-chip ${tl === x.id ? 'is-on' : ''}`} onClick={() => setTl(x.id)} data-hoverable>
                    {x.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="av-estimator__readout">
            <div className="av-section-head__meta">
              <span className="av-dot av-dot--pulse" />
              <span className="av-mono-label" style={{ color: 'var(--cyan)' }}>YOUR ESTIMATE</span>
            </div>
            <div className="av-estimator__num">
              <span className="av-estimator__currency">$</span>
              <span className="av-estimator__value">{total.toLocaleString()}</span>
            </div>
            <p className="av-estimator__fine">with AVEXIS · {t.label}</p>

            <div className="av-estimator__compare">
              <span className="av-mono-label" style={{ color: 'var(--gray-dim)' }}>COMPARE</span>
              <div className="av-estimator__compare-row">
                <div><strong>Traditional Agency</strong><div style={{ fontSize: 11, color: 'var(--gray-dim)' }}>4–8 weeks</div></div>
                <div style={{ textAlign: 'right' }}>
                  <s>{fmt(agency)}</s>
                  <div style={{ fontSize: 11, color: '#ff6b8a' }}>+{Math.round((agency - total) / total * 100)}% more</div>
                </div>
              </div>
              <div className="av-estimator__compare-row">
                <div><strong>Freelancer</strong><div style={{ fontSize: 11, color: 'var(--gray-dim)' }}>variable quality</div></div>
                <div style={{ textAlign: 'right' }}>
                  <s>{fmt(freelancer)}</s>
                  <div style={{ fontSize: 11, color: '#ff6b8a' }}>+{Math.round((freelancer - total) / total * 100)}% more</div>
                </div>
              </div>
              <div className="av-estimator__compare-row is-us">
                <div><strong>AVEXIS</strong><div style={{ fontSize: 11, color: 'var(--cyan)' }}>Full stack · AI-native</div></div>
                <div style={{ textAlign: 'right' }}>
                  <strong style={{ color: 'var(--cyan)', fontFamily: 'var(--display)', fontSize: 20 }}>{fmt(total)}</strong>
                  <div style={{ fontSize: 11, color: '#6ee7a7' }}>Best value</div>
                </div>
              </div>
            </div>

            <a className="av-btn av-btn--primary" style={{ justifySelf: 'start', alignSelf: 'start', marginTop: 8 }} href="#contact" data-magnetic>
              Lock This Build <Icon.ArrowRight width={16} height={16} />
            </a>
            <p style={{ fontSize: 11, color: 'var(--gray-dim)', margin: 0 }}>No commitment — we'll scope it for free.</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

const faqs = [
  ['How do 48-hour websites actually work?', 'You send us a brief and any brand inputs. We ship a fully deployed site — copy, design, build, deploy — in 48 hours. The clock starts after the brief call. You own the source code.'],
  ['Do you actually build the AI agents, or just wrappers?', 'Real agents. We design the role, memory, tools, and guardrails. We deploy and monitor them. If they underperform, we iterate.'],
  ['Who owns the code?', 'You do, unconditionally. Full source, full hosting credentials, nothing locked behind us.'],
  ['What does the retainer cover?', 'Priority fixes, monthly iteration cycles, monitoring, and uptime checks. Pause it any month.'],
  ['Why should we choose you over an agency?', "We don't charge agency multiples because we don't have agency overhead. One team, tighter loop, shipped faster."],
];

function FAQ() {
  const [open, setOpen] = React.useState(0);
  return (
    <section id="faq" className="av-section">
      <Reveal className="av-section-head">
        <div className="av-section-head__meta">
          <span className="av-section-head__line" />
          <span className="av-section-head__num">// Questions, Answered</span>
        </div>
        <h2 className="av-h2"><SplitText text="The honest FAQ." stagger={36} /></h2>
      </Reveal>
      <div className="av-faq__list">
        {faqs.map(([q, a], i) => (
          <div key={i} className={`av-faq__row ${open === i ? 'is-open' : ''}`}>
            <button className="av-faq__q" onClick={() => setOpen(open === i ? -1 : i)}>
              <span className="av-mono-label">{String(i + 1).padStart(2, '0')}</span>
              <span className="av-faq__q-text">{q}</span>
              <span className="av-faq__toggle">+</span>
            </button>
            <div className="av-faq__a"><div className="av-faq__a-inner">{a}</div></div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = React.useState(false);
  return (
    <section id="contact" className="av-section">
      <div className="av-contact__grid">
        <Reveal>
          <div className="av-section-head__meta">
            <span className="av-section-head__line" />
            <span className="av-section-head__num">// Start a Build</span>
          </div>
          <h2 className="av-h2"><SplitText text="Tell us what you're building." stagger={26} /></h2>
          <p className="av-contact__sub">Drop your details and we'll scope it out. No sales calls, no decks — just a straight answer on timeline, cost, and fit.</p>

          <div className="av-contact__channels">
            <div><span>Email</span><span style={{ color: 'var(--cyan)' }}>hello@avexis.co</span></div>
            <div><span>Studio</span><span>Brooklyn · NYC</span></div>
            <div><span>Response</span><span>&lt; 24 hours</span></div>
            <div><span>Signal</span><span>on request</span></div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          {sent ? (
            <div className="av-contact__form av-contact__done">
              <span className="av-dot av-dot--pulse" />
              <h3>Message received.</h3>
              <p>We'll be back in under 24 hours with a scope — no decks, no sales.</p>
            </div>
          ) : (
            <form className="av-contact__form" onSubmit={e => { e.preventDefault(); setSent(true); }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div className="av-contact__field"><input placeholder="Your name" required /></div>
                <div className="av-contact__field"><input type="email" placeholder="Email address" required /></div>
              </div>
              <div className="av-contact__field"><input placeholder="Company / Project name" /></div>
              <div className="av-contact__field"><textarea rows="5" placeholder="Tell us about your project…" required /></div>
              <button type="submit" className="av-btn av-btn--primary av-contact__submit" data-magnetic>
                Send Message <Icon.Send width={16} height={16} />
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="av-footer">
      <div className="av-footer__mark">
        <span className="av-footer__mark-text" data-text="AVEXIS">AVEXIS</span>
        <span className="av-footer__mark-gleam" />
      </div>
      <div className="av-footer__grid">
        <div>
          <span className="av-mono-label" style={{ color: 'var(--cyan)' }}>// AVEXIS</span>
          <p>A build studio for the AI era. Websites, automations, brand, agents. Shipped in days.</p>
        </div>
        <div>
          <span className="av-mono-label">Build</span>
          <ul><li><a href="#services">Services</a></li><li><a href="#estimator">Estimator</a></li><li><a href="#work">Work</a></li></ul>
        </div>
        <div>
          <span className="av-mono-label">Studio</span>
          <ul><li><a href="#about">About</a></li><li><a href="#agents">Agents</a></li><li><a href="#faq">FAQ</a></li></ul>
        </div>
        <div>
          <span className="av-mono-label">Contact</span>
          <ul><li><a href="mailto:hello@avexis.co">hello@avexis.co</a></li><li><a href="#">LinkedIn</a></li><li><a href="#">Dribbble</a></li></ul>
        </div>
      </div>
      <div className="av-footer__foot">
        <span className="av-mono-label">© {new Date().getFullYear()} AVEXIS. Intelligence · Engineered.</span>
        <span className="av-mono-label" style={{ color: 'var(--gray-dim)' }}>STATUS · ALL SYSTEMS NOMINAL</span>
      </div>
    </footer>
  );
}

function TweaksPanel({ open, state, setState }) {
  if (!open) return null;
  const swatches = ['#00D4FF', '#D8FF3D', '#A78BFA', '#F472B6', '#FF6A3D'];
  return (
    <div className="tweaks is-on">
      <div className="tweaks__head">
        <span className="tweaks__title">Tweaks</span>
        <span className="av-mono-label" style={{ color: 'var(--gray-dim)' }}>LIVE</span>
      </div>
      <div className="tweaks__section">
        <span className="av-mono-label">Accent</span>
        <div className="tweaks__row">
          {swatches.map(c => (
            <button key={c} className={`tweaks__swatch ${state.accent === c ? 'is-on' : ''}`} style={{ background: c, color: c }} onClick={() => setState({ ...state, accent: c })} />
          ))}
        </div>
      </div>
      <div className="tweaks__section">
        <span className="av-mono-label">Hero</span>
        <div className="tweaks__row">
          {['engineered', 'declarative'].map(v => (
            <button key={v} className={`tweaks__btn ${state.heroVariant === v ? 'is-on' : ''}`} onClick={() => setState({ ...state, heroVariant: v })}>
              {v === 'engineered' ? 'Engineered' : 'Declarative'}
            </button>
          ))}
        </div>
      </div>
      <div className="tweaks__section">
        <span className="av-mono-label">Display font</span>
        <div className="tweaks__row">
          {[['orbitron','Orbitron'],['space','Space Grotesk'],['syne','Syne']].map(([id,label]) => (
            <button key={id} className={`tweaks__btn ${state.displayFont === id ? 'is-on' : ''}`} onClick={() => setState({ ...state, displayFont: id })}>
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Estimator, FAQ, Contact, Footer, TweaksPanel });
