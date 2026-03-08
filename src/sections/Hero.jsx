import { useState } from 'react';
import Typewriter from '../components/Typewriter';

const ASCII_NAME = `
 ███████  █████  ██     ██    ██ ██ ██████  ██    ██  █████ 
 ██      ██   ██ ██     ██    ██ ██ ██   ██  ██  ██  ██   ██
 ███████ ███████ ██     ██    ██ ██ ██   ██   ████   ███████
      ██ ██   ██ ██      ██  ██  ██ ██   ██    ██    ██   ██
 ███████ ██   ██ ██       ████   ██ ██████     ██    ██   ██

 ███████ ██      ██    ██ ██████  ██    ██
 ██      ██      ██    ██ ██   ██ ██    ██
 █████   ██      ██    ██ ██████  ██    ██
 ██      ██      ██    ██ ██   ██ ██    ██
 ███████ ███████  ██████  ██   ██  ██████
`;

export default function Hero() {
    const [showSubtext, setShowSubtext] = useState(false);

    return (
        <section
            id="hero"
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                paddingTop: '4rem',
                borderBottom: '1px dashed var(--border)',
            }}
        >
            <pre
                className="glow-strong"
                style={{
                    fontSize: 'clamp(0.35rem, 1.2vw, 0.72rem)',
                    lineHeight: 1.2,
                    color: 'var(--primary)',
                    marginBottom: '2rem',
                    whiteSpace: 'pre',
                    fontFamily: 'var(--font-mono)',
                    userSelect: 'none',
                }}
                aria-label="Sai Vidya Eluru"
            >
                {ASCII_NAME}
            </pre>

            <div style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>
                <Typewriter
                    text="> Cybersecurity Analyst & Developer"
                    speed={45}
                    delay={300}
                    onDone={() => setShowSubtext(true)}
                    className="glow"
                />
            </div>

            {showSubtext && (
                <div
                    className="animate-fadeInUp"
                    style={{ marginBottom: '2rem' }}
                >
                    <p className="text-dim" style={{ fontSize: '0.8rem', marginBottom: '1rem' }}>
                        M.S. Cybersecurity @ Yeshiva University &nbsp;|&nbsp; Jersey City, NJ
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a
                            className="terminal-btn"
                            href="#contact"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            [ INITIATE CONTACT ]
                        </a>
                        <a
                            className="terminal-btn terminal-btn--amber"
                            href="#experience"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            [ VIEW EXPERIENCE ]
                        </a>
                    </div>
                </div>
            )}

            <div
                className="text-dim animate-blink"
                style={{
                    position: 'absolute',
                    bottom: '2rem',
                    fontSize: '0.7rem',
                    letterSpacing: '0.2em',
                }}
            >
                ▼ SCROLL TO CONTINUE ▼
            </div>
        </section>
    );
}
