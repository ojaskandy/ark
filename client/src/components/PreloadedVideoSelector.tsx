import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { type DanceRoutine, getRoutinesByStyle } from '@/data/danceRoutines';

interface PreloadedVideoSelectorProps {
  onVideoSelect: (video: HTMLVideoElement | null, url: string, videoData: DanceRoutine) => void;
  onCancel: () => void;
}

export default function PreloadedVideoSelector({ onVideoSelect, onCancel }: PreloadedVideoSelectorProps) {
  const routinesByStyle = getRoutinesByStyle();
  const styles = Object.keys(routinesByStyle);
  const [selectedStyle, setSelectedStyle] = useState(styles[0] || 'foundations');

  const handleVideoLoad = (routine: DanceRoutine) => {
    const video = document.createElement('video');
    video.src = routine.videoUrl;
    video.crossOrigin = 'anonymous';
    video.muted = true;
    video.playsInline = true;

    video.onloadedmetadata = () => {
      onVideoSelect(video, routine.videoUrl, routine);
    };

    video.onerror = () => {
      console.error('Failed to load video:', routine.videoUrl);
      onVideoSelect(null, routine.videoUrl, routine);
    };
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-6 max-w-5xl w-full max-h-[85vh] overflow-y-auto shadow-2xl shadow-pink-200/30"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">studio library</p>
          <h2 className="text-2xl font-medium text-gray-800">choose a routine</h2>
        </div>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 text-2xl"
        >
          ✕
        </button>
      </div>

      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        {styles.map((style) => (
          <motion.button
            key={style}
            onClick={() => setSelectedStyle(style)}
            className={`px-4 py-2 rounded-full capitalize whitespace-nowrap border transition-all ${
              selectedStyle === style
                ? 'bg-gradient-to-r from-pink-300 to-orange-300 text-white border-transparent shadow-md shadow-pink-200/50'
                : 'bg-white/80 text-gray-600 border-gray-300 hover:border-gray-400'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {style.replace('-', ' ')}
          </motion.button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {routinesByStyle[selectedStyle]?.map((routine, idx) => (
          <motion.div
            key={routine.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            onClick={() => handleVideoLoad(routine)}
            className="group relative bg-white/80 border border-gray-200 hover:border-pink-200 rounded-2xl overflow-hidden cursor-pointer shadow-md shadow-pink-100/20"
            whileHover={{ y: -4, scale: 1.02 }}
          >
            <div className="aspect-video bg-gray-100 flex items-center justify-center relative overflow-hidden">
              <img
                src={routine.thumbnailUrl}
                alt={routine.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = '<div class="flex items-center justify-center h-full text-gray-400 text-4xl">🎥</div>';
                }}
              />
            </div>

            <div className="p-4 space-y-2">
              <p className="text-xs uppercase tracking-wider text-gray-500">
                {routine.style}
              </p>
              <h3 className="text-gray-800 font-medium line-clamp-1">{routine.name}</h3>
              <p className="text-gray-600 text-sm line-clamp-2">{routine.description}</p>
              <div className="flex justify-between items-center text-sm pt-2">
                <span className="text-gray-500">{routine.energy}</span>
                <span className="text-gray-400">{routine.duration}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {routinesByStyle[selectedStyle]?.length === 0 && (
        <div className="text-center py-16">
          <div className="text-gray-500 text-lg mb-2">no routines yet</div>
          <div className="text-gray-400 text-sm">check back soon for more content</div>
        </div>
      )}

      <div className="flex justify-center mt-6">
        <button
          onClick={onCancel}
          className="px-6 py-2 border border-gray-300 text-gray-600 rounded-full hover:bg-white/80 hover:text-gray-800 transition-colors font-medium"
        >
          cancel
        </button>
      </div>
    </motion.div>
  );
}
