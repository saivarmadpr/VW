export default function ProgressBar({ label, percent }) {
    const total = 20;
    const filled = Math.round((percent / 100) * total);
    const empty = total - filled;
    const bar = '█'.repeat(filled) + '░'.repeat(empty);

    return (
        <div className="progress-bar">
            <span className="progress-bar__label">{label}</span>
            <span className="progress-bar__bar">[{bar}]</span>
            <span className="progress-bar__percent">{percent}%</span>
        </div>
    );
}
