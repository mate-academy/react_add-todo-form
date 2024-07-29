import { EntityItem } from './Entity';
import { User } from './User';

export interface Todo extends EntityItem {
  title: string;
  completed: boolean;
  userId: number;
}

export interface TodoWithUser extends Todo {
  user: User | null;
}
