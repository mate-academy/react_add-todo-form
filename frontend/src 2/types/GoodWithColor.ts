import { Color } from './Color';
import { Good } from './Good';

export interface GoodWithColor extends Good {
  color: Color | null;
}
