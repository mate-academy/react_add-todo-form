import { TodoType } from './TodoType';
import { UserType } from './UserType';

export interface PreparedTodoType extends TodoType {
  user: UserType | null
}
