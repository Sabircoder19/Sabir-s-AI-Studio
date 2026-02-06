
import React, { useRef, useCallback } from 'react';
import type { ImageState } from '../types';
import { CameraIcon, UploadIcon } from './Icons';

interface ImageUploaderProps {
  onImageSelect: (imageState: ImageState) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      onImageSelect({ file, url: imageUrl });
    }
  }, [onImageSelect]);

  const triggerFileUpload = () => fileInputRef.current?.click();
  const triggerCameraUpload = () => cameraInputRef.current?.click();

  return (
    <div className="w-full max-w-2xl mt-8">
      <div className="relative group bg-gray-900 border-2 border-dashed border-gray-800 rounded-[2.5rem] p-12 text-center flex flex-col items-center justify-center transition-all duration-500 hover:border-purple-500/50 hover:bg-gray-900/80 shadow-2xl overflow-hidden">
        {/* Background glow decoration */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-600/20 transition-all"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl pointer-events-none group-hover:bg-pink-600/20 transition-all"></div>

        <div className="mb-8 p-6 bg-gray-800 rounded-3xl shadow-inner ring-1 ring-white/5">
            <UploadIcon className="w-12 h-12 text-purple-500" />
        </div>
        
        <h2 className="text-3xl font-bold mb-3 text-white">Create Something New</h2>
        <p className="text-gray-500 max-w-sm mb-10 leading-relaxed">
          Upload a portrait, landscape, or snapshot and let AI reimagine it.
        </p>
        
        <div className="flex flex-col w-full gap-4 max-w-xs">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            ref={fileInputRef}
          />
           <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="hidden"
            ref={cameraInputRef}
          />

          <button 
            onClick={triggerFileUpload}
            className="group/btn flex items-center justify-center gap-3 w-full px-8 py-5 bg-white text-black font-bold rounded-2xl shadow-xl hover:bg-gray-100 active:scale-95 transition-all"
          >
            <UploadIcon className="w-5 h-5" />
            Pick from Library
          </button>

          <button 
            onClick={triggerCameraUpload}
            className="flex items-center justify-center gap-3 w-full px-8 py-5 bg-gray-800 border border-gray-700 text-white font-bold rounded-2xl hover:bg-gray-750 active:scale-95 transition-all"
          >
            <CameraIcon className="w-5 h-5" />
            Take a Photo
          </button>
        </div>
        
        <div className="mt-8 flex items-center gap-2 text-xs text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            Secure, on-device selection
        </div>
      </div>
    </div>
  );
};
