
import React, { useState } from 'react';

interface PasswordDisplayProps {
  password: string;
  onRefresh: () => void;
}

/**
 * Handles the visual output and clipboard interaction.
 */
const PasswordDisplay: React.FC<PasswordDisplayProps> = ({ password, onRefresh }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col gap-4 relative overflow-hidden cyber-border">
      <div className="flex justify-between items-center">
        <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Generated Output</span>
        <button 
          onClick={onRefresh}
          className="text-emerald-500 hover:text-emerald-400 transition-colors"
          title="Regenerate"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="mono text-2xl md:text-3xl text-emerald-400 break-all select-all cyber-glow">
          {password || '••••••••'}
        </div>
        
        <button
          onClick={handleCopy}
          disabled={!password}
          className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all duration-300 ${
            copied 
              ? 'bg-emerald-500 text-zinc-900' 
              : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 active:scale-95'
          }`}
        >
          {copied ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>COPIED</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
              <span className="hidden sm:inline">COPY</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordDisplay;
