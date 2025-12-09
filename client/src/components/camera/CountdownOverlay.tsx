import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CountdownOverlayProps {
  isActive: boolean;
  onComplete: () => void;
  seconds?: number;
}

export default function CountdownOverlay({ isActive, onComplete, seconds = 3 }: CountdownOverlayProps) {
  const [count, setCount] = useState(seconds);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isActive) {
      setCount(seconds);
      startTimeRef.current = null;
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    // If active and timer not running, start it
    if (!timerRef.current) {
      startTimeRef.current = Date.now();
      
      timerRef.current = setInterval(() => {
        if (!startTimeRef.current) return;
        
        const elapsedSeconds = Math.floor((Date.now() - startTimeRef.current) / 1000);
        const newCount = Math.max(0, seconds - elapsedSeconds);
        
        setCount(newCount);

        if (newCount === 0) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          // Show "GO!" for a moment then complete
          setTimeout(() => {
            onComplete();
          }, 800);
        }
      }, 100); // Check frequently
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isActive, seconds, onComplete]);

  return (
    <AnimatePresence>
      {isActive && count > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.5 }}
          key={count} // Triggers animation on number change
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        >
          <div className="text-9xl font-bold text-white drop-shadow-lg border-4 border-white/50 rounded-full w-64 h-64 flex items-center justify-center bg-royal-purple/80">
            {count}
          </div>
        </motion.div>
      )}
      {isActive && count === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/20"
        >
          <div className="text-8xl font-bold text-white drop-shadow-lg text-center">
            GO! 🚀
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
