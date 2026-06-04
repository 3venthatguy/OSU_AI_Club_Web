import React, { useState, useEffect, useRef } from 'react';

const GLITCH_CHARS = "0123456789%@$#&?<>X_";

export interface TextScrambleProps {
  id: string;
  text: string;
  className?: string;
  delay?: number;       // Delay in ms before starting the animation
  stagger?: number;     // Number of frames to stagger each character's reveal
  lockCycles?: number;  // Base number of frames a character scrambles before locking
  intervalMs?: number;  // Duration of each frame in ms
}

export const TextScramble: React.FC<TextScrambleProps> = ({
  id,
  text,
  className = '',
  delay = 0,
  stagger = 2,
  lockCycles = 6,
  intervalMs = 40,
}) => {
  const [frame, setFrame] = useState<number>(-1);
  const [triggerCount, setTriggerCount] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Compute total characters including spaces
  const totalLength = text.length;
  // Account for staggering and base lock cycles
  const maxFrame = (totalLength - 1) * stagger + lockCycles + 3;

  const handleMouseEnter = () => {
    // Re-trigger the glitching scramble logic on hover to make it highly interactive!
    setTriggerCount(prev => prev + 1);
  };

  useEffect(() => {
    // Clear any existing intervals and delays
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setFrame(-1);

    const runScramble = () => {
      let currentFrame = 0;
      setFrame(0);

      timerRef.current = setInterval(() => {
        setFrame(prev => {
          if (prev >= maxFrame) {
            if (timerRef.current) clearInterval(timerRef.current);
            return maxFrame;
          }
          return prev + 1;
        });
      }, intervalMs);
    };

    let startDelayTimer: NodeJS.Timeout | null = null;
    if (delay > 0) {
      startDelayTimer = setTimeout(runScramble, delay);
    } else {
      runScramble();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (startDelayTimer) clearTimeout(startDelayTimer);
    };
  }, [triggerCount, text, delay, stagger, lockCycles, intervalMs, maxFrame]);

  // Break text into words to prevent individual characters from breaking across lines
  let globalCharIndex = 0;
  const words = text.split(' ');

  const wordElements = words.map((word, wordIndex) => {
    const chars = word.split('').map((originalChar) => {
      const idx = globalCharIndex++;
      const startFrame = idx * stagger;
      
      // Introduce an organic digital organic texture: some characters scramble slightly longer than others
      const charLockCycles = lockCycles + (idx % 3);
      const lockFrame = startFrame + charLockCycles;

      let contentChar: string;
      let spanClass = '';
      let style: React.CSSProperties = { display: 'inline-block' };

      if (frame < startFrame) {
        // 1. Initial State: hidden / blank spacing
        contentChar = '\u00A0';
        spanClass = 'text-transparent select-none opacity-0';
      } else if (frame >= startFrame && frame < lockFrame) {
        // 2. Glitching Scramble State
        // Pick a fast-updating, frame-dependent random character
        const charSeed = (frame + idx) % GLITCH_CHARS.length;
        contentChar = GLITCH_CHARS[charSeed];
        spanClass = 'font-mono font-bold text-accent-secondary brightness-125 transition-transform duration-75';
        // Cyber glow shader effect mirroring the website colors
        style.textShadow = '0 0 8px rgba(0, 172, 120, 0.45), 0 0 15px rgba(59, 91, 255, 0.2)';
      } else {
        // 3. Locked Decoded State
        contentChar = originalChar;
        spanClass = 'text-text-primary transition-colors duration-300';
      }

      return (
        <span
          key={idx}
          id={`${id}-character-${idx}`}
          className={`font-mono ${spanClass}`}
          style={style}
        >
          {contentChar}
        </span>
      );
    });

    const isLastWord = wordIndex === words.length - 1;
    if (!isLastWord) {
      // Increment index for the trailing space to ensure uniform staggering
      globalCharIndex++;
    }

    return (
      <span
        key={wordIndex}
        id={`${id}-word-wrapper-${wordIndex}`}
        className="inline-block whitespace-nowrap"
      >
        {chars}
        {!isLastWord && (
          <span
            id={`${id}-word-space-${wordIndex}`}
            className="font-mono text-text-primary"
          >
            {'\u00A0'}
          </span>
        )}
      </span>
    );
  });

  return (
    <span
      id={id}
      className={`inline font-mono select-none cursor-pointer ${className}`}
      onMouseEnter={handleMouseEnter}
    >
      {wordElements}
    </span>
  );
};
