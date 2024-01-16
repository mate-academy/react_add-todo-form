import { Color } from './Color';

export interface Good {
  id: number;
  colorId: number;
  name: string;
}

export interface GoodsWithColors extends Good {
  color: Color | null;
}
