import { CollectionItem } from './Collection';

export interface User extends CollectionItem {
  name: string;
  username: string;
  email: string;
}
