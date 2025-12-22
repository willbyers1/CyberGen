
/**
 * @file types.ts
 * @description Centralized type definitions ensuring strict type safety across the generator logic and UI.
 */

export enum PasswordStrength {
  WEAK = 'Weak',
  MEDIUM = 'Medium',
  STRONG = 'Strong',
  EXTREME = 'Extreme'
}

export interface PasswordOptions {
  length: number;
  useUppercase: boolean;
  useLowercase: boolean;
  useNumbers: boolean;
  useSymbols: boolean;
}

export interface GeneratorResult {
  password: string;
  strength: PasswordStrength;
  score: number; // 0-100 for visual progress
}
