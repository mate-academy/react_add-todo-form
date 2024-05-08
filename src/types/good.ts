import { Color } from './color';

export interface Good {
  id: number;
  name: string;
  colorId: number;
  color?: Color;
}
