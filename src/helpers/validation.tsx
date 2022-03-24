export const validation = (newTitle: string, prevTitle: string) => {
  if (newTitle.length <= prevTitle.length) {
    return true;
  }

  const validsymbols = 'qwertyuiopasdfghjklzxcvbnmйцукенгшщзхїфівапролджєячсмитьбю1234567890 ';

  return validsymbols.includes(newTitle[newTitle.length - 1])
    || validsymbols.toUpperCase().includes(newTitle[newTitle.length - 1]);
};

export const spaceValidation = (str: string) => {
  let counter = 0;

  // eslint-disable-next-line no-restricted-syntax
  for (const char of str) {
    if (char === ' ') {
      // eslint-disable-next-line no-plusplus
      counter++;
    }
  }

  return str.length === counter;
};
