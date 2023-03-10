const colors = [
  { id: 1, name: 'red' },
  { id: 2, name: 'green' },
  { id: 3, name: 'blue' },
];

export const getAll = () => {
  return colors;
}

export const getById = (colorId: number) => {
  const foundColor = colors.find(color => color.id === colorId);

  return foundColor || null;
}
