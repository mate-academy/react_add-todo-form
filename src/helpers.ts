import colorsFromServer from './api/colors';

export function getColorById(id: number) {
  return colorsFromServer.find(color => color.id === id) || null;
}
