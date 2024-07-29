import { EntityItem } from './Entity';

export interface User extends EntityItem {
  name: string;
  username: string;
  email: string;
}
