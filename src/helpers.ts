export const addId = (arr: { id: number }[]): number => {
  const ids = arr.map(item => item.id);
  const maxId = Math.max(...ids);

  return maxId + 1;
};
