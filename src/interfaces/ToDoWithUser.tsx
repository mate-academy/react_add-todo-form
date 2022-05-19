import { ToDo } from './ToDo';
import { User } from './User';

export interface ToDoWithUser extends ToDo {
  user: User | null;
}
