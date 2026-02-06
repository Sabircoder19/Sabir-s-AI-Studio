
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { EditPanel } from './components/EditPanel';
import { ImageViewer } from './components/ImageViewer';
import { Loader } from './components/Loader';
import { editImageWithGemini } from './services/geminiService';
import type { ImageState } from './types';

const PRESET_PROMPTS = [
  { label: '🎨 Cartoon', prompt: 'Transform this image into a colorful 3D Pixar-style cartoon.' },
  { label: '🌆 Cyberpunk', prompt: 'Convert this photo to a cyberpunk aesthetic with neon lights and dark rainy atmosphere.' },
  { label: '🖌️ Oil Painting', prompt: 'Turn this photo into a classic Impressionist oil painting with visible brushstrokes.' },
  { label: '☀️ Sunny Day', prompt: 'Make it look like a bright sunny day with warm lighting and blue skies.' },
];

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<ImageState | null>(null);
  const [editHistory, setEditHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const currentEditedImage = editHistory[historyIndex] ?? null;
  const canUndo = historyIndex >= 0;
  const canRedo = historyIndex < editHistory.length - 1;

  const handleImageSelect = useCallback((imageState: ImageState) => {
    setOriginalImage(imageState);
    setEditHistory([]);
    setHistoryIndex(-1);
    setError(null);
    setPrompt('');
  }, []);

  const handleEditRequest = useCallback(async (customPrompt?: string) => {
    const finalPrompt = customPrompt || prompt;
    if (!originalImage || !finalPrompt) {
      setError('Please select an image and provide an editing prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const resultImageUrl = await editImageWithGemini(originalImage.file, finalPrompt);
      const newHistory = editHistory.slice(0, historyIndex + 1);
      const updatedHistory = [...newHistory, resultImageUrl];
      setEditHistory(updatedHistory);
      setHistoryIndex(updatedHistory.length - 1);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to edit image: ${errorMessage}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, prompt, editHistory, historyIndex]);

  const handleReset = useCallback(() => {
    setOriginalImage(null);
    setEditHistory([]);
    setHistoryIndex(-1);
    setPrompt('');
    setError(null);
    setIsLoading(false);
  }, []);

  const handleUndo = useCallback(() => {
    if (canUndo) {
      setHistoryIndex(historyIndex - 1);
    }
  }, [canUndo, historyIndex]);

  const handleRedo = useCallback(() => {
    if (canRedo) {
      setHistoryIndex(historyIndex + 1);
    }
  }, [canRedo, historyIndex]);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center selection:bg-purple-500 selection:text-white">
      <Header />
      <main className="w-full max-w-5xl mx-auto flex-grow flex flex-col items-center px-4 pb-12">
        {isLoading && <Loader />}
        
        {error && (
          <div className="bg-red-900/40 border border-red-500/50 text-red-100 px-6 py-4 rounded-2xl relative my-6 w-full max-w-2xl text-center shadow-2xl backdrop-blur-md" role="alert">
            <div className="flex items-center justify-center gap-2 mb-1">
                <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                <strong className="font-bold">Error</strong>
            </div>
            <span className="block text-sm opacity-90">{error}</span>
            <button 
                onClick={() => setError(null)}
                className="mt-3 text-xs underline opacity-60 hover:opacity-100"
            >
                Dismiss
            </button>
          </div>
        )}
        
        {!originalImage && !isLoading && <ImageUploader onImageSelect={handleImageSelect} />}
        
        {originalImage && !isLoading && (
          <div className="w-full flex flex-col lg:flex-row gap-8 items-stretch">
            <div className="w-full lg:w-3/5">
              <ImageViewer originalImage={originalImage.url} editedImage={currentEditedImage} />
            </div>
            <div className="w-full lg:w-2/5 flex flex-col gap-6">
              <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 shadow-xl">
                 <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">Quick Styles</h3>
                 <div className="grid grid-cols-2 gap-3">
                    {PRESET_PROMPTS.map((preset) => (
                        <button
                            key={preset.label}
                            onClick={() => {
                                setPrompt(preset.prompt);
                                handleEditRequest(preset.prompt);
                            }}
                            className="bg-gray-800 hover:bg-gray-700 border border-gray-700 px-3 py-3 rounded-xl text-sm font-medium transition-all hover:scale-[1.02] active:scale-95"
                        >
                            {preset.label}
                        </button>
                    ))}
                 </div>
              </div>

              <EditPanel 
                prompt={prompt}
                onPromptChange={setPrompt}
                onEditRequest={() => handleEditRequest()}
                onReset={handleReset}
                isEditing={editHistory.length > 0}
                isLoading={isLoading}
                onUndo={handleUndo}
                onRedo={handleRedo}
                canUndo={canUndo}
                canRedo={canRedo}
              />
            </div>
          </div>
        )}
      </main>
      <footer className="w-full text-center p-6 border-t border-gray-900 text-gray-600 text-xs">
        <p>© 2024 AI Photo Studio • Powered by Gemini 2.5 Flash Image</p>
      </footer>
    </div>
  );
};

export default App;
