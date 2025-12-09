import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { type DanceRoutine } from '@/data/danceRoutines';

interface PreloadedVideoSelectorProps {
  onVideoSelect: (video: HTMLVideoElement | null, url: string, videoData: DanceRoutine) => void;
  onCancel: () => void;
}

export default function PreloadedVideoSelector({ onVideoSelect, onCancel }: PreloadedVideoSelectorProps) {
  // Single pre-loaded dance video
  const danceVideo: DanceRoutine = {
    id: 'ark-test',
    name: 'ARK Dance Test',
    url: '/videos/ark_test.mov',
    description: 'Dance routine for testing',
    duration: '0:30',
    level: 'All Levels',
    category: 'Dance'
  };

  const handleVideoSelect = () => {
    // Create a video element to pass back
    const video = document.createElement('video');
    video.src = danceVideo.url;
    video.preload = 'auto';
    
    video.onloadedmetadata = () => {
      onVideoSelect(video, danceVideo.url, danceVideo);
    };
    
    video.onerror = () => {
      console.error('Failed to load video:', danceVideo.url);
      alert('Failed to load video. Please try uploading your own.');
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden"
    >
      <div className="bg-gradient-to-r from-pink-400 to-orange-400 p-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Select Reference Video</h2>
        <button
          onClick={onCancel}
          className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Pre-loaded Dance Routine</h3>
          <p className="text-gray-600 text-sm">Click to select this reference video for your practice session</p>
        </div>

        <div
          onClick={handleVideoSelect}
          className="p-6 bg-gradient-to-br from-pink-50 to-orange-50 rounded-2xl border-2 border-pink-200 hover:border-pink-400 transition-all cursor-pointer hover:shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xl font-semibold text-gray-800">{danceVideo.name}</h4>
              <p className="text-gray-600 mt-1">{danceVideo.description}</p>
              <div className="flex gap-4 mt-3">
                <span className="text-sm text-gray-500">⏱️ {danceVideo.duration}</span>
                <span className="text-sm text-gray-500">📊 {danceVideo.level}</span>
                <span className="text-sm text-gray-500">🎵 {danceVideo.category}</span>
              </div>
            </div>
            <div className="text-4xl">💃</div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            Or close this window and upload your own video
          </p>
        </div>
      </div>
    </motion.div>
  );
}