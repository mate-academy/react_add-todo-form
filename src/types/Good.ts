import { Color } from './Color';

export interface GoodWithoutColor {
  id: number;
  colorId: number;
  name: string;
}

export interface GoodWithColor extends GoodWithoutColor {
  color: Color | null;
}
