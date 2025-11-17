import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLocation } from 'wouter';
import ReferenceMediaSelector from '@/components/ReferenceMediaSelector';
import CameraView from '@/components/CameraView';
import { type DanceRoutine } from '@/data/danceRoutines';
import { requestCameraPermission, getCameraStream } from '@/lib/cameraUtils';
import { initPoseDetection } from '@/lib/poseDetection';

type ViewMode = 'select' | 'comparison';

const LiveRoutineDemo: React.FC = () => {
  const [, navigate] = useLocation();
  const [viewMode, setViewMode] = useState<ViewMode>('select');
  const [showSelector, setShowSelector] = useState(false);

  const [selectedVideo, setSelectedVideo] = useState<{
    video: HTMLVideoElement;
    url: string;
    data?: DanceRoutine;
  } | null>(null);
  const [selectedImage, setSelectedImage] = useState<{
    image: HTMLImageElement;
    url: string;
  } | null>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);

  const handleVideoUpload = (video: HTMLVideoElement, url: string, videoData?: DanceRoutine) => {
    setSelectedVideo({ video, url, data: videoData });
    setShowSelector(false);
  };

  const handleImageUpload = (image: HTMLImageElement, url: string) => {
    setSelectedImage({ image, url });
    setShowSelector(false);
  };

  const handleCancel = () => setShowSelector(false);

  const handleStartComparison = async () => {
    setIsInitializing(true);
    try {
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) {
        alert('camera permission is required');
        setIsInitializing(false);
        return;
      }

      const cameraStream = await getCameraStream('user');
      setStream(cameraStream);
      await initPoseDetection('MoveNet');
      setViewMode('comparison');
      setIsTracking(true);
    } catch (error) {
      console.error('Failed to start comparison:', error);
      alert('failed to start camera');
    } finally {
      setIsInitializing(false);
    }
  };

  const handleBackToSelect = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsTracking(false);
    setViewMode('select');
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  if (viewMode === 'comparison') {
    return (
      <div className="min-h-screen bg-white">
        <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <button
            onClick={handleBackToSelect}
            className="flex items-center text-gray-600 hover:text-gray-900 font-light"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> back
          </button>
          <div className="text-gray-900 font-light">live routine</div>
        </div>

        <div className="p-6">
          <CameraView
            stream={stream}
            isTracking={isTracking}
            confidenceThreshold={0.5}
            modelSelection="MoveNet"
            maxPoses={1}
            skeletonColor="#ec4899"
            showSkeleton
            showPoints
            showBackground
            backgroundOpacity={100}
            backgroundBlur={0}
            sourceType={selectedVideo ? 'video' : 'image'}
            videoElement={selectedVideo?.video}
            imageElement={selectedImage?.image}
            mediaUrl={selectedVideo?.url || selectedImage?.url}
            showReferenceOverlay
            isFullscreenMode={false}
            onScreenshot={(dataUrl) => console.log('Screenshot:', dataUrl)}
            toggleTracking={() => setIsTracking(!isTracking)}
            cameraFacing="user"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-100 px-6 py-4 flex items-center">
        <button
          onClick={() => navigate('/app')}
          className="flex items-center text-gray-600 hover:text-gray-900 font-light"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> back
        </button>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <header className="space-y-4">
            <h1 className="text-4xl font-light text-gray-900">live routine</h1>
            <p className="text-gray-500">
              upload a reference or choose from our library
            </p>
          </header>

          {!selectedVideo && !selectedImage && (
            <div
              onClick={() => setShowSelector(true)}
              className="border border-dashed border-gray-200 rounded-2xl p-16 text-center bg-gray-50 hover:border-gray-300 transition-colors cursor-pointer"
            >
              <div className="text-5xl mb-4">🎥</div>
              <h3 className="text-lg font-medium mb-2 text-gray-900">select reference</h3>
              <p className="text-gray-400 text-sm">click to choose a video or image</p>
            </div>
          )}

          {selectedVideo && (
            <div className="border border-gray-200 rounded-2xl p-6 bg-white">
              <h3 className="text-lg font-medium mb-4 text-gray-900">selected routine</h3>
              <div className="mb-4">
                <video src={selectedVideo.url} controls className="w-full rounded-xl" style={{ maxHeight: '400px' }} />
              </div>
              {selectedVideo.data && (
                <div className="space-y-1 mb-4">
                  <h4 className="font-medium text-gray-900">{selectedVideo.data.name}</h4>
                  <p className="text-gray-500 text-sm">{selectedVideo.data.description}</p>
                </div>
              )}
              <div className="flex gap-3">
                <button
                  onClick={handleStartComparison}
                  disabled={isInitializing}
                  className="px-6 py-3 bg-gray-900 text-white rounded-full font-light disabled:opacity-40"
                >
                  {isInitializing ? 'starting...' : 'start'}
                </button>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="px-6 py-3 border border-gray-200 text-gray-900 rounded-full font-light hover:bg-gray-50"
                >
                  remove
                </button>
              </div>
            </div>
          )}

          {selectedImage && (
            <div className="border border-gray-200 rounded-2xl p-6 bg-white">
              <h3 className="text-lg font-medium mb-4 text-gray-900">selected image</h3>
              <div className="mb-4">
                <img
                  src={selectedImage.url}
                  alt="reference"
                  className="w-full rounded-xl object-contain"
                  style={{ maxHeight: '400px' }}
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleStartComparison}
                  disabled={isInitializing}
                  className="px-6 py-3 bg-gray-900 text-white rounded-full font-light disabled:opacity-40"
                >
                  {isInitializing ? 'starting...' : 'start'}
                </button>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="px-6 py-3 border border-gray-200 text-gray-900 rounded-full font-light hover:bg-gray-50"
                >
                  remove
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {showSelector && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50 p-4">
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
