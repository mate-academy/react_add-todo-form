import { ToDo } from './ToDo';
import { User } from './User';

export interface ToDoUser extends ToDo {
  user: User | null;
}
