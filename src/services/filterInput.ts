export const filterInput = (title: string) => {
  return title.replace(/[^a-zA-Z0-9\s]/g, '');
};
