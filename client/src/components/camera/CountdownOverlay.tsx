import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CountdownOverlayProps {
  isActive: boolean;
  onComplete: () => void;
  seconds?: number;
}

export default function CountdownOverlay({ isActive, onComplete, seconds = 3 }: CountdownOverlayProps) {
  const [count, setCount] = useState(seconds);

  useEffect(() => {
    if (!isActive) {
      setCount(seconds);
      return;
    }

    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      onComplete();
    }
  }, [isActive, count, onComplete, seconds]);

  return (
    <AnimatePresence>
      {isActive && count > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.5 }}
          key={count}
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

