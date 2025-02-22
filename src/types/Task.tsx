import { Todo } from "./Todo";
import { User } from "./User";
export interface Task extends Todo {
  user: User;
}
