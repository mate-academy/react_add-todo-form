import { Color } from '../types/Color';

export const getColorById = (id: number, colors: Color[]) => {
  const foundColor = colors.find(color => color.id === id);

  return foundColor || null;
};
