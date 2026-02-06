
import React from 'react';
import { SparklesIcon } from './Icons';

export const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
      <div className="relative flex items-center justify-center">
        <div className="absolute h-24 w-24 rounded-full border-t-4 border-b-4 border-purple-500 animate-spin"></div>
        <SparklesIcon className="h-12 w-12 text-pink-500" />
      </div>
      <p className="mt-6 text-xl font-semibold text-gray-200">AI is working its magic...</p>
      <p className="text-gray-400">This may take a moment.</p>
    </div>
  );
};
