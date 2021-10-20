import { ToDoWithoutUser } from './ToDoWithoutUser';
import { User } from './User';

export interface ToDo extends ToDoWithoutUser {
  user: User | null,
}
