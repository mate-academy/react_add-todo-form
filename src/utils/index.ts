import { colors } from '../api';

export const getColorById = (colorId: number) => {
  return colors.find(({ id }) => colorId === id) || null;
};
