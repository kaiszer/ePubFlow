/**
 * Applies bold tagging to the beginning of each word based on a dynamic intensity.
 * 
 * @param text Origin text content
 * @param intensity Number of letters to make bold (default: 2)
 * @returns HTML string with <b> tag wrapper matching the ruleset.
 */
export const makeFirstLettersBold = (text: string, intensity: number = 2): string => {
  // Use a regex to tokenize the text while preserving delimiters (spaces, punctuation)
  // \p{L}\p{N}_ captures letters, numbers and underscores.
  return text.replace(/([\p{L}\p{N}_]+)/gu, (word) => {
    const len = word.length;
    
    // Rule 1: Words of 1 letter don't get bolded (or get fully bolded depending on preference, we skip for safety/readability)
    if (len === 1) return word;

    // Rule 2: Words of 2 letters ALWAYS have exactly 1 bold letter
    if (len === 2) {
      return `<b>${word[0]}</b>${word[1]}`;
    }

    // Rule 3: For other words, apply intensity but capped at Length - 1
    const allowedIntensity = Math.min(intensity, len - 1);
    
    const boldPart = word.slice(0, allowedIntensity);
    const restPart = word.slice(allowedIntensity);
    
    return `<b>${boldPart}</b>${restPart}`;
  });
};
