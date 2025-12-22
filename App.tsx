
import React, { useState, useEffect, useCallback } from 'react';
import { PasswordOptions, GeneratorResult } from './types';
import { generatePassword } from './core/generator';
import PasswordDisplay from './components/PasswordDisplay';
import ControlPanel from './components/ControlPanel';
import StrengthMeter from './components/StrengthMeter';

/**
 * @file App.tsx
 * @description Root component that manages global state and triggers the core generator.
 */

const App: React.FC = () => {
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    useUppercase: true,
    useLowercase: true,
    useNumbers: true,
    useSymbols: false,
  });

  const [result, setResult] = useState<GeneratorResult>({
    password: '',
    strength: generatePassword({ length: 16, useUppercase: true, useLowercase: true, useNumbers: true, useSymbols: false }).strength,
    score: 0
  });

  // Memoized update function to prevent infinite loops and improve performance
  const refreshPassword = useCallback(() => {
    const newResult = generatePassword(options);
    setResult(newResult);
  }, [options]);

  // Initial generation and update on option change
  useEffect(() => {
    refreshPassword();
  }, [refreshPassword]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 selection:bg-emerald-500 selection:text-zinc-900">
      <div className="w-full max-w-2xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        
        {/* Header Section */}
        <header className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic">
            Cyber<span className="text-emerald-500">Gen</span>
          </h1>
          <p className="text-zinc-500 font-medium tracking-widest text-[10px] uppercase">
            Architecting Cryptographic Fortresses
          </p>
        </header>

        {/* Main Interface */}
        <main className="space-y-4">
          <PasswordDisplay 
            password={result.password} 
            onRefresh={refreshPassword} 
          />
          
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl cyber-border relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none"></div>
            
            <ControlPanel 
              options={options} 
              onChange={setOptions} 
            />
            
            <StrengthMeter 
              score={result.score} 
              label={result.strength} 
            />
            
            <button
              onClick={refreshPassword}
              className="w-full mt-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-zinc-900 font-black uppercase tracking-[0.2em] rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] active:scale-[0.98] flex items-center justify-center gap-3"
            >
              <span>Initialize Protocol</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </main>

        {/* Footer info */}
        <footer className="text-center">
          <p className="text-zinc-700 text-[10px] font-mono uppercase tracking-widest leading-relaxed">
            Secure client-side generation using Window.Crypto API<br/>
            Zero data transmission • Pure entropy • Modern standards
          </p>
        </footer>

      </div>
    </div>
  );
};

export default App;
