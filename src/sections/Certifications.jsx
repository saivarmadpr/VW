import TerminalWindow from '../components/TerminalWindow';

const CERTS = [
    { name: 'CompTIA Security+', status: 'OK' },
    { name: 'Google Cybersecurity Professional Certificate', status: 'OK' },
    { name: 'AWS Cloud Practitioner', status: 'OK' },
    { name: 'Microsoft Cybersecurity Analyst Professional Certificate', status: 'OK' },
    { name: 'Oracle Certified Associate', status: 'OK' },
];

export default function Certifications() {
    return (
        <section id="certs" className="container">
            <div className="section-header">
                <div className="section-header__label">// section 05</div>
                <h2 className="section-header__title">$ gpg --list-keys</h2>
            </div>

            <TerminalWindow title="CERTIFICATIONS">
                <div className="prompt" style={{ marginBottom: '1rem' }}>
                    <span className="prompt__user">sai@portfolio</span>
                    <span className="prompt__path">:~/certs</span>
                    <span className="prompt__symbol">$</span>
                    <span className="prompt__command">verify --all</span>
                </div>

                <table
                    style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        fontSize: '0.82rem',
                    }}
                >
                    <thead>
                        <tr style={{ borderBottom: '1px dashed var(--border)' }}>
                            <th
                                style={{
                                    textAlign: 'left',
                                    padding: '0.4rem 0.5rem',
                                    color: 'var(--text-dim)',
                                    fontWeight: 400,
                                    fontSize: '0.7rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                }}
                            >
                                Certificate Name
                            </th>
                            <th
                                style={{
                                    textAlign: 'right',
                                    padding: '0.4rem 0.5rem',
                                    color: 'var(--text-dim)',
                                    fontWeight: 400,
                                    fontSize: '0.7rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                }}
                            >
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {CERTS.map((cert, i) => (
                            <tr
                                key={i}
                                style={{
                                    borderBottom: i < CERTS.length - 1 ? '1px solid var(--bg-elevated)' : 'none',
                                }}
                            >
                                <td style={{ padding: '0.5rem 0.5rem', color: 'var(--primary)' }}>
                                    <span style={{ color: 'var(--muted)', marginRight: '0.75rem' }}>
                                        {String(i + 1).padStart(2, '0')}.
                                    </span>
                                    {cert.name}
                                </td>
                                <td style={{ padding: '0.5rem 0.5rem', textAlign: 'right' }}>
                                    <span className={`status-tag status-tag--${cert.status.toLowerCase()}`}>
                                        [{cert.status}]
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div
                    style={{
                        marginTop: '1rem',
                        fontSize: '0.75rem',
                        color: 'var(--text-dim)',
                        borderTop: '1px dashed var(--border)',
                        paddingTop: '0.75rem',
                    }}
                >
                    <span style={{ color: 'var(--primary)' }}>✓</span> {CERTS.length} certificates verified.
                    All signatures valid.
                </div>
            </TerminalWindow>
        </section>
    );
}
