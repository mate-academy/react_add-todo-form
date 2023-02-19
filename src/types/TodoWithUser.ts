import { Todo } from './Todo';
import { User } from './User';

export interface TodoWithUser extends Todo {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
  user: User
}
