import { Color } from '../types';

export async function getColors(): Promise<Color[]> {
  const response = await fetch('/api/colors.json');

  return response.json();
}

export async function getColorById(colorId: number) {
  const colors = await getColors();

  return colors.find(color => color.id === colorId);
}
