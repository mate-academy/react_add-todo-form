/// <reference types="react-scripts" />

export interface Color {
  id: number;
  name: string;
}

export interface GoodWithoutColor {
  id: number;
  name: string;
  colorId: number;
}

export interface Good extends GoodWithoutColor {
  color: Color | null;
}
