import { Color } from './Color';

export interface Good {
  id: number;
  name: string;
  colorId: number;
  color?: Color;
}
