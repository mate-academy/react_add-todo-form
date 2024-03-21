import { Color } from './Color';

export interface GoodWithoutColor {
  id: number;
  name: string;
  colorId: number;
}

export interface Good extends GoodWithoutColor {
  color?: Color;
}
