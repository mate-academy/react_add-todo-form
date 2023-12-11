import { User } from './User';
import { Todo } from './Todo';

// export interface TodoWithUser {
//   id: number,
//   title: string,
//   completed: boolean,
//   userId: number,
//   user: User | null,
// }

export interface TodoWithUser extends Todo {
  user: User | null;
}
