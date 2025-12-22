
import { PasswordOptions, PasswordStrength, GeneratorResult } from '../types';

/**
 * @file generator.ts
 * @description Contains the core business logic. 
 * Separating logic from UI is a key Clean Code principle (Modularity).
 */

const CHAR_SETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-='
};

/**
 * Calculates a security score based on entropy and variety.
 */
export const calculateStrength = (password: string, options: PasswordOptions): GeneratorResult['score'] => {
  if (!password) return 0;

  let score = 0;
  const length = password.length;
  
  // Base score from length
  score += length * 3;

  // Bonus for character variety
  if (options.useUppercase) score += 10;
  if (options.useLowercase) score += 10;
  if (options.useNumbers) score += 15;
  if (options.useSymbols) score += 20;

  // Deductions for poor variety relative to length
  const uniqueChars = new Set(password.split('')).size;
  score += uniqueChars * 2;

  return Math.min(100, score);
};

/**
 * Maps a numeric score to a PasswordStrength enum value.
 */
export const getStrengthLabel = (score: number): PasswordStrength => {
  if (score < 40) return PasswordStrength.WEAK;
  if (score < 65) return PasswordStrength.MEDIUM;
  if (score < 85) return PasswordStrength.STRONG;
  return PasswordStrength.EXTREME;
};

/**
 * The main generation engine.
 */
export const generatePassword = (options: PasswordOptions): GeneratorResult => {
  let charset = '';
  if (options.useUppercase) charset += CHAR_SETS.uppercase;
  if (options.useLowercase) charset += CHAR_SETS.lowercase;
  if (options.useNumbers) charset += CHAR_SETS.numbers;
  if (options.useSymbols) charset += CHAR_SETS.symbols;

  // Fallback if nothing selected
  if (charset === '') charset = CHAR_SETS.lowercase;

  let password = '';
  const crypto = window.crypto;
  const array = new Uint32Array(options.length);
  crypto.getRandomValues(array);

  for (let i = 0; i < options.length; i++) {
    password += charset.charAt(array[i] % charset.length);
  }

  const score = calculateStrength(password, options);
  const strength = getStrengthLabel(score);

  return {
    password,
    strength,
    score
  };
};
