import { TodoType } from './TodoType';
import { UserType } from './UserType';

export interface PreparedTodosType extends TodoType {
  user: UserType | null;
}
