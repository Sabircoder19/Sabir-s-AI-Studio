
import React, { useState } from 'react';

interface ImageViewerProps {
  originalImage: string | null;
  editedImage: string | null;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({ originalImage, editedImage }) => {
  const [showOriginal, setShowOriginal] = useState(false);

  return (
    <div className="w-full flex flex-col gap-4 h-full">
      <div className="relative group w-full bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden flex flex-col flex-grow shadow-2xl">
        <div className="absolute top-4 left-4 z-10 flex gap-2">
            <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-white border border-white/10">
                {showOriginal && editedImage ? 'Before' : (editedImage ? 'After' : 'Original')}
            </span>
        </div>

        {editedImage && (
            <button 
                onMouseDown={() => setShowOriginal(true)}
                onMouseUp={() => setShowOriginal(false)}
                onMouseLeave={() => setShowOriginal(false)}
                onTouchStart={() => setShowOriginal(true)}
                onTouchEnd={() => setShowOriginal(false)}
                className="absolute top-4 right-4 z-20 px-4 py-2 bg-purple-600/90 hover:bg-purple-500 backdrop-blur-md text-white text-xs font-bold rounded-full shadow-lg transition-all active:scale-90 select-none"
            >
                Hold to Compare
            </button>
        )}

        <div className="flex-grow flex items-center justify-center bg-black min-h-[300px] md:min-h-[500px]">
          {originalImage && (
            <img
              src={showOriginal || !editedImage ? originalImage : editedImage}
              alt="Photo"
              className="max-w-full max-h-[70vh] object-contain transition-opacity duration-200"
            />
          )}
          {!originalImage && !editedImage && (
            <div className="text-gray-600 italic">No image selected</div>
          )}
        </div>
      </div>

      {editedImage && (
        <div className="flex gap-3">
          <a
            href={editedImage}
            download="ai-edited-photo.png"
            className="flex-grow text-center px-6 py-4 bg-white text-black font-bold rounded-2xl shadow-xl hover:bg-gray-100 active:scale-95 transition-all"
          >
            Save to Device
          </a>
        </div>
      )}
    </div>
  );
};
