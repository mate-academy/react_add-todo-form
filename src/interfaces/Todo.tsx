import { User } from './User';
import { UnpreparedTodo } from './unpreparedTodo';

export interface Todo extends UnpreparedTodo {
  user: User | null;
}
