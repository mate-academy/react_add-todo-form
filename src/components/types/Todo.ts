import { CollectionItem } from './Collection';
import { User } from './User';

export interface Todo extends CollectionItem {
  title: string;
  completed: boolean;
  userId: number;
}

export interface TodoWithUser extends Todo {
  user: User | null;
}
