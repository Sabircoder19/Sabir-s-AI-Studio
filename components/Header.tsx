
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="w-full max-w-5xl mx-auto text-center py-12 px-4">
      <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-purple-500/10 border border-purple-500/20">
        <span className="text-xs font-bold tracking-widest text-purple-400 uppercase">Studio v2.0</span>
      </div>
      <h1 className="text-5xl md:text-7xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
        AI Photo Studio
      </h1>
      <p className="mt-6 text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
        Next-generation image manipulation. Edit, enhance, and transform your photos using natural language prompts.
      </p>
    </header>
  );
};
