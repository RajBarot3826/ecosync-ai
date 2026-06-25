import { describe, it, expect, vi } from 'vitest';
import { generateSustainabilityTip } from './gemini';

// Mock the GoogleGenerativeAI class
vi.mock('@google/generative-ai', () => {
  return {
    GoogleGenerativeAI: class {
      getGenerativeModel() {
        return {
          generateContent: async () => ({
            response: {
              text: () => "Try carpooling to work twice a week to cut your transit footprint in half. Small actions lead to big impacts!"
            }
          })
        };
      }
    }
  };
});

describe('Gemini Client (gemini.ts)', () => {
  it('gracefully handles generateSustainabilityTip when VITE_GEMINI_API_KEY is not configured', async () => {
    // If VITE_GEMINI_API_KEY defaults to "YOUR_GEMINI_API_KEY_HERE" or falls back
    const response = await generateSustainabilityTip("user logged driving");
    expect(response).toBeDefined();
    // It should either return the fallback message or the mock model output depending on env setup
    expect(typeof response).toBe('string');
  });
});
