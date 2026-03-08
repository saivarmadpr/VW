import TerminalWindow from '../components/TerminalWindow';

const JOBS = [
    {
        role: 'IT Operations & Security Support Analyst',
        company: 'Yeshiva University',
        location: 'New York, NY',
        dates: 'Aug 2025 – Present',
        bullets: [
            'Security Architecture Support: Support university IT systems by resolving high-priority issues using a security-first approach to ensure data protection.',
            'IAM & Policy Enforcement: Manage access control and account management by enforcing least-privilege principles and RBAC to reduce unauthorized access risks.',
            'Incident Monitoring: Identify and escalate security incidents and misconfigurations while troubleshooting authentication and endpoint issues.',
            'Compliance & Standards: Handle sensitive user data in strict compliance with institutional security policies and confidentiality standards.',
        ],
    },
    {
        role: 'Secure Application Developer',
        company: 'Virgin Money (Virtusa)',
        location: 'Chennai, India',
        dates: 'Dec 2022 – Aug 2024',
        bullets: [
            'Security Requirements Analysis: Collaborated with 5+ teams to analyze business and security requirements, delivering 10+ enhancements using Agile practices.',
            'Secure Infrastructure Integration: Integrated security checks into CI/CD pipelines, contributing to a 20% reduction in post-deployment security issues.',
            'Testing & Validation: Conducted unit and functional security testing across 25+ deployments to validate access controls and vulnerability fixes.',
            'Code Review & Standards: Performed peer reviews for 50+ code/config changes to ensure adherence to industry security standards and best practices.',
        ],
    },
];

export default function Experience() {
    return (
        <section id="experience" className="container">
            <div className="section-header">
                <div className="section-header__label">// section 03</div>
                <h2 className="section-header__title">$ history --work</h2>
            </div>

            {JOBS.map((job, i) => (
                <TerminalWindow key={i} title={`JOB_${i + 1}`}>
                    <div className="prompt">
                        <span className="prompt__symbol">&gt;</span>
                        <span className="prompt__command">cat role.log</span>
                    </div>

                    <div style={{ marginLeft: '1rem', marginTop: '0.5rem' }}>
                        <p style={{
                            color: 'var(--primary)',
                            fontWeight: 700,
                            fontSize: '0.95rem',
                            marginBottom: '0.15rem',
                            textShadow: 'var(--glow)',
                        }}>
                            {job.role}
                        </p>
                        <p style={{ color: 'var(--secondary)', textShadow: 'var(--glow-amber)', fontSize: '0.85rem' }}>
                            {job.company} — {job.location}
                        </p>
                        <p className="text-dim" style={{ fontSize: '0.75rem', marginBottom: '1rem' }}>
                            {job.dates}
                        </p>

                        <div className="prompt" style={{ marginBottom: '0.5rem' }}>
                            <span className="prompt__symbol">&gt;</span>
                            <span className="prompt__command">cat achievements.log</span>
                        </div>

                        <ul style={{ listStyle: 'none', paddingLeft: '0.5rem' }}>
                            {job.bullets.map((b, j) => {
                                const [label, ...rest] = b.split(':');
                                return (
                                    <li
                                        key={j}
                                        style={{
                                            marginBottom: '0.6rem',
                                            fontSize: '0.8rem',
                                            lineHeight: 1.6,
                                            paddingLeft: '1.2rem',
                                            position: 'relative',
                                        }}
                                    >
                                        <span
                                            style={{
                                                position: 'absolute',
                                                left: 0,
                                                color: 'var(--muted)',
                                            }}
                                        >
                                            ▸
                                        </span>
                                        <span style={{ color: 'var(--secondary)', textShadow: 'var(--glow-amber)' }}>
                                            {label}:
                                        </span>
                                        <span className="text-dim">{rest.join(':')}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </TerminalWindow>
            ))}
        </section>
    );
}
