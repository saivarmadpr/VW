import { useState, useEffect } from 'react';

const SECTIONS = [
    { id: 'about', label: '~/about' },
    { id: 'education', label: '~/edu' },
    { id: 'experience', label: '~/exp' },
    { id: 'skills', label: '~/skills' },
    { id: 'certs', label: '~/certs' },
    { id: 'contact', label: '~/contact' },
];

export default function NavBar() {
    const [active, setActive] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const sections = SECTIONS.map(s => ({
                id: s.id,
                el: document.getElementById(s.id),
            })).filter(s => s.el);

            let current = '';
            for (const s of sections) {
                const rect = s.el.getBoundingClientRect();
                if (rect.top <= 120) current = s.id;
            }
            setActive(current);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setMenuOpen(false);
    };

    return (
        <nav className="navbar" role="navigation" aria-label="Main navigation">
            <div className="navbar__inner">
                <a
                    className="navbar__logo"
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                >
                    {'>'} sai_vidya
                </a>

                <button
                    className="navbar__hamburger"
                    aria-label="Toggle menu"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span />
                    <span />
                    <span />
                </button>

                <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
                    {SECTIONS.map(s => (
                        <li key={s.id}>
                            <a
                                className={`navbar__link ${active === s.id ? 'navbar__link--active' : ''}`}
                                href={`#${s.id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollTo(s.id);
                                }}
                            >
                                $ {s.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
