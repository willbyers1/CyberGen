
import React from 'react';
import { PasswordStrength } from '../types';

interface StrengthMeterProps {
  score: number;
  label: PasswordStrength;
}

/**
 * A visually dynamic bar that provides feedback on the password quality.
 */
const StrengthMeter: React.FC<StrengthMeterProps> = ({ score, label }) => {
  const getProgressColor = () => {
    if (score < 40) return 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]';
    if (score < 65) return 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]';
    if (score < 85) return 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]';
    return 'bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.7)]';
  };

  const getTextColor = () => {
    if (score < 40) return 'text-rose-400';
    if (score < 65) return 'text-amber-400';
    if (score < 85) return 'text-emerald-400';
    return 'text-cyan-400';
  };

  return (
    <div className="space-y-3 mt-4">
      <div className="flex justify-between items-end">
        <span className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">Security Analysis</span>
        <span className={`text-xs font-bold uppercase tracking-widest ${getTextColor()} cyber-glow`}>
          {label}
        </span>
      </div>
      
      <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-700 ease-out ${getProgressColor()}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
};

export default StrengthMeter;
