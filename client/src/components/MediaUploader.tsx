import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { motion } from 'framer-motion';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface MediaUploaderProps {
  onImageUpload: (image: HTMLImageElement, url: string) => void;
  onVideoUpload: (video: HTMLVideoElement, url: string) => void;
  onCancel: () => void;
}

export default function MediaUploader({ onImageUpload, onVideoUpload, onCancel }: MediaUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  const acceptedVideoTypes = ['video/mp4', 'video/webm', 'video/quicktime'];

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    setError(null);
    setLoading(true);
    
    const fileType = file.type;
    const fileURL = URL.createObjectURL(file);
    
    if (acceptedImageTypes.includes(fileType)) {
      const img = new Image();
      img.onload = () => {
        setLoading(false);
        onImageUpload(img, fileURL);
      };
      img.onerror = () => {
        setLoading(false);
        setError('Failed to load image. Please try another file.');
        URL.revokeObjectURL(fileURL);
      };
      img.src = fileURL;
    } else if (acceptedVideoTypes.includes(fileType)) {
      const video = document.createElement('video');
      video.onloadeddata = () => {
        setLoading(false);
        onVideoUpload(video, fileURL);
      };
      video.onerror = () => {
        setLoading(false);
        setError('Failed to load video. Please try another file.');
        URL.revokeObjectURL(fileURL);
      };
      video.src = fileURL;
      video.load();
    } else {
      setLoading(false);
      setError('Please upload an image (JPG, PNG, WEBP) or video (MP4, WEBM).');
    }
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-gray-900 border border-gray-800 rounded-3xl p-6 max-w-md w-full shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Upload</p>
          <h3 className="text-xl font-semibold text-white">Upload Media</h3>
        </div>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-300"
        >
          ✕
        </button>
      </div>

      <div
        className={`upload-zone p-10 mb-4 flex flex-col items-center justify-center bg-gray-800/50 border-2 border-dashed rounded-2xl transition-all ${
          isDragging ? 'border-pink-500 bg-pink-500/10' : 'border-gray-700'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-5xl mb-4">
          {loading ? "⏳" : "📤"}
        </div>

        <p className="text-center text-white mb-3 font-medium">
          {loading ? "Processing..." : "Drag & drop your file here"}
        </p>

        <p className="text-xs text-gray-500 mb-4 text-center">
          Supports: JPG, PNG, WEBP, MP4, WEBM
        </p>

        {!loading && (
          <motion.button
            onClick={handleBrowseClick}
            className="px-6 py-2 bg-gradient-to-r from-pink-500 to-orange-400 text-white rounded-full font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Browse Files
          </motion.button>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".jpg,.jpeg,.png,.webp,.gif,.mp4,.webm,.mov"
          className="hidden"
        />
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4 bg-orange-500/10 border border-orange-500/30 text-orange-400">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-gray-700 text-gray-400 rounded-xl hover:bg-gray-800 hover:text-gray-300 font-medium transition-colors"
        >
          Cancel
        </button>

        <button
          className="px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-400 text-white rounded-xl font-medium disabled:opacity-40"
          onClick={handleBrowseClick}
          disabled={loading}
        >
          {loading ? "Processing..." : "Select File"}
        </button>
      </div>
    </motion.div>
  );
}
