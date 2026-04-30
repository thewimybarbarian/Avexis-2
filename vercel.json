// Avexis — Services, About, Work, Agents chat

const services = [
  { num: '01', price: '$2,500', icon: 'Globe', title: '48-Hour Websites',
    desc: 'Custom build, mobile-first layout, messaging & copy, lead capture, live deployment, and full source code ownership. Launched in 48 hours.',
    bullets: ['Brief → launched site', 'Copy + visual system', 'Deployed + handed over'],
    stat: '48', statUnit: 'hr', statLabel: 'Delivery' },
  { num: '02', price: 'Scoped', icon: 'Zap', title: 'AI Automations',
    desc: 'Workflow automation, agent systems, and intake routing. Real operator logic wired behind every build.',
    bullets: ['Intake + triage agents', 'CRM + mail + Slack wires', 'Playback & metrics'],
    stat: '12', statUnit: '+', statLabel: 'Integrations' },
  { num: '03', price: 'Scoped', icon: 'Palette', title: 'Brand + Media',
    desc: 'Brand alignment, creative direction, and production support. We make you look as sharp as your operation runs.',
    bullets: ['Identity system', 'Art direction', '4K video / motion'],
    stat: '4K', statUnit: '', statLabel: 'Deliverables' },
  { num: '04', price: 'Scoped', icon: 'Bot', title: 'Agent Systems',
    desc: 'Team operating layer and internal automation. Deploy self-directing AI agents that adapt to your workflows.',
    bullets: ['Role-defined agents', 'Tool + memory access', 'Supervisor loop'],
    stat: '24', statUnit: '/7', statLabel: 'Autonomous' },
  { num: '05', price: 'Retainer', icon: 'Wrench', title: 'Ongoing Support',
    desc: 'Monthly updates, priority fixes, and iteration support. We stay in the loop so your site never falls behind.',
    bullets: ['Priority fixes', 'Monthly iteration', 'Uptime + monitoring'],
    stat: '99', statUnit: '%', statLabel: 'Uptime' },
];

function Services() {
  return (
    <section id="services" className="av-section">
      <Reveal className="av-section-head">
        <div className="av-section-head__meta">
          <span className="av-section-head__line" />
          <span className="av-section-head__num">// The Machine Room</span>
        </div>
        <h2 className="av-h2"><SplitText text="One team handles launch and operator layer." stagger={22} /></h2>
        <p className="av-section-head__sub">No hand-offs, no vendor chains. Every deliverable is built to operate — not just to look good in a pitch deck.</p>
      </Reveal>

      <div className="av-services__grid">
        {services.map((s, i) => {
          const I = Icon[s.icon];
          return (
            <Reveal key={s.title} delay={i * 80}>
              <TiltCard className="av-service-card" data-hoverable>
                <div className="av-service-card__top">
                  <span className="av-service-card__num">{s.num}</span>
                  <span className="av-service-card__price">{s.price}</span>
                </div>
                <div className="av-service-card__icon"><I width={20} height={20} /></div>
                <h3 className="av-service-card__title">{s.title}</h3>
                <p className="av-service-card__desc">{s.desc}</p>
                <ul className="av-service-card__bullets">
                  {s.bullets.map(b => <li key={b}><span className="av-check-ic"><Icon.Check width={8} height={8} /></span>{b}</li>)}
                </ul>
                <div className="av-service-card__stat">
                  <span className="av-service-card__stat-value">{s.stat}</span>
                  <span className="av-service-card__stat-unit">{s.statUnit}</span>
                  <span style={{ marginLeft: 8 }} className="av-mono-label">{s.statLabel}</span>
                </div>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function About() {
  const stats = [
    { v: 48, s: 'hr', label: 'Avg. Launch Time' },
    { v: 99, s: '%', label: 'Client Retention' },
    { v: 12, s: '+', label: 'AI Integrations' },
    { v: 24, s: '/7', label: 'Agent Uptime' },
  ];
  return (
    <section id="about" className="av-section">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="av-about__grid">
        <Reveal>
          <div className="av-section-head__meta">
            <span className="av-section-head__line" />
            <span className="av-section-head__num">// About AVEXIS</span>
          </div>
          <h2 className="av-h2"><SplitText text="One team. Full stack. Zero gaps." stagger={28} /></h2>
          <p style={{ color: 'var(--gray-light)', fontSize: 17, lineHeight: 1.6, marginTop: 24 }}>
            AVEXIS is a build studio for the AI era. We handle websites, automation, brand, and agent systems — all under one roof. No freelancers, no vendor chains, no hand-offs.
          </p>
          <p style={{ color: 'var(--gray-light)', fontSize: 17, lineHeight: 1.6, marginTop: 16 }}>
            You bring the business. We bring the machine room. Every deliverable is built to operate — not just to look good in a pitch deck.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--dark-border)', border: '1px solid var(--dark-border)', borderRadius: 20, overflow: 'hidden' }}>
            {stats.map(st => (
              <div key={st.label} style={{ background: 'var(--dark-card)', padding: '36px 28px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--display)', fontWeight: 900, fontSize: 44, color: '#fff', letterSpacing: '-.02em', textShadow: '0 0 30px rgba(0,212,255,.4)' }}>
                  <CountUp target={st.v} suffix={st.s} />
                </div>
                <div style={{ marginTop: 8, fontSize: 14, color: 'var(--gray-light)' }}>{st.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const work = [
  { n: '01', client: 'Kairos Labs', kind: 'AI Agent System', title: 'Self-directing triage for a legal ops team.' },
  { n: '02', client: 'Halcyon Freight', kind: '48-Hour Website', title: 'Freight dispatch lead-gen site, shipped in 41 hours.' },
  { n: '03', client: 'Lumenwork Capital', kind: 'Brand + Media', title: 'New identity + investor deck + founding reel.' },
  { n: '04', client: 'Nova Health', kind: 'AI Automation', title: 'Intake routing agent — 72% reduction in manual triage.' },
  { n: '05', client: 'Northwell Robotics', kind: 'Agent + Ops Layer', title: 'Internal ops copilot wired to eight systems.' },
  { n: '06', client: 'Delta Atlas', kind: 'Ongoing Support', title: 'Retainer · product iteration + monitoring.' },
];

function Work() {
  return (
    <section id="work" className="av-section">
      <Reveal className="av-section-head">
        <div className="av-section-head__meta">
          <span className="av-section-head__line" />
          <span className="av-section-head__num">// Selected Work</span>
        </div>
        <h2 className="av-h2"><SplitText text="Receipts, not decks." stagger={32} /></h2>
      </Reveal>
      <div className="av-work__list">
        {work.map(w => (
          <a key={w.n} className="av-work__row" href="#contact" data-hoverable>
            <div className="av-work__n">
              <span className="av-mono-label">{w.n}</span>
              <span className="av-work__arrow"><Icon.ArrowRight width={16} height={16} /></span>
            </div>
            <div>
              <span className="av-work__client-name">{w.client}</span>
              <span className="av-mono-label">{w.kind}</span>
            </div>
            <div className="av-work__title">{w.title}</div>
            <div className="av-work__kind"><span className="av-mono-label" style={{ color: 'var(--cyan)' }}>Case →</span></div>
            <div className="av-work__preview">
              <div className="av-work__thumb">
                <div className="av-work__thumb-stripes" />
                <div className="av-work__thumb-label av-mono-label" style={{ color: '#fff' }}>{w.client}</div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function Agents() {
  const { useState: uS, useRef: uR, useEffect: uE } = React;
  const [msgs, setMsgs] = uS([
    { role: 'agent', text: "Hi — I'm an Avexis agent demo. Ask about pricing, timelines, what we ship, or anything else." },
  ]);
  const [input, setInput] = uS('');
  const [typing, setTyping] = uS(false);
  const scrollRef = uR(null);
  uE(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [msgs, typing]);

  const send = async (t) => {
    const text = (t ?? input).trim();
    if (!text || typing) return;
    setInput('');
    setMsgs(m => [...m, { role: 'user', text }]);
    setTyping(true);
    try {
      const reply = await window.claude.complete({
        messages: [
          { role: 'user', content:
            `You are AVEXIS, a senior build-studio partner. Tone: calm, direct, operator-first. Short paragraphs, no bullet lists unless asked. Never mention "AI model". Keep replies under 80 words.
Context: 48-hour websites from $2,500. AI automations, brand + media, agent systems, ongoing support retainer. One team, no hand-offs.
User: ${text}` }
        ]
      });
      setMsgs(m => [...m, { role: 'agent', text: reply }]);
    } catch {
      setMsgs(m => [...m, { role: 'agent', text: "I'm offline for a second — try me again, or drop a note in the contact form below." }]);
    } finally {
      setTyping(false);
    }
  };

  const prompts = ['What does a 48-hour site include?', 'Can agents handle intake?', 'How do retainers work?', 'Is the code mine?'];

  return (
    <section id="agents" className="av-section">
      <Reveal className="av-section-head">
        <div className="av-section-head__meta">
          <span className="av-section-head__line" />
          <span className="av-section-head__num">// Live Agent</span>
        </div>
        <h2 className="av-h2"><SplitText text="Talk to one of ours. Right now." stagger={26} /></h2>
        <p className="av-section-head__sub">A real agent, scoped to Avexis. Ask about services, fit, or what it would take to ship your thing.</p>
      </Reveal>

      <Reveal>
        <div className="av-agents__shell">
          <div className="av-agents__side">
            <div className="av-agents__side-head"><span className="av-dot av-dot--pulse" /><span className="av-mono-label">AGENT · SCOUT</span></div>
            <div className="av-agents__side-stat">Status<span style={{ color: 'var(--cyan)' }}>Online</span></div>
            <div className="av-agents__side-stat">Memory<span>Session</span></div>
            <div className="av-agents__side-stat">Tools<span>3 active</span></div>
            <div className="av-agents__side-stat">Latency<span>~320ms</span></div>
            <div className="av-agents__side-foot"><span className="av-mono-label">DEMO</span><span>v0.4</span></div>
          </div>
          <div className="av-agents__main">
            <div className="av-agents__scroll" ref={scrollRef}>
              {msgs.map((m, i) => (
                <div key={i} className={`av-msg av-msg--${m.role}`}>
                  <span className="av-mono-label" style={{ color: m.role === 'user' ? 'var(--cyan)' : 'var(--gray-dim)' }}>
                    {m.role === 'user' ? 'YOU' : 'SCOUT'}
                  </span>
                  <div className="av-msg__body">{m.text}</div>
                </div>
              ))}
              {typing && (
                <div className="av-msg av-msg--agent">
                  <span className="av-mono-label" style={{ color: 'var(--gray-dim)' }}>SCOUT</span>
                  <div className="av-msg__body av-msg__body--typing"><span /><span /><span /></div>
                </div>
              )}
            </div>
            <div className="av-agents__prompts">
              {prompts.map(p => <button key={p} className="av-agents__prompt" onClick={() => send(p)}>{p}</button>)}
            </div>
            <div className="av-agents__input">
              <span className="av-mono-label" style={{ color: 'var(--cyan)' }}>&gt;</span>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="Type a question…"
              />
              <button onClick={() => send()} disabled={!input.trim() || typing}>
                Send
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

Object.assign(window, { Services, About, Work, Agents });
