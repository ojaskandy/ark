import { useState } from 'react';
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
    <div className="p-8 bg-white rounded-3xl max-w-md w-full border border-rose-100 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-rose-300 mb-1">reference</p>
          <h3 className="text-2xl font-semibold text-rose-900">select media</h3>
        </div>
        <button
          onClick={onCancel}
          className="text-rose-300 hover:text-rose-500 transition-colors"
        >
          ✕
        </button>
      </div>

      <p className="text-rose-500 text-center mb-8 text-sm">
        grab a routine from our studio shelf or upload your own clip / still.
      </p>

      <div className="space-y-3">
        <button
          onClick={() => setCurrentView('preloaded')}
          className="w-full h-14 bg-rose-600 hover:bg-rose-500 text-white font-medium rounded-2xl flex items-center justify-center gap-3 transition-colors"
        >
          🎞️ choose studio routine
        </button>

        <button
          onClick={() => setCurrentView('upload')}
          className="w-full h-14 border border-rose-200 hover:border-rose-300 text-rose-900 font-medium rounded-2xl flex items-center justify-center gap-3 transition-colors bg-rose-50"
        >
          📤 upload your own
        </button>

        <button
          onClick={onCancel}
          className="w-full h-12 text-rose-400 hover:text-rose-600 font-medium"
        >
          cancel
        </button>
      </div>

      <div className="mt-6 pt-4 border-t border-rose-100">
        <div className="text-xs text-rose-300 text-center space-y-1">
          <p>supports: jpg, png, webp, mp4, webm</p>
        </div>
      </div>
    </div>
  );
}
