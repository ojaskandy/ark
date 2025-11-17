import React, { useState } from 'react';
import { type DanceRoutine, getRoutinesByStyle } from '@/data/danceRoutines';

interface PreloadedVideoSelectorProps {
  onVideoSelect: (video: HTMLVideoElement | null, url: string, videoData: DanceRoutine) => void;
  onCancel: () => void;
}

const vibeColor: Record<string, string> = {
  'slow flow': 'text-sky-500',
  groove: 'text-emerald-500',
  precision: 'text-amber-500',
  performance: 'text-rose-500'
};

export default function PreloadedVideoSelector({ onVideoSelect, onCancel }: PreloadedVideoSelectorProps) {
  const routinesByStyle = getRoutinesByStyle();
  const styles = Object.keys(routinesByStyle);
  const [selectedStyle, setSelectedStyle] = useState(styles[0] || 'foundations');

  const handleVideoLoad = (routine: DanceRoutine) => {
    const video = document.createElement('video');
    video.src = routine.videoUrl;
    video.crossOrigin = 'anonymous';
    video.muted = true;
    video.playsInline = true;

    video.onloadedmetadata = () => {
      onVideoSelect(video, routine.videoUrl, routine);
    };

    video.onerror = () => {
      console.error('Failed to load video:', routine.videoUrl);
      onVideoSelect(null, routine.videoUrl, routine);
    };
  };

  return (
    <div className="bg-white rounded-3xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto border border-rose-100 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-rose-300 mb-1">studio shelf</p>
          <h2 className="text-2xl font-semibold text-rose-900">choose a routine</h2>
        </div>
        <button
          onClick={onCancel}
          className="text-rose-300 hover:text-rose-500 text-2xl"
        >
          ✕
        </button>
      </div>

      <div className="flex space-x-2 mb-6 overflow-x-auto">
        {styles.map((style) => (
          <button
            key={style}
            onClick={() => setSelectedStyle(style)}
            className={`px-4 py-2 rounded-full capitalize whitespace-nowrap border transition-colors ${
              selectedStyle === style
                ? 'bg-rose-600 text-white border-rose-600'
                : 'bg-rose-50 text-rose-500 border-rose-100 hover:border-rose-300'
            }`}
          >
            {style.replace('-', ' ')}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {routinesByStyle[selectedStyle]?.map((routine) => (
          <div
            key={routine.id}
            className="border border-rose-100 rounded-2xl overflow-hidden hover:border-rose-300 transition-colors cursor-pointer"
            onClick={() => handleVideoLoad(routine)}
          >
            <div className="aspect-video bg-rose-50 flex items-center justify-center">
              <img
                src={routine.thumbnailUrl}
                alt={routine.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = '<div class="flex items-center justify-center h-full text-rose-300 text-4xl">🎥</div>';
                }}
              />
            </div>

            <div className="p-4 space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-rose-300">
                {routine.style}
              </p>
              <h3 className="text-rose-900 font-semibold line-clamp-2">{routine.name}</h3>
              <p className="text-rose-600 text-sm line-clamp-2">{routine.description}</p>
              <div className="flex justify-between items-center text-sm">
                <span className={`font-medium ${vibeColor[routine.energy] ?? 'text-rose-400'}`}>
                  {routine.energy}
                </span>
                <span className="text-rose-400">{routine.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {routinesByStyle[selectedStyle]?.length === 0 && (
        <div className="text-center py-12">
          <div className="text-rose-400 text-lg mb-2">nothing here yet</div>
          <div className="text-rose-300 text-sm">we will add more routines soon.</div>
        </div>
      )}

      <div className="flex justify-center mt-6">
        <button
          onClick={onCancel}
          className="px-6 py-2 border border-rose-200 text-rose-900 rounded-full hover:bg-rose-50 transition-colors font-medium"
        >
          cancel
        </button>
      </div>
    </div>
  );
}
