import { Color } from './Color';

export interface Good {
  id: number;
  name: string;
  colorId: number;
}

export interface GoodWithoutColor extends Good {
  color: Color | null;
}
