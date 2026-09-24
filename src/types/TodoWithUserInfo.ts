import { User } from './User';
import { Todo } from './Todo';

export interface TodoWithUserInfo extends Todo {
  user: User;
}
