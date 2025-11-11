import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLocation } from 'wouter';

const LiveRoutineDemo: React.FC = () => {
  const [, navigate] = useLocation();

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

          {/* Upload Area */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors cursor-pointer">
            <div className="text-6xl mb-4">📹</div>
            <h3 className="text-xl font-medium mb-2 text-gray-900">upload reference media</h3>
            <p className="text-gray-600">
              drop a video or image here, or click to browse
            </p>
          </div>

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
    </div>
  );
};

export default LiveRoutineDemo;
