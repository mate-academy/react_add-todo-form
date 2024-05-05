export const filterInput = (title: string) => {
  return title.replace(/[^a-zA-Z0-9\u0400-\u04FF\s]/g, '');
};
