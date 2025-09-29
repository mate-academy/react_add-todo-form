import { UserInfo } from './User';
import { Todo } from './Todo';

export interface ExtendedTodo extends Todo {
  user?: UserInfo;
}
