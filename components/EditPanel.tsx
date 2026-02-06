
import React from 'react';
import { SparklesIcon, RefreshIcon, UndoIcon, RedoIcon } from './Icons';

interface EditPanelProps {
  prompt: string;
  onPromptChange: (prompt: string) => void;
  onEditRequest: () => void;
  onReset: () => void;
  isEditing: boolean;
  isLoading: boolean;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const EditPanel: React.FC<EditPanelProps> = ({ 
  prompt, onPromptChange, onEditRequest, onReset, isEditing, isLoading,
  onUndo, onRedo, canUndo, canRedo
}) => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 w-full space-y-6 shadow-xl h-full flex flex-col justify-between">
      <div className="space-y-4">
        <div>
          <label htmlFor="prompt" className="flex items-center gap-2 text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
            <SparklesIcon className="w-4 h-4 text-purple-500" />
            Custom Edit
          </label>
          <textarea
            id="prompt"
            rows={4}
            className="w-full bg-gray-800 border border-gray-700 rounded-2xl p-4 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none placeholder-gray-600 resize-none shadow-inner"
            placeholder="Describe exactly what you want to change..."
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onUndo}
            disabled={!canUndo || isLoading}
            aria-label="Undo"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 border border-gray-700 text-gray-300 font-semibold rounded-2xl hover:bg-gray-750 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <UndoIcon className="w-4 h-4" />
            Undo
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo || isLoading}
            aria-label="Redo"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 border border-gray-700 text-gray-300 font-semibold rounded-2xl hover:bg-gray-750 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <RedoIcon className="w-4 h-4" />
            Redo
          </button>
        </div>
      </div>

      <div className="flex flex-col space-y-3">
        <button
          onClick={onEditRequest}
          disabled={!prompt || isLoading}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-lg shadow-purple-900/20 hover:from-purple-500 hover:to-pink-500 active:scale-95 transition-all disabled:from-gray-700 disabled:to-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed"
        >
          <SparklesIcon className="w-5 h-5" />
          {isLoading ? 'Processing...' : (isEditing ? 'Re-generate' : 'Apply AI Edit')}
        </button>
        <button
          onClick={onReset}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 text-gray-400 font-medium hover:text-white transition-colors disabled:opacity-30"
          disabled={isLoading}
        >
          <RefreshIcon className="w-4 h-4" />
          Start New Project
        </button>
      </div>
    </div>
  );
};
