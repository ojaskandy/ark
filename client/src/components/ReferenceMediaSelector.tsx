import { useState } from 'react';
import { Button } from '@/components/ui/button';
import MediaUploader from './MediaUploader';
import PreloadedVideoSelector from './PreloadedVideoSelector';
import { MartialArtsVideo } from '@/data/martialArtsVideos';

interface ReferenceMediaSelectorProps {
  onImageUpload: (image: HTMLImageElement, url: string) => void;
  onVideoUpload: (video: HTMLVideoElement, url: string, videoData?: MartialArtsVideo) => void;
  onCancel: () => void;
}

export default function ReferenceMediaSelector({ 
  onImageUpload, 
  onVideoUpload, 
  onCancel 
}: ReferenceMediaSelectorProps) {
  const [currentView, setCurrentView] = useState<'main' | 'preloaded' | 'upload'>('main');

  const handlePreloadedVideoSelect = (video: HTMLVideoElement, url: string, videoData: MartialArtsVideo) => {
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

  // Main selection view
  return (
    <div className="p-8 bg-white rounded-lg max-w-md w-full border border-gray-200 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">
          select reference media
        </h3>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-900"
        >
          ✕
        </button>
      </div>

      <p className="text-gray-600 text-center mb-8">
        choose a video or upload your own
      </p>

      <div className="space-y-3">
        {/* Pre-loaded Video Option */}
        <button
          onClick={() => setCurrentView('preloaded')}
          className="w-full h-14 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg flex items-center justify-center gap-3 transition-colors"
        >
          📹 choose pre-loaded video
        </button>

        {/* Upload Option */}
        <button
          onClick={() => setCurrentView('upload')}
          className="w-full h-14 border border-gray-300 hover:border-gray-400 text-gray-900 font-medium rounded-lg flex items-center justify-center gap-3 transition-colors"
        >
          📤 upload your own
        </button>

        {/* Cancel Button */}
        <button
          onClick={onCancel}
          className="w-full h-12 text-gray-600 hover:text-gray-900 font-medium"
        >
          cancel
        </button>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center space-y-1">
          <p>supports: jpg, png, webp, mp4, webm</p>
        </div>
      </div>
    </div>
  );
} 