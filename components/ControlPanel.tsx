
import React from 'react';
import { PasswordOptions } from '../types';

interface ControlPanelProps {
  options: PasswordOptions;
  onChange: (newOptions: PasswordOptions) => void;
}

/**
 * The configuration interface. Uses Tailwind's grid and checkbox styling.
 */
const ControlPanel: React.FC<ControlPanelProps> = ({ options, onChange }) => {
  
  const handleToggle = (key: keyof PasswordOptions) => {
    onChange({ ...options, [key]: !options[key] });
  };

  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...options, length: parseInt(e.target.value) });
  };

  const Checkbox = ({ label, checked, onToggle }: { label: string, checked: boolean, onToggle: () => void }) => (
    <label className="flex items-center justify-between p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 cursor-pointer transition-all hover:bg-zinc-800/50 group">
      <span className="text-zinc-300 font-medium group-hover:text-emerald-400 transition-colors">{label}</span>
      <div className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only" checked={checked} onChange={onToggle} />
        <div className={`w-11 h-6 rounded-full transition-colors ${checked ? 'bg-emerald-500' : 'bg-zinc-700'}`}></div>
        <div className={`absolute left-1 top-1 bg-zinc-100 w-4 h-4 rounded-full transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`}></div>
      </div>
    </label>
  );

  return (
    <div className="space-y-6 bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800/60 backdrop-blur-sm">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-zinc-300 font-bold uppercase text-xs tracking-wider">Character Length</span>
          <span className="mono text-2xl font-bold text-emerald-400 cyber-glow">{options.length}</span>
        </div>
        <input 
          type="range" 
          min="8" 
          max="32" 
          value={options.length}
          onChange={handleLengthChange}
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Checkbox 
          label="Uppercase" 
          checked={options.useUppercase} 
          onToggle={() => handleToggle('useUppercase')} 
        />
        <Checkbox 
          label="Lowercase" 
          checked={options.useLowercase} 
          onToggle={() => handleToggle('useLowercase')} 
        />
        <Checkbox 
          label="Numbers" 
          checked={options.useNumbers} 
          onToggle={() => handleToggle('useNumbers')} 
        />
        <Checkbox 
          label="Symbols" 
          checked={options.useSymbols} 
          onToggle={() => handleToggle('useSymbols')} 
        />
      </div>
    </div>
  );
};

export default ControlPanel;
