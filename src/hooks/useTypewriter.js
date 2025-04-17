import { useState, useEffect, useRef } from 'react';

function useTypewriter(text, speed = 50, startDelay = 0) {
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [startTypingAllowed, setStartTypingAllowed] = useState(false); // Tracks if delay has passed
    const index = useRef(0);
    const typingTimeoutRef = useRef(null); // Ref for the typing interval/timeout
    const delayTimeoutRef = useRef(null); // Ref for the initial delay timeout

    // Effect to handle the initial delay
    useEffect(() => {
        // Clear any existing timeouts when inputs change
        if (delayTimeoutRef.current) clearTimeout(delayTimeoutRef.current);
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

        // Reset state for new text/settings
        setDisplayText('');
        index.current = 0;
        setIsTyping(false);
        setStartTypingAllowed(false); // Ensure delay is reapplied

        delayTimeoutRef.current = setTimeout(() => {
            setStartTypingAllowed(true); // Allow typing to start after delay
            setIsTyping(true); // Set typing to true immediately when starting
        }, startDelay);

        // Cleanup function for the delay timeout
        return () => clearTimeout(delayTimeoutRef.current);
    }, [text, speed, startDelay]); // Rerun if text, speed, or delay changes

    // Effect for the typing animation itself
    useEffect(() => {
        // Only run if typing is allowed and index is within bounds
        if (!startTypingAllowed || index.current >= text.length) {
            // If typing finished, ensure isTyping is false
            if (index.current >= text.length) {
                setIsTyping(false);
            }
            return;
        }

        // Set the timeout for the next character
        typingTimeoutRef.current = setTimeout(() => {
            setDisplayText((prev) => prev + text.charAt(index.current));
            index.current += 1;
        }, speed);

        // Cleanup function for the typing timeout
        return () => clearTimeout(typingTimeoutRef.current);

    }, [displayText, startTypingAllowed, speed, text]); // Rerun when display text updates or allowed status changes

    return { displayText, isTyping };
}

export default useTypewriter;