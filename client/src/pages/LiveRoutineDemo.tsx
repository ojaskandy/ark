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
      <div className="min-h-screen bg-gray-950">
        <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur px-6 py-4 flex items-center justify-between">
          <button
            onClick={handleBackToSelect}
            className="flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> back
          </button>
          <div className="text-white font-medium">Live Routine</div>
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
    <div className="min-h-screen bg-gray-950">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-gray-950 to-orange-500/10" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 border-b border-gray-800 bg-gray-900/30 backdrop-blur px-6 py-4 flex items-center"
      >
        <button
          onClick={() => navigate('/app')}
          className="flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> back
        </button>
      </motion.div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white">Live Routine</h1>
            <p className="text-xl text-gray-400">
              Upload a reference or choose from our library
            </p>
          </motion.header>

          {!selectedVideo && !selectedImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onClick={() => setShowSelector(true)}
              className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl border border-gray-800 hover:border-pink-500/50 rounded-3xl p-20 text-center cursor-pointer overflow-hidden"
              whileHover={{ y: -4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 to-orange-500/0 group-hover:from-pink-500/10 group-hover:to-orange-500/10 transition-all duration-500" />
              <div className="relative z-10">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-7xl mb-6"
                >
                  🎥
                </motion.div>
                <h3 className="text-2xl font-semibold mb-3 text-white">Select Reference</h3>
                <p className="text-gray-400">Click to choose a video or image</p>
              </div>
            </motion.div>
          )}

          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-6"
            >
              <h3 className="text-xl font-semibold mb-4 text-white">Selected Routine</h3>
              <div className="mb-4">
                <video src={selectedVideo.url} controls className="w-full rounded-2xl" style={{ maxHeight: '400px' }} />
              </div>
              {selectedVideo.data && (
                <div className="space-y-2 mb-6">
                  <h4 className="font-semibold text-white">{selectedVideo.data.name}</h4>
                  <p className="text-gray-400 text-sm">{selectedVideo.data.description}</p>
                </div>
              )}
              <div className="flex gap-3">
                <motion.button
                  onClick={handleStartComparison}
                  disabled={isInitializing}
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-400 text-white rounded-full font-semibold disabled:opacity-40"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isInitializing ? 'Starting...' : 'Start'}
                </motion.button>
                <motion.button
                  onClick={() => setSelectedVideo(null)}
                  className="px-6 py-3 border border-gray-700 text-gray-300 rounded-full font-semibold hover:bg-gray-800"
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
              className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-6"
            >
              <h3 className="text-xl font-semibold mb-4 text-white">Selected Image</h3>
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
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-400 text-white rounded-full font-semibold disabled:opacity-40"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isInitializing ? 'Starting...' : 'Start'}
                </motion.button>
                <motion.button
                  onClick={() => setSelectedImage(null)}
                  className="px-6 py-3 border border-gray-700 text-gray-300 rounded-full font-semibold hover:bg-gray-800"
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
          className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
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
