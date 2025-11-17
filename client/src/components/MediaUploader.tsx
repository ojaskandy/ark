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
        setError('failed to load image. please try another file.');
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
        setError('failed to load video. please try another file.');
        URL.revokeObjectURL(fileURL);
      };
      video.src = fileURL;
      video.load();
    } else {
      setLoading(false);
      setError('please upload an image (jpg, png, webp) or video (mp4, webm).');
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
      className="bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-6 max-w-md w-full shadow-2xl shadow-pink-200/30"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">upload</p>
          <h3 className="text-xl font-medium text-gray-800">upload media</h3>
        </div>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>

      <div
        className={`upload-zone p-10 mb-4 flex flex-col items-center justify-center bg-gray-50 border-2 border-dashed rounded-2xl transition-all ${
          isDragging ? 'border-pink-300 bg-pink-50' : 'border-gray-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-5xl mb-4">
          {loading ? "⏳" : "📤"}
        </div>

        <p className="text-center text-gray-800 mb-3 font-medium">
          {loading ? "processing..." : "drag & drop your file here"}
        </p>

        <p className="text-xs text-gray-500 mb-4 text-center">
          supports: jpg, png, webp, mp4, webm
        </p>

        {!loading && (
          <motion.button
            onClick={handleBrowseClick}
            className="px-6 py-2 bg-gradient-to-r from-pink-300 to-orange-300 text-white rounded-full font-medium shadow-md shadow-pink-200/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            browse files
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
        <Alert className="mb-4 bg-orange-50 border border-orange-200 text-orange-700">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors"
        >
          cancel
        </button>

        <button
          className="px-4 py-2 bg-gradient-to-r from-pink-300 to-orange-300 text-white rounded-xl font-medium disabled:opacity-40 shadow-md shadow-pink-200/50"
          onClick={handleBrowseClick}
          disabled={loading}
        >
          {loading ? "processing..." : "select file"}
        </button>
      </div>
    </motion.div>
  );
}
