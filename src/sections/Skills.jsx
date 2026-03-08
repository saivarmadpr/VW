import TerminalWindow from '../components/TerminalWindow';
import ProgressBar from '../components/ProgressBar';

const SKILL_CATEGORIES = [
    {
        category: 'Security Architecture & Frameworks',
        skills: [
            { label: 'NIST Framework', percent: 90 },
            { label: 'Secure Network Arch.', percent: 85 },
            { label: 'PKI (SSL/TLS, AES, RSA)', percent: 85 },
            { label: 'RBAC / Least Privilege', percent: 90 },
        ],
    },
    {
        category: 'Networking & Infrastructure',
        skills: [
            { label: 'TCP/IP, DNS, VPNs', percent: 85 },
            { label: 'IDS/IPS, Firewalls', percent: 80 },
            { label: 'Nmap, Wireshark', percent: 80 },
            { label: 'Routers & Switches', percent: 75 },
        ],
    },
    {
        category: 'SIEM & Analysis',
        skills: [
            { label: 'Splunk', percent: 85 },
            { label: 'ELK Stack', percent: 75 },
            { label: 'Log Analysis', percent: 85 },
            { label: 'Threat Detection', percent: 80 },
        ],
    },
    {
        category: 'Programming & Tools',
        skills: [
            { label: 'Python', percent: 80 },
            { label: 'Bash', percent: 75 },
            { label: 'Java', percent: 70 },
            { label: 'Linux (Kali, Ubuntu)', percent: 85 },
            { label: 'Git / GitHub', percent: 85 },
            { label: 'Postman / SQL', percent: 75 },
        ],
    },
];

export default function Skills() {
    return (
        <section id="skills" className="container">
            <div className="section-header">
                <div className="section-header__label">// section 04</div>
                <h2 className="section-header__title">$ apt list --installed</h2>
            </div>

            <div className="grid-2">
                {SKILL_CATEGORIES.map((cat, i) => (
                    <TerminalWindow key={i} title={cat.category.toUpperCase()}>
                        <div className="prompt" style={{ marginBottom: '0.75rem' }}>
                            <span className="prompt__symbol">&gt;</span>
                            <span className="prompt__command">scan --proficiency</span>
                        </div>
                        {cat.skills.map((s, j) => (
                            <ProgressBar key={j} label={s.label} percent={s.percent} />
                        ))}
                    </TerminalWindow>
                ))}
            </div>
        </section>
    );
}
