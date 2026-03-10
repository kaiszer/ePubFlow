import { describe, it, expect } from 'vitest';
import { makeFirstLettersBold } from './textFormatting';

describe('makeFirstLettersBold', () => {
  it('does not format 1 letter words', () => {
    expect(makeFirstLettersBold('a', 2)).toBe('a');
    expect(makeFirstLettersBold('y', 2)).toBe('y');
  });

  it('formats exactly 1 letter for 2-letter words regardless of intensity', () => {
    expect(makeFirstLettersBold('al', 5)).toBe('<b>a</b>l');
    expect(makeFirstLettersBold('la', 9)).toBe('<b>l</b>a');
    expect(makeFirstLettersBold('of', 2)).toBe('<b>o</b>f');
  });

  it('formats up to length-1 for longer words respecting intensity limits', () => {
    // Intensity limits logic bounds checks
    expect(makeFirstLettersBold('gato', 2)).toBe('<b>ga</b>to'); // Len 4, Int 2 -> 2
    expect(makeFirstLettersBold('gato', 4)).toBe('<b>gat</b>o'); // Len 4, Int 4 -> Max permitted is 3
    expect(makeFirstLettersBold('murciélago', 9)).toBe('<b>murciélag</b>o'); // Len 10, Max permitted is 9
  });

  it('distinguishes words alongside delimiters', () => {
    // Ensuring regex word boundary separation doesn't swallow dots or commas
    expect(makeFirstLettersBold('Hola, mundo.', 2)).toBe('<b>Ho</b>la, <b>mu</b>ndo.');
  });
});
