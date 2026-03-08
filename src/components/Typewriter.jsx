import { useState, useEffect } from 'react';

export default function Typewriter({ text, speed = 50, delay = 0, onDone, className = '' }) {
    const [displayed, setDisplayed] = useState('');
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setStarted(true), delay);
        return () => clearTimeout(timeout);
    }, [delay]);

    useEffect(() => {
        if (!started) return;
        if (displayed.length >= text.length) {
            onDone?.();
            return;
        }
        const timer = setTimeout(() => {
            setDisplayed(text.slice(0, displayed.length + 1));
        }, speed);
        return () => clearTimeout(timer);
    }, [started, displayed, text, speed, onDone]);

    return (
        <span className={className}>
            {displayed}
            <span className="cursor-block" />
        </span>
    );
}
