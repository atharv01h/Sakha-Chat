// coded by Atharv Hatwar
const vulgarWords = [
  'fuck', 'shit', 'ass', 'bitch', 'dick', 'pussy', 'cock', 'bastard',
  // Add more words as needed
];

// coded by Atharv Hatwar
export const containsVulgarWords = (text: string): boolean => {
  const lowercaseText = text.toLowerCase();
  return vulgarWords.some(word => lowercaseText.includes(word));
};