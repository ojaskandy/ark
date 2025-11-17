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
      className="bg-gray-900 border border-gray-800 rounded-3xl p-6 max-w-5xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Studio Library</p>
          <h2 className="text-2xl font-semibold text-white">Choose a Routine</h2>
        </div>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-300 text-2xl"
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
                ? 'bg-gradient-to-r from-pink-500 to-orange-400 text-white border-transparent'
                : 'bg-gray-800 text-gray-400 border-gray-700 hover:border-gray-600'
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
            className="group relative bg-gray-800/50 border border-gray-700 hover:border-pink-500/50 rounded-2xl overflow-hidden cursor-pointer"
            whileHover={{ y: -4 }}
          >
            <div className="aspect-video bg-gray-800 flex items-center justify-center relative overflow-hidden">
              <img
                src={routine.thumbnailUrl}
                alt={routine.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = '<div class="flex items-center justify-center h-full text-gray-600 text-4xl">🎥</div>';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="p-4 space-y-2">
              <p className="text-xs uppercase tracking-wider text-gray-500">
                {routine.style}
              </p>
              <h3 className="text-white font-semibold line-clamp-1">{routine.name}</h3>
              <p className="text-gray-400 text-sm line-clamp-2">{routine.description}</p>
              <div className="flex justify-between items-center text-sm pt-2">
                <span className="text-gray-500">{routine.energy}</span>
                <span className="text-gray-600">{routine.duration}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {routinesByStyle[selectedStyle]?.length === 0 && (
        <div className="text-center py-16">
          <div className="text-gray-500 text-lg mb-2">No routines yet</div>
          <div className="text-gray-600 text-sm">Check back soon for more content</div>
        </div>
      )}

      <div className="flex justify-center mt-6">
        <button
          onClick={onCancel}
          className="px-6 py-2 border border-gray-700 text-gray-400 rounded-full hover:bg-gray-800 hover:text-gray-300 transition-colors font-medium"
        >
          Cancel
        </button>
      </div>
    </motion.div>
  );
}
