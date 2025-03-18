const isLetter = (char: string): boolean =>
  char.toLocaleUpperCase() !== char.toLocaleLowerCase();

export const sanitizeStringAlpha = (str: string, regex: RegExp): string => {
  let result = '';

  for (const char of str) {
    if (!isLetter(char) || regex?.test(char)) {
      result += char;
    }
  }

  return result;
};
