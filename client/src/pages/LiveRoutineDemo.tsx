import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLocation } from 'wouter';
import ReferenceMediaSelector from '@/components/ReferenceMediaSelector';
import CameraView from '@/components/CameraView';
import { MartialArtsVideo } from '@/data/martialArtsVideos';
import { requestCameraPermission, getCameraStream } from '@/lib/cameraUtils';
import { initPoseDetection } from '@/lib/poseDetection';

type ViewMode = 'select' | 'comparison';

const LiveRoutineDemo: React.FC = () => {
  const [, navigate] = useLocation();
  const [viewMode, setViewMode] = useState<ViewMode>('select');
  const [showSelector, setShowSelector] = useState(false);

  // Media state
  const [selectedVideo, setSelectedVideo] = useState<{
    video: HTMLVideoElement;
    url: string;
    data?: MartialArtsVideo;
  } | null>(null);
  const [selectedImage, setSelectedImage] = useState<{
    image: HTMLImageElement;
    url: string;
  } | null>(null);

  // Camera state
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);

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

  const handleStartComparison = async () => {
    setIsInitializing(true);

    try {
      // Request camera permission
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) {
        alert('camera permission is required for pose comparison');
        setIsInitializing(false);
        return;
      }

      setPermissionGranted(true);

      // Get camera stream
      const cameraStream = await getCameraStream('user');
      setStream(cameraStream);

      // Initialize pose detection
      await initPoseDetection('MoveNet');

      // Switch to comparison view
      setViewMode('comparison');
      setIsTracking(true);
    } catch (error) {
      console.error('Failed to start comparison:', error);
      alert('failed to start camera. please check permissions.');
    } finally {
      setIsInitializing(false);
    }
  };

  const handleBackToSelect = () => {
    // Stop camera stream
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsTracking(false);
    setViewMode('select');
  };

  // Cleanup on unmount
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
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <button
            onClick={handleBackToSelect}
            className="flex items-center text-gray-900 hover:text-gray-600 font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> back to selection
          </button>
          <div className="text-gray-900 font-medium">
            pose comparison
          </div>
        </div>

        {/* Camera View */}
        <div className="p-6">
          <CameraView
            stream={stream}
            isTracking={isTracking}
            confidenceThreshold={0.5}
            modelSelection="MoveNet"
            maxPoses={1}
            skeletonColor="#000000"
            showSkeleton={true}
            showPoints={true}
            showBackground={true}
            backgroundOpacity={100}
            backgroundBlur={0}
            sourceType={selectedVideo ? 'video' : 'image'}
            videoElement={selectedVideo?.video}
            imageElement={selectedImage?.image}
            mediaUrl={selectedVideo?.url || selectedImage?.url}
            showReferenceOverlay={true}
            isFullscreenMode={false}
            onScreenshot={(dataUrl) => console.log('Screenshot:', dataUrl)}
            toggleTracking={() => setIsTracking(!isTracking)}
            cameraFacing="user"
          />
        </div>
      </div>
    );
  }

  // Selection view
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
                  onClick={handleStartComparison}
                  disabled={isInitializing}
                  className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isInitializing ? 'starting...' : 'start comparison'}
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
                  onClick={handleStartComparison}
                  disabled={isInitializing}
                  className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isInitializing ? 'starting...' : 'start comparison'}
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
