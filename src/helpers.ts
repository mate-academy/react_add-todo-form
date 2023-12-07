type WithId = {
  id: number
};

export const findById = <T extends WithId>(arr: T[], idForFind: number) => {
  return arr.find(({ id }) => id === idForFind);
};

export const addId = (arr: { id: number }[]): number => {
  const ids = arr.map(item => item.id);
  const maxId = Math.max(...ids);

  return maxId + 1;
};
