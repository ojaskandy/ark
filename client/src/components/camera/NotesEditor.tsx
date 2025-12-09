import { useState, useEffect } from 'react';

interface NotesEditorProps {
  initialNotes?: string;
  onChange: (notes: string) => void;
  onStartRoutine?: () => void;
  onStopRoutine?: () => void;
  onStartTest?: () => void;
  onStopTest?: () => void;
  onShowResults?: () => void;
  isTracking?: boolean;
  hasReferenceMedia?: boolean;
  hasCompletedTest?: boolean;
  onRecord?: () => void;
  isRecording?: boolean;
  onToggleScreenRecording?: () => void;
  isScreenRecording?: boolean;
  isTestRunning?: boolean;
  showUserSkeleton?: boolean;
  showReferenceSkeleton?: boolean;
  onToggleUserSkeleton?: (value: boolean) => void;
  onToggleReferenceSkeleton?: (value: boolean) => void;
}

export default function NotesEditor({
  initialNotes = '',
  onChange,
  onStartRoutine,
  onStopRoutine,
  onStartTest,
  onStopTest,
  onShowResults,
  isTracking = false,
  hasReferenceMedia = false,
  hasCompletedTest = false,
  onRecord,
  isRecording = false,
  onToggleScreenRecording,
  isScreenRecording = false,
  isTestRunning = false,
  showUserSkeleton = true,
  showReferenceSkeleton = true,
  onToggleUserSkeleton,
  onToggleReferenceSkeleton
}: NotesEditorProps) {
  const [notes, setNotes] = useState(initialNotes);

  useEffect(() => {
    onChange(notes);
  }, [notes, onChange]);

  const applyFormat = (format: 'bold' | 'italic' | 'heading' | 'subheading') => {
    const textarea = document.getElementById('routineNotesTextarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = notes.substring(start, end);

    let newText = notes;
    switch (format) {
      case 'bold':
        newText = notes.substring(0, start) + `**${selectedText}**` + notes.substring(end);
        break;
      case 'italic':
        newText = notes.substring(0, start) + `*${selectedText}*` + notes.substring(end);
        break;
      case 'heading':
        newText = notes.substring(0, start) + `# ${selectedText}` + notes.substring(end);
        break;
      case 'subheading':
        newText = notes.substring(0, start) + `### ${selectedText}` + notes.substring(end);
        break;
    }

    setNotes(newText);
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl border-t border-gray-200/50 py-3 px-4 mt-0 w-full">
      <div className="flex items-center justify-between py-1">
        <div className="flex items-center">
          <span className="text-pink-500 mr-2">📝</span>
          <h3 className="text-gray-800 font-medium">Routine Notes</h3>
        </div>
        <div className="flex gap-1">
          <button onClick={() => applyFormat('bold')} className="bg-gray-100 hover:bg-gray-200 text-gray-600 rounded p-1">
            <span className="font-bold text-xs">B</span>
          </button>
          <button onClick={() => applyFormat('italic')} className="bg-gray-100 hover:bg-gray-200 text-gray-600 rounded p-1">
            <span className="italic text-xs">I</span>
          </button>
          <button onClick={() => applyFormat('heading')} className="bg-gray-100 hover:bg-gray-200 text-gray-600 rounded p-1">
            <span className="text-xs">H1</span>
          </button>
          <button onClick={() => applyFormat('subheading')} className="bg-gray-100 hover:bg-gray-200 text-gray-600 rounded p-1">
            <span className="text-xs">H2</span>
          </button>
        </div>
      </div>
      <textarea
        id="routineNotesTextarea"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full bg-white border border-gray-200 rounded-xl p-3 text-gray-800 min-h-[70px] focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
        placeholder="Enter your notes about this routine here..."
      />

      {/* Skeleton Overlay Toggles */}
      {hasReferenceMedia && (
        <div className="flex flex-wrap gap-4 mt-3 justify-center">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showUserSkeleton}
              onChange={(e) => onToggleUserSkeleton?.(e.target.checked)}
              className="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-pink-400"
            />
            <span className="text-sm text-gray-600">My Skeleton</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showReferenceSkeleton}
              onChange={(e) => onToggleReferenceSkeleton?.(e.target.checked)}
              className="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-pink-400"
            />
            <span className="text-sm text-gray-600">Reference Skeleton</span>
          </label>
        </div>
      )}

      {/* Action Buttons - SIMPLIFIED */}
      <div className="flex justify-center mt-3 mb-1">
        {isTestRunning ? (
          <button
            onClick={onStopTest}
            className="px-8 py-4 rounded-full font-bold shadow-xl flex items-center justify-center transition-all text-lg bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600"
          >
            <span className="mr-2">⏹️</span>
            STOP
          </button>
        ) : (
          <button
            onClick={onStartTest}
            className={`px-8 py-4 rounded-full font-bold shadow-xl flex items-center justify-center transition-all text-lg ${
              !hasReferenceMedia
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-pink-500 to-orange-500 text-white hover:from-pink-600 hover:to-orange-600 shadow-lg shadow-pink-300/50'
            }`}
            disabled={!hasReferenceMedia}
          >
            <span className="mr-2">▶️</span>
            START
          </button>
        )}
      </div>
    </div>
  );
}
