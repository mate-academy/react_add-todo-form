import { Color } from '../types';

const colors: Color[] = [
  { id: 1, name: 'red' },
  { id: 2, name: 'green' },
  { id: 3, name: 'blue' },
];

export function getAllColors() {
  return colors;
}

export function getColorById(id: number) {
  return colors.find(color => color.id === id);
}
