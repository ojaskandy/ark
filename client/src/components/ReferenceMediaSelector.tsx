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
      className="bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-8 max-w-md w-full shadow-2xl shadow-pink-200/30"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">reference</p>
          <h3 className="text-2xl font-medium text-gray-800">select media</h3>
        </div>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          ✕
        </button>
      </div>

      <p className="text-gray-600 text-center mb-8 text-sm">
        choose a routine from our library or upload your own
      </p>

      <div className="space-y-3">
        <motion.button
          onClick={() => setCurrentView('preloaded')}
          className="w-full h-14 bg-gradient-to-r from-pink-300 to-orange-300 hover:from-pink-200 hover:to-orange-200 text-white font-medium rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-pink-200/50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          🎞️ choose studio routine
        </motion.button>

        <motion.button
          onClick={() => setCurrentView('upload')}
          className="w-full h-14 border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-800 font-medium rounded-2xl flex items-center justify-center gap-3 transition-all bg-white/80"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          📤 upload your own
        </motion.button>

        <button
          onClick={onCancel}
          className="w-full h-12 text-gray-500 hover:text-gray-700 font-medium transition-colors"
        >
          cancel
        </button>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          <p>supports: jpg, png, webp, mp4, webm</p>
        </div>
      </div>
    </motion.div>
  );
}
