export const sanitizeTitle = (input: string): string => {
  return input.replace(/[^a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ0-9\s]/g, '');
};
