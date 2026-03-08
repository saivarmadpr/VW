export default function TerminalWindow({ title, children, className = '' }) {
    return (
        <div className={`terminal-window ${className}`}>
            <div className="terminal-window__titlebar">
                <span className="terminal-window__titlebar-title">
                    +--- {title} ---+
                </span>
                <span className="terminal-window__titlebar-controls">
                    [—] [□] [✕]
                </span>
            </div>
            <div className="terminal-window__body">
                {children}
            </div>
        </div>
    );
}
