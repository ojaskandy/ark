import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
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
      <div className="min-h-screen bg-gray-100">
        <div className="border-b border-gray-200 bg-white/90 backdrop-blur px-6 py-4 flex items-center justify-between">
          <button
            onClick={handleBackToSelect}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> back
          </button>
          <div className="text-gray-800 font-semibold">Live Routine</div>
        </div>

        <div className="p-6">
          <CameraView
            stream={stream}
            isTracking={isTracking}
            confidenceThreshold={0.5}
            modelSelection="MoveNet"
            maxPoses={1}
            skeletonColor="#fb923c"
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
            initialSplitView={true}
            autoStart={false}
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
    <div className="min-h-screen bg-black overflow-x-hidden">
      {/* Stage Background Image - Consistent with other pages */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div 
          className="absolute bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(/images/ark-stage-bg.png)',
            backgroundPosition: 'center 40%',
            top: '-2.5%',
            left: '-2.5%',
            right: '-2.5%',
            bottom: '-2.5%',
            width: '105%',
            height: '105%'
          }}
        />
        {/* Subtle dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 px-6 py-4 flex items-center"
      >
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-white/80 hover:text-white transition-colors bg-white/10 backdrop-blur-md px-4 py-2 rounded-full"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </button>
      </motion.div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">Live Routine</h1>
            <p className="text-xl text-white/80">
              Upload a reference or choose from our library
            </p>
          </motion.header>

          {!selectedVideo && !selectedImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onClick={() => setShowSelector(true)}
              className="group relative bg-white/95 backdrop-blur-lg border border-gray-200 hover:border-pink-300 rounded-3xl p-20 text-center cursor-pointer shadow-xl"
              whileHover={{ y: -4, scale: 1.01 }}
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-7xl mb-6"
              >
                🎥
              </motion.div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Select Reference</h3>
              <p className="text-gray-600">Click to choose a video or image</p>
            </motion.div>
          )}

          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/95 backdrop-blur-lg border border-gray-200 rounded-3xl p-6 shadow-xl"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900">Selected Routine</h3>
              <div className="mb-4">
                <video src={selectedVideo.url} controls className="w-full rounded-2xl" style={{ maxHeight: '400px' }} />
              </div>
              {selectedVideo.data && (
                <div className="space-y-2 mb-6">
                  <h4 className="font-semibold text-gray-900">{selectedVideo.data.name}</h4>
                  <p className="text-gray-600 text-sm">{selectedVideo.data.description}</p>
                </div>
              )}
              <div className="flex gap-3">
                <motion.button
                  onClick={handleStartComparison}
                  disabled={isInitializing}
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-semibold disabled:opacity-40 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isInitializing ? 'Starting...' : 'Start'}
                </motion.button>
                <motion.button
                  onClick={() => setSelectedVideo(null)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Remove
                </motion.button>
              </div>
            </motion.div>
          )}

          {selectedImage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/95 backdrop-blur-lg border border-gray-200 rounded-3xl p-6 shadow-xl"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900">Selected Image</h3>
              <div className="mb-4">
                <img
                  src={selectedImage.url}
                  alt="reference"
                  className="w-full rounded-2xl object-contain"
                  style={{ maxHeight: '400px' }}
                />
              </div>
              <div className="flex gap-3">
                <motion.button
                  onClick={handleStartComparison}
                  disabled={isInitializing}
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-semibold disabled:opacity-40 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isInitializing ? 'Starting...' : 'Start'}
                </motion.button>
                <motion.button
                  onClick={() => setSelectedImage(null)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Remove
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {showSelector && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-4"
        >
          <ReferenceMediaSelector
            onImageUpload={handleImageUpload}
            onVideoUpload={handleVideoUpload}
            onCancel={handleCancel}
          />
        </motion.div>
      )}
    </div>
  );
};

export default LiveRoutineDemo;
