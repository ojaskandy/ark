import React, { useState, useRef } from 'react';
import { martialArtsVideos, MartialArtsVideo, getCategorizedVideos } from '@/data/martialArtsVideos';

interface PreloadedVideoSelectorProps {
  onVideoSelect: (video: HTMLVideoElement | null, url: string, videoData: MartialArtsVideo) => void;
  onCancel: () => void;
}

export default function PreloadedVideoSelector({ onVideoSelect, onCancel }: PreloadedVideoSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('taekwondo');
  const [selectedVideo, setSelectedVideo] = useState<MartialArtsVideo | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const categorizedVideos = getCategorizedVideos();
  const categories = Object.keys(categorizedVideos);

  const handleVideoLoad = (videoData: MartialArtsVideo) => {
    const video = document.createElement('video');
    video.src = videoData.videoUrl;
    video.crossOrigin = 'anonymous';
    video.muted = true;
    video.playsInline = true;
    
    video.onloadedmetadata = () => {
      onVideoSelect(video, videoData.videoUrl, videoData);
    };
    
    video.onerror = () => {
      console.error('Failed to load video:', videoData.videoUrl);
      // Still call onVideoSelect but with null video
      onVideoSelect(null, videoData.videoUrl, videoData);
    };
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-500';
      case 'intermediate': return 'text-yellow-500';
      case 'advanced': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto border border-gray-200 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">select reference video</h2>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-900 text-2xl"
        >
          ✕
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-2 mb-6 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg capitalize whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categorizedVideos[selectedCategory]?.map((video) => (
          <div
            key={video.id}
            className="border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors cursor-pointer"
            onClick={() => handleVideoLoad(video)}
          >
            {/* Thumbnail */}
            <div className="aspect-video bg-gray-100 flex items-center justify-center">
              <img
                src={video.thumbnailUrl}
                alt={video.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // If thumbnail fails to load, show a placeholder
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = `
                    <div class="flex items-center justify-center h-full text-gray-400">
                      <span class="text-4xl">🎥</span>
                    </div>
                  `;
                }}
              />
            </div>

            {/* Video Info */}
            <div className="p-4">
              <h3 className="text-gray-900 font-semibold mb-2 line-clamp-2">
                {video.name}
              </h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {video.description}
              </p>
              <div className="flex justify-between items-center text-sm">
                <span className={`font-medium ${getDifficultyColor(video.difficulty)}`}>
                  {video.difficulty.charAt(0).toUpperCase() + video.difficulty.slice(1)}
                </span>
                <span className="text-gray-500">{video.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {categorizedVideos[selectedCategory]?.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-600 text-lg mb-2">no videos available</div>
          <div className="text-gray-500 text-sm">
            videos for {selectedCategory} category will appear here when added
          </div>
        </div>
      )}

      {/* Cancel Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={onCancel}
          className="px-6 py-2 border border-gray-300 text-gray-900 rounded-lg hover:border-gray-400 transition-colors font-medium"
        >
          cancel
        </button>
      </div>
    </div>
  );
} 