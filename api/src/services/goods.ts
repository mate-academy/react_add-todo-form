let goods = [
  { id: 1, colorId: 1, name: 'Dumplings' },
  { id: 2, colorId: 2, name: 'Carrot' },
  { id: 3, colorId: 3, name: 'Eggs' },
  { id: 4, colorId: 1, name: 'Ice cream' },
  { id: 5, colorId: 2, name: 'Apple' },
  { id: 6, colorId: 3, name: 'Bread' },
  { id: 7, colorId: 1, name: 'Fish' },
  { id: 8, colorId: 2, name: 'Honey' },
  { id: 9, colorId: 3, name: 'Jam' },
  { id: 10, colorId: 1, name: 'Garlic' },
];

export const getAll = () => {
  return goods;
}

export const getById = (goodId: number) => {
  const good = goods.find((good) => good.id === goodId);

  return good || null;
}

export const addGood = (name: string, colorId: number) => {
  const maxId = Math.max(...goods.map(({ id }) => id), 0);

  const newGood = {
    id: maxId + 1,
    name,
    colorId,
  }

  goods.push(newGood);

  return newGood;
}

export const removeGood = (goodId: number) => {
  goods = goods.filter((good) => good.id !== goodId);
}

