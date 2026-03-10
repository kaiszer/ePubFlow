/**
 * Applies bold tagging to the first two letters of each word
 * matching the legacy Python BeautifulSoup behavior.
 * 
 * @param text Origin text content
 * @returns HTML string with <b> tag wrapper matching the exact legacy python regex logic.
 */
export const makeFirstLettersBold = (text: string): string => {
  return text.replace(/(^|[^\p{L}\p{N}_])([\p{L}\p{N}_]{2})([\p{L}\p{N}_]*)/gu, (_match, before, p1, p2) => {
    const word = p1 + p2;
    return word.length === 2 
      ? `${before}<b>${word[0]}</b>${word[1]}` 
      : `${before}<b>${p1}</b>${p2}`;
  });
};
