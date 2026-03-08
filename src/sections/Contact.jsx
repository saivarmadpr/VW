import { useState } from 'react';
import TerminalWindow from '../components/TerminalWindow';

export default function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => setSent(false), 4000);
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <section id="contact" className="container">
            <div className="section-header">
                <div className="section-header__label">// section 06</div>
                <h2 className="section-header__title">$ ssh sai@contact</h2>
            </div>

            <TerminalWindow title="SEND_MESSAGE.SH">
                <div className="prompt" style={{ marginBottom: '1.25rem' }}>
                    <span className="prompt__user">visitor@sai</span>
                    <span className="prompt__path">:~/contact</span>
                    <span className="prompt__symbol">$</span>
                    <span className="prompt__command">./send_message.sh</span>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="terminal-input">
                        <label className="terminal-input__prompt" htmlFor="contact-name">
                            name &gt;
                        </label>
                        <input
                            id="contact-name"
                            className="terminal-input__field"
                            type="text"
                            placeholder="Enter your name..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="terminal-input">
                        <label className="terminal-input__prompt" htmlFor="contact-email">
                            email &gt;
                        </label>
                        <input
                            id="contact-email"
                            className="terminal-input__field"
                            type="email"
                            placeholder="Enter your email..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="terminal-input">
                        <label className="terminal-input__prompt" htmlFor="contact-msg">
                            msg &gt;
                        </label>
                        <textarea
                            id="contact-msg"
                            className="terminal-input__field"
                            placeholder="Type your message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                    </div>

                    <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button type="submit" className="terminal-btn">
                            [ TRANSMIT ]
                        </button>
                        {sent && (
                            <span
                                className="animate-fadeInUp"
                                style={{ color: 'var(--primary)', fontSize: '0.8rem', textShadow: 'var(--glow)' }}
                            >
                                ✓ Message sent successfully. Exit code: 0
                            </span>
                        )}
                    </div>
                </form>
            </TerminalWindow>

            {/* Footer */}
            <div
                style={{
                    textAlign: 'center',
                    padding: '2rem 0 1rem',
                    fontSize: '0.7rem',
                    color: 'var(--muted)',
                    borderTop: '1px dashed var(--border)',
                    marginTop: '2rem',
                }}
            >
                <p style={{ marginBottom: '0.5rem' }}>
                    ═══════════════════════════════════════════════
                </p>
                <p>
                    Built with <span className="text-primary">React</span> +{' '}
                    <span className="text-primary">Vite</span> &nbsp;|&nbsp;
                    Design: <span className="text-amber">Terminal CLI</span> &nbsp;|&nbsp;
                    © 2026 Sai Vidya Eluru
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                    <a href="mailto:eluruvidya@gmail.com" style={{ color: 'var(--text-dim)', fontSize: '0.7rem' }}>
                        eluruvidya@gmail.com
                    </a>
                    &nbsp;&nbsp;|&nbsp;&nbsp;
                    <a href="tel:2019206951" style={{ color: 'var(--text-dim)', fontSize: '0.7rem' }}>
                        (201) 920-6951
                    </a>
                </p>
                <p style={{ marginTop: '0.75rem', fontFamily: 'var(--font-retro)', fontSize: '0.85rem' }}>
                    <span className="text-primary glow">CONNECTION CLOSED.</span>
                    <span className="cursor-block" />
                </p>
            </div>
        </section>
    );
}
