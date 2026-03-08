import TerminalWindow from '../components/TerminalWindow';

const EDUCATION = [
    {
        school: 'Yeshiva University',
        detail: 'Katz School of Science and Health, New York, NY',
        degree: 'Master of Science in Cybersecurity',
        date: 'May 2026',
        courses: [
            'Architecture of Secure Operating Systems',
            'Network/Data/Communication Security',
            'Risk Management and Governance',
            'Cybersecurity Audit',
        ],
    },
    {
        school: 'Sri Venkateshwara Engineering College',
        detail: 'Tirupati, India',
        degree: 'Computer Science Engineering — Grade: 7.5',
        date: 'Jun 2022',
        courses: [],
    },
];

export default function Education() {
    return (
        <section id="education" className="container">
            <div className="section-header">
                <div className="section-header__label">// section 02</div>
                <h2 className="section-header__title">$ ls ~/education/</h2>
            </div>

            <div className="grid-2">
                {EDUCATION.map((edu, i) => (
                    <TerminalWindow key={i} title={`DEGREE_${i + 1}`}>
                        <div className="prompt">
                            <span className="prompt__symbol">&gt;</span>
                            <span className="prompt__command">cat degree.log</span>
                        </div>

                        <div style={{ marginLeft: '1rem', marginTop: '0.5rem' }}>
                            <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '0.25rem' }}>
                                {edu.school}
                            </p>
                            <p className="text-dim" style={{ fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                                {edu.detail}
                            </p>
                            <p style={{ color: 'var(--secondary)', textShadow: 'var(--glow-amber)', marginBottom: '0.25rem' }}>
                                {edu.degree}
                            </p>
                            <p className="text-dim" style={{ fontSize: '0.75rem', marginBottom: '0.75rem' }}>
                                Graduation: {edu.date}
                            </p>

                            {edu.courses.length > 0 && (
                                <>
                                    <p className="text-dim" style={{ fontSize: '0.7rem', marginBottom: '0.25rem' }}>
                                        RELEVANT COURSES:
                                    </p>
                                    <ul style={{ listStyle: 'none', paddingLeft: '0.5rem' }}>
                                        {edu.courses.map((c, j) => (
                                            <li key={j} style={{ fontSize: '0.78rem', marginBottom: '0.2rem' }}>
                                                <span style={{ color: 'var(--muted)', marginRight: '0.5rem' }}>├──</span>
                                                {c}
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>
                    </TerminalWindow>
                ))}
            </div>
        </section>
    );
}
