export const getValidTitle = (title: string) => {
  const allowedSymbols = /[а-яА-Яa-zA-Z0-9\s]/g;
  const validTitle = title.match(allowedSymbols)?.join('') || '';

  return validTitle;
};
