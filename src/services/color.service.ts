const colors = [
  { id: 1, name: 'red' },
  { id: 2, name: 'green' },
  { id: 3, name: 'blue' },
];

export const getColorById = (colorId: number) => {
  return colors.find(color => color.id === colorId);
};

export const getColors = () => {
  return colors;
};
