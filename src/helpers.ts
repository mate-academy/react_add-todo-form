import { Color } from './types/Color';
import colorsFromServer from './api/colors';

export function fetchAllColors(): Promise<Color[]> {
  return fetch('http://localhost:3000/api/colors.json')
    .then((response) => response.json());
}

export function getColorById(id: number) {
  return colorsFromServer.find(color => color.id === id) || null;
}
