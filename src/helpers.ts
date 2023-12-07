type WithId = {
  id: number
};

export const findById = <T extends WithId>(a: number) => {
  return (b: T) => a === b.id;
};

export const addId = (arr: { id: number }[]): number => {
  const ids = arr.map(item => item.id);
  const maxId = Math.max(...ids);

  return maxId + 1;
};
