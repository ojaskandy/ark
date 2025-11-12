import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLocation } from 'wouter';
import ReferenceMediaSelector from '@/components/ReferenceMediaSelector';
import { MartialArtsVideo } from '@/data/martialArtsVideos';

const LiveRoutineDemo: React.FC = () => {
  const [, navigate] = useLocation();
  const [showSelector, setShowSelector] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<{
    video: HTMLVideoElement;
    url: string;
    data?: MartialArtsVideo;
  } | null>(null);
  const [selectedImage, setSelectedImage] = useState<{
    image: HTMLImageElement;
    url: string;
  } | null>(null);

  const handleVideoUpload = (video: HTMLVideoElement, url: string, videoData?: MartialArtsVideo) => {
    setSelectedVideo({ video, url, data: videoData });
    setShowSelector(false);
  };

  const handleImageUpload = (image: HTMLImageElement, url: string) => {
    setSelectedImage({ image, url });
    setShowSelector(false);
  };

  const handleCancel = () => {
    setShowSelector(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4 flex items-center">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-900 hover:text-gray-600 font-medium"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> back
        </button>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            live routine
          </h1>
          <p className="text-gray-600 text-lg mb-12">
            upload a reference video or image and get real-time pose comparison
          </p>

          {/* Main Action */}
          {!selectedVideo && !selectedImage && (
            <div
              onClick={() => setShowSelector(true)}
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors cursor-pointer"
            >
              <div className="text-6xl mb-4">📹</div>
              <h3 className="text-xl font-medium mb-2 text-gray-900">upload reference media</h3>
              <p className="text-gray-600">
                click to select a video or image
              </p>
            </div>
          )}

          {/* Selected Video Display */}
          {selectedVideo && (
            <div className="border border-gray-200 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-medium mb-4 text-gray-900">selected video</h3>
              <div className="mb-4">
                <video
                  src={selectedVideo.url}
                  controls
                  className="w-full rounded-lg"
                  style={{ maxHeight: '400px' }}
                />
              </div>
              {selectedVideo.data && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900">{selectedVideo.data.name}</h4>
                  <p className="text-gray-600 text-sm">{selectedVideo.data.description}</p>
                </div>
              )}
              <div className="flex gap-3">
                <button
                  className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium"
                >
                  start comparison
                </button>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="px-6 py-3 border border-gray-300 text-gray-900 rounded-lg hover:border-gray-400 font-medium"
                >
                  remove
                </button>
              </div>
            </div>
          )}

          {/* Selected Image Display */}
          {selectedImage && (
            <div className="border border-gray-200 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-medium mb-4 text-gray-900">selected image</h3>
              <div className="mb-4">
                <img
                  src={selectedImage.url}
                  alt="Reference"
                  className="w-full rounded-lg"
                  style={{ maxHeight: '400px', objectFit: 'contain' }}
                />
              </div>
              <div className="flex gap-3">
                <button
                  className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium"
                >
                  start comparison
                </button>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="px-6 py-3 border border-gray-300 text-gray-900 rounded-lg hover:border-gray-400 font-medium"
                >
                  remove
                </button>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-3">📹</div>
              <h3 className="text-lg font-medium mb-2 text-gray-900">video upload</h3>
              <p className="text-gray-600 text-sm">
                upload your own reference videos
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">📸</div>
              <h3 className="text-lg font-medium mb-2 text-gray-900">image upload</h3>
              <p className="text-gray-600 text-sm">
                or use reference images
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🤖</div>
              <h3 className="text-lg font-medium mb-2 text-gray-900">ai analysis</h3>
              <p className="text-gray-600 text-sm">
                real-time pose comparison
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Media Selector Modal */}
      {showSelector && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <ReferenceMediaSelector
            onImageUpload={handleImageUpload}
            onVideoUpload={handleVideoUpload}
            onCancel={handleCancel}
          />
        </div>
      )}
    </div>
  );
};

export default LiveRoutineDemo;
