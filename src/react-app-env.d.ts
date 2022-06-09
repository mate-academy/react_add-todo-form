/// <reference types="react-scripts" />

export interface Color {
  id: number;
  name: string;
}

export interface GoodWithoutColor {
  id: number;
  colorId: number;
  name: string;
}

export interface Good extends GoodWithoutColor {
  color: Color | null;
}
