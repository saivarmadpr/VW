import TerminalWindow from '../components/TerminalWindow';

export default function About() {
    return (
        <section id="about" className="container">
            <div className="section-header">
                <div className="section-header__label">// section 01</div>
                <h2 className="section-header__title">$ cat about.txt</h2>
            </div>

            <TerminalWindow title="ABOUT_ME.SH">
                <div className="prompt">
                    <span className="prompt__user">sai@portfolio</span>
                    <span className="prompt__path">:~/about</span>
                    <span className="prompt__symbol">$</span>
                    <span className="prompt__command">whoami --verbose</span>
                </div>

                <div style={{ marginLeft: '1rem', marginBottom: '1.25rem' }}>
                    <p style={{ marginBottom: '0.75rem', color: 'var(--primary)' }}>
                        Cybersecurity professional with hands-on experience in security
                        architecture, incident monitoring, and secure application development.
                    </p>
                    <p style={{ marginBottom: '0.75rem', color: 'var(--text-dim)' }}>
                        Currently pursuing a Master of Science in Cybersecurity at Yeshiva
                        University's Katz School of Science and Health. Previously developed
                        secure applications at Virgin Money (Virtusa), where I integrated
                        security into CI/CD pipelines and contributed to a 20% reduction in
                        post-deployment security issues.
                    </p>
                    <p style={{ color: 'var(--text-dim)' }}>
                        Passionate about building resilient systems through least-privilege
                        enforcement, NIST frameworks, and proactive threat detection.
                    </p>
                </div>

                <div className="prompt">
                    <span className="prompt__user">sai@portfolio</span>
                    <span className="prompt__path">:~/about</span>
                    <span className="prompt__symbol">$</span>
                    <span className="prompt__command">cat contact_info.json</span>
                </div>
                <pre
                    style={{
                        marginLeft: '1rem',
                        color: 'var(--secondary)',
                        textShadow: 'var(--glow-amber)',
                        fontSize: '0.8rem',
                        lineHeight: 1.8,
                    }}
                >
                    {`{
  "location": "Jersey City, NJ 07304",
  "email":    "eluruvidya@gmail.com",
  "phone":    "(201) 920-6951",
  "links":    ["LinkedIn", "GitHub"]
}`}
                </pre>
            </TerminalWindow>
        </section>
    );
}
