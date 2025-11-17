import { useState, useRef, ChangeEvent, DragEvent } from 'react';
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

  // File types we accept
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
    
    // Check if file is an accepted image
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
    } 
    // Check if file is an accepted video
    else if (acceptedVideoTypes.includes(fileType)) {
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
    } 
    // File type not accepted
    else {
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
    <div className="p-6 bg-white rounded-3xl max-w-md w-full border border-rose-100 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-rose-300 mb-1">upload</p>
          <h3 className="text-xl font-semibold text-rose-900">
            upload media
          </h3>
        </div>
        <button
          onClick={onCancel}
          className="text-rose-300 hover:text-rose-500"
        >
          ✕
        </button>
      </div>

      <div
        className={`upload-zone p-8 mb-4 flex flex-col items-center justify-center bg-rose-50 border-2 border-dashed border-rose-200 rounded-2xl ${isDragging ? 'bg-gray-100 border-rose-300' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-4xl mb-3">
          {loading ? "⏳" : "📤"}
        </div>

        <p className="text-center text-rose-900 mb-3 font-medium">
          {loading
            ? "processing your file..."
            : "drag & drop your image or video here"}
        </p>

        <p className="text-xs text-rose-400 mb-4 text-center">
          supported: jpg, png, webp, mp4, webm
        </p>

        {!loading && (
          <button
            onClick={handleBrowseClick}
            className="px-6 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl font-medium"
          >
            browse files
          </button>
        )}

        {loading && <div className="loader mt-2"></div>}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".jpg,.jpeg,.png,.webp,.gif,.mp4,.webm,.mov"
          className="hidden"
        />
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4 bg-rose-50 border border-rose-200 text-rose-800">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-rose-200 text-rose-900 rounded-2xl hover:border-rose-300 font-medium"
        >
          cancel
        </button>

        <button
          className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl font-medium disabled:opacity-50"
          onClick={handleBrowseClick}
          disabled={loading}
        >
          {loading ? "processing..." : "select file"}
        </button>
      </div>
    </div>
  );
}