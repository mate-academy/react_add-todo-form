import { Color } from '../types/Color';

const BASE_URL = 'http://localhost:5000/colors';

export const getAllColors = async (): Promise<Color[]> => {
  const response = await fetch(BASE_URL);

  return response.json();
};

export const getColorById = async (colorId: number): Promise<Color> => {
  const response = await fetch(`${BASE_URL}/${colorId}`);

  return response.json();
};
