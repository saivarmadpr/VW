import { useState, useEffect, useRef } from 'react';

/* ──────────────────────────────────────────────
   RESUME DATA
   ────────────────────────────────────────────── */
const EXPERIENCE = [
  {
    role: 'IT Operations & Security Support Analyst',
    company: 'Yeshiva University',
    location: 'New York, NY',
    dates: 'Aug 2025 – Present',
    badge: 'ACTIVE',
    badgeClass: 'green',
    bullets: [
      ['Security Architecture Support', 'Support university IT systems by resolving high-priority issues using a security-first approach.'],
      ['IAM & Policy Enforcement', 'Manage access control by enforcing least-privilege principles and RBAC.'],
      ['Incident Monitoring', 'Identify and escalate security incidents and misconfigurations.'],
      ['Compliance & Standards', 'Handle sensitive user data in strict compliance with institutional security policies.'],
    ],
  },
  {
    role: 'Secure Application Developer',
    company: 'Virgin Money (Virtusa)',
    location: 'Chennai, India',
    dates: 'Dec 2022 – Aug 2024',
    badge: 'PREV',
    badgeClass: 'dim',
    bullets: [
      ['Security Requirements Analysis', 'Collaborated with 5+ teams to analyze business and security requirements.'],
      ['Secure Infrastructure Integration', 'Integrated security checks into CI/CD pipelines, 20% reduction in post-deployment issues.'],
      ['Testing & Validation', 'Conducted security testing across 25+ deployments to validate access controls.'],
      ['Code Review & Standards', 'Performed peer reviews for 50+ code/config changes for industry compliance.'],
    ],
  },
];

const EDUCATION = [
  {
    school: 'Yeshiva University',
    detail: 'Katz School of Science and Health, New York, NY',
    degree: 'M.S. Cybersecurity',
    date: 'May 2026',
    courses: ['Architecture of Secure Operating Systems', 'Network/Data/Communication Security', 'Risk Management & Governance', 'Cybersecurity Audit'],
  },
  {
    school: 'Sri Venkateshwara Engineering College',
    detail: 'Tirupati, India',
    degree: 'B.E. Computer Science — GPA: 7.5',
    date: 'Jun 2022',
    courses: [],
  },
];

const SKILLS = [
  {
    category: 'Security Architecture',
    skills: [
      ['NIST Framework', 90],
      ['Secure Network Arch.', 85],
      ['PKI (SSL/TLS, AES, RSA)', 85],
      ['RBAC / Least Privilege', 90],
    ],
  },
  {
    category: 'Networking & Infra',
    skills: [
      ['TCP/IP, DNS, VPNs', 85],
      ['IDS/IPS, Firewalls', 80],
      ['Nmap, Wireshark', 80],
      ['Routers & Switches', 75],
    ],
  },
  {
    category: 'SIEM & Analysis',
    skills: [
      ['Splunk', 85],
      ['ELK Stack', 75],
      ['Log Analysis', 85],
      ['Threat Detection', 80],
    ],
  },
  {
    category: 'Programming & Tools',
    skills: [
      ['Python', 80],
      ['Bash', 75],
      ['Java', 70],
      ['Linux (Kali/Ubuntu)', 85],
      ['Git / GitHub', 85],
      ['Postman / SQL', 75],
    ],
  },
];

const CERTS = [
  'CompTIA Security+',
  'Google Cybersecurity Professional Certificate',
  'AWS Cloud Practitioner',
  'Microsoft Cybersecurity Analyst Professional Certificate',
  'Oracle Certified Associate',
];

const NAV_ITEMS = [
  { id: 'profile', label: 'PROFILE.DATA' },
  { id: 'experience', label: 'WORK.HISTORY' },
  { id: 'education', label: 'EDUCATION.LOG' },
  { id: 'skills', label: 'SKILL.INDEX' },
  { id: 'certs', label: 'CERT.VERIFY' },
  { id: 'contact', label: 'COMM.LINK' },
];

/* ──────────────────────────────────────────────
   HELPER COMPONENTS
   ────────────────────────────────────────────── */
function Panel({ title, icon, children, className = '' }) {
  return (
    <div className={`panel ${className}`}>
      <div className="panel__titlebar">
        <div className="panel__titlebar-left">
          {icon && <span className="icon">{icon}</span>}
          {title}
        </div>
        <div className="panel__titlebar-controls">
          <span>—</span>
          <span>□</span>
          <span>✕</span>
        </div>
      </div>
      <div className="panel__body">
        {children}
      </div>
    </div>
  );
}

function SkillBar({ label, percent }) {
  const total = 20;
  const filled = Math.round((percent / 100) * total);
  const bar = '█'.repeat(filled) + '░'.repeat(total - filled);
  return (
    <div className="skill-row">
      <span className="skill-row__label">{label}</span>
      <span className="skill-row__bar">[{bar}]</span>
      <span className="skill-row__pct">{percent}%</span>
    </div>
  );
}

function useClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return time.toLocaleTimeString('en-US', { hour12: false });
}

/* ──────────────────────────────────────────────
   CONTENT VIEWS
   ────────────────────────────────────────────── */
function ProfileView() {
  return (
    <div className="fade-in">
      <div className="content-card">
        <div className="content-card__header">
          <span className="content-card__title">Sai Vidya Eluru</span>
          <span className="content-card__badge content-card__badge--green">ONLINE</span>
        </div>
        <div className="content-card__subtitle">Cybersecurity Analyst & Developer</div>
        <div className="content-card__meta">Jersey City, NJ 07304 &nbsp;|&nbsp; eluruvidya@gmail.com &nbsp;|&nbsp; (201) 920-6951</div>
        <div className="content-card__text">
          Cybersecurity professional with hands-on experience in security
          architecture, incident monitoring, and secure application development.
          Currently pursuing M.S. Cybersecurity at Yeshiva University.
        </div>
        <div className="content-card__text">
          Previously developed secure applications at Virgin Money (Virtusa),
          integrating security into CI/CD pipelines and contributing to a 20%
          reduction in post-deployment security issues.
        </div>
        <div className="content-card__tags">
          <span className="content-card__tag content-card__tag--green">#Security</span>
          <span className="content-card__tag content-card__tag--green">#NIST</span>
          <span className="content-card__tag content-card__tag--green">#IAM</span>
          <span className="content-card__tag content-card__tag--green">#CloudSec</span>
          <span className="content-card__tag content-card__tag--green">#Python</span>
        </div>
      </div>
    </div>
  );
}

function ExperienceView() {
  return (
    <div className="fade-in">
      {EXPERIENCE.map((job, i) => (
        <div key={i} className="content-card">
          <div className="content-card__header">
            <span className="content-card__title">{job.role}</span>
            <span className={`content-card__badge content-card__badge--${job.badgeClass}`}>{job.badge}</span>
          </div>
          <div className="content-card__subtitle">{job.company} — {job.location}</div>
          <div className="content-card__meta">{job.dates}</div>
          <ul className="bullet-list">
            {job.bullets.map(([label, desc], j) => (
              <li key={j}><strong>{label}:</strong> {desc}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function EducationView() {
  return (
    <div className="fade-in">
      {EDUCATION.map((edu, i) => (
        <div key={i} className="content-card">
          <div className="content-card__header">
            <span className="content-card__title">{edu.school}</span>
            <span className="content-card__badge content-card__badge--amber">{edu.date}</span>
          </div>
          <div className="content-card__subtitle">{edu.degree}</div>
          <div className="content-card__meta">{edu.detail}</div>
          {edu.courses.length > 0 && (
            <div className="content-card__tags" style={{ marginTop: '6px' }}>
              {edu.courses.map((c, j) => (
                <span key={j} className="content-card__tag">{c}</span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function SkillsView() {
  return (
    <div className="fade-in">
      {SKILLS.map((group, i) => (
        <div key={i} className="skill-group">
          <div className="skill-group__title">{group.category}</div>
          {group.skills.map(([label, pct], j) => (
            <SkillBar key={j} label={label} percent={pct} />
          ))}
        </div>
      ))}
    </div>
  );
}

function CertsView() {
  return (
    <div className="fade-in">
      {CERTS.map((cert, i) => (
        <div key={i} className="cert-row">
          <span className="cert-row__name">
            <span className="cert-row__idx">{String(i + 1).padStart(2, '0')}.</span>
            {cert}
          </span>
          <span className="cert-row__status">[OK]</span>
        </div>
      ))}
      <div style={{ marginTop: '12px', fontSize: '10px', color: 'var(--text-dim)', borderTop: '1px dashed var(--border)', paddingTop: '8px' }}>
        <span style={{ color: 'var(--primary)' }}>✓</span> {CERTS.length} certificates verified. All signatures valid.
      </div>
    </div>
  );
}

function ContactView() {
  const [sent, setSent] = useState(false);
  return (
    <div className="fade-in">
      <div className="contact-prompt">visitor@sai:~/contact $ ./send_message.sh</div>
      <form onSubmit={(e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 3000); }}>
        <div className="contact-field">
          <label className="contact-field__label" htmlFor="c-name">name &gt;</label>
          <input id="c-name" className="contact-field__input" type="text" placeholder="Enter your name..." required />
        </div>
        <div className="contact-field">
          <label className="contact-field__label" htmlFor="c-email">email &gt;</label>
          <input id="c-email" className="contact-field__input" type="email" placeholder="Enter your email..." required />
        </div>
        <div className="contact-field">
          <label className="contact-field__label" htmlFor="c-msg">msg &gt;</label>
          <textarea id="c-msg" className="contact-field__input" placeholder="Type your message..." required />
        </div>
        <button type="submit" className="contact-btn">[ TRANSMIT ]</button>
        {sent && <div className="contact-success">✓ Message sent successfully. Exit code: 0</div>}
      </form>
    </div>
  );
}

const VIEWS = {
  profile: { component: ProfileView, label: 'PROFILE_DATA' },
  experience: { component: ExperienceView, label: 'WORK_HISTORY' },
  education: { component: EducationView, label: 'EDUCATION_LOG' },
  skills: { component: SkillsView, label: 'SKILL_INDEX' },
  certs: { component: CertsView, label: 'CERT_VERIFY' },
  contact: { component: ContactView, label: 'COMM_LINK' },
};

/* ──────────────────────────────────────────────
   SYSTEM MONITOR
   ────────────────────────────────────────────── */
function SystemMonitor() {
  const [stats, setStats] = useState({
    cores: [85, 42, 63],
    ram: 24,
    swap: 9,
  });

  useEffect(() => {
    const id = setInterval(() => {
      setStats({
        cores: [
          Math.min(99, Math.max(20, stats.cores[0] + Math.floor(Math.random() * 11) - 5)),
          Math.min(99, Math.max(10, stats.cores[1] + Math.floor(Math.random() * 11) - 5)),
          Math.min(99, Math.max(15, stats.cores[2] + Math.floor(Math.random() * 11) - 5)),
        ],
        ram: Math.min(40, Math.max(15, stats.ram + Math.floor(Math.random() * 5) - 2)),
        swap: Math.min(15, Math.max(3, stats.swap + Math.floor(Math.random() * 3) - 1)),
      });
    }, 2000);
    return () => clearInterval(id);
  });

  const makeBar = (pct, len = 20) => {
    const filled = Math.round((pct / 100) * len);
    return '▐' + '█'.repeat(filled) + ' '.repeat(len - filled) + '▌';
  };

  return (
    <>
      <div className="sysmon__section-title">
        <span>CPU_LOAD</span>
        <span className="icon">📊</span>
      </div>
      {stats.cores.map((c, i) => (
        <div key={i} className="sysmon__bar-row">
          <span className="sysmon__bar-label">Core_{i}</span>
          <span className="sysmon__bar-fill">{makeBar(c)}</span>
          <span className="sysmon__bar-pct">{c}%</span>
        </div>
      ))}

      <div className="sysmon__section-title">
        <span>MEMORY</span>
        <span className="icon">💾</span>
      </div>
      <div className="sysmon__bar-row">
        <span className="sysmon__bar-label">RAM</span>
        <span className="sysmon__bar-fill">{makeBar(stats.ram)}</span>
        <span className="sysmon__bar-pct">{stats.ram}%</span>
      </div>
      <div className="sysmon__bar-row">
        <span className="sysmon__bar-label">SWAP</span>
        <span className="sysmon__bar-fill">{makeBar(stats.swap)}</span>
        <span className="sysmon__bar-pct">{stats.swap}%</span>
      </div>

      <div className="sysmon__log">
        <div className="sysmon__log-line">scanning ports...</div>
        <div className="sysmon__log-line">initializing display...</div>
        <div className="sysmon__log-line">garbage collection: 142</div>
        <div className="sysmon__log-line">connection stable (tls)</div>
      </div>
    </>
  );
}

/* ──────────────────────────────────────────────
   TERMINAL SHELL
   ────────────────────────────────────────────── */
function TerminalShell({ activeView }) {
  const [lines, setLines] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const bottomRef = useRef(null);

  // Seed with initial lines
  useEffect(() => {
    setLines([
      { type: 'cmd', prompt: 'guest@system:~$', cmd: 'init' },
      { type: 'out', text: '  Initializing System Interface v1.0.4...' },
      { type: 'cmd', prompt: 'guest@system:~$', cmd: 'whoami' },
      { type: 'out', text: '  guest_user_7734' },
      { type: 'cmd', prompt: 'guest@system:~$', cmd: 'uptime' },
      { type: 'out', text: '  System active. All modules operational.' },
    ]);
  }, []);

  // Log navigation events
  useEffect(() => {
    if (activeView) {
      setLines(prev => [
        ...prev,
        { type: 'cmd', prompt: 'guest@system:~$', cmd: `open ${activeView}` },
        { type: 'out', text: `  Loading ${VIEWS[activeView]?.label || activeView}...` },
      ]);
    }
  }, [activeView]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    const cmd = inputVal.trim().toLowerCase();
    let output = `  Unknown command: ${inputVal.trim()}`;
    if (cmd === 'help') output = '  Commands: help, whoami, status, clear, ls';
    else if (cmd === 'whoami') output = '  guest_user — visitor session';
    else if (cmd === 'status') output = '  All systems nominal. Uptime: 99.97%';
    else if (cmd === 'ls') output = '  profile.dat  work.log  edu.log  skills.idx  certs.gpg  comm.sh';
    else if (cmd === 'clear') { setLines([]); setInputVal(''); return; }

    setLines(prev => [
      ...prev,
      { type: 'cmd', prompt: 'guest@system:~$', cmd: inputVal.trim() },
      { type: 'out', text: output },
    ]);
    setInputVal('');
  };

  return (
    <>
      {lines.map((line, i) => (
        <div key={i} className="shell__line">
          {line.type === 'cmd' ? (
            <>
              <span className="shell__prompt">{line.prompt} </span>
              <span className="shell__command">{line.cmd}</span>
            </>
          ) : (
            <span className="shell__output">{line.text}</span>
          )}
        </div>
      ))}
      <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: 0, marginTop: '4px' }}>
        <span className="shell__prompt">guest@system:~$ </span>
        <input
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--primary)',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            outline: 'none',
            flex: 1,
            caretColor: 'var(--primary)',
          }}
          autoFocus
        />
        <span className="shell__cursor" />
      </form>
      <div ref={bottomRef} />
    </>
  );
}

/* ──────────────────────────────────────────────
   APP (DASHBOARD)
   ────────────────────────────────────────────── */
export default function App() {
  const [activeView, setActiveView] = useState('profile');
  const clock = useClock();
  const ViewComponent = VIEWS[activeView]?.component || ProfileView;

  return (
    <>
      {/* CRT Overlay */}
      <div className="crt-overlay" aria-hidden="true" />

      <div className="dashboard">
        {/* ── Header ── */}
        <div className="header-bar">
          <div className="header-bar__left">
            <span className="header-bar__icon">&gt;_</span>
            <div>
              <div className="header-bar__title">SAI_VIDYA_TERMINAL</div>
              <div className="header-bar__subtitle">SYSTEM INTERFACE // CONNECTED</div>
            </div>
          </div>
          <div className="header-bar__right">
            <div className="header-bar__status">
              NET: <span>ONLINE</span>
            </div>
            <div className="header-bar__status">
              ⚡ PWR: <span>100%</span>
            </div>
            <div className="header-bar__clock">
              ● {clock}
            </div>
          </div>
        </div>

        {/* ── Main Grid ── */}
        <div className="main-grid">
          {/* Left Column */}
          <div className="left-col">
            <Panel title="NAVIGATION" icon=">_" className="nav-panel">
              {NAV_ITEMS.map(item => (
                <button
                  key={item.id}
                  className={`nav-btn ${activeView === item.id ? 'nav-btn--active' : ''}`}
                  onClick={() => setActiveView(item.id)}
                >
                  [ {item.label} ]
                </button>
              ))}
            </Panel>

            <Panel title="SYSTEM_MONITOR" icon="$" className="sysmon">
              <SystemMonitor />
            </Panel>
          </div>

          {/* Center Viewer */}
          <Panel
            title={`VIEWER: ${VIEWS[activeView]?.label || ''}`}
            icon=">_"
            className="viewer"
          >
            <ViewComponent />
          </Panel>

          {/* Right — Terminal Shell */}
          <Panel title="TERMINAL_SHELL_V2.4" icon=">_" className="shell">
            <TerminalShell activeView={activeView} />
          </Panel>
        </div>

        {/* ── Footer ── */}
        <div className="footer-bar">
          <span>SYSTEM ID: SV-002-4</span>
          <span>
            MEMORY: 4.81GB &nbsp;&nbsp; ENCRYPTION: AES-256 &nbsp;&nbsp;
            <span className="footer-bar__status">STATUS: SECURE</span>
          </span>
        </div>
      </div>
    </>
  );
}
