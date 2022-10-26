/// <reference types="react-scripts" />

export interface Color {
  id: number;
  name: string
}

export interface Good {
  id: number;
  colorId: number;
  name: string;
}

// [
//   { id: 1, colorId: 1, name: 'Dumplings', color: { id: 1, name: 'red' } },
//   { id: 2, colorId: 1, name: 'Dumplings', color: { id: 1, name: 'red' } },
//   { id: 3, colorId: 1, name: 'Dumplings', color: { id: 1, name: 'red' } },
// ]

export interface GoodWithColor extends Good {
  color: Color | null;
}
