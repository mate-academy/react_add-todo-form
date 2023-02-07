import { Color } from './Color';

export interface Good {
  id: number;
  name: string;
  colorId: number;
}

export interface GoodWithColor extends Good {
  color: Color | null;
}
