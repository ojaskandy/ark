import { useState } from 'react';
import { motion } from 'framer-motion';
import MediaUploader from './MediaUploader';
import PreloadedVideoSelector from './PreloadedVideoSelector';
import { type DanceRoutine } from '@/data/danceRoutines';

interface ReferenceMediaSelectorProps {
  onImageUpload: (image: HTMLImageElement, url: string) => void;
  onVideoUpload: (video: HTMLVideoElement, url: string, videoData?: DanceRoutine) => void;
  onCancel: () => void;
}

export default function ReferenceMediaSelector({
  onImageUpload,
  onVideoUpload,
  onCancel
}: ReferenceMediaSelectorProps) {
  const [currentView, setCurrentView] = useState<'main' | 'preloaded' | 'upload'>('main');

  const handlePreloadedVideoSelect = (video: HTMLVideoElement, url: string, videoData: DanceRoutine) => {
    onVideoUpload(video, url, videoData);
  };

  const handleCustomVideoUpload = (video: HTMLVideoElement, url: string) => {
    onVideoUpload(video, url);
  };

  const handleCustomImageUpload = (image: HTMLImageElement, url: string) => {
    onImageUpload(image, url);
  };

  if (currentView === 'preloaded') {
    return (
      <PreloadedVideoSelector
        onVideoSelect={handlePreloadedVideoSelect}
        onCancel={() => setCurrentView('main')}
      />
    );
  }

  if (currentView === 'upload') {
    return (
      <MediaUploader
        onImageUpload={handleCustomImageUpload}
        onVideoUpload={handleCustomVideoUpload}
        onCancel={() => setCurrentView('main')}
      />
    );
  }

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="bg-gray-900 border border-gray-800 rounded-3xl p-8 max-w-md w-full shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Reference</p>
          <h3 className="text-2xl font-semibold text-white">Select Media</h3>
        </div>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-300 transition-colors"
        >
          ✕
        </button>
      </div>

      <p className="text-gray-400 text-center mb-8 text-sm">
        Choose a routine from our library or upload your own
      </p>

      <div className="space-y-3">
        <motion.button
          onClick={() => setCurrentView('preloaded')}
          className="w-full h-14 bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-400 hover:to-orange-300 text-white font-semibold rounded-2xl flex items-center justify-center gap-3 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          🎞️ Choose Studio Routine
        </motion.button>

        <motion.button
          onClick={() => setCurrentView('upload')}
          className="w-full h-14 border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white font-semibold rounded-2xl flex items-center justify-center gap-3 transition-all bg-gray-800/50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          📤 Upload Your Own
        </motion.button>

        <button
          onClick={onCancel}
          className="w-full h-12 text-gray-500 hover:text-gray-300 font-medium transition-colors"
        >
          Cancel
        </button>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-800">
        <div className="text-xs text-gray-600 text-center">
          <p>Supports: JPG, PNG, WEBP, MP4, WEBM</p>
        </div>
      </div>
    </motion.div>
  );
}
